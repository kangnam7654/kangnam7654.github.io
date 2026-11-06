"""Isolated unit tests, not substitutes for the real portfolio/browser QA.

Git writes occur only in disposable fixture repositories below SCRATCH. Mocks
exercise orchestration failure paths only; no production QA success is claimed.
Run: python3 -B -m unittest discover -s tools -p test_portfolio_maintenance.py -v
"""

from contextlib import redirect_stdout

import io
import json
import os
from pathlib import Path
import shutil
import stat
import subprocess
import sys
import tempfile
import time
import unittest
from unittest import mock

import portfolio_maintenance as monitor


class FixtureTest(unittest.TestCase):
    """Create private, disposable source/state fixtures, never the real repo."""

    def setUp(self):
        """Initialize a small real Git repository under the approved scratch."""
        monitor.SCRATCH.mkdir(parents=True, exist_ok=True)
        self.root = Path(tempfile.mkdtemp(prefix="portfolio-monitor-unit-", dir=str(monitor.SCRATCH)))
        self.root.chmod(0o700)
        self.source = self.root / "source"
        self.source.mkdir(mode=0o700)
        self.state = self.root / "state"
        self.git("init", "-q")
        (self.source / "tracked.txt").write_bytes(b"original\n")
        self.git("add", "tracked.txt")
        self.git("-c", "user.name=Monitor Unit Test", "-c", "user.email=unit@example.invalid",
                 "commit", "-qm", "fixture")
        self.config = monitor.Config(self.source, self.state, Path(sys.executable),
                                     Path(sys.executable), self.root / "axe.js")
        self.env = monitor.child_environment(self.config, self.root)

    def tearDown(self):
        """Remove all fixture artifacts after each isolated test."""
        shutil.rmtree(str(self.root))

    def git(self, *args):
        """Run Git only in this test's explicitly isolated fixture repository."""
        env = {"PATH": "/usr/bin:/bin:/opt/homebrew/bin", "HOME": str(self.root),
               "TMPDIR": str(monitor.SCRATCH), "GIT_CONFIG_NOSYSTEM": "1",
               "GIT_CONFIG_GLOBAL": "/dev/null", "GIT_OPTIONAL_LOCKS": "0"}
        return subprocess.check_output(["git", "-c", "core.hooksPath=/dev/null"] + list(args),
                                       cwd=str(self.source), env=env, stderr=subprocess.PIPE)

    def snapshot(self):
        """Copy actual tracked fixture files using the production helper."""
        destination = self.root / "snapshot"
        destination.mkdir(mode=0o700)
        entries = monitor.tracked_entries(monitor.source_state(self.source).index)
        digest = monitor.copy_or_hash(self.source, entries, destination)
        return destination, entries, digest

    def mock_checks(self, side_effect=None, return_value=None):
        """Mock only the orchestration seam, never a production QA artifact."""
        if return_value is None:
            return_value = ([], False)
        return mock.patch.object(monitor, "perform_checks", side_effect=side_effect,
                                 return_value=return_value)


