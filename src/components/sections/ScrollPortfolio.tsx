import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Locale } from "../../i18n/utils";

type SceneKey = "intro" | "assessment" | "security" | "unreal" | "contact";

interface Copy {
  scenes: Record<SceneKey, string>;
  intro: {
    title: string;
    body: string;
    action: string;
    system: string;
    trace: string;
  };
  assessment: {
    label: string;
    title: string;
    body: string;
    detail: string;
    action: string;
    mediaLabel: string;
  };
  security: {
    label: string;
    title: string;
    body: string;
    detail: string;
    action: string;
    behavior: string;
    file: string;
    quarantine: string;
    review: string;
  };
  unreal: {
    label: string;
    title: string;
    body: string;
    detail: string;
    action: string;
  };
  contact: {
    title: string;
    body: string;
    contact: string;
    github: string;
    archive: string;
  };
}

const copy: Record<Locale, Copy> = {
  ko: {
    scenes: {
      intro: "시작",
      assessment: "자동평가",
      security: "보안",
      unreal: "UE5 MCP",
      contact: "연결",
    },
    intro: {
      title: "AI를 실제로 작동하는 시스템으로.",
      body: "데이터 준비부터 모델 학습, 배포와 운영까지. 사용자가 실제로 쓰는 AI 시스템을 만듭니다.",
      action: "대표 사례 보기",
      system: "SYSTEM OVERVIEW",
      trace: "OPERATING TRACE",
    },
    assessment: {
      label: "AI 자동평가 · 크레버스",
      title: "측정이 의미 있으려면, 현장에서 돌아가야 합니다.",
      body: "발표 영상의 서로 다른 환경을 다루고, 실시간에 가까운 CPU 추론 제약 안에서 평가 신호를 만들었습니다.",
      detail: "MediaPipe 랜드마크 · FFmpeg 전처리 · Azure ML 추론 운영",
      action: "자동평가 사례 보기",
      mediaLabel: "Presentation attitude signal",
    },
    security: {
      label: "보안 이상 탐지 · 라이앤캐처스",
      title: "이상 신호를 찾아, 사람이 필요한 일에 집중하게.",
      body: "정상 데이터 중심 학습으로 잠재적 이상을 먼저 격리하고, 운영 피로도를 고려해 검토 우선순위를 조정합니다.",
      detail: "현재 학습·검증 중 · 1차 격리와 정밀 검토를 위한 흐름",
      action: "보안 탐지 사례 보기",
      behavior: "사용자 행동 시퀀스",
      file: "PE 파일 특성",
      quarantine: "격리",
      review: "정밀 검토",
    },
    unreal: {
      label: "Unreal Engine MCP · 위메이드 넥스트",
      title: "의도를 실제 시스템으로.",
      body: "자연어 요청을 에디터 오브젝트 CRUD로 연결하는 MCP 서버를 만들었습니다. 비동기 처리와 동적 도구 등록으로 워크플로우를 다뤘습니다.",
      detail: "자연어 → MCP → Unreal Engine 오브젝트 작업",
      action: "UE5 MCP 사례 보기",
    },
    contact: {
      title: "다음 복잡한 문제를, 작동하는 시스템으로.",
      body: "Applied AI Engineer로서 제품과 사용자 사이의 병목을 해결합니다.",
      contact: "연락하기",
      github: "GitHub 보기",
      archive: "전체 프로젝트 탐색",
    },
  },
  en: {
    scenes: {
      intro: "Start",
      assessment: "Assessment",
      security: "Security",
      unreal: "UE5 MCP",
      contact: "Connect",
    },
    intro: {
      title: "Production Applied AI, end to end.",
      body: "From data preparation and model training to deployment and operations, I build AI systems people can actually use.",
      action: "View selected work",
      system: "SYSTEM OVERVIEW",
      trace: "OPERATING TRACE",
    },
    assessment: {
      label: "AI Auto-Assessment · Creverse",
      title: "Measurement only matters when it works in the real world.",
      body: "I handled varied presentation-video conditions and designed evaluation signals within a CPU-aware, near-real-time inference constraint.",
      detail: "MediaPipe landmarks · FFmpeg preprocessing · Azure ML inference operations",
      action: "View auto-assessment case",
      mediaLabel: "Presentation attitude signal",
    },
    security: {
      label: "Security Anomaly Detection · Rye&Catchers",
      title: "Find the outlier. Keep humans focused.",
      body: "Normal-data-centered learning surfaces potential anomalies for first-stage isolation, with operating thresholds tuned around review workload.",
      detail: "Currently in training and validation · first-stage triage before deeper review",
      action: "View security case",
      behavior: "User behavior sequence",
      file: "PE-file features",
      quarantine: "Quarantine",
      review: "Deep review",
    },
    unreal: {
      label: "Unreal Engine MCP · Wemade Next",
      title: "Turn intent into a working system.",
      body: "I built an MCP server that connects natural-language requests to Unreal Engine object CRUD, with asynchronous handling and dynamic tool registration.",
      detail: "Natural language → MCP → Unreal Engine object operations",
      action: "View UE5 MCP case",
    },
    contact: {
      title: "The next complex problem, made into a working system.",
      body: "As an Applied AI Engineer, I focus on the bottleneck between a product and the people who use it.",
      contact: "Get in touch",
      github: "View GitHub",
      archive: "Browse all projects",
    },
  },
  ja: {
    scenes: {
      intro: "開始",
      assessment: "評価",
      security: "セキュリティ",
      unreal: "UE5 MCP",
      contact: "連絡",
    },
    intro: {
      title: "実際に動くAIシステムを、最初から最後まで。",
      body: "データ準備、モデル学習、デプロイ、運用まで。人が実際に使えるAIシステムを作ります。",
      action: "主な事例を見る",
      system: "SYSTEM OVERVIEW",
      trace: "OPERATING TRACE",
    },
    assessment: {
      label: "AI自動評価 · Creverse",
      title: "測定は、現場で動いてこそ意味を持つ。",
      body: "多様な発表動画の条件を扱い、CPUでのほぼリアルタイム推論という制約の中で評価信号を設計しました。",
      detail: "MediaPipeランドマーク · FFmpeg前処理 · Azure ML推論運用",
      action: "自動評価の事例を見る",
      mediaLabel: "Presentation attitude signal",
    },
    security: {
      label: "セキュリティ異常検知 · Rye&Catchers",
      title: "外れ値を見つけ、人が必要な仕事に集中できるように。",
      body: "正常データ中心の学習で潜在的な異常を一次隔離し、レビュー負荷を考慮して運用の優先順位を調整します。",
      detail: "現在は学習・検証段階 · 深いレビュー前の一次トリアージ",
      action: "セキュリティ事例を見る",
      behavior: "ユーザー行動シーケンス",
      file: "PEファイル特徴量",
      quarantine: "隔離",
      review: "詳細レビュー",
    },
    unreal: {
      label: "Unreal Engine MCP · Wemade Next",
      title: "意図を、実際に動くシステムへ。",
      body: "自然言語のリクエストをUnreal EngineのオブジェクトCRUDへつなぐMCPサーバーを作りました。非同期処理と動的なツール登録を扱っています。",
      detail: "自然言語 → MCP → Unreal Engineオブジェクト操作",
      action: "UE5 MCPの事例を見る",
    },
    contact: {
      title: "次の複雑な課題を、動くシステムに。",
      body: "Applied AI Engineerとして、プロダクトとユーザーの間にあるボトルネックを解決します。",
      contact: "連絡する",
      github: "GitHubを見る",
      archive: "すべてのプロジェクトを見る",
    },
  },
};

