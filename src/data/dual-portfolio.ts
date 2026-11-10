import { getProjectData } from "../i18n/data/projects";

export const portfolioVariants = ["type", "objects"] as const;
export type PortfolioVariant = (typeof portfolioVariants)[number];
export type PortfolioCaseSlug = "ue5-mcp" | "ai-assessment" | "story-writer" | "dalgyeol";

interface PortfolioCase {
  slug: PortfolioCaseSlug;
  title: string;
  context: string;
  period: string;
  scope: string;
  paragraphs: readonly string[];
  qualification?: string;
  detail: { href: string; label: string };
  github?: string;
  image: {
    src: string;
    width: number;
    height: number;
    alt: string;
    caption: string;
  };
}

const unreal = getProjectData("ue5-mcp", "ko");
const assessment = getProjectData("ai-assessment", "ko");
const writer = getProjectData("story-writer", "ko");

// Public copy is shared by both complete variants. Keep scope beside the work,
// rather than turning a prototype or a development screenshot into a launch claim.
export const dualPortfolio = {
  name: "김강남",
  latinName: "Kangnam Kim",
  role: "AI Engineer",
  resume: { href: "/kangnam-kim-resume.pdf", label: "이력서 PDF" },
  contact: {
    href: "mailto:kangnam7653@gmail.com",
    email: "kangnam7653@gmail.com",
    title: "이어서 이야기하려면",
    description: "채용이나 프로젝트에 관한 이야기는 이메일로 보내주세요.",
  },
  github: "https://github.com/kangnam7654",
  intro: {
    title: "회사에서 맡은 일과 개인적으로 만드는 것",
    paragraphs: [
      "언리얼 에디터를 자연어로 다루는 도구를 만들고, 학생의 영어 발표를 평가하는 모델을 배포·운영했습니다.",
      "음성·비전 모델과 개발 도구, 그리고 개인적으로 만드는 앱을 함께 담았습니다.",
    ],
  },
  hero: {
    type: {
      kicker: "모델을 학습시키고, 쓸 수 있는 도구로 만듭니다.",
      role: "AI 엔지니어.",
      description: "음성·비전 모델과 개발 도구를 만듭니다.",
      work: "어떤 작업을 했는지 보기",
      cutoutTitle: "말로 움직이는 언리얼 에디터",
      cutoutScope: "MCP 플러그인 프로토타입 · 모듈 기여",
    },
    objects: {
      hello: "안녕하세요, 김강남입니다.",
      role: "AI 엔지니어",
      description: ["발표를 평가하는 모델을 배포하고,", "언리얼 에디터를 자연어로 다루는", "도구를 만들었습니다."],
      work: "언리얼 MCP 작업 보기",
      scope: "프로토타입 · 모듈 기여",
      disclosure: "언리얼 작업의 큐브를 재해석한 웹 그래픽. 실제 엔진 화면이나 AI 실행 데모는 아닙니다.",
    },
  },
  cases: [
    {
      slug: "ue5-mcp",
      title: "언리얼 에디터를 자연어로 다루기",
      context: unreal.company,
      period: unreal.period,
      scope: "프로토타입 모듈 기여",
      paragraphs: [
        "자연어로 오브젝트를 만들고, 수정하고, 삭제할 수 있는 MCP 플러그인입니다. AI의 도구 호출을 언리얼 엔진의 작업으로 연결했습니다.",
        "비동기 처리와 다대다 연결, 실행 중 도구를 등록하는 구조를 맡았습니다. 구현 범위는 프로토타입 단계의 연결 모듈입니다.",
      ],
      detail: { href: "/projects/ue5-mcp/", label: "구현 내용과 다른 데모" },
      github: unreal.github,
      image: {
        src: "/images/notebook/ue5-spawn-poster.webp",
        width: 960,
        height: 540,
        alt: "왼쪽의 MCP 도구 호출 창과 오른쪽의 언리얼 엔진 에디터를 함께 띄운 실제 개발 화면",
        caption: "액터 스폰 데모에서 가져온 정지 화면입니다.",
      },
    },
    {
      slug: "ai-assessment",
      title: "영어 발표를 평가하는 시스템",
      context: assessment.company,
      period: assessment.period,
      scope: "추론 파이프라인 배포·운영 / 음성·비전 모델 개발",
      paragraphs: [
        "학생의 영어 발표를 자동으로 평가하는 프로젝트였습니다. 월 약 3만 명 학생의 발표 평가에 쓰이는 Azure ML 추론 파이프라인에서 배포·운영 모듈을 맡았습니다.",
        "음성 인식은 비원어민 어린이의 발화에 맞춰야 했습니다. Parakeet을 파인튜닝해 단어 오류율(WER)을 9.6%에서 4.4%로 낮췄고, MediaPipe를 이용한 시선·자세 평가 모델도 개발했습니다.",
      ],
      detail: { href: "/projects/ai-assessment/", label: "배포와 모델 개발 자세히" },
      image: {
        src: "/images/notebook/assessment-test.webp",
        width: 980,
        height: 739,
        alt: "양손의 관절에 랜드마크를 표시한 발표태도 평가 개발 테스트",
        caption: "손 랜드마크를 확인하던 개발 테스트. 화면의 수치는 디버그 표시이며 모델 성능 수치가 아닙니다.",
      },
    },
    {
      slug: "story-writer",
      title: "Story Writer",
      context: "개인 프로젝트",
      period: writer.period,
      scope: "로컬 LLM 기반 글쓰기 도구",
      paragraphs: [
        "세계관 설정집인 Lorebook을 검색해 글을 쓰고, Director 에이전트가 검수하는 도구입니다. LangGraph로 작성과 피드백 과정을 연결하고, Ollama로 로컬 모델을 실행합니다.",
      ],
      qualification: "개인 개발 작업입니다. 개발 화면과 예시 글은 출시 여부, 사용자 수나 모델 품질의 근거가 아닙니다.",
      detail: { href: "/projects/story-writer/", label: "작동 방식 살펴보기" },
      github: writer.github,
      image: {
        src: "/images/notebook/story-writer.webp",
        width: 1100,
        height: 686,
        alt: "아이디어 입력란과 스토리 초안, 검수 피드백이 보이는 Story Writer 개발 화면",
        caption: "요청 분석, 초안, 검수 피드백을 보여 주는 개발 UI. 글은 예시입니다. 화면을 누르면 크게 볼 수 있습니다.",
      },
    },
    {
      slug: "dalgyeol",
      title: "달결",
      context: "개인 프로젝트",
      period: "Rust · Swift",
      scope: "개발 중인 iOS 앱",
      paragraphs: [
        "사주·타로와 AI 상담을 담은 iOS 앱입니다. 사주 계산은 LLM이 아닌 Rust 규칙 엔진으로 처리하고, 상담 대화에는 LLM을 연결했습니다.",
      ],
      qualification: "개발 중인 화면을 소개합니다. 출시, 실사용자 확보나 상담 품질이 검증되었다는 의미는 아닙니다.",
      detail: { href: "/projects/dalgyeol/", label: "앱 구현 살펴보기" },
      image: {
        src: "/images/notebook/dalgyeol-home.webp",
        width: 393,
        height: 1200,
        alt: "오늘의 운세와 카테고리별 운세를 보여 주는 보라색 달결 홈 화면",
        caption: "개발 중인 홈 화면 일부. 화면을 누르면 전체를 볼 수 있습니다.",
      },
    },
  ] satisfies readonly PortfolioCase[],
} as const;

export const unrealDemo = {
  src: "/images/projects/ue5-mcp-spawn.gif",
  alt: "MCP 도구 호출과 언리얼 에디터의 액터 스폰 과정을 보여 주는 실제 프로토타입 데모",
  play: "데모 재생 (약 5 MB)",
  stop: "정지 화면으로",
} as const;
