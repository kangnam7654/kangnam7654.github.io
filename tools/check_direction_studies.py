"""Verify two additive first-screen studies without changing earlier receipts."""

from functools import partial
import hashlib
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import importlib.util
import json
from pathlib import Path
import threading
from urllib.parse import unquote, urlsplit



class QuietHandler(SimpleHTTPRequestHandler):
    """Suppress routine loopback request logs."""

    def log_message(self, format, *args):
        """Keep test output limited to the verification result."""
        return


def digest(path):
    """Return the SHA-256 of actual file bytes."""
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    """Check preserved files/routes, live studies, fonts and explicit interaction."""
    root = Path(__file__).resolve().parents[1]
    evidence = root / "docs/portfolio/direction-studies"
    scratch = Path("/Users/kangnam/.hermes/cache/scratch/portfolio-direction-studies")
    scratch.mkdir(parents=True, exist_ok=True)
    baseline = json.loads((evidence / "baseline.json").read_text())
    files = {p: digest(root / p) == h for p, h in baseline["tracked_files"].items()}
    assert all(files.values()), [p for p, ok in files.items() if not ok]
    spec = importlib.util.spec_from_file_location("page_facts", root / "tools/check_studio_preview.py")
    assert spec is not None and spec.loader is not None, "Missing existing page parser"
    facts_module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(facts_module)
    old_pages = json.loads((evidence / "page-baseline.json").read_text())
    pages = {p: facts_module.PageFacts((root / "dist" / p).read_text()).semantic() == old for p, old in old_pages.items()}
    assert all(pages.values()), [p for p, ok in pages.items() if not ok]
    routes = ("/directions/", "/directions/type/", "/directions/objects/")
    targets = set()
    for route in routes:
        html = (root / "dist" / route.lstrip("/") / "index.html").read_text()
        facts = facts_module.PageFacts(html)
        assert len(facts.headings) == 1 and facts.lang == "ko"
        assert "noindex" in (facts.robots or "")
        assert "Teruten" not in " ".join(facts.text) and "테르텐" not in " ".join(facts.text)
        assert not any("ai-assessment-head" in (im["src"] or "") for im in facts.images)
        for href in facts.links:
            url = urlsplit(href)
            if url.scheme or not url.path.startswith("/"):
                continue
            target = root / "dist" / unquote(url.path).lstrip("/")
            if target.is_dir():
                target /= "index.html"
            assert target.is_file(), href
            targets.add(url.path)
    fonts = json.loads((evidence / "fonts.json").read_text())
    for font in fonts:
        assert digest(root / font["local_file"]) == font["sha256"]
        assert digest(root / "dist" / font["local_file"].removeprefix("public/")) == font["sha256"]
    experiment_file = "experiments/portfolio-directions-v1.json"
    experiment = json.loads((root / "dist" / experiment_file).read_text())
    assert experiment == json.loads((root / "public" / experiment_file).read_text())
    assert experiment["owner_approved_candidates"] == ["A", "B"]
    assert experiment["variants"]["A"]["preview_url"] == "/directions/type/"
    assert experiment["variants"]["B"]["preview_url"] == "/directions/objects/"
    assert all(v["keep"] for v in experiment["variants"].values())
    assert experiment["original_url"] == "/"
    assert not experiment["automatic_assignment_enabled"]
    assert not experiment["automatic_promotion_enabled"]
    assert not experiment["automatic_traffic_reweighting_enabled"]
    assert not experiment["cookies_or_visitor_storage_enabled"]
    assert experiment["measurement"]["collector"] is None
    assert not experiment["measurement"]["network_telemetry_enabled"]
    result = {"files_preserved": len(files), "routes_preserved": len(pages), "new_study_routes": list(routes), "local_targets": len(targets), "font_bytes": sum(f["bytes"] for f in fonts), "browser_cases": [], "axe": [], "qualitative_approval": "both first-screen directions approved as A/B candidates; full pages and live experiment not yet reviewed"}
    server = ThreadingHTTPServer(("127.0.0.1", 0), partial(QuietHandler, directory=str(root / "dist")))
    worker = threading.Thread(target=server.serve_forever, daemon=True)
    worker.start()
    base = f"http://127.0.0.1:{server.server_port}"
    axe = Path("/Users/kangnam/.hermes/cache/scratch/portfolio-audit-tools/axe-4.14.0.min.js")
    try:
        with importlib.import_module("playwright.sync_api").sync_playwright() as playwright:
            browser = playwright.chromium.launch(executable_path="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless=True)
            try:
                for width in (320, 375, 650, 651, 768, 1023, 1024, 1440):
                    for route in routes:
                        context = browser.new_context(viewport={"width": width, "height": 900}, reduced_motion="reduce")
                        page = context.new_page()
                        errors, requests = [], []
                        page.on("pageerror", lambda error: errors.append(str(error)))
                        page.on("request", lambda req: requests.append(req.url))
                        response = page.goto(base + route, wait_until="networkidle")
                        assert response.status == 200
                        page.evaluate("document.fonts.ready")
                        assert not page.evaluate("document.documentElement.scrollWidth > innerWidth + 1"), (route, width)
                        assert page.locator("h1").count() == 1
                        if route == "/directions/":
                            assert page.locator("h2").all_inner_texts() == ["후보 A: 타이포그래피", "후보 B: 오브젝트"]
                            assert "아직 시작하지 않았습니다" in page.locator(".intro").inner_text()
                        assert not errors, errors
                        assert not [u for u in requests if not u.startswith(base)], requests
                        for image in page.locator("img").all():
                            image.evaluate("im=>im.decode()")
                            assert image.evaluate("im=>im.naturalWidth>0")
                        if route != "/directions/":
                            page.keyboard.press("Tab")
                            assert page.evaluate("document.activeElement.classList.contains('ad-skip')")
                            page.keyboard.press("Enter")
                            assert page.evaluate("document.activeElement.id.endsWith('-main')")
                            assert page.locator('a[href="/kangnam-kim-resume.pdf"]').is_visible()
                            assert page.evaluate("document.fonts.check('25px BricolageStudy', 'Kangnam Kim')")
                        if route.endswith("/type/"):
                            assert page.evaluate("document.fonts.check('140px NameBlock','김강남')")
                        if route.endswith("/objects/"):
                            button = page.locator("#ad-arrange")
                            assert button.is_visible()
                            old_box = page.locator(".ad-object-mint").bounding_box()
                            button.focus()
                            page.keyboard.press("Enter")
                            assert page.locator("#ad-stage").get_attribute("data-layout") == "grouped"
                            assert page.locator(".ad-object-mint").bounding_box() != old_box
                            assert "모았습니다" in page.locator("#ad-art-status").inner_text()
                            assert page.locator(".ad-object-mint").evaluate("el=>getComputedStyle(el).transitionDuration") == "0s"
                            button.click()
                            assert page.locator("#ad-stage").get_attribute("data-layout") == "scattered"
                        if width in (375, 1440):
                            page.add_script_tag(path=str(axe))
                            violations = page.evaluate("async()=> (await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))")
                            result["axe"].append({"route": route, "width": width, "violations": violations})
                            page.screenshot(path=str(scratch / f"{route.strip('/').replace('/', '-')}-{width}.png"), full_page=True)
                            assert not violations, (route, width, violations)
                        result["browser_cases"].append({"route": route, "width": width, "overflow": False, "page_errors": errors, "external_requests": []})
                        context.close()
                for route in routes[1:]:
                    context = browser.new_context(java_script_enabled=False, viewport={"width": 375, "height": 812})
                    page = context.new_page()
                    page.goto(base + route, wait_until="load")
                    assert page.locator("h1").inner_text().strip()
                    assert page.locator('a[href="/kangnam-kim-resume.pdf"]').is_visible()
                    if route.endswith("/objects/"):
                        assert page.locator("#ad-arrange").is_hidden()
                        assert page.locator(".ad-object").count() == 3
                    context.close()
                result["no_js_core"] = True
                result["explicit_keyboard_rearrangement"] = True
                result["reduced_motion"] = True
            finally:
                browser.close()
    finally:
        server.shutdown()
        server.server_close()
        worker.join(timeout=3)
    result["browser_case_count"] = len(result["browser_cases"])
    result["ab_candidates"] = {"A": "type", "B": "objects", "both_retained": True, "live_assignment": False, "telemetry": False}
    result["functional_checks_passed"] = True
    (evidence / "verification.json").write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
