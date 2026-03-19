import { motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";

interface Project {
  title: string;
  description: string;
  tags: string[];
  company: string;
  href: string;
}

const projects: Project[] = [
  {
    title: "Unreal Engine MCP 플러그인",
    description:
      "언리얼 엔진에서 동작하는 플러그인 형태의 MCP(Model Context Protocol) 개발. AI와 게임 엔진 간 연동 인터페이스 구축",
    tags: ["MCP", "Unreal Engine", "AI Integration"],
    company: "위메이드 넥스트",
    href: "/projects/ue5-mcp",
  },
  {
    title: "AI 자동평가 시스템",
    description:
      "Azure ML 기반 실시간 추론 시스템 배포. Multi-Agent 합성 데이터 생성, Diffusion 이미지 생성, STT/TTS 파인튜닝, 하이브리드 검색 시스템 구현",
    tags: ["MLOps", "LLM Agent", "Vision", "Audio", "Search"],
    company: "크레버스",
    href: "/projects/ai-assessment",
  },
  {
    title: "Face-to-Character 아바타 생성",
    description:
      "사용자 얼굴 이미지 기반 게임 아바타 생성 시스템 설계 및 캐릭터 외형 반영 end-to-end 파이프라인 구성",
    tags: ["Vision", "Deep Learning"],
    company: "메타버스월드",
    href: "/projects/face-to-character",
  },
  {
    title: "실시간 모션 트래킹",
    description:
      "MediaPipe Pose Estimation 기반 사용자 실시간 동작을 3D 캐릭터에 반영하는 모션 트래킹 기능",
    tags: ["Vision", "Pose Estimation"],
    company: "메타버스월드",
    href: "/projects/motion-tracking",
  },
  {
    title: "콘텐츠 기반 추천 시스템",
    description:
      "제품 설명 문서를 BERT로 임베딩하고, 내적 유사도 기반 유사 제품 추천 시스템 구현",
    tags: ["NLP", "Recommender"],
    company: "코코넛사일로",
    href: "/projects/recommender",
  },
  {
    title: "해상 레이더 객체 탐지",
    description:
      "해상 레이더 영상 내 객체 탐지를 위한 YOLOv5 파인튜닝 및 다양한 날씨 조건 성능 개선",
    tags: ["Vision", "Object Detection"],
    company: "코코넛사일로",
    href: "/projects/radar-detection",
  },
  {
    title: "비전 기반 이상 탐지",
    description:
      "산업용 금속 3D 프린터 공정 모니터링을 위한 비전 기반 이상 탐지 시스템 개발",
    tags: ["Vision", "Anomaly Detection"],
    company: "코코넛사일로",
    href: "/projects/anomaly-detection",
  },
  {
    title: "중소기업 매칭 플랫폼",
    description:
      "무역 데이터를 수집·가공·분석하여 중소기업 간 매칭을 지원하는 플랫폼 기획 및 데이터 파이프라인 구축",
    tags: ["Data Analysis", "Planning"],
    company: "가이온",
    href: "/projects/matching-platform",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)]">
            Projects
          </h2>
          <h3 className="mb-12 text-3xl font-bold md:text-4xl font-[family-name:var(--font-heading)]">
            프로젝트
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <a href={project.href}>
              <GlassCard className="group h-full cursor-pointer">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--color-accent)]">
                  {project.company}
                </p>
                <h4 className="mb-2 text-lg font-bold transition-colors duration-200 group-hover:text-[var(--color-primary)]">
                  {project.title}
                </h4>
                <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-[var(--color-primary)]/10 px-2 py-1 text-xs text-[var(--color-primary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlassCard>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
