# Portfolio design and maintenance contract

## Current release boundary

The existing portfolio is **A** and remains the production default. The new
**Studio B** lives at `/preview/ko/`, `/preview/en/` and `/preview/ja/`.
`/design-lab/` links to both. The earlier `/preview-apple/` stays intact.

This is an additive preview release, **not a live statistical A/B test**.
`public/experiments/portfolio-studio-v1.json` explicitly disables automatic
assignment and promotion. No analytics account, telemetry collector, recurring
agent, live visitor counter or adaptive traffic allocation was installed.

## Feedback loop

1. Open `/preview/ko/?review=1` (or the English/Japanese equivalent).
2. Use the feedback button to describe the exact section, what works and what
   should change; ordinary preview visitors do not see this owner review tool.
3. Drafts are optional session-storage state in that tab. They are not uploaded.
   Copy text into the conversation or explicitly download JSON. Clipboard denial
   falls back to a selectable text field rather than asking for permissions.
4. Group feedback into content correctness, hierarchy, visual direction, mobile
   usability and interaction. Fix errors before experimenting with style.
5. Create a new version for a substantially different hypothesis. Preserve A,
   this preview, approved content, feedback provenance and rollback instructions.
6. Record the exact reviewed URL/commit and outcome here before promotion. User
   feedback is not a measured conversion lift; do not conflate them.

## What a real A/B test would require

Agree the goal first. Raw visitor totals mostly reflect how much traffic was
assigned; compare conversions per exposed eligible session instead.

- Candidate primary metric: sessions opening the public resume / exposed sessions.
- Secondary: project-detail opens and contact-intent clicks / exposed sessions.
- A contact click is not a sent message, an interview or a confirmed application.
- Confirm exposure definitions, a real analytics collector, retention and privacy
  policy, stable experiment/version assignments, and comparable A/B instrumentation.
- Exclude owner previews, QA, bots and obvious repeated testing. Keep locale and
  device mix visible; don't aggregate unlike audiences into a winner.
- Pre-register a meaningful observation window and sufficient evidence for the
  expected low traffic. Report uncertainty; insufficient data means no winner.
- Preserve performance/accessibility/content correctness as guardrails. Neither
  a click lift nor a fresh design authorizes new private employment disclosures.
- Do not silently shift traffic after a few clicks. Any future adaptive allocation
  needs an explicit decision rule, conservative floor for the control, a holdout,
  and a logged rollback. No such allocation is active in this release.

B dispatches `portfolio:interaction` CustomEvents locally for `preview_view`,
`project_open`, `resume_open` and `contact_open`. Payloads have experiment,
variant, locale and an allowlisted target label; no visitor IDs, referrers,
full URLs, query strings, email addresses or feedback text. These are integration
hooks, not collected analytics. A is intentionally not instrumented yet.

## Content boundaries

- Treat the bilingual candidate profile in the separate job-seeking workspace as
  the factual authority, with repository CLAUDE.md and public project sources.
- Publish already-approved public career facts only. Since the owner's 2026-11-26
  decision, Teruten may be shown: company, division, AI team lead role (manager and
  developer, team of 4), tenure from 2026.10, leading development of a screen-capture
  prevention security product and introducing the team's development process.
  Never publish the product's own name, customer names, internal metrics,
  private security-validation metrics, salary, address or birth details.
  Other public-employer/current-tenure updates require a disclosure decision, not
  inference from an old resume or a request to improve UI.
- Distinguish production contributions, prototype work and side projects. The
  30K monthly learners belong to the assessment inference pipeline, not LangGraph
  agents. WER 9.6% → 4.4% is speech tuning; 98.77% is validation F1, not live accuracy.
- Unreal MCP is prototype-grade module contribution taken as far as an internal demo.
  Do not link the `kangnam-unreal-mcp` or `unreal-mcp` repositories. Face-to-Character is a PoC;
  game-engine integration was not completed. Do not invent shipped outcomes.
- Never use a student-face image in a new card. `ai-assessment-head.png` is explicitly
  flagged by repository guidance; retained legacy assets do not authorize reuse.
