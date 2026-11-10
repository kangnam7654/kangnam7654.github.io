"""Run private, deterministic maintenance checks without changing the checkout.

Python 3.9+ and POSIX process/locking support are required. Only stdout's stable
JSON is a monitor signal; private latest.json contains diagnostics and timings.
This is not a sandbox for untrusted build scripts or installed dependencies.
"""

import argparse
from collections import deque
from contextlib import contextmanager
from dataclasses import dataclass
from datetime import datetime, timezone
import fcntl
import hashlib
import json
import os
from pathlib import Path, PurePosixPath
import re
import selectors
import shutil
import signal
import stat
import subprocess
import sys
import tempfile
import time
from typing import Optional


SCRATCH = Path("/Users/kangnam/.hermes/cache/scratch")
PUBLIC_URL = "https://kangnam7654.github.io/"
CHROME = Path("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")
EXCLUDED = frozenset((".git", "node_modules", "dist", ".astro", ".vite"))
MAX_LOG_BYTES = 256 * 1024
KEEP_RUNS = 5
MAX_RUN_BYTES = 96 * 1024 * 1024
WIDTHS = (320, 359, 360, 375, 390, 650, 651, 768, 799, 800, 1023, 1024,
          1099, 1100, 1101, 1440, 1699, 1700, 1701)
STAGE_TIMEOUTS = {"node_runtime": 10, "qa_runtime": 20, "build": 180,
                  "qa_ab_contract": 180, "qa_entry": 180, "qa_full": 420,
                  "public_probe": 12}


class MonitorProblem(Exception):
    """Carry a stable failure ID separately from private diagnostic text."""

    def __init__(self, code, detail="", status="environment_blocked"):
        """Initialize a diagnostic whose detail never enters monitor stdout."""
        super().__init__(detail or code)
        self.code = code
        self.detail = detail or code
        self.status = status


@dataclass
class Config:
    """Explicit local inputs; allow_dirty is for manual testing only."""

    source: Path
    state_dir: Path
    node: Path
    python: Path
    axe: Path
    public_url: Optional[str] = None
    allow_dirty: bool = False


@dataclass
class SourceState:
    """Capture read-only Git identity and the exact tracked index listing."""

    head: str
    status: bytes
    index: bytes


@dataclass
class StageResult:
    """Keep bounded child output and private execution diagnostics."""

    name: str
    returncode: Optional[int]
    timed_out: bool
    output: str
    log_path: str
    seconds: float
    error: Optional[str] = None

    def diagnostic(self):
        """Return report fields without duplicating the child log."""
        return {"name": self.name, "returncode": self.returncode,
                "timed_out": self.timed_out, "log_path": self.log_path,
                "seconds": round(self.seconds, 3), "error": self.error}


def stable_result(source_head, status, failed_checks, state_dir):
    """Return only deterministic, monitor-facing values."""
    return {"schema_version": 1, "source_head": source_head, "status": status,
            "failed_checks": sorted(set(failed_checks)),
            "report_path": str(state_dir / "latest.json") if state_dir else None}


def stable_json(result):
    """Serialize exactly one JSON line, excluding all private diagnostics."""
    return json.dumps(result, ensure_ascii=True, sort_keys=True,
                      separators=(",", ":")) + "\n"


def absolute_path(value):
    """Require an absolute, traversal-free path without silently repairing it."""
    path = Path(value)
    if not path.is_absolute() or ".." in path.parts or "\x00" in str(value):
        raise MonitorProblem("arguments_invalid", "Expected an absolute safe path: " + str(value))
    return path


def no_symlink_ancestors(path):
    """Reject existing symlink components, including the final component."""
    for part in (path,) + tuple(path.parents):
        try:
            if stat.S_ISLNK(part.lstat().st_mode):
                raise MonitorProblem("unsafe_path", "Symlink component: " + str(part))
        except FileNotFoundError:
            continue


def private_directory(path):
    """Create a user-owned private directory without following symlinks."""
    no_symlink_ancestors(path)
    path.mkdir(parents=True, mode=0o700, exist_ok=True)
    info = path.lstat()
    if not stat.S_ISDIR(info.st_mode) or info.st_uid != os.getuid():
        raise MonitorProblem("unsafe_state", "Not a user-owned directory: " + str(path))
    path.chmod(0o700)
    return path


def regular_target(path):
    """Reject unsafe existing report/lock files before replacing or opening."""
    try:
        info = path.lstat()
    except FileNotFoundError:
        return
    if (not stat.S_ISREG(info.st_mode) or info.st_uid != os.getuid()
            or info.st_nlink != 1):
        raise MonitorProblem("unsafe_state", "Unsafe state file: " + str(path))


