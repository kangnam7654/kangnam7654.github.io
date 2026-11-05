"""Verify additive portfolio previews, legacy preservation and browser behavior.

Run after ``npm run build``. Browser checks use Playwright and a local Chrome;
no visitor data is downloaded and the temporary HTTP server stops on completion.
"""

import argparse
from functools import partial
import hashlib
import importlib
from html.parser import HTMLParser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
from pathlib import Path
import subprocess
import threading
from urllib.parse import unquote, urlsplit


class PageFacts(HTMLParser):
    """Collect semantic page evidence without generated CSS/script hashes."""

    def __init__(self, text):
        super().__init__()
        self.skip = 0
        self.text = []
        self.links = []
        self.images = []
        self.ids = []
        self.lang = None
        self.robots = None
        self.headings = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in ("script", "style"):
            self.skip += 1
        if tag == "html":
            self.lang = attrs.get("lang")
        if tag == "a":
            self.links.append(attrs.get("href", ""))
        if tag == "img":
            self.images.append({"src": attrs.get("src"), "alt": attrs.get("alt")})
        if tag == "meta" and attrs.get("name") == "robots":
            self.robots = attrs.get("content", "")
        if "id" in attrs:
            self.ids.append(attrs["id"])
        if tag == "h1":
            self.headings.append(tag)

    def handle_endtag(self, tag):
        if tag in ("script", "style"):
            self.skip -= 1

    def handle_data(self, data):
        if not self.skip and data.strip():
            self.text.append(" ".join(data.split()))

    def semantic(self):
        return {"text": self.text, "links": self.links, "images": self.images, "lang": self.lang}


def digest(path):
    """Return a file's SHA-256 digest."""
    return hashlib.sha256(path.read_bytes()).hexdigest()


def capture_legacy(dist):
    """Capture semantic evidence for every original HTML route."""
    return {str(p.relative_to(dist)): PageFacts(p.read_text()).semantic() for p in sorted(dist.rglob("*.html"))}


class QuietHandler(SimpleHTTPRequestHandler):
    """Keep successful browser QA requests out of the report."""

    def log_message(self, format, *args):
        return