- Keep new case-study presentation linked to existing project details. The outdated
  public resume PDF and its `/resume/` pages were withdrawn on 2026-11-26; do not
  re-add a resume file unless the owner supplies a reviewed one. Do not overwrite
  submitted documents or generate another resume silently.

## QA and release

The worktree is separate from the user's original checkout. The base commit is
recorded in `studio-v1/baseline.json`. Before publication:

1. Run `npm ci` and `npm run build` using the checked-in lockfile.
2. Run `python3 tools/check_studio_preview.py --browser --axe /absolute/path/to/axe.min.js`.
   The browser QA requires Python Playwright and local Chrome. It uses an ephemeral
   loopback-only HTTP server which stops when the run finishes.
3. Confirm all 58 legacy routes retain semantic page content, links and images.
   `pre-integration-verification.json` proves all 109 original files survived the
   additive B design. The separately reviewed A navigation/contrast fix (PR #1)
   changes exactly three of those files; `accepted-maintenance.json` pins their
   Git commit and exact hashes. Current QA accepts only those recorded bytes and
   verifies the other 106 originals unchanged. Never weaken the check to ignore
   unreviewed changes or silently replace the original baseline.
4. Inspect B visually in all three languages, desktop and mobile; verify keyboard
   navigation, reduced motion, form labels, no horizontal overflow and project links.
5. Review all final public text and metric qualifiers. Check feedback copy, local
   drafts, JSON download and permission-denial fallback. Do not collect test events.
6. Push only this feature branch, review its exact diff, and deploy additively.
   Read back the exact remote branch/commit, Actions run and published URLs. A CI
   success alone does not verify the live page.
7. Keep A and the historical preview available after release; do not automatically
   make B the home page. Log the owner's feedback and next hypothesis.

## Existing dependency health

`studio-v1/dependency-audit.json` records the existing lockfile's npm advisories,
including critical/high build-tool findings. No packages or lockfiles were upgraded
as part of this additive UI experiment. GitHub Pages serves static output, not an
Astro development/SSR server; this observation is not a blanket safety verdict.
Review the advisories and patch dependencies in a separate tested maintenance
change, preserving legacy routes. Never expose a development server publicly.

## Next maintenance decisions

- Owner review of B's first screen, colors, density and project selection.
- Public disclosure scope for current-employment updates.
- Separate dependency maintenance with regression checks.
- Whether to connect privacy-conscious real analytics and run a measured experiment.

No recurring schedule is active. Ongoing autonomous publication or traffic changes
are not implied by the preview; future maintenance must consume actual feedback or
measured evidence and retain the original/rollback path.

## Content correction and baseline re-record (2026-11-26)

Owner-approved on 2026-11-26. Repository history was rewritten to remove private
resume data (birth year, address, salary, resignation reasons and the old resume
documents); recorded commit IDs were remapped to the rewritten commits.

- Career timeline (ko/en/ja): Teruten added as the current role; Rye&Catchers
  shown as 2026.05 ~ 2026.09; the security anomaly-detection page is past tense.
- Unreal MCP is described as reaching an internal demo; all links to the
  `kangnam-unreal-mcp` repository were removed.
- The matching platform is described as participation in planning (data
  collection and analysis).
- The outdated public resume PDF, its preview image, the `/resume/` pages
  (ko/en/ja) and every link to them were removed. No replacement resume was added.
- Department names corrected to the candidate profile: 메타월드개발실 and
  서비스사업본부. Unused `src/data/resume.ts` no longer holds private fields.

The preservation baselines (`*/baseline.json`, `page-baseline.json`,
`legacy-page-semantics.json`, `mobile-navigation-20261105/baseline.json`) were
re-recorded for exactly the files and routes changed above, the removed routes,
and the home page change from the already merged 2026-11-10 home release
(`src/pages/index.astro`, `index.html`), which earlier checks had not yet
recorded. Studio-v1 accepted navigation overrides and the live-ab directions
allowance are unchanged. Earlier baseline bytes remain in Git history. Checks
write their reports into these folders; restore those report files after a QA
run instead of committing machine-local paths.
