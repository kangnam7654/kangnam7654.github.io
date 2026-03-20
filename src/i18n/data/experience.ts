import type { Locale } from "../utils";

export interface Experience {
  company: string;
  team: string;
  role: string;
  period: string;
  location: string;
  project: string;
  highlights: string[];
}

const experienceData: Record<Locale, Experience[]> = {
  ko: [
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
  ],
  en: [
    {
      company: "Wemade Next",
      team: "MIR5 Programming Office, Server Team",
      role: "AI Engineer",
      period: "2026.02 ~ Present",
      location: "Pangyo",
      project: "MIR5",
      highlights: [
        "[Unreal MCP] Built an MCP server enabling natural language CRUD operations on objects in Unreal Engine, designing a scalable architecture with async processing, N:M connection structure, and dynamic tool registration",
        "[MCP Client] Developed a lightweight client supporting chat and MCP integration using subscription-based models (Codex, GitHub Copilot, etc.) without API keys",
      ],
    },
    {
      company: "Creverse (Chungdahm Learning)",
      team: "Nesto CV Division, AI Biz Team",
      role: "AI Engineer",
      period: "2024.04 ~ 2025.06",
      location: "Seoul",
      project: "AI Auto-Assessment System",
      highlights: [
        "[MLOps] Designed and deployed a real-time inference pipeline using Azure ML Endpoint and Blob Storage, operating an auto-assessment service used by ~30K students monthly",
        "[LLM Agent] Implemented a synthetic student data generation pipeline using LangGraph-based multi-agent architecture",
        "[Audio] Fine-tuned NVIDIA Parakeet STT on non-native children's speech data, reducing WER from 9.6% to 4.4%",
        "[Vision] Developed a presentation attitude recognition model using Google MediaPipe face/pose tracking, achieving 98.32% accuracy and 98.77% F1",
        "[Vision] Built a Diffusion model-based image generation pipeline with quantization for model lightweighting",
        "[Search] Implemented a hybrid search system combining keyword BM25 + vector search, verified ~20% reduction in LLM API calls",
      ],
    },
    {
      company: "Metaverse World (Netmarble F&C)",
      team: "Dev Division 1, MetaWorld Dev Part",
      role: "AI Research Engineer",
      period: "2022.10 ~ 2024.01",
      location: "Seoul",
      project: "Grand Cross: MetaWorld",
      highlights: [
        "[Vision] Designed and implemented a Face-to-Character prototype for generating game avatars from user face images by analyzing and referencing research papers (PoC)",
        "[Vision] Developed motion tracking by applying MediaPipe-based Pose Estimation to reflect user's real-time movements on 3D characters",
      ],
    },
    {
      company: "Coconut Silo",
      team: "CTO Office",
      role: "AI Research Engineer",
      period: "2021.06 ~ 2022.04",
      location: "Seoul",
      project: "",
      highlights: [
        "[Recommender System] Embedded product descriptions using BERT and implemented a content-based filtering (CBF) recommendation system using inner product similarity",
        "[Vision] Fine-tuned YOLOv5 for ship and obstacle detection in maritime radar imagery",
        "[Anomaly Detection] Designed and implemented a vision-based anomaly detection system for real-time analysis of metal 3D printer process footage",
      ],
    },
    {
      company: "Gaion Co., Ltd.",
      team: "Service Business Division",
      role: "Data Scientist",
      period: "2020.08 ~ 2021.05",
      location: "Seoul",
      project: "",
      highlights: [
        "[Data] Data collection and processing for government-funded project (Data Voucher) analytics",
        "[Planning] Planning and data collection/processing/analysis for an SME matching platform using trade data",
      ],
    },
  ],
  ja: [
    {
      company: "Wemade Next",
      team: "MIR5プログラム室、サーバーチーム",
      role: "AIエンジニア",
      period: "2026.02 ~ 現在",
      location: "板橋",
      project: "MIR5",
      highlights: [
        "[Unreal MCP] Unreal Engineで自然言語によるオブジェクトのCRUDが可能なMCPサーバーを実装し、非同期処理設計とN:M接続構造、ツール動的登録などスケーラブルなアーキテクチャを設計",
        "[MCP Client] APIキー不要でサブスクリプションベースのモデル（Codex、GitHub Copilotなど）を活用したチャット・MCP連携が可能な軽量クライアントを開発",
      ],
    },
    {
      company: "クレバース（チョンダムラーニング）",
      team: "Nesto CV本部、AI Bizチーム",
      role: "AIエンジニア",
      period: "2024.04 ~ 2025.06",
      location: "ソウル",
      project: "AI自動評価システム",
      highlights: [
        "[MLOps] Azure ML EndpointとBlob Storageを活用してリアルタイム推論パイプラインを設計・デプロイし、月間約3万人の学生のプレゼンテーション評価に使用される自動評価サービスを運営",
        "[LLM Agent] LangGraphベースのマルチエージェント構造で合成学生データを生成するパイプラインを実装",
        "[Audio] 非ネイティブの子供の音声データでNVIDIA Parakeet STTをファインチューニングし、WERを9.6%から4.4%に削減",
        "[Vision] Google MediaPipeベースの顔・姿勢トラッキングを適用してプレゼンテーション態度を認識するモデルを開発、精度98.32%、F1 98.77%",
        "[Vision] Diffusionモデルベースの画像生成パイプラインを構築し、量子化でモデルを軽量化",
        "[Search] キーワードBM25+ベクトル検索を組み合わせたハイブリッド検索システムを実装し、LLM呼び出し回数を約20%削減を検証",
      ],
    },
    {
      company: "メタバースワールド（ネットマーブルF&C）",
      team: "開発1室、メタワールド開発パート",
      role: "AI研究エンジニア",
      period: "2022.10 ~ 2024.01",
      location: "ソウル",
      project: "グランドクロス：メタワールド",
      highlights: [
        "[Vision] ユーザーの顔画像からゲームアバターを生成するFace-to-Characterプロトタイプを研究論文を分析・参照して設計・実装（PoC）",
        "[Vision] MediaPipeベースのPose Estimationを適用し、ユーザーのリアルタイム動作を3Dキャラクターに反映するモーショントラッキング機能を開発",
      ],
    },
    {
      company: "ココナッツサイロ",
      team: "CTO室",
      role: "AI研究エンジニア",
      period: "2021.06 ~ 2022.04",
      location: "ソウル",
      project: "",
      highlights: [
        "[Recommender System] 製品説明文書をBERTで埋め込み、内積類似度ベースのコンテンツベースフィルタリング（CBF）推薦システムを実装",
        "[Vision] 海上レーダー映像内の船舶・障害物検出のためにYOLOv5をファインチューニング",
        "[Anomaly Detection] 金属3Dプリンター工程映像をリアルタイム分析するビジョンベースの異常検知システムを設計・実装",
      ],
    },
    {
      company: "株式会社ガイオン",
      team: "サービス事業部",
      role: "データサイエンティスト",
      period: "2020.08 ~ 2021.05",
      location: "ソウル",
      project: "",
      highlights: [
        "[Data] 政府支援プロジェクト（データバウチャー）のデータ分析のためのデータ収集・加工",
        "[Planning] 貿易データを用いた中小企業マッチングプラットフォームの企画およびデータ収集・加工・分析",
      ],
    },
  ],
};

export function getExperiences(locale: Locale): Experience[] {
  return experienceData[locale];
}
