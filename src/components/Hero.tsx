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
        {/* Gouttière de LIGNE nulle sous `lg`. À partir de `lg` la colonne de
            texte est un bloc : ses enfants s'espacent par leurs seules marges
            (mt-8, mt-10) et la gouttière de 48 px ne sert qu'entre les deux
            COLONNES. Sous `lg`, `contents` dissout la colonne et chaque bloc
            devient une rangée : la gouttière s'ajoutait alors à sa marge, ce
            qui creusait 88 px entre le sous-titre et les boutons au lieu de
            40. C'est le grand vide visible sur les écrans larges de
            téléphone (pliables, tablettes), entre 640 et 1024 px. */}
        <div className="grid items-center gap-x-12 gap-y-0 lg:gap-y-12 lg:grid-cols-[1fr_minmax(0,27rem)]">
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
            /* `mt-8` sous `lg` : la gouttière de ligne étant à zéro, c'est
               cette marge qui sépare la vitrine du titre au-dessus. À partir
               de `lg` la vitrine est une COLONNE, elle n'a plus rien à
               séparer verticalement. */
            className={`order-3 mt-8 lg:order-none lg:mt-0 ${scene ? "pv-manual" : ""}`}
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

            {/* SOURCE DE LUMIÈRE DERRIÈRE LA VITRINE.
                La carte se détachait à peine du fond nuit : elle avait l'air
                posée sur la page plutôt qu'éclairée. Trois nappes floutées,
                aux trois couleurs de marque, débordent du cadre et donnent
                l'impression qu'une lampe est allumée derrière lui.

                ⚠️ DEUX PIÈGES, tous deux vérifiés au calcul plutôt qu'à l'œil.

                1. Les dégradés doivent porter jusqu'à 100 % du rayon. Un
                   premier jet les arrêtait à 70 %, or la carte couvre 84 % du
                   halo : toute la partie lumineuse se retrouvait cachée
                   derrière elle et le halo était rigoureusement invisible.
                2. Les nappes doivent DÉBORDER du cadre — c'est ce débord qui
                   fait la lumière. Contenues, elles ne seraient qu'un fond de
                   carte.

                `-z-10` les place sous la vitrine ; le parent est `relative`
                pour qu'elles s'ancrent sur lui et non sur la section.
                Pour régler l'intensité, il n'y a que les trois alphas à
                toucher. */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-14 -z-10"
              >
                {/* Nappe centrale teal : le cœur de la source. */}
                <div
                  className="absolute inset-0 rounded-full blur-3xl"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(34,211,196,0.34) 0%, rgba(34,211,196,0.16) 55%, rgba(34,211,196,0) 100%)",
                  }}
                />
                {/* Bleu ciel en haut à gauche, vert émeraude en bas à droite :
                    le trio de marque se retrouve, dans le sens du dégradé. */}
                <div
                  className="absolute -left-8 -top-8 h-4/5 w-4/5 rounded-full blur-3xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(56,189,248,0.26) 0%, rgba(56,189,248,0) 100%)",
                  }}
                />
                <div
                  className="absolute -bottom-8 -right-8 h-4/5 w-4/5 rounded-full blur-3xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(52,211,153,0.26) 0%, rgba(52,211,153,0) 100%)",
                  }}
                />
              </div>

              <div aria-hidden="true" className="card-surface p-2">
                {showcase}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Les quatre arguments, désormais en CARTES individuelles plutôt
            qu'en colonnes séparées de filets dans un cadre commun. Le cadre
            unique laissait quatre pictogrammes nus flotter dans du vide, avec
            des filets pour seule structure — c'est ce que Valentin trouvait
            « moche ». Chaque argument est maintenant une petite carte à part
            entière : son pictogramme dans une tuile teintée de marque, son
            titre, sa phrase. Le bloc se lit comme une rangée de features,
            plus comme un tableau. */}
        <motion.div
          variants={ITEM}
          className="mt-10 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 xl:grid-cols-4"
        >
          {data.stats.map((item, i) => (
            <div
              key={item.label}
              className="group card-surface flex flex-col p-5 transition-colors hover:border-brand-teal/40"
            >
              {/* Pictogramme dans une TUILE teintée de marque, cerclée d'un
                  filet interne. Nu, le trait de 40 px flottait sur du vide ;
                  la tuile en fait une vraie pastille d'icône, et sa teinte
                  ramène la couleur de marque dans chaque carte. */}
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-teal/10 ring-1 ring-inset ring-brand-teal/20 transition-colors group-hover:bg-brand-teal/15">
                <StatGlyph index={i} className="h-7 w-7" />
              </span>
              {/* `value` porte le mot-clé court (titre), `label` la phrase qui
                  l'explique. Les tuiles ayant toutes la même hauteur, les
                  titres tombent d'office à la même ligne d'une carte à
                  l'autre ; les descriptions, elles, coulent librement en
                  dessous. */}
              <h3 className="mt-5 text-lg font-semibold leading-tight tracking-display">
                {item.value}
              </h3>
              <p className="mt-2 text-[0.8125rem] leading-[1.5] text-muted">
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
