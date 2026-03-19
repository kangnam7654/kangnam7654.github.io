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
    company: "크레버스 (청담러닝)",
    team: "Nesto CV 본부, AI Biz 팀",
    role: "AI 엔지니어",
    period: "2024.04 ~ 현재",
    location: "서울",
    project: "AI 자동평가 시스템",
    highlights: [
      "[MLOps] Azure ML에 실시간 추론 시스템을 배포, MAU 3만 명 달성",
      "[LLM Agent] 다중 에이전트 접근 방식으로 합성 학생 데이터 생성",
      "[Vision] Diffusion 모델 기반 이미지 생성 파이프라인 구성 및 양자화 경량화",
      "[Audio] NVIDIA Parakeet 기반 STT 모델 미세 조정",
      "[Audio] TTS 모델 파인튜닝으로 자연스러운 음성 합성",
      "[Search] 키워드 + 벡터 하이브리드 검색 시스템 설계 및 구현",
      "[Vision] MediaPipe 기반 얼굴/자세 추적 자동 평가 기능 개발",
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
      "[Vision] Face-to-Character 아바타 생성 시스템 설계 및 end-to-end 구성",
      "[Vision] MediaPipe Pose Estimation 기반 실시간 모션 트래킹 기능 개발",
    ],
  },
  {
    company: "코코넛사일로",
    team: "CTO실",
    role: "AI 연구 엔지니어",
    period: "2021.06 ~ 2022.04",
    location: "서울",
    project: "정부 지원 프로젝트",
    highlights: [
      "[Recommender] BERT 임베딩 기반 콘텐츠 추천 시스템 구현",
      "[Vision] 해상 레이더 영상 객체 탐지를 위한 YOLOv5 파인튜닝",
      "[Anomaly] 산업용 3D 프린터 비전 기반 이상 탐지 시스템 개발",
    ],
  },
];