class WorkspaceTests(FixtureTest):
    """Check dirty/lock/source-change guards against real Git fixture state."""

    def test_dirty_guard_does_not_build_or_modify_index(self):
        """Refuse dirty worktrees before executable or snapshot discovery."""
        (self.source / "tracked.txt").write_bytes(b"manual edit\n")
        before_index = (self.source / ".git/index").read_bytes()
        with self.mock_checks() as checks:
            result = monitor.run_monitor(self.config)
        self.assertEqual(result["status"], "workspace_busy")
        self.assertEqual(result["failed_checks"], ["workspace_dirty"])
        checks.assert_not_called()
        self.assertEqual(before_index, (self.source / ".git/index").read_bytes())
        self.assertFalse((self.source / "dist").exists())
        report = json.loads((self.state / "latest.json").read_text())
        self.assertNotIn("snapshot", report)
        self.assertEqual(report["result"], result)

    def test_untracked_files_are_dirty(self):
        """Treat untracked source changes as workspace-busy by default."""
        (self.source / "new.txt").write_text("untracked")
        with self.mock_checks() as checks:
            result = monitor.run_monitor(self.config)
        checks.assert_not_called()
        self.assertEqual(result["failed_checks"], ["workspace_dirty"])

    def test_allow_dirty_preserves_actual_bytes_not_index_or_untracked(self):
        """Manual override copies worktree bytes, including non-pointer media."""
        media = self.source / "sample.mp4"
        media.write_bytes(b"version https://git-lfs.github.com/spec/v1\noid sha256:fixture\n")
        self.git("add", "sample.mp4")
        media.write_bytes(b"\x00\x00actual hydrated binary worktree bytes\xff")
        (self.source / "untracked.secret").write_bytes(b"do not snapshot")
        self.config.allow_dirty = True
        observed = []

        def inspect(config, snapshot, run_dir, stages):
            """Inspect a unit fixture without executing any real QA command."""
            observed.append(snapshot)
            self.assertEqual((snapshot / "sample.mp4").read_bytes(), media.read_bytes())
            self.assertFalse((snapshot / "untracked.secret").exists())
            return [], False

        with self.mock_checks(side_effect=inspect):
            result = monitor.run_monitor(self.config)
        self.assertEqual(result["status"], "healthy")
        self.assertTrue(observed)
        self.assertFalse(observed[0].exists())
        self.assertEqual(media.read_bytes(), b"\x00\x00actual hydrated binary worktree bytes\xff")

    def test_lock_conflict_never_overwrites_holder_report(self):
        """A busy lock produces stable JSON and leaves latest.json alone."""
        monitor.private_directory(self.state)
        latest = self.state / "latest.json"
        latest.write_text('{"holder":"active"}\n')
        with monitor.state_lock(self.state), self.mock_checks() as checks:
            first = monitor.run_monitor(self.config)
            second = monitor.run_monitor(self.config)
        self.assertEqual(first, second)
        self.assertEqual(first["status"], "workspace_busy")
        self.assertEqual(first["failed_checks"], ["monitor_locked"])
        self.assertEqual(latest.read_text(), '{"holder":"active"}\n')
        checks.assert_not_called()

    def test_source_change_during_run_invalidates_healthy_snapshot(self):
        """Detect edits even if HEAD stays unchanged."""
        observed = []

        def edit(config, snapshot, run_dir, stages):
            """Introduce a fixture-only concurrent edit at the orchestration seam."""
            observed.append(snapshot)
            (self.source / "tracked.txt").write_text("changed during unit test")
            return [], False

        with self.mock_checks(side_effect=edit):
            result = monitor.run_monitor(self.config)
        self.assertEqual(result["status"], "workspace_busy")
        self.assertIn("source_changed", result["failed_checks"])
        self.assertFalse(observed[0].exists())

    def test_allow_dirty_same_status_but_new_bytes_is_detected(self):
        """Hash contents in addition to comparing HEAD and porcelain labels."""
        self.config.allow_dirty = True
        path = self.source / "tracked.txt"
        path.write_text("dirty before")
        initial_status = monitor.source_state(self.source).status

        def edit(config, snapshot, run_dir, stages):
            """Change bytes without changing a fixture's dirty-status label."""
            path.write_text("dirty after")
            self.assertEqual(initial_status, monitor.source_state(self.source).status)
            return [], False

        with self.mock_checks(side_effect=edit):
            result = monitor.run_monitor(self.config)
        self.assertEqual(result["status"], "workspace_busy")
        self.assertIn("source_changed", result["failed_checks"])

    def test_head_change_during_run_is_detected(self):
        """Invalidate results if a fixture commit changes while checks run."""
        old_head = monitor.source_state(self.source).head

        def commit(config, snapshot, run_dir, stages):
            """Commit only in the disposable unit repository to test the guard."""
            self.git("-c", "user.name=Unit", "-c", "user.email=unit@example.invalid",
                     "commit", "--allow-empty", "-qm", "concurrent fixture commit")
            return [], False

        with self.mock_checks(side_effect=commit):
            result = monitor.run_monitor(self.config)
        self.assertEqual(result["source_head"], old_head)
        self.assertEqual(result["status"], "workspace_busy")
        self.assertIn("source_changed", result["failed_checks"])

    def test_check_exception_still_removes_snapshot_and_reports(self):
        """Turn environment exceptions into a stable, diagnosable result."""
        observed = []

        def fail(config, snapshot, run_dir, stages):
            """Raise an explicit unit-test runner error, not fabricated QA output."""
            observed.append(snapshot)
            raise OSError("unit injected environment failure")

        with self.mock_checks(side_effect=fail):
            result = monitor.run_monitor(self.config)
        self.assertEqual(result["status"], "environment_blocked")
        self.assertEqual(result["failed_checks"], ["monitor_environment"])
        self.assertFalse(observed[0].exists())
        self.assertIn("unit injected", (self.state / "latest.json").read_text())

    def test_interruption_never_records_healthy_and_removes_snapshot(self):
        """Unwind the same cleanup path used by SIGTERM and keyboard interrupts."""
        observed = []

        def interrupt(config, snapshot, run_dir, stages):
            """Inject an interruption at an explicitly mocked unit-test seam."""
            observed.append(snapshot)
            raise KeyboardInterrupt

        with self.mock_checks(side_effect=interrupt):
            result = monitor.run_monitor(self.config)
        self.assertEqual(result["status"], "environment_blocked")
        self.assertIn("monitor_interrupted", result["failed_checks"])
        self.assertFalse(observed[0].exists())
        self.assertEqual(json.loads((self.state / "latest.json").read_text())["result"], result)

    def test_invalid_history_remains_diagnosable_without_healthy_latest(self):
        """A corrupt state artifact must not leave stdout and latest disagreeing."""
        monitor.private_directory(self.state)
        history = self.state / "history.json"
        history.write_text("invalid unit fixture history")
        with self.mock_checks():
            result = monitor.run_monitor(self.config)
        self.assertEqual(result["status"], "environment_blocked")
        self.assertIn("history_invalid", result["failed_checks"])
        self.assertEqual(json.loads((self.state / "latest.json").read_text())["result"], result)
        self.assertEqual(history.read_text(), "invalid unit fixture history")

    def test_unsafe_qa_environment_is_blocked_before_launch(self):
        """Missing output-isolation support must not fall back to source reports."""
        self.config.axe.write_text("// unit file-existence fixture")
        # Mock discovery only: no QA success, subprocess result or report is faked.
        with mock.patch.object(monitor, "CHROME", Path(sys.executable)), \
                mock.patch.object(monitor, "link_dependencies", return_value=Path(sys.executable)), \
                mock.patch.object(monitor, "run_stage") as stage:
            result = monitor.run_monitor(self.config)
        stage.assert_not_called()
        self.assertEqual(result["status"], "environment_blocked")
        self.assertEqual(result["failed_checks"], ["qa_environment_unsupported"])

    def test_retention_error_still_writes_matching_failure_report(self):
        """Evidence-limit failures must remain monitor data, not silent errors."""
        with self.mock_checks(), mock.patch.object(monitor, "bound_evidence",
                side_effect=monitor.MonitorProblem("unit_evidence_failure")):
            result = monitor.run_monitor(self.config)
        self.assertEqual(result["status"], "environment_blocked")
        self.assertIn("evidence_retention_failed", result["failed_checks"])
        self.assertEqual(json.loads((self.state / "latest.json").read_text())["result"], result)

    def test_stage_failures_are_results_not_cli_failure(self):
        """Monitor findings use exit zero while retaining stable failure IDs."""
        argv = ["--source", str(self.source), "--state-dir", str(self.state),
                "--node", sys.executable, "--python", sys.executable,
                "--axe", str(self.root / "axe.js")]
        stream = io.StringIO()
        with self.mock_checks(return_value=(["build_failed"], False)), redirect_stdout(stream):
            exit_code = monitor.main(argv)
        self.assertEqual(exit_code, 0)
        result = json.loads(stream.getvalue())
        self.assertEqual(result["status"], "needs_attention")
        self.assertEqual(result["failed_checks"], ["build_failed"])
        self.assertEqual(stream.getvalue().count("\n"), 1)

    def test_repeated_results_exclude_volatile_private_diagnostics(self):
        """Random snapshots and timestamps cannot change stdout's monitor key."""
        results = []
        reports = []
        with self.mock_checks():
            for unused in range(2):
                result = monitor.run_monitor(self.config)
                results.append(monitor.stable_json(result))
                reports.append(json.loads((self.state / "latest.json").read_text()))
        self.assertEqual(results[0], results[1])
        self.assertNotEqual(reports[0]["snapshot"], reports[1]["snapshot"])
        self.assertEqual(set(json.loads(results[0])), {
            "schema_version", "source_head", "status", "failed_checks", "report_path"})
        self.assertNotIn("portfolio-maintenance-", results[0])
        self.assertNotIn("seconds", results[0])
        self.assertNotIn("started_at", results[0])

    def test_retention_and_permissions(self):
        """Bound private run/history counts and protect report/lock permissions."""
        with self.mock_checks(), mock.patch.object(monitor, "KEEP_RUNS", 2):
            for unused in range(4):
                self.assertEqual(monitor.run_monitor(self.config)["status"], "healthy")
        self.assertEqual(len(list((self.state / "runs").iterdir())), 2)
        self.assertEqual(stat.S_IMODE(self.state.stat().st_mode), 0o700)
        for filename in ("latest.json", "history.json", "monitor.lock"):
            self.assertEqual(stat.S_IMODE((self.state / filename).stat().st_mode), 0o600)


