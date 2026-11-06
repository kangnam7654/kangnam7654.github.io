"""Verify browser-only A/B routing against the actual static build.

No synthetic analytics service, ingestion token, or provider config is used.
External requests are blocked and treated as failures. Reports stay in scratch.
"""

from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from importlib import import_module
import json
import os
from pathlib import Path
import subprocess
import threading
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
OUT = Path(os.environ.get("PORTFOLIO_AB_QA_OUT", "/Users/kangnam/.hermes/cache/scratch/portfolio-simple-ab"))
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"


class Quiet(SimpleHTTPRequestHandler):
    """Serve the real build with bounded output."""

    def log_message(self, format, *args):
        """Suppress routine loopback request logs."""
        return


def check_pure_contract():
    """Bundle the actual unmodified client and exercise its pure predicates."""
    code = r"""
const assert = require('node:assert/strict');
const result = require('esbuild').buildSync({entryPoints:['src/lib/portfolio-ab.ts'],
  bundle:true,platform:'node',format:'cjs',write:false});
const mod = {exports:{}};
new Function('module','exports',result.outputFiles[0].text)(mod,mod.exports);
const ab = mod.exports;
const valid = [[0,'type'],[2147483647,'type'],[2147483648,'objects'],[4294967295,'objects']];
for (const [sample,wanted] of valid) assert.equal(ab.pickVariant(sample),wanted);
const invalid = [-1,4294967296,0.5,NaN,Infinity,'0',null];
for (const sample of invalid) assert.throws(()=>ab.pickVariant(sample));
for (const value of ['type','objects']) assert.equal(ab.isVariant(value),true);
for (const value of ['',null,'https://example.invalid/']) assert.equal(ab.isVariant(value),false);
process.stdout.write(JSON.stringify({boundary_samples:valid.length,invalid_samples:invalid.length,
  variant_predicates:5,all_passed:true}));
"""
    run = subprocess.run(["node", "-e", code], cwd=ROOT, text=True, capture_output=True, check=True)
    return json.loads(run.stdout)