def browser_checks(root, axe_file):
    """Exercise responsive pages and feedback on an ephemeral local server."""
    sync_playwright = importlib.import_module("playwright.sync_api").sync_playwright

    handler = partial(QuietHandler, directory=str(root / "dist"))
    server = ThreadingHTTPServer(("127.0.0.1", 0), handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    base = "http://127.0.0.1:%s" % server.server_port
    results = {"pages": [], "feedback": {}, "javascript_disabled": {}, "a11y": []}
    try:
        with sync_playwright() as p:
            executable = Path("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")
            browser = p.chromium.launch(executable_path=str(executable) if executable.exists() else None, headless=True)
            try:
                for lang in ("ko", "en", "ja"):
                    context = browser.new_context(viewport={"width": 1440, "height": 1000}, reduced_motion="reduce")
                    page = context.new_page()
                    errors = []
                    page.on("pageerror", lambda error: errors.append(str(error)))
                    page.add_init_script("window.__portfolioEvents=[]; window.addEventListener('portfolio:interaction', e=>window.__portfolioEvents.push(e.detail));")
                    for width in (320, 375, 768, 1440):
                        page.set_viewport_size({"width": width, "height": 900})
                        response = page.goto(base + "/preview/" + lang + "/", wait_until="networkidle")
                        assert response.status == 200
                        assert page.locator("html").get_attribute("lang") == lang
                        assert page.locator("h1").count() == 1
                        overflow = page.evaluate("document.documentElement.scrollWidth > innerWidth + 1")
                        assert not overflow, (lang, width, "horizontal overflow")
                        assert page.locator("#studio-review-tools").is_hidden()
                        assert not errors, errors
                        if axe_file and width in (375, 1440):
                            page.add_script_tag(path=str(axe_file))
                            violations = page.evaluate("async()=> (await axe.run(document, {runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}})).violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))")
                            results["a11y"].append({"lang": lang, "width": width, "violations": violations})
                            assert not violations, violations
                        results["pages"].append({"lang": lang, "width": width, "status": response.status, "overflow": overflow, "errors": list(errors)})
                    assert any(e["event"] == "preview_view" for e in page.evaluate("window.__portfolioEvents"))
                    resume = page.locator('a[data-studio-action="resume"]').first
                    assert resume.count() == 1
                    # Observe the real click event without navigating to an external PDF.
                    resume.evaluate("a=>a.addEventListener('click',e=>e.preventDefault())")
                    resume.click()
                    assert any(e["event"] == "resume_open" for e in page.evaluate("window.__portfolioEvents"))
                    context.close()

                context = browser.new_context(viewport={"width": 375, "height": 812}, reduced_motion="reduce")
                page = context.new_page()
                outgoing = []
                page.on("request", lambda req: outgoing.append(req.url))
                page.goto(base + "/preview/ko/?review=1", wait_until="networkidle")
                # Feedback mode remains explicit when switching the preview language.
                assert "review=1" in page.locator('.studio-languages a[lang="en"]').get_attribute("href")
                page.locator("#studio-review-open").click()
                assert page.locator("#studio-review-dialog").is_visible()
                page.keyboard.press("Escape")
                assert not page.locator("#studio-review-dialog").is_visible()
                page.locator("#studio-review-open").click()
                page.locator("#studio-review-copy").click()
                assert page.locator("#studio-review-status").inner_text().strip()
                page.locator("#studio-review-good").fill("첫 화면이 명확함 <img src=x onerror=alert(1)>")
                page.locator("#studio-review-change").fill("모바일 제목 간격을 조금 줄여 주세요.")
                page.reload(wait_until="networkidle")
                page.locator("#studio-review-open").click()
                assert "첫 화면" in page.locator("#studio-review-good").input_value()
                assert page.locator("img[src='x']").count() == 0
                # Exercise clipboard denial without requesting a browser permission.
                page.evaluate("Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw new Error('denied for test')}}})")
                page.locator("#studio-review-copy").click()
                assert page.locator("#studio-review-fallback").is_visible()
                assert "studio-v1" in page.locator("#studio-review-fallback").input_value()
                with page.expect_download() as download_event:
                    page.locator("#studio-review-download").click()
                download = download_event.value
                payload = json.loads(Path(download.path()).read_text())
                assert payload["variant"] == "studio-v1" and payload["locale"] == "ko"
                assert "첫 화면" in payload["good"]
                page.locator("#studio-review-clear").click()
                assert not page.locator("#studio-review-good").input_value()
                assert not page.locator("#studio-review-change").input_value()
                assert page.evaluate("sessionStorage.getItem('portfolio-review:studio-v1:ko')") is None
                results["feedback"] = {"dialog": True, "escape_closes": True, "empty_validation": True, "draft_reload": True, "text_not_html": True, "clipboard_denial_fallback": True, "json_download": True, "clear": True, "external_requests": [u for u in outgoing if not u.startswith(base)]}
                assert not results["feedback"]["external_requests"], results["feedback"]["external_requests"]
                context.close()
                context = browser.new_context(java_script_enabled=False, viewport={"width": 375, "height": 812})
                page = context.new_page()
                page.goto(base + "/preview/en/", wait_until="load")
                assert page.locator("h1").inner_text().strip()
                assert page.locator('a[data-studio-action="project"]').count() >= 3
                assert page.locator('a[data-studio-action="resume"]').count() >= 1
                results["javascript_disabled"] = {"headline": True, "project_links": True, "resume_link": True}
                context.close()
                context = browser.new_context(viewport={"width": 375, "height": 812})
                page = context.new_page()
                page.goto(base + "/design-lab/", wait_until="networkidle")
                assert not page.evaluate("document.documentElement.scrollWidth > innerWidth + 1")
                assert page.locator('a[href="/preview/ko/?review=1"]').count() >= 1
                results["comparison_page"] = True
                context.close()
            finally:
                browser.close()
    finally:
        server.shutdown()
        server.server_close()
        thread.join(timeout=3)
    return results


def main():
    """Run the requested baseline capture or additive-preview acceptance checks."""
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--capture-legacy", type=Path)
    parser.add_argument("--browser", action="store_true")
    parser.add_argument("--axe", type=Path)
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    qa = root / "docs/portfolio/studio-v1"
    if args.capture_legacy:
        path = qa / "legacy-page-semantics.json"
        assert not path.exists(), "Do not overwrite the original baseline"
        data = capture_legacy(args.capture_legacy)
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
        print(json.dumps({"captured_legacy_pages": len(data), "path": str(path)}))
        return
    baseline = json.loads((qa / "baseline.json").read_text())
    original_unchanged = {name: digest(root / name) == old for name, old in baseline["tracked_files"].items()}
    expected = dict(baseline["tracked_files"])
    maintenance = qa / "accepted-maintenance.json"
    maintenance_checks = {}
    if maintenance.exists():
        approved = json.loads(maintenance.read_text())
        commit = approved["commit"]
        assert len(commit) == 40 and all(c in "0123456789abcdef" for c in commit)
        subprocess.run(["git", "merge-base", "--is-ancestor", commit, "HEAD"], cwd=root, check=True)
        allowed = {"src/components/layout/Navbar.astro", "src/components/ui/FloatingControls.astro", "src/styles/global.css"}
        assert set(approved["expected_overrides"]) == allowed
        for name, exact_hash in approved["expected_overrides"].items():
            blob = subprocess.check_output(["git", "show", commit + ":" + name], cwd=root)
            assert hashlib.sha256(blob).hexdigest() == exact_hash
            expected[name] = exact_hash
            maintenance_checks[name] = digest(root / name) == exact_hash
    unchanged = {name: digest(root / name) == old for name, old in expected.items()}
    assert all(unchanged.values()), [p for p, same in unchanged.items() if not same]
    legacy = json.loads((qa / "legacy-page-semantics.json").read_text())
    legacy_checks = {name: PageFacts((root / "dist" / name).read_text()).semantic() == old for name, old in legacy.items()}
    assert all(legacy_checks.values()), [p for p, same in legacy_checks.items() if not same]
    contract = json.loads((root / "public/experiments/portfolio-studio-v1.json").read_text())
    assert contract["phase"] == "preview_only" and contract["production_default"] == "A"
    assert contract["automatic_assignment_enabled"] is False
    assert contract["automatic_promotion_enabled"] is False
    assert contract["measurement"]["collector"] is None
    checked_links = set()
    pages = []
    for lang in ("ko", "en", "ja"):
        name = "preview/%s/index.html" % lang
        html = (root / "dist" / name).read_text()
        facts = PageFacts(html)
        assert facts.lang == lang and "noindex" in (facts.robots or "")
        assert len(facts.headings) == 1
        assert len(facts.ids) == len(set(facts.ids)), (lang, "duplicate ids")
        assert not any("ai-assessment-head.png" in (img["src"] or "") for img in facts.images)
        assert all(img["alt"] is not None for img in facts.images)
        assert "테르텐" not in " ".join(facts.text) and "Teruten" not in " ".join(facts.text)
        for href in facts.links:
            url = urlsplit(href)
            if url.scheme or not url.path.startswith("/"):
                continue
            target = root / "dist" / unquote(url.path).lstrip("/")
            if target.is_dir():
                target /= "index.html"
            assert target.is_file(), (lang, href)
            checked_links.add(url.path)
        pages.append(name)
    pdf = root / "dist/kangnam-kim-resume.pdf"
    assert pdf.read_bytes().startswith(b"%PDF-")
    result = {"base_commit": baseline["base_commit"], "original_tracked_files_checked": len(unchanged), "unchanged_original_tracked_files": sum(original_unchanged.values()), "accepted_maintenance_files_verified": maintenance_checks, "legacy_pages_semantically_unchanged": len(legacy_checks), "preview_pages_checked": pages, "unique_internal_targets_checked": len(checked_links), "original_default_preserved": True, "live_ab_running": False, "private_employer_not_added": True}
    if args.browser:
        result["browser"] = browser_checks(root, args.axe)
    result["accepted"] = True
    out = qa / "verification.json"
    out.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
