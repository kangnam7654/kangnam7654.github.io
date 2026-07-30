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
      company: "라이앤캐처스",
      team: "AI 연구팀",
      role: "AI 연구 엔지니어",
      period: "2026.05 ~ 현재",
      location: "서울",
      project: "보안 이상 탐지 시스템",
      highlights: [
        "[Security] 악성 사용자 행동과 PE 파일을 1차 격리하기 위한 딥러닝 이상 탐지 시스템을 학습·검증",
        "[Anomaly Detection] CERT 사용자 행동 데이터에는 LSTM likelihood 기반 점수(NLL), BODMAS PE 파일 데이터에는 VAE reconstruction error와 uncertainty quantification을 적용",
      ],
    },
    {
      company: "위메이드넥스트",
      team: "미르5프로그램실, 서버팀",
      role: "AI 엔지니어",
      period: "2026.02 ~ 2026.05",
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
        "[MLOps] Azure ML Endpoint와 Blob Storage 기반 추론 파이프라인을 설계·배포·운영하여, 월간 약 3만 명 학생의 발표 평가에 활용",
        "[LLM Agent] 해외 평가 탐색을 위해 LangGraph 학생·평가자 에이전트로 학년과 수준에 맞는 합성 영어 작문을 생성·평가",
        "[Audio] 비원어민 어린이 음성 데이터로 NVIDIA Parakeet STT를 파인튜닝하여, WER을 9.6%에서 4.4%로 감소",
        "[Vision] MediaPipe 기반 시선·자세 평가 모델을 개발해 검증 데이터에서 정확도 98.32%, F1 98.77%를 기록하고 CPU 추론에 맞게 구성",
        "[Vision] 개발 단계 GPU 비용 절감을 위해 양자화 이미지 생성 모델을 사용하고, 아동 서비스에 AWS 이미지 안전성 판별과 초기 운영자 검수를 적용",
        "[Search] BM25와 벡터 검색을 결합해 동일 품질 기준의 내부 로그 평가에서 LLM 호출을 최대 약 20% 절감",
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
        "[Vision] 데이터 준비, GAN 구조 구현·학습, 정성 평가를 포함한 Face-to-Character PoC를 개발하고 미분 가능한 대리 모델로 캐릭터 파라미터를 최적화",
        "[Vision] GAN·VAE·오토인코더 결과를 정성 비교했으며, 게임 엔진 연동은 완료하지 못함",
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
      company: "Rye&Catchers",
      team: "AI Research Team",
      role: "AI Research Engineer",
      period: "May 2026 - Present",
      location: "Seoul",
      project: "Security Anomaly Detection Systems",
      highlights: [
        "[Security] Train and validate deep-learning anomaly-detection systems for first-stage quarantine of malicious behavior and PE files",
        "[Anomaly Detection] Apply LSTM likelihood-based scoring (NLL) to CERT user-behavior data and VAE reconstruction error with uncertainty quantification to BODMAS PE-file data",
      ],
    },
    {
      company: "Wemade Next",
      team: "MIR5 Programming Office, Server Team",
      role: "AI Engineer",
      period: "Feb 2026 - May 2026",
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
        "[MLOps] Designed, deployed, and operated an Azure ML Endpoint and Blob Storage inference pipeline used for presentation assessment by approximately 30K students monthly",
        "[LLM Agent] Built LangGraph student-and-evaluator agents to generate and review grade- and proficiency-conditioned synthetic English writing for international assessment exploration",
        "[Audio] Fine-tuned NVIDIA Parakeet STT on non-native children's speech data, reducing WER from 9.6% to 4.4%",
        "[Vision] Built MediaPipe-based gaze and posture assessment with 98.32% validation accuracy and 98.77% F1, configured for practical CPU inference",
        "[Vision] Used a quantized image-generation model during development to reduce GPU cost; added AWS image-safety detection and initial human review for a children's service",
        "[Search] Combined BM25 and vector retrieval; internal log-based evaluation showed up to ~20% fewer LLM calls at the same quality threshold",
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
        "[Vision] Prepared data, implemented and trained a GAN, and qualitatively evaluated a Face-to-Character PoC using a differentiable proxy to optimize character parameters",
        "[Vision] Qualitatively compared GAN, VAE, and autoencoder outputs; game-engine integration was not completed",
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
      company: "ライアンドキャッチャーズ",
      team: "AIリサーチチーム",
      role: "AIリサーチエンジニア",
      period: "2026.05 ~ 現在",
      location: "ソウル",
      project: "セキュリティ異常検知システム",
      highlights: [
        "[Security] 悪意ある行動とPEファイルの一次隔離のためのディープラーニング異常検知システムを学習・検証",
        "[Anomaly Detection] CERTユーザー行動データにはLSTMのlikelihoodベースのスコア（NLL）、BODMAS PEファイルデータにはVAEのreconstruction errorとuncertainty quantificationを適用",
      ],
    },
    {
      company: "Wemade Next",
      team: "MIR5プログラム室、サーバーチーム",
      role: "AIエンジニア",
      period: "2026.02 ~ 2026.05",
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
        "[MLOps] Azure ML EndpointとBlob Storageベースの推論パイプラインを設計・デプロイ・運用し、月間約3万人の学生のプレゼンテーション評価に活用",
        "[LLM Agent] 海外向け評価の検討において、LangGraphの学生・評価者エージェントで学年と習熟度に応じた合成英作文を生成・評価",
        "[Audio] 非ネイティブの子供の音声データでNVIDIA Parakeet STTをファインチューニングし、WERを9.6%から4.4%に削減",
        "[Vision] MediaPipeベースの視線・姿勢評価モデルを開発し、検証データで精度98.32%、F1 98.77%を記録。CPU推論に対応",
        "[Vision] 開発時のGPUコスト削減に量子化画像生成モデルを使用し、児童向けサービスにAWS画像安全性判定と初期の人手確認を導入",
        "[Search] BM25とベクトル検索を組み合わせ、同一品質基準の内部ログ評価でLLM呼び出しを最大約20%削減",
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
        "[Vision] データ準備、GANの実装・学習、定性評価を含むFace-to-Character PoCを開発し、微分可能な代理モデルでキャラクターパラメータを最適化",
        "[Vision] GAN・VAE・オートエンコーダの出力を定性的に比較。ゲームエンジン連携は未完了",
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
