export interface Education {
  school: string;
  degree: string;
  period: string;
  note?: string;
}

export const education: Education[] = [
  {
    school: "서강대학교 AI·SW 대학원",
    degree: "데이터사이언스 · 인공지능",
    period: "2023.03 ~ 재학중",
    note: "성적 우수 장학금 1회 (2023년 가을)",
  },
  {
    school: "세종대학교",
    degree: "물리학, 이학사",
    period: "",
  },
];
