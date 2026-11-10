# First-screen direction studies

Review on this Mac:
- Compare: http://127.0.0.1:4328/directions/
- Type: http://127.0.0.1:4328/directions/type/
- Objects: http://127.0.0.1:4328/directions/objects/

These are two first-screen hypotheses, not full replacements or design approvals.
The comparison page uses live scaled previews; open each at full size to judge it.

## What was deliberately changed

Type uses the actual Korean name as the dominant graphic, with a consistent
pink/indigo palette, a licensed display face and one small real work artifact.
The first critique removed a disconnected decorative dot and loosened the Latin
wordmark's spacing. Its trade-off is stronger identity but less work visible.

Objects uses an original spatial scene tied to the existing Unreal cube motif,
with a cobalt ground and controlled pastel faces. Explicit keyboard/click input
rearranges the scene; it is not an AI call or Unreal execution. Its trade-off is
clearer subject relevance but the familiar three-block visual vocabulary.

A mobile screenshot exposed a split Korean role word even though overflow and
axe checks passed. Role/name hierarchy was separated, redundant mobile header
metadata removed, and the artwork disclosure made more legible. Actual screenshots
were inspected again after these changes.

## Evidence and limits

Node v22.23.4 build: 67 routes. `verification.json` contains actual results:
155 existing tracked files unchanged, 64 existing semantic routes unchanged,
24 route/viewport cases, six automated WCAG A/AA scans with zero violations,
local destinations/font bytes/image decode checked, no external runtime requests,
no-JS core and explicit keyboard interaction/reduced-motion checked. These are
functional guardrails, not proof of aesthetic quality or full accessibility.

Research plan is in `BRIEF.md`. The official frontend-design document was read as
a design reference, not installed as a privileged instruction source. Primary
reference text/images were retrieved; Design Embraced's desktop transitional
composition was observed, but Adrien's full WebGL scene was not verified (only its
splash/mobile fallback). No other designer's illustrations, identity or claims
were copied into these studies. New font subsets carry their source OFL notices;
`fonts.json` records real source URLs, byte counts and hashes.

Screenshots and build log:
`/Users/kangnam/.hermes/cache/scratch/portfolio-direction-studies/`

The already running loopback server was reused. A/B/C source and routes remain
unchanged. Public deployment/traffic allocation, accounts, billing, credentials,
remotes and package manifests were not changed. Remote publication is still a
separate blocked task; no push retry or new PR was performed for these studies.
Verbatim owner feedback remains in the private maintenance folder, not this repo.

Owner review of these two directions is pending. Do not silently expand either
into a full portfolio, call it a winner or replace the home page.
