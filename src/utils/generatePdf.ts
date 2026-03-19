import { profile, summary, skills, career, education, certifications } from "../data/resume";

function esc(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildHtml(): string {
  const skillsHtml = Object.entries(skills)
    .map(([k, v]) => `<p class="skill"><b>${esc(k)}:</b> ${esc(v)}</p>`)
    .join("");

  const careerHtml = career
    .map((job) => {
      const meta = `${job.role} – ${job.team} | ${job.period}, ${job.location}${job.reason ? ` (퇴사 사유: ${job.reason})` : ""}`;
      const proj = job.project ? `<p class="project">${esc(job.project)}</p>` : "";
      const items = job.highlights.map((h) => `<li>${esc(h)}</li>`).join("");
      return `<h3>${esc(job.company)}</h3><p class="meta">${esc(meta)}</p>${proj}<ul>${items}</ul>`;
    })
    .join("");

  const eduHtml = education
    .map((e) => {
      const line = [e.school, e.major, e.period, e.location].filter(Boolean).join(" | ");
      const items = e.details.map((d) => `<li>${esc(d)}</li>`).join("");
      return `<p class="edu"><b>${esc(line)}</b></p>${items ? `<ul>${items}</ul>` : ""}`;
    })
    .join("");

  return `<!DOCTYPE html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap" rel="stylesheet">
<style>
  @page { size: A4; margin: 15mm; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Noto Sans KR', sans-serif; color: #1a1a1a; font-size: 9.5pt; line-height: 1.6; padding: 0; }
  h1 { font-size: 18pt; margin-bottom: 4pt; }
  h2 { font-size: 13pt; margin: 14pt 0 6pt; border-bottom: 1px solid #ccc; padding-bottom: 3pt; }
  h3 { font-size: 11pt; margin: 10pt 0 2pt; }
  .info { font-size: 9pt; color: #444; margin: 1pt 0; }
  .meta { font-size: 8.5pt; color: #666; font-style: italic; }
  .project { font-weight: bold; margin: 4pt 0 2pt; }
  .skill { font-size: 9pt; margin: 1pt 0; }
  .summary { margin: 4pt 0; }
  .edu { margin: 4pt 0; }
  ul { margin: 2pt 0 6pt; padding-left: 16pt; }
  li { font-size: 9pt; margin: 1pt 0; }
</style></head><body>
  <h1>${esc(profile.name)} — ${esc(profile.title)}</h1>
  <p class="info">${profile.birth} ${profile.address} | 포트폴리오: ${profile.portfolio}</p>
  <p class="info">현재 연봉: ${profile.salary.current} | 희망 연봉: ${profile.salary.desired}</p>
  <h2>요약</h2>
  ${summary.map((s) => `<p class="summary">${esc(s)}</p>`).join("")}
  <h2>기술 스택</h2>
  ${skillsHtml}
  <h2>경력</h2>
  ${careerHtml}
  <h2>학력</h2>
  ${eduHtml}
  <h2>자격증 및 추가 교육</h2>
  ${certifications.map((c) => `<p>${esc(c)}</p>`).join("")}
</body></html>`;
}

export async function generatePdf() {
  const html = buildHtml();
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("팝업이 차단되었습니다. 팝업을 허용해주세요.");
    return;
  }
  printWindow.document.write(html);
  printWindow.document.close();

  // 폰트 로딩 대기 후 인쇄
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };
}
