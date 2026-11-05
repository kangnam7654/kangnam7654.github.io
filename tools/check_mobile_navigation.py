"""Regression checks for the original portfolio's mobile navigation and CTA.

Serve the built static pages on loopback, check real hit targets, menu state,
keyboard dismissal and contrast, then stop the temporary server.
"""

from functools import partial
import hashlib
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import importlib
import json
from pathlib import Path
import threading


def sha256(path):
    """Return a file digest."""
    return hashlib.sha256(path.read_bytes()).hexdigest()


class QuietHandler(SimpleHTTPRequestHandler):
    """Suppress routine local HTTP logs."""

    def log_message(self, format, *args):
        return


def main():
    """Verify the precise fix scope and exercise the original portfolio."""
    root = Path(__file__).resolve().parents[1]
    qa = root / "docs/portfolio/mobile-navigation-20261105"
    baseline = json.loads((qa / "baseline.json").read_text())
    changed = [p for p, old in baseline["tracked_files"].items() if sha256(root / p) != old]
    assert set(changed) == set(baseline["expected_modified_files"]), changed
    handler = partial(QuietHandler, directory=str(root / "dist"))
    server = ThreadingHTTPServer(("127.0.0.1", 0), handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    base = "http://127.0.0.1:%s" % server.server_port
    sync_playwright = importlib.import_module("playwright.sync_api").sync_playwright
    cases = []
    try:
        with sync_playwright() as p:
            chrome = Path("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")
            browser = p.chromium.launch(executable_path=str(chrome) if chrome.exists() else None, headless=True)
            try:
                for locale, path in (("ko", "/"), ("en", "/en/"), ("ja", "/ja/")):
                    for theme in ("light", "dark"):
                        context = browser.new_context(viewport={"width": 375, "height": 812}, color_scheme=theme, reduced_motion="reduce")
                        context.add_init_script("localStorage.setItem('theme', '%s')" % theme)
                        page = context.new_page()
                        errors = []
                        page.on("pageerror", lambda error: errors.append(str(error)))
                        page.goto(base + path, wait_until="networkidle")
                        for width in (320, 360, 390, 430, 768):
                            page.set_viewport_size({"width": width, "height": 812})
                            menu = page.locator("#mobile-menu-btn")
                            assert menu.is_visible()
                            hit = menu.evaluate("b=>{const r=b.getBoundingClientRect();return {correct:b.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2)),width:r.width,height:r.height}}")
                            assert hit["correct"] and hit["width"] >= 44 and hit["height"] >= 44, (locale, theme, width, hit)
                            before_theme = page.locator("html").get_attribute("class") or ""
                            menu.click()
                            assert menu.get_attribute("aria-expanded") == "true"
                            assert page.locator("#mobile-menu").is_visible()
                            assert (page.locator("html").get_attribute("class") or "") == before_theme
                            page.keyboard.press("Escape")
                            assert menu.get_attribute("aria-expanded") == "false"
                            assert not page.locator("#mobile-menu").is_visible()
                            assert menu.evaluate("b=>document.activeElement===b")
                            menu.click()
                            page.locator(".mobile-link").first.click()
                            assert menu.get_attribute("aria-expanded") == "false"
                            page.evaluate("scrollTo(0,0)")
                            # Observe legacy timeline overflow separately from the header fix.
                            layout = page.evaluate("({viewport:innerWidth, width:document.documentElement.scrollWidth})")
                            cases.append({"locale": locale, "theme": theme, "width": width, "menu_hit_correct": True, "menu_touch_target": hit, "aria_state": True, "escape_focus_return": True, "link_closes_menu": True, "observed_legacy_document_overflow_px": max(0, layout['width'] - layout['viewport'])})
                        # The theme control is independently usable, not hidden under the menu.
                        toggle = page.locator("#floating-theme-toggle")
                        before = page.locator("html").get_attribute("class") or ""
                        toggle.click()
                        assert (page.locator("html").get_attribute("class") or "") != before
                        toggle.click()
                        assert (page.locator("html").get_attribute("class") or "") == before
                        # CTA colors intentionally transition for 200ms after a theme change.
                        page.wait_for_timeout(250)
                        ratio = page.locator("#hero a").first.evaluate("""a=>{
                          const c=getComputedStyle(a),toL=rgb=>rgb.match(/[\\d.]+/g).slice(0,3).map(Number).map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
                          const fg=toL(c.color),bg=toL(c.backgroundColor); return {foreground:c.color,background:c.backgroundColor,ratio:(Math.max(fg,bg)+.05)/(Math.min(fg,bg)+.05)};
                        }""")
                        assert ratio["ratio"] >= 4.5, (locale, theme, ratio)
                        assert not errors, errors
                        for case in cases:
                            if case["locale"] == locale and case["theme"] == theme:
                                case["hero_cta_contrast"] = ratio
                        context.close()
            finally:
                browser.close()
    finally:
        server.shutdown()
        server.server_close()
        thread.join(timeout=3)
    result = {"accepted": True, "base_commit": baseline["base_commit"], "existing_files_modified": changed, "unmodified_original_tracked_files": len(baseline["tracked_files"]) - len(changed), "mobile_cases": len(cases), "cases": cases}
    (qa / "verification.json").write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps({k: v for k, v in result.items() if k != "cases"}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
