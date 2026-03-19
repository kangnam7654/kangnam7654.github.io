import { useState } from "react";

export default function ResumeDownload() {
  const [loading, setLoading] = useState<string | null>(null);

  const download = async (format: "docx" | "pdf") => {
    setLoading(format);
    try {
      if (format === "docx") {
        const { generateDocx } = await import("../../utils/generateDocx");
        await generateDocx();
      } else {
        const { generatePdf } = await import("../../utils/generatePdf");
        await generatePdf();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-[var(--color-text-secondary)]">이력서</span>
      <button
        onClick={() => download("docx")}
        disabled={loading !== null}
        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/60 px-4 py-2 text-xs font-semibold text-[var(--color-text-secondary)] transition-all duration-200 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/30 disabled:opacity-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        {loading === "docx" ? "생성 중..." : ".docx"}
      </button>
      <button
        onClick={() => download("pdf")}
        disabled={loading !== null}
        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/60 px-4 py-2 text-xs font-semibold text-[var(--color-text-secondary)] transition-all duration-200 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/30 disabled:opacity-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        {loading === "pdf" ? "생성 중..." : ".pdf"}
      </button>
    </div>
  );
}
