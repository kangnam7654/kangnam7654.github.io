import { getProjectData } from "../i18n/data/projects";
import { localePath, type Locale } from "../i18n/utils";

/**
 * Editorial selection for preview B, not a replacement résumé.
 * Public project metadata comes from the existing localized project source.
 * Scope and measurement qualifiers deliberately stay next to the claims.
 */
export const studioLocales = ["ko", "en", "ja"] as const;
export const studioLocaleLabels: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
};
export const studioEmail = "kangnam7653@gmail.com";
export const studioGithub = "https://github.com/kangnam7654";
export const studioResume = "/kangnam-kim-resume.pdf";
export const studioSlugs = ["ai-assessment", "ue5-mcp", "face-to-character"] as const;
export type StudioSlug = (typeof studioSlugs)[number];

interface Metric {
  value: string;
  label: string;
  context: string;
}

interface ProjectEditorial {
  stage: string;
  category: string;
  summary: string;
  contribution: string;
  boundary: string;
  tools: string[];
  metrics?: Metric[];
}

interface StudioCopy {
  name: string;
  title: string;
  description: string;
  role: string;
  skip: string;
  preview: string;
  original: string;
  compare: string;
  languageLabel: string;
  nav: { label: string; work: string; practice: string; contact: string };
  hero: {
    eyebrow: string;
    title: [string, string];
    body: string;
    projects: string;
    resume: string;
    resumeAccessible: string;
    schematic: string;
    schematicCaption: string;
    proofLabel: string;
    proofContext: string;
    proofLink: string;
  };
  work: {
    eyebrow: string;
    title: string;
    intro: string;
    contribution: string;
    scope: string;
    readCase: string;
    sourceCode: string;
    allProjects: string;
    archive: string;
    evidence: string;
    mcpDiagram: string;
    ganDiagram: string;
  };
  practice: {
    eyebrow: string;
    title: [string, string];
    intro: string;
    portraitAlt: string;
    fullResume: string;
    capabilities: { title: string; body: string; tools: string[] }[];
  };
  contact: {
    eyebrow: string;
    title: [string, string];
    body: string;
    emailLabel: string;
    resume: string;
    backToTop: string;
  };
  footer: string;
}

