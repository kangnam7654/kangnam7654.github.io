// 이력서 생성용 통합 데이터
// 이 파일이 이력서의 Single Source of Truth

export const profile = {
  name: "김강남",
  title: "AI Engineer",
  birth: "1991년",
  address: "서울 강동구 거주",
  portfolio: "kangnam7654.github.io",
  salary: { current: "5,600만원", desired: "내규에 따름, 협의" },
};

export const summary = [
  "Vision·Audio·LLM 등 다양한 AI 기술로 서비스를 설계하고 배포해 온 AI 엔지니어입니다. 어린이 영어 학습, 메타버스, B2B 솔루션 등 다양한 도메인에서 서비스 배포부터 PoC까지 폭넓은 경험을 쌓았습니다.",
  "크레버스에서는 Azure ML 기반 실시간 평가 시스템을 설계·운영하여, 월간 약 3만 명 학생의 발표 평가에 사용되는 자동 평가 서비스를 운영했습니다. 비원어민 어린이 음성 데이터로 NVIDIA Parakeet 기반 STT 모델을 재학습해 WER을 9.6%에서 4.4%로 낮추었고, 발표 태도 인식 모델은 정확도 98.32%, F1 98.77% 수준으로 끌어올렸습니다. 키워드·벡터를 결합한 하이브리드 검색 구조를 도입해 동일 품질 기준에서 LLM 호출을 약 20%까지 줄일 수 있음을 실험으로 확인했습니다.",
  "물리학 전공과 AI·SW 대학원 석사 과정을 통해 이론과 실무를 함께 다듬고 있습니다. Claude Code를 활용한 AI 페어 프로그래밍으로 개발 생산성을 높이고 있으며, 사이드 프로젝트에서 Rust 백엔드 + Swift iOS 풀스택 앱(서비스 출시 예정), 멀티에이전트 플랫폼, AI 영상 자동화 파이프라인 등을 1인 개발로 구현했습니다. 데이터 수집부터 모델링·배포·운영까지 엔드투엔드 파이프라인을 직접 구축해 본 경험이 있으며, Jira·Confluence·GitHub를 활용한 스프린트 기반 협업과 코드 리뷰 문화에 익숙합니다. 포트폴리오: kangnam7654.github.io",
];

export const skills = {
  "언어": "Python, Rust, Swift, C++",
  "ML/DL": "PyTorch, HuggingFace Transformers, LangChain, LangGraph, Gymnasium, Stable-baselines3",
  "서빙/API": "FastAPI, Axum, Tauri, TensorRT, Triton, Gradio, Streamlit, ONNX",
  "데이터": "Pandas, Polars, NumPy, OpenCV, FFmpeg",
  "클라우드/인프라": "Microsoft Azure (Azure ML, Blob Storage), Docker, WSL",
  "AI 도구": "Claude Code, Codex, GitHub Copilot",
  "실험 관리": "Weights & Biases, MLflow",
  "협업": "Git PR/Code Review, Jira, Confluence, Slack, Google Workspace, Agile/Scrum",
};

export interface CareerEntry {
  company: string;
  role: string;
  team: string;
  period: string;
  location: string;
  reason?: string;
  project?: string;
  highlights: string[];
}

