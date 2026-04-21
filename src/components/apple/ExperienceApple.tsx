import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Experience } from "../../i18n/data/experience";

interface Props {
  experiences: Experience[];
  eyebrow: string;
  title: string;
}

export default function ExperienceApple({ experiences, eyebrow, title }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [vw, setVw] = useState(1440);

  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const gap = 24;
  const cardWidth = Math.min(440, vw - 80);
  const padding = Math.max(24, Math.min(vw * 0.08, 120));
  const trackWidth = experiences.length * (cardWidth + gap) - gap;
  const startX = padding;
  const endX = vw - trackWidth - padding;

  const x = useTransform(scrollYProgress, [0, 1], [startX, endX]);

  const sectionHeight = Math.max(220, experiences.length * 55);

  return (
    <section
      ref={ref}
      className="relative"
      style={{ height: `${sectionHeight}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="px-6 pt-16 md:px-10 md:pt-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-primary)]"
          >
            {eyebrow}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-[family-name:var(--font-heading)] text-4xl font-bold md:text-6xl"
          >
            {title}
          </motion.h2>
        </div>

        <div className="flex flex-1 items-center">
          <motion.div style={{ x }} className="flex gap-6 will-change-transform">
            {experiences.map((exp, i) => (
              <Card
                key={i}
                exp={exp}
                index={i}
                width={cardWidth}
                scrollYProgress={scrollYProgress}
                total={experiences.length}
              />
            ))}
          </motion.div>
        </div>

        <ProgressBar
          count={experiences.length}
          scrollYProgress={scrollYProgress}
        />
      </div>
    </section>
  );
}

function Card({
  exp,
  index,
  width,
  scrollYProgress,
  total,
}: {
  exp: Experience;
  index: number;
  width: number;
  scrollYProgress: any;
  total: number;
}) {
  // 카드별 개별 진행률 0~1 (해당 카드가 중앙에 가까워질수록 1에 근접)
  const center = total <= 1 ? 0.5 : index / (total - 1);
  const span = 0.5;
  const focus = useTransform(
    scrollYProgress,
    [Math.max(0, center - span), center, Math.min(1, center + span)],
    [0.4, 1, 0.4]
  );
  const scale = useTransform(focus, [0.4, 1], [0.92, 1]);
  const opacity = useTransform(focus, [0.4, 1], [0.45, 1]);

  return (
    <motion.article
      style={{ width: `${width}px`, scale, opacity }}
      className="relative flex h-[62vh] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)]/55 p-8 backdrop-blur-xl md:p-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
        style={{
          background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
          opacity: 0.18,
        }}
      />
      <div className="relative">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg)]/60 text-xs font-bold text-[var(--color-primary)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-xs font-medium uppercase tracking-widest text-[var(--color-text-secondary)]">
            {exp.period}
          </span>
        </div>
        <h3 className="mb-1 text-2xl font-bold md:text-3xl">{exp.company}</h3>
        <p className="mb-1 text-sm text-[var(--color-text-secondary)]">
          {exp.role} · {exp.team}
        </p>
        {exp.project && (
          <p className="mb-5 text-sm font-medium text-[var(--color-accent)]">
            {exp.project}
          </p>
        )}
      </div>

      <ul className="relative space-y-2.5 text-sm text-[var(--color-text-secondary)]">
        {exp.highlights.slice(0, 4).map((h, j) => (
          <li key={j} className="flex gap-2.5">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-primary)]" />
            <span className="line-clamp-3">{h}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

function ProgressBar({
  count,
  scrollYProgress,
}: {
  count: number;
  scrollYProgress: any;
}) {
  const pct = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <div className="px-6 pb-10 md:px-10">
      <div className="flex items-center gap-4">
        <span className="text-xs font-medium text-[var(--color-text-secondary)]">
          01
        </span>
        <div className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-[var(--color-border)]">
          <motion.div
            style={{ width: pct }}
            className="absolute inset-y-0 left-0 bg-[var(--color-primary)]"
          />
        </div>
        <span className="text-xs font-medium text-[var(--color-text-secondary)]">
          {String(count).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
