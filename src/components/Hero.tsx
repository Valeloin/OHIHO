"use client";

import { useState, type ReactNode } from "react";
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
  // `null` = la vitrine tourne toute seule. Un numéro = le visiteur a choisi
  // sa scène ; recliquer la même puce rend la main à la rotation.
  const [scene, setScene] = useState<number | null>(null);

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

          {/* Vitrine. Elle tourne seule tant que le visiteur n'a rien
              choisi ; cliquer une puce fige la scène correspondante. La
              rotation reste du CSS pur, `pv-manual` ne fait que la
              neutraliser — voir globals.css. */}
          <motion.div
            variants={ITEM}
            className={`order-3 lg:order-none ${scene ? "pv-manual" : ""}`}
            data-scene={scene ?? undefined}
          >
            {/* Libellé de la formule en cours : les 4 se relaient en
                fondu sur l'horloge des scènes (pv-title-1..4). */}
            <div aria-hidden="true" className="relative mb-3 h-7">
              {formulaLabels.map((label, i) => (
                <span
                  key={label}
                  className={`pv-title-${i + 1} absolute inset-0 flex items-center justify-center text-center font-mono text-xs uppercase tracking-[0.18em] text-brand-teal`}
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Puces de progression, CLIQUABLES : elles suivent la scène en
                automatique, et permettent de la choisir à la main. */}
            {/* Marge réduite : les boutons portent désormais eux-mêmes leur
                rembourrage vertical pour la cible tactile. */}
            <div className="mb-1 flex justify-center gap-1">
              {formulaLabels.map((label, i) => {
                const n = i + 1;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setScene(scene === n ? null : n)}
                    aria-label={`Voir la vignette ${label}`}
                    aria-pressed={scene === n}
                    /* `px-2 py-4` : le trait ne fait que 4 px de haut, c'est
                       le bouton autour qui doit offrir la cible tactile.
                       Elle passe de 32 × 20 à 48 × 44. */
                    className="group flex items-center rounded-full px-2 py-5 focus-visible:outline-none"
                  >
                    <span className="relative block h-1 w-8 overflow-hidden rounded-full bg-border transition-colors group-hover:bg-border/60 group-focus-visible:ring-2 group-focus-visible:ring-accent-cyan/60">
                      <span
                        className={`pv-scene-${n} absolute inset-0 rounded-full bg-brand-teal`}
                      />
                    </span>
                  </button>
                );
              })}
            </div>

            <div aria-hidden="true" className="card-surface p-2">
              {showcase}
            </div>
          </motion.div>
        </div>

        {/* UNE SEULE carte autour des quatre arguments, et non quatre boîtes.
            Individuellement encadrés, ils alourdissaient le bas du hero ;
            sans aucun cadre, le bloc flottait sans structure. Un cadre
            commun les tient ensemble tout en les laissant respirer, séparés
            par la seule gouttière de la grille. */}
        <motion.div variants={ITEM} className="card-surface mt-14 px-6 py-6 sm:px-8">
          {/* UNE colonne sous `sm`, et non deux. À 375 px de large, deux
              colonnes ne laissaient que 73 px au texte : les descriptions
              tombaient sur 6 à 10 lignes et le mot-clé « Interface web »
              débordait de sa cellule. Sur toute la largeur, chacune tient
              sur deux lignes. */}
          <dl className="grid grid-cols-1 gap-x-6 gap-y-6 min-[420px]:grid-cols-2 sm:grid-cols-4 sm:gap-y-8">
            {data.stats.map((item, i) => (
              // Le pictogramme passe À GAUCHE du texte plutôt qu'au-dessus :
              // empilé, il laissait une bande vide en haut de chaque colonne
              // et c'est ce qui donnait à la carte son air désert. Ici il
              // occupe la largeur perdue, et le bloc est plus dense.
              <div key={item.label} className="flex gap-3.5">
                <div className="shrink-0">
                  <StatGlyph index={i} />
                </div>
                <div className="min-w-0">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-brand-teal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* `value` porte le mot-clé court, `label` la phrase qui
                      l'explique : c'est donc le mot-clé qui fait office de
                      terme (dt) et la phrase de définition (dd). Elle reste en
                      casse normale : en capitales espacées, illisible. */}
                  <dt className="mt-1 text-lg font-semibold tracking-display">
                    {item.value}
                  </dt>
                  <dd className="mt-1.5 text-[0.8125rem] leading-[1.5] text-muted">
                    {item.label}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </motion.div>
      </motion.div>
    </section>
  );
}
