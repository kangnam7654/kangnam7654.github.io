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

export const certifications: Certification[] = [
  { name: "AICE (AI Certificate for Everyone), Basic", date: "2022.11" },
  { name: "ADsP (Advanced Data Analytics Semi-Professional)", date: "2022.06" },
];

export const education: Education[] = [
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
];