class PathTests(FixtureTest):
    """Test source, dependency and private-state escape rejection."""

    def test_snapshot_excludes_generated_roots_and_untracked_files(self):
        """Do not copy tracked caches, ignored output, or arbitrary worktree data."""
        for directory in ("node_modules", "dist", ".astro", "nested/node_modules", ".vite"):
            path = self.source / directory / "cache.txt"
            path.parent.mkdir(parents=True)
            path.write_text("must not copy")
            self.git("add", "-f", str(path.relative_to(self.source)))
        (self.source / "untracked.txt").write_text("must not copy either")
        snapshot, entries, digest = self.snapshot()
        self.assertEqual(entries, [("tracked.txt", b"100644")])
        self.assertEqual((snapshot / "tracked.txt").read_bytes(), b"original\n")
        self.assertEqual(sorted(path.name for path in snapshot.iterdir()), ["tracked.txt"])
        self.assertEqual(monitor.copy_or_hash(self.source, entries), digest)

    def test_malformed_tracked_paths_are_rejected(self):
        """Reject path traversal, absolute names, controls and ambiguous segments."""
        for name in ("../escape", "/absolute", "a/../../escape", "a//b", "a/./b",
                     "bad\\path", "bad\nname", ""):
            with self.subTest(name=name), self.assertRaises(monitor.MonitorProblem):
                monitor.tracked_entries(b"100644 " + b"0" * 40 + b" 0\t" + os.fsencode(name) + b"\0")

    def test_symlink_or_submodule_index_entries_are_rejected(self):
        """Safe source snapshots deliberately support only regular files."""
        for mode in (b"120000", b"160000"):
            with self.subTest(mode=mode), self.assertRaises(monitor.MonitorProblem):
                monitor.tracked_entries(mode + b" " + b"0" * 40 + b" 0\tlink\0")

    def test_worktree_symlink_and_ancestor_escape_are_rejected(self):
        """Never follow a worktree replacement link outside the source."""
        target = self.root / "private.txt"
        target.write_text("private")
        path = self.source / "tracked.txt"
        path.unlink()
        path.symlink_to(target)
        with self.assertRaises(monitor.MonitorProblem):
            monitor.copy_or_hash(self.source, [("tracked.txt", b"100644")])
        directory = self.source / "nested"
        directory.symlink_to(self.root, target_is_directory=True)
        with self.assertRaises(monitor.MonitorProblem):
            monitor.copy_or_hash(self.source, [("nested/private.txt", b"100644")])

    def test_source_and_state_must_be_disjoint(self):
        """Reject a state directory that could mutate the source checkout."""
        self.config.state_dir = self.source / "private-state"
        result = monitor.run_monitor(self.config)
        self.assertEqual(result["status"], "environment_blocked")
        self.assertEqual(result["failed_checks"], ["unsafe_state"])
        self.assertFalse(self.config.state_dir.exists())

    def test_state_symlink_and_latest_symlink_do_not_touch_target(self):
        """Private outputs cannot be redirected through user-controlled links."""
        elsewhere = self.root / "elsewhere"
        elsewhere.mkdir()
        self.state.symlink_to(elsewhere, target_is_directory=True)
        result = monitor.run_monitor(self.config)
        self.assertEqual(result["status"], "environment_blocked")
        self.assertEqual(list(elsewhere.iterdir()), [])
        self.state.unlink()
        self.state.mkdir()
        sentinel = self.root / "sentinel.json"
        sentinel.write_text("do not touch")
        (self.state / "latest.json").symlink_to(sentinel)
        with self.mock_checks():
            result = monitor.run_monitor(self.config)
        self.assertEqual(result["status"], "environment_blocked")
        self.assertEqual(sentinel.read_text(), "do not touch")

    def dependency_fixture(self):
        """Create miniature package directories without installing any service."""
        modules = self.source / "node_modules"
        astro = modules / "astro"
        (astro / "custom").mkdir(parents=True)
        (astro / "custom/actual-cli.mjs").write_text("// unit fixture, never executed")
        (astro / "package.json").write_text(json.dumps({"bin": {"astro": "./custom/actual-cli.mjs"}}))
        (modules / "@scope/package").mkdir(parents=True)
        for cache in (".astro", ".vite", ".bin", ".cache"):
            (modules / cache).mkdir()
        snapshot = self.root / "deps-snapshot"
        snapshot.mkdir()
        return modules, snapshot

    def test_dependency_root_is_fresh_and_bin_is_read_from_package(self):
        """Keep package links but never share top-level cache directories."""
        modules, snapshot = self.dependency_fixture()
        cli = monitor.link_dependencies(self.source, snapshot)
        root = snapshot / "node_modules"
        self.assertFalse(root.is_symlink())
        self.assertTrue((root / "astro").is_symlink())
        self.assertFalse((root / "@scope").is_symlink())
        self.assertTrue((root / "@scope/package").is_symlink())
        self.assertEqual(cli, modules / "astro/custom/actual-cli.mjs")
        for cache in (".astro", ".vite", ".bin", ".cache"):
            self.assertFalse((root / cache).exists())
        (root / ".vite").mkdir()
        (root / ".vite/unit.txt").write_text("private snapshot cache")
        self.assertFalse((modules / ".vite/unit.txt").exists())

    def test_escaping_dependency_symlink_is_rejected(self):
        """Reject package links to files outside installed dependency storage."""
        modules, snapshot = self.dependency_fixture()
        (modules / "escape").symlink_to(self.root, target_is_directory=True)
        with self.assertRaises(monitor.MonitorProblem) as caught:
            monitor.link_dependencies(self.source, snapshot)
        self.assertEqual(caught.exception.code, "dependencies_unsafe")

    def test_escaping_astro_bin_is_rejected(self):
        """Read bin.astro but do not trust an escaping executable path."""
        modules, snapshot = self.dependency_fixture()
        (modules / "astro/package.json").write_text(json.dumps({"bin": {"astro": "../../escape.mjs"}}))
        with self.assertRaises(monitor.MonitorProblem) as caught:
            monitor.link_dependencies(self.source, snapshot)
        self.assertEqual(caught.exception.code, "astro_cli_unavailable")


