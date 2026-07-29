import { motion } from "framer-motion";
import { ui } from "../../i18n/ui";
import type { Locale } from "../../i18n/utils";
import GlassCard from "../ui/GlassCard";

interface Step {
  title: string;
  desc: string;
}

interface Phase {
  num: string;
  title: string;
  subtitle: string;
  color: string;
  steps: Step[];
}

const phasesData: Record<Locale, Phase[]> = {
  ko: [
    {
      num: "01",
      title: "Define",
      subtitle: "문제와 제약 정렬",
      color: "var(--color-primary)",
      steps: [
        {
          title: "현업 문제 먼저 확인",
          desc: "사용자와 대화하고 직접 흐름을 써 보며, 반복 작업과 실제 병목을 찾습니다",
        },
        {
          title: "성공 기준과 제약 설정",
          desc: "사용 경험, 운영 비용, 모델 품질의 우선순위와 데이터·지연 시간·보안 제약을 명확히 합니다",
        },
        {
          title: "작은 PoC로 가설 검증",
          desc: "완성도를 앞세우기보다 가장 빠르게 배울 수 있는 최소 구현을 만듭니다",
        },
        {
          title: "근거로 다음 단계 결정",
          desc: "사용자 피드백과 측정 결과를 바탕으로 진행·수정·중단을 결정합니다",
        },
      ],
    },
    {
      num: "02",
      title: "Build",
      subtitle: "구현과 탐색",
      color: "var(--color-accent)",
      steps: [
        {
          title: "빠르게 동작하는 첫 버전 만들기",
          desc: "AI 코딩 도구를 활용해 조사와 구현 속도를 높이되, 핵심 설계 판단은 직접 검토합니다",
        },
        {
          title: "문서화와 코드 리뷰",
          desc: "결정 근거와 인터페이스를 남기고, 동료의 피드백과 검증 가능한 결과로 코드를 다듬습니다",
        },
        {
          title: "비용과 실행 환경 고려",
          desc: "추론 지연 시간, GPU 비용, CPU 실행 가능성 등 운영 조건을 구현 단계부터 반영합니다",
        },
        {
          title: "필요한 범위만 확장",
          desc: "검증된 흐름을 기준으로 모델·시스템·자동화를 단계적으로 확장합니다",
        },
        {
          title: "재현 가능한 작업 흐름 유지",
          desc: "실험, 배포, 운영에서 같은 기준으로 반복할 수 있도록 작업 과정을 정리합니다",
        },
      ],
    },
    {
      num: "03",
      title: "Verify",
      subtitle: "동작과 사용성 검증",
      color: "#f59e0b",
      steps: [
        {
          title: "실행 가능한 환경에서 확인",
          desc: "모델 지표뿐 아니라 실제 입력, 지연 시간, 오류 상황을 포함해 동작을 점검합니다",
        },
        {
          title: "사용자 관점으로 평가",
          desc: "사용자가 실제로 쓰는지, 문제 해결에 도움이 되는지를 성공 기준으로 확인합니다",
        },
        {
          title: "안전과 품질 점검",
          desc: "실패 사례와 오탐·미탐의 비용을 확인하고, 필요한 안전장치와 운영 절차를 보완합니다",
        },
        {
          title: "피드백으로 수정",
          desc: "근거 있는 피드백은 빠르게 반영하고, 결과로 다시 확인합니다",
        },
        {
          title: "출시 기준 확인",
          desc: "사용 경험과 운영 비용을 해치지 않는 범위에서 배포 여부를 결정합니다",
        },
      ],
    },
    {
      num: "04",
      title: "Iterate",
      subtitle: "운영과 개선",
      color: "var(--color-secondary)",
      steps: [
        {
          title: "운영 신호 관찰",
          desc: "사용량, 오류, 지연 시간, 비용을 보며 시스템이 지속 가능하게 동작하는지 확인합니다",
        },
        {
          title: "사용자 피드백 수집",
          desc: "실제 사용자의 불편과 반복 작업을 다음 개선의 출발점으로 삼습니다",
        },
        {
          title: "비용·품질 균형 조정",
          desc: "필요한 품질을 유지하면서도 운영 비용과 대응 부담을 통제합니다",
        },
        {
          title: "다음 문제로 확장",
          desc: "검증된 기반 위에서 더 큰 자동화와 제품 개선으로 이어갑니다",
        },
      ],
    },
  ],
  en: [
    {
      num: "01",
      title: "Idea Phase",
      subtitle: "Ideation & Validation",
      color: "var(--color-primary)",
      steps: [
        {
          title: "AI Brainstorming & Trend Scoring",
          desc: "Diverge ideas with AI, discover topics based on trend data. Even vague requests get refined",
        },
        {
          title: "CEO Direction → Market Research → CSO Validation",
          desc: "AI CEO sets direction, Researcher conducts market research, AI CSO validates risks, feasibility & target user personas. No-Go triggers re-direction",
        },
        {
          title: "Business Model Design",
          desc: "Systematically design revenue model, pricing strategy, and unit economics",
        },
        {
          title: "CEO Gate",
          desc: "PASS / Revise BM / Change direction. Proceeds to Design Phase on pass",
        },
      ],
    },
    {
      num: "02",
      title: "Design Phase",
      subtitle: "Design & Architecture",
      color: "var(--color-accent)",
      steps: [
        {
          title: "Tech Stack & DB Schema Design",
          desc: "CTO decides tech stack, data-engineer designs DB, CTO reviews. FAIL triggers redesign",
        },
        {
          title: "UX/UI Design & Debate",
          desc: "product-designer creates UX→UI sequentially, each verified by reviewers, then UX↔UI design debate. User flows become the basis for API design",
        },
        {
          title: "API Design & DB-API Consistency Check",
          desc: "backend-dev designs API based on UX flows, CTO verifies DB-API consistency. Mismatch triggers DB redesign",
        },
        {
          title: "Execution Plan & Plan Critic",
          desc: "Planner generates implementation plan, plan-critic scores on 6 criteria. Iterates until pass",
        },
        {
          title: "CTO Gate",
          desc: "Integrated validation of design + plan. Proceeds to Build Phase on pass",
        },
      ],
    },
    {
      num: "03",
      title: "Build Phase",
      subtitle: "Implementation & Review",
      color: "#f59e0b",
      steps: [
        {
          title: "Parallel Implementation",
          desc: "frontend / backend / mobile / ai-engineer agents develop simultaneously",
        },
        {
          title: "Migration Review (DBA)",
          desc: "DBA verifies DB changes. Issues route back to implementation",
        },
        {
          title: "Code Review + Security Review",
          desc: "code-reviewer checks quality, security-reviewer scans for vulnerabilities",
        },
        {
          title: "QA Testing",
          desc: "qa-engineer runs Unit / Integration / E2E tests. FAIL routes back to implementation",
        },
        {
          title: "Deployment Setup (DevOps)",
          desc: "devops configures CI/CD pipeline, Docker containers, and deployment environment. Prepares for functional verification in Verify Phase",
        },
      ],
    },
    {
      num: "04",
      title: "Verify Phase",
      subtitle: "Verification & Launch",
      color: "var(--color-secondary)",
      steps: [
        {
          title: "Functional Verification (Simulator)",
          desc: "Run actual app to verify functionality. FAIL routes back to Build Phase",
        },
        {
          title: "UI Verification & Usability Test",
          desc: "Screenshot-based visual verification + user perspective usability test. Implementation bugs → Build Phase, design issues → Design Phase",
        },
        {
          title: "Launch Debate",
          desc: "CEO ↔ CTO ↔ CSO three-way meeting. Code fix / Design change / PASS decision",
        },
        {
          title: "Completion Report",
          desc: "Final report generated after launch approval",
        },
      ],
    },
  ],
  ja: [
    {
      num: "01",
      title: "Idea Phase",
      subtitle: "アイデア発掘＆検証",
      color: "var(--color-primary)",
      steps: [
        {
          title: "AIブレインストーミング＆トレンドスコアリング",
          desc: "AIとアイデア発散、トレンドデータに基づくテーマ発掘。漠然とした要望も具体化",
        },
        {
          title: "CEO方向決定 → 市場調査 → CSO戦略検証",
          desc: "AI CEOが方向設定、Researcherが市場調査、AI CSOがリスク・実現可能性・ターゲットユーザーペルソナを検証。No-Goで方向再設定",
        },
        {
          title: "BM設計",
          desc: "収益モデル、価格戦略、ユニットエコノミクスを体系的に設計",
        },
        {
          title: "CEOゲート",
          desc: "PASS / BM修正 / 方向変更の三分岐意思決定。通過でDesign Phaseへ",
        },
      ],
    },
    {
      num: "02",
      title: "Design Phase",
      subtitle: "設計＆アーキテクチャ",
      color: "var(--color-accent)",
      steps: [
        {
          title: "技術スタック＆DBスキーマ設計",
          desc: "CTOが技術スタック決定、data-engineerがDB設計、CTOレビュー。FAILで再設計",
        },
        {
          title: "UX/UIデザイン＆ディベート",
          desc: "product-designerがUX→UI順次設計、各レビュアー検証後UX↔UIデザインディベート。ユーザーフローがAPI設計の基盤に",
        },
        {
          title: "API設計＆DB-API整合性検証",
          desc: "UXフローに基づきbackend-devがAPI設計、CTOがDB-API整合性を検証。不一致でDBから再設計",
        },
        {
          title: "実行計画＆Plan Critic",
          desc: "plannerが実装計画生成、plan-criticが6基準で採点。通過まで繰り返し",
        },
        {
          title: "CTOゲート",
          desc: "設計+計画の統合検証。PASSでBuild Phaseへ",
        },
      ],
    },
    {
      num: "03",
      title: "Build Phase",
      subtitle: "実装＆レビュー",
      color: "#f59e0b",
      steps: [
        {
          title: "並列実装",
          desc: "frontend / backend / mobile / ai-engineerエージェントが同時開発",
        },
        {
          title: "マイグレーションレビュー（DBA）",
          desc: "DBAがDB変更を検証。指摘があれば実装に差し戻し",
        },
        {
          title: "コードレビュー＋セキュリティレビュー",
          desc: "code-reviewerが品質検査、security-reviewerが脆弱性スキャン",
        },
        {
          title: "QAテスト",
          desc: "qa-engineerがUnit / Integration / E2Eテスト実行。FAILで実装に復帰",
        },
        {
          title: "デプロイ環境構成（DevOps）",
          desc: "devopsがCI/CDパイプライン、Dockerコンテナ、デプロイ環境を構成。Verify Phaseで実際の動作検証が可能な状態に準備",
        },
      ],
    },
    {
      num: "04",
      title: "Verify Phase",
      subtitle: "検証＆ローンチ",
      color: "var(--color-secondary)",
      steps: [
        {
          title: "動作検証（Simulator）",
          desc: "実際のアプリを実行して機能動作を確認。FAILでBuild Phaseに復帰",
        },
        {
          title: "UI検証＆ユーザビリティテスト",
          desc: "スクリーンショットベースの視覚検証＋ユーザー視点のユーザビリティテスト。実装バグ → Build Phase、デザイン問題 → Design Phaseに分岐",
        },
        {
          title: "ローンチディベート",
          desc: "CEO ↔ CTO ↔ CSO三者会議。コード修正 / 設計変更 / PASSの三分岐決定",
        },
        {
          title: "完成レポート",
          desc: "ローンチ承認後、最終レポートを生成",
        },
      ],
    },
  ],
};

