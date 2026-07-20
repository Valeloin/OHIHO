"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import AnimatedGlow from "@/components/motion/AnimatedGlow";
import Fireflies from "@/components/motion/Fireflies";
import StatGlyph from "@/components/motion/StatGlyph";
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
// centre (AnimatedGlow) et lucioles vertes qui clignotent (Fireflies).
//
// Deux colonnes : le texte à gauche, la vitrine tournante des 4 formules à
// droite. La vitrine arrive par la prop `showcase` plutôt que par un import :
// ce composant est client (framer-motion), et un import embarquerait les
// ~600 lignes de SVG des scènes dans le bundle client pour rien.
//
// `formulaLabels` accompagne la vitrine : les libellés se relaient sur la
// MÊME horloge CSS que les scènes (classes pv-title-*), l'ordre doit donc
// suivre celui de PROJECT_TYPES.
export default function Hero({
  data,
  formulaLabels,
  showcase,
}: {
  data: HeroContent;
  formulaLabels: string[];
  showcase: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      <AnimatedGlow variant="hero" />
      <Fireflies />

      <motion.div
        // Ni hauteur imposée ni centrage vertical : le hero fait exactement la
        // taille de son contenu. Avec `min-h-[88vh]` + `justify-center`, sur
        // un écran haut la section était étirée à 88 % de la fenêtre et son
        // contenu, centré dedans, creusait du vide en haut ET en bas — près
        // de 290 px au-dessus du premier mot sur un grand écran.
        // La règle du site est qu'une section TIENNE sur un écran, pas
        // qu'elle le remplisse.
        className="relative mx-auto flex max-w-7xl flex-col px-6 pb-20 pt-10 sm:pt-14"
        variants={CONTAINER}
        initial="hidden"
        animate="visible"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_minmax(0,27rem)]">
          {/* En mobile, `contents` dissout cette colonne : ses enfants
              deviennent des cellules de la grille, ce qui permet de glisser
              la vitrine entre le titre et le sous-titre (order-3) — sinon
              elle atterrit sous les boutons, hors écran au premier coup
              d'œil. Dès `lg` la colonne se reforme et les ordres tombent. */}
          <div className="contents lg:block">
            {/* Libellé mono capitales espacées, comme « ● WEB & DESIGN » sur
                la banderole : le point vert vient de `.kicker::before`. */}
            <motion.span variants={ITEM} className="kicker order-1">
              {data.badge}
            </motion.span>

            <motion.h1
              variants={ITEM}
              className="order-2 mt-8 text-balance text-4xl font-semibold leading-[1.05] tracking-display sm:text-6xl"
            >
              {/* Première ligne en blanc, seconde au dégradé de marque
                  (bleu → teal → vert), comme sur la banderole. STATIQUE. */}
              <span className="text-foreground">{data.titleLead}</span>{" "}
              <span className="text-gradient">{data.titleAccent}</span>
            </motion.h1>

            <motion.p
              variants={ITEM}
              className="order-4 mt-8 max-w-xl text-lg leading-relaxed text-muted"
            >
              {data.subtitle}
            </motion.p>

            <motion.div
              variants={ITEM}
              className="order-5 mt-10 flex flex-col gap-3 sm:flex-row"
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
          </div>

          {/* Vitrine tournante. Purement décorative : le contenu qu'elle
              illustre est déjà écrit en toutes lettres dans la section
              Services, d'où l'aria-hidden. */}
          <motion.div
            variants={ITEM}
            aria-hidden="true"
            className="order-3 lg:order-none"
          >
            {/* Libellé de la formule en cours : les 4 se relaient en
                fondu sur l'horloge des scènes (pv-title-1..4). */}
            <div className="relative mb-3 h-7">
              {formulaLabels.map((label, i) => (
                <span
                  key={label}
                  className={`pv-title-${i + 1} absolute inset-0 flex items-center justify-center text-center font-mono text-xs uppercase tracking-[0.18em] text-brand-teal`}
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Puces de progression : le segment actif suit la scène. */}
            <div className="mb-5 flex justify-center gap-2">
              {[1, 2, 3, 4].map((n) => (
                <span
                  key={n}
                  className="relative h-1 w-8 overflow-hidden rounded-full bg-border"
                >
                  <span
                    className={`pv-scene-${n} absolute inset-0 rounded-full bg-brand-teal`}
                  />
                </span>
              ))}
            </div>

            <div className="card-surface p-2">{showcase}</div>
          </motion.div>
        </div>

        {/* Rangée de chiffres. Chaque carte porte un pictogramme ANIMÉ qui
            illustre son propos, un index mono et un filet au dégradé de
            marque en tête — le simple point vert ne disait rien du contenu.
            Le filet s'allume au survol, comme les cartes de Services. */}
        <motion.div variants={ITEM} className="mt-16">
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {data.stats.map((item, i) => (
              <div
                key={item.label}
                className="card-surface group relative overflow-hidden p-5 transition-colors hover:border-accent-cyan/50"
              >
                <span
                  aria-hidden="true"
                  className="rule-brand absolute inset-x-0 top-0 h-px opacity-40 transition-opacity duration-300 group-hover:opacity-100"
                />
                <div className="flex items-start justify-between gap-3">
                  <StatGlyph index={i} />
                  <span className="font-mono text-xs text-brand-teal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                {/* `value` porte le mot-clé court, `label` la phrase qui
                    l'explique : c'est donc le mot-clé qui fait office de terme
                    (dt) et la phrase de définition (dd). Elle reste en casse
                    normale — en capitales espacées elle serait illisible. */}
                <dt className="mt-4 text-xl font-semibold tracking-display sm:text-2xl">
                  {item.value}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">
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
