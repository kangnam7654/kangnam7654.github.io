"""Verify the published-home entry against the built site, without external services."""
from functools import partial
from http.server import ThreadingHTTPServer
import json
import os
from pathlib import Path
import threading

from importlib import import_module
sync_playwright = import_module('playwright.sync_api').sync_playwright
from check_portfolio_ab_contract import Quiet, CHROME

ROOT = Path(__file__).resolve().parents[1]
OUT = Path(os.environ.get('PORTFOLIO_HOME_QA_OUT', '/Users/kangnam/.hermes/cache/scratch/portfolio-release-20261110/home'))


def main():
    """Exercise root assignment, repeat visits, storage failure and static fallback."""
    OUT.mkdir(parents=True, exist_ok=True)
    server = ThreadingHTTPServer(('127.0.0.1', 0), partial(Quiet, directory=str(ROOT/'dist')))
    worker = threading.Thread(target=server.serve_forever, daemon=True)
    worker.start()
    base = f'http://127.0.0.1:{server.server_port}'
    config = json.loads((ROOT/'src/data/portfolio-ab-config.json').read_text())
    results = []
    try:
        with sync_playwright() as pw:
            browser = pw.chromium.launch(executable_path=CHROME, headless=True)
            try:
                for variant, sample in [('type', 0), ('objects', 4294967295)]:
                    for width in [375, 1440]:
                        context = browser.new_context(viewport={'width':width,'height':900}, reduced_motion='reduce')
                        page = context.new_page()
                        errors, external = [], []
                        page.on('pageerror', lambda error: errors.append(str(error)))
                        page.on('request', lambda request: external.append(request.url) if not request.url.startswith(base) else None)
                        context.add_init_script(f'crypto.getRandomValues = a => {{a[0]={sample}; return a}}')
                        page.goto(base+'/', wait_until='networkidle')
                        page.wait_for_url(base+config['variants'][variant])
                        assert page.locator('body').get_attribute('data-ab-variant') == variant
                        assert page.locator('h1').count() == 1
                        assert page.locator('a[href="/en/"]').is_visible()
                        assert page.locator('link[rel=canonical]').get_attribute('href') == 'https://kangnam7654.github.io/'
                        assert not page.evaluate('document.documentElement.scrollWidth>innerWidth+1')
                        assert page.evaluate('(key)=>localStorage.getItem(key)', config['storageKey']) == variant
                        page.evaluate('document.fonts.ready')
                        page.screenshot(path=str(OUT/f'{variant}-{width}.png'))
                        page.goto(base+'/', wait_until='networkidle')
                        page.wait_for_url(base+config['variants'][variant])
                        assert not errors and not external, (errors, external)
                        results.append({'variant':variant,'width':width,'root_assignment_and_repeat':True})
                        context.close()
                context = browser.new_context(viewport={'width':375,'height':900})
                context.add_init_script("Object.defineProperty(window,'localStorage',{get(){throw new Error('blocked')}}); crypto.getRandomValues=a=>{a[0]=4294967295;return a}")
                page=context.new_page()
                page.goto(base+'/',wait_until='networkidle')
                page.wait_for_url(base+config['variants']['objects'])
                context.close()
                context = browser.new_context(java_script_enabled=False, viewport={'width':375,'height':900})
                page=context.new_page()
                response=page.goto(base+'/',wait_until='load')
                assert response.status == 200 and page.url == base+'/'
                assert page.locator('body').get_attribute('data-ab-variant') == 'type'
                assert page.locator('[data-case]').count() == 4
                assert page.locator('a[data-ab-goal=resume_open]').first.is_visible()
                assert page.locator('a[href="/classic/?review=1"]').count() == 1
                for path in ['/classic/','/en/classic/','/ja/classic/','/en/','/ja/']:
                    assert page.request.get(base+path).status == 200, path
                page.screenshot(path=str(OUT/'no-js-root-375.png'))
                context.close()
            finally:
                browser.close()
    finally:
        server.shutdown()
        server.server_close()
        worker.join(timeout=3)
    report={'all_passed':True,'root_cases':results,'blocked_storage_works':True,'no_js_full_home':True,'original_and_locales_accessible':True}
    (OUT/'verification.json').write_text(json.dumps(report,indent=2)+'\n')
    print(json.dumps(report,indent=2))


if __name__ == '__main__':
    main()