const cycleItems: Record<Locale, { name: string; color: string }[]> = {
  ko: [
    { name: "Define", color: "var(--color-primary)" },
    { name: "Build", color: "var(--color-accent)" },
    { name: "Verify", color: "#f59e0b" },
    { name: "Iterate", color: "var(--color-secondary)" },
  ],
  en: [
    { name: "Define", color: "var(--color-primary)" },
    { name: "Build", color: "var(--color-accent)" },
    { name: "Verify", color: "#f59e0b" },
    { name: "Iterate", color: "var(--color-secondary)" },
  ],
  ja: [
    { name: "Define", color: "var(--color-primary)" },
    { name: "Build", color: "var(--color-accent)" },
    { name: "Verify", color: "#f59e0b" },
    { name: "Iterate", color: "var(--color-secondary)" },
  ],
};

const currentPhasesData: Record<Locale, Phase[]> = {
  ko: [
    { num: "01", title: "Define", subtitle: "문제와 제약 정렬", color: "var(--color-primary)", steps: [
      { title: "현업 문제 확인", desc: "사용자와 대화하고 직접 흐름을 써 보며 반복 작업과 병목을 찾습니다" },
      { title: "성공 기준 설정", desc: "사용 경험·운영 비용·모델 품질의 우선순위와 제약을 명확히 합니다" },
      { title: "작은 PoC 설계", desc: "가장 빨리 배울 수 있는 최소 구현으로 가설을 검증합니다" },
    ] },
    { num: "02", title: "Build", subtitle: "구현과 탐색", color: "var(--color-accent)", steps: [
      { title: "동작하는 첫 버전", desc: "AI 코딩 도구로 조사와 구현 속도를 높이되, 핵심 설계 판단은 직접 검토합니다" },
      { title: "문서화와 코드 리뷰", desc: "결정 근거와 인터페이스를 남기고 피드백과 검증 가능한 결과로 다듬습니다" },
      { title: "운영 조건 반영", desc: "추론 지연 시간, GPU 비용, CPU 실행 가능성 같은 조건을 구현부터 고려합니다" },
    ] },
    { num: "03", title: "Verify", subtitle: "동작과 사용성 검증", color: "#f59e0b", steps: [
      { title: "실행 환경에서 확인", desc: "모델 지표뿐 아니라 실제 입력, 지연 시간, 오류 상황을 점검합니다" },
      { title: "사용자 관점 평가", desc: "사용자가 실제로 쓰고 문제 해결에 도움이 되는지를 성공 기준으로 봅니다" },
      { title: "안전과 품질 점검", desc: "실패 사례와 운영 비용을 확인하고 필요한 안전장치를 보완합니다" },
    ] },
    { num: "04", title: "Iterate", subtitle: "운영과 개선", color: "var(--color-secondary)", steps: [
      { title: "운영 신호 관찰", desc: "사용량, 오류, 지연 시간, 비용으로 지속 가능성을 확인합니다" },
      { title: "피드백 반영", desc: "근거 있는 피드백을 빠르게 반영하고 결과로 다시 확인합니다" },
      { title: "다음 문제로 확장", desc: "검증된 기반 위에서 자동화와 제품 개선을 단계적으로 확장합니다" },
    ] },
  ],
  en: [
    { num: "01", title: "Define", subtitle: "Align the problem and constraints", color: "var(--color-primary)", steps: [
      { title: "Start with the real problem", desc: "Talk with users and walk through their work to find repetitive tasks and bottlenecks." },
      { title: "Set success criteria", desc: "Make user experience, operating cost, model quality, and constraints explicit." },
      { title: "Design a small PoC", desc: "Test the hypothesis with the smallest implementation that can teach us quickly." },
    ] },
    { num: "02", title: "Build", subtitle: "Implement and explore", color: "var(--color-accent)", steps: [
      { title: "Build a working first version", desc: "Use AI coding tools to accelerate research and implementation while reviewing key design decisions directly." },
      { title: "Document and review", desc: "Record rationale and interfaces, then refine with feedback and verifiable results." },
      { title: "Account for operations", desc: "Consider inference latency, GPU cost, and CPU feasibility from the implementation stage." },
    ] },
    { num: "03", title: "Verify", subtitle: "Validate behavior and usability", color: "#f59e0b", steps: [
      { title: "Check in a runnable environment", desc: "Test real inputs, latency, and failure cases alongside model metrics." },
      { title: "Evaluate from the user's perspective", desc: "Treat actual use and problem resolution as the success criteria." },
      { title: "Review safety and quality", desc: "Check failure modes and operating cost, then add the safeguards that are needed." },
    ] },
    { num: "04", title: "Iterate", subtitle: "Operate and improve", color: "var(--color-secondary)", steps: [
      { title: "Observe operational signals", desc: "Use usage, errors, latency, and cost to assess sustainability." },
      { title: "Incorporate feedback", desc: "Act on evidence-based feedback quickly, then validate the result again." },
      { title: "Expand to the next problem", desc: "Extend automation and product improvements gradually from a validated base." },
    ] },
  ],
  ja: [
    { num: "01", title: "Define", subtitle: "課題と制約を整理", color: "var(--color-primary)", steps: [
      { title: "現場の課題を確認", desc: "ユーザーと対話し実際の業務フローを試して、繰り返し作業とボトルネックを見つけます。" },
      { title: "成功基準を設定", desc: "ユーザー体験、運用コスト、モデル品質、制約の優先順位を明確にします。" },
      { title: "小さなPoCを設計", desc: "最も早く学べる最小実装で仮説を検証します。" },
    ] },
    { num: "02", title: "Build", subtitle: "実装と探索", color: "var(--color-accent)", steps: [
      { title: "動く最初の版を作る", desc: "AIコーディングツールで調査と実装を加速しつつ、重要な設計判断は直接レビューします。" },
      { title: "文書化とコードレビュー", desc: "判断根拠とインターフェースを残し、フィードバックと検証可能な結果で改善します。" },
      { title: "運用条件を反映", desc: "推論レイテンシ、GPUコスト、CPUでの実行可能性を実装段階から考慮します。" },
    ] },
    { num: "03", title: "Verify", subtitle: "動作と使いやすさを検証", color: "#f59e0b", steps: [
      { title: "実行環境で確認", desc: "モデル指標だけでなく、実際の入力、レイテンシ、エラー状況を確認します。" },
      { title: "ユーザー視点で評価", desc: "ユーザーが実際に使い、課題解決に役立つかを成功基準とします。" },
      { title: "安全性と品質を点検", desc: "失敗事例と運用コストを確認し、必要な安全策を補います。" },
    ] },
    { num: "04", title: "Iterate", subtitle: "運用と改善", color: "var(--color-secondary)", steps: [
      { title: "運用シグナルを観察", desc: "利用量、エラー、レイテンシ、コストから持続可能性を確認します。" },
      { title: "フィードバックを反映", desc: "根拠のあるフィードバックを速く反映し、結果を再確認します。" },
      { title: "次の課題へ拡張", desc: "検証済みの基盤から自動化とプロダクト改善を段階的に広げます。" },
    ] },
  ],
};