def main():
    """Exercise persistence, review, privacy signals and failure fallbacks."""
    OUT.mkdir(parents=True, exist_ok=True)
    cfg = json.loads((ROOT / "src/data/portfolio-ab-config.json").read_text())
    assert cfg["mode"] == "browser-only" and cfg["routingEnabled"] is True
    client = (ROOT / "src/lib/portfolio-ab.ts").read_text()
    for forbidden in ("posthog", "google", "fetch(", "sendBeacon", "XMLHttpRequest", "WebSocket", "randomUUID", "eventPayload"):
        assert forbidden not in client, forbidden
    pure = check_pure_contract()
    server = ThreadingHTTPServer(("127.0.0.1", 0), partial(Quiet, directory=str(ROOT / "dist")))
    worker = threading.Thread(target=server.serve_forever, daemon=True)
    worker.start()
    base = f"http://127.0.0.1:{server.server_port}"
    cases = []
    scenarios = [
        {"name": "fresh_type", "sample": 0, "want": "type"},
        {"name": "fresh_objects", "sample": 4294967295, "want": "objects"},
        {"name": "remember_type", "sample": 4294967295, "saved": "type", "want": "type"},
        {"name": "remember_objects", "sample": 0, "saved": "objects", "want": "objects"},
        {"name": "invalid_saved_value", "sample": 0, "saved": "not-a-variant", "want": "type"},
        {"name": "storage_read_blocked", "sample": 4294967295, "want": "objects"},
        {"name": "storage_write_blocked", "sample": 0, "want": "type"},
        {"name": "storage_unavailable", "sample": 4294967295, "want": "objects"},
        {"name": "gpc", "sample": 0, "saved": "objects", "want": "type"},
        {"name": "dnt", "sample": 4294967295, "saved": "type", "want": "objects"},
        {"name": "crypto_fallback", "sample": 0, "want": "objects"},
        {"name": "legacy_cleanup", "sample": 0, "want": "type"},
        {"name": "query_not_forwarded", "sample": 0, "want": "type"},
        {"name": "review", "saved": "objects"},
        {"name": "qa", "saved": "type"},
        {"name": "forced_review", "saved": "type"},
        {"name": "invalid_forced_review", "saved": "objects"},
        {"name": "direct_type"},
        {"name": "direct_objects"},
        {"name": "reset", "saved": "objects"},
        {"name": "reset_blocked", "saved": "type"},
        {"name": "no_javascript"},
    ]
    try:
        with import_module("playwright.sync_api").sync_playwright() as pw:
            browser = pw.chromium.launch(executable_path=CHROME, headless=True)
            try:
                for case in scenarios:
                    name = case["name"]
                    ctx = browser.new_context(java_script_enabled=name != "no_javascript")
                    external, non_get, errors, sockets = [], [], [], []

                    def guard(route):
                        """Prevent a broken build from contacting another origin."""
                        req = route.request
                        if urlsplit(req.url).netloc != urlsplit(base).netloc:
                            external.append(req.url)
                            route.abort()
                        elif req.method != "GET":
                            non_get.append({"method": req.method, "url": req.url})
                            route.abort()
                        else:
                            route.continue_()

                    ctx.route("**/*", guard)
                    ctx.on("page", lambda page: page.on("pageerror", lambda error: errors.append(str(error))))
                    ctx.on("page", lambda page: page.on("websocket", lambda socket: sockets.append(socket.url)))
                    page = ctx.new_page()
                    page.goto(base + "/ab/?review=1", wait_until="networkidle")
                    if name != "no_javascript":
                        assert page.evaluate("localStorage.length") == 0
                        if "saved" in case:
                            page.evaluate("([key,value])=>localStorage.setItem(key,value)", [cfg["storageKey"], case["saved"]])
                    sample = case.get("sample", 0)
                    setup = f"""window.__abNativeGet = Storage.prototype.getItem;
Object.defineProperty(crypto,'getRandomValues',{{configurable:true,value:a=>{{a[0]={sample};return a}}}});"""
                    if name == "gpc":
                        setup += "Object.defineProperty(navigator,'globalPrivacyControl',{get:()=>true});"
                    elif name == "dnt":
                        setup += "Object.defineProperty(navigator,'doNotTrack',{get:()=> '1'});"
                    elif name == "storage_read_blocked":
                        setup += "Storage.prototype.getItem=function(){throw new Error('QA: read blocked')};"
                    elif name == "storage_write_blocked":
                        setup += "Storage.prototype.setItem=function(){throw new Error('QA: quota blocked')};"
                    elif name == "storage_unavailable":
                        setup += "Object.defineProperty(window,'localStorage',{get(){throw new Error('QA: storage unavailable')}});"
                    elif name == "crypto_fallback":
                        setup += "Object.defineProperty(crypto,'getRandomValues',{value:()=>{throw new Error('QA: crypto unavailable')}});Math.random=()=>0.75;"
                    elif name == "reset_blocked":
                        setup += "Storage.prototype.removeItem=function(){throw new Error('QA: removal blocked')};"
                    ctx.add_init_script(setup)
                    if name == "legacy_cleanup":
                        page.evaluate("experiment=>{sessionStorage.setItem(experiment+':visit','legacy-fixture');sessionStorage.setItem(experiment+':consent','allow')}", cfg["experiment"])
                    path = "/ab/"
                    if name == "query_not_forwarded":
                        path += "?source=synthetic&private=fixture-only"
                    elif name == "review":
                        path += "?review=1"
                    elif name == "qa":
                        path += "?qa=1"
                    elif name == "forced_review":
                        path += "?variant=objects"
                    elif name == "invalid_forced_review":
                        path += "?variant=https%3A%2F%2Fexample.invalid%2F"
                    elif name.startswith("direct_"):
                        path = cfg["variants"][name[len("direct_"):]]
                    elif name in ("reset", "reset_blocked"):
                        path = cfg["privacyPath"]
                    response = page.goto(base + path, wait_until="networkidle")
                    assert response is not None and response.status == 200, name
                    if "want" in case:
                        assert page.url == base + cfg["variants"][case["want"]], (name, page.url)
                        assert page.locator("body").get_attribute("data-ab-variant") == case["want"]
                        if name not in ("storage_read_blocked", "storage_write_blocked", "storage_unavailable", "gpc", "dnt"):
                            assert page.evaluate("key=>localStorage.getItem(key)", cfg["storageKey"]) == case["want"]
                            assert page.evaluate("localStorage.length") == 1
                            assert page.evaluate("sessionStorage.length") == 0
                            other = ctx.new_page()
                            other.goto(base + "/ab/", wait_until="networkidle")
                            assert other.url == base + cfg["variants"][case["want"]], name
                            other.close()
                        elif name in ("gpc", "dnt"):
                            assert page.evaluate("key=>localStorage.getItem(key)", cfg["storageKey"]) == case["saved"]
                        elif name == "storage_write_blocked":
                            assert page.evaluate("localStorage.length") == 0
                        elif name == "storage_read_blocked":
                            assert page.evaluate("key=>window.__abNativeGet.call(localStorage,key)", cfg["storageKey"]) == case["want"]
                    elif name in ("review", "qa", "invalid_forced_review"):
                        assert urlsplit(page.url).path == "/ab/"
                        assert page.locator('nav a[href="/variants/type/?review=1"]').is_visible()
                        assert page.evaluate("key=>localStorage.getItem(key)", cfg["storageKey"]) == case["saved"]
                    elif name == "forced_review":
                        assert page.url == base + cfg["variants"]["objects"] + "?review=1"
                        assert page.evaluate("key=>localStorage.getItem(key)", cfg["storageKey"]) == "type"
                    elif name.startswith("direct_"):
                        assert page.url == base + path
                        assert page.evaluate("localStorage.length") == 0
                        assert page.evaluate("sessionStorage.length") == 0
                        assert page.locator(".ad-wordmark").get_attribute("href") == path
                    elif name in ("reset", "reset_blocked"):
                        page.locator("#ab-reset-choice").click()
                        status = page.locator("#ab-privacy-status").inner_text()
                        if name == "reset":
                            assert "선택을 지웠습니다" in status
                            assert page.evaluate("key=>localStorage.getItem(key)", cfg["storageKey"]) is None
                            assert page.evaluate("sessionStorage.length") == 0
                        else:
                            assert "접근할 수 없습니다" in status
                            assert page.evaluate("key=>localStorage.getItem(key)", cfg["storageKey"]) == "type"
                    elif name == "no_javascript":
                        assert page.url == base + "/ab/"
                        for variant in ("type", "objects"):
                            assert page.locator(f'a[href="/variants/{variant}/?review=1"]').is_visible()
                        page.locator('nav a[href="/variants/objects/?review=1"]').click()
                        assert page.locator("body").get_attribute("data-ab-variant") == "objects"
                        page.goto(base + cfg["privacyPath"], wait_until="load")
                        assert page.locator("#ab-reset-choice").is_hidden()
                        assert page.locator("noscript").is_visible()
                    assert not external, (name, external)
                    assert not non_get, (name, non_get)
                    assert not errors, (name, errors)
                    assert not sockets, (name, sockets)
                    assert not ctx.cookies(), name
                    cases.append({"case": name, "passed": True, "external_requests": [], "non_get_requests": [], "page_errors": [], "cookies": []})
                    ctx.close()
            finally:
                browser.close()
    finally:
        server.shutdown()
        server.server_close()
        worker.join(timeout=3)
    assert len(cases) == len(scenarios) and len({case["case"] for case in cases}) == len(scenarios)
    report = {"actual_static_build": True, "external_service_used": False, "analytics_collector": None,
              "pure_contract": pure, "cases": cases, "case_count": len(cases), "all_passed": True}
    (OUT / "contract.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
