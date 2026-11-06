"""Test the actual browser client in an isolated fixture, never real ingestion.

The PostHog host is intercepted. Passing these tests does NOT verify a PostHog
account, production deployment, collector, or actual event ingestion.
"""

from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from importlib import import_module
import json
from pathlib import Path
import subprocess
import threading

ROOT = Path(__file__).resolve().parents[1]
OUT = Path("/Users/kangnam/.hermes/cache/scratch/portfolio-ab-contract")
OUT.mkdir(parents=True, exist_ok=True)


class Quiet(SimpleHTTPRequestHandler):
    """Serve local test-only fixtures without routine logs."""

    def log_message(self, format, *args):
        """Suppress routine loopback request logs."""
        return


def build_fixture(base):
    """Bundle the unchanged client with an explicitly synthetic fixture config."""
    config = json.loads((ROOT / "src/data/portfolio-ab-config.json").read_text())
    config.update(publicOrigin=base, launchEnabled=True, analyticsEnabled=True,
                  posthogPublicToken="phc_TESTONLY", posthogIngestOrigin="https://us.i.posthog.com")
    node = """
const esbuild=require('esbuild');
const config=JSON.parse(process.argv[1]);
esbuild.build({entryPoints:['src/lib/portfolio-ab.ts'],bundle:true,format:'iife',globalName:'ABContract',write:false,
 plugins:[{name:'synthetic-fixture-only',setup(build){build.onLoad({filter:/portfolio-ab-config\\.json$/},()=>({contents:JSON.stringify(config),loader:'json'}));}}]
}).then(result=>process.stdout.write(result.outputFiles[0].text)).catch(error=>{console.error(error);process.exit(1)});
"""
    result = subprocess.run(["node", "-e", node, json.dumps(config)], cwd=ROOT, capture_output=True, text=True)
    assert result.returncode == 0, result.stderr
    (OUT / "fixture.js").write_text(result.stdout)
    page = '<!doctype html><html lang="ko"><head><meta charset="utf-8"></head><body {body}><main><h1>Client contract fixture only</h1>{content}</main><script src="/fixture.js"></script></body></html>'
    links = '<a id="resume" href="/kangnam-kim-resume.pdf" data-ab-goal="resume_open" data-ab-target="resume">resume</a><a id="project" href="/projects/ue5-mcp/" data-ab-goal="project_open" data-ab-target="ue5-mcp">project</a><a id="contact" href="mailto:kangnam7653@gmail.com" data-ab-goal="contact_open" data-ab-target="contact">contact</a><a id="tampered" href="https://example.com/" data-ab-goal="resume_open" data-ab-target="resume">not a resume</a>'
    for path, body, content in [
        ("ab/index.html", 'data-ab-entry="true"', ""),
        ("variants/type/index.html", 'data-ab-variant="type"', links),
        ("variants/objects/index.html", 'data-ab-variant="objects"', links),
        ("ab/privacy/index.html", 'data-ab-privacy="true"', '<button id="ab-withdraw">withdraw</button><p id="ab-privacy-status"></p>'),
    ]:
        target = OUT / path
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(page.format(body=body, content=content))
    return config


def click_without_navigation(page, selector):
    """Trigger the real goal handler but prevent launching a PDF/mail client."""
    page.locator(selector).evaluate("el=>{el.addEventListener('click', e=>e.preventDefault(),{once:true});el.click()}")
    page.wait_for_timeout(60)


