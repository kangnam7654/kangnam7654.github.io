/** Local event contract for the B preview. No collector, cookies or visit counters. */
export const STUDIO_EXPERIMENT = "portfolio-studio-v1";
const actions: Record<string, string> = { project: "project_open", resume: "resume_open", contact: "contact_open" };
let installed = false;

export function installStudioEvents(): void {
  if (typeof window === "undefined" || installed) return;
  installed = true;
  const locale = ["ko", "en", "ja"].includes(document.documentElement.lang)
    ? document.documentElement.lang : "ko";
  const emit = (event: string, target?: string) => window.dispatchEvent(new CustomEvent("portfolio:interaction", {
    detail: { experiment: STUDIO_EXPERIMENT, variant: "B", event, locale, ...(target ? { target } : {}) },
  }));
  emit("preview_view");
  document.addEventListener("click", (event) => {
    const source = event.target;
    if (!(source instanceof Element)) return;
    const link = source.closest<HTMLAnchorElement>("a[data-studio-action]");
    if (!link) return;
    const action = link.dataset.studioAction || "";
    if (!actions[action]) return;
    // Do not include free-text, email addresses, referrers or URL query strings.
    const target = (link.dataset.studioTarget || action).replace(/[^a-z0-9_-]/gi, "").slice(0, 64);
    emit(actions[action], target);
  });
}
