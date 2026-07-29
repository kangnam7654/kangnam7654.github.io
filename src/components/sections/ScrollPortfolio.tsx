import { motion } from "framer-motion";
import type { Locale } from "../../i18n/utils";

type SceneKey = "intro" | "assessment" | "security" | "unreal" | "contact";

interface Copy {
  navigation: Record<SceneKey, string>;
  intro: { title: string; body: string; action: string };
  assessment: { label: string; number: string; title: string; body: string; detail: string; action: string };
  security: { label: string; number: string; title: string; body: string; detail: string; action: string };
  unreal: { label: string; number: string; title: string; body: string; detail: string; action: string };
  contact: { title: string; body: string; contact: string; github: string; archive: string };
}

const copy: Record<Locale, Copy> = {
  ko: {
    navigation: { intro: "시작", assessment: "자동평가", security: "보안", unreal: "UE5 MCP", contact: "연결" },
    intro: {
      title: "AI가 작동하는 순간을, 더 선명하게.",
      body: "데이터를 다루고 모델을 학습한 뒤, 배포와 운영까지 연결합니다. 복잡한 기술을 실제 사용자의 경험으로 바꾸는 AI Engineer입니다.",
      action: "대표 사례 보기",
    },
    assessment: {
      label: "AI 자동평가 · 크레버스", number: "01",
      title: "평가는 숫자를 넘어, 사용자의 다음 행동을 바꿔야 합니다.",
      body: "발표 영상의 서로 다른 환경을 다루며, MediaPipe 랜드마크와 CPU 추론 제약 안에서 실용적인 평가 신호를 만들었습니다.",
      detail: "MediaPipe · FFmpeg · Azure ML · Speech · Vision",
      action: "자동평가 사례 보기",
    },
    security: {
      label: "보안 이상 탐지 · 라이앤캐처스", number: "02",
      title: "수많은 신호에서, 먼저 봐야 할 것을 고릅니다.",
      body: "사용자 행동과 PE 파일을 정상 데이터 중심으로 학습해 잠재적 이상을 격리합니다. 운영자의 검토 비용까지 고려한 1차 탐지 흐름입니다.",
      detail: "LSTM likelihood · VAE reconstruction · uncertainty · threshold tuning",
      action: "보안 탐지 사례 보기",
    },
    unreal: {
      label: "Unreal Engine MCP · 위메이드 넥스트", number: "03",
      title: "한 문장의 의도가, 실제 공간을 움직이게.",
      body: "자연어 요청을 Unreal Engine 오브젝트 CRUD로 연결하는 MCP 서버를 만들었습니다. 비동기 처리와 동적 도구 등록으로 작업 흐름을 다뤘습니다.",
      detail: "Natural language → MCP → Unreal Engine object operations",
      action: "UE5 MCP 사례 보기",
    },
    contact: {
      title: "다음 복잡한 문제도, 더 나은 경험으로 만들겠습니다.",
      body: "제품과 사용자 사이의 병목을 찾고, 끝까지 작동하는 시스템을 만듭니다.",
      contact: "연락하기", github: "GitHub 보기", archive: "전체 프로젝트 탐색",
    },
  },
  en: {
    navigation: { intro: "Start", assessment: "Assessment", security: "Security", unreal: "UE5 MCP", contact: "Connect" },
    intro: {
      title: "Make the moment AI works feel unmistakable.",
      body: "I connect data, model training, deployment, and operations—turning complex technology into an experience people can actually use.",
      action: "View selected work",
    },
    assessment: {
      label: "AI Auto-Assessment · Creverse", number: "01",
      title: "Assessment should change what a learner does next—not only produce a score.",
      body: "I handled varied presentation-video conditions and built practical evaluation signals within MediaPipe landmarks and CPU-aware inference constraints.",
      detail: "MediaPipe · FFmpeg · Azure ML · Speech · Vision",
      action: "View auto-assessment case",
    },
    security: {
      label: "Security Anomaly Detection · Rye&Catchers", number: "02",
      title: "From countless signals, surface the ones worth seeing first.",
      body: "I train on normal user behavior and PE-file data to isolate potential anomalies, while treating reviewer effort as an operating constraint.",
      detail: "LSTM likelihood · VAE reconstruction · uncertainty · threshold tuning",
      action: "View security case",
    },
    unreal: {
      label: "Unreal Engine MCP · Wemade Next", number: "03",
      title: "One sentence of intent, moving a real space.",
      body: "I built an MCP server that connects natural-language requests to Unreal Engine object CRUD, including asynchronous handling and dynamic tool registration.",
      detail: "Natural language → MCP → Unreal Engine object operations",
      action: "View UE5 MCP case",
    },
    contact: {
      title: "The next complex problem can become a better experience.",
      body: "I find the bottleneck between a product and its users, then build a system that works through it.",
      contact: "Get in touch", github: "View GitHub", archive: "Browse all projects",
    },
  },
  ja: {
    navigation: { intro: "開始", assessment: "評価", security: "セキュリティ", unreal: "UE5 MCP", contact: "連絡" },
    intro: {
      title: "AIが動く瞬間を、もっと鮮明に。",
      body: "データ、モデル学習、デプロイ、運用をつなげます。複雑な技術を、人が実際に使える体験へ変えるAI Engineerです。",
      action: "主な事例を見る",
    },
    assessment: {
      label: "AI自動評価 · Creverse", number: "01",
      title: "評価は点数だけでなく、学習者の次の行動を変えるべきです。",
      body: "多様な発表動画の条件を扱い、MediaPipeランドマークとCPU推論の制約の中で実用的な評価信号を作りました。",
      detail: "MediaPipe · FFmpeg · Azure ML · Speech · Vision",
      action: "自動評価の事例を見る",
    },
    security: {
      label: "セキュリティ異常検知 · Rye&Catchers", number: "02",
      title: "無数の信号から、先に見るべきものを見つけます。",
      body: "正常なユーザー行動とPEファイルのデータを学習し、レビューの負荷を運用条件として扱いながら潜在的な異常を隔離します。",
      detail: "LSTM likelihood · VAE reconstruction · uncertainty · threshold tuning",
      action: "セキュリティ事例を見る",
    },
    unreal: {
      label: "Unreal Engine MCP · Wemade Next", number: "03",
      title: "一文の意図が、実際の空間を動かす。",
      body: "自然言語のリクエストをUnreal EngineのオブジェクトCRUDへつなぐMCPサーバーを作りました。非同期処理と動的なツール登録を含みます。",
      detail: "Natural language → MCP → Unreal Engine object operations",
      action: "UE5 MCPの事例を見る",
    },
    contact: {
      title: "次の複雑な課題も、より良い体験へ。",
      body: "プロダクトとユーザーの間にあるボトルネックを見つけ、それを通るシステムを作ります。",
      contact: "連絡する", github: "GitHubを見る", archive: "すべてのプロジェクトを見る",
    },
  },
};

