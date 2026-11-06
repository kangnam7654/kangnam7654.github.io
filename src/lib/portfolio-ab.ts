import config from "../data/portfolio-ab-config.json";

type Variant = "type" | "objects";
type Goal = "exposure" | "resume_open" | "project_open" | "contact_open";
type Visit = { experiment: string; variant: Variant; id: string; lastSeen: number; sent: string[] };
const consentKey = `${config.experiment}:consent`;
const visitKey = `${config.experiment}:visit`;
const allowedTargets = new Set(["resume", "ue5-mcp", "ai-assessment", "story-writer", "dalgyeol", "contact"]);
const eventNames: Record<Goal, string> = {
  exposure: "portfolio_ab_exposure", resume_open: "portfolio_ab_resume_open",
  project_open: "portfolio_ab_project_open", contact_open: "portfolio_ab_contact_open"
};

export function isVariant(value: unknown): value is Variant {
  return value === "type" || value === "objects";
}

export function pickVariant(value: number): Variant {
  if (!Number.isInteger(value) || value < 0 || value > 0xffffffff) throw new Error("Invalid random sample");
  return value < 0x80000000 ? "type" : "objects";
}

function storageGet(key: string): string | null {
  try { return sessionStorage.getItem(key); } catch { return null; }
}

function storageSet(key: string, value: string): boolean {
  try { sessionStorage.setItem(key, value); return true; } catch { return false; }
}

function storageRemove(key: string): void {
  try { sessionStorage.removeItem(key); } catch { /* No tracking if storage is unavailable. */ }
}

function browserOptOut(): boolean {
  const navigatorWithPrivacy = navigator as Navigator & { globalPrivacyControl?: boolean };
  return navigatorWithPrivacy.globalPrivacyControl === true || navigator.doNotTrack === "1";
}

function isReview(url: URL): boolean {
  return url.searchParams.has("review") || url.searchParams.has("qa") || url.searchParams.has("variant") ||
    location.origin !== config.publicOrigin || /bot|crawler|spider|headless|preview/i.test(navigator.userAgent);
}

function currentVisit(): Visit | null {
  try {
    const raw = storageGet(visitKey);
    if (!raw) return null;
    const visit = JSON.parse(raw) as Visit;
    if (visit.experiment !== config.experiment || !isVariant(visit.variant) ||
        typeof visit.id !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(visit.id) ||
        !Number.isFinite(visit.lastSeen) || !Array.isArray(visit.sent) ||
        Date.now() - visit.lastSeen > config.sessionTtlMinutes * 60 * 1000 ||
        Date.now() < visit.lastSeen) return null;
    return visit;
  } catch { return null; }
}

function analyticsReady(): boolean {
  return config.launchEnabled && config.analyticsEnabled &&
    /^phc_[A-Za-z0-9]+$/.test(config.posthogPublicToken) &&
    ["https://us.i.posthog.com", "https://eu.i.posthog.com"].includes(config.posthogIngestOrigin);
}

function makeVisit(variant: Variant): Visit | null {
  const old = currentVisit();
  if (old && old.variant !== variant) return null;
  const visit = old ?? { experiment: config.experiment, variant, id: crypto.randomUUID(), lastSeen: Date.now(), sent: [] };
  visit.lastSeen = Date.now();
  return storageSet(visitKey, JSON.stringify(visit)) ? visit : null;
}

export function eventPayload(visit: Visit, goal: Goal, target?: string) {
  if (target && !allowedTargets.has(target)) throw new Error("Unexpected goal target");
  return {
    api_key: config.posthogPublicToken,
    event: eventNames[goal], distinct_id: visit.id, timestamp: new Date().toISOString(),
    properties: {
      experiment: config.experiment, variant: visit.variant, locale: "ko",
      surface: "full-portfolio", ...(target ? { target } : {}),
      $process_person_profile: false, $geoip_disable: true,
      $ip: null, $lib: "portfolio-minimal-capture"
    }
  };
}

async function capture(variant: Variant, goal: Goal, target?: string): Promise<boolean> {
  if (!analyticsReady() || browserOptOut() || storageGet(consentKey) !== "allow") return false;
  const visit = currentVisit();
  if (!visit || visit.variant !== variant) return false;
  visit.lastSeen = Date.now();
  const dedupe = goal === "exposure" ? goal : `${goal}:${target ?? ""}`;
  if (visit.sent.includes(dedupe)) return false;
  visit.sent.push(dedupe);
  if (!storageSet(visitKey, JSON.stringify(visit))) return false;
  try {
    const response = await fetch(`${config.posthogIngestOrigin}/i/v0/e/`, {
      method: "POST", headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify(eventPayload(visit, goal, target)), credentials: "omit",
      referrerPolicy: "no-referrer", keepalive: true, cache: "no-store"
    });
    return response.ok; // Delivery acceptance is not proof of ingestion; verify separately in the provider.
  } catch { return false; }
}

