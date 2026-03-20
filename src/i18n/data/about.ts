import type { Locale } from "../utils";

interface AboutData {
  paragraphs: string[];
  tags: string[];
}

const aboutData: Record<Locale, AboutData> = {
  ko: {
    paragraphs: [
      '<span class="text-[var(--color-text)] font-medium">Vision·Audio·LLM 등 다양한 AI 기술로 서비스를 설계하고 배포해 온 AI 엔지니어</span>입니다. 어린이 영어 학습, 메타버스, B2B 솔루션 등 다양한 도메인에서 서비스 배포부터 PoC까지 폭넓은 경험을 쌓았습니다.',
      'LLM, 이미지, 음성, 추천 시스템 등 다양한 도메인에서 모델 학습, 추론 최적화, 배포까지 전방위적 경험을 쌓아왔습니다. from-scratch 학습 파이프라인 구성, Azure ML을 활용한 클라우드 배포 등 end-to-end 개발을 수행할 수 있습니다.',
      '또한 <span class="text-[var(--color-text)] font-medium">AI 도구를 활용한 개발 생산성 극대화</span>를 추구합니다. Claude Code, GitHub Copilot 등을 일상적으로 활용하며, 이 포트폴리오 사이트 자체도 Claude Code와의 협업으로 설계부터 구현까지 완성했습니다. AI를 만드는 것뿐 아니라, AI와 함께 일하는 방식에도 전문성을 갖추고 있습니다.',
    ],
    tags: [
      "LLM / Agent", "Computer Vision", "Speech (STT/TTS)", "Search System",
      "Recommender", "MCP", "Unreal Engine", "MLOps", "PyTorch", "Azure ML", "FastAPI",
    ],
  },
  en: {
    paragraphs: [
      'An <span class="text-[var(--color-text)] font-medium">AI Engineer who has designed and deployed services using diverse AI technologies including Vision, Audio, and LLM</span>. Gained broad experience from service deployment to PoC across domains such as children\'s English learning, metaverse, and B2B solutions.',
      'Built comprehensive experience across LLM, image, speech, and recommender systems — from model training and inference optimization to deployment. Capable of end-to-end development including from-scratch training pipelines and cloud deployment with Azure ML.',
      'Also pursues <span class="text-[var(--color-text)] font-medium">maximizing development productivity with AI tools</span>. Regularly uses Claude Code, GitHub Copilot, and more. This portfolio site itself was designed and implemented through collaboration with Claude Code. Expert not only in building AI, but also in working with AI.',
    ],
    tags: [
      "LLM / Agent", "Computer Vision", "Speech (STT/TTS)", "Search System",
      "Recommender", "MCP", "Unreal Engine", "MLOps", "PyTorch", "Azure ML", "FastAPI",
    ],
  },
  ja: {
    paragraphs: [
      '<span class="text-[var(--color-text)] font-medium">Vision・Audio・LLMなど多様なAI技術でサービスを設計・デプロイしてきたAIエンジニア</span>です。子供向け英語学習、メタバース、B2Bソリューションなど多様なドメインで、サービスデプロイからPoCまで幅広い経験を積みました。',
      'LLM、画像、音声、レコメンドシステムなど多様なドメインで、モデル学習、推論最適化、デプロイまで全方位的な経験を積んできました。スクラッチからの学習パイプライン構築、Azure MLを活用したクラウドデプロイなど、エンドツーエンドの開発が可能です。',
      'また、<span class="text-[var(--color-text)] font-medium">AIツールを活用した開発生産性の最大化</span>を追求しています。Claude Code、GitHub Copilotなどを日常的に活用し、このポートフォリオサイト自体もClaude Codeとのコラボレーションで設計から実装まで完成しました。AIを作るだけでなく、AIと共に働く方法にも専門性を持っています。',
    ],
    tags: [
      "LLM / Agent", "Computer Vision", "Speech (STT/TTS)", "Search System",
      "Recommender", "MCP", "Unreal Engine", "MLOps", "PyTorch", "Azure ML", "FastAPI",
    ],
  },
};

export function getAboutData(locale: Locale): AboutData {
  return aboutData[locale];
}