const copy: Record<Locale, StudioCopy> = {
  ko: {
    name: "김강남",
    title: "김강남 — Applied AI Engineer | Studio B",
    description: "음성·비전·LLM 모델 개선과 추론 서비스 구현·운영에 기여한 AI 엔지니어 김강남의 선별 프로젝트. 새로운 포트폴리오 B 프리뷰입니다.",
    role: "Applied AI 엔지니어",
    skip: "본문 바로가기",
    preview: "B / 디자인 프리뷰",
    original: "기존 포트폴리오 A",
    compare: "A/B 디자인 비교",
    languageLabel: "언어 선택",
    nav: { label: "주요 메뉴", work: "프로젝트", practice: "일하는 영역", contact: "연락처" },
    hero: {
      eyebrow: "모델 개선부터 서비스 구현·운영까지",
      title: ["모델을,", "쓸모 있게."],
      body: "음성·비전·LLM을 다루는 AI 엔지니어 김강남입니다. 모델을 개선하고, 실제로 쓰이는 추론 서비스를 구현·운영하는 일에 기여해 왔습니다.",
      projects: "선별 프로젝트",
      resume: "이력서 PDF",
      resumeAccessible: "공개 이력서 PDF 열기 (새 탭)",
      schematic: "기여 분야 · 개념 스케치",
      schematicCaption: "모델에서 사용으로, 그 사이를 연결합니다.",
      proofLabel: "기여 사례 / 음성 인식",
      proofContext: "Parakeet STT 파인튜닝 · 비원어민 어린이 음성의 WER",
      proofLink: "AI 평가 프로젝트에서 보기",
    },
    work: {
      eyebrow: "01 / 선별 프로젝트",
      title: "만든 것과, 기여한 부분.",
      intro: "운영 서비스의 개선부터 프로토타입 실험까지. 결과와 함께 각 작업의 범위를 구분해 소개합니다.",
      contribution: "담당한 부분",
      scope: "범위와 조건",
      readCase: "프로젝트 자세히",
      sourceCode: "공개 코드",
      allProjects: "전체 프로젝트 보기",
      archive: "다른 회사 프로젝트와 개인 작업은 기존 아카이브에서 볼 수 있습니다.",
      evidence: "결과와 평가 조건",
      mcpDiagram: "연동 개념도 · 프로토타입",
      ganDiagram: "접근 개념도 · PoC",
    },
    practice: {
      eyebrow: "02 / 일하는 영역",
      title: ["모델 하나보다,", "쓸 수 있는 연결을."],
      intro: "모델의 품질만큼 중요한 것은 실제 사용 조건입니다. 모델 개선, 평가, 추론 서비스, 인터페이스 사이에서 필요한 부분을 맡아 연결해 왔습니다.",
      portraitAlt: "김강남 프로필 사진",
      fullResume: "전체 경력과 이력서",
      capabilities: [
        {
          title: "음성·비전 모델 개선",
          body: "어린이 음성 STT 파인튜닝과 시선·자세 평가 모델을 다뤘습니다. 검증 성능과 CPU 추론 조건을 함께 고려했습니다.",
          tools: ["PyTorch", "Hugging Face", "Parakeet", "MediaPipe"],
        },
        {
          title: "추론 서비스와 검색",
          body: "Azure ML 기반 평가 추론 파이프라인 구현·운영에 기여하고, BM25와 벡터 검색을 결합해 내부 평가에서 호출 비용을 검토했습니다.",
          tools: ["Azure ML", "FastAPI", "ONNX", "BM25 + Vector"],
        },
        {
          title: "AI와 도구의 인터페이스",
          body: "Unreal Engine MCP 프로토타입의 연동 모듈에서 비동기 처리, N:M 연결, 동적 툴 등록을 구현했습니다.",
          tools: ["MCP", "C++", "Python", "Unreal Engine"],
        },
      ],
    },
    contact: {
      eyebrow: "03 / 연락처",
      title: ["다음 문제를,", "함께 풀어요."],
      body: "프로젝트에 대한 질문이나 협업 이야기가 있다면 이메일로 연락해 주세요.",
      emailLabel: "이메일 보내기",
      resume: "이력서 보기",
      backToTop: "맨 위로",
    },
    footer: "선별 작업 기록 · Studio B 프리뷰",
  },
  en: {
    name: "Kangnam Kim",
    title: "Kangnam Kim — Applied AI Engineer | Studio B",
    description: "Selected contributions by AI engineer Kangnam Kim: speech, vision, and LLM model improvement, inference-service implementation, and operations. Portfolio B preview.",
    role: "Applied AI Engineer",
    skip: "Skip to content",
    preview: "B / Design preview",
    original: "Original portfolio A",
    compare: "Compare A / B",
    languageLabel: "Choose language",
    nav: { label: "Main navigation", work: "Work", practice: "Practice", contact: "Contact" },
    hero: {
      eyebrow: "MODEL IMPROVEMENT → SERVICE IMPLEMENTATION",
      title: ["Models.", "Made useful."],
      body: "I’m Kangnam, an AI engineer working across speech, vision, and LLMs. I contribute to better models and to implementing and operating inference services people use.",
      projects: "Selected work",
      resume: "Résumé PDF",
      resumeAccessible: "Open public résumé PDF (new tab)",
      schematic: "Areas of practice · conceptual sketch",
      schematicCaption: "Connecting models to the ways they are used.",
      proofLabel: "CONTRIBUTION / SPEECH RECOGNITION",
      proofContext: "Parakeet STT fine-tuning · WER on non-native children’s speech",
      proofLink: "See the AI assessment project",
    },
    work: {
      eyebrow: "01 / SELECTED WORK",
      title: "The work. My part in it.",
      intro: "From production improvements to prototype experiments. Each project makes its contribution and limits explicit.",
      contribution: "My contribution",
      scope: "Scope & conditions",
      readCase: "Explore project",
      sourceCode: "Public code",
      allProjects: "All projects",
      archive: "More company projects and personal work live in the original archive.",
      evidence: "RESULTS, WITH CONTEXT",
      mcpDiagram: "Interface sketch · prototype",
      ganDiagram: "Approach sketch · PoC",
    },
    practice: {
      eyebrow: "02 / PRACTICE",
      title: ["Beyond a model.", "Toward something useful."],
      intro: "Model quality matters, and so do the conditions of use. My work connects model improvement, evaluation, inference services, and the interfaces around them.",
      portraitAlt: "Portrait of Kangnam Kim",
      fullResume: "Full experience & résumé",
      capabilities: [
        {
          title: "Speech & vision models",
          body: "Fine-tuned STT for children’s speech and built gaze/posture assessment models, considering validation results alongside practical CPU inference.",
          tools: ["PyTorch", "Hugging Face", "Parakeet", "MediaPipe"],
        },
        {
          title: "Inference & retrieval",
          body: "Contributed to Azure ML assessment-pipeline implementation and operations, and evaluated BM25 + vector retrieval against LLM-call cost internally.",
          tools: ["Azure ML", "FastAPI", "ONNX", "BM25 + Vector"],
        },
        {
          title: "AI–tool interfaces",
          body: "Implemented asynchronous processing, many-to-many connections, and dynamic tool registration in an Unreal Engine MCP prototype module.",
          tools: ["MCP", "C++", "Python", "Unreal Engine"],
        },
      ],
    },
    contact: {
      eyebrow: "03 / CONTACT",
      title: ["A useful conversation", "starts here."],
      body: "For a question about the work or a conversation about collaboration, send me an email.",
      emailLabel: "Send an email",
      resume: "View résumé",
      backToTop: "Back to top",
    },
    footer: "Selected work notes · Studio B preview",
  },
  ja: {
    name: "キム・カンナム",
    title: "キム・カンナム — Applied AI Engineer | Studio B",
    description: "音声・画像・LLMのモデル改善と推論サービスの実装・運用に携わるAIエンジニア、キム・カンナムの主なプロジェクト。ポートフォリオBのプレビューです。",
    role: "応用AIエンジニア",
    skip: "本文へ移動",
    preview: "B / デザインプレビュー",
    original: "既存ポートフォリオ A",
    compare: "A / B を比較",
    languageLabel: "言語を選択",
    nav: { label: "メインナビゲーション", work: "実績", practice: "取り組む領域", contact: "連絡先" },
    hero: {
      eyebrow: "モデル改善からサービスの実装・運用まで",
      title: ["モデルを、", "使える形に。"],
      body: "音声・画像・LLMを扱うAIエンジニア、キム・カンナムです。モデルの改善と、実際に使われる推論サービスの実装・運用に携わってきました。",
      projects: "主なプロジェクト",
      resume: "履歴書 PDF",
      resumeAccessible: "公開履歴書PDFを開く（新しいタブ）",
      schematic: "取り組む領域 · 概念スケッチ",
      schematicCaption: "モデルと、その使い道をつなぎます。",
      proofLabel: "担当事例 / 音声認識",
      proofContext: "Parakeet STTのファインチューニング · 非ネイティブ児童音声のWER",
      proofLink: "AI評価プロジェクトを見る",
    },
    work: {
      eyebrow: "01 / 主なプロジェクト",
      title: "取り組んだ仕事と、担当範囲。",
      intro: "本番サービスの改善からプロトタイプの検証まで。成果だけでなく、それぞれの範囲と条件も紹介します。",
      contribution: "担当した部分",
      scope: "範囲と条件",
      readCase: "プロジェクト詳細",
      sourceCode: "公開コード",
      allProjects: "すべてのプロジェクト",
      archive: "その他の業務・個人プロジェクトは、既存のアーカイブでご覧いただけます。",
      evidence: "結果と評価条件",
      mcpDiagram: "連携の概念図 · プロトタイプ",
      ganDiagram: "手法の概念図 · PoC",
    },
    practice: {
      eyebrow: "02 / 取り組む領域",
      title: ["モデルの先に、", "使えるつながりを。"],
      intro: "モデルの品質と同じくらい、使われる条件も大切です。モデル改善、評価、推論サービス、インターフェースの間で、必要な部分を担当してきました。",
      portraitAlt: "キム・カンナムのプロフィール写真",
      fullResume: "職務経歴と履歴書",
      capabilities: [
        {
          title: "音声・画像モデルの改善",
          body: "児童音声のSTT調整と視線・姿勢評価モデルに取り組み、検証結果と実用的なCPU推論の条件を考慮しました。",
          tools: ["PyTorch", "Hugging Face", "Parakeet", "MediaPipe"],
        },
        {
          title: "推論サービスと検索",
          body: "Azure ML評価推論パイプラインの実装・運用に携わり、BM25とベクトル検索を組み合わせて内部評価でLLM呼び出しコストを検討しました。",
          tools: ["Azure ML", "FastAPI", "ONNX", "BM25 + Vector"],
        },
        {
          title: "AIとツールの接点",
          body: "Unreal Engine MCPのプロトタイプモジュールで、非同期処理、N:M接続、ツールの動的登録を実装しました。",
          tools: ["MCP", "C++", "Python", "Unreal Engine"],
        },
      ],
    },
    contact: {
      eyebrow: "03 / 連絡先",
      title: ["次の課題を、", "一緒に考える。"],
      body: "プロジェクトへのご質問や協業のご相談は、メールでお気軽にご連絡ください。",
      emailLabel: "メールを送る",
      resume: "履歴書を見る",
      backToTop: "ページ先頭へ",
    },
    footer: "主な取り組みの記録 · Studio B プレビュー",
  },
};