function localePath(path: string, locale: Locale): string {
  if (locale === "ko") return path;
  return `/${locale}${path}`;
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4 stroke-current stroke-[1.5]">
      <path d="M4 12h15M14 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LinkButton({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-3 border border-cyan-300/70 px-5 py-3 font-mono text-xs tracking-wide text-cyan-200 transition-colors duration-300 hover:bg-cyan-300 hover:text-[#0b0f14] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
    >
      {children}
      <span className="transition-transform duration-300 group-hover:translate-x-1"><Arrow /></span>
    </a>
  );
}

function CornerFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative border border-white/20 bg-[#0d131b] ${className}`}>
      <i className="absolute -left-px -top-px h-4 w-4 border-l border-t border-cyan-300" aria-hidden="true" />
      <i className="absolute -right-px -top-px h-4 w-4 border-r border-t border-cyan-300" aria-hidden="true" />
      <i className="absolute -bottom-px -left-px h-4 w-4 border-b border-l border-cyan-300" aria-hidden="true" />
      <i className="absolute -bottom-px -right-px h-4 w-4 border-b border-r border-cyan-300" aria-hidden="true" />
      {children}
    </div>
  );
}

function SignalLine({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 440 96" className="h-full w-full" aria-hidden="true" preserveAspectRatio="none">
      <defs>
        <pattern id="signal-grid" width="40" height="24" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V24" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="440" height="96" fill="url(#signal-grid)" />
      <motion.path
        d="M0 69 L18 65 L32 72 L46 61 L59 68 L77 64 L92 69 L110 57 L128 64 L144 68 L159 63 L175 65 L191 61 L208 66 L223 63 L239 65 L255 59 L272 62 L286 65 L300 62 L312 16 L325 66 L342 61 L357 68 L374 64 L390 69 L406 61 L422 65 L440 62"
        fill="none"
        stroke="#74e9ff"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0.2 }}
        animate={{ pathLength: active ? 1 : 0.45, opacity: active ? 1 : 0.35 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <motion.circle
        cx="312"
        cy="16"
        r="5"
        fill="#0d131b"
        stroke="#74e9ff"
        strokeWidth="2"
        animate={{ scale: active ? [1, 1.4, 1] : 1 }}
        transition={{ duration: 1.3, repeat: active ? Infinity : 0 }}
      />
    </svg>
  );
}

function SecurityFlow({ active, content }: { active: boolean; content: Copy["security"] }) {
  return (
    <CornerFrame className="overflow-hidden p-5 sm:p-7">
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] [background-size:28px_28px]" aria-hidden="true" />
      <div className="relative grid gap-5 md:grid-cols-2">
        <div className="border border-white/15 bg-black/20 p-4">
          <p className="font-mono text-[10px] uppercase tracking-[.16em] text-cyan-200">01 / {content.behavior}</p>
          <div className="mt-4 flex items-end gap-2" aria-hidden="true">
            {Array.from({ length: 9 }, (_, index) => (
              <span key={index} className={`h-2 w-2 rounded-full border ${index === 7 ? "border-cyan-200 bg-cyan-300 shadow-[0_0_16px_rgba(116,233,255,.9)]" : "border-white/60"}`} />
            ))}
          </div>
          <div className="my-4 h-px bg-white/20" />
          <p className="font-mono text-xs text-cyan-200">LSTM</p>
          <p className="mt-1 text-xs text-white/60">Negative log likelihood</p>
          <div className="mt-4 h-16"><SignalLine active={active} /></div>
        </div>
        <div className="border border-white/15 bg-black/20 p-4">
          <p className="font-mono text-[10px] uppercase tracking-[.16em] text-cyan-200">02 / {content.file}</p>
          <div className="mt-4 flex gap-1" aria-hidden="true">
            {Array.from({ length: 12 }, (_, index) => (
              <span key={index} className={`h-4 w-3 border ${index === 8 ? "border-cyan-200 bg-cyan-300/20" : "border-white/45"}`} />
            ))}
          </div>
          <div className="my-4 h-px bg-white/20" />
          <p className="font-mono text-xs text-cyan-200">VAE</p>
          <p className="mt-1 text-xs text-white/60">Reconstruction error + uncertainty</p>
          <div className="mt-4 flex h-16 items-end gap-1" aria-hidden="true">
            {[22, 36, 18, 30, 42, 27, 50, 34, 62, 92, 45, 28, 35, 24].map((height, index) => (
              <motion.span
                key={index}
                className={`w-full border border-t-0 ${index === 9 ? "border-cyan-200 bg-cyan-300/60" : "border-white/40 bg-white/10"}`}
                animate={{ height: active ? `${height}%` : "12%" }}
                transition={{ delay: index * 0.025, duration: 0.45 }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="relative mt-5 flex flex-wrap items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[.12em] text-white/70 sm:gap-5">
        <motion.span animate={{ color: active ? "#74e9ff" : "rgba(255,255,255,.7)" }} className="border border-cyan-200/70 px-3 py-2">Potential anomaly</motion.span>
        <span className="text-cyan-200"><Arrow /></span>
        <span className="border border-cyan-200/70 px-3 py-2 text-cyan-100">{content.quarantine}</span>
        <span className="text-cyan-200"><Arrow /></span>
        <span className="border border-white/25 px-3 py-2">{content.review}</span>
      </div>
    </CornerFrame>
  );
}

interface Props {
  locale?: Locale;
}

export default function ScrollPortfolio({ locale = "ko" }: Props) {
  const content = copy[locale];
  const [activeScene, setActiveScene] = useState<SceneKey>("intro");
  const sceneRefs = useRef<Partial<Record<SceneKey, HTMLElement | null>>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveScene(visible.target.getAttribute("data-scene") as SceneKey);
      },
      { threshold: [0.2, 0.45, 0.7], rootMargin: "-18% 0px -30% 0px" },
    );

    Object.values(sceneRefs.current).forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const setSceneRef = (scene: SceneKey) => (node: HTMLElement | null) => {
    sceneRefs.current[scene] = node;
  };

  return (
    <section id="project-showcase" className="relative overflow-hidden bg-[#0b0f14] text-[#f2f7f9]">
      <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] [background-size:48px_48px]" aria-hidden="true" />

      <nav aria-label="Story progress" className="pointer-events-none fixed right-8 top-1/2 z-20 hidden -translate-y-1/2 lg:block">
        <ol className="space-y-5">
          {(Object.keys(content.scenes) as SceneKey[]).map((scene, index) => {
            const selected = activeScene === scene;
            return (
              <li key={scene} className="flex items-center justify-end gap-3">
                <span className={`font-mono text-[9px] uppercase tracking-[.14em] transition-colors ${selected ? "text-cyan-200" : "text-white/35"}`}>
                  {String(index + 1).padStart(2, "0")} {content.scenes[scene]}
                </span>
                <span className={`h-2.5 w-2.5 rounded-full border transition-all ${selected ? "border-cyan-200 bg-cyan-300 shadow-[0_0_14px_rgba(116,233,255,.9)]" : "border-white/35"}`} />
              </li>
            );
          })}
        </ol>
      </nav>

      <header ref={setSceneRef("intro")} data-scene="intro" className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl items-center px-6 py-20 lg:min-h-screen lg:px-14">
        <div className="grid w-full gap-12 lg:grid-cols-[.88fr_1.12fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
            <p className="mb-8 font-mono text-[11px] uppercase tracking-[.18em] text-cyan-200">KANGNAM KIM / APPLIED AI ENGINEER</p>
            <h1 className="max-w-xl font-[family-name:var(--font-heading)] text-5xl font-medium leading-[.97] tracking-[-.045em] sm:text-6xl lg:text-7xl" style={{ wordSpacing: "0.08em" }}>
              {content.intro.title}
            </h1>
            <p className="mt-7 max-w-md text-base leading-7 text-white/62">{content.intro.body}</p>
            <div className="mt-9">
              <LinkButton href="#story-assessment">{content.intro.action}</LinkButton>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.12 }}>
            <CornerFrame className="min-h-[360px] overflow-hidden p-5 sm:min-h-[440px] sm:p-7">
              <div className="flex items-center justify-between border-b border-white/15 pb-4 font-mono text-[10px] uppercase tracking-[.15em] text-cyan-200">
                <span>{content.intro.system}</span><span>01 / 04</span>
              </div>
              <div className="relative mt-7 h-44 overflow-hidden border-y border-white/12 sm:h-56">
                <div className="absolute inset-0 opacity-65 [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:36px_28px]" />
                <svg viewBox="0 0 560 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
                  {[[50, 28], [50, 80], [50, 132], [220, 48], [220, 102], [220, 158], [400, 78], [510, 102]].map(([x, y], index) => (
                    <motion.circle key={index} cx={x} cy={y} r={index === 5 ? 9 : 7} fill="#0d131b" stroke={index === 5 ? "#74e9ff" : "rgba(242,247,249,.75)"} strokeWidth="2" animate={{ opacity: activeScene === "intro" ? 1 : 0.45 }} />
                  ))}
                  {[[50, 28, 220, 48], [50, 80, 220, 48], [50, 132, 220, 102], [220, 48, 400, 78], [220, 102, 400, 78], [220, 158, 400, 78], [400, 78, 510, 102]].map(([x1, y1, x2, y2], index) => (
                    <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} stroke={index === 4 ? "#74e9ff" : "rgba(242,247,249,.35)"} strokeWidth="1.4" />
                  ))}
                </svg>
              </div>
              <div className="mt-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[.15em] text-white/52"><span>{content.intro.trace}</span><span className="text-cyan-200">ANOMALY</span></div>
              <div className="mt-3 h-20"><SignalLine active={activeScene === "intro"} /></div>
            </CornerFrame>
          </motion.div>
        </div>
      </header>

      <article id="story-assessment" ref={setSceneRef("assessment")} data-scene="assessment" className="relative min-h-[125svh] px-6 py-14 lg:px-14 lg:py-0">
        <div className="mx-auto grid max-w-7xl gap-10 lg:sticky lg:top-0 lg:min-h-screen lg:grid-cols-[.7fr_1.3fr] lg:items-center">
          <motion.div animate={{ opacity: activeScene === "assessment" ? 1 : 0.5, y: activeScene === "assessment" ? 0 : 16 }} transition={{ duration: 0.45 }}>
            <p className="font-mono text-[11px] uppercase tracking-[.16em] text-cyan-200">02 / {content.assessment.label}</p>
            <h2 className="mt-7 max-w-md font-[family-name:var(--font-heading)] text-4xl font-medium leading-[1.02] tracking-[-.045em] sm:text-5xl">{content.assessment.title}</h2>
            <p className="mt-6 max-w-md text-base leading-7 text-white/62">{content.assessment.body}</p>
            <p className="mt-7 border-l border-cyan-300 pl-4 font-mono text-xs leading-5 text-white/54">{content.assessment.detail}</p>
            <div className="mt-9"><LinkButton href={localePath("/projects/ai-assessment", locale)}>{content.assessment.action}</LinkButton></div>
          </motion.div>
          <motion.div animate={{ opacity: activeScene === "assessment" ? 1 : 0.68, scale: activeScene === "assessment" ? 1 : 0.985 }} transition={{ duration: 0.5 }}>
            <CornerFrame className="overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/15 px-5 py-3 font-mono text-[10px] uppercase tracking-[.14em] text-cyan-200"><span>{content.assessment.mediaLabel}</span><span>CPU / VIDEO</span></div>
              <div className="grid md:grid-cols-[1.16fr_.84fr]">
                <div className="relative min-h-64 overflow-hidden border-b border-white/15 md:border-b-0 md:border-r">
                  <img src="/images/projects/ai-assessment-architecture.png" alt="AI auto-assessment system architecture" className="absolute inset-0 h-full w-full object-cover opacity-85" />
                  <div className="absolute inset-x-0 bottom-0 border-t border-white/15 bg-[#0b0f14]/90 px-4 py-3 font-mono text-[10px] text-white/58">VIDEO → PREPROCESS → INFERENCE</div>
                </div>
                <div className="relative min-h-64 overflow-hidden bg-black/25">
                  <img src="/images/projects/ai-assessment-head.png" alt="Presentation-attitude landmark visualization" className="absolute inset-0 h-full w-full object-cover opacity-75" />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(11,15,20,.35))]" />
                  <div className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[.14em] text-cyan-200">LANDMARK SIGNAL</div>
                </div>
              </div>
              <div className="h-20 border-t border-white/15 px-4 py-3"><SignalLine active={activeScene === "assessment"} /></div>
            </CornerFrame>
          </motion.div>
        </div>
      </article>

      <article ref={setSceneRef("security")} data-scene="security" className="relative min-h-[130svh] px-6 py-14 lg:px-14 lg:py-0">
        <div className="mx-auto grid max-w-7xl gap-10 lg:sticky lg:top-0 lg:min-h-screen lg:grid-cols-[.7fr_1.3fr] lg:items-center">
          <motion.div animate={{ opacity: activeScene === "security" ? 1 : 0.5, y: activeScene === "security" ? 0 : 16 }} transition={{ duration: 0.45 }}>
            <p className="font-mono text-[11px] uppercase tracking-[.16em] text-cyan-200">03 / {content.security.label}</p>
            <h2 className="mt-7 max-w-md font-[family-name:var(--font-heading)] text-4xl font-medium leading-[1.02] tracking-[-.045em] sm:text-5xl">{content.security.title}</h2>
            <p className="mt-6 max-w-md text-base leading-7 text-white/62">{content.security.body}</p>
            <p className="mt-7 border-l border-cyan-300 pl-4 font-mono text-xs leading-5 text-white/54">{content.security.detail}</p>
            <div className="mt-9"><LinkButton href={localePath("/projects/security-anomaly-detection", locale)}>{content.security.action}</LinkButton></div>
          </motion.div>
          <motion.div animate={{ opacity: activeScene === "security" ? 1 : 0.68, scale: activeScene === "security" ? 1 : 0.985 }} transition={{ duration: 0.5 }}>
            <SecurityFlow active={activeScene === "security"} content={content.security} />
          </motion.div>
        </div>
      </article>

      <article ref={setSceneRef("unreal")} data-scene="unreal" className="relative min-h-[125svh] px-6 py-14 lg:px-14 lg:py-0">
        <div className="mx-auto grid max-w-7xl gap-10 lg:sticky lg:top-0 lg:min-h-screen lg:grid-cols-[.7fr_1.3fr] lg:items-center">
          <motion.div animate={{ opacity: activeScene === "unreal" ? 1 : 0.5, y: activeScene === "unreal" ? 0 : 16 }} transition={{ duration: 0.45 }}>
            <p className="font-mono text-[11px] uppercase tracking-[.16em] text-cyan-200">04 / {content.unreal.label}</p>
            <h2 className="mt-7 max-w-md font-[family-name:var(--font-heading)] text-4xl font-medium leading-[1.02] tracking-[-.045em] sm:text-5xl">{content.unreal.title}</h2>
            <p className="mt-6 max-w-md text-base leading-7 text-white/62">{content.unreal.body}</p>
            <p className="mt-7 border-l border-cyan-300 pl-4 font-mono text-xs leading-5 text-white/54">{content.unreal.detail}</p>
            <div className="mt-9"><LinkButton href={localePath("/projects/ue5-mcp", locale)}>{content.unreal.action}</LinkButton></div>
          </motion.div>
          <motion.div animate={{ opacity: activeScene === "unreal" ? 1 : 0.68, scale: activeScene === "unreal" ? 1 : 0.985 }} transition={{ duration: 0.5 }}>
            <CornerFrame className="overflow-hidden">
              <div className="relative aspect-[16/9] overflow-hidden border-b border-white/15 bg-black">
                <img src="/images/projects/ue5-mcp-spawn.gif" alt="Unreal Engine object creation through MCP" className="h-full w-full object-cover" />
                <div className="absolute left-4 top-4 border border-cyan-200/60 bg-[#0b0f14]/80 px-3 py-2 font-mono text-[10px] uppercase tracking-[.14em] text-cyan-200">MCP / CREATE OBJECT</div>
              </div>
              <div className="grid gap-2 bg-[#0b0f14] px-5 py-5 font-mono text-xs text-white/64 sm:text-sm">
                <p><span className="text-cyan-200">&gt; </span>natural language request received</p>
                <p><span className="text-cyan-200">&gt; </span>planning editor actions</p>
                <p><span className="text-cyan-200">✓ </span>object operation completed</p>
              </div>
            </CornerFrame>
          </motion.div>
        </div>
      </article>

      <section ref={setSceneRef("contact")} data-scene="contact" className="relative mx-auto min-h-[74svh] max-w-7xl px-6 py-24 lg:flex lg:min-h-screen lg:items-center lg:px-14">
        <div className="w-full border-y border-white/20 py-16 sm:py-20">
          <p className="font-mono text-[11px] uppercase tracking-[.16em] text-cyan-200">05 / {content.scenes.contact}</p>
          <div className="mt-8 grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
            <div>
              <h2 className="max-w-3xl font-[family-name:var(--font-heading)] text-4xl font-medium leading-[1.02] tracking-[-.045em] sm:text-6xl">{content.contact.title}</h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/62">{content.contact.body}</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <LinkButton href={localePath("/contact", locale)}>{content.contact.contact}</LinkButton>
              <LinkButton href="https://github.com/kangnam7654">{content.contact.github}</LinkButton>
              <LinkButton href="#project-archive">{content.contact.archive}</LinkButton>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
