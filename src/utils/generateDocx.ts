import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  LevelFormat,
} from "docx";
import { saveAs } from "file-saver";
import { profile, summary, skills, career, education, certifications } from "../data/resume";

function hr() {
  return new Paragraph({
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 6, color: "A0A0A0", space: 1 },
    },
    spacing: { after: 100 },
  });
}

function heading(text: string) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 200, after: 100 },
    children: [
      new TextRun({ text, bold: true, size: 28, font: "Arial" }),
    ],
  });
}

function subheading(text: string) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 160, after: 60 },
    children: [
      new TextRun({ text, bold: true, size: 24, font: "Arial" }),
    ],
  });
}

function bodyText(text: string) {
  return new Paragraph({
    spacing: { after: 120, line: 300 },
    children: [
      new TextRun({ text, size: 20, font: "Arial" }),
    ],
  });
}

function bulletItem(text: string) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 60, line: 280 },
    children: [
      new TextRun({ text, size: 20, font: "Arial" }),
    ],
  });
}

export async function generateDocx() {
  const children: Paragraph[] = [];

  // Header
  children.push(
    new Paragraph({
      spacing: { after: 40 },
      children: [
        new TextRun({ text: `${profile.name} — ${profile.title}`, bold: true, size: 36, font: "Arial" }),
      ],
    })
  );

  children.push(
    new Paragraph({
      spacing: { after: 40 },
      children: [
        new TextRun({ text: `${profile.birth} ${profile.address} | 포트폴리오: ${profile.portfolio}`, size: 20, font: "Arial" }),
      ],
    })
  );

  children.push(
    new Paragraph({
      spacing: { after: 40 },
      children: [
        new TextRun({ text: `현재 연봉: ${profile.salary.current} | 희망 연봉: ${profile.salary.desired}`, size: 20, font: "Arial" }),
      ],
    })
  );

  children.push(hr());

  // Summary
  children.push(heading("요약"));
  for (const para of summary) {
    children.push(bodyText(para));
  }

  children.push(hr());

  // Skills
  children.push(heading("기술 스택"));
  for (const [category, value] of Object.entries(skills)) {
    children.push(
      new Paragraph({
        spacing: { after: 60 },
        children: [
          new TextRun({ text: `${category}: `, bold: true, size: 20, font: "Arial" }),
          new TextRun({ text: value, size: 20, font: "Arial" }),
        ],
      })
    );
  }

  children.push(hr());

  // Career
  children.push(heading("경력"));
  for (const job of career) {
    children.push(subheading(job.company));
    const meta = `${job.role} – ${job.team} | ${job.period}, ${job.location}${job.reason ? ` (퇴사 사유: ${job.reason})` : ""}`;
    children.push(
      new Paragraph({
        spacing: { after: 40 },
        children: [
          new TextRun({ text: meta, size: 20, font: "Arial", italics: true, color: "666666" }),
        ],
      })
    );
    if (job.project) {
      children.push(
        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({ text: job.project, bold: true, size: 20, font: "Arial" }),
          ],
        })
      );
    }
    for (const h of job.highlights) {
      children.push(bulletItem(h));
    }
  }

  children.push(hr());

  // Education
  children.push(heading("학력"));
  for (const edu of education) {
    const line = [edu.school, edu.major, edu.period, edu.location].filter(Boolean).join(" | ");
    children.push(
      new Paragraph({
        spacing: { after: 40 },
        children: [
          new TextRun({ text: line, bold: true, size: 20, font: "Arial" }),
        ],
      })
    );
    for (const d of edu.details) {
      children.push(bulletItem(d));
    }
  }

  children.push(hr());

  // Certifications
  children.push(heading("자격증 및 추가 교육"));
  for (const cert of certifications) {
    children.push(bodyText(cert));
  }

  const doc = new Document({
    numbering: {
      config: [
        {
          reference: "bullets",
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: "\u2022",
              alignment: AlignmentType.LEFT,
              style: {
                paragraph: { indent: { left: 720, hanging: 360 } },
              },
            },
          ],
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: 12240, height: 15840 },
            margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
          },
        },
        children,
      },
    ],
  });

  const buffer = await Packer.toBlob(doc);
  saveAs(buffer, `[이력서] ${profile.name}.docx`);
}
