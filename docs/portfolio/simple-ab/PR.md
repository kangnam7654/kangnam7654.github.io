## Simple A/B routing only — no external service

- Keep the original home and both complete type/objects portfolio variants.
- `/ab/` assigns either variant with equal probability and remembers only `type` or `objects` in browser localStorage.
- Remove the prepared provider adapter, event delivery, analytics consent UI, UUIDs and measurement-account activation gates.
- No external analytics SDK, collector, visitor counter, recurring report, automatic winner or adaptive allocation.
- Manual review/direct links do not replace the remembered random choice. Storage/privacy-signal failures still allow reading; no-JS visitors get manual links.
- Keep the old verification receipts as historical records; current scope is documented in `docs/portfolio/simple-ab/README.md`.

## Verification

- Node 22 static build; real built-page routing/persistence/privacy/failure cases, not a synthetic telemetry fixture.
- Mobile/desktop entry and storage UI, local links and accessibility checks.
- Full shared-content portfolio regression checks, real images/PDF, no-JS, keyboard, motion and protected source/routes.
- Exact counts and tested runtime hashes are recorded in `docs/portfolio/simple-ab/verification.json`.

## Release boundary

Source readiness is not a public release. The existing deployment gate remains unresolved/unverified. Keep this PR as a draft; do not replace the original root or claim measured conversions. No package, lockfile, hosting, billing or credential changes.
