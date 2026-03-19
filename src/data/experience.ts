export interface Experience {
  company: string;
  team: string;
  role: string;
  period: string;
  location: string;
  project: string;
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    company: "위메이드넥스트",
    team: "미르5프로그램실, 서버팀",
    role: "AI 엔지니어",
    period: "2026.02 ~ 현재",
    location: "판교",
    project: "미르5",
    highlights: [
      "[Unreal MCP] 언리얼 엔진에서 자연어로 오브젝트를 CRUD할 수 있는 MCP 서버를 구현하고, 비동기 처리 설계와 N:M 연결 구조, 툴 동적 등록 등 확장 가능한 아키텍처를 설계",
      "[MCP Client] API Key 없이 구독 기반 모델(Codex, GitHub Copilot 등)을 활용해 채팅 및 MCP 연동이 가능한 경량 클라이언트를 제작",
    ],
  },
  {
    company: "크레버스 (청담 러닝)",
    team: "Nesto CV 본부, AI Biz 팀",
    role: "AI 엔지니어",
    period: "2024.04 ~ 2025.06",
    location: "서울",
    project: "AI 자동평가 시스템",
    highlights: [
      "[MLOps] Azure ML Endpoint와 Blob Storage를 활용해 실시간 추론 파이프라인을 설계·배포하여, 월간 약 3만 명 학생의 발표 평가에 사용되는 자동 평가 서비스를 운영",
      "[LLM Agent] LangGraph 기반 멀티 에이전트 구조로 합성 학생 데이터를 생성하는 파이프라인을 구현",
      "[Audio] 비원어민 어린이 음성 데이터로 NVIDIA Parakeet STT를 파인튜닝하여, WER을 9.6%에서 4.4%로 감소",
      "[Vision] Google MediaPipe 기반 얼굴·자세 추적을 적용해 발표 태도를 인식하는 모델을 개발, 정확도 98.32%, F1 98.77%",
      "[Vision] Diffusion 모델 기반 이미지 생성 파이프라인을 구축하고 양자화를 적용해 모델을 경량화",
      "[Search] 키워드 BM25 + 벡터 검색을 조합한 하이브리드 검색 시스템을 구현하여, LLM 호출 횟수를 약 20% 절감 검증",
    ],
  },
  {
    company: "메타버스월드 (넷마블 F&C)",
    team: "개발 1실, 메타월드 개발 파트",
    role: "AI 연구 엔지니어",
    period: "2022.10 ~ 2024.01",
    location: "서울",
    project: "그랜드크로스: 메타월드",
    highlights: [
      "[Vision] 사용자 얼굴 이미지를 기반으로 게임 아바타를 생성하는 Face-to-Character 프로토타입을 연구 논문을 분석·참조하여 설계·구현 (PoC)",
      "[Vision] MediaPipe 기반 Pose Estimation을 적용해 사용자의 실시간 동작을 3D 캐릭터에 반영하는 모션 트래킹 기능 개발",
    ],
  },
  {
    company: "코코넛사일로",
    team: "CTO실",
    role: "AI 연구 엔지니어",
    period: "2021.06 ~ 2022.04",
    location: "서울",
    project: "",
    highlights: [
      "[Recommender System] 제품 설명 문서를 BERT로 임베딩하고 내적 유사도 기반 콘텐츠 추천 시스템(CBF)을 구현",
      "[Vision] 해상 레이더 영상 내 선박·장애물 탐지를 위해 YOLOv5를 파인튜닝",
      "[Anomaly Detection] 금속 3D 프린터 공정 영상을 실시간 분석하는 비전 기반 이상 탐지 시스템을 설계·구현",
    ],
  },
  {
    company: "주식회사 가이온",
    team: "서비스사업부",
    role: "데이터사이언티스트",
    period: "2020.08 ~ 2021.05",
    location: "서울",
    project: "",
    highlights: [
      "[Data] 정부지원 프로젝트(데이터 바우처) 데이터 분석을 위한 데이터 수집, 가공",
      "[Planning] 무역 데이터를 이용한 중소기업 매칭 플랫폼 기획 및 데이터 수집·가공·분석",
    ],
  },
];