function consentNotice(onDecision: (allow: boolean) => void): void {
  const notice = document.createElement("aside");
  notice.id = "portfolio-ab-consent";
  notice.setAttribute("aria-label", "열람 통계 선택");
  notice.innerHTML = `<p>두 디자인의 열람 통계를 허용할까요? 이름·이메일·입력 내용·화면 녹화·광고 추적은 수집하지 않습니다. <a href="${config.privacyPath}">자세히</a></p><div><button type="button" data-choice="allow">통계 허용</button><button type="button" data-choice="deny">허용 안 함</button></div>`;
  notice.style.cssText = "position:fixed;bottom:16px;left:16px;right:16px;margin:auto;max-width:620px;z-index:40;padding:16px 20px;background:#fff;color:#202943;box-shadow:0 4px 24px #0002;border:1px solid #d7dce9;border-radius:8px;font:13px/1.7 -apple-system,BlinkMacSystemFont,sans-serif";
  notice.querySelectorAll<HTMLButtonElement>("button").forEach(button => {
    button.style.cssText = "background:#fff;color:#202943;border:1px solid #657190;border-radius:4px;padding:9px 14px;min-height:44px;margin:10px 12px 0 0;cursor:pointer;font:inherit";
    button.addEventListener("click", () => { notice.remove(); onDecision(button.dataset.choice === "allow"); });
  });
  const text = notice.querySelector<HTMLElement>("p");
  if (text) text.style.margin = "0";
  document.body.append(notice);
}

function init(): void {
  const url = new URL(location.href);
  const review = isReview(url);
  if (document.body.dataset.abEntry === "true") {
    if (!config.launchEnabled && !review) return;
    const route = () => {
      const forced = url.searchParams.get("variant");
      const permitted = !review && analyticsReady() && !browserOptOut() && storageGet(consentKey) === "allow";
      const old = permitted ? currentVisit() : null;
      const variant = isVariant(forced) ? forced : old?.variant ?? pickVariant(crypto.getRandomValues(new Uint32Array(1))[0]);
      const target = new URL(config.variants[variant], location.origin);
      if (review) target.searchParams.set("review", "1");
      else if (permitted && makeVisit(variant)) target.searchParams.set("ab", config.experiment);
      location.replace(target.href);
    };
    // Obtain consent on the common entry BEFORE randomization to avoid post-treatment consent selection.
    if (!review && analyticsReady() && !browserOptOut() && storageGet(consentKey) === null) {
      consentNotice(allow => {
        storageSet(consentKey, allow ? "allow" : "deny");
        if (!allow) storageRemove(visitKey);
        route();
      });
    } else route();
    return;
  }
  if (document.body.dataset.abPrivacy === "true") {
    document.querySelector<HTMLButtonElement>("#ab-withdraw")?.addEventListener("click", () => {
      storageSet(consentKey, "deny"); storageRemove(visitKey);
      const status = document.querySelector<HTMLElement>("#ab-privacy-status");
      if (status) status.textContent = "이 탭의 통계를 껐고 임시 방문 식별자를 지웠습니다. 이미 전송된 통계는 별도 보관 정책을 따릅니다.";
    });
    return;
  }
  const variant = document.body.dataset.abVariant;
  if (!isVariant(variant)) return;
  if (review) {
    document.querySelectorAll<HTMLAnchorElement>('a[href^="/variants/"],a[href="/ab/"]').forEach(link => {
      const target = new URL(link.href); target.searchParams.set("review", "1"); link.href = target.href;
    });
    return;
  }
  if (url.searchParams.get("ab") !== config.experiment || !analyticsReady() || browserOptOut() ||
      storageGet(consentKey) !== "allow" || currentVisit()?.variant !== variant) return;
  const accepted = true;
  const expose = () => {
    if (!accepted || document.visibilityState !== "visible") return;
    void capture(variant, "exposure");
  };
  expose();
  document.addEventListener("visibilitychange", expose);
  document.addEventListener("click", event => {
    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[data-ab-goal]");
    if (!accepted || !link) return;
    const goal = link.dataset.abGoal;
    const target = link.dataset.abTarget;
    if (!["resume_open", "project_open", "contact_open"].includes(goal ?? "") || !target || !allowedTargets.has(target)) return;
    const expected = goal === "resume_open" && target === "resume" ? "/kangnam-kim-resume.pdf" :
      goal === "contact_open" && target === "contact" ? "mailto:kangnam7653@gmail.com" :
      goal === "project_open" && !["resume", "contact"].includes(target) ? `/projects/${target}/` : null;
    if (!expected || link.href !== new URL(expected, location.origin).href) return;
    expose();
    void capture(variant, goal as Goal, target);
  });
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
}