export const career: CareerEntry[] = [
  {
    company: "위메이드넥스트",
    role: "AI 엔지니어",
    team: "미르5프로그램실, 서버팀",
    period: "2026.02 – 현재",
    location: "판교",
    project: "미르5",
    highlights: [
      "[Unreal MCP] 언리얼 엔진에서 자연어로 오브젝트를 CRUD할 수 있는 MCP 서버를 구현하고, 비동기 처리 설계와 N:M 연결 구조, 툴 동적 등록 등 확장 가능한 아키텍처를 설계",
      "[MCP Client] API Key 없이 구독 기반 모델(Codex, GitHub Copilot 등)을 활용해 채팅 및 MCP 연동이 가능한 경량 클라이언트를 제작",
    ],
  },
  {
    company: "크레버스 (청담 러닝)",
    role: "AI 엔지니어",
    team: "Nesto CV 본부, AI Biz 팀",
    period: "2024.04 – 2025.06",
    location: "서울",
    reason: "프로젝트 종료 및 직무 전문화를 위한 이직",
    project: "AI 자동평가 시스템",
    highlights: [
      "[MLOps] Azure ML Endpoint와 Blob Storage를 활용해 실시간 추론 파이프라인을 설계·배포하여, 월간 약 3만 명 학생의 발표 평가에 사용되는 자동 평가 서비스를 운영",
      "[LLM Agent] LangGraph 기반 멀티 에이전트 구조로 합성 학생 데이터를 생성하는 파이프라인을 구현하여, 실제 수집이 어려운 발화 패턴을 보강하고 학습 데이터 다양성을 향상",
      "[Audio] 비원어민 어린이 음성 데이터로 NVIDIA Parakeet STT를 파인튜닝하여, WER을 9.6%에서 4.4%로 절반 이하 수준으로 감소",
      "[Vision] Google MediaPipe 기반 얼굴·자세 추적을 적용해 발표 태도를 인식하는 모델을 개발하고, 검증 데이터 기준 정확도 98.32%, F1 98.77% 수준의 성능 달성",
      "[Vision] Diffusion 모델 기반 이미지 생성 파이프라인을 구축하고 양자화를 적용해 모델을 경량화",
      "[Search] 키워드 BM25 + 벡터 검색을 조합한 하이브리드 검색 시스템을 구현하여, 사내 로그 기반 실험에서 동일 품질 기준으로 LLM 호출 횟수를 약 20%까지 줄일 수 있음을 검증",
    ],
  },
  {
    company: "메타버스월드 (넷마블 F&C)",
    role: "AI 연구 엔지니어",
    team: "개발 1실, 메타월드 개발 파트",
    period: "2022.10 – 2024.01",
    location: "서울",
    reason: "경영악화로 인한 폐업",
    project: "그랜드크로스: 메타월드",
    highlights: [
      "[Vision] 사용자 얼굴 이미지를 기반으로 게임 아바타를 생성하는 Face-to-Character 프로토타입을 연구 논문을 분석·참조하여 설계·구현 (PoC)",
      "[Vision] MediaPipe 기반 Pose Estimation을 적용해 사용자의 실시간 동작을 3D 캐릭터에 반영하는 모션 트래킹 기능 개발",
    ],
  },
  {
    company: "코코넛사일로",
    role: "AI 연구 엔지니어",
    team: "CTO실",
    period: "2021.06 – 2022.04",
    location: "서울",
    reason: "대학원 진학",
    highlights: [
      "[Recommender System] 제품 설명 문서를 BERT로 임베딩하고 내적 유사도 기반 콘텐츠 추천 시스템(CBF)을 구현",
      "[Vision] 해상 레이더 영상 내 선박·장애물 탐지를 위해 YOLOv5를 파인튜닝",
      "[Anomaly Detection] 금속 3D 프린터 공정 영상을 실시간 분석하는 비전 기반 이상 탐지 시스템을 설계·구현",
    ],
  },
  {
    company: "주식회사 가이온",
    role: "데이터사이언티스트",
    team: "서비스사업부",
    period: "2020.08 – 2021.05",
    location: "서울",
    reason: "부서 해체",
    highlights: [
      "[Data] 정부지원 프로젝트(데이터 바우처) 데이터 분석을 위한 데이터 수집, 가공",
      "[Planning] 무역 데이터를 이용한 중소기업 매칭 플랫폼 기획 및 데이터 수집·가공·분석",
    ],
  },
];

export const education = [
  {
    school: "서강대학교 AI·SW 대학원",
    major: "데이터사이언스·인공지능",
    period: "2023.03 – 2026.02 졸업",
    location: "서울",
    details: [
      "성적 우수 장학금 1회 (2023년 가을)",
      "논문: 줄거리 임베딩 결합을 통한 기반 영화 추천 시스템의 성능 향상 연구",
      "주요 이수 과목: 머신러닝 I/II, 영상인식 시스템, 추천시스템, 강화학습의 기초, 생성형 인공지능",
    ],
  },
  {
    school: "세종대학교",
    major: "물리학, 이학사",
    period: "",
    location: "",
    details: [],
  },
];

export const certifications = [
  "AICE (AI Certificate for Everyone), Basic – 2022.11",
  "ADsP (Advanced Data Analytics Semi-Professional) – 2022.06",
  "Coursera: AI Agent in LangGraph, Generative AI with Large Language Models, Machine Learning Specialization 외 다수",
];