function localePath(path: string, locale: Locale): string {
  return locale === "ko" ? path : `/${locale}${path}`;
}

function Arrow() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4 stroke-current stroke-[1.8]"><path d="M4 12h15M14 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function LinkButton({ href, children, inverse = false }: { href: string; children: string; inverse?: boolean }) {
  return (
    <a href={href} className={`group inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2446ff] ${inverse ? "bg-white text-[#2446ff] hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(0,0,0,.2)]" : "bg-[#2446ff] text-white hover:-translate-y-1 hover:bg-[#1028d8] hover:shadow-[0_16px_32px_rgba(36,70,255,.22)]"}`}>
      {children}<span className="transition-transform duration-300 group-hover:translate-x-1"><Arrow /></span>
    </a>
  );
}

function ArtFrame({ image, alt, accent, className = "" }: { image: string; alt: string; accent: string; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -inset-3 rounded-[2.2rem] opacity-80 blur-2xl" style={{ background: accent }} aria-hidden="true" />
      <div className="relative overflow-hidden rounded-[1.8rem] border border-white bg-white shadow-[0_28px_70px_rgba(36,70,255,.14)]">
        <img src={image} alt={alt} className="h-full w-full object-cover" />
      </div>
    </div>
  );
}

interface Props { locale?: Locale }

