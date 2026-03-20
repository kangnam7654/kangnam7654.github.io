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
  "ue5-mcp",
  "ai-assessment",
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
  "quorum",
  "game-npc",
  "story-writer",
] as const;

const projectsData: Record<string, Record<Locale, ProjectData>> = {
  "ue5-mcp": {
    ko: {
      title: "Unreal Engine MCP 플러그인",
      company: "위메이드 넥스트",
      period: "2026.02 ~ 현재",
      role: "AI 엔지니어",
      tags: ["MCP", "Unreal Engine", "AI Integration", "C++"],
      github: "https://github.com/kangnam7654/kangnam-unreal-mcp",
      contentHtml: `<h2>개요</h2>
<p>언리얼 엔진에서 동작하는 플러그인 형태의 MCP(Model Context Protocol)를 개발하고 있습니다. AI와 게임 엔진 간의 연동 인터페이스를 구축하여, 게임 개발 워크플로우에 AI를 자연스럽게 통합하는 것이 목표입니다.</p>
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
      period: "2026.02 ~ Present",
      role: "AI Engineer",
      tags: ["MCP", "Unreal Engine", "AI Integration", "C++"],
      github: "https://github.com/kangnam7654/kangnam-unreal-mcp",
      contentHtml: `<h2>Overview</h2>
<p>Developing a plugin-based MCP (Model Context Protocol) that runs within Unreal Engine. The goal is to seamlessly integrate AI into game development workflows by building an interface between AI and the game engine.</p>
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
      period: "2026.02 ~ 現在",
      role: "AIエンジニア",
      tags: ["MCP", "Unreal Engine", "AI Integration", "C++"],
      github: "https://github.com/kangnam7654/kangnam-unreal-mcp",
      contentHtml: `<h2>概要</h2>
<p>Unreal Engineで動作するプラグイン形式のMCP（Model Context Protocol）を開発しています。AIとゲームエンジン間の連携インターフェースを構築し、ゲーム開発ワークフローにAIを自然に統合することが目標です。</p>
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
<p>학생의 영어 발표를 AI로 자동 평가하는 시스템을 개발했습니다. Azure ML 기반 실시간 추론 시스템을 배포하여 월간 활성 사용자 수(MAU) 3만 명을 달성했습니다.</p>
<h2>아키텍처</h2>
<img src="/images/projects/ai-assessment-architecture.png" alt="AI 자동평가 에이전트 워크플로우" loading="lazy" />
<img src="/images/projects/ai-assessment-sequence.png" alt="Multi-Agent 시퀀스 다이어그램" loading="lazy" />
<h2>발표태도 평가 데모</h2>
<p>MediaPipe 기반 얼굴·손 인식으로 발표자의 시선 방향, 손 제스처, 움직임을 실시간 분석하여 발표 태도를 자동 평가합니다.</p>
<div class="demo-grid"><div class="demo-item"><span class="demo-label">시선 방향 추적</span><img src="/images/projects/ai-assessment-head.png" alt="Head Position 추적" loading="lazy" /></div><div class="demo-item"><span class="demo-label">손 제스처 인식</span><img src="/images/projects/ai-assessment-hand1.png" alt="Hand Gesture 인식 - 양손" loading="lazy" /></div></div>
<h2>주요 성과</h2>
<ul><li><strong>[MLOps]</strong> Azure ML에 실시간 추론 시스템 배포, MAU 3만 명 달성</li><li><strong>[LLM Agent]</strong> 다중 에이전트(Multi-Agent) 접근 방식으로 합성 학생 데이터 생성</li><li><strong>[Vision]</strong> Diffusion 모델 기반 이미지 생성 파이프라인 구성 및 양자화를 통한 모델 경량화</li><li><strong>[Audio]</strong> NVIDIA Parakeet 기반 STT 모델 미세 조정으로 비원어민 어린이 음성 인식률 개선</li><li><strong>[Audio]</strong> TTS 모델 파인튜닝 연구 (실험 단계)</li><li><strong>[Search]</strong> 키워드 기반 검색과 벡터 검색을 조합한 하이브리드 검색 시스템 설계 및 구현</li><li><strong>[Vision]</strong> MediaPipe 기반 얼굴 인식 및 자세 추적으로 학생 발표 태도 자동 평가</li></ul>
<h2>기술 스택</h2>
<ul><li><strong>Cloud</strong>: Azure ML, Blob Storage</li><li><strong>Frameworks</strong>: PyTorch, HuggingFace, LangChain, LangGraph</li><li><strong>Models</strong>: Diffusion, NVIDIA Parakeet, MediaPipe</li><li><strong>Serving</strong>: FastAPI, ONNX</li><li><strong>Search</strong>: Hybrid Search (BM25 + Vector)</li></ul>`,
    },
    en: {
      title: "AI Auto-Assessment System",
      company: "Creverse (Chungdahm Learning)",
      period: "2024.04 ~ 2025.06",
      role: "AI Engineer",
      tags: ["MLOps", "LLM Agent", "Vision", "Audio", "Search"],
      github: "https://github.com/kangnam7654/Multi-Agent-English-Assessment-System",
      contentHtml: `<h2>Overview</h2>
<p>Developed an AI-powered automatic assessment system for students' English presentations. Deployed a real-time inference system on Azure ML, achieving 30,000 monthly active users (MAU).</p>
<h2>Architecture</h2>
<img src="/images/projects/ai-assessment-architecture.png" alt="AI Auto-Assessment Agent Workflow" loading="lazy" />
<img src="/images/projects/ai-assessment-sequence.png" alt="Multi-Agent Sequence Diagram" loading="lazy" />
<h2>Presentation Attitude Assessment Demo</h2>
<p>Automatically evaluates presentation attitudes by analyzing the presenter's gaze direction, hand gestures, and movements in real-time using MediaPipe-based face and hand recognition.</p>
<div class="demo-grid"><div class="demo-item"><span class="demo-label">Gaze Direction Tracking</span><img src="/images/projects/ai-assessment-head.png" alt="Head Position Tracking" loading="lazy" /></div><div class="demo-item"><span class="demo-label">Hand Gesture Recognition</span><img src="/images/projects/ai-assessment-hand1.png" alt="Hand Gesture Recognition - Both Hands" loading="lazy" /></div></div>
<h2>Key Achievements</h2>
<ul><li><strong>[MLOps]</strong> Deployed real-time inference system on Azure ML, achieving 30K MAU</li><li><strong>[LLM Agent]</strong> Generated synthetic student data using a multi-agent approach</li><li><strong>[Vision]</strong> Built an image generation pipeline based on diffusion models with quantization for model compression</li><li><strong>[Audio]</strong> Fine-tuned NVIDIA Parakeet-based STT model to improve speech recognition for non-native children</li><li><strong>[Audio]</strong> TTS model fine-tuning research (experimental stage)</li><li><strong>[Search]</strong> Designed and implemented a hybrid search system combining keyword-based and vector search</li><li><strong>[Vision]</strong> Automated student presentation attitude assessment using MediaPipe-based face recognition and pose tracking</li></ul>
<h2>Tech Stack</h2>
<ul><li><strong>Cloud</strong>: Azure ML, Blob Storage</li><li><strong>Frameworks</strong>: PyTorch, HuggingFace, LangChain, LangGraph</li><li><strong>Models</strong>: Diffusion, NVIDIA Parakeet, MediaPipe</li><li><strong>Serving</strong>: FastAPI, ONNX</li><li><strong>Search</strong>: Hybrid Search (BM25 + Vector)</li></ul>`,
    },
    ja: {
      title: "AI自動評価システム",
      company: "Creverse（チョンダムラーニング）",
      period: "2024.04 ~ 2025.06",
      role: "AIエンジニア",
      tags: ["MLOps", "LLM Agent", "Vision", "Audio", "Search"],
      github: "https://github.com/kangnam7654/Multi-Agent-English-Assessment-System",
      contentHtml: `<h2>概要</h2>
<p>学生の英語プレゼンテーションをAIで自動評価するシステムを開発しました。Azure MLベースのリアルタイム推論システムをデプロイし、月間アクティブユーザー数（MAU）3万人を達成しました。</p>
<h2>アーキテクチャ</h2>
<img src="/images/projects/ai-assessment-architecture.png" alt="AI自動評価エージェントワークフロー" loading="lazy" />
<img src="/images/projects/ai-assessment-sequence.png" alt="マルチエージェントシーケンス図" loading="lazy" />
<h2>プレゼン態度評価デモ</h2>
<p>MediaPipeベースの顔・手認識により、発表者の視線方向、ハンドジェスチャー、動きをリアルタイム分析してプレゼンテーション態度を自動評価します。</p>
<div class="demo-grid"><div class="demo-item"><span class="demo-label">視線方向追跡</span><img src="/images/projects/ai-assessment-head.png" alt="頭部位置追跡" loading="lazy" /></div><div class="demo-item"><span class="demo-label">ハンドジェスチャー認識</span><img src="/images/projects/ai-assessment-hand1.png" alt="ハンドジェスチャー認識 - 両手" loading="lazy" /></div></div>
<h2>主要成果</h2>
<ul><li><strong>[MLOps]</strong> Azure MLにリアルタイム推論システムをデプロイ、MAU 3万人達成</li><li><strong>[LLM Agent]</strong> マルチエージェントアプローチによる合成学生データ生成</li><li><strong>[Vision]</strong> Diffusionモデルベースの画像生成パイプライン構築及び量子化によるモデル軽量化</li><li><strong>[Audio]</strong> NVIDIA ParakeetベースのSTTモデル微調整による非ネイティブ児童の音声認識率改善</li><li><strong>[Audio]</strong> TTSモデルファインチューニング研究（実験段階）</li><li><strong>[Search]</strong> キーワードベース検索とベクトル検索を組み合わせたハイブリッド検索システムの設計・実装</li><li><strong>[Vision]</strong> MediaPipeベースの顔認識及びポーズ追跡による学生プレゼン態度自動評価</li></ul>
<h2>技術スタック</h2>
<ul><li><strong>Cloud</strong>: Azure ML, Blob Storage</li><li><strong>Frameworks</strong>: PyTorch, HuggingFace, LangChain, LangGraph</li><li><strong>Models</strong>: Diffusion, NVIDIA Parakeet, MediaPipe</li><li><strong>Serving</strong>: FastAPI, ONNX</li><li><strong>Search</strong>: Hybrid Search (BM25 + Vector)</li></ul>`,
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
<p>사용자의 얼굴 이미지를 기반으로 게임 아바타를 생성하는 Face-to-Character 시스템을 설계·구현했습니다 (PoC).</p>
<h2>변환 예시</h2>
<div class="demo-grid" style="grid-template-columns: 1fr 1fr 1fr;"><div class="demo-item"><span class="demo-label">원본</span><img src="/images/projects/ftc-original.png" alt="원본 얼굴 이미지" loading="lazy" /></div><div class="demo-item"><span class="demo-label">게임 캐릭터</span><img src="/images/projects/ftc-game.png" alt="게임 캐릭터 변환 결과" loading="lazy" /></div><div class="demo-item"><span class="demo-label">애니메이션</span><img src="/images/projects/ftc-anime.png" alt="애니메이션 스타일 변환 결과" loading="lazy" /></div></div>
<h2>주요 성과</h2>
<ul><li>사용자 얼굴 특징을 추출하여 3D 게임 캐릭터에 매핑하는 파이프라인 구축</li><li>얼굴 랜드마크 검출부터 캐릭터 파라미터 생성까지 end-to-end 프로세스 설계</li><li>PoC(Proof of Concept) 완료</li></ul>
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
<p>Designed and implemented a Face-to-Character system that generates game avatars based on users' facial images (PoC).</p>
<h2>Conversion Examples</h2>
<div class="demo-grid" style="grid-template-columns: 1fr 1fr 1fr;"><div class="demo-item"><span class="demo-label">Original</span><img src="/images/projects/ftc-original.png" alt="Original face image" loading="lazy" /></div><div class="demo-item"><span class="demo-label">Game Character</span><img src="/images/projects/ftc-game.png" alt="Game character conversion result" loading="lazy" /></div><div class="demo-item"><span class="demo-label">Animation</span><img src="/images/projects/ftc-anime.png" alt="Animation style conversion result" loading="lazy" /></div></div>
<h2>Key Achievements</h2>
<ul><li>Built a pipeline to extract facial features and map them to 3D game characters</li><li>Designed an end-to-end process from facial landmark detection to character parameter generation</li><li>Completed Proof of Concept (PoC)</li></ul>
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
<p>ユーザーの顔画像を基にゲームアバターを生成するFace-to-Characterシステムを設計・実装しました（PoC）。</p>
<h2>変換例</h2>
<div class="demo-grid" style="grid-template-columns: 1fr 1fr 1fr;"><div class="demo-item"><span class="demo-label">オリジナル</span><img src="/images/projects/ftc-original.png" alt="元の顔画像" loading="lazy" /></div><div class="demo-item"><span class="demo-label">ゲームキャラクター</span><img src="/images/projects/ftc-game.png" alt="ゲームキャラクター変換結果" loading="lazy" /></div><div class="demo-item"><span class="demo-label">アニメーション</span><img src="/images/projects/ftc-anime.png" alt="アニメーションスタイル変換結果" loading="lazy" /></div></div>
<h2>主要成果</h2>
<ul><li>ユーザーの顔特徴を抽出し3Dゲームキャラクターにマッピングするパイプライン構築</li><li>顔ランドマーク検出からキャラクターパラメータ生成までのエンドツーエンドプロセス設計</li><li>PoC（Proof of Concept）完了</li></ul>
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
<ul><li>Backend Rust 5,000줄+, iOS Swift 8,000줄+</li><li>설계문서 7개, 마이그레이션 15개</li></ul>`,
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
<ul><li>Backend Rust 5,000+ lines, iOS Swift 8,000+ lines</li><li>7 design documents, 15 migrations</li></ul>`,
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
<ul><li>Backend Rust 5,000行+、iOS Swift 8,000行+</li><li>設計文書7件、マイグレーション15件</li></ul>`,
    },
  },

  "quorum": {
    ko: {
      title: "Quorum — 멀티에이전트 협업",
      company: "개인 프로젝트",
      period: "2026.03 ~",
      role: "풀스택 개발",
      tags: ["Rust", "Next.js", "Tauri", "LLM"],
      sideProject: true,
      claudeCode: true,
      contentHtml: `<h2>개요</h2>
<p>서로 다른 역할을 가진 AI 에이전트들이 실시간으로 토론·협업하는 멀티에이전트 플랫폼입니다. 병렬 토론, 3단계 오케스트레이션(Research → Analysis → Synthesis), 4개 LLM 프로바이더 통합, SSE 기반 토큰 스트리밍을 구현했습니다.</p>
<h2>기술 스택</h2>
<ul><li><strong>Backend</strong>: Rust (Axum, Tokio, sqlx)</li><li><strong>Frontend</strong>: Next.js 16, TypeScript, Tailwind CSS 4</li><li><strong>Desktop</strong>: Tauri 2.x</li><li><strong>AI</strong>: Anthropic, OpenAI, Codex, GitHub Copilot</li><li><strong>Real-time</strong>: SSE, mpsc + broadcast channels</li><li><strong>테스트</strong>: 103개</li></ul>`,
    },
    en: {
      title: "Quorum — Multi-Agent Collaboration",
      company: "Side Project",
      period: "2026.03 ~",
      role: "Full-stack Developer",
      tags: ["Rust", "Next.js", "Tauri", "LLM"],
      sideProject: true,
      claudeCode: true,
      contentHtml: `<h2>Overview</h2>
<p>A multi-agent platform where AI agents with different roles discuss and collaborate in real-time. Implemented parallel discussions, 3-stage orchestration (Research → Analysis → Synthesis), integration of 4 LLM providers, and SSE-based token streaming.</p>
<h2>Tech Stack</h2>
<ul><li><strong>Backend</strong>: Rust (Axum, Tokio, sqlx)</li><li><strong>Frontend</strong>: Next.js 16, TypeScript, Tailwind CSS 4</li><li><strong>Desktop</strong>: Tauri 2.x</li><li><strong>AI</strong>: Anthropic, OpenAI, Codex, GitHub Copilot</li><li><strong>Real-time</strong>: SSE, mpsc + broadcast channels</li><li><strong>Testing</strong>: 103 tests</li></ul>`,
    },
    ja: {
      title: "Quorum — マルチエージェント協業",
      company: "個人プロジェクト",
      period: "2026.03 ~",
      role: "フルスタック開発",
      tags: ["Rust", "Next.js", "Tauri", "LLM"],
      sideProject: true,
      claudeCode: true,
      contentHtml: `<h2>概要</h2>
<p>異なる役割を持つAIエージェントたちがリアルタイムで議論・協業するマルチエージェントプラットフォームです。並列ディスカッション、3段階オーケストレーション（Research → Analysis → Synthesis）、4つのLLMプロバイダー統合、SSEベースのトークンストリーミングを実装しました。</p>
<h2>技術スタック</h2>
<ul><li><strong>Backend</strong>: Rust (Axum, Tokio, sqlx)</li><li><strong>Frontend</strong>: Next.js 16, TypeScript, Tailwind CSS 4</li><li><strong>Desktop</strong>: Tauri 2.x</li><li><strong>AI</strong>: Anthropic, OpenAI, Codex, GitHub Copilot</li><li><strong>Real-time</strong>: SSE, mpsc + broadcast channels</li><li><strong>テスト</strong>: 103件</li></ul>`,
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
