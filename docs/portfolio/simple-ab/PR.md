## Simple A/B routing only — no external service

- Keep the original home and both complete type/objects portfolio variants.
- `/ab/` assigns either variant with equal probability and remembers only `type` or `objects` in browser localStorage.
- Remove the prepared provider adapter, event delivery, analytics consent UI, UUIDs and measurement-account activation gates.
- No external analytics SDK, collector, visitor counter, visitor/conversion report, automatic winner or adaptive allocation.
- Manual review/direct links do not replace the remembered random choice. Storage/privacy-signal failures still allow reading; no-JS visitors get manual links.
- Keep the old verification receipts as historical records; current scope is documented in `docs/portfolio/simple-ab/README.md`.

## Verification

- Node 22 static build; real built-page routing/persistence/privacy/failure cases, not a synthetic telemetry fixture.
- Mobile/desktop entry and storage UI, local links and accessibility checks.
- Full shared-content portfolio regression checks, real images/PDF, no-JS, keyboard, motion and protected source/routes.
- Exact counts and tested runtime hashes are recorded in `docs/portfolio/simple-ab/verification.json`.

## Local technical maintenance automation

- Separate Asia/Seoul cadences: approved project development daily 09:00, page design/full QA Monday 10:00, and material project-update detection hourly at minute 20. Uses the existing local Hermes gateway, not the blocked Pages deployment runner.
- Isolated tracked-source snapshot; no build over the active checkout, no changes to its dist/index/dependencies, and no automatic reset of dirty worktrees.
- A deterministic pre-run script checks weekly page safety; the weekly agent handles at most one approved design refinement. Daily development autonomously identifies, prioritizes, selects, implements and verifies genuine showcased-project gaps, with one substantive local milestone/day. A publication-review state does not freeze other local work. Hourly public-repo/artifact changes can trigger small verified draft integrations without waiting for redesign; unchanged states skip the model. Reproducible defects may produce a tested draft fix PR; no auto merge/deploy or design winner.
- Private durable QA environment/assets and bounded local reports. No external analytics, new account, visitor data or raw conversation uploads.
- Owner-expanded scope: preserve both accepted heroes while proposing reviewed portfolio refinements; use restricted Claude Code workspaces for independent demos of projects without public code. Missing links, renamed public repos and intentionally private implementations are distinguished. New demos do not replace historical company source or authorize public-repository creation.
- Bootstrap verified: 34 orchestration unit tests and the real Node 22 build plus all three browser QA suites. Source/dist/index preserved. Details: `docs/portfolio/simple-ab/automation-verification.json`.
- Scheduler registration, actual first fire and delivery are verified separately in the private operational receipt; source readiness is not activation or publication.

## Release boundary

Source readiness is not a public release. The existing deployment gate remains unresolved/unverified. Keep this PR as a draft; do not replace the original root or claim measured conversions. No package, lockfile, hosting, billing or credential changes.
