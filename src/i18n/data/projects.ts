import type { Locale } from "../utils";

export interface ProjectData {
  title: string;
  company: string;
  period: string;
  role: string;
  tags: string[];
  github?: string;
  sideProject?: boolean;
  claudeCode?: boolean;
  contentHtml: string;
}

export const projectSlugs = [
  "ai-assessment",
  "security-anomaly-detection",
  "ue5-mcp",
  "face-to-character",
  "motion-tracking",
  "recommender",
  "radar-detection",
  "anomaly-detection",
  "matching-platform",
  "kangnam-client",
  "auto-shorts",
  "what-health",
  "dalgyeol",
  "game-npc",
  "story-writer",
] as const;

const projectsData: Record<string, Record<Locale, ProjectData>> = {
  "ue5-mcp": {
    ko: {
      title: "Unreal Engine MCP 플러그인",
      company: "위메이드 넥스트",
      period: "2026.02 ~ 2026.05",
      role: "AI 엔지니어",
      tags: ["MCP", "Unreal Engine", "AI Integration", "C++"],
      github: "https://github.com/kangnam7654/kangnam-unreal-mcp",
      contentHtml: `<h2>개요</h2>
<p>언리얼 엔진에서 자연어로 오브젝트를 CRUD할 수 있는 플러그인 형태의 MCP(Model Context Protocol)를 구현했습니다. 비동기 처리, N:M 연결, 동적 툴 등록을 설계해 AI와 게임 엔진의 연동 인터페이스를 구축했습니다.</p>
<h2>데모</h2>
<div class="demo-item"><span class="demo-label">액터 스폰</span><img src="/images/projects/ue5-mcp-spawn.gif" alt="MCP로 액터 스폰" loading="lazy" /></div>
<div class="demo-item"><span class="demo-label">머티리얼 제어</span><img src="/images/projects/ue5-mcp-sphere.gif" alt="메탈릭 구체 생성 및 머티리얼 제어" loading="lazy" /></div>
<div class="demo-item"><span class="demo-label">블루프린트 스크립팅</span><img src="/images/projects/ue5-mcp-blueprint.gif" alt="블루프린트 비주얼 스크립팅" loading="lazy" /></div>
<div class="demo-item"><span class="demo-label">피직스 제어</span><img src="/images/projects/ue5-mcp-physics.gif" alt="피직스 속성 제어" loading="lazy" /></div>
<h2>기술적 도전</h2>
<ul><li>언리얼 엔진 플러그인 아키텍처에 맞는 MCP 서버 구현</li><li>게임 엔진의 실시간 컨텍스트를 AI에 전달하는 프로토콜 설계</li><li>C++과 블루프린트 양쪽에서 활용 가능한 인터페이스 설계</li></ul>
<h2>기술 스택</h2>
<ul><li><strong>Engine</strong>: Unreal Engine 5</li><li><strong>Language</strong>: C++, Python</li><li><strong>Protocol</strong>: MCP (Model Context Protocol)</li></ul>`,
    },
    en: {
      title: "Unreal Engine MCP Plugin",
      company: "Wemade Next",
      period: "Feb 2026 - May 2026",
      role: "AI Engineer",
      tags: ["MCP", "Unreal Engine", "AI Integration", "C++"],
      github: "https://github.com/kangnam7654/kangnam-unreal-mcp",
      contentHtml: `<h2>Overview</h2>
<p>Built a plugin-based MCP (Model Context Protocol) for natural-language CRUD operations on Unreal Engine objects. Designed asynchronous processing, many-to-many connectivity, and dynamic tool registration for an interface between AI and the game engine.</p>
<h2>Demo</h2>
<div class="demo-item"><span class="demo-label">Actor Spawning</span><img src="/images/projects/ue5-mcp-spawn.gif" alt="Spawning actors via MCP" loading="lazy" /></div>
<div class="demo-item"><span class="demo-label">Material Control</span><img src="/images/projects/ue5-mcp-sphere.gif" alt="Creating metallic sphere and controlling materials" loading="lazy" /></div>
<div class="demo-item"><span class="demo-label">Blueprint Scripting</span><img src="/images/projects/ue5-mcp-blueprint.gif" alt="Blueprint visual scripting" loading="lazy" /></div>
<div class="demo-item"><span class="demo-label">Physics Control</span><img src="/images/projects/ue5-mcp-physics.gif" alt="Physics property control" loading="lazy" /></div>
<h2>Technical Challenges</h2>
<ul><li>Implementing an MCP server that fits Unreal Engine's plugin architecture</li><li>Designing a protocol to deliver real-time game engine context to AI</li><li>Designing an interface usable from both C++ and Blueprints</li></ul>
<h2>Tech Stack</h2>
<ul><li><strong>Engine</strong>: Unreal Engine 5</li><li><strong>Language</strong>: C++, Python</li><li><strong>Protocol</strong>: MCP (Model Context Protocol)</li></ul>`,
    },
    ja: {
      title: "Unreal Engine MCPプラグイン",
      company: "Wemade Next",
      period: "2026.02 ~ 2026.05",
      role: "AIエンジニア",
      tags: ["MCP", "Unreal Engine", "AI Integration", "C++"],
      github: "https://github.com/kangnam7654/kangnam-unreal-mcp",
      contentHtml: `<h2>概要</h2>
<p>Unreal Engineのオブジェクトを自然言語でCRUD操作できるプラグイン形式のMCP（Model Context Protocol）を実装しました。非同期処理、N:M接続、ツールの動的登録を設計し、AIとゲームエンジンの連携インターフェースを構築しました。</p>
<h2>デモ</h2>
<div class="demo-item"><span class="demo-label">アクタースポーン</span><img src="/images/projects/ue5-mcp-spawn.gif" alt="MCPによるアクタースポーン" loading="lazy" /></div>
<div class="demo-item"><span class="demo-label">マテリアル制御</span><img src="/images/projects/ue5-mcp-sphere.gif" alt="メタリック球体の生成とマテリアル制御" loading="lazy" /></div>
<div class="demo-item"><span class="demo-label">ブループリントスクリプティング</span><img src="/images/projects/ue5-mcp-blueprint.gif" alt="ブループリントビジュアルスクリプティング" loading="lazy" /></div>
<div class="demo-item"><span class="demo-label">フィジックス制御</span><img src="/images/projects/ue5-mcp-physics.gif" alt="フィジックスプロパティ制御" loading="lazy" /></div>
<h2>技術的チャレンジ</h2>
<ul><li>Unreal Engineプラグインアーキテクチャに適合するMCPサーバーの実装</li><li>ゲームエンジンのリアルタイムコンテキストをAIに伝達するプロトコル設計</li><li>C++とブループリント両方から利用可能なインターフェース設計</li></ul>
<h2>技術スタック</h2>
<ul><li><strong>Engine</strong>: Unreal Engine 5</li><li><strong>Language</strong>: C++, Python</li><li><strong>Protocol</strong>: MCP (Model Context Protocol)</li></ul>`,
    },
  },

  "ai-assessment": {
    ko: {
      title: "AI 자동평가 시스템",
      company: "크레버스 (청담러닝)",
      period: "2024.04 ~ 2025.06",
      role: "AI 엔지니어",
      tags: ["MLOps", "LLM Agent", "Vision", "Audio", "Search"],
      github: "https://github.com/kangnam7654/Multi-Agent-English-Assessment-System",
      contentHtml: `<h2>개요</h2>
<p>학생의 영어 발표를 AI로 자동 평가하는 시스템을 개발했습니다. Azure ML 기반 추론 시스템을 설계·배포·운영했으며, 월간 약 3만 명 학생의 발표 평가에 활용되었습니다.</p>
<h2>아키텍처</h2>
<img src="/images/projects/ai-assessment-architecture.png" alt="AI 자동평가 에이전트 워크플로우" loading="lazy" />
<img src="/images/projects/ai-assessment-sequence.png" alt="Multi-Agent 시퀀스 다이어그램" loading="lazy" />
<h2>발표태도 평가 데모</h2>
<p>MediaPipe 랜드마크를 입력으로 사용해 발표자의 시선, 자세, 움직임을 분석하고 발표 태도를 평가합니다.</p>
<div class="demo-grid"><div class="demo-item"><span class="demo-label">시선 방향 추적</span><img src="/images/projects/ai-assessment-head.png" alt="Head Position 추적" loading="lazy" /></div><div class="demo-item"><span class="demo-label">손 제스처 인식</span><img src="/images/projects/ai-assessment-hand1.png" alt="Hand Gesture 인식 - 양손" loading="lazy" /></div></div>
<h2>주요 성과</h2>
<ul><li><strong>[MLOps]</strong> Azure ML Endpoint와 Blob Storage 기반 추론 파이프라인을 설계·배포·운영하여 월간 약 3만 명 학생의 발표 평가에 활용</li><li><strong>[LLM Agent]</strong> 해외 평가 탐색을 위해 학생·평가자 에이전트로 학년과 수준에 맞는 합성 영어 작문을 생성·평가</li><li><strong>[Audio]</strong> NVIDIA Parakeet STT를 파인튜닝해 비원어민 어린이 음성의 WER을 9.6%에서 4.4%로 감소</li><li><strong>[Vision]</strong> MediaPipe 기반 시선·자세 평가 모델이 검증 데이터에서 정확도 98.32%, F1 98.77%를 기록하고 CPU 추론에 맞게 구성</li><li><strong>[Vision]</strong> 개발 단계 GPU 비용 절감을 위해 양자화 이미지 생성 모델을 사용하고, 아동 서비스에 AWS 이미지 안전성 판별과 초기 운영자 검수를 적용</li><li><strong>[Search]</strong> BM25와 벡터 검색을 결합해 동일 품질 기준의 내부 로그 평가에서 LLM 호출을 최대 약 20% 절감</li></ul>
<h2>기술 스택</h2>
<ul><li><strong>Cloud</strong>: Azure ML, Blob Storage, AWS Image Moderation</li><li><strong>Frameworks</strong>: PyTorch, HuggingFace, LangGraph</li><li><strong>Models</strong>: Quantized Diffusion, NVIDIA Parakeet, MediaPipe</li><li><strong>Serving</strong>: FastAPI, ONNX</li><li><strong>Search</strong>: Hybrid Search (BM25 + Vector)</li></ul>`,
    },
    en: {
      title: "AI Auto-Assessment System",
      company: "Creverse (Chungdahm Learning)",
      period: "2024.04 ~ 2025.06",
      role: "AI Engineer",
      tags: ["MLOps", "LLM Agent", "Vision", "Audio", "Search"],
      github: "https://github.com/kangnam7654/Multi-Agent-English-Assessment-System",
      contentHtml: `<h2>Overview</h2>
<p>Developed an AI system for assessing students' English presentations. Designed, deployed, and operated an Azure ML inference system used for presentation assessment by approximately 30,000 students monthly.</p>
<h2>Architecture</h2>
<img src="/images/projects/ai-assessment-architecture.png" alt="AI Auto-Assessment Agent Workflow" loading="lazy" />
<img src="/images/projects/ai-assessment-sequence.png" alt="Multi-Agent Sequence Diagram" loading="lazy" />
<h2>Presentation Attitude Assessment Demo</h2>
<p>Uses MediaPipe landmarks to analyze gaze, posture, and movement for presentation-attitude assessment.</p>
<div class="demo-grid"><div class="demo-item"><span class="demo-label">Gaze Direction Tracking</span><img src="/images/projects/ai-assessment-head.png" alt="Head Position Tracking" loading="lazy" /></div><div class="demo-item"><span class="demo-label">Hand Gesture Recognition</span><img src="/images/projects/ai-assessment-hand1.png" alt="Hand Gesture Recognition - Both Hands" loading="lazy" /></div></div>
<h2>Key Achievements</h2>
<ul><li><strong>[MLOps]</strong> Designed, deployed, and operated an Azure ML Endpoint and Blob Storage inference pipeline used for presentation assessment by approximately 30K students monthly</li><li><strong>[LLM Agent]</strong> Built student-and-evaluator agents to generate and review grade- and proficiency-conditioned synthetic English writing for international assessment exploration</li><li><strong>[Audio]</strong> Fine-tuned NVIDIA Parakeet STT on non-native children's speech, reducing WER from 9.6% to 4.4%</li><li><strong>[Vision]</strong> Built MediaPipe-based gaze and posture assessment with 98.32% validation accuracy and 98.77% F1, configured for practical CPU inference</li><li><strong>[Vision]</strong> Used a quantized image-generation model during development to reduce GPU cost; added AWS image-safety detection and initial human review for a children's service</li><li><strong>[Search]</strong> Combined BM25 and vector retrieval; internal log-based evaluation showed up to ~20% fewer LLM calls at the same quality threshold</li></ul>
<h2>Tech Stack</h2>
<ul><li><strong>Cloud</strong>: Azure ML, Blob Storage, AWS Image Moderation</li><li><strong>Frameworks</strong>: PyTorch, HuggingFace, LangGraph</li><li><strong>Models</strong>: Quantized Diffusion, NVIDIA Parakeet, MediaPipe</li><li><strong>Serving</strong>: FastAPI, ONNX</li><li><strong>Search</strong>: Hybrid Search (BM25 + Vector)</li></ul>`,
    },
    ja: {
      title: "AI自動評価システム",
      company: "Creverse（チョンダムラーニング）",
      period: "2024.04 ~ 2025.06",
      role: "AIエンジニア",
      tags: ["MLOps", "LLM Agent", "Vision", "Audio", "Search"],
      github: "https://github.com/kangnam7654/Multi-Agent-English-Assessment-System",
      contentHtml: `<h2>概要</h2>
<p>学生の英語プレゼンテーションをAIで評価するシステムを開発しました。Azure MLベースの推論システムを設計・デプロイ・運用し、月間約3万人の学生のプレゼンテーション評価に活用されました。</p>
<h2>アーキテクチャ</h2>
<img src="/images/projects/ai-assessment-architecture.png" alt="AI自動評価エージェントワークフロー" loading="lazy" />
<img src="/images/projects/ai-assessment-sequence.png" alt="マルチエージェントシーケンス図" loading="lazy" />
<h2>プレゼン態度評価デモ</h2>
<p>MediaPipeのランドマークを入力として、発表者の視線・姿勢・動きを分析し、プレゼンテーション態度を評価します。</p>
<div class="demo-grid"><div class="demo-item"><span class="demo-label">視線方向追跡</span><img src="/images/projects/ai-assessment-head.png" alt="頭部位置追跡" loading="lazy" /></div><div class="demo-item"><span class="demo-label">ハンドジェスチャー認識</span><img src="/images/projects/ai-assessment-hand1.png" alt="ハンドジェスチャー認識 - 両手" loading="lazy" /></div></div>
<h2>主要成果</h2>
<ul><li><strong>[MLOps]</strong> Azure ML EndpointとBlob Storageベースの推論パイプラインを設計・デプロイ・運用し、月間約3万人の学生の評価に活用</li><li><strong>[LLM Agent]</strong> 海外向け評価の検討において、学生・評価者エージェントで学年と習熟度に応じた合成英作文を生成・評価</li><li><strong>[Audio]</strong> 非ネイティブ児童の音声でNVIDIA Parakeet STTをファインチューニングし、WERを9.6%から4.4%に削減</li><li><strong>[Vision]</strong> MediaPipeベースの視線・姿勢評価モデルが検証データで精度98.32%、F1 98.77%を記録し、CPU推論に対応</li><li><strong>[Vision]</strong> 開発時のGPUコスト削減に量子化画像生成モデルを使用し、児童向けサービスにAWS画像安全性判定と初期の人手確認を導入</li><li><strong>[Search]</strong> BM25とベクトル検索を組み合わせ、同一品質基準の内部ログ評価でLLM呼び出しを最大約20%削減</li></ul>
<h2>技術スタック</h2>
<ul><li><strong>Cloud</strong>: Azure ML, Blob Storage, AWS Image Moderation</li><li><strong>Frameworks</strong>: PyTorch, HuggingFace, LangGraph</li><li><strong>Models</strong>: Quantized Diffusion, NVIDIA Parakeet, MediaPipe</li><li><strong>Serving</strong>: FastAPI, ONNX</li><li><strong>Search</strong>: Hybrid Search (BM25 + Vector)</li></ul>`,
    },
  },

  "security-anomaly-detection": {
    ko: {
      title: "보안 이상 탐지 시스템",
      company: "라이앤캐처스",
      period: "2026.05 ~ 현재",
      role: "AI 연구 엔지니어",
      tags: ["Security", "Anomaly Detection", "LSTM", "VAE"],
      contentHtml: `<h2>개요</h2>
<p>악성 사용자 행동과 PE 파일을 우선 격리하기 위한 딥러닝 이상 탐지 시스템을 개발하고 있습니다. 현재 학습과 검증 단계이며, 실제 운영 데이터가 제한적인 상황을 고려해 정상 데이터 중심의 탐지 방식을 적용했습니다.</p>
<h2>접근 방식</h2>
<ul><li><strong>CERT 사용자 행동 데이터</strong>: LSTM의 likelihood 기반 점수(NLL)로 행동 패턴의 이상도를 측정</li><li><strong>BODMAS PE 파일 데이터</strong>: VAE reconstruction error와 uncertainty quantification을 결합해 이상도를 측정</li><li><strong>평가 구성</strong>: 학습·검증은 정상 데이터만 사용하고, 테스트는 정상·악성 데이터를 함께 사용해 AUC와 운영점 후보를 검토</li></ul>
<h2>운영 관점</h2>
<p>이 모델은 최종 판정보다 1차 격리를 위한 모델입니다. 정상 데이터를 과도하게 탐지하면 사람이 검토해야 할 대상이 급증하므로 FPR과 운영 비용의 trade-off를 우선 고려했습니다. 이후 정밀 탐지 단계와 각 조직의 위험 허용도에 맞춰 threshold를 조정할 수 있도록 설계하고 있습니다.</p>
<h2>기술 스택</h2>
<ul><li><strong>Models</strong>: LSTM, VAE</li><li><strong>Methods</strong>: Likelihood, Reconstruction Error, Uncertainty Quantification, ROC-AUC</li><li><strong>Data</strong>: CERT insider-threat behavior data, BODMAS PE-file data</li></ul>`,
    },
    en: {
      title: "Security Anomaly Detection Systems",
      company: "Rye&Catchers",
      period: "May 2026 - Present",
      role: "AI Research Engineer",
      tags: ["Security", "Anomaly Detection", "LSTM", "VAE"],
      contentHtml: `<h2>Overview</h2>
<p>Developing deep-learning anomaly-detection systems to triage malicious user behavior and PE files. The work is currently in training and validation, using normal-data-centered approaches because representative operational attack data is limited.</p>
<h2>Approach</h2>
<ul><li><strong>CERT user-behavior data</strong>: measure behavioral anomaly with an LSTM likelihood-based score (NLL)</li><li><strong>BODMAS PE-file data</strong>: combine VAE reconstruction error with uncertainty quantification</li><li><strong>Evaluation setup</strong>: train and validate on benign-only data, then inspect AUC and candidate operating points on a benign-plus-malicious test set</li></ul>
<h2>Operational Framing</h2>
<p>The model is intended for first-stage quarantine rather than final adjudication. False positives can sharply increase human review load, so threshold selection considers the trade-off between FPR and operating cost. The threshold can then be calibrated to a downstream precision model and each organization&apos;s risk tolerance.</p>
<h2>Tech Stack</h2>
<ul><li><strong>Models</strong>: LSTM, VAE</li><li><strong>Methods</strong>: Likelihood, Reconstruction Error, Uncertainty Quantification, ROC-AUC</li><li><strong>Data</strong>: CERT insider-threat behavior data, BODMAS PE-file data</li></ul>`,
    },
    ja: {
      title: "セキュリティ異常検知システム",
      company: "ライアンドキャッチャーズ",
      period: "2026.05 ~ 現在",
      role: "AIリサーチエンジニア",
      tags: ["Security", "Anomaly Detection", "LSTM", "VAE"],
      contentHtml: `<h2>概要</h2>
<p>悪意あるユーザー行動とPEファイルを優先的に隔離するためのディープラーニング異常検知システムを開発しています。現在は学習・検証段階であり、実運用の攻撃データが限られることを考慮して正常データ中心の検知方式を採用しています。</p>
<h2>アプローチ</h2>
<ul><li><strong>CERTユーザー行動データ</strong>: LSTMのlikelihoodベースのスコア（NLL）で行動パターンの異常度を測定</li><li><strong>BODMAS PEファイルデータ</strong>: VAEのreconstruction errorとuncertainty quantificationを組み合わせて異常度を測定</li><li><strong>評価構成</strong>: 学習・検証は正常データのみを使用し、テストでは正常・悪意あるデータを併用してAUCと運用点候補を検討</li></ul>
<h2>運用上の考え方</h2>
<p>このモデルは最終判定ではなく、一次隔離のためのモデルです。正常データを過度に検知すると人手レビューが急増するため、FPRと運用コストのtrade-offを優先して考慮しています。後段の精密モデルと各組織のリスク許容度に合わせてthresholdを調整できるように設計しています。</p>
<h2>技術スタック</h2>
<ul><li><strong>Models</strong>: LSTM, VAE</li><li><strong>Methods</strong>: Likelihood, Reconstruction Error, Uncertainty Quantification, ROC-AUC</li><li><strong>Data</strong>: CERT insider-threat behavior data, BODMAS PE-file data</li></ul>`,
    },
  },

  "face-to-character": {
    ko: {
      title: "Face-to-Character 아바타 생성",
      company: "메타버스월드 (넷마블 F&C)",
      period: "2022.10 ~ 2024.01",
      role: "AI 연구 엔지니어",
      tags: ["Vision", "Deep Learning", "3D Avatar"],
      github: "https://github.com/kangnam7654/face_to_parameter",
      contentHtml: `<h2>개요</h2>
<p>사용자의 얼굴 이미지에서 캐릭터 파라미터를 추정하는 Face-to-Character PoC를 구현했습니다. 원 논문의 미분 불가능한 게임 렌더링 단계를 직접 연결하는 대신, GAN을 미분 가능한 proxy로 사용해 파라미터 최적화를 실험했습니다.</p>
<h2>변환 예시</h2>
<div class="demo-grid" style="grid-template-columns: 1fr 1fr 1fr;"><div class="demo-item"><span class="demo-label">원본</span><img src="/images/projects/ftc-original.png" alt="원본 얼굴 이미지" loading="lazy" /></div><div class="demo-item"><span class="demo-label">게임 캐릭터</span><img src="/images/projects/ftc-game.png" alt="게임 캐릭터 변환 결과" loading="lazy" /></div><div class="demo-item"><span class="demo-label">애니메이션</span><img src="/images/projects/ftc-anime.png" alt="애니메이션 스타일 변환 결과" loading="lazy" /></div></div>
<h2>주요 성과</h2>
<ul><li>데이터 준비, GAN 구조 구현·학습, 정성적 결과 평가 수행</li><li>GAN, VAE, autoencoder 접근을 비교해 당시 GAN의 시각 품질을 선택</li><li>게임 엔진 연동은 완료하지 않았으며, 결과는 PoC 범위로 한정</li></ul>
<h2>기술 스택</h2>
<ul><li><strong>Framework</strong>: PyTorch</li><li><strong>Vision</strong>: Face Detection, Landmark Extraction</li><li><strong>Engine</strong>: Unreal Engine</li></ul>`,
    },
    en: {
      title: "Face-to-Character Avatar Generation",
      company: "Metaverse World (Netmarble F&C)",
      period: "2022.10 ~ 2024.01",
      role: "AI Research Engineer",
      tags: ["Vision", "Deep Learning", "3D Avatar"],
      github: "https://github.com/kangnam7654/face_to_parameter",
      contentHtml: `<h2>Overview</h2>
<p>Implemented a Face-to-Character PoC that estimates character parameters from facial images. Rather than connecting the paper&apos;s non-differentiable game renderer directly, I used a GAN as a differentiable proxy to experiment with parameter optimization.</p>
<h2>Conversion Examples</h2>
<div class="demo-grid" style="grid-template-columns: 1fr 1fr 1fr;"><div class="demo-item"><span class="demo-label">Original</span><img src="/images/projects/ftc-original.png" alt="Original face image" loading="lazy" /></div><div class="demo-item"><span class="demo-label">Game Character</span><img src="/images/projects/ftc-game.png" alt="Game character conversion result" loading="lazy" /></div><div class="demo-item"><span class="demo-label">Animation</span><img src="/images/projects/ftc-anime.png" alt="Animation style conversion result" loading="lazy" /></div></div>
<h2>Key Achievements</h2>
<ul><li>Prepared data, implemented and trained the GAN architecture, and performed qualitative result evaluation</li><li>Compared GAN, VAE, and autoencoder approaches; selected GAN for the strongest visual quality at the time</li><li>Game-engine integration was not completed; the work remains a PoC</li></ul>
<h2>Tech Stack</h2>
<ul><li><strong>Framework</strong>: PyTorch</li><li><strong>Vision</strong>: Face Detection, Landmark Extraction</li><li><strong>Engine</strong>: Unreal Engine</li></ul>`,
    },
    ja: {
      title: "Face-to-Characterアバター生成",
      company: "メタバースワールド（ネットマーブルF&C）",
      period: "2022.10 ~ 2024.01",
      role: "AIリサーチエンジニア",
      tags: ["Vision", "Deep Learning", "3D Avatar"],
      github: "https://github.com/kangnam7654/face_to_parameter",
      contentHtml: `<h2>概要</h2>
<p>顔画像からキャラクターパラメータを推定するFace-to-Character PoCを実装しました。論文の微分不可能なゲームレンダラーを直接接続する代わりに、GANを微分可能なproxyとして利用し、パラメータ最適化を実験しました。</p>
<h2>変換例</h2>
<div class="demo-grid" style="grid-template-columns: 1fr 1fr 1fr;"><div class="demo-item"><span class="demo-label">オリジナル</span><img src="/images/projects/ftc-original.png" alt="元の顔画像" loading="lazy" /></div><div class="demo-item"><span class="demo-label">ゲームキャラクター</span><img src="/images/projects/ftc-game.png" alt="ゲームキャラクター変換結果" loading="lazy" /></div><div class="demo-item"><span class="demo-label">アニメーション</span><img src="/images/projects/ftc-anime.png" alt="アニメーションスタイル変換結果" loading="lazy" /></div></div>
<h2>主要成果</h2>
<ul><li>データ準備、GAN構造の実装・学習、定性的な結果評価を実施</li><li>GAN、VAE、autoencoderを比較し、当時もっとも高い視覚品質を示したGANを選択</li><li>ゲームエンジンとの連携は未完了であり、成果はPoCの範囲に限定</li></ul>
<h2>技術スタック</h2>
<ul><li><strong>Framework</strong>: PyTorch</li><li><strong>Vision</strong>: Face Detection, Landmark Extraction</li><li><strong>Engine</strong>: Unreal Engine</li></ul>`,
    },
  },

  "motion-tracking": {
    ko: {
      title: "실시간 모션 트래킹",
      company: "메타버스월드 (넷마블 F&C)",
      period: "2022.10 ~ 2024.01",
      role: "AI 연구 엔지니어",
      tags: ["Vision", "Pose Estimation", "Real-time"],
      contentHtml: `<h2>개요</h2>
<p>MediaPipe Pose Estimation 기술을 활용하여 사용자의 실시간 동작을 3D 캐릭터에 반영하는 모션 트래킹 기능을 개발했습니다.</p>
<h2>주요 성과</h2>
<ul><li>MediaPipe 기반 실시간 관절 위치 추적 시스템 구현</li><li>MediaPipe Python Wrapper를 DLL로 변환하여 엔진과 통신</li><li>추출된 포즈 데이터를 3D 캐릭터 리깅에 실시간 매핑</li></ul>
<h2>기술 스택</h2>
<ul><li><strong>Framework</strong>: MediaPipe, OpenCV</li><li><strong>Engine</strong>: Unreal Engine</li></ul>`,
    },
    en: {
      title: "Real-time Motion Tracking",
      company: "Metaverse World (Netmarble F&C)",
      period: "2022.10 ~ 2024.01",
      role: "AI Research Engineer",
      tags: ["Vision", "Pose Estimation", "Real-time"],
      contentHtml: `<h2>Overview</h2>
<p>Developed a motion tracking feature that reflects users' real-time movements onto 3D characters using MediaPipe Pose Estimation technology.</p>
<h2>Key Achievements</h2>
<ul><li>Implemented a real-time joint position tracking system based on MediaPipe</li><li>Converted MediaPipe Python Wrapper to DLL for engine communication</li><li>Real-time mapping of extracted pose data to 3D character rigging</li></ul>
<h2>Tech Stack</h2>
<ul><li><strong>Framework</strong>: MediaPipe, OpenCV</li><li><strong>Engine</strong>: Unreal Engine</li></ul>`,
    },
    ja: {
      title: "リアルタイムモーショントラッキング",
      company: "メタバースワールド（ネットマーブルF&C）",
      period: "2022.10 ~ 2024.01",
      role: "AIリサーチエンジニア",
      tags: ["Vision", "Pose Estimation", "Real-time"],
      contentHtml: `<h2>概要</h2>
<p>MediaPipe Pose Estimation技術を活用し、ユーザーのリアルタイム動作を3Dキャラクターに反映するモーショントラッキング機能を開発しました。</p>
<h2>主要成果</h2>
<ul><li>MediaPipeベースのリアルタイム関節位置追跡システム実装</li><li>MediaPipe Python WrapperをDLLに変換してエンジンと通信</li><li>抽出されたポーズデータを3Dキャラクターリギングにリアルタイムマッピング</li></ul>
<h2>技術スタック</h2>
<ul><li><strong>Framework</strong>: MediaPipe, OpenCV</li><li><strong>Engine</strong>: Unreal Engine</li></ul>`,
    },
  },

  "recommender": {
    ko: {
      title: "콘텐츠 기반 추천 시스템",
      company: "코코넛사일로",
      period: "2021.06 ~ 2022.04",
      role: "AI 연구 엔지니어",
      tags: ["NLP", "Recommender", "BERT"],
      contentHtml: `<h2>개요</h2>
<p>제품 설명 문서를 BERT로 임베딩하고, 내적 유사도를 기반으로 유사 제품을 추천하는 콘텐츠 기반 추천 시스템(CBF)을 구현했습니다.</p>
<h2>주요 성과</h2>
<ul><li>BERT 모델을 활용한 제품 설명 문서 임베딩 파이프라인 구축</li><li>내적 유사도 기반 유사 제품 추천 알고리즘 구현</li></ul>
<h2>기술 스택</h2>
<ul><li><strong>Model</strong>: BERT (HuggingFace Transformers)</li><li><strong>Framework</strong>: PyTorch</li></ul>`,
    },
    en: {
      title: "Content-Based Recommendation System",
      company: "Coconut Silo",
      period: "2021.06 ~ 2022.04",
      role: "AI Research Engineer",
      tags: ["NLP", "Recommender", "BERT"],
      contentHtml: `<h2>Overview</h2>
<p>Implemented a content-based filtering (CBF) recommendation system that embeds product description documents using BERT and recommends similar products based on dot-product similarity.</p>
<h2>Key Achievements</h2>
<ul><li>Built a product description document embedding pipeline using BERT models</li><li>Implemented a similar product recommendation algorithm based on dot-product similarity</li></ul>
<h2>Tech Stack</h2>
<ul><li><strong>Model</strong>: BERT (HuggingFace Transformers)</li><li><strong>Framework</strong>: PyTorch</li></ul>`,
    },
    ja: {
      title: "コンテンツベース推薦システム",
      company: "ココナッツサイロ",
      period: "2021.06 ~ 2022.04",
      role: "AIリサーチエンジニア",
      tags: ["NLP", "Recommender", "BERT"],
      contentHtml: `<h2>概要</h2>
<p>製品説明文書をBERTで埋め込み、内積類似度に基づいて類似製品を推薦するコンテンツベース推薦システム（CBF）を実装しました。</p>
<h2>主要成果</h2>
<ul><li>BERTモデルを活用した製品説明文書埋め込みパイプライン構築</li><li>内積類似度ベースの類似製品推薦アルゴリズム実装</li></ul>
<h2>技術スタック</h2>
<ul><li><strong>Model</strong>: BERT (HuggingFace Transformers)</li><li><strong>Framework</strong>: PyTorch</li></ul>`,
    },
  },

  "radar-detection": {
    ko: {
      title: "해상 레이더 객체 탐지",
      company: "코코넛사일로",
      period: "2021.06 ~ 2022.04",
      role: "AI 연구 엔지니어",
      tags: ["Vision", "Object Detection", "YOLOv5"],
      github: "https://github.com/kangnam7654/Vision_Radar_od",
      contentHtml: `<h2>개요</h2>
<p>해상 레이더 영상 내 객체 탐지를 위한 YOLOv5 파인튜닝을 진행했습니다.</p>
<h2>데모</h2>
<div class="demo-grid"><div class="demo-item"><span class="demo-label">원본 레이더 영상</span><img src="/images/projects/radar-original1.png" alt="레이더 시뮬레이터 원본 영상" loading="lazy" /></div><div class="demo-item"><span class="demo-label">원본 ARPA 레이더</span><img src="/images/projects/radar-original2.png" alt="ARPA 레이더 원본 영상" loading="lazy" /></div><div class="demo-item"><span class="demo-label">Hough 원 추출</span><img src="/images/projects/radar-hough.png" alt="Hough 알고리즘 원 추출 결과" loading="lazy" /></div><div class="demo-item"><span class="demo-label">객체 탐지 결과</span><img src="/images/projects/radar-detection.png" alt="YOLOv5 객체 탐지 결과" loading="lazy" /></div></div>
<h2>주요 성과</h2>
<ul><li>Hough 변환으로 레이더 스코프 원형 영역 추출</li><li>YOLOv5 파인튜닝을 통한 해상 레이더 영상 내 객체 탐지</li></ul>
<h2>기술 스택</h2>
<ul><li><strong>Model</strong>: YOLOv5</li><li><strong>Framework</strong>: PyTorch</li><li><strong>Tools</strong>: OpenCV, Albumentations</li></ul>`,
    },
    en: {
      title: "Maritime Radar Object Detection",
      company: "Coconut Silo",
      period: "2021.06 ~ 2022.04",
      role: "AI Research Engineer",
      tags: ["Vision", "Object Detection", "YOLOv5"],
      github: "https://github.com/kangnam7654/Vision_Radar_od",
      contentHtml: `<h2>Overview</h2>
<p>Fine-tuned YOLOv5 for object detection in maritime radar imagery.</p>
<h2>Demo</h2>
<div class="demo-grid"><div class="demo-item"><span class="demo-label">Original Radar Image</span><img src="/images/projects/radar-original1.png" alt="Radar simulator original image" loading="lazy" /></div><div class="demo-item"><span class="demo-label">Original ARPA Radar</span><img src="/images/projects/radar-original2.png" alt="ARPA radar original image" loading="lazy" /></div><div class="demo-item"><span class="demo-label">Hough Circle Extraction</span><img src="/images/projects/radar-hough.png" alt="Hough algorithm circle extraction result" loading="lazy" /></div><div class="demo-item"><span class="demo-label">Detection Result</span><img src="/images/projects/radar-detection.png" alt="YOLOv5 object detection result" loading="lazy" /></div></div>
<h2>Key Achievements</h2>
<ul><li>Extracted radar scope circular regions using Hough Transform</li><li>Object detection in maritime radar imagery through YOLOv5 fine-tuning</li></ul>
<h2>Tech Stack</h2>
<ul><li><strong>Model</strong>: YOLOv5</li><li><strong>Framework</strong>: PyTorch</li><li><strong>Tools</strong>: OpenCV, Albumentations</li></ul>`,
    },
    ja: {
      title: "海上レーダー物体検出",
      company: "ココナッツサイロ",
      period: "2021.06 ~ 2022.04",
      role: "AIリサーチエンジニア",
      tags: ["Vision", "Object Detection", "YOLOv5"],
      github: "https://github.com/kangnam7654/Vision_Radar_od",
      contentHtml: `<h2>概要</h2>
<p>海上レーダー映像内の物体検出のためにYOLOv5のファインチューニングを行いました。</p>
<h2>デモ</h2>
<div class="demo-grid"><div class="demo-item"><span class="demo-label">元のレーダー映像</span><img src="/images/projects/radar-original1.png" alt="レーダーシミュレーター元映像" loading="lazy" /></div><div class="demo-item"><span class="demo-label">元のARPAレーダー</span><img src="/images/projects/radar-original2.png" alt="ARPAレーダー元映像" loading="lazy" /></div><div class="demo-item"><span class="demo-label">Hough円抽出</span><img src="/images/projects/radar-hough.png" alt="Houghアルゴリズム円抽出結果" loading="lazy" /></div><div class="demo-item"><span class="demo-label">物体検出結果</span><img src="/images/projects/radar-detection.png" alt="YOLOv5物体検出結果" loading="lazy" /></div></div>
<h2>主要成果</h2>
<ul><li>Hough変換によるレーダースコープ円形領域の抽出</li><li>YOLOv5ファインチューニングによる海上レーダー映像内の物体検出</li></ul>
<h2>技術スタック</h2>
<ul><li><strong>Model</strong>: YOLOv5</li><li><strong>Framework</strong>: PyTorch</li><li><strong>Tools</strong>: OpenCV, Albumentations</li></ul>`,
    },
  },

  "anomaly-detection": {
    ko: {
      title: "비전 기반 이상 탐지",
      company: "코코넛사일로",
      period: "2021.06 ~ 2022.04",
      role: "AI 연구 엔지니어",
      tags: ["Vision", "Anomaly Detection", "Manufacturing"],
      contentHtml: `<h2>개요</h2>
<p>산업용 금속 3D 프린터 공정 영상을 실시간 분석하여 정상/비정상 패턴을 구분하는 비전 기반 이상 탐지 시스템을 설계·구현했습니다 (PoC).</p>
<h2>데모</h2>
<img src="/images/projects/anomaly-detection.gif" alt="3D 프린터 공정 이상 탐지" loading="lazy" />
<h2>기술 스택</h2>
<ul><li><strong>Framework</strong>: PyTorch</li><li><strong>Vision</strong>: OpenCV</li></ul>`,
    },
    en: {
      title: "Vision-Based Anomaly Detection",
      company: "Coconut Silo",
      period: "2021.06 ~ 2022.04",
      role: "AI Research Engineer",
      tags: ["Vision", "Anomaly Detection", "Manufacturing"],
      contentHtml: `<h2>Overview</h2>
<p>Designed and implemented a vision-based anomaly detection system that analyzes industrial metal 3D printer process footage in real-time to distinguish normal/abnormal patterns (PoC).</p>
<h2>Demo</h2>
<img src="/images/projects/anomaly-detection.gif" alt="3D printer process anomaly detection" loading="lazy" />
<h2>Tech Stack</h2>
<ul><li><strong>Framework</strong>: PyTorch</li><li><strong>Vision</strong>: OpenCV</li></ul>`,
    },
    ja: {
      title: "ビジョンベース異常検知",
      company: "ココナッツサイロ",
      period: "2021.06 ~ 2022.04",
      role: "AIリサーチエンジニア",
      tags: ["Vision", "Anomaly Detection", "Manufacturing"],
      contentHtml: `<h2>概要</h2>
<p>産業用金属3Dプリンター工程映像をリアルタイム分析し、正常/異常パターンを区別するビジョンベース異常検知システムを設計・実装しました（PoC）。</p>
<h2>デモ</h2>
<img src="/images/projects/anomaly-detection.gif" alt="3Dプリンター工程異常検知" loading="lazy" />
<h2>技術スタック</h2>
<ul><li><strong>Framework</strong>: PyTorch</li><li><strong>Vision</strong>: OpenCV</li></ul>`,
    },
  },

  "matching-platform": {
    ko: {
      title: "중소기업 매칭 플랫폼",
      company: "주식회사 가이온",
      period: "2020.08 ~ 2021.05",
      role: "데이터사이언티스트",
      tags: ["Data Analysis", "Planning", "Trade Data"],
      contentHtml: `<h2>개요</h2>
<p>무역 데이터를 수집·가공·분석하여 중소기업 간 매칭을 지원하는 플랫폼을 기획하고, 데이터 파이프라인을 구축했습니다.</p>
<h2>주요 성과</h2>
<ul><li><strong>[데이터 바우처]</strong> 정부 지원 프로젝트 데이터 수집 및 가공</li><li>무역 데이터 수집, 가공 및 분석 파이프라인 구축</li><li>중소기업 매칭 플랫폼 기획 및 데이터 모델 설계</li></ul>
<h2>기술 스택</h2>
<ul><li><strong>Data</strong>: Pandas, NumPy</li><li><strong>Visualization</strong>: Matplotlib, Seaborn</li><li><strong>Planning</strong>: 플랫폼 기획, 데이터 모델링</li></ul>`,
    },
    en: {
      title: "SME Matching Platform",
      company: "Gaion Inc.",
      period: "2020.08 ~ 2021.05",
      role: "Data Scientist",
      tags: ["Data Analysis", "Planning", "Trade Data"],
      contentHtml: `<h2>Overview</h2>
<p>Planned a platform to support matching between small and medium enterprises by collecting, processing, and analyzing trade data, and built the data pipeline.</p>
<h2>Key Achievements</h2>
<ul><li><strong>[Data Voucher]</strong> Government-funded project data collection and processing</li><li>Built a trade data collection, processing, and analysis pipeline</li><li>Planned the SME matching platform and designed the data model</li></ul>
<h2>Tech Stack</h2>
<ul><li><strong>Data</strong>: Pandas, NumPy</li><li><strong>Visualization</strong>: Matplotlib, Seaborn</li><li><strong>Planning</strong>: Platform planning, Data modeling</li></ul>`,
    },
    ja: {
      title: "中小企業マッチングプラットフォーム",
      company: "株式会社ガイオン",
      period: "2020.08 ~ 2021.05",
      role: "データサイエンティスト",
      tags: ["Data Analysis", "Planning", "Trade Data"],
      contentHtml: `<h2>概要</h2>
<p>貿易データを収集・加工・分析し、中小企業間のマッチングを支援するプラットフォームを企画し、データパイプラインを構築しました。</p>
<h2>主要成果</h2>
<ul><li><strong>[データバウチャー]</strong> 政府支援プロジェクトのデータ収集及び加工</li><li>貿易データ収集、加工及び分析パイプライン構築</li><li>中小企業マッチングプラットフォーム企画及びデータモデル設計</li></ul>
<h2>技術スタック</h2>
<ul><li><strong>Data</strong>: Pandas, NumPy</li><li><strong>Visualization</strong>: Matplotlib, Seaborn</li><li><strong>Planning</strong>: プラットフォーム企画、データモデリング</li></ul>`,
    },
  },

  "kangnam-client": {
    ko: {
      title: "MCP 데스크탑 클라이언트",
      company: "개인 프로젝트",
      period: "2026.03 ~",
      role: "풀스택 개발",
      tags: ["Tauri", "Rust", "MCP"],
      github: "https://github.com/kangnam7654/kangnam-client",
      sideProject: true,
      claudeCode: true,
      contentHtml: `<h2>개요</h2>
<p>Unreal Engine MCP 플러그인을 개발하면서, 비개발자들도 MCP를 편하게 사용할 수 있는 도구가 필요하다고 느껴 만든 데스크탑 LLM 채팅 클라이언트입니다.</p>
<h2>기술 스택</h2>
<ul><li><strong>Framework</strong>: Tauri</li><li><strong>Language</strong>: Rust, TypeScript</li><li><strong>Protocol</strong>: MCP (Model Context Protocol)</li></ul>`,
    },
    en: {
      title: "MCP Desktop Client",
      company: "Side Project",
      period: "2026.03 ~",
      role: "Full-stack Developer",
      tags: ["Tauri", "Rust", "MCP"],
      github: "https://github.com/kangnam7654/kangnam-client",
      sideProject: true,
      claudeCode: true,
      contentHtml: `<h2>Overview</h2>
<p>While developing the Unreal Engine MCP plugin, I felt the need for a tool that allows non-developers to easily use MCP, so I built this desktop LLM chat client.</p>
<h2>Tech Stack</h2>
<ul><li><strong>Framework</strong>: Tauri</li><li><strong>Language</strong>: Rust, TypeScript</li><li><strong>Protocol</strong>: MCP (Model Context Protocol)</li></ul>`,
    },
    ja: {
      title: "MCPデスクトップクライアント",
      company: "個人プロジェクト",
      period: "2026.03 ~",
      role: "フルスタック開発",
      tags: ["Tauri", "Rust", "MCP"],
      github: "https://github.com/kangnam7654/kangnam-client",
      sideProject: true,
      claudeCode: true,
      contentHtml: `<h2>概要</h2>
<p>Unreal Engine MCPプラグインを開発する中で、非開発者でもMCPを簡単に使えるツールが必要だと感じて作ったデスクトップLLMチャットクライアントです。</p>
<h2>技術スタック</h2>
<ul><li><strong>Framework</strong>: Tauri</li><li><strong>Language</strong>: Rust, TypeScript</li><li><strong>Protocol</strong>: MCP (Model Context Protocol)</li></ul>`,
    },
  },

  "auto-shorts": {
    ko: {
      title: "AutoShorts — AI 숏폼 자동화",
      company: "개인 프로젝트",
      period: "2026.03 ~",
      role: "풀스택 개발",
      tags: ["Python", "Veo 3.1", "Whisper", "FFmpeg"],
      github: "https://github.com/kangnam7654/AutoShorts",
      sideProject: true,
      claudeCode: true,
      contentHtml: `<h2>개요</h2>
<p>AI 사주 앱 마케팅을 위해 영상 생성부터 YouTube 업로드까지 자동화하는 숏폼 제작 CLI입니다. Veo 3.1으로 영상을 생성하고, Whisper로 자막을 추출한 뒤 LLM 보정, 얼굴 인식 크롭, BGM 믹싱을 거쳐 업로드합니다.</p>
<h2>기술 스택</h2>
<ul><li><strong>영상 생성</strong>: Google Veo 3.1</li><li><strong>음성 인식</strong>: MLX Whisper</li><li><strong>영상 후처리</strong>: FFmpeg, MoviePy, OpenCV</li><li><strong>아티팩트 제거</strong>: EasyOCR + LaMa Inpainting</li><li><strong>음원 분리</strong>: Demucs</li><li><strong>업로드</strong>: YouTube API (OAuth2)</li><li><strong>테스트</strong>: pytest (397 tests, 91% coverage)</li></ul>`,
    },
    en: {
      title: "AutoShorts — AI Short-form Automation",
      company: "Side Project",
      period: "2026.03 ~",
      role: "Full-stack Developer",
      tags: ["Python", "Veo 3.1", "Whisper", "FFmpeg"],
      github: "https://github.com/kangnam7654/AutoShorts",
      sideProject: true,
      claudeCode: true,
      contentHtml: `<h2>Overview</h2>
<p>A short-form video production CLI that automates everything from video generation to YouTube upload for marketing an AI fortune-telling app. Generates videos with Veo 3.1, extracts subtitles with Whisper, then applies LLM correction, face-detection cropping, BGM mixing, and uploads.</p>
<h2>Tech Stack</h2>
<ul><li><strong>Video Generation</strong>: Google Veo 3.1</li><li><strong>Speech Recognition</strong>: MLX Whisper</li><li><strong>Video Post-processing</strong>: FFmpeg, MoviePy, OpenCV</li><li><strong>Artifact Removal</strong>: EasyOCR + LaMa Inpainting</li><li><strong>Audio Separation</strong>: Demucs</li><li><strong>Upload</strong>: YouTube API (OAuth2)</li><li><strong>Testing</strong>: pytest (397 tests, 91% coverage)</li></ul>`,
    },
    ja: {
      title: "AutoShorts — AIショート動画自動化",
      company: "個人プロジェクト",
      period: "2026.03 ~",
      role: "フルスタック開発",
      tags: ["Python", "Veo 3.1", "Whisper", "FFmpeg"],
      github: "https://github.com/kangnam7654/AutoShorts",
      sideProject: true,
      claudeCode: true,
      contentHtml: `<h2>概要</h2>
<p>AI四柱推命アプリのマーケティングのため、動画生成からYouTubeアップロードまでを自動化するショート動画制作CLIです。Veo 3.1で動画を生成し、Whisperで字幕を抽出した後、LLM補正、顔認識クロップ、BGMミキシングを経てアップロードします。</p>
<h2>技術スタック</h2>
<ul><li><strong>動画生成</strong>: Google Veo 3.1</li><li><strong>音声認識</strong>: MLX Whisper</li><li><strong>動画後処理</strong>: FFmpeg, MoviePy, OpenCV</li><li><strong>アーティファクト除去</strong>: EasyOCR + LaMa Inpainting</li><li><strong>音源分離</strong>: Demucs</li><li><strong>アップロード</strong>: YouTube API (OAuth2)</li><li><strong>テスト</strong>: pytest (397 tests, 91% coverage)</li></ul>`,
    },
  },

  "what-health": {
    ko: {
      title: "What Health",
      company: "개인 프로젝트",
      period: "2026.03 ~",
      role: "풀스택 개발",
      tags: ["Swift", "Rust", "LLM"],
      github: "https://github.com/kangnam7654/what_health",
      sideProject: true,
      claudeCode: true,
      contentHtml: `<h2>개요</h2>
<p>LLM이 운동 코치가 되어 개인 맞춤 운동 스케줄을 관리해주는 앱입니다.</p>
<h2>기술 스택</h2>
<ul><li><strong>Frontend</strong>: Swift (iOS)</li><li><strong>Backend</strong>: Rust</li><li><strong>AI</strong>: LLM</li></ul>`,
    },
    en: {
      title: "What Health",
      company: "Side Project",
      period: "2026.03 ~",
      role: "Full-stack Developer",
      tags: ["Swift", "Rust", "LLM"],
      github: "https://github.com/kangnam7654/what_health",
      sideProject: true,
      claudeCode: true,
      contentHtml: `<h2>Overview</h2>
<p>An app where an LLM acts as a fitness coach, managing personalized workout schedules.</p>
<h2>Tech Stack</h2>
<ul><li><strong>Frontend</strong>: Swift (iOS)</li><li><strong>Backend</strong>: Rust</li><li><strong>AI</strong>: LLM</li></ul>`,
    },
    ja: {
      title: "What Health",
      company: "個人プロジェクト",
      period: "2026.03 ~",
      role: "フルスタック開発",
      tags: ["Swift", "Rust", "LLM"],
      github: "https://github.com/kangnam7654/what_health",
      sideProject: true,
      claudeCode: true,
      contentHtml: `<h2>概要</h2>
<p>LLMがフィットネスコーチとなり、パーソナライズされたトレーニングスケジュールを管理するアプリです。</p>
<h2>技術スタック</h2>
<ul><li><strong>Frontend</strong>: Swift (iOS)</li><li><strong>Backend</strong>: Rust</li><li><strong>AI</strong>: LLM</li></ul>`,
    },
  },

  "dalgyeol": {
    ko: {
      title: "달결 — AI 사주·타로",
      company: "개인 프로젝트",
      period: "2026.03 ~",
      role: "풀스택 개발",
      tags: ["Rust", "Swift", "LLM", "iOS"],
      sideProject: true,
      claudeCode: true,
      contentHtml: `<h2>개요</h2>
<p>사주와 타로를 결합한 AI 운세 상담 iOS 앱입니다. 규칙 기반 사주 엔진(순수 Rust, LLM 비의존)으로 운세를 생성하고, 멀티 LLM 프로바이더를 활용한 AI 상담사가 실시간 채팅 상담을 제공합니다. 서비스 출시 예정입니다.</p>
<h2>주요 구현</h2>
<ul><li>순수 Rust 사주 계산 엔진 (외부 API 의존 없음, ~1,100줄)</li><li>AES-256-GCM 개인정보 암호화</li><li>StoreKit 2 인앱결제 + 포인트 경제 시스템</li><li>실시간 WebSocket AI 상담 + PII 마스킹</li></ul>
<h2>기술 스택</h2>
<ul><li><strong>Backend</strong>: Rust (Axum, Tokio), PostgreSQL, Fly.io</li><li><strong>iOS</strong>: SwiftUI (iOS 17+), StoreKit 2, Sign in with Apple</li><li><strong>AI</strong>: 멀티 LLM (Claude, GPT, Gemini)</li></ul>
<h2>규모</h2>
<ul><li>Backend Rust 5,000줄+, iOS Swift 8,000줄+</li><li>설계문서 7개, 마이그레이션 15개</li></ul>
<h2>스크린샷</h2>
<div style="display:flex;gap:16px;flex-wrap:wrap;">
<img src="/images/projects/dalgyeol-daily-fortune.png" alt="오늘의 운세" style="width:240px;border-radius:12px;" />
<img src="/images/projects/dalgyeol-fortune-detail.png" alt="월운 상세" style="width:240px;border-radius:12px;" />
</div>`,
    },
    en: {
      title: "Dalgyeol — AI Fortune & Tarot",
      company: "Side Project",
      period: "2026.03 ~",
      role: "Full-stack Developer",
      tags: ["Rust", "Swift", "LLM", "iOS"],
      sideProject: true,
      claudeCode: true,
      contentHtml: `<h2>Overview</h2>
<p>An iOS app combining Saju (Korean fortune-telling) and Tarot for AI-powered fortune consultation. Generates fortunes using a rule-based Saju engine (pure Rust, no LLM dependency), and an AI counselor powered by multiple LLM providers offers real-time chat consultations. Launch planned.</p>
<h2>Key Implementation</h2>
<ul><li>Pure Rust Saju calculation engine (no external API dependency, ~1,100 lines)</li><li>AES-256-GCM personal data encryption</li><li>StoreKit 2 in-app purchases + point economy system</li><li>Real-time WebSocket AI consultation + PII masking</li></ul>
<h2>Tech Stack</h2>
<ul><li><strong>Backend</strong>: Rust (Axum, Tokio), PostgreSQL, Fly.io</li><li><strong>iOS</strong>: SwiftUI (iOS 17+), StoreKit 2, Sign in with Apple</li><li><strong>AI</strong>: Multi LLM (Claude, GPT, Gemini)</li></ul>
<h2>Scale</h2>
<ul><li>Backend Rust 5,000+ lines, iOS Swift 8,000+ lines</li><li>7 design documents, 15 migrations</li></ul>
<h2>Screenshots</h2>
<div style="display:flex;gap:16px;flex-wrap:wrap;">
<img src="/images/projects/dalgyeol-daily-fortune.png" alt="Daily Fortune" style="width:240px;border-radius:12px;" />
<img src="/images/projects/dalgyeol-fortune-detail.png" alt="Monthly Fortune Detail" style="width:240px;border-radius:12px;" />
</div>`,
    },
    ja: {
      title: "ダルギョル — AI四柱推命・タロット",
      company: "個人プロジェクト",
      period: "2026.03 ~",
      role: "フルスタック開発",
      tags: ["Rust", "Swift", "LLM", "iOS"],
      sideProject: true,
      claudeCode: true,
      contentHtml: `<h2>概要</h2>
<p>四柱推命とタロットを組み合わせたAI運勢相談iOSアプリです。ルールベースの四柱推命エンジン（純粋Rust、LLM非依存）で運勢を生成し、マルチLLMプロバイダーを活用したAIカウンセラーがリアルタイムチャット相談を提供します。サービスリリース予定です。</p>
<h2>主要実装</h2>
<ul><li>純粋Rust四柱推命計算エンジン（外部API依存なし、約1,100行）</li><li>AES-256-GCM個人情報暗号化</li><li>StoreKit 2アプリ内課金 + ポイントエコノミーシステム</li><li>リアルタイムWebSocket AIカウンセリング + PIIマスキング</li></ul>
<h2>技術スタック</h2>
<ul><li><strong>Backend</strong>: Rust (Axum, Tokio), PostgreSQL, Fly.io</li><li><strong>iOS</strong>: SwiftUI (iOS 17+), StoreKit 2, Sign in with Apple</li><li><strong>AI</strong>: マルチLLM (Claude, GPT, Gemini)</li></ul>
<h2>規模</h2>
<ul><li>Backend Rust 5,000行+、iOS Swift 8,000行+</li><li>設計文書7件、マイグレーション15件</li></ul>
<h2>スクリーンショット</h2>
<div style="display:flex;gap:16px;flex-wrap:wrap;">
<img src="/images/projects/dalgyeol-daily-fortune.png" alt="今日の運勢" style="width:240px;border-radius:12px;" />
<img src="/images/projects/dalgyeol-fortune-detail.png" alt="月運詳細" style="width:240px;border-radius:12px;" />
</div>`,
    },
  },

  "game-npc": {
    ko: {
      title: "Game NPC with LLM",
      company: "개인 프로젝트",
      period: "2025.08",
      role: "AI 개발",
      tags: ["Python", "RL", "LLM"],
      github: "https://github.com/kangnam7654/Game-NPC-with-LLM",
      sideProject: true,
      claudeCode: true,
      contentHtml: `<h2>개요</h2>
<p>간단한 퀘스트 미로 게임을 직접 만들고, 강화학습 에이전트가 퀘스트를 수행하도록 학습시켰습니다. 게임 내 NPC에는 LLM을 연결하여 자연어로 대화하고 정보를 얻을 수 있습니다.</p>
<h2>데모</h2>
<div class="demo-grid"><div class="demo-item"><span class="demo-label">퀘스트 미로 (강화학습)</span><img src="/images/projects/game-npc-maze.gif" alt="강화학습 퀘스트 미로" loading="lazy" /></div><div class="demo-item"><span class="demo-label">NPC 대화 (LLM)</span><img src="/images/projects/game-npc-chat.gif" alt="LLM NPC 대화" loading="lazy" /></div></div>
<h2>아키텍처</h2>
<img src="/images/projects/game-npc-architecture.png" alt="AI Agent 아키텍처" loading="lazy" />
<h2>기술 스택</h2>
<ul><li><strong>Language</strong>: Python</li><li><strong>RL</strong>: 강화학습 에이전트 (퀘스트 수행)</li><li><strong>LLM</strong>: NPC 자연어 대화</li></ul>`,
    },
    en: {
      title: "Game NPC with LLM",
      company: "Side Project",
      period: "2025.08",
      role: "AI Developer",
      tags: ["Python", "RL", "LLM"],
      github: "https://github.com/kangnam7654/Game-NPC-with-LLM",
      sideProject: true,
      claudeCode: true,
      contentHtml: `<h2>Overview</h2>
<p>Built a simple quest maze game from scratch and trained a reinforcement learning agent to complete quests. Connected LLMs to in-game NPCs, enabling natural language conversations to obtain information.</p>
<h2>Demo</h2>
<div class="demo-grid"><div class="demo-item"><span class="demo-label">Quest Maze (RL)</span><img src="/images/projects/game-npc-maze.gif" alt="Reinforcement learning quest maze" loading="lazy" /></div><div class="demo-item"><span class="demo-label">NPC Dialogue (LLM)</span><img src="/images/projects/game-npc-chat.gif" alt="LLM NPC conversation" loading="lazy" /></div></div>
<h2>Architecture</h2>
<img src="/images/projects/game-npc-architecture.png" alt="AI Agent Architecture" loading="lazy" />
<h2>Tech Stack</h2>
<ul><li><strong>Language</strong>: Python</li><li><strong>RL</strong>: Reinforcement learning agent (quest execution)</li><li><strong>LLM</strong>: NPC natural language conversation</li></ul>`,
    },
    ja: {
      title: "Game NPC with LLM",
      company: "個人プロジェクト",
      period: "2025.08",
      role: "AI開発",
      tags: ["Python", "RL", "LLM"],
      github: "https://github.com/kangnam7654/Game-NPC-with-LLM",
      sideProject: true,
      claudeCode: true,
      contentHtml: `<h2>概要</h2>
<p>シンプルなクエスト迷路ゲームを自作し、強化学習エージェントにクエストを遂行するよう学習させました。ゲーム内NPCにはLLMを接続し、自然言語で会話して情報を得ることができます。</p>
<h2>デモ</h2>
<div class="demo-grid"><div class="demo-item"><span class="demo-label">クエスト迷路（強化学習）</span><img src="/images/projects/game-npc-maze.gif" alt="強化学習クエスト迷路" loading="lazy" /></div><div class="demo-item"><span class="demo-label">NPC会話（LLM）</span><img src="/images/projects/game-npc-chat.gif" alt="LLM NPC会話" loading="lazy" /></div></div>
<h2>アーキテクチャ</h2>
<img src="/images/projects/game-npc-architecture.png" alt="AIエージェントアーキテクチャ" loading="lazy" />
<h2>技術スタック</h2>
<ul><li><strong>Language</strong>: Python</li><li><strong>RL</strong>: 強化学習エージェント（クエスト遂行）</li><li><strong>LLM</strong>: NPC自然言語会話</li></ul>`,
    },
  },

  "story-writer": {
    ko: {
      title: "Multi-Agent Story Writer",
      company: "개인 프로젝트",
      period: "2025.06",
      role: "AI 개발",
      tags: ["Python", "LangGraph", "ChromaDB"],
      github: "https://github.com/kangnam7654/multi_agent_storywriter",
      sideProject: true,
      claudeCode: true,
      contentHtml: `<h2>개요</h2>
<p>LangGraph 기반 멀티에이전트 스토리 작성 시스템입니다. Lorebook(세계관 설정집)을 벡터 검색으로 참고하여 스토리를 생성하고, Director 에이전트가 검수·피드백하는 과정을 자동으로 반복합니다.</p>
<h2>데모</h2>
<img src="/images/projects/story-writer-ui.png" alt="Multi-Agent Story Writer UI" loading="lazy" />
<h2>워크플로우</h2>
<ul><li><strong>Request Parser</strong>: 사용자 입력에서 장르, 스타일, 분량 추출</li><li><strong>Story Writer</strong>: Lorebook 검색 후 세계관에 맞는 스토리 작성</li><li><strong>Director</strong>: 스토리 검수 및 피드백 (최대 3회 반복)</li></ul>
<h2>기술 스택</h2>
<ul><li><strong>오케스트레이션</strong>: LangGraph, LangChain</li><li><strong>벡터 검색</strong>: ChromaDB, HuggingFace Embeddings</li><li><strong>LLM</strong>: Ollama (로컬)</li><li><strong>UI</strong>: Gradio</li></ul>`,
    },
    en: {
      title: "Multi-Agent Story Writer",
      company: "Side Project",
      period: "2025.06",
      role: "AI Developer",
      tags: ["Python", "LangGraph", "ChromaDB"],
      github: "https://github.com/kangnam7654/multi_agent_storywriter",
      sideProject: true,
      claudeCode: true,
      contentHtml: `<h2>Overview</h2>
<p>A LangGraph-based multi-agent story writing system. Generates stories by referencing a Lorebook (world-building settings) through vector search, with a Director agent automatically iterating through review and feedback cycles.</p>
<h2>Demo</h2>
<img src="/images/projects/story-writer-ui.png" alt="Multi-Agent Story Writer UI" loading="lazy" />
<h2>Workflow</h2>
<ul><li><strong>Request Parser</strong>: Extracts genre, style, and length from user input</li><li><strong>Story Writer</strong>: Searches Lorebook and writes stories consistent with the world setting</li><li><strong>Director</strong>: Reviews stories and provides feedback (up to 3 iterations)</li></ul>
<h2>Tech Stack</h2>
<ul><li><strong>Orchestration</strong>: LangGraph, LangChain</li><li><strong>Vector Search</strong>: ChromaDB, HuggingFace Embeddings</li><li><strong>LLM</strong>: Ollama (local)</li><li><strong>UI</strong>: Gradio</li></ul>`,
    },
    ja: {
      title: "Multi-Agent Story Writer",
      company: "個人プロジェクト",
      period: "2025.06",
      role: "AI開発",
      tags: ["Python", "LangGraph", "ChromaDB"],
      github: "https://github.com/kangnam7654/multi_agent_storywriter",
      sideProject: true,
      claudeCode: true,
      contentHtml: `<h2>概要</h2>
<p>LangGraphベースのマルチエージェントストーリー作成システムです。Lorebook（世界観設定集）をベクトル検索で参照してストーリーを生成し、Directorエージェントが検収・フィードバックするプロセスを自動で繰り返します。</p>
<h2>デモ</h2>
<img src="/images/projects/story-writer-ui.png" alt="Multi-Agent Story Writer UI" loading="lazy" />
<h2>ワークフロー</h2>
<ul><li><strong>Request Parser</strong>: ユーザー入力からジャンル、スタイル、分量を抽出</li><li><strong>Story Writer</strong>: Lorebook検索後、世界観に合ったストーリーを作成</li><li><strong>Director</strong>: ストーリー検収及びフィードバック（最大3回反復）</li></ul>
<h2>技術スタック</h2>
<ul><li><strong>オーケストレーション</strong>: LangGraph, LangChain</li><li><strong>ベクトル検索</strong>: ChromaDB, HuggingFace Embeddings</li><li><strong>LLM</strong>: Ollama（ローカル）</li><li><strong>UI</strong>: Gradio</li></ul>`,
    },
  },
};

export function getProjectData(slug: string, locale: Locale): ProjectData {
  const project = projectsData[slug];
  if (!project) {
    throw new Error(`Project not found: ${slug}`);
  }
  return project[locale];
}

export function getAllProjectSlugs(): string[] {
  return [...projectSlugs];
}
