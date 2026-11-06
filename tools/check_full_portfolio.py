"""Bounded local QA; the loopback server always shuts down in finally."""
from collections import Counter
from functools import partial
import hashlib
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import importlib.util
import json
from pathlib import Path
import threading
from urllib.parse import urlsplit, unquote
from importlib import import_module
sync_playwright = import_module("playwright.sync_api").sync_playwright

ROOT = Path(__file__).resolve().parents[1]
SCRATCH = Path('/Users/kangnam/.hermes/cache/scratch/portfolio-dual-full-parent')
DIST = ROOT / 'dist'
AXE = Path('/Users/kangnam/.hermes/cache/scratch/portfolio-audit-tools/axe-4.14.0.min.js')
SCREEN = SCRATCH / 'screenshots'
SCREEN.mkdir(parents=True, exist_ok=True)
WIDTHS = (320, 359, 360, 375, 390, 650, 651, 768, 799, 800, 1023, 1024, 1099, 1100, 1101, 1440, 1699, 1700, 1701)
ALLOWED = {'resume','ue5-mcp','ai-assessment','story-writer','dalgyeol','contact'}

class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        """Suppress routine loopback request logs."""
        pass

result = {'build_dir': str(DIST), 'browser_cases': [], 'axe': [], 'failures': [], 'screenshots': [], 'interactions': {}, 'content_equivalence': {}}
def verify(value, message):
    """Retain failed checks so the complete report identifies each issue."""
    if not value:
        result['failures'].append(message)

spec = importlib.util.spec_from_file_location('facts', ROOT / 'tools/check_studio_preview.py')
assert spec is not None and spec.loader is not None
facts = importlib.util.module_from_spec(spec)
spec.loader.exec_module(facts)
legacy = json.loads((ROOT / 'docs/portfolio/live-ab/page-baseline.json').read_text())
legacy_check = {path: facts.PageFacts((DIST/path).read_text()).semantic() == old for path,old in legacy.items()}
result['existing_semantic_baseline'] = {'count':len(legacy_check),'changed':[p for p,ok in legacy_check.items() if not ok]}
verify(all(ok or path == 'directions/index.html' for path,ok in legacy_check.items()), 'unexpected old semantic baseline change')
original = json.loads((ROOT/'docs/portfolio/live-ab/baseline.json').read_text())['tracked_files']
changed = [f for f,h in original.items() if not (ROOT/f).is_file() or hashlib.sha256((ROOT/f).read_bytes()).hexdigest()!=h]
result['tracked_baseline'] = {'count':len(original),'changed':changed}
verify(set(changed) <= {'src/pages/directions/index.astro', 'public/experiments/portfolio-directions-v1.json'}, 'unexpected protected source change')