class ProcessTests(FixtureTest):
    """Exercise real subprocess timeout, capped logs and environment handling."""

    def stage(self, code, timeout=10.0):
        """Run harmless unit-test Python, not simulated production browser QA."""
        return monitor.run_stage("unit_process", [sys.executable, "-B", "-c", code],
                                 self.root, self.env, self.root / "stage.log", timeout)

    def test_environment_allowlist_removes_auth_and_injection(self):
        """Do not pass secrets, proxies, Python paths or Node hooks to children."""
        poison = {"OPENAI_API_KEY": "not-a-real-secret", "GITHUB_TOKEN": "fixture",
                  "ANTHROPIC_API_KEY": "fixture", "SSH_AUTH_SOCK": "/private/fixture",
                  "HTTP_PROXY": "http://fixture.invalid", "NODE_OPTIONS": "--require fixture",
                  "PYTHONPATH": "/private/fixture"}
        with mock.patch.dict(os.environ, poison):
            env = monitor.child_environment(self.config, self.root)
        self.assertFalse(set(poison) & set(env))
        self.assertEqual(env["PATH"].split(":")[0], str(self.config.node.parent))
        self.assertEqual(env["ASTRO_TELEMETRY_DISABLED"], "1")
        self.assertEqual(env["PYTHONDONTWRITEBYTECODE"], "1")
        self.assertEqual(env["TMPDIR"], str(monitor.SCRATCH))
        result = self.stage("import os,json; print(json.dumps(sorted(os.environ)))")
        self.assertEqual(result.returncode, 0)
        self.assertNotIn("OPENAI_API_KEY", result.output)

    def test_nonzero_stage_has_stable_failure_id(self):
        """Map a real process failure to a fixed finding, not a traceback."""
        result = self.stage("import sys; print('unit-only failure detail'); sys.exit(7)")
        self.assertEqual(result.returncode, 7)
        self.assertEqual(monitor.stage_failure(result), ("unit_process_failed", "needs_attention"))
        self.assertIn("unit-only failure detail", Path(result.log_path).read_text())

    def test_missing_executable_has_stable_environment_result(self):
        """Treat missing local tooling as environment-blocked, with private detail."""
        result = monitor.run_stage("unit_missing", [self.root / "absent-executable"],
                                   self.root, self.env, self.root / "missing.log", 1)
        self.assertEqual(monitor.stage_failure(result), ("unit_missing_environment", "environment_blocked"))

    def test_logs_are_bounded_and_keep_tail(self):
        """Drain noisy processes without growing private logs without limit."""
        result = self.stage("import sys; sys.stdout.write('x'*2000000+'\\nTAIL-MARKER\\n')")
        self.assertEqual(result.returncode, 0)
        self.assertLessEqual(Path(result.log_path).stat().st_size, monitor.MAX_LOG_BYTES + 100)
        self.assertIn("TAIL-MARKER", result.output)
        self.assertIn("middle omitted", result.output)

    def test_timeout_kills_process_group_and_detached_grandchild(self):
        """Use real processes to verify timeout teardown, including new sessions."""
        sentinel = self.root / "grandchild-survived"
        grandchild_code = ("import time,pathlib; time.sleep(2.0); "
                           "pathlib.Path(" + repr(str(sentinel)) + ").write_text('survived'); time.sleep(20)")
        code = ("import subprocess,sys,time,json; "
                "child=subprocess.Popen([sys.executable,'-B','-c'," + repr(grandchild_code) + "],"
                "start_new_session=True); print(json.dumps({'pid':child.pid}),flush=True); time.sleep(30)")
        started = time.monotonic()
        result = self.stage(code, timeout=0.8)
        self.assertTrue(result.timed_out)
        self.assertLess(time.monotonic() - started, 5)
        self.assertIsNone(result.error)
        self.assertEqual(monitor.stage_failure(result), ("unit_process_timeout", "needs_attention"))
        pid = json.loads(result.output)["pid"]
        table = monitor.process_table()
        if pid in table:
            state = subprocess.check_output(["/bin/ps", "-o", "stat=", "-p", str(pid)]).decode().strip()
            self.assertTrue(state.startswith("Z"), "Detached grandchild still executing: " + state)
        time.sleep(1.4)
        self.assertFalse(sentinel.exists())


