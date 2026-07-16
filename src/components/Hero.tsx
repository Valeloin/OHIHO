"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import AnimatedGlow from "@/components/motion/AnimatedGlow";
import type { HeroContent } from "@/lib/content/types";

const CONTAINER: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const ITEM: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero({ data }: { data: HeroContent }) {
  return (
    <section className="relative overflow-hidden bg-grid">
      <AnimatedGlow variant="hero" />

      <motion.div
        className="relative mx-auto max-w-6xl px-6 pb-24 pt-20 sm:pt-28"
        variants={CONTAINER}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center text-center">
          <motion.span
            variants={ITEM}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-muted"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-emerald opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-emerald" />
            </span>
            {data.badge}
          </motion.span>

          <motion.h1
            variants={ITEM}
            className="mt-8 max-w-6xl text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-6xl"
          >
            {data.titleLead}{" "}
            <span className="text-gradient">{data.titleAccent}</span>
          </motion.h1>

          <motion.p
            variants={ITEM}
            className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted"
          >
            {data.subtitle}
          </motion.p>

          <motion.div
            variants={ITEM}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/portail/devis/nouveau"
                className="btn-accent block rounded-full px-7 py-3 text-sm font-semibold"
              >
                {data.ctaPrimary}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/#portfolio"
                className="block rounded-full border border-border px-7 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent-cyan/60 hover:bg-surface"
              >
                {data.ctaSecondary}
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          variants={ITEM}
          className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4"
        >
          {data.stats.map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ y: -4 }}
              className="card-surface rounded-2xl px-4 py-5 text-center transition-colors hover:border-accent-cyan/40"
            >
              <p className="font-mono text-sm font-semibold text-accent-cyan">
                {item.value}
              </p>
              <p className="mt-1 text-xs text-muted">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
