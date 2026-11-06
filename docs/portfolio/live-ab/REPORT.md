# Dual portfolio homes and guarded A/B connection

## Working local routes

- Whole-site comparison: http://127.0.0.1:4328/directions/
- Type: http://127.0.0.1:4328/variants/type/?review=1
- Objects: http://127.0.0.1:4328/variants/objects/?review=1
- Local A/B entry: http://127.0.0.1:4328/ab/?review=1
- Privacy/control: http://127.0.0.1:4328/ab/privacy/

These are loopback previews, not deployed public URLs. The original `/`, all
historical first screens, Studio B and C are still reachable. The shared existing
loopback server is reused; no recurring process or automatic promotion is added.

## Actual implementation

Both approved heroes continue into complete home pages from one public-content
source. Identical case order, factual body and goal destinations: UE5 MCP,
assessment, Story Writer, 달결, then contact. Prototype/module and development
scope remain beside the work. Fonts/media are already reviewed local assets.

The real browser client provides balanced cryptographic sampling, common-entry
consent before randomization, consenting tab-session assignment/expiry, exact
allowlisted goal links, dedupe, GPC/DNT and review/bot exclusions, opt-out, no-JS
fallbacks and a minimal PostHog HTTP adapter. It does not use replay, autocapture,
identify, permanent cookies, localStorage, full URLs, referrers or form capture.
GitHub code links and image enlargements are not internal project-detail goals.

`src/data/portfolio-ab-config.json` is the runtime control. Both launch and
measurement remain OFF, with no ingestion token. Local review can exercise the
router without sending events. Public manifest state is documentary, not proof
that visitors are assigned. Root production home is not redirected or replaced.

## Parent verification

Node v22.23.4 static build: 71 pages. Parent independently ran 38 viewport/variant
cases, four axe A/AA scans with zero violations, actual image/PDF/goal destinations,
keyboard/no-JS/replay/reduced-motion and shared-copy/CTA equality checks. Source
facts were checked against existing public metadata and actual desktop/mobile
composition inspected. This is functional QA, not a guarantee of aesthetic quality
or a full accessibility certification.

The 173-file pinned baseline changes only the comparison page and new experiment
status manifest intentionally. All 67 prior semantic routes were compared: only
the comparison page changes; the other 66 and the original source remain intact.
Receipts: `baseline.json`, `page-baseline.json`; detailed parent QA lives under
`/Users/kangnam/.hermes/cache/scratch/portfolio-dual-full-parent/qa.json`.

`client-contract.json` records eight real-browser TEST-FIXTURE scenarios against
the actual bundled client with an injected test-only config. Its HTTP requests
were intercepted: this verifies consent/dedupe/exclusion/payload behavior only.
It is NOT a live PostHog connection or provider-ingestion test. Entry/privacy QA
also exercises the real built pages with production flags off.

## Not completed: external connection

A fresh deployment attempt is recorded at
https://github.com/kangnam7654/kangnam7654.github.io/actions/runs/42147244680 .
It was blocked before build. No hosting, billing, credentials or permissions were
changed to bypass the gate. Source branch upload is available; public deployment
is not verified. The detailed account blocker is retained privately.

No analytics account was selected/authorized, no project/token was invented, and
no real telemetry or dashboard was created. Service approval and authorization
are still required. Keep both switches off until exact public URLs and real
provider probe ingestion (not merely HTTP 200) are independently read back.
PostHog permits only its public project token in client code, never a personal
API/OAuth token. Verify the actual account/region/retention, disclose the provider,
then define observation/exclusions and review outcome uncertainty before weighting.

The owner can continue giving feedback on either whole page without choosing one.
No winner is declared, and there is no automatic traffic reweighting.
