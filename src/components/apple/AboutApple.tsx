import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface Props {
  paragraphs: string[];
  tags: string[];
  eyebrow: string;
  title: string;
}

export default function AboutApple({ paragraphs, tags, eyebrow, title }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={ref} className="relative">
      <div className="sticky top-0 flex min-h-screen items-center px-6 py-24">
        <div className="mx-auto w-full max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-primary)]"
          >
            {eyebrow}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 font-[family-name:var(--font-heading)] text-4xl font-bold leading-tight md:text-6xl"
          >
            {title}
          </motion.h2>

          <div className="space-y-10">
            {paragraphs.map((p, i) => {
              const start = 0.1 + i * 0.15;
              const end = start + 0.25;
              return (
                <Paragraph
                  key={i}
                  html={p}
                  scrollYProgress={scrollYProgress}
                  start={start}
                  end={end}
                />
              );
            })}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.04 } },
            }}
            className="mt-16 flex flex-wrap gap-3"
          >
            {tags.map((tag) => (
              <motion.span
                key={tag}
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 10 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/60 px-5 py-2 text-sm backdrop-blur-md"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Paragraph({
  html,
  scrollYProgress,
  start,
  end,
}: {
  html: string;
  scrollYProgress: any;
  start: number;
  end: number;
}) {
  const opacity = useTransform(scrollYProgress, [start, end], [0.25, 1]);
  const y = useTransform(scrollYProgress, [start, end], [20, 0]);
  return (
    <motion.p
      style={{ opacity, y }}
      className="text-lg leading-relaxed text-[var(--color-text-secondary)] md:text-2xl md:leading-relaxed"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