def atomic_json(path, value):
    """Atomically replace a private JSON file; never follow its target link."""
    regular_target(path)
    fd, name = tempfile.mkstemp(prefix=".write-", dir=str(path.parent))
    try:
        os.fchmod(fd, 0o600)
        with os.fdopen(fd, "w", encoding="utf-8") as handle:
            json.dump(value, handle, ensure_ascii=True, indent=2, sort_keys=True)
            handle.write("\n")
            handle.flush()
            os.fsync(handle.fileno())
        os.replace(name, str(path))
    finally:
        if os.path.exists(name):
            os.unlink(name)


@contextmanager
def state_lock(state_dir):
    """Hold a nonblocking lock; leave its inode in place to prevent races."""
    path = state_dir / "monitor.lock"
    regular_target(path)
    fd = os.open(str(path), os.O_RDWR | os.O_CREAT | os.O_NOFOLLOW, 0o600)
    try:
        info = os.fstat(fd)
        if not stat.S_ISREG(info.st_mode) or info.st_nlink != 1 or info.st_uid != os.getuid():
            raise MonitorProblem("unsafe_state", "Unsafe lock inode")
        os.fchmod(fd, 0o600)
        try:
            fcntl.flock(fd, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError:
            raise MonitorProblem("monitor_locked", status="workspace_busy")
        try:
            yield
        finally:
            fcntl.flock(fd, fcntl.LOCK_UN)
    finally:
        os.close(fd)


def child_environment(config, home):
    """Allowlist environment values instead of leaking provider/GitHub secrets."""
    node_dir = str(config.node.parent)
    return {"PATH": node_dir + ":/usr/bin:/bin:/usr/sbin:/sbin:/opt/homebrew/bin",
            "HOME": str(home), "TMPDIR": str(SCRATCH), "TMP": str(SCRATCH),
            "TEMP": str(SCRATCH), "LANG": "en_US.UTF-8", "LC_ALL": "en_US.UTF-8",
            "TZ": "UTC", "ASTRO_TELEMETRY_DISABLED": "1",
            "PYTHONDONTWRITEBYTECODE": "1", "PYTHONNOUSERSITE": "1",
            "XDG_CACHE_HOME": str(home / "cache"),
            "XDG_CONFIG_HOME": str(home / "config"),
            "npm_config_cache": str(home / "npm-cache"),
            "npm_config_update_notifier": "false", "CI": "1", "NO_COLOR": "1",
            "GIT_OPTIONAL_LOCKS": "0", "GIT_TERMINAL_PROMPT": "0",
            "GIT_CONFIG_NOSYSTEM": "1", "GIT_CONFIG_GLOBAL": "/dev/null"}


def git_bytes(source, *args):
    """Read Git without refreshing its index, running hooks, or inheriting auth."""
    env = child_environment(Config(source, SCRATCH, Path("/usr/bin/node"),
                                   Path(sys.executable), SCRATCH), SCRATCH)
    git = shutil.which("git", path=env["PATH"])
    if not git:
        raise MonitorProblem("git_unavailable")
    command = [git, "--no-pager", "--no-optional-locks", "-c", "core.fsmonitor=false",
               "-c", "core.untrackedCache=false", "-c", "core.hooksPath=/dev/null"]
    try:
        result = subprocess.run(command + list(args), cwd=str(source), env=env,
                                stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=20)
    except (OSError, subprocess.TimeoutExpired) as error:
        raise MonitorProblem("git_unavailable", str(error))
    if result.returncode:
        raise MonitorProblem("source_not_repository", result.stderr.decode("utf-8", "replace"))
    return result.stdout


def source_state(source):
    """Read HEAD, all dirty/untracked paths, and staged path identities."""
    root = os.fsdecode(git_bytes(source, "rev-parse", "--show-toplevel")).strip()
    if Path(root).resolve() != source:
        raise MonitorProblem("source_not_repository", "--source must be the repository root")
    head = git_bytes(source, "rev-parse", "--verify", "HEAD").decode("ascii").strip()
    if not re.fullmatch(r"[0-9a-f]{40}|[0-9a-f]{64}", head):
        raise MonitorProblem("source_not_repository", "Invalid HEAD identity")
    return SourceState(head, git_bytes(source, "status", "--porcelain=v1", "-z",
                                       "--untracked-files=all"),
                       git_bytes(source, "ls-files", "--stage", "-z"))


def tracked_entries(index):
    """Validate tracked paths and omit generated/dependency directories."""
    entries = []
    seen = set()
    for record in index.split(b"\0"):
        if not record:
            continue
        try:
            metadata, raw_name = record.split(b"\t", 1)
            mode, unused_oid, stage = metadata.split(b" ")
            name = os.fsdecode(raw_name)
        except ValueError:
            raise MonitorProblem("source_unsafe", "Malformed index entry")
        parts = name.split("/")
        if (not name or PurePosixPath(name).is_absolute() or "\\" in name
                or any(part in ("", ".", "..") for part in parts)
                or any(ord(char) < 32 or ord(char) == 127 for char in name)):
            raise MonitorProblem("source_unsafe", "Unsafe tracked path: " + repr(name))
        if any(part in EXCLUDED for part in parts):
            continue
        if name in seen or stage != b"0" or mode not in (b"100644", b"100755"):
            raise MonitorProblem("source_unsafe", "Symlink, submodule, conflict or duplicate: " + name)
        seen.add(name)
        entries.append((name, mode))
    return sorted(entries)


@contextmanager
def tracked_file(source, name):
    """Open a regular tracked file with no-follow checks on every component."""
    fds = []
    try:
        fds.append(os.open(str(source), os.O_RDONLY | os.O_DIRECTORY | os.O_NOFOLLOW))
        parts = name.split("/")
        for part in parts[:-1]:
            fds.append(os.open(part, os.O_RDONLY | os.O_DIRECTORY | os.O_NOFOLLOW,
                               dir_fd=fds[-1]))
        fd = os.open(parts[-1], os.O_RDONLY | os.O_NOFOLLOW | os.O_NONBLOCK,
                     dir_fd=fds[-1])
        with os.fdopen(fd, "rb") as handle:
            if not stat.S_ISREG(os.fstat(handle.fileno()).st_mode):
                raise MonitorProblem("source_unsafe", "Not a regular source file: " + name)
            yield handle
    except OSError as error:
        raise MonitorProblem("source_unsafe", name + ": " + str(error))
    finally:
        for fd in reversed(fds):
            os.close(fd)


def copy_or_hash(source, entries, destination=None):
    """Hash actual worktree bytes, optionally copying them without Git filters.

    Args:
        source: Validated absolute repository root.
        entries: Validated (relative path, Git mode) pairs.
        destination: Empty private snapshot root, or None for a hash-only pass.

    Returns:
        A SHA-256 manifest digest of the selected paths, modes and file bytes.

    Raises:
        MonitorProblem: A file is unsafe or changes while being read.
    """
    manifest = hashlib.sha256()
    for name, mode in entries:
        digest = hashlib.sha256()
        output = None
        try:
            if destination is not None:
                target = destination / name
                target.parent.mkdir(parents=True, mode=0o700, exist_ok=True)
                output = target.open("xb")
                os.fchmod(output.fileno(), 0o700 if mode == b"100755" else 0o600)
            with tracked_file(source, name) as handle:
                before = os.fstat(handle.fileno())
                while True:
                    chunk = handle.read(1024 * 1024)
                    if not chunk:
                        break
                    digest.update(chunk)
                    if output is not None:
                        output.write(chunk)
                after = os.fstat(handle.fileno())
                if ((before.st_ino, before.st_size, before.st_mtime_ns, before.st_ctime_ns)
                        != (after.st_ino, after.st_size, after.st_mtime_ns, after.st_ctime_ns)):
                    raise MonitorProblem("source_changed", name, "workspace_busy")
        finally:
            if output is not None:
                output.close()
        manifest.update(os.fsencode(name) + b"\0" + mode + b"\0" + digest.digest())
    return manifest.hexdigest()


def link_dependencies(source, snapshot):
    """Link packages individually, leaving all cache roots fresh and writable."""
    modules = source / "node_modules"
    no_symlink_ancestors(modules)
    if not modules.is_dir():
        raise MonitorProblem("dependencies_unavailable")
    destination = snapshot / "node_modules"
    destination.mkdir(mode=0o700)

    def link(package, parent):
        """Link only a package directory contained in installed dependencies."""
        if not re.fullmatch(r"[A-Za-z0-9_][A-Za-z0-9._-]*", package.name):
            raise MonitorProblem("dependencies_unsafe", str(package))
        resolved = package.resolve()
        if not resolved.is_relative_to(modules) or not resolved.is_dir():
            raise MonitorProblem("dependencies_unsafe", str(package))
        (parent / package.name).symlink_to(package, target_is_directory=True)

    for package in sorted(modules.iterdir()):
        if package.name.startswith("."):
            continue
        if package.name.startswith("@"):
            if (package.is_symlink() or not package.is_dir()
                    or not re.fullmatch(r"@[A-Za-z0-9_][A-Za-z0-9._-]*", package.name)):
                raise MonitorProblem("dependencies_unsafe", str(package))
            scope = destination / package.name
            scope.mkdir(mode=0o700)
            for child in sorted(package.iterdir()):
                if not child.name.startswith("."):
                    link(child, scope)
        else:
            link(package, destination)
    try:
        package_root = (modules / "astro").resolve()
        package = json.loads((package_root / "package.json").read_text(encoding="utf-8"))
        entry = package["bin"]["astro"]
        if not isinstance(entry, str) or PurePosixPath(entry).is_absolute() or ".." in entry.split("/"):
            raise ValueError("Unsafe bin.astro")
        cli = (package_root / entry).resolve()
        if not cli.is_relative_to(package_root) or not cli.is_file():
            raise ValueError("Missing or escaped bin.astro")
    except (OSError, ValueError, KeyError, TypeError) as error:
        raise MonitorProblem("astro_cli_unavailable", str(error))
    return cli


def process_table():
    """Read PID ancestry plus start identities, including detached browsers."""
    try:
        run = subprocess.run(["/bin/ps", "-axo", "pid=,ppid=,pgid=,lstart="],
                             stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=2,
                             env={"PATH": "/usr/bin:/bin", "LC_ALL": "C"})
        if run.returncode:
            raise OSError("ps returned " + str(run.returncode))
        table = {}
        for line in run.stdout.decode("ascii", "replace").splitlines():
            parts = line.split(None, 3)
            if len(parts) == 4:
                table[int(parts[0])] = (int(parts[1]), int(parts[2]), parts[3])
        return table
    except (OSError, ValueError, subprocess.TimeoutExpired) as error:
        raise MonitorProblem("process_control_unavailable", str(error))


def remember_descendants(root_pid, known):
    """Track descendants by PID/start identity even after they are reparented."""
    table = process_table()
    seeds = {root_pid}
    seeds.update(pid for pid, identity in known.items()
                 if pid in table and table[pid][1:] == identity)
    while True:
        children = {pid for pid, info in table.items() if info[0] in seeds}
        expanded = seeds | children
        if expanded == seeds:
            break
        seeds = expanded
    for pid in seeds:
        if pid in table and pid != os.getpid():
            known[pid] = table[pid][1:]
    return table


def stop_processes(process, known):
    """Terminate the stage group and observed detached grandchildren.

    macOS can report EPERM when signaling an already-dead process group. Reap
    the leader first and distinguish zombies from genuinely unkillable children.
    """
    problem = None

    def zombie_or_gone(pid):
        """Check a permission-denied PID without treating a zombie as running."""
        check = subprocess.run(["/bin/ps", "-p", str(pid), "-o", "stat="],
                               stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                               timeout=2, env={"PATH": "/usr/bin:/bin", "LC_ALL": "C"})
        state = check.stdout.decode("ascii", "replace").strip()
        return not state or state.startswith("Z")

    for sig in (signal.SIGTERM, signal.SIGKILL):
        process.poll()
        try:
            table = remember_descendants(process.pid, known)
        except MonitorProblem as error:
            table = {}
            problem = error
        try:
            os.killpg(process.pid, sig)
        except ProcessLookupError:
            pass
        except PermissionError:
            # Fall back to identity-checked individual members below. A zombie
            # group must not prevent detached browser children from being killed.
            for pid, info in table.items():
                if info[1] == process.pid:
                    known[pid] = info[1:]
        for pid, identity in list(known.items()):
            if pid in table and table[pid][1:] == identity:
                try:
                    os.kill(pid, sig)
                except ProcessLookupError:
                    pass
                except PermissionError:
                    if not zombie_or_gone(pid):
                        problem = MonitorProblem("process_teardown_failed", "Cannot signal child PID " + str(pid))
        if sig == signal.SIGTERM:
            time.sleep(0.15)
    try:
        process.wait(timeout=3)
    except subprocess.TimeoutExpired:
        raise MonitorProblem("process_teardown_failed", "Child did not terminate")
    if problem:
        raise problem


def run_stage(name, command, cwd, env, log_path, timeout):
    """Run a bounded real process with capped logs and process-tree teardown.

    Args:
        name: Stable stage identifier used in findings.
        command: Explicit argv; never interpreted by a shell.
        cwd: Private execution directory.
        env: Allowlisted child environment.
        log_path: Private, per-stage output file.
        timeout: Maximum stage runtime in seconds, excluding bounded teardown.

    Returns:
        A StageResult, including timeouts and spawn errors as diagnostic data.
    """
    started = time.monotonic()
    process = None
    known = {}
    selector = selectors.DefaultSelector()
    head = bytearray()
    tail = deque()
    tail_size = 0
    total = 0
    timed_out = False
    error = None
    returncode = None
    try:
        process_table()  # Refuse to launch if descendant cleanup is unavailable.
        process = subprocess.Popen([str(arg) for arg in command], cwd=str(cwd), env=env,
                                   stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
                                   start_new_session=True, close_fds=True)
        assert process.stdout is not None
        os.set_blocking(process.stdout.fileno(), False)
        selector.register(process.stdout, selectors.EVENT_READ)
        next_scan = 0.0
        eof = False
        while not (eof and process.poll() is not None):
            now = time.monotonic()
            if now - started >= timeout:
                timed_out = True
                break
            if now >= next_scan:
                remember_descendants(process.pid, known)
                next_scan = now + 0.2
            for key, unused_mask in selector.select(min(0.1, max(0.0, timeout - (now - started)))):
                chunk = os.read(key.fd, 64 * 1024)
                if not chunk:
                    selector.unregister(key.fileobj)
                    eof = True
                    continue
                total += len(chunk)
                if len(head) < MAX_LOG_BYTES // 2:
                    head.extend(chunk[:MAX_LOG_BYTES // 2 - len(head)])
                tail.append(chunk)
                tail_size += len(chunk)
                while tail_size > MAX_LOG_BYTES // 2 and tail:
                    excess = tail_size - MAX_LOG_BYTES // 2
                    first = tail.popleft()
                    if len(first) > excess:
                        tail.appendleft(first[excess:])
                        tail_size -= excess
                    else:
                        tail_size -= len(first)
    except (OSError, MonitorProblem) as failure:
        error = str(failure)
    finally:
        selector.close()
        if process is not None:
            try:
                stop_processes(process, known)
            except (OSError, MonitorProblem) as failure:
                error = "process_teardown_failed: " + str(failure)
            returncode = process.returncode
            if process.stdout is not None:
                process.stdout.close()
    if total <= MAX_LOG_BYTES // 2:
        data = bytes(head)
    else:
        data = bytes(head) + b"\n[bounded log; middle omitted]\n" + b"".join(tail)
    regular_target(log_path)
    with log_path.open("wb") as handle:
        os.fchmod(handle.fileno(), 0o600)
        handle.write(data)
        if error:
            handle.write(("\n[runner error] " + error[:4096] + "\n").encode("utf-8", "replace"))
    return StageResult(name, returncode, timed_out, data.decode("utf-8", "replace"),
                       str(log_path), time.monotonic() - started, error)


def stage_failure(result):
    """Map volatile process outcomes to stable diagnostic IDs."""
    if result.error:
        return result.name + "_environment", "environment_blocked"
    if result.timed_out:
        return result.name + "_timeout", "needs_attention"
    if result.returncode != 0:
        return result.name + "_failed", "needs_attention"
    return None


def validate_qa_report(name, path):
    """Validate actual report completion and strict expected case counts."""
    try:
        report = json.loads(path.read_text(encoding="utf-8"))
        if name in ("qa_ab_contract", "qa_entry"):
            expected = 22 if name == "qa_ab_contract" else 6
            cases = report["cases"]
            assert report["all_passed"] is True and report["actual_static_build"] is True
            assert type(report["case_count"]) is int and report["case_count"] == expected
            assert len(cases) == expected and all(case["passed"] is True for case in cases)
            if name == "qa_ab_contract":
                assert len({case["case"] for case in cases}) == expected
                assert report["pure_contract"]["all_passed"] is True
                assert report["external_service_used"] is False
                assert report["analytics_collector"] is None
            else:
                wanted = {(path, width) for path in ("/ab/?review=1", "/ab/privacy/", "/directions/")
                          for width in (320, 1440)}
                assert {(case["path"], case["width"]) for case in cases} == wanted
                assert all(case["axe_violations"] == [] for case in cases)
                assert report["external_analytics_sdk"] is False
            assert all(case["external_requests"] == [] and case["page_errors"] == [] for case in cases)
        elif name == "qa_full":
            cases = report["browser_cases"]
            assert report["all_checks_passed"] is True and report["failures"] == []
            assert type(report["browser_case_count"]) is int and report["browser_case_count"] == 38
            assert len(cases) == 38
            assert {(case["variant"], case["width"]) for case in cases} == {
                (variant, width) for variant in ("type", "objects") for width in WIDTHS}
            assert report["tracked_baseline"]["count"] == 173
            assert report["existing_semantic_baseline"]["count"] == 67
            assert len(report["axe"]) == 4 and all(case["violations"] == [] for case in report["axe"])
            assert all(not case["overflow"] and case["outside_content"] == []
                       and case["page_errors"] == [] and case["external_requests"] == []
                       and case["failed_resources"] == [] for case in cases)
        else:
            raise ValueError("Unknown QA report")
        return report
    except (OSError, ValueError, KeyError, TypeError, AssertionError) as error:
        raise MonitorProblem(name + "_report_invalid", repr(error), "needs_attention")


def validate_public_url(url, allow_loopback=False):
    """Allow only the canonical public root; loopback is a unit-test seam."""
    from ipaddress import ip_address
    from urllib.parse import urlsplit

    if url == PUBLIC_URL:
        return url
    try:
        parts = urlsplit(url)
        if (allow_loopback and parts.scheme == "http" and parts.path == "/"
                and not parts.username and not parts.password and not parts.query
                and not parts.fragment and "?" not in url and "#" not in url
                and ip_address(parts.hostname).is_loopback and parts.port):
            return url
    except (ValueError, TypeError):
        pass
    raise MonitorProblem("public_url_rejected", "Only the canonical HTTPS root is allowed")


PUBLIC_PROBE_CODE = r'''
import json
import sys
import urllib.error
import urllib.request
class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None
opener = urllib.request.build_opener(urllib.request.ProxyHandler({}), NoRedirect())
request = urllib.request.Request(sys.argv[1], headers={
    'User-Agent': 'portfolio-maintenance/1', 'Accept': 'text/html'}, method='GET')
try:
    with opener.open(request, timeout=8) as response:
        body = response.read(65536)
        print(json.dumps({'status': response.status, 'html':
            response.headers.get_content_type() == 'text/html' and
            (b'<html' in body.lower() or b'<!doctype html' in body.lower())}))
except urllib.error.HTTPError as error:
    print(json.dumps({'status': error.code, 'html': False}))
except (OSError, ValueError) as error:
    print(json.dumps({'network_error': type(error).__name__}))
'''


def perform_checks(config, snapshot, run_dir, stages):
    """Build the snapshot and run all three existing real QA entrypoints."""
    failures = []
    blocked = False
    for label, path in (("node", config.node), ("qa_python", config.python), ("axe", config.axe)):
        if not path.is_file() or (label != "axe" and not os.access(str(path), os.X_OK)):
            raise MonitorProblem(label + "_unavailable", str(path))
    if not CHROME.is_file():
        raise MonitorProblem("chrome_unavailable", str(CHROME))
    cli = link_dependencies(config.source, snapshot)
    requirements = {"check_portfolio_ab_contract.py": ("PORTFOLIO_AB_QA_OUT",),
                    "check_portfolio_entry.py": ("PORTFOLIO_AXE_PATH",),
                    "check_full_portfolio.py": ("PORTFOLIO_FULL_QA_OUT", "PORTFOLIO_AXE_PATH")}
    for filename, markers in requirements.items():
        path = snapshot / "tools" / filename
        if not path.is_file() or any(marker not in path.read_text(encoding="utf-8") for marker in markers):
            raise MonitorProblem("qa_environment_unsupported", filename)
    home = private_directory(snapshot / ".monitor-home")
    env = child_environment(config, home)
    # Some callers provide an executable named node22 rather than node. All
    # nested QA subprocesses must still use exactly that executable.
    bin_dir = private_directory(snapshot / ".monitor-bin")
    (bin_dir / "node").symlink_to(config.node)
    env["PATH"] = str(bin_dir) + ":" + env["PATH"]
    ab_out = private_directory(run_dir / "ab")
    full_out = private_directory(run_dir / "full")
    env.update({"PORTFOLIO_AB_QA_OUT": str(ab_out), "PORTFOLIO_FULL_QA_OUT": str(full_out),
                "PORTFOLIO_AXE_PATH": str(config.axe)})

    def stage(name, command):
        """Execute one production stage, recording only private diagnostics."""
        result = run_stage(name, command, snapshot, env, run_dir / (name + ".log"), STAGE_TIMEOUTS[name])
        stages.append(result.diagnostic())
        failure = stage_failure(result)
        if failure:
            failures.append(failure[0])
        return result, failure

    node_result, failure = stage("node_runtime", [config.node, "--version"])
    if failure:
        raise MonitorProblem("node_runtime_unavailable", node_result.error or node_result.output)
    match = re.fullmatch(r"v(\d+)\.(\d+)\.(\d+)\s*", node_result.output)
    if not match or int(match.group(1)) != 22 or tuple(map(int, match.groups())) < (22, 12, 0):
        raise MonitorProblem("node_version_unsupported", node_result.output)
    python_result, failure = stage("qa_runtime", [config.python, "-B", "-c",
        "import sys; assert sys.version_info >= (3,9); import playwright.sync_api; print('qa-runtime-ready')"])
    if failure or python_result.output.strip() != "qa-runtime-ready":
        raise MonitorProblem("qa_runtime_unavailable", python_result.error or python_result.output)
    build, failure = stage("build", [config.node, cli, "build", "--root", snapshot])
    if failure:
        blocked = failure[1] == "environment_blocked"
    else:
        for name, filename, report in (
                ("qa_ab_contract", "check_portfolio_ab_contract.py", ab_out / "contract.json"),
                ("qa_entry", "check_portfolio_entry.py", ab_out / "entry.json"),
                ("qa_full", "check_full_portfolio.py", full_out / "qa.json")):
            result, failure = stage(name, [config.python, "-B", snapshot / "tools" / filename])
            if failure:
                blocked = blocked or failure[1] == "environment_blocked"
                continue
            try:
                validate_qa_report(name, report)
            except MonitorProblem as problem:
                failures.append(problem.code)
    if config.public_url:
        result, failure = stage("public_probe", [config.python, "-B", "-c", PUBLIC_PROBE_CODE,
                                                 config.public_url])
        if failure:
            blocked = blocked or failure[1] == "environment_blocked"
        else:
            try:
                probe = json.loads(result.output)
                if "network_error" in probe:
                    failures.append("public_probe_network")
                elif probe.get("status") != 200:
                    failures.append("public_probe_http_" + str(probe.get("status", "invalid")))
                elif probe.get("html") is not True:
                    failures.append("public_probe_not_html")
                stages[-1]["observation"] = probe
            except ValueError:
                failures.append("public_probe_report_invalid")
    return failures, blocked


def prune_runs(runs_dir, current):
    """Retain at most five private run directories, never following links."""
    directories = []
    for path in runs_dir.iterdir():
        if not path.name.startswith("run-"):
            continue
        info = path.lstat()
        if not stat.S_ISDIR(info.st_mode) or path.is_symlink() or info.st_uid != os.getuid():
            raise MonitorProblem("unsafe_state", "Unsafe run directory: " + str(path))
        directories.append(path)
    old = sorted((path for path in directories if path != current),
                 key=lambda path: (path.stat().st_mtime_ns, path.name), reverse=True)
    for path in old[KEEP_RUNS - 1:]:
        shutil.rmtree(str(path))


def bound_evidence(run_dir):
    """Remove largest screenshot artifacts if a completed run exceeds its cap."""
    files = []
    for root, dirs, names in os.walk(str(run_dir), followlinks=False):
        for name in dirs + names:
            path = Path(root) / name
            if path.is_symlink():
                raise MonitorProblem("unsafe_state", "Unexpected evidence symlink: " + str(path))
        for name in names:
            path = Path(root) / name
            files.append((path.stat().st_size, path))
    size = sum(item[0] for item in files)
    removed = []
    for amount, path in sorted(files, key=lambda item: item[0], reverse=True):
        if size <= MAX_RUN_BYTES:
            break
        if path.suffix.lower() in (".png", ".jpg", ".webp"):
            path.unlink()
            size -= amount
            removed.append(str(path))
    if size > MAX_RUN_BYTES:
        raise MonitorProblem("evidence_limit_exceeded", "Non-image evidence exceeds private run cap")
    return removed


def run_monitor(config):
    """Run once, always returning a deterministic result even on check failure.

    Args:
        config: Explicit source, tool and private state paths.

    Returns:
        The stable stdout payload. Detailed reports are written under state_dir
        while its lock is held. A lock conflict never overwrites the holder's
        latest.json. Unsafe/unwritable state can prevent report persistence.
    """
    head = None
    report = {"started_at": datetime.now(timezone.utc).isoformat(), "stages": [],
              "diagnostics": [], "allow_dirty": config.allow_dirty, "public_url": config.public_url}
    failures = []
    status = "healthy"
    run_dir = None
    snapshot = None
    before = None
    digest = None
    entries = None
    try:
        config.source = absolute_path(config.source)
        config.state_dir = absolute_path(config.state_dir)
        for path in (config.node, config.python, config.axe):
            absolute_path(path)
        no_symlink_ancestors(config.source)
        config.source = config.source.resolve(strict=True)
        if (config.state_dir.is_relative_to(config.source)
                or config.source.is_relative_to(config.state_dir)):
            raise MonitorProblem("unsafe_state", "Source and state directories must be disjoint")
        private_directory(config.state_dir)
        with state_lock(config.state_dir):
            try:
                regular_target(config.state_dir / "latest.json")
                # Do not validate executables or touch a snapshot for a dirty workspace.
                before = source_state(config.source)
                head = before.head
                report["source_before"] = {"head": head, "status": os.fsdecode(before.status)}
                if before.status and not config.allow_dirty:
                    raise MonitorProblem("workspace_dirty", status="workspace_busy")
                if config.public_url:
                    validate_public_url(config.public_url)
                private_directory(SCRATCH)
                runs = private_directory(config.state_dir / "runs")
                run_dir = Path(tempfile.mkdtemp(prefix="run-", dir=str(runs)))
                run_dir.chmod(0o700)
                prune_runs(runs, run_dir)
                snapshot = Path(tempfile.mkdtemp(prefix="portfolio-maintenance-", dir=str(SCRATCH)))
                snapshot.chmod(0o700)
                report["snapshot"] = str(snapshot)
                report["run_dir"] = str(run_dir)
                entries = tracked_entries(before.index)
                digest = copy_or_hash(config.source, entries, snapshot)
                if source_state(config.source) != before:
                    raise MonitorProblem("source_changed", status="workspace_busy")
                check_failures, blocked = perform_checks(config, snapshot, run_dir, report["stages"])
                failures = list(check_failures)
                status = "environment_blocked" if blocked else "needs_attention" if failures else "healthy"
            except KeyboardInterrupt:
                failures.append("monitor_interrupted")
                status = "environment_blocked"
                report["diagnostics"].append("Interrupted; child process trees and snapshot were torn down")
            except MonitorProblem as problem:
                failures.append(problem.code)
                status = problem.status
                report["diagnostics"].append(problem.detail)
            except (OSError, ValueError, RuntimeError) as error:
                failures.append("monitor_environment")
                status = "environment_blocked"
                report["diagnostics"].append(repr(error))
            finally:
                if before is not None and snapshot is not None:
                    try:
                        after = source_state(config.source)
                        report["source_after"] = {"head": after.head, "status": os.fsdecode(after.status)}
                        changed = after != before
                        if digest is not None and entries is not None:
                            changed = changed or copy_or_hash(config.source, entries) != digest
                        if changed:
                            failures.append("source_changed")
                            status = "workspace_busy"
                    except (MonitorProblem, OSError) as error:
                        failures.append("source_changed")
                        status = "workspace_busy"
                        report["diagnostics"].append(str(error))
                if snapshot is not None:
                    try:
                        shutil.rmtree(str(snapshot))
                        report["snapshot_removed"] = True
                    except OSError as error:
                        failures.append("snapshot_cleanup_failed")
                        status = "environment_blocked"
                        report["diagnostics"].append(str(error))
                history_path = config.state_dir / "history.json"
                history = []
                history_ok = True
                try:
                    regular_target(history_path)
                    if history_path.exists():
                        if history_path.stat().st_size > 1024 * 1024:
                            raise ValueError("Oversized private history")
                        history = json.loads(history_path.read_text(encoding="utf-8"))
                    if not isinstance(history, list):
                        raise ValueError("Invalid private history")
                except (MonitorProblem, OSError, ValueError) as error:
                    history_ok = False
                    failures.append("history_invalid")
                    status = "environment_blocked"
                    report["diagnostics"].append(str(error))
                if run_dir is not None:
                    try:
                        report["evidence_pruned"] = bound_evidence(run_dir)
                    except (MonitorProblem, OSError) as error:
                        failures.append("evidence_retention_failed")
                        status = "environment_blocked"
                        report["diagnostics"].append(str(error))
                result = stable_result(head, status, failures, config.state_dir)
                report["result"] = result
                report["finished_at"] = datetime.now(timezone.utc).isoformat()
                try:
                    if run_dir is not None:
                        atomic_json(run_dir / "report.json", report)
                    if history_ok:
                        history.append({"result": result, "finished_at": report["finished_at"],
                                        "run_dir": str(run_dir) if run_dir else None})
                        atomic_json(history_path, history[-20:])
                except (MonitorProblem, OSError, ValueError) as error:
                    failures.append("report_persistence_failed")
                    result = stable_result(head, "environment_blocked", failures, config.state_dir)
                    report["result"] = result
                    report["diagnostics"].append(str(error))
                # The fixed report is written last, with the final persistence
                # outcome; a corrupt history must not leave a healthy latest.
                atomic_json(config.state_dir / "latest.json", report)
            return result
    except MonitorProblem as problem:
        # A concurrent holder owns latest.json; never overwrite its report.
        failures.append(problem.code)
        if problem.code == "monitor_locked":
            try:
                head = source_state(config.source).head
            except (MonitorProblem, OSError):
                pass
        return stable_result(head, problem.status, failures, config.state_dir)
    except (OSError, ValueError, RuntimeError) as error:
        return stable_result(head, "environment_blocked", failures + ["monitor_environment"], config.state_dir)


class JsonArgumentParser(argparse.ArgumentParser):
    """Keep invalid invocation diagnostics off monitor stdout/stderr."""

    def error(self, message):
        """Raise a structured argument error instead of printing usage noise."""
        raise MonitorProblem("arguments_invalid", message)


def main(argv=None):
    """Print one stable JSON result; findings are data, not a failing exit code."""
    parser = JsonArgumentParser(description=__doc__)
    for flag in ("source", "state-dir", "node", "python", "axe"):
        parser.add_argument("--" + flag, required=True, type=absolute_path)
    parser.add_argument("--public-url")
    parser.add_argument("--allow-dirty", action="store_true", help="Manual testing only")
    previous_umask = os.umask(0o077)
    previous_term = signal.getsignal(signal.SIGTERM)

    def interrupt(signum, frame):
        """Unwind child and snapshot finally blocks on a scheduler SIGTERM."""
        raise KeyboardInterrupt

    signal.signal(signal.SIGTERM, interrupt)
    try:
        try:
            args = parser.parse_args(argv)
            result = run_monitor(Config(args.source, args.state_dir, args.node, args.python,
                                        args.axe, args.public_url, args.allow_dirty))
        except MonitorProblem as problem:
            result = stable_result(None, problem.status, [problem.code], None)
        sys.stdout.write(stable_json(result))
        return 0
    finally:
        signal.signal(signal.SIGTERM, previous_term)
        os.umask(previous_umask)


if __name__ == "__main__":
    sys.exit(main())
