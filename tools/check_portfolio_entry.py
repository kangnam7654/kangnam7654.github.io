"""Exercise the built real entry/privacy pages without enabling collection."""

from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from importlib import import_module
import json
from pathlib import Path
import threading


class Quiet(SimpleHTTPRequestHandler):
    """Keep local verification output bounded."""

    def log_message(self, format, *args):
        """Suppress routine loopback logs."""
        return


def main():
    """Check actual built routing, no-JS choices, privacy withdrawal and off flags."""
    root = Path(__file__).resolve().parents[1]
    config = json.loads((root / "src/data/portfolio-ab-config.json").read_text())
    assert config["launchEnabled"] is False and config["analyticsEnabled"] is False
    assert config["posthogPublicToken"] == ""
    manifest = json.loads((root / "dist/experiments/portfolio-directions-v1.json").read_text())
    assert not manifest["automatic_assignment_enabled"] and not manifest["measurement"]["network_telemetry_enabled"]
    for name in ("type", "objects"):
        assert any(v["full_url"] == config["variants"][name] for v in manifest["variants"].values())
    server = ThreadingHTTPServer(("127.0.0.1", 0), partial(Quiet, directory=str(root / "dist")))
    worker = threading.Thread(target=server.serve_forever, daemon=True)
    worker.start()
    base = f"http://127.0.0.1:{server.server_port}"
    results = []
    try:
        with import_module("playwright.sync_api").sync_playwright() as pw:
            browser = pw.chromium.launch(executable_path="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless=True)
            try:
                for variant in ("type", "objects"):
                    context = browser.new_context(viewport={"width": 375, "height": 812})
                    page = context.new_page()
                    requests, errors = [], []
                    page.on("request", lambda req: requests.append(req.url))
                    page.on("pageerror", lambda error: errors.append(str(error)))
                    page.goto(base + f"/ab/?review=1&variant={variant}", wait_until="networkidle")
                    assert f"/variants/{variant}/" in page.url and "review=1" in page.url
                    assert page.locator("body").get_attribute("data-ab-variant") == variant
                    assert page.evaluate("sessionStorage.length") == 0
                    page.goto(base + "/ab/privacy/", wait_until="networkidle")
                    assert "실제 통계 수집이 꺼져" in page.locator("main").inner_text()
                    page.locator("#ab-withdraw").click()
                    assert "임시 방문 식별자를 지웠습니다" in page.locator("#ab-privacy-status").inner_text()
                    assert not page.evaluate("document.documentElement.scrollWidth > innerWidth+1")
                    assert not [url for url in requests if not url.startswith(base)]
                    assert not errors, errors
                    results.append({"variant": variant, "actual_local_entry": True, "privacy_control": True, "external_requests": [], "page_errors": []})
                    context.close()
                context = browser.new_context(java_script_enabled=False)
                page = context.new_page()
                page.goto(base + "/ab/", wait_until="load")
                assert page.locator('a[href="/variants/type/?review=1"]').is_visible()
                assert page.locator('a[href="/variants/objects/?review=1"]').is_visible()
                context.close()
                for width in (320, 1440):
                    context = browser.new_context(viewport={"width": width, "height": 900})
                    page = context.new_page()
                    response = page.goto(base + "/directions/", wait_until="networkidle")
                    assert response.status == 200
                    assert page.locator('a[href="/variants/type/?review=1"]').count() == 1
                    assert page.locator('a[href="/variants/objects/?review=1"]').count() == 1
                    assert not page.evaluate("document.documentElement.scrollWidth > innerWidth+1")
                    context.close()
            finally:
                browser.close()
    finally:
        server.shutdown()
        server.server_close()
        worker.join(timeout=3)
    report = {"actual_built_entry_cases": results, "no_js_fallback": True, "production_flags_off": True, "actual_provider_ingestion": False, "all_passed": True}
    (root / "docs/portfolio/live-ab/entry-verification.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
