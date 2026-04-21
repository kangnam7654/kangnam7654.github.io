import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

interface Props {
  name: string;
  role: string;
  tagline: string;
}

export default function HeroApple({ name, role, tagline }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.72]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const blobScale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);
  const blobOpacity = useTransform(scrollYProgress, [0, 1], [0.7, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mx.set((e.clientX - cx) * 0.02);
      my.set((e.clientY - cy) * 0.02);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section ref={ref} className="relative h-[140vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ scale: blobScale, opacity: blobOpacity }}
        >
          <motion.div
            style={{ x: sx, y: sy }}
            className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] blur-[100px]"
          />
          <motion.div
            style={{ x: useTransform(sx, (v) => -v), y: useTransform(sy, (v) => -v) }}
            className="absolute right-[15%] top-[20%] h-[30vmin] w-[30vmin] rounded-full bg-[var(--color-accent)]/40 blur-[80px]"
          />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-bg)_80%)]" />

        <motion.div
          style={{ scale: titleScale, y: titleY, opacity: titleOpacity }}
          className="relative z-10 px-6 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-[var(--color-text-secondary)]"
          >
            {role}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-[family-name:var(--font-heading)] text-[clamp(3.5rem,12vw,10rem)] font-extrabold leading-[0.95] tracking-tight"
          >
            <span className="block">{name.split(" ")[0]}</span>
            <span className="block bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-secondary)] bg-clip-text text-transparent">
              {name.split(" ").slice(1).join(" ") || name}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mx-auto mt-8 max-w-2xl text-lg text-[var(--color-text-secondary)] md:text-xl"
          >
            {tagline}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-[var(--color-text-secondary)]"
        >
          Scroll
        </motion.div>
      </div>
    </section>
  );
}
