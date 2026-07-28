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
// suivre celui de SERVICE_TYPES (voir Services.tsx).
export default function Hero({
  data,
  formulaLabels,
  formulaDescriptions = [],
  showcase,
}: {
  data: HeroContent;
  formulaLabels: string[];
  /** Une phrase par formule, relayée sous la vignette sur la même horloge
      que les scènes (pv-title-*). Même ordre que formulaLabels. */
  formulaDescriptions?: string[];
  showcase: ReactNode;
}) {
  // `null` = la vitrine tourne toute seule. Un numéro = le visiteur a choisi
  // sa scène ; recliquer la même puce rend la main à la rotation.
  const [scene, setScene] = useState<number | null>(null);

  return (
    <section className="section-screen relative overflow-hidden">
      <AnimatedGlow variant="hero" />
      <Fireflies />

      <motion.div
        // Hauteur d'écran et centrage vertical portés par `.section-screen`,
        // comme sur toutes les sections d'accueil depuis le 2026-07-27.
        // Le rembourrage interne reste modeste : il sert de marge minimale
        // quand le contenu approche la hauteur d'écran, pas de rythme.
        /* `my-auto` : `.section-screen` est une colonne sans centrage depuis
           que les titres de section sont épinglés en haut — chaque contenu
           se centre lui-même dans l'espace restant. */
        className="relative mx-auto my-auto flex w-full max-w-6xl flex-col px-6 py-10"
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
        {/* Colonne de la vitrine élargie de 27 à 33rem (demande du
            2026-07-27) : la vignette se lisait comme un timbre à côté du
            titre. La gouttière absorbe une partie de l'élargissement. */}
        <div className="grid items-center gap-x-10 gap-y-0 lg:gap-y-12 lg:grid-cols-[1fr_minmax(0,33rem)]">
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

            {/* ANCIEN hero rétabli à la demande (2026-07-27, après deux
                essais au format des noms de section) : grand titre en blanc,
                accent au dégradé de marque, comme la banderole. STATIQUE. */}
            <motion.h1 variants={ITEM} className="hero-title order-2 mt-6">
              <span className="text-foreground">{data.titleLead}</span>{" "}
              <span className="text-gradient">{data.titleAccent}</span>
            </motion.h1>

            <motion.p
              variants={ITEM}
              className="order-4 mt-5 max-w-xl text-lg leading-relaxed text-muted"
            >
              {data.subtitle}
            </motion.p>

            <motion.div
              variants={ITEM}
              className="order-5 mt-7 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/#contact"
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
            <div aria-hidden="true" className="relative mb-3 h-8">
              {formulaLabels.map((label, i) => (
                <span
                  key={label}
                  className={`pv-title-${i + 1} absolute inset-0 flex items-center justify-center text-center font-mono text-sm uppercase tracking-[0.18em] text-brand-teal`}
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
                    <span className="relative block h-1 w-8 overflow-hidden rounded-full bg-brand-sky/35 transition-colors group-hover:bg-brand-sky/55 group-focus-visible:ring-2 group-focus-visible:ring-accent-cyan/60">
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

            {/* Description de la formule en cours, SOUS la vignette (demande
                du 2026-07-27) : elle se relaie sur la même horloge que les
                scènes (pv-title-*), le lien est garanti par construction.
                Hauteur fixe : les quatre phrases sont en absolu, sans elle le
                bloc serait de hauteur nulle et la mise en page sauterait. */}
            <div aria-hidden="true" className="relative mt-4 h-12">
              {formulaDescriptions.map((description, i) => (
                <p
                  key={i}
                  className={`pv-title-${i + 1} absolute inset-0 mx-auto max-w-md text-center text-sm leading-snug text-muted`}
                >
                  {description}
                </p>
              ))}
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
        {/* Repris à plat, sans cadre ni dégradé : la version en cartes
            (bordure au dégradé de marque, fond teinté, tuile d'icône) a été
            jugée trop grosse et « moche ». Ici, juste une pastille d'icône
            et deux lignes de texte, sans boîte autour — ça se lit comme
            une légende à côté de la vitrine, pas comme un second bloc de
            cartes qui viendrait concurrencer le hero. */}
        <motion.div
          variants={ITEM}
          className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 xl:grid-cols-4"
        >
          {data.stats.map((item, i) => (
            <div key={item.label} className="flex items-start gap-2.5">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal">
                <StatGlyph index={i} className="h-3.5 w-3.5" />
              </span>
              {/* `value` porte le mot-clé court (titre), `label` la phrase
                  qui l'explique. Volontairement PAS un h3 : ces lignes sont
                  des mini-statistiques dans le hero, pas de nouvelles
                  sections de contenu — un h3 ici sauterait le h2 (la
                  hiérarchie de titres reprend proprement à la section
                  Services). */}
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-tight tracking-display">
                  {item.value}
                </p>
                <p className="mt-1 text-xs leading-snug text-muted">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