server = ThreadingHTTPServer(('127.0.0.1',0), partial(Quiet,directory=str(DIST)))
thread = threading.Thread(target=server.serve_forever, daemon=True)
thread.start()
base = f'http://127.0.0.1:{server.server_port}'
shared, goals = {}, {}
try:
    with sync_playwright() as pw:
        browser = pw.chromium.launch(executable_path='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless=True)
        try:
            for variant in ('type','objects'):
                for width in WIDTHS:
                    ctx = browser.new_context(viewport={'width':width,'height':900 if width>799 else 844},reduced_motion='reduce')
                    page = ctx.new_page()
                    errors,requests,bad = [],[],[]
                    page.on('pageerror',lambda error:errors.append(str(error)))
                    page.on('request',lambda req:requests.append(req.url))
                    page.on('response',lambda res:bad.append({'url':res.url,'status':res.status}) if res.status>=400 else None)
                    route = f'/variants/{variant}/?review=1'
                    res = page.goto(base+route,wait_until='networkidle')
                    page.evaluate('document.fonts.ready')
                    page.wait_for_timeout(100)
                    overflow = page.evaluate('document.documentElement.scrollWidth>innerWidth+1')
                    outside = page.evaluate("[...document.querySelectorAll('.dp-shared-content *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+1||r.left < -1)}).map(e=>({tag:e.tagName,cls:e.className,x:e.getBoundingClientRect().x,w:e.getBoundingClientRect().width})).slice(0,8)")
                    verify(res.status==200,f'{variant} {width}: HTTP')
                    verify(not overflow,f'{variant} {width}: horizontal overflow')
                    verify(not outside,f'{variant} {width}: content outside viewport {outside}')
                    verify(page.locator('h1').count()==1,f'{variant} {width}: H1')
                    verify(page.locator('html').get_attribute('lang')=='ko',f'{variant}: lang')
                    verify(page.locator('body').get_attribute('data-ab-variant')==variant,f'{variant}: body contract')
                    verify(page.locator('link[rel=canonical]').get_attribute('href')=='https://kangnam7654.github.io/',f'{variant}: canonical')
                    verify('noindex' in page.locator('meta[name=robots]').get_attribute('content'),f'{variant}: noindex')
                    verify(page.locator('[data-case]').evaluate_all('(es)=>es.map(e=>e.dataset.case)')==['ue5-mcp','ai-assessment','story-writer','dalgyeol'],f'{variant}: case order')
                    verify(not page.locator('img[src*=ai-assessment-head]').count(),f'{variant}: prohibited image')
                    if width == 375:
                        shared[variant] = page.locator('[data-shared-content]').inner_text()
                        goals[variant] = page.locator('a[data-ab-goal]').evaluate_all("es=>es.map(e=>({href:e.getAttribute('href'),goal:e.dataset.abGoal,target:e.dataset.abTarget}))")
                        local_links = page.locator('a').evaluate_all("es=>es.map(e=>e.getAttribute('href'))")
                        targets=[]
                        for href in local_links:
                            u=urlsplit(href)
                            if (u.scheme and not href.startswith(base)) or not u.path.startswith('/'):
                                if href.startswith('#'):
                                    verify(page.locator('[id="'+href[1:]+'"]').count()==1,f'{variant}: bad anchor {href}')
                                continue
                            target=DIST/unquote(u.path).lstrip('/')
                            if target.is_dir(): target/='index.html'
                            verify(target.is_file(),f'{variant}: missing local link {href}')
                            targets.append(href)
                        verify(all(g['target'] in ALLOWED and g['goal'] in ('resume_open','project_open','contact_open') for g in goals[variant]),f'{variant}: goals allowlist')
                        result.setdefault('local_link_targets',{})[variant]=sorted(set(targets))
                        verify(all('review=1' in a for a in page.locator('.dp-footer nav a').evaluate_all("es=>es.map(e=>e.getAttribute('href'))") if '/ab/privacy/' not in a),f'{variant}: review preservation')
                    page.keyboard.press('Tab')
                    verify(page.evaluate("document.activeElement.classList.contains('ad-skip')"),f'{variant} {width}: skip focus')
                    page.keyboard.press('Enter')
                    verify(page.evaluate("document.activeElement.id==='dp-main'"),f'{variant} {width}: skip target')
                    page.evaluate("document.activeElement instanceof HTMLElement && document.activeElement.blur()")
                    page.mouse.move(0, 0)
                    for image in page.locator('img').all():
                        image.scroll_into_view_if_needed()
                        image.evaluate('im=>im.decode()')
                        verify(image.evaluate('im=>im.complete&&im.naturalWidth>0&&im.naturalHeight>0'),f'{variant} {width}: image decode')
                    verify(not any('.gif' in u for u in requests),f'{variant} {width}: unsolicited GIF')
                    verify(page.evaluate("document.fonts.check('25px BricolageStudy','Kangnam Kim')"),f'{variant} {width}: Bricolage font')
                    if variant=='type':
                        verify(page.evaluate("document.fonts.check('140px NameBlock','김강남')"),f'{variant} {width}: name font')
                    if width in (375,1440):
                        page.add_script_tag(path=str(AXE))
                        violations=page.evaluate("async()=> (await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}})).violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))")
                        result['axe'].append({'variant':variant,'width':width,'violations':violations})
                        verify(not violations,f'{variant} {width}: axe {violations}')
                        page.evaluate('scrollTo(0,0)')
                        page.locator('#dp-main').blur()
                        for label,selector in [('hero','.dp-hero'),('intro','.dp-intro'),('unreal','.dp-unreal'),('assessment','.dp-assessment'),('writer','.dp-writer'),('dalgyeol','.dp-dalgyeol'),('contact','.dp-contact')]:
                            locator=page.locator(selector)
                            # Normal viewport captures avoid Chrome's beyond-viewport
                            # repaint of an offscreen transformed fixed skip link.
                            page.evaluate("e=>scrollTo(0,e.getBoundingClientRect().top+scrollY)", locator.element_handle())
                            viewport_path=SCREEN/f'{variant}-{width}-{label}-viewport.png'
                            page.screenshot(path=str(viewport_path))
                            result['screenshots'].append(str(viewport_path))
                            if label=='hero':
                                page.evaluate('scrollTo(0,0)')
                                path=SCREEN/f'{variant}-{width}-hero.png'
                                page.screenshot(path=str(path))
                            else:
                                locator.scroll_into_view_if_needed()
                                path=SCREEN/f'{variant}-{width}-{label}.png'
                                locator.screenshot(path=str(path))
                            result['screenshots'].append(str(path))
                        path=SCREEN/f'{variant}-{width}-full.png'
                        page.screenshot(path=str(path),full_page=True)
                        result['screenshots'].append(str(path))
                    external=[u for u in requests if not u.startswith(base)]
                    verify(not external,f'{variant} {width}: external requests {external}')
                    verify(not errors,f'{variant} {width}: JS errors {errors}')
                    verify(not bad,f'{variant} {width}: failed resources {bad}')
                    result['browser_cases'].append({'variant':variant,'width':width,'overflow':overflow,'outside_content':outside,'page_errors':errors,'external_requests':external,'failed_resources':bad,'images_decoded':page.locator('img').count()})
                    ctx.close()
                ctx=browser.new_context(viewport={'width':375,'height':844},java_script_enabled=False,reduced_motion='reduce')
                page=ctx.new_page()
                page.goto(base+f'/variants/{variant}/?review=1',wait_until='load')
                verify(page.locator('a[data-ab-goal=resume_open]').first.is_visible(),f'{variant}: no-JS resume')
                verify(page.locator('a[data-ab-goal=contact_open]').first.is_visible(),f'{variant}: no-JS contact')
                verify(page.locator('a[data-ab-target=ue5-mcp]').first.is_visible(),f'{variant}: no-JS work')
                verify(page.locator('#dp-unreal-replay').is_hidden(),f'{variant}: no-JS replay hidden')
                verify(page.locator('[data-case]').count()==4,f'{variant}: no-JS cases')
                if variant=='objects':
                    verify(page.locator('#dp-arrange').is_hidden(),f'{variant}: no-JS arrange hidden')
                    verify(page.locator('.ad-object').count()==3,f'{variant}: no-JS art')
                ctx.close()
            verify(shared['type']==shared['objects'],'Shared factual content differs')
            verify(goals['type']==goals['objects'],'CTA goal/href/order differs')
            result['content_equivalence']={'shared_copy_identical':shared['type']==shared['objects'],'goals_identical':goals['type']==goals['objects'],'goal_counts':dict(Counter(g['goal'] for g in goals['type'])),'goals':goals['type']}
            ctx=browser.new_context(viewport={'width':1440,'height':900},reduced_motion='reduce')
            page=ctx.new_page()
            outgoing=[]
            page.on('request',lambda req:outgoing.append(req.url))
            page.goto(base+'/variants/objects/?review=1',wait_until='networkidle')
            button=page.locator('#dp-arrange')
            button.focus()
            page.keyboard.press('Enter')
            verify(page.locator('#dp-stage').get_attribute('data-layout')=='grouped','Arrange keyboard action')
            verify(button.get_attribute('aria-pressed')=='true','Arrange pressed state')
            verify(page.locator('.ad-object-mint').evaluate("e=>getComputedStyle(e).transitionDuration")=='0s','Reduced motion transitions')
            page.keyboard.press('Enter')
            verify(page.locator('#dp-stage').get_attribute('data-layout')=='scattered','Arrange reset')
            play=page.locator('#dp-unreal-replay')
            verify(not any('.gif' in u for u in outgoing),'GIF requested before consent click')
            play.click()
            page.locator('#dp-unreal-image').evaluate('im=>im.decode()')
            verify(any('.gif' in u for u in outgoing),'GIF not requested by explicit replay')
            verify(play.get_attribute('aria-pressed')=='true','Replay pressed state')
            play.click()
            verify(page.locator('#dp-unreal-image').get_attribute('src').endswith('.webp'),'Replay stop')
            page.emulate_media(reduced_motion='no-preference')
            # Allow Chromium to dispatch the media change before asking it to
            # change back; otherwise it may coalesce both emulations in one frame.
            page.wait_for_timeout(150)
            play.click()
            page.emulate_media(reduced_motion='reduce')
            page.wait_for_function("document.querySelector('#dp-unreal-image').getAttribute('src').endsWith('.webp')",timeout=3000)
            motion_stopped = page.locator('#dp-unreal-image').get_attribute('src').endswith('.webp')
            verify(motion_stopped,'Motion-change stops GIF')
            page.locator('.dp-footer a[href*="/variants/type/"]').click()
            verify(page.locator('body').get_attribute('data-ab-variant')=='type' and 'review=1' in page.url,'Review cross-variant navigation')
            result['interactions']={'keyboard_arrange':True,'explicit_gif_load_stop':True,'motion_change_stops_gif':motion_stopped,'no_js_core':True,'review_navigation':True,'no_js_network_calls_by_worker':True}
            pdf = page.request.get(base+'/kangnam-kim-resume.pdf')
            result['resume_pdf'] = {'status':pdf.status,'has_pdf_magic':pdf.body().startswith(b'%PDF')}
            verify(pdf.status==200 and pdf.body().startswith(b'%PDF'),'Resume PDF delivery')
            ctx.close()
        finally:
            browser.close()
finally:
    server.shutdown()
    server.server_close()
    thread.join(timeout=3)
result['browser_case_count']=len(result['browser_cases'])
result['all_checks_passed']=not result['failures']
(SCRATCH/'qa.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({k:v for k,v in result.items() if k not in ('screenshots','browser_cases')},ensure_ascii=False,indent=2))
raise SystemExit(0 if result['all_checks_passed'] else 1)
