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
      title: "Plan Loop",
      subtitle: "설계 우선 개발",
      color: "var(--color-primary)",
      steps: [
        {
          title: "AI 브레인스토밍 & 주제 선정",
          desc: "AI와 아이디어 발산 → 문제 정의 → 주제 선정",
        },
        {
          title: "설계 문서 & 다이어그램 작성 (For AI)",
          desc: "6개 필수 섹션(목적, 아키텍처, 데이터 흐름, API, 파일 구조, 의사결정 근거) + Mermaid 다이어그램. AI가 소비하는 문서",
        },
        {
          title: "Prompt Critic 채점",
          desc: "Doc-Critic이 5개 기준(가독성, 구조, 예시, 완성도, 정확성)으로 채점. 8.0/10 이상 통과",
        },
        {
          title: "통과할 때까지 2↔3 반복",
          desc: "REJECT → 피드백 반영 재작성. 최대 5회",
        },
        {
          title: "Figma 와이어프레임",
          desc: "구조와 레이아웃을 Lo-fi로 시각 설계",
        },
        {
          title: "Hi-fi 디자인",
          desc: "색상, 타이포, 인터랙션 포함 고충실도 디자인",
        },
        {
          title: "AI Plan 수립",
          desc: "Planner 에이전트가 구현 계획 생성",
        },
        {
          title: "Plan Critic 채점",
          desc: "6개 기준(명확성, 완성도, 실현가능성, 의존성, 리스크, 범위) 채점",
        },
        {
          title: "통과할 때까지 7↔8 반복",
          desc: "최대 5회",
        },
      ],
    },
    {
      num: "02",
      title: "Dev Loop",
      subtitle: "AI 페어 프로그래밍 + Git 안전망",
      color: "var(--color-secondary)",
      steps: [
        {
          title: "개발",
          desc: "승인된 플랜 기반 AI 페어 프로그래밍. NEVER 규칙 10개 자동 적용",
        },
        {
          title: "커밋 (Checkpoint)",
          desc: "작업 단위마다 커밋. 언제든 이전 상태로 되돌릴 수 있는 체크포인트",
        },
        {
          title: "코드 리뷰",
          desc: "AI 리뷰어가 보안·성능·가독성 검토",
        },
        {
          title: "이슈 수정",
          desc: "리뷰 피드백 반영하여 코드 수정",
        },
        {
          title: "커밋 (Checkpoint)",
          desc: "수정 사항도 별도 커밋. git revert로 안전하게 되돌리기 가능",
        },
        {
          title: "문서 편집 & 개발 기록 (For Human)",
          desc: "사람이 읽을 README, 가이드, 변경 기록 작성",
        },
        {
          title: "사람이 확인하며 1→6 반복",
          desc: "개발자가 직접 검증. 문제 시 git으로 어느 시점이든 복원",
        },
      ],
    },
    {
      num: "03",
      title: "Test Loop",
      subtitle: "품질 게이트",
      color: "var(--color-accent)",
      steps: [
        {
          title: "Unit → Integration → E2E 설계",
          desc: "단계별 테스트 전략. Unit은 외부 의존성 Mock, Integration은 모듈 간 실제 호출",
        },
        {
          title: "Unit Test 커버리지 80%+",
          desc: "최소 80% 강제. 미달 시 커밋 불가 (NEVER 규칙)",
        },
        {
          title: "AI 스크린샷 테스트 (LLM Test)",
          desc: "실제 화면 캡처 → AI가 시각적 검증. UI 깨짐·레이아웃 이슈 자동 탐지",
        },
      ],
    },
  ],
  en: [
    {
      num: "01",
      title: "Plan Loop",
      subtitle: "Design-First Development",
      color: "var(--color-primary)",
      steps: [
        {
          title: "AI Brainstorming & Topic Selection",
          desc: "Diverge ideas with AI → Define problem → Select topic",
        },
        {
          title: "Design Doc & Diagrams (For AI)",
          desc: "6 required sections (Purpose, Architecture, Data Flow, API, File Structure, Decision Rationale) + Mermaid diagrams. Documents consumed by AI",
        },
        {
          title: "Prompt Critic Scoring",
          desc: "Doc-Critic scores on 5 criteria (Readability, Structure, Examples, Completeness, Accuracy). Pass at 8.0/10+",
        },
        {
          title: "Repeat 2↔3 Until Pass",
          desc: "REJECT → Revise with feedback. Max 5 rounds",
        },
        {
          title: "Figma Wireframe",
          desc: "Lo-fi visual design for structure and layout",
        },
        {
          title: "Hi-fi Design",
          desc: "High-fidelity design with colors, typography, and interactions",
        },
        {
          title: "AI Plan Generation",
          desc: "Planner agent generates implementation plan",
        },
        {
          title: "Plan Critic Scoring",
          desc: "Scored on 6 criteria (Clarity, Completeness, Feasibility, Dependencies, Risks, Scope)",
        },
        {
          title: "Repeat 7↔8 Until Pass",
          desc: "Max 5 rounds",
        },
      ],
    },
    {
      num: "02",
      title: "Dev Loop",
      subtitle: "AI Pair Programming + Git Safety Net",
      color: "var(--color-secondary)",
      steps: [
        {
          title: "Development",
          desc: "AI pair programming based on approved plan. 10 NEVER rules auto-enforced",
        },
        {
          title: "Commit (Checkpoint)",
          desc: "Commit per work unit. Checkpoint to revert to any previous state",
        },
        {
          title: "Code Review",
          desc: "AI reviewer checks security, performance, and readability",
        },
        {
          title: "Fix Issues",
          desc: "Apply review feedback to fix code",
        },
        {
          title: "Commit (Checkpoint)",
          desc: "Separate commit for fixes. Safe rollback via git revert",
        },
        {
          title: "Doc Editing & Dev Log (For Human)",
          desc: "Write README, guides, and changelogs for human readers",
        },
        {
          title: "Human Review, Repeat 1→6",
          desc: "Developer verifies directly. Restore to any point via git if needed",
        },
      ],
    },
    {
      num: "03",
      title: "Test Loop",
      subtitle: "Quality Gate",
      color: "var(--color-accent)",
      steps: [
        {
          title: "Unit → Integration → E2E Design",
          desc: "Staged test strategy. Unit mocks external deps, Integration uses real module calls",
        },
        {
          title: "Unit Test Coverage 80%+",
          desc: "Minimum 80% enforced. Commit blocked if below (NEVER rule)",
        },
        {
          title: "AI Screenshot Test (LLM Test)",
          desc: "Capture actual screens → AI visual verification. Auto-detect UI breaks and layout issues",
        },
      ],
    },
  ],
  ja: [
    {
      num: "01",
      title: "Plan Loop",
      subtitle: "設計優先開発",
      color: "var(--color-primary)",
      steps: [
        {
          title: "AIブレインストーミング＆テーマ選定",
          desc: "AIとアイデア発散 → 問題定義 → テーマ選定",
        },
        {
          title: "設計ドキュメント＆ダイアグラム作成 (For AI)",
          desc: "6つの必須セクション（目的、アーキテクチャ、データフロー、API、ファイル構造、意思決定根拠）+ Mermaidダイアグラム。AIが消費するドキュメント",
        },
        {
          title: "Prompt Critic採点",
          desc: "Doc-Criticが5つの基準（可読性、構造、例示、完成度、正確性）で採点。8.0/10以上で通過",
        },
        {
          title: "通過するまで2↔3を繰り返し",
          desc: "REJECT → フィードバック反映して再作成。最大5回",
        },
        {
          title: "Figmaワイヤーフレーム",
          desc: "構造とレイアウトをLo-fiで視覚設計",
        },
        {
          title: "Hi-fiデザイン",
          desc: "色、タイポグラフィ、インタラクションを含む高忠実度デザイン",
        },
        {
          title: "AIプラン策定",
          desc: "Plannerエージェントが実装計画を生成",
        },
        {
          title: "Plan Critic採点",
          desc: "6つの基準（明確性、完成度、実現可能性、依存関係、リスク、範囲）で採点",
        },
        {
          title: "通過するまで7↔8を繰り返し",
          desc: "最大5回",
        },
      ],
    },
    {
      num: "02",
      title: "Dev Loop",
      subtitle: "AIペアプログラミング + Gitセーフティネット",
      color: "var(--color-secondary)",
      steps: [
        {
          title: "開発",
          desc: "承認されたプランに基づくAIペアプログラミング。NEVERルール10個を自動適用",
        },
        {
          title: "コミット（チェックポイント）",
          desc: "作業単位ごとにコミット。いつでも以前の状態に戻せるチェックポイント",
        },
        {
          title: "コードレビュー",
          desc: "AIレビュアーがセキュリティ・パフォーマンス・可読性を検査",
        },
        {
          title: "イシュー修正",
          desc: "レビューフィードバックを反映してコードを修正",
        },
        {
          title: "コミット（チェックポイント）",
          desc: "修正事項も別途コミット。git revertで安全にロールバック可能",
        },
        {
          title: "ドキュメント編集＆開発記録 (For Human)",
          desc: "人が読むREADME、ガイド、変更記録を作成",
        },
        {
          title: "人が確認しながら1→6を繰り返し",
          desc: "開発者が直接検証。問題があればgitでどの時点にも復元",
        },
      ],
    },
    {
      num: "03",
      title: "Test Loop",
      subtitle: "品質ゲート",
      color: "var(--color-accent)",
      steps: [
        {
          title: "Unit → Integration → E2E設計",
          desc: "段階別テスト戦略。Unitは外部依存をMock、Integrationはモジュール間の実際の呼び出し",
        },
        {
          title: "Unit Testカバレッジ80%+",
          desc: "最低80%を強制。未達の場合コミット不可（NEVERルール）",
        },
        {
          title: "AIスクリーンショットテスト（LLM Test）",
          desc: "実際の画面キャプチャ → AIが視覚的に検証。UI崩れ・レイアウト問題を自動検出",
        },
      ],
    },
  ],
};

const cycleItems = [
  { name: "Plan", color: "var(--color-primary)" },
  { name: "Dev", color: "var(--color-secondary)" },
  { name: "Test", color: "var(--color-accent)" },
];

interface Props {
  locale?: Locale;
}

export default function AiWorkflow({ locale = "ko" }: Props) {
  const phases = phasesData[locale];

  return (
    <section id="ai-workflow" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
          className="mb-20 flex items-center justify-center gap-5"
        >
          {cycleItems.map((item, i) => (
            <div key={item.name} className="flex items-center gap-5">
              <div
                className="flex h-[52px] w-[84px] items-center justify-center rounded-xl border-2 text-[15px] font-bold"
                style={{
                  borderColor: item.color,
                  color: item.color,
                  boxShadow: `0 0 16px color-mix(in srgb, ${item.color} 20%, transparent)`,
                }}
              >
                {item.name}
              </div>
              {i < cycleItems.length - 1 && (
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
