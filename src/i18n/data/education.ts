import type { Locale } from "../utils";

export interface Thesis {
  title: string;
  titleEn: string;
  advisor: string;
  date: string;
  keywords: string[];
  link: string;
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  note?: string;
  thesis?: Thesis;
}

export interface Certification {
  name: string;
  date: string;
}

const educationData: Record<Locale, { education: Education[]; certifications: Certification[] }> = {
  ko: {
    education: [
      {
        school: "서강대학교 AI·SW 대학원",
        degree: "데이터사이언스 · 인공지능, 공학석사",
        period: "2023.03 ~ 2026.02",
        note: "성적 우수 장학금 1회 (2023년 가을)",
        thesis: {
          title: "줄거리 임베딩 결합을 통한 LightGCN 기반 영화 추천 시스템의 성능 향상 연구",
          titleEn: "Improving LightGCN-based Movie Recommendation Performance via Plot Embedding Integration",
          advisor: "소정민",
          date: "2026.01",
          keywords: ["Recommender Systems", "GNN", "LightGCN", "LLM"],
          link: "https://dcollection.sogang.ac.kr/dcollection/srch/srchDetail/000000082487",
        },
      },
      {
        school: "세종대학교",
        degree: "물리학, 이학사",
        period: "",
      },
    ],
    certifications: [
      { name: "AICE (AI Certificate for Everyone), Basic", date: "2022.11" },
      { name: "ADsP (Advanced Data Analytics Semi-Professional)", date: "2022.06" },
    ],
  },
  en: {
    education: [
      {
        school: "Sogang University, AI·SW Graduate School",
        degree: "Data Science & AI, M.Eng.",
        period: "2023.03 ~ 2026.02",
        note: "Academic Excellence Scholarship (Fall 2023)",
        thesis: {
          title: "줄거리 임베딩 결합을 통한 LightGCN 기반 영화 추천 시스템의 성능 향상 연구",
          titleEn: "Improving LightGCN-based Movie Recommendation Performance via Plot Embedding Integration",
          advisor: "Jeongmin So",
          date: "2026.01",
          keywords: ["Recommender Systems", "GNN", "LightGCN", "LLM"],
          link: "https://dcollection.sogang.ac.kr/dcollection/srch/srchDetail/000000082487",
        },
      },
      {
        school: "Sejong University",
        degree: "Physics, B.S.",
        period: "",
      },
    ],
    certifications: [
      { name: "AICE (AI Certificate for Everyone), Basic", date: "2022.11" },
      { name: "ADsP (Advanced Data Analytics Semi-Professional)", date: "2022.06" },
    ],
  },
  ja: {
    education: [
      {
        school: "西江大学校 AI·SW大学院",
        degree: "データサイエンス・人工知能、工学修士",
        period: "2023.03 ~ 2026.02",
        note: "成績優秀奨学金1回（2023年秋）",
        thesis: {
          title: "줄거리 임베딩 결합을 통한 LightGCN 기반 영화 추천 시스템의 성능 향상 연구",
          titleEn: "Improving LightGCN-based Movie Recommendation Performance via Plot Embedding Integration",
          advisor: "ソ・ジョンミン",
          date: "2026.01",
          keywords: ["Recommender Systems", "GNN", "LightGCN", "LLM"],
          link: "https://dcollection.sogang.ac.kr/dcollection/srch/srchDetail/000000082487",
        },
      },
      {
        school: "世宗大学校",
        degree: "物理学、理学士",
        period: "",
      },
    ],
    certifications: [
      { name: "AICE (AI Certificate for Everyone), Basic", date: "2022.11" },
      { name: "ADsP (Advanced Data Analytics Semi-Professional)", date: "2022.06" },
    ],
  },
};

export function getEducationData(locale: Locale) {
  return educationData[locale];
}
