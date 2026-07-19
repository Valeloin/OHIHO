"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import AnimatedGlow from "@/components/motion/AnimatedGlow";
import Starfield from "@/components/motion/Starfield";
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

// Hero calqué sur la banderole LinkedIn : fond nuit bleu-teal, halo teal au
// centre (AnimatedGlow) et ciel étoilé discret (Starfield), le tout immobile.
// Le seul mouvement est l'apparition initiale (framer-motion). Composition
// éditoriale alignée à gauche, titre large à chasse serrée.
export default function Hero({ data }: { data: HeroContent }) {
  return (
    <section className="relative overflow-hidden">
      <AnimatedGlow variant="hero" />
      <Starfield />

      <motion.div
        className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-center px-6 pb-24 pt-28 sm:pt-32"
        variants={CONTAINER}
        initial="hidden"
        animate="visible"
      >
        {/* Libellé mono capitales espacées, comme « ● WEB & DESIGN » sur la
            banderole : le point vert lumineux est fourni par `.kicker::before`. */}
        <motion.span variants={ITEM} className="kicker">
          {data.badge}
        </motion.span>

        <motion.h1
          variants={ITEM}
          className="mt-8 max-w-5xl text-balance text-5xl font-semibold leading-[1.05] tracking-display sm:text-7xl"
        >
          {/* Première ligne en blanc, seconde au dégradé de marque
              (bleu → teal → vert), comme sur la banderole. Dégradé STATIQUE. */}
          <span className="text-foreground">{data.titleLead}</span>{" "}
          <span className="text-gradient">{data.titleAccent}</span>
        </motion.h1>

        <motion.p
          variants={ITEM}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-muted"
        >
          {data.subtitle}
        </motion.p>

        <motion.div
          variants={ITEM}
          className="mt-12 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href="/portail/devis/nouveau"
            className="btn-accent px-7 py-3.5 text-center text-sm"
          >
            {data.ctaPrimary}
          </Link>
          <Link
            href="/#portfolio"
            className="btn-outline px-7 py-3.5 text-center text-sm font-semibold"
          >
            {data.ctaSecondary}
          </Link>
        </motion.div>

        {/* Rangée de chiffres : quatre cartes posées sur le fond nuit (aplat,
            filet, arrondi, ombre douce), sans encadrement autour du bloc. */}
        <motion.div variants={ITEM} className="mt-20">
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {data.stats.map((item) => (
              <div key={item.label} className="card-surface p-5">
                {/* Point vert lumineux, repris des pilules de la banderole. */}
                <span
                  aria-hidden="true"
                  className="mb-4 block h-2 w-2 rounded-full bg-brand-emerald shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                />
                {/* `value` porte le mot-clé court, `label` la phrase qui
                    l'explique : c'est donc le mot-clé qui fait office de terme
                    (dt) et la phrase de définition (dd). Elle reste en casse
                    normale — en capitales espacées elle serait illisible. */}
                <dt className="text-xl font-semibold tracking-display sm:text-2xl">
                  {item.value}
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-muted">
                  {item.label}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </motion.div>
    </section>
  );
}
