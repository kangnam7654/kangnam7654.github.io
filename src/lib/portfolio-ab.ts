import config from "../data/portfolio-ab-config.json";

type Variant = "type" | "objects";

export function isVariant(value: unknown): value is Variant {
  return value === "type" || value === "objects";
}

export function pickVariant(value: number): Variant {
  if (!Number.isInteger(value) || value < 0 || value > 0xffffffff) throw new Error("Invalid random sample");
  return value < 0x80000000 ? "type" : "objects";
}

function storageAllowed(): boolean {
  const privacy = navigator as Navigator & { globalPrivacyControl?: boolean };
  return privacy.globalPrivacyControl !== true && navigator.doNotTrack !== "1";
}

function rememberedVariant(): Variant | null {
  if (!storageAllowed()) return null;
  try {
    const value = localStorage.getItem(config.storageKey);
    return isVariant(value) ? value : null;
  } catch { return null; }
}

function remember(variant: Variant): void {
  if (!storageAllowed()) return;
  try { localStorage.setItem(config.storageKey, variant); } catch { /* Routing also works without storage. */ }
}

function clearLegacySession(): void {
  for (const suffix of ["consent", "visit"]) {
    try { sessionStorage.removeItem(`${config.experiment}:${suffix}`); } catch { /* No session state is required. */ }
  }
}

function clearChoice(): boolean {
  clearLegacySession();
  try {
    localStorage.removeItem(config.storageKey);
    return localStorage.getItem(config.storageKey) === null;
  } catch { return false; }
}

function randomVariant(): Variant {
  try { return pickVariant(crypto.getRandomValues(new Uint32Array(1))[0]); }
  catch { return Math.random() < 0.5 ? "type" : "objects"; }
}

function init(): void {
  if (document.body.dataset.abPrivacy === "true") {
    const reset = document.querySelector<HTMLButtonElement>("#ab-reset-choice");
    if (reset) {
      reset.hidden = false;
      reset.addEventListener("click", () => {
        const status = document.querySelector<HTMLElement>("#ab-privacy-status");
        const cleared = clearChoice();
        if (status) status.textContent = cleared
          ? "이 브라우저의 디자인 선택을 지웠습니다. 다음 A/B 입구 방문에서 다시 배정합니다."
          : "브라우저 저장소에 접근할 수 없습니다. 필요하면 브라우저의 사이트 데이터 설정에서 선택을 지워 주세요.";
      });
    }
    return;
  }
  if (document.body.dataset.abEntry !== "true" || !config.routingEnabled || window.self !== window.top) return;
  const url = new URL(location.href);
  const forced = url.searchParams.get("variant");
  if (isVariant(forced)) {
    location.replace(`${config.variants[forced]}?review=1`);
    return;
  }
  // Review links never read or change the remembered random choice.
  if (["review", "qa", "variant"].some(key => url.searchParams.has(key))) return;
  clearLegacySession();
  const variant = rememberedVariant() ?? randomVariant();
  remember(variant);
  // Only fixed same-site destinations are used; query strings are not forwarded.
  location.replace(config.variants[variant]);
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
}
