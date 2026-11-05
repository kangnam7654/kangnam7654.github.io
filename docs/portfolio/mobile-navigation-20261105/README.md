# Original portfolio: scoped navigation/accessibility repair

This retains the classic A layout and content; it does not promote a new design.
Only three existing source files change: FloatingControls, Navbar and global.css.

- On mobile, reserve separate horizontal space for language/theme controls and
  the menu; enlarge the menu hit target to 44×44 CSS px.
- Expose menu state through aria-expanded/aria-controls. Escape closes an open
  menu and returns focus; following a mobile link also closes the menu.
- Darken only the light-theme primary accent from #0099cc to #00759c. The hero CTA's
  existing foreground #f8f9fa then has a computed contrast of 4.950084...:1 instead
  of 3.099049...:1. The dark palette and page structure are retained.

`verification.json` records actual browser tests for three languages, two themes
and five mobile widths. Menu center hit-testing, real clicks, ARIA state, Escape
focus return, link dismissal, independent theme toggling and computed CTA colors
are checked. This is a targeted repair, not full WCAG certification.

The QA also records the old timeline's document-overflow readings separately.
The legacy animated timeline's reflow/motion behavior is not claimed fixed here;
this patch does not weaken the strict no-overflow acceptance checks for Studio B.
CSS transitions are allowed to settle before comparing final theme colors.

All other original tracked files are compared to the preserved baseline. Homepage
and legacy route text/links/images are separately compared semantically; only
navigation state, hit target placement and accent styling intentionally change.

No analytics, random assignment, new personal facts, PDF edits, dependency
upgrades, language removals or original-page replacement occur in this change.
