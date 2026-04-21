import { motion } from "framer-motion";

interface Props {
  items: string[];
}

export default function MarqueeApple({ items }: Props) {
  const doubled = [...items, ...items];
  return (
    <section className="relative overflow-hidden border-y border-[var(--color-border)] bg-[var(--color-surface)]/30 py-10 backdrop-blur-sm">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-[family-name:var(--font-heading)] text-5xl font-extrabold tracking-tight text-[var(--color-text-secondary)]/30 md:text-7xl"
          >
            {item}
            <span className="mx-6 text-[var(--color-primary)]/40">·</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}
