import { motion } from "framer-motion";
import { ui } from "../../i18n/ui";
import type { Locale } from "../../i18n/utils";
import GlassCard from "../ui/GlassCard";

interface Practice {
  title: string;
  desc: string;
}

const practices: Record<Locale, Practice[]> = {
  ko: [
    {
      title: "명세를 먼저 만든다",
      desc: "목표, 제약, 완료 조건을 먼저 정리해 에이전트가 해결할 문제의 범위를 명확히 합니다.",
    },
    {
      title: "컨텍스트를 저장소에 남긴다",
      desc: "AGENTS.md, 설계 문서, 실행 명령과 도메인 규칙을 코드 가까이에 두어 다음 작업도 같은 기준으로 이어갑니다.",
    },
    {
      title: "독립 작업은 병렬로, 통합은 신중하게",
      desc: "조사·구현·리뷰처럼 분리 가능한 작업은 병렬화하고, 변경 사항은 diff와 코드 리뷰로 확인한 뒤 합칩니다.",
    },
    {
      title: "검증 가능한 결과를 남긴다",
      desc: "테스트, 빌드, 실행 로그, 화면 검증을 결과물로 남겨 모델의 답변이 아닌 실제 동작으로 판단합니다.",
    },
    {
      title: "판단과 책임은 사람이 가진다",
      desc: "제품 우선순위, 아키텍처 트레이드오프, 배포와 보안 경계는 사람이 결정하고 에이전트는 이를 빠르게 실행하도록 활용합니다.",
    },
  ],
  en: [
    {
      title: "Write the spec before code",
      desc: "Define the goal, constraints, and acceptance criteria so the agent has a clear problem boundary.",
    },
    {
      title: "Keep context in the repository",
      desc: "Keep AGENTS.md, design notes, run commands, and domain rules close to the code so later work follows the same standard.",
    },
    {
      title: "Parallelize independent work, integrate carefully",
      desc: "Parallelize separable research, implementation, and review work; inspect diffs and code review before integration.",
    },
    {
      title: "Leave verifiable outputs",
      desc: "Use tests, builds, runtime logs, and visual checks to judge real behavior rather than trusting a model response.",
    },
    {
      title: "Keep judgment and accountability human-owned",
      desc: "Make product priorities, architecture trade-offs, deployment, and security boundaries human decisions; use agents to execute faster within them.",
    },
  ],
  ja: [
    {
      title: "コードの前に仕様を作る",
      desc: "目標、制約、完了条件を先に整理し、エージェントが解く課題の範囲を明確にします。",
    },
    {
      title: "コンテキストをリポジトリに残す",
      desc: "AGENTS.md、設計文書、実行コマンド、ドメイン規則をコードの近くに置き、後続の作業も同じ基準で進めます。",
    },
    {
      title: "独立作業は並列に、統合は慎重に",
      desc: "分離できる調査・実装・レビューは並列化し、差分とコードレビューを確認してから統合します。",
    },
    {
      title: "検証可能な成果を残す",
      desc: "テスト、ビルド、実行ログ、画面検証を残し、モデルの回答ではなく実際の動作で判断します。",
    },
    {
      title: "判断と責任は人が持つ",
      desc: "プロダクト優先順位、アーキテクチャのトレードオフ、デプロイとセキュリティ境界は人が決め、その範囲でエージェントを活用します。",
    },
  ],
};

interface Props {
  locale?: Locale;
}

export default function AiWorkflow({ locale = "ko" }: Props) {
  return (
    <section id="ai-workflow" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
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
          <h3 className="mb-4 font-[family-name:var(--font-heading)] text-3xl font-bold md:text-4xl">
            {ui[locale]["aiWorkflow.title"]}
          </h3>
          <p className="mb-10 leading-relaxed text-[var(--color-text-secondary)]">
            {ui[locale]["aiWorkflow.description"]}
            <br className="hidden md:inline" /> {ui[locale]["aiWorkflow.descriptionBr"]}
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {practices[locale].map((practice, index) => (
            <motion.div
              key={practice.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              style={{ opacity: 1 }}
              className={index === practices[locale].length - 1 ? "md:col-span-2" : ""}
            >
              <GlassCard className="h-full !p-6">
                <span className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-xs font-bold text-[var(--color-primary)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h4 className="text-base font-bold">{practice.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {practice.desc}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ opacity: 1 }}
          className="mt-12 text-center"
        >
          <span className="inline-flex rounded-full border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 px-6 py-2.5 text-sm text-[var(--color-accent)]">
            {ui[locale]["aiWorkflow.badge"]}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