const editorial: Record<Locale, Record<StudioSlug, ProjectEditorial>> = {
  ko: {
    "ai-assessment": {
      stage: "운영 서비스 · 기여",
      category: "음성 / 비전 / 추론 서비스",
      summary: "월간 약 3만 명의 학생 평가에 활용된 Azure ML 추론 파이프라인의 설계·배포·운영에 기여했습니다.",
      contribution: "Parakeet STT 파인튜닝, MediaPipe 기반 시선·자세 평가 모델, BM25+벡터 검색을 개선했습니다.",
      boundary: "월간 이용 규모는 평가 추론 파이프라인 기준입니다. LLM 에이전트의 배포 규모를 뜻하지 않습니다.",
      tools: ["Azure ML", "Parakeet", "MediaPipe", "Hybrid Search"],
      metrics: [
        { value: "9.6% → 4.4%", label: "음성 인식 WER", context: "Parakeet STT 파인튜닝 · 비원어민 어린이 음성" },
        { value: "98.77%", label: "시선·자세 평가 F1", context: "검증 데이터 기준 · MediaPipe 기반 모델" },
        { value: "최대 약 20%", label: "LLM 호출 절감", context: "동일 품질 기준의 내부 로그 평가 · BM25 + 벡터 검색" },
      ],
    },
    "ue5-mcp": {
      stage: "프로토타입 / PoC · 모듈 기여",
      category: "AI / 게임 엔진 인터페이스",
      summary: "자연어로 엔진 오브젝트를 제어하는 MCP 플러그인 프로토타입에서 연동 모듈 구현에 기여했습니다.",
      contribution: "비동기 처리, N:M 연결, 동적 툴 등록으로 AI와 Unreal Engine 사이의 인터페이스를 구현했습니다.",
      boundary: "프로토타입/PoC 단계의 모듈 기여이며, 완성된 플랫폼의 상용 배포 성과가 아닙니다.",
      tools: ["MCP", "C++", "Python", "Unreal Engine 5"],
    },
    "face-to-character": {
      stage: "PoC · 엔진 연동 미완료",
      category: "비전 / 생성 모델",
      summary: "얼굴 이미지에서 캐릭터 파라미터를 추정하는 PoC입니다. 미분 불가능한 렌더러 대신 GAN을 미분 가능한 proxy로 사용했습니다.",
      contribution: "데이터 준비, GAN 구현·학습, 정성적 결과 평가를 수행하고 GAN·VAE·autoencoder 접근을 비교했습니다.",
      boundary: "결과는 PoC 범위로 한정되며, 게임 엔진 연동은 완료하지 않았습니다.",
      tools: ["PyTorch", "GAN", "Face Landmarks"],
    },
  },
  en: {
    "ai-assessment": {
      stage: "Production · contributions",
      category: "SPEECH / VISION / INFERENCE",
      summary: "Contributed to the design, deployment, and operation of an Azure ML inference pipeline used to assess approximately 30K students monthly.",
      contribution: "Fine-tuned Parakeet STT, built MediaPipe-based gaze/posture assessment models, and improved retrieval with BM25 + vector search.",
      boundary: "Monthly usage refers to the assessment inference pipeline, not the deployment scale of LLM agents.",
      tools: ["Azure ML", "Parakeet", "MediaPipe", "Hybrid Search"],
      metrics: [
        { value: "9.6% → 4.4%", label: "Speech recognition WER", context: "Parakeet STT fine-tuning · non-native children’s speech" },
        { value: "98.77%", label: "Gaze/posture F1", context: "Validation data · MediaPipe-based model" },
        { value: "Up to ~20%", label: "Fewer LLM calls", context: "Internal log-based evaluation at matched quality · BM25 + vector" },
      ],
    },
    "ue5-mcp": {
      stage: "Prototype / PoC · module contribution",
      category: "AI / GAME-ENGINE INTERFACES",
      summary: "Contributed an integration module to a prototype MCP plugin for controlling engine objects through natural language.",
      contribution: "Implemented asynchronous processing, many-to-many connections, and dynamic tool registration between AI and Unreal Engine.",
      boundary: "A prototype/PoC module contribution, not an end-to-end platform shipped to production.",
      tools: ["MCP", "C++", "Python", "Unreal Engine 5"],
    },
    "face-to-character": {
      stage: "PoC · engine integration incomplete",
      category: "VISION / GENERATIVE MODELS",
      summary: "A PoC for estimating character parameters from facial images, using a GAN as a differentiable proxy instead of a non-differentiable renderer.",
      contribution: "Prepared data, implemented and trained the GAN, evaluated results qualitatively, and compared GAN, VAE, and autoencoder approaches.",
      boundary: "Results are limited to a PoC. Game-engine integration was not completed.",
      tools: ["PyTorch", "GAN", "Face Landmarks"],
    },
  },
  ja: {
    "ai-assessment": {
      stage: "本番運用 · 担当範囲",
      category: "音声 / 画像 / 推論サービス",
      summary: "月間約3万人の学生の評価に使われたAzure ML推論パイプラインの設計・デプロイ・運用に携わりました。",
      contribution: "Parakeet STTの調整、MediaPipeによる視線・姿勢評価モデルの実装、BM25とベクトル検索による検索改善を担当しました。",
      boundary: "月間利用規模は評価推論パイプラインのものです。LLMエージェントの展開規模を示すものではありません。",
      tools: ["Azure ML", "Parakeet", "MediaPipe", "Hybrid Search"],
      metrics: [
        { value: "9.6% → 4.4%", label: "音声認識 WER", context: "Parakeet STTの調整 · 非ネイティブ児童の音声" },
        { value: "98.77%", label: "視線・姿勢評価 F1", context: "検証データでの結果 · MediaPipeベースのモデル" },
        { value: "最大約20%", label: "LLM呼び出し削減", context: "同一品質基準の内部ログ評価 · BM25 + ベクトル検索" },
      ],
    },
    "ue5-mcp": {
      stage: "プロトタイプ / PoC · モジュール担当",
      category: "AI / ゲームエンジン連携",
      summary: "自然言語でエンジンのオブジェクトを操作するMCPプラグインのプロトタイプで、連携モジュールの実装を担当しました。",
      contribution: "AIとUnreal Engineの間で、非同期処理、N:M接続、ツールの動的登録を実装しました。",
      boundary: "プロトタイプ/PoC段階のモジュール担当です。完成したプラットフォームの本番提供実績ではありません。",
      tools: ["MCP", "C++", "Python", "Unreal Engine 5"],
    },
    "face-to-character": {
      stage: "PoC · エンジン連携は未完了",
      category: "画像 / 生成モデル",
      summary: "顔画像からキャラクターパラメータを推定するPoCです。微分不可能なレンダラーの代わりに、GANを微分可能なproxyとして使いました。",
      contribution: "データ準備、GANの実装・学習、定性評価を担当し、GAN・VAE・autoencoderの手法を比較しました。",
      boundary: "成果はPoCの範囲に限られます。ゲームエンジンとの連携は完了していません。",
      tools: ["PyTorch", "GAN", "Face Landmarks"],
    },
  },
};

export function getStudioData(locale: Locale) {
  return {
    copy: copy[locale],
    home: localePath("/", locale),
    resumePage: localePath("/resume/", locale),
    projectArchive: localePath("/projects/", locale),
    projects: studioSlugs.map((slug) => {
      const publicProject = getProjectData(slug, locale);
      return {
        slug,
        title: publicProject.title,
        company: publicProject.company,
        period: publicProject.period,
        github: publicProject.github,
        href: localePath(`/projects/${slug}/`, locale),
        ...editorial[locale][slug],
      };
    }),
  };
}
