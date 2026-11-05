# Studio B preview: verified local delivery

## Available now on this Mac

- Compare A/B: http://127.0.0.1:4327/design-lab/
- Korean B + owner feedback: http://127.0.0.1:4327/preview/ko/?review=1
- English B: http://127.0.0.1:4327/preview/en/?review=1
- Japanese B: http://127.0.0.1:4327/preview/ja/?review=1

The local server is loopback-only and session-scoped. These are not public URLs.
Restart from the built worktree if needed:

```sh
python3 -m http.server 4327 --bind 127.0.0.1 --directory dist
```

## Delivered and exercised

- Standalone paper/ink/lime B design, selected project evidence, real public PDF,
  three locales, original-A link and a comparison page.
- Original A stays the home page; original 58 route text/link/image snapshots
  remain unchanged. Its separate navigation/contrast repair is pinned to PR #1.
- Owner feedback is explicit (`?review=1`), retains mode across locale switches,
  keeps optional drafts in the tab and provides text-copy/JSON export. No server
  collection or new analytics account is present.
- Parent reran Astro build: 62 static pages. Parent browser QA: 12 responsive
  locale/width cases, six automated WCAG A/AA page checks with no violations,
  no-JS core navigation, 23 internal targets, feedback safety and no external
  requests. Original-A navigation repair: 30 browser cases. These scoped checks
  are not a full WCAG certification or a measured conversion lift.
- Parent visually inspected Korean desktop/phone, English desktop, Japanese
  phone, contribution/evidence cards, and the comparison page.
- Pre-integration proof preserves all 109 original tracked files. Integrated QA
  preserves 106 byte-for-byte and accepts only the three exact files from the
  separately reviewed A maintenance commit. The baseline was not overwritten.

QA: `verification.json`, `pre-integration-verification.json`, and the sibling
`../mobile-navigation-20261105/` reports. Research: `DESIGN_RESEARCH.md`.

## Public deployment is blocked, not completed

Original-A maintenance PR:
https://github.com/kangnam7654/kangnam7654.github.io/pull/1

Merged commit: `cd63d50eebdb07bfbb391c20330fcd76d3e458d2`.
GitHub Pages run:
https://github.com/kangnam7654/kangnam7654.github.io/actions/runs/42047230929

The build job never started. Its exact check annotation was:

> The job was not started because your account is locked due to a billing issue.

The deploy job was skipped. This was not a source/build failure. The published
site therefore retains its previous deployment; do not claim the mobile repair
or B routes are live publicly. Do not change billing settings, create a new
hosting account, or silently change Pages deployment mode to bypass this gate.

The additive B branch should remain a draft PR until the deployment gate and
owner feedback are handled. Read back the exact published URLs after a future
successful build, including retained A, B locales, PDF and interaction behavior.
A successful merge alone is not a deployed page.

## Not active

No random production assignment, aggregated visitor analytics, adaptive traffic
allocation, auto-promotion, recurring agent schedule or automatic fact disclosure
is active. Local B events are integration hooks only; A is not instrumented.

Next: owner feedback on the visual direction; GitHub account billing-status
resolution; then public preview verification. Dependency advisories are separately
recorded in `dependency-audit.json` and remain a maintenance task, not a hidden
upgrade in this visual experiment. Current-employment disclosure also stays a
separate decision.
