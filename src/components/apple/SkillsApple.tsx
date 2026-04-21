import { motion } from "framer-motion";
import { useRef, useState, type MouseEvent } from "react";
import { skills } from "../../data/skills";

interface Props {
  eyebrow: string;
  title: string;
}

export default function SkillsApple({ eyebrow, title }: Props) {
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
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
          className="mb-16 font-[family-name:var(--font-heading)] text-4xl font-bold md:text-6xl"
        >
          {title}
        </motion.h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[minmax(180px,auto)]">
          {skills.map((category, i) => (
            <SpotlightCard
              key={category.title}
              index={i}
              size={category.size}
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="text-3xl">{category.icon}</span>
                <h4 className="font-semibold text-lg">{category.title}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)]/40 px-3 py-1.5 text-sm text-[var(--color-text-secondary)] transition-colors duration-200 hover:border-[var(--color-primary)]/40 hover:text-[var(--color-primary)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpotlightCard({
  children,
  index,
  size,
}: {
  children: React.ReactNode;
  index: number;
  size: "large" | "medium" | "small";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const sizeClass =
    size === "large"
      ? "md:col-span-2 md:row-span-2"
      : "md:col-span-1 md:row-span-1";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className={`group relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)]/50 p-6 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 ${sizeClass}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          opacity: visible ? 1 : 0,
          background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, var(--color-primary) 0%, transparent 40%)`,
          mixBlendMode: "overlay",
        }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