interface Props {
  locale?: Locale;
}

export default function AiWorkflow({ locale = "ko" }: Props) {
  const phases = currentPhasesData[locale];

  return (
    <section id="ai-workflow" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ opacity: 1 }}
        >
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)]">
            {ui[locale]["aiWorkflow.subtitle"]}
          </h2>
          <h3 className="mb-4 text-3xl font-bold md:text-4xl font-[family-name:var(--font-heading)]">
            {ui[locale]["aiWorkflow.title"]}
          </h3>
          <p className="mb-12 text-[var(--color-text-secondary)] leading-relaxed">
            {ui[locale]["aiWorkflow.description"]}
            <br className="hidden md:inline" /> {ui[locale]["aiWorkflow.descriptionBr"]}
          </p>
        </motion.div>

        {/* Cycle Diagram */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ opacity: 1 }}
          className="mb-20 flex items-center justify-center gap-1 md:gap-5"
        >
          {cycleItems[locale].map((item, i) => (
            <div key={item.name} className="flex items-center gap-1 md:gap-5">
              <div
                className="flex h-10 w-[54px] items-center justify-center rounded-xl border-2 text-[11px] font-bold md:h-[52px] md:w-[84px] md:text-[15px]"
                style={{
                  borderColor: item.color,
                  color: item.color,
                  boxShadow: `0 0 16px color-mix(in srgb, ${item.color} 20%, transparent)`,
                }}
              >
                {item.name}
              </div>
              {i < cycleItems[locale].length - 1 && (
                <span className="text-[var(--color-text-secondary)]/30">
                  →
                </span>
              )}
            </div>
          ))}
          <span className="text-xl font-bold text-[var(--color-text-secondary)]/30">
            ↻
          </span>
        </motion.div>

        {/* Phases */}
        <div className="space-y-20">
          {phases.map((phase, phaseIdx) => (
            <motion.div
              key={phase.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ opacity: 1 }}
            >
              {/* Phase Header */}
              <div className="mb-6 flex items-baseline gap-4">
                <span
                  className="text-[42px] font-extrabold opacity-20"
                  style={{ color: phase.color }}
                >
                  {phase.num}
                </span>
                <div>
                  <h4
                    className="text-2xl font-bold"
                    style={{ color: phase.color }}
                  >
                    {phase.title}
                  </h4>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {phase.subtitle}
                  </p>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-3">
                {phase.steps.map((step, stepIdx) => (
                  <motion.div
                    key={stepIdx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: stepIdx * 0.05,
                    }}
                    style={{ opacity: 1 }}
                  >
                    <GlassCard className="flex flex-row items-start gap-4 !p-[18px]">
                      {/* Step Number */}
                      <div
                        className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full text-xs font-bold"
                        style={{
                          backgroundColor: `color-mix(in srgb, ${phase.color} 15%, transparent)`,
                          color: phase.color,
                        }}
                      >
                        {stepIdx + 1}
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold">{step.title}</p>
                        <p className="mt-1 text-[11px] leading-relaxed text-[var(--color-text-secondary)]">
                          {step.desc}
                        </p>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Built with badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ opacity: 1 }}
          className="mt-16 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 px-6 py-2.5 text-sm text-[var(--color-accent)]">
            ⚡ {ui[locale]["aiWorkflow.badge"]}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
