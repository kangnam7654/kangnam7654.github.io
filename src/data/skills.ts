export interface SkillCategory {
  title: string;
  icon: string;
  items: string[];
  size: "large" | "medium" | "small";
}

export const skills: SkillCategory[] = [
  {
    title: "Frameworks & Libraries",
    icon: "🧠",
    items: [
      "PyTorch",
      "PyTorch Lightning",
      "HuggingFace",
      "Transformers",
      "LangChain",
      "LangGraph",
      "FastAPI",
      "Gradio",
      "Streamlit",
      "W&B",
    ],
    size: "large",
  },
  {
    title: "Languages",
    icon: "💻",
    items: ["Python", "C++"],
    size: "small",
  },
  {
    title: "Cloud & Infra",
    icon: "☁️",
    items: ["Azure ML", "Blob Storage", "Docker", "WSL"],
    size: "medium",
  },
  {
    title: "Data & Vision",
    icon: "📊",
    items: ["OpenCV", "FFmpeg", "Pandas", "Polars", "NumPy", "Matplotlib"],
    size: "medium",
  },
  {
    title: "Dev Tools",
    icon: "🛠️",
    items: ["VS Code", "GitHub", "GitHub Copilot", "Jira", "Confluence"],
    size: "medium",
  },
  {
    title: "Others",
    icon: "🎮",
    items: ["Unreal Engine"],
    size: "small",
  },
];
