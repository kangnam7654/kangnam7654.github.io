# Decision: retain both directions as A/B candidates

The owner accepted both first-screen directions and requested keeping both for
A/B rather than selecting a single aesthetic winner. This replaces the prior
selection-only gate; it does not replace the original site or launch live traffic.

Within the new `portfolio-directions-v1` experiment only:
- Candidate A = Type (`/directions/type/`).
- Candidate B = Objects (`/directions/objects/`).
- Original site = legacy original (`/`); previous Studio B and C stay available.

The old `portfolio-studio-v1` experiment and its A/B identifiers are unchanged.
Never conflate its labels, data or candidate approval with this new experiment.

`public/experiments/portfolio-directions-v1.json` records the exact active state:
both candidates retained, current surface first-screen previews, no assignment,
collector, telemetry, cookies, reweighting or automatic promotion. `/directions/`
shows the owner's two-candidate decision while retaining its live previews.

Full content/CTA equivalence, review of complete pages, public deployment and a
privacy/measurement decision remain prerequisites for a live experiment. Neither
first-screen approval nor the phrase A/B means visitors are currently randomized.
Judge future outcomes by eligible-exposure conversion rates, not raw visit totals;
no winner or exposure weighting change is supported by data at this stage.

Verbatim approval is saved privately outside the repository. Historical reports
remain historical; their pending single-choice wording is superseded by this
explicit decision. No current-employment/private career content is changed.
