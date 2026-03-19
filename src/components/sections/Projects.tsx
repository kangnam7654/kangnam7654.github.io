import { motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";

interface Project {
  title: string;
  description: string;
  tags: string[];
  company: string;
  href: string;
  github?: string;
  sideProject?: boolean;
  claudeCode?: boolean;
}

const projects: Project[] = [
  {
    title: "Unreal Engine MCP 플러그인",
    description:
      "언리얼 엔진에서 동작하는 플러그인 형태의 MCP(Model Context Protocol) 개발. AI와 게임 엔진 간 연동 인터페이스 구축",
    tags: ["MCP", "Unreal Engine", "AI Integration"],
    company: "위메이드 넥스트",
    href: "/projects/ue5-mcp",
    github: "https://github.com/kangnam7654/kangnam-unreal-mcp",
  },
  {
    title: "AI 자동평가 시스템",
    description:
      "Azure ML 기반 실시간 추론 시스템 배포. Multi-Agent 합성 데이터 생성, Diffusion 이미지 생성, STT/TTS 파인튜닝, 하이브리드 검색 시스템 구현",
    tags: ["MLOps", "LLM Agent", "Vision", "Audio", "Search"],
    company: "크레버스",
    href: "/projects/ai-assessment",
    github: "https://github.com/kangnam7654/Multi-Agent-English-Assessment-System",
  },
  {
    title: "Face-to-Character 아바타 생성",
    description:
      "사용자 얼굴 이미지 기반 게임 아바타 생성 시스템 설계 및 캐릭터 외형 반영 end-to-end 파이프라인 구성",
    tags: ["Vision", "Deep Learning"],
    company: "메타버스월드",
    href: "/projects/face-to-character",
    github: "https://github.com/kangnam7654/face_to_parameter",
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
    github: "https://github.com/kangnam7654/Vision_Radar_od",
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
    title: "MCP 데스크탑 클라이언트",
    description:
      "MCP 지원 데스크탑 LLM 채팅 클라이언트",
    tags: ["Tauri", "Rust", "MCP"],
    company: "개인 프로젝트",
    href: "/projects/kangnam-client",
    github: "https://github.com/kangnam7654/kangnam-client",
    sideProject: true,
    claudeCode: true,
  },
  {
    title: "AutoShorts — AI 숏폼 자동화",
    description:
      "Veo 3.1 영상 생성부터 자막, 후처리, YouTube 업로드까지 자동화하는 숏폼 제작 CLI",
    tags: ["Python", "Veo 3.1", "Whisper", "FFmpeg"],
    company: "개인 프로젝트",
    href: "/projects/auto-shorts",
    github: "https://github.com/kangnam7654/AutoShorts",
    sideProject: true,
    claudeCode: true,
  },
  {
    title: "What Health",
    description:
      "LLM이 운동 코치가 되어 개인 맞춤 운동 스케줄을 관리해주는 앱",
    tags: ["Swift", "Rust", "LLM"],
    company: "개인 프로젝트",
    href: "/projects/what-health",
    github: "https://github.com/kangnam7654/what_health",
    sideProject: true,
    claudeCode: true,
  },
  {
    title: "달결 — AI 사주·타로",
    description:
      "사주·타로 기반 AI 운세 상담 iOS 앱. 서비스 출시 예정",
    tags: ["Rust", "Swift", "LLM", "iOS"],
    company: "개인 프로젝트",
    href: "/projects/dalgyeol",
    sideProject: true,
    claudeCode: true,
  },
  {
    title: "Quorum — 멀티에이전트 협업",
    description:
      "여러 AI 에이전트가 토론·협업하는 멀티에이전트 플랫폼",
    tags: ["Rust", "Next.js", "Tauri", "LLM"],
    company: "개인 프로젝트",
    href: "/projects/quorum",
    sideProject: true,
    claudeCode: true,
  },
  {
    title: "Game NPC with LLM",
    description:
      "강화학습으로 퀘스트를 수행하고, LLM 기반 NPC와 대화하는 게임",
    tags: ["Python", "RL", "LLM"],
    company: "개인 프로젝트",
    href: "/projects/game-npc",
    github: "https://github.com/kangnam7654/Game-NPC-with-LLM",
    sideProject: true,
    claudeCode: true,
  },
  {
    title: "Multi-Agent Story Writer",
    description:
      "Lorebook 기반 세계관을 참고해 스토리를 생성·검수·피드백하는 멀티에이전트 시스템",
    tags: ["Python", "LangGraph", "ChromaDB"],
    company: "개인 프로젝트",
    href: "/projects/story-writer",
    github: "https://github.com/kangnam7654/multi_agent_storywriter",
    sideProject: true,
    claudeCode: true,
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
                <h4 className="mb-2 flex items-center gap-2 text-lg font-bold transition-colors duration-200 group-hover:text-[var(--color-primary)]">
                  {project.title}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-text-secondary)] transition-colors duration-200 hover:text-[var(--color-primary)]"
                      aria-label="GitHub"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  )}
                  {project.sideProject && (
                    <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                      Side Project
                    </span>
                  )}
                  {project.claudeCode && (
                    <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-400">
                      Claude Code
                    </span>
                  )}
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