class ReportTests(FixtureTest):
    """Validate unit-only report fixtures and public URL security policy."""

    def test_unit_report_missing_or_incomplete_cannot_count_as_pass(self):
        """Exit zero alone is insufficient evidence of real QA completion."""
        path = self.root / "unit-report.json"
        for content in (None, "{}", '{"all_passed":true,"case_count":22,"cases":[]}', "not json"):
            with self.subTest(content=content):
                if content is not None:
                    path.write_text(content)
                with self.assertRaises(monitor.MonitorProblem) as caught:
                    monitor.validate_qa_report("qa_ab_contract", path)
                self.assertEqual(caught.exception.code, "qa_ab_contract_report_invalid")

    def test_unit_fixture_duplicate_or_failed_cases_are_rejected(self):
        """Synthetic fixtures test parsing only and do not stand in for QA."""
        report = {"all_passed": True, "actual_static_build": True, "case_count": 22,
                  "pure_contract": {"all_passed": True}, "external_service_used": False,
                  "analytics_collector": None, "cases": [
                      {"case": "unit-" + str(number), "passed": True,
                       "external_requests": [], "page_errors": []} for number in range(22)]}
        path = self.root / "unit-parser-fixture.json"
        path.write_text(json.dumps(report))
        self.assertEqual(monitor.validate_qa_report("qa_ab_contract", path)["case_count"], 22)
        report["cases"][-1]["case"] = report["cases"][0]["case"]
        path.write_text(json.dumps(report))
        with self.assertRaises(monitor.MonitorProblem):
            monitor.validate_qa_report("qa_ab_contract", path)

    def test_public_allowlist_rejects_credentials_query_fragment_and_redirect_hosts(self):
        """Production accepts exactly the canonical, credential-free HTTPS root."""
        self.assertEqual(monitor.validate_public_url(monitor.PUBLIC_URL), monitor.PUBLIC_URL)
        for url in ("http://kangnam7654.github.io/", "https://kangnam7654.github.io/?",
                    "https://kangnam7654.github.io/#", "https://kangnam7654.github.io/?x=1",
                    "https://kangnam7654.github.io/#fragment", "https://user:pass@kangnam7654.github.io/",
                    "https://kangnam7654.github.io:443/", "https://kangnam7654.github.io.evil.invalid/",
                    "https://example.invalid/", "http://127.0.0.1:1234/", "file:///etc/passwd"):
            with self.subTest(url=url), self.assertRaises(monitor.MonitorProblem):
                monitor.validate_public_url(url)
        loopback = "http://127.0.0.1:1234/"
        self.assertEqual(monitor.validate_public_url(loopback, allow_loopback=True), loopback)

    def test_public_probe_is_get_only_and_never_follows_redirects(self):
        """Exercise a real loopback server only through the explicit unit seam."""
        from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
        import threading

        requests = []

        class Handler(BaseHTTPRequestHandler):
            """Record read-only unit requests and issue a forbidden redirect."""

            def do_GET(self):
                """Return a redirect whose destination must never be requested."""
                requests.append((self.command, self.path))
                self.send_response(302)
                self.send_header("Location", "http://127.0.0.1:1/must-not-follow")
                self.end_headers()

            def log_message(self, format, *args):
                """Suppress routine test server access logs."""
                return

        server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            url = monitor.validate_public_url("http://127.0.0.1:" + str(server.server_port) + "/",
                                              allow_loopback=True)
            result = monitor.run_stage("unit_probe", [sys.executable, "-B", "-c",
                                       monitor.PUBLIC_PROBE_CODE, url], self.root, self.env,
                                       self.root / "probe.log", 5)
            self.assertEqual(result.returncode, 0)
            self.assertEqual(json.loads(result.output), {"status": 302, "html": False})
            self.assertEqual(requests, [("GET", "/")])
        finally:
            server.shutdown()
            server.server_close()
            thread.join(timeout=3)

    def test_image_evidence_cap_removes_only_image_artifacts(self):
        """Bound retained evidence without discarding diagnostic JSON/logs."""
        directory = self.root / "evidence"
        directory.mkdir()
        (directory / "screen.png").write_bytes(b"unit-image" * 100)
        (directory / "qa.json").write_text("{}")
        with mock.patch.object(monitor, "MAX_RUN_BYTES", 20):
            removed = monitor.bound_evidence(directory)
        self.assertEqual(removed, [str(directory / "screen.png")])
        self.assertEqual((directory / "qa.json").read_text(), "{}")


if __name__ == "__main__":
    unittest.main(verbosity=2)
