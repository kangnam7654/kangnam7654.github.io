import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type MouseEvent } from "react";

interface Props {
  eyebrow: string;
  title: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}

export default function CtaApple({ eyebrow, title, primary, secondary }: Props) {
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl text-center">
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
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 font-[family-name:var(--font-heading)] text-5xl font-extrabold leading-tight tracking-tight md:text-7xl"
        >
          {title}
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-4">
          <MagneticButton href={primary.href} variant="primary">
            {primary.label}
          </MagneticButton>
          <MagneticButton href={secondary.href} variant="ghost">
            {secondary.label}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

function MagneticButton({
  children,
  href,
  variant,
}: {
  children: React.ReactNode;
  href: string;
  variant: "primary" | "ghost";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.3);
    y.set((e.clientY - cy) * 0.3);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "relative inline-flex items-center justify-center rounded-full px-10 py-4 font-semibold transition-shadow duration-300";
  const cls =
    variant === "primary"
      ? `${base} bg-[var(--color-primary)] text-[var(--color-bg)] hover:shadow-[0_0_40px_rgba(0,212,255,0.5)]`
      : `${base} border border-[var(--color-border)] bg-[var(--color-surface)]/50 text-[var(--color-text)] backdrop-blur-md hover:border-[var(--color-primary)]/40`;

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={cls}
    >
      {children}
    </motion.a>
  );
}
