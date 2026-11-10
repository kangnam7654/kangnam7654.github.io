"""Check the C design without rewriting A/B evidence or promoting any variant."""

from functools import partial
import hashlib
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import importlib
import importlib.util
import json
from pathlib import Path
import threading
from urllib.parse import unquote, urlsplit


class QuietHandler(SimpleHTTPRequestHandler):
    """Suppress routine loopback request logs."""

    def log_message(self, format, *args):
        return


def sha256(path):
    """Return the actual file digest."""
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    """Compare every preserved file/route, then exercise the built C page."""
    root = Path(__file__).resolve().parents[1]
    qa = root / "docs/portfolio/notebook-c"
    baseline = json.loads((qa / "baseline.json").read_text())
    file_checks = {p: sha256(root / p) == old for p, old in baseline["tracked_files"].items()}
    assert all(file_checks.values()), [p for p, ok in file_checks.items() if not ok]
    spec = importlib.util.spec_from_file_location("studio_facts", root / "tools/check_studio_preview.py")
    assert spec is not None and spec.loader is not None, "Missing existing QA helper"
    facts_module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(facts_module)
    old_pages = json.loads((qa / "legacy-page-semantics.json").read_text())
    semantic_checks = {p: facts_module.PageFacts((root / "dist" / p).read_text()).semantic() == old for p, old in old_pages.items()}
    assert all(semantic_checks.values()), [p for p, ok in semantic_checks.items() if not ok]
    html = (root / "dist/c/index.html").read_text()
    facts = facts_module.PageFacts(html)
    assert facts.lang == "ko" and "noindex" in (facts.robots or "")
    assert len(facts.headings) == 1 and len(facts.ids) == len(set(facts.ids))
    assert "테르텐" not in " ".join(facts.text) and "Teruten" not in " ".join(facts.text)
    assert not any("ai-assessment-head" in (img["src"] or "") for img in facts.images)
    assert all(img["alt"] is not None for img in facts.images)
    checked_targets = set()
    for href in facts.links:
        url = urlsplit(href)
        if url.scheme or not url.path.startswith("/"):
            continue
        target = root / "dist" / unquote(url.path).lstrip("/")
        if target.is_dir():
            target /= "index.html"
        assert target.is_file(), href
        checked_targets.add(url.path)
    for item in json.loads((qa / "asset-provenance.json").read_text()):
        assert sha256(root / "public" / item["source"].lstrip("/")) == item["source_sha256"]
        assert sha256(root / "public" / item["derived"].lstrip("/")) == item["derived_sha256"]
    result = {"original_files_preserved": len(file_checks), "original_routes_semantically_preserved": len(semantic_checks), "local_targets_checked": len(checked_targets), "responsive": [], "accessibility": [], "demo": {}, "qualitative_design_approval": "awaiting user feedback; not established by these tests"}
    server = ThreadingHTTPServer(("127.0.0.1", 0), partial(QuietHandler, directory=str(root / "dist")))
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    base = "http://127.0.0.1:%s" % server.server_port
    axe = Path("/Users/kangnam/.hermes/cache/scratch/portfolio-audit-tools/axe-4.14.0.min.js")
    assert axe.is_file(), "Use a verified local axe-core file"
    sync_playwright = importlib.import_module("playwright.sync_api").sync_playwright
    try:
        with sync_playwright() as p:
            chrome = Path("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")
            browser = p.chromium.launch(executable_path=str(chrome) if chrome.exists() else None, headless=True)
            try:
                for width in (320, 375, 768, 1440):
                    context = browser.new_context(viewport={"width": width, "height": 900}, reduced_motion="reduce")
                    page = context.new_page()
                    errors = []
                    requests = []
                    page.on("pageerror", lambda error: errors.append(str(error)))
                    page.on("request", lambda req: requests.append(req.url))
                    response = page.goto(base + "/c/", wait_until="networkidle")
                    assert response.status == 200 and page.locator("h1").count() == 1
                    assert not page.evaluate("document.documentElement.scrollWidth > innerWidth + 1"), width
                    assert not errors, errors
                    for image in page.locator("img").all():
                        image.scroll_into_view_if_needed()
                        image.evaluate("im => im.decode()")
                        assert image.evaluate("im => im.complete && im.naturalWidth > 0"), image.get_attribute("src")
                    assert not [u for u in requests if not u.startswith(base)], requests
                    assert not [u for u in requests if urlsplit(u).path.endswith(".gif")], "Do not load animated demos before an explicit action"
                    assert page.locator('a[href="/kangnam-kim-resume.pdf"]').count() >= 1
                    assert page.locator('a[href="mailto:kangnam7653@gmail.com"]').count() >= 1
                    assert page.locator('a[href="/preview/ko/"]').count() + page.locator('a[href="/preview/ko/?review=1"]').count() >= 1
                    if width in (375, 1440):
                        page.add_script_tag(path=str(axe))
                        violations = page.evaluate("async()=> (await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}})).violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))")
                        assert not violations, violations
                        result["accessibility"].append({"width": width, "violations": violations})
                    result["responsive"].append({"width": width, "overflow": False, "page_errors": errors, "external_requests": [], "autoplay_gif_requests": []})
                    context.close()
                context = browser.new_context(viewport={"width": 375, "height": 812}, reduced_motion="no-preference")
                page = context.new_page()
                page.goto(base + "/c/", wait_until="networkidle")
                controls = page.locator("#nc-unreal-replay")
                assert controls.count() == 1 and controls.is_visible()
                button = controls.first
                with page.expect_request(lambda req: urlsplit(req.url).path == "/images/projects/ue5-mcp-spawn.gif"):
                    button.click()
                assert page.locator("#nc-unreal-image").get_attribute("src") == "/images/projects/ue5-mcp-spawn.gif"
                assert "정지" in button.inner_text()
                button.click()
                assert page.locator("#nc-unreal-image").get_attribute("src") == "/images/notebook/ue5-spawn-poster.webp"
                result["demo"] = {"opt_in_request": True, "pause_restores_poster": True}
                button.click()
                assert page.locator("#nc-unreal-image").get_attribute("src").endswith(".gif")
                page.emulate_media(reduced_motion="no-preference")
                page.emulate_media(reduced_motion="reduce")
                page.wait_for_function("document.getElementById('nc-unreal-image').getAttribute('src').endsWith('.webp')")
                result["demo"]["motion_preference_change_stops_demo"] = True
                page.goto(base + "/design-review/", wait_until="networkidle")
                assert page.locator('a[href="/c/"]').count() >= 1
                assert not page.evaluate("document.documentElement.scrollWidth > innerWidth + 1")
                context.close()
                context = browser.new_context(java_script_enabled=False, viewport={"width": 375, "height": 812})
                page = context.new_page()
                page.goto(base + "/c/", wait_until="load")
                assert page.locator("h1").inner_text().strip()
                assert page.locator("img").count() >= 2
                assert page.locator('a[href="/kangnam-kim-resume.pdf"]').count() >= 1
                result["no_js_core_content"] = True
                context.close()
            finally:
                browser.close()
    finally:
        server.shutdown()
        server.server_close()
        thread.join(timeout=3)
    result["accepted_functionally"] = True
    path = qa / "verification.json"
    path.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