def main():
    """Verify consent-before-assignment, dedupe and exclusions in actual Chromium."""
    server = ThreadingHTTPServer(("127.0.0.1", 0), partial(Quiet, directory=str(OUT)))
    worker = threading.Thread(target=server.serve_forever, daemon=True)
    worker.start()
    base = f"http://127.0.0.1:{server.server_port}"
    try:
        cfg = build_fixture(base)
    except Exception:
        server.shutdown()
        server.server_close()
        worker.join(timeout=3)
        raise
    cases = []
    key = cfg["experiment"] + ":visit"
    consent_key = cfg["experiment"] + ":consent"
    ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
    try:
        with import_module("playwright.sync_api").sync_playwright() as pw:
            browser = pw.chromium.launch(executable_path="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless=True)
            try:
                for scenario in ("allow_type", "allow_objects", "deny", "gpc", "dnt", "storage_blocked", "review", "unassigned_direct"):
                    ctx = browser.new_context(user_agent=ua)
                    sample = 4294967295 if scenario == "allow_objects" else 0
                    ctx.add_init_script(f"Object.defineProperty(crypto,'getRandomValues',{{value:a=>{{a[0]={sample};return a}}}})")
                    if scenario == "gpc":
                        ctx.add_init_script("Object.defineProperty(navigator,'globalPrivacyControl',{get:()=>true})")
                    if scenario == "dnt":
                        ctx.add_init_script("Object.defineProperty(navigator,'doNotTrack',{get:()=> '1'})")
                    if scenario == "storage_blocked":
                        ctx.add_init_script("Storage.prototype.setItem=function(){throw new Error('blocked for fixture')}")
                    captured = []
                    unexpected = []

                    def intercept(route):
                        """Record the actual fetch request and return a test-only response."""
                        req = route.request
                        if req.url.startswith("https://us.i.posthog.com/"):
                            captured.append({"body": json.loads(req.post_data), "headers": req.headers})
                            route.fulfill(status=200, body="test fixture only", headers={"Access-Control-Allow-Origin": base})
                        else:
                            unexpected.append(req.url)
                            route.abort()

                    ctx.route("https://**/*", intercept)
                    page = ctx.new_page()
                    if scenario == "unassigned_direct":
                        page.goto(base + "/variants/type/?ab=" + cfg["experiment"], wait_until="networkidle")
                        click_without_navigation(page, "#resume")
                        assert not captured
                    elif scenario == "review":
                        page.goto(base + "/ab/?review=1&variant=objects", wait_until="networkidle")
                        assert "/variants/objects/" in page.url and "review=1" in page.url
                        assert not captured and page.evaluate("sessionStorage.length") == 0
                    else:
                        page.goto(base + "/ab/", wait_until="networkidle")
                        if scenario in ("gpc", "dnt"):
                            assert "/variants/" in page.url
                            assert page.locator("#portfolio-ab-consent").count() == 0
                            assert not captured and page.evaluate("sessionStorage.length") == 0
                        else:
                            assert page.locator("#portfolio-ab-consent").is_visible()
                            assert "/ab/" in page.url
                            assert not captured and page.evaluate("sessionStorage.length") == 0
                            choice = "deny" if scenario == "deny" else "allow"
                            page.locator(f'[data-choice="{choice}"]').click()
                            page.wait_for_url("**/variants/**")
                            page.wait_for_timeout(100)
                            if scenario in ("deny", "storage_blocked"):
                                assert not captured
                                assert page.evaluate("key=>sessionStorage.getItem(key)", key) is None
                            else:
                                expected = "objects" if scenario == "allow_objects" else "type"
                                assert f"/variants/{expected}/" in page.url
                                assert len(captured) == 1
                                first = json.loads(page.evaluate("key=>sessionStorage.getItem(key)", key))
                                for selector in ("#resume", "#resume", "#project", "#contact", "#tampered"):
                                    click_without_navigation(page, selector)
                                assert [x["body"]["event"] for x in captured] == ["portfolio_ab_exposure", "portfolio_ab_resume_open", "portfolio_ab_project_open", "portfolio_ab_contact_open"]
                                for request in captured:
                                    payload = request["body"]
                                    assert payload["distinct_id"] == first["id"]
                                    assert payload["properties"]["variant"] == expected
                                    assert payload["properties"]["$process_person_profile"] is False
                                    assert payload["properties"]["$ip"] is None
                                    assert set(payload["properties"]) <= {"experiment", "variant", "locale", "surface", "target", "$process_person_profile", "$geoip_disable", "$ip", "$lib"}
                                    assert "referer" not in request["headers"] and "cookie" not in request["headers"]
                                    assert "timestamp" in payload
                                page.goto(base + "/ab/", wait_until="networkidle")
                                second = json.loads(page.evaluate("key=>sessionStorage.getItem(key)", key))
                                assert second["id"] == first["id"] and second["variant"] == expected
                                assert len(captured) == 4
                                page.goto(base + "/ab/privacy/", wait_until="networkidle")
                                page.locator("#ab-withdraw").click()
                                assert page.evaluate("key=>sessionStorage.getItem(key)", key) is None
                                assert page.evaluate("key=>sessionStorage.getItem(key)", consent_key) == "deny"
                                page.goto(base + "/ab/", wait_until="networkidle")
                                click_without_navigation(page, "#resume")
                                assert len(captured) == 4
                    assert not unexpected, unexpected
                    assert page.evaluate("ABContract.pickVariant(0)") == "type"
                    assert page.evaluate("ABContract.pickVariant(2147483647)") == "type"
                    assert page.evaluate("ABContract.pickVariant(2147483648)") == "objects"
                    assert page.evaluate("ABContract.pickVariant(4294967295)") == "objects"
                    cases.append({"case": scenario, "passed": True, "intercepted_requests": len(captured)})
                    ctx.close()
            finally:
                browser.close()
    finally:
        server.shutdown()
        server.server_close()
        worker.join(timeout=3)
    result = {"fixture_only": True, "no_requests_reached_posthog": True, "provider_ingestion_verified": False, "cases": cases, "case_count": len(cases), "all_passed": True}
    (ROOT / "docs/portfolio/live-ab/client-contract.json").write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
