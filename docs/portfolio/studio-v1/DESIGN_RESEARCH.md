# Studio B: research and design hypothesis

## What was inspected

The current portfolio, three public engineering sites and W3C guidance were
reviewed. This is a scoped reference study, not proof of a universal 2026 trend.

- The current home spends its first viewport primarily on a portrait, name and
  animated tagline. Evidence and project detail are further away.[1]
- Brittany Chiang's site separates clear professional identity, experience,
  selected projects, full resume and an archive.[2]
- Hamel Husain links a short ML-engineering introduction to concrete research,
  open source and dated writing.[3]
- Simon Willison exposes dated entries, releases and original artifact links.[4]

## Hypothesis, not a measured result

Showing selected contribution evidence and a real resume/project route earlier
may help engineering reviewers understand scope and investigate relevant work.
A warm-paper/ink grid with a restrained lime accent is a design choice, not a
claim that the color will raise conversion. The layout should communicate
production contributions, prototype work and PoC limits without relying on
animation or inflated end-to-end ownership.

B therefore uses an editorial hierarchy, compact navigation, numbered work,
real public measurements with their qualifiers, and direct existing evidence
links. Original A and the older preview remain available. B is a separate,
noindex preview; no measured conversion lift or winner exists.

## Accessibility and actual baseline findings

Parent browser inspection independently confirmed that at 375px the original
mobile menu's center hit-test landed on the floating theme icon rather than the
menu. This is a functional collision, not merely a preference. A separate,
limited maintenance branch addresses it without replacing the classic layout.

W3C's target-size AA criterion specifies at least 24 by 24 CSS pixels or an
applicable exception; important controls can deliberately aim larger.[5] The
mobile menu fix aims at 44 by 44, not a false claim that AA universally requires 44.
W3C normal-text minimum contrast is 4.5:1, with qualified exceptions.[6] The
original light CTA's computed colors were #f8f9fa over #0099cc (3.099...:1).
The proposed light accent #00759c gives 4.950...:1 with the same foreground;
these ratios were calculated, and the browser regression checks actual styles.

B is checked for horizontal overflow, semantic headings/labels, keyboard use,
reduced motion, JS-disabled core navigation and automated WCAG-rule findings.
Automated checks plus these scoped manual tasks are not a full accessibility
certification. Actual visit counts, conversion effects and user preference are
not inferred from a screenshot or a passing build.

## Experiment limits

The study recommends comparing intent actions per eligible exposure, not raw
visits. Resume opening is a candidate primary metric, contact intent and project
evidence exploration are secondary; select the final definition before activation.
Local B CustomEvents are not analytics collection and A is not instrumented.
A real comparison needs equal definitions, stable assignment and enough evidence;
low traffic may mean there is no defensible winner. Owner feedback is useful
qualitative evidence but must not be relabeled as conversion data.

See `../MAINTENANCE.md` for feedback, data/disclosure boundaries and rollout gates.

## Sources

[1] https://kangnam7654.github.io
[2] https://brittanychiang.com
[3] https://hamel.dev
[4] https://simonwillison.net
[5] https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
[6] https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