export default function ScrollPortfolio({ locale = "ko" }: Props) {
  const content = copy[locale];

  return (
    <section id="project-showcase" className="overflow-hidden bg-[#fbfbff] text-[#182033]">
      <nav aria-label="Project story" className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 pt-8 lg:px-14">
        <a href="#project-showcase" className="font-[family-name:var(--font-heading)] text-sm font-extrabold tracking-[-.03em] text-[#2446ff]">KK / SELECTED WORK</a>
        <div className="hidden items-center gap-5 text-xs font-semibold text-[#59637a] md:flex">
          {(Object.keys(content.navigation) as SceneKey[]).slice(1, 4).map((scene) => <a key={scene} href={`#story-${scene}`} className="transition-colors hover:text-[#2446ff]">{content.navigation[scene]}</a>)}
        </div>
      </nav>

      <header className="relative mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-10 px-6 pb-16 pt-10 lg:grid-cols-[.83fr_1.17fr] lg:px-14 lg:pb-24">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative z-10">
          <p className="text-sm font-bold tracking-[-.01em] text-[#ff5e4d]">Applied AI Engineer</p>
          <h1 className="mt-5 max-w-xl font-[family-name:var(--font-heading)] text-5xl font-extrabold leading-[.94] tracking-[-.065em] text-[#182033] sm:text-6xl lg:text-7xl">{content.intro.title}</h1>
          <p className="mt-7 max-w-md text-base leading-7 text-[#59637a]">{content.intro.body}</p>
          <div className="mt-9"><LinkButton href="#story-assessment">{content.intro.action}</LinkButton></div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="relative lg:translate-x-8">
          <ArtFrame image="/images/projects/portfolio-hero-v2.png" alt="Abstract editorial artwork representing applied AI systems" accent="rgba(58, 71, 255, .18)" className="aspect-[1.22/1]" />
          <div className="absolute -bottom-6 left-5 rounded-2xl bg-[#bfff30] px-5 py-4 text-sm font-bold text-[#182033] shadow-[0_16px_32px_rgba(109,151,5,.18)] sm:left-10">Data → Model → Product</div>
        </motion.div>
      </header>

      <article id="story-assessment" className="relative bg-[#2446ff] px-6 py-16 text-white lg:px-14 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65 }} className="relative order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-[1.8rem] border border-white/25 bg-white p-3 shadow-[0_30px_75px_rgba(9,23,135,.35)]">
              <img src="/images/projects/ai-assessment-architecture.png" alt="AI auto-assessment system architecture" className="aspect-[16/10] w-full rounded-[1.3rem] object-cover" />
            </div>
            <div className="absolute -bottom-7 -right-2 w-40 overflow-hidden rounded-2xl border-4 border-[#2446ff] bg-white shadow-xl sm:w-52">
              <img src="/images/projects/ai-assessment-head.png" alt="Presentation-attitude landmark visualization" className="aspect-square w-full object-cover" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65, delay: 0.1 }} className="order-1 lg:order-2">
            <p className="text-sm font-bold text-[#bfff30]">{content.assessment.number} / {content.assessment.label}</p>
            <h2 className="mt-5 max-w-xl font-[family-name:var(--font-heading)] text-4xl font-extrabold leading-[.98] tracking-[-.055em] sm:text-5xl">{content.assessment.title}</h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-white/78">{content.assessment.body}</p>
            <p className="mt-7 max-w-lg border-l-2 border-[#ff7968] pl-4 text-sm font-semibold leading-6 text-white/86">{content.assessment.detail}</p>
            <div className="mt-9"><LinkButton href={localePath("/projects/ai-assessment", locale)} inverse>{content.assessment.action}</LinkButton></div>
          </motion.div>
        </div>
      </article>

      <article id="story-security" className="relative overflow-hidden px-6 py-20 lg:px-14 lg:py-28">
        <div className="absolute inset-0 bg-[#fff4ee]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65 }}>
            <p className="text-sm font-bold text-[#ff5e4d]">{content.security.number} / {content.security.label}</p>
            <h2 className="mt-5 max-w-md font-[family-name:var(--font-heading)] text-4xl font-extrabold leading-[.98] tracking-[-.055em] sm:text-5xl">{content.security.title}</h2>
            <p className="mt-6 max-w-md text-base leading-7 text-[#59637a]">{content.security.body}</p>
            <p className="mt-7 max-w-md border-l-2 border-[#2446ff] pl-4 text-sm font-semibold leading-6 text-[#414d66]">{content.security.detail}</p>
            <div className="mt-9"><LinkButton href={localePath("/projects/security-anomaly-detection", locale)}>{content.security.action}</LinkButton></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <ArtFrame image="/images/projects/portfolio-security-v2.png" alt="Abstract editorial artwork representing anomaly separation" accent="rgba(255, 94, 77, .2)" className="aspect-[1.35/1]" />
          </motion.div>
        </div>
      </article>

      <article id="story-unreal" className="relative overflow-hidden bg-[#bfff30] px-6 py-20 lg:px-14 lg:py-28">
        <div className="absolute -left-28 top-14 h-80 w-80 rounded-full bg-[#ff7968] blur-3xl opacity-45" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.14fr_.86fr] lg:items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}>
            <ArtFrame image="/images/projects/portfolio-unreal-v2.png" alt="Abstract editorial artwork representing intent becoming a spatial system" accent="rgba(255, 255, 255, .74)" className="aspect-[1.35/1]" />
            <div className="-mt-9 ml-7 inline-flex items-center gap-2 rounded-full bg-[#182033] px-4 py-2 text-xs font-bold text-white shadow-xl"><span className="h-2 w-2 rounded-full bg-[#bfff30]" />MCP / Unreal Engine</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65, delay: 0.1 }}>
            <p className="text-sm font-bold text-[#2446ff]">{content.unreal.number} / {content.unreal.label}</p>
            <h2 className="mt-5 max-w-md font-[family-name:var(--font-heading)] text-4xl font-extrabold leading-[.98] tracking-[-.055em] sm:text-5xl">{content.unreal.title}</h2>
            <p className="mt-6 max-w-md text-base leading-7 text-[#344057]">{content.unreal.body}</p>
            <p className="mt-7 max-w-md border-l-2 border-[#2446ff] pl-4 text-sm font-semibold leading-6 text-[#344057]">{content.unreal.detail}</p>
            <div className="mt-9"><LinkButton href={localePath("/projects/ue5-mcp", locale)}>{content.unreal.action}</LinkButton></div>
          </motion.div>
        </div>
      </article>

      <section id="story-contact" className="relative overflow-hidden bg-[#182033] px-6 py-20 text-white lg:px-14 lg:py-28">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(255,121,104,.8),transparent_48%),radial-gradient(circle_at_bottom_right,rgba(36,70,255,.95),transparent_57%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-sm font-bold text-[#bfff30]">04 / {content.navigation.contact}</p>
          <div className="mt-7 grid gap-10 lg:grid-cols-[1.08fr_.92fr] lg:items-end">
            <div>
              <h2 className="max-w-3xl font-[family-name:var(--font-heading)] text-4xl font-extrabold leading-[.98] tracking-[-.055em] sm:text-6xl">{content.contact.title}</h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/72">{content.contact.body}</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <LinkButton href={localePath("/contact", locale)} inverse>{content.contact.contact}</LinkButton>
              <LinkButton href="https://github.com/kangnam7654" inverse>{content.contact.github}</LinkButton>
              <LinkButton href="#project-archive" inverse>{content.contact.archive}</LinkButton>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
