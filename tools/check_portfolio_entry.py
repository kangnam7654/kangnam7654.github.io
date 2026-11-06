"""Check the actual browser-only entry, storage information and comparison UI."""

from functools import partial
from http.server import ThreadingHTTPServer
from importlib import import_module
import json
from pathlib import Path
import re
import threading
from urllib.parse import unquote, urlsplit

from check_portfolio_ab_contract import CHROME, OUT, Quiet, ROOT

AXE = Path("/Users/kangnam/.hermes/cache/scratch/portfolio-audit-tools/axe-4.14.0.min.js")


def main():
    """Verify copy, responsive layout, local links, accessibility and no collection."""
    assert AXE.is_file(), "The locally available axe bundle is required."
    cfg = json.loads((ROOT / "src/data/portfolio-ab-config.json").read_text())
    manifest = json.loads((ROOT / "dist/experiments/portfolio-directions-v1.json").read_text())
    assert cfg["mode"] == "browser-only" and cfg["routingEnabled"] is True
    assert manifest["routing_enabled_in_build"] is True
    assert manifest["measurement"] == {"collector": None, "network_telemetry_enabled": False,
                                       "visitor_counters_enabled": False, "production_ab_data_available": False}
    assert manifest["configured_assignment_weights"] == {"type": 0.5, "objects": 0.5}
    assert manifest["deployment"]["state"] == "pending_public_release"
    scripts = set()
    for path in ("ab/index.html", "ab/privacy/index.html", "variants/type/index.html", "variants/objects/index.html"):
        text = (ROOT / "dist" / path).read_text()
        for src in re.findall(r'<script[^>]*\bsrc="([^"]+)"', text):
            assert src.startswith("/_astro/"), src
            scripts.add(src)
    for src in scripts:
        text = (ROOT / "dist" / src.lstrip("/")).read_text().lower()
        for forbidden in ("posthog", "googletagmanager", "google-analytics", "analytics.google", "firebase"):
            assert forbidden not in text, (src, forbidden)
    screenshots = OUT / "screenshots"
    screenshots.mkdir(parents=True, exist_ok=True)
    server = ThreadingHTTPServer(("127.0.0.1", 0), partial(Quiet, directory=str(ROOT / "dist")))
    worker = threading.Thread(target=server.serve_forever, daemon=True)
    worker.start()
    base = f"http://127.0.0.1:{server.server_port}"
    cases = []
    paths = ("/ab/?review=1", "/ab/privacy/", "/directions/")
    try:
        with import_module("playwright.sync_api").sync_playwright() as pw:
            browser = pw.chromium.launch(executable_path=CHROME, headless=True)
            try:
                for width in (320, 1440):
                    for path in paths:
                        ctx = browser.new_context(viewport={"width": width, "height": 900}, reduced_motion="reduce")
                        requests, errors = [], []

                        def guard(route):
                            """Block external network access during local verification."""
                            if urlsplit(route.request.url).netloc == urlsplit(base).netloc:
                                route.continue_()
                            else:
                                requests.append(route.request.url)
                                route.abort()

                        ctx.route("**/*", guard)
                        page = ctx.new_page()
                        page.on("pageerror", lambda error: errors.append(str(error)))
                        response = page.goto(base + path, wait_until="networkidle")
                        assert response is not None and response.status == 200
                        assert page.locator("h1").count() == 1
                        assert page.locator("html").get_attribute("lang") == "ko"
                        assert "noindex" in page.locator('meta[name="robots"]').get_attribute("content")
                        assert not page.evaluate("document.documentElement.scrollWidth > innerWidth+1"), (path, width)
                        assert page.evaluate("localStorage.length") == 0
                        assert page.evaluate("sessionStorage.length") == 0
                        assert page.locator("#portfolio-ab-consent").count() == 0
                        if path.startswith("/ab/?"):
                            assert "외부 분석 서비스나 방문 통계 수집은 사용하지 않습니다" in page.locator("main").inner_text()
                        elif path == "/ab/privacy/":
                            assert "외부 분석 서비스나 통계 수집기를 사용하지 않습니다" in page.locator("main").inner_text()
                            assert page.locator("#ab-reset-choice").is_visible()
                        for href in page.locator("a").evaluate_all("es=>es.map(e=>e.getAttribute('href'))"):
                            if href and href.startswith("/"):
                                target = ROOT / "dist" / unquote(urlsplit(href).path).lstrip("/")
                                if target.is_dir():
                                    target /= "index.html"
                                assert target.is_file(), href
                        page.add_script_tag(path=str(AXE))
                        violations = page.evaluate("async()=> (await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}})).violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}))")
                        assert not violations, (path, width, violations)
                        label = "entry" if path.startswith("/ab/?") else "storage" if path == "/ab/privacy/" else "comparison"
                        screenshot = screenshots / f"{label}-{width}.png"
                        page.screenshot(path=str(screenshot), full_page=True)
                        assert not requests, requests
                        assert not errors, errors
                        assert not ctx.cookies()
                        cases.append({"path": path, "width": width, "passed": True, "axe_violations": violations,
                                      "external_requests": requests, "page_errors": errors, "screenshot": str(screenshot)})
                        ctx.close()
            finally:
                browser.close()
    finally:
        server.shutdown()
        server.server_close()
        worker.join(timeout=3)
    expected = len(paths) * len((320, 1440))
    assert len(cases) == expected and len({(case["path"], case["width"]) for case in cases}) == expected
    report = {"actual_static_build": True, "compiled_local_script_count": len(scripts),
              "external_analytics_sdk": False, "cases": cases, "case_count": len(cases), "all_passed": True}
    (OUT / "entry.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
