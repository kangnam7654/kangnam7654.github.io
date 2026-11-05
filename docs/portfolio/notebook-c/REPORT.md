# C prototype — content before template

## Local review

- C: http://127.0.0.1:4328/c/
- Compare A/B/C: http://127.0.0.1:4328/design-review/
- Previous B remains: http://127.0.0.1:4327/preview/ko/?review=1

These are loopback-only, session-scoped URLs on the owner's Mac, not public deployment.
The new server serves the C worktree's `dist`; the previous B server was not replaced.

## Response to the feedback

C is an alternative, not a claim that rounded corners or a font change made B
'human'. The brief and reference analysis are in `DIRECTION.md`. Verbatim user
feedback is retained privately outside this public repository.

- Remove the huge slogan, mono micro-label system, repeated project fields and
  metric panels as the organizing structure.
- Use a small direct introduction and actual project media: Unreal prototype,
  assessment development test, Story Writer and the personal 달결 app.
- Let the wide demo, quieter assessment note and differently proportioned personal
  projects have distinct arrangements and emphasis.
- Preserve professional contribution scope. No invented interests, anecdotes,
  testimonials, release/user claims, new employment disclosures or fake visuals.
- Keep copy factual: the unsupported claim that tutors previously performed the
  assessment was removed; existing public project metadata supplies the app details.

C is Korean-first for judging the visual direction. Original A/B multilingual
routes are retained. Design approval remains for the owner; code checks do not
prove that C is the right aesthetic or a conversion winner.

## Verified by the parent

- Build under Node v22.23.4: 64 static routes.
- `tools/check_notebook_preview.py`: all 137 original tracked files byte-identical;
  all 62 existing routes preserve semantic text, links and images; 11 local
  destinations validated.
- At 320/375/768/1440: no horizontal overflow, page errors, external requests or
  default GIF downloads. Actual image decode/natural dimensions checked.
- Two automated WCAG A/AA checks, at 375 and 1440: zero violations. This is not a
  full accessibility certification.
- Explicit replay downloads the real GIF; stop restores the poster; changing to
  reduced motion stops a playing demo. Core copy, images and links work without JS.
- Parent read the final source, checked project facts against existing public
  metadata, inspected actual source images and reviewed desktop/mobile composition.
  The background capture backend can show unpainted images despite completed
  decodes; HTTP, actual WebP decoding and a separate Chromium render path verified
  the image files. Do not treat a blank background-tab capture as missing media.

`verification.json` is the actual parent test output. `asset-provenance.json`
records source hashes, selected real GIF frame, derivative hashes and cropping.
Existing ignore rules match nested `images/`; only the five reviewed derived
WebP files are intentionally force-added, not the entire source-image directory.

## Preservation and publication

The base is `39aaaca143e3ccf14933dbbb386437e7b293f416`, the preserved B branch.
C uses new files, new assets and a new route; it does not replace A, B or their
comparison page. No global config, package manifest/lockfile or production home
was changed.

GitHub Pages was previously blocked before build by an account billing-lock
annotation. No new production deployment, hosting-mode change, analytics account,
random assignment, traffic weighting or automatic promotion is performed here.
Keep C as a draft review branch until its direction and publication are decided.
Inherited dependency advisories remain recorded in the previous maintenance report.

## Next review

Does this shift from a polished presentation system toward a personal work page
feel closer, or merely plainer? Owner feedback should distinguish composition,
copy, imagery, typography and overall character, without forcing a review form.
Keep the rejected versions available when testing another direction.
