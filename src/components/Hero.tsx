"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import AnimatedGlow from "@/components/motion/AnimatedGlow";

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

export default function Hero() {
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
            <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald" />
            Développement web & applications sur mesure
          </motion.span>

          <motion.h1
            variants={ITEM}
            className="mt-8 max-w-4xl text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-6xl"
          >
            Site web et application web{" "}
            <span className="text-gradient">sur mesure</span>
          </motion.h1>

          <motion.p
            variants={ITEM}
            className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted"
          >
            De l&apos;idée au déploiement, nous concevons et développons votre site
            ou application — sur mesure, avec un accompagnement dans la
            durée.
          </motion.p>

          <motion.div
            variants={ITEM}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/portail/devis/nouveau"
                className="block rounded-full bg-foreground px-7 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
              >
                Demander un devis
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/portfolio"
                className="block rounded-full border border-border px-7 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent-cyan/60 hover:bg-surface"
              >
                Voir nos réalisations
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          variants={ITEM}
          className="mt-20 grid grid-cols-2 gap-6 sm:grid-cols-4"
        >
          {[
            { label: "Approche", value: "Sur mesure" },
            { label: "Accompagnement", value: "De A à Z" },
            { label: "Stack", value: "Moderne" },
            { label: "Délai", value: "Sur devis" },
          ].map((item) => (
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
