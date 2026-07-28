"use client";

import { useState } from "react";
import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";
import SectionBackdrop from "@/components/motion/SectionBackdrop";
import SectionLabel from "@/components/SectionLabel";
import MethodScenes from "@/components/motion/MethodScenes";
import type { MethodContent } from "@/lib/content/types";

// ============================================================
// SECTION MÉTHODE — reconstruite de A à Z le 2026-07-27.
//
// UNE SEULE COLONNE, UN SEUL OBJET ANIMÉ :
//
//   titre épinglé (SectionLabel)
//   phrase d'accroche centrée
//   ┌──────────────────────────┐
//   │  écran (une scène/étape) │   ← MethodScenes, conservé
//   └──────────────────────────┘
//   ─●───────●───────●───────●──✓  ← rail qui se remplit, jalons
//    01      02      03      04     ← UN bloc allumé à la fois
//
// Ce qui a été SUPPRIMÉ, et pourquoi :
// - la légende de gauche (n° + titre + description de l'étape en cours) :
//   elle répétait mot pour mot le bloc correspondant de la frise — deux
//   pièces racontant la même chose ne se lisent jamais comme une seule
//   animation ;
// - les liens verticaux jalon → bloc (frise-link-*) : posés au bord gauche
//   des colonnes, ils se lisaient comme des séparateurs entre blocs ;
// - l'état intermédiaire « fait » (0,6) : trois niveaux d'opacité
//   simultanés brouillaient la lecture. Il n'y a plus que DEUX états —
//   l'étape que l'écran joue (pleine), les trois autres (en retrait) —
//   aux fenêtres EXACTES des scènes (frise-desc-*/frise-step-*).
//
// Toutes les pièces (remplissage, jalons, scènes, blocs) tournent sur la
// même horloge de 13,44 s, en opacité/transform uniquement (compositeur) :
// la synchronisation est garantie par construction, y compris après un
// passage de l'onglet en arrière-plan.
// ============================================================

export default function HowItWorks({ data }: { data: MethodContent }) {
  // `null` = la frise tourne toute seule. Un numéro = le visiteur a choisi
  // son étape en cliquant son bloc ; recliquer rend la main à la rotation.
  const [step, setStep] = useState<number | null>(null);

  return (
    <section
      id="methode"
      className="section-screen relative overflow-hidden border-t border-border"
    >
      <SectionBackdrop />
      <SectionLabel>{data.kicker}</SectionLabel>

      {/* `frise-manual` + `data-step` gèlent TOUTE la section (écran, rail,
          jalons, blocs) sur l'instant représentatif de l'étape choisie —
          un seul instant suffit puisque tout partage la même horloge. */}
      <div
        className={`relative mx-auto my-auto w-full max-w-5xl px-6 py-8 ${step ? "frise-manual" : ""}`}
        data-step={step ?? undefined}
      >
        <Reveal>
          <p className="section-lead mx-auto max-w-3xl text-center">
            {data.title}
          </p>
        </Reveal>

        {/* L'écran, seul au centre : c'est LUI que la frise commente. */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-8 w-full max-w-2xl overflow-hidden rounded-xl ring-1 ring-border">
            <MethodScenes steps={data.steps.length} />
          </div>
        </Reveal>

        {/* La frise, directement sous l'écran. La grille des jalons et celle
            des blocs sont LA MÊME (4 colonnes, même gouttière) : chaque
            jalon tombe exactement au-dessus de son bloc. */}
        <RevealGroup className="relative mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Rail + remplissage (desktop). Seul le trait déjà parcouru se
              voit : le chemin à venir ne se devine pas.
              `right-10` : le rail s'arrête au CENTRE du cercle d'arrivée
              (80 px de large, calé à droite) au lieu de courir jusqu'au bord
              — sinon un bout de trait dépassait à droite du cercle. */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-10 top-0 h-0.5 -translate-y-1/2 opacity-0 lg:opacity-100"
          >
            <div className="frise-fill rule-brand h-full w-full rounded-full" />
          </div>

          {/* Jalons, posés SUR le rail (hors des blocs animés à l'apparition,
              sinon ils se décalent de 20 px avec eux). Deux couches : base
              éteinte statique, couche émeraude dont seule l'opacité varie. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 grid grid-cols-4 gap-x-8 opacity-0 lg:opacity-100"
          >
            {data.steps.map((_, i) => (
              <div key={i} className="relative">
                <div className="absolute left-0 top-0 -translate-y-1/2 rounded-full bg-background p-1">
                  <span className="relative block h-[9px] w-[9px]">
                    <span className="absolute inset-0 scale-[0.8] rounded-full bg-[#26415c]" />
                    <span
                      className={`frise-dot-${i + 1} absolute inset-0 rounded-full bg-brand-emerald shadow-[0_0_12px_rgba(52,211,153,0.9)]`}
                    />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Arrivée : le cercle de validation se pose au bout du rail et la
              coche s'y trace quand le remplissage l'atteint. Entièrement DANS
              le conteneur, sinon l'overflow de la section le coupe. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 80 80"
            className="absolute right-0 top-0 hidden h-20 w-20 -translate-y-1/2 lg:block"
          >
            <defs>
              <linearGradient
                id="frise-ring"
                x1="20"
                y1="20"
                x2="60"
                y2="60"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#38bdf8" />
                <stop offset="0.5" stopColor="#22d3c4" />
                <stop offset="1" stopColor="#34d399" />
              </linearGradient>
            </defs>
            <g className="frise-final">
              <circle
                cx="40"
                cy="40"
                r="24"
                fill="#071522"
                stroke="url(#frise-ring)"
                strokeWidth="3.5"
              />
              <path
                className="frise-check"
                d="M30 40.5l6.5 6.5 13 -13"
                stroke="#34d399"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                pathLength={1}
              />
            </g>
          </svg>

          {data.steps.map((item, i) => (
            <RevealItem
              key={i}
              className="group relative cursor-pointer pl-6 lg:pl-0 lg:pt-6"
            >
              {/* Le bloc entier est le bouton (calque invisible) : un h3
                  dans un <button> serait du HTML invalide. */}
              <button
                type="button"
                onClick={() => setStep(step === i + 1 ? null : i + 1)}
                aria-pressed={step === i + 1}
                aria-label={`Voir l'étape ${item.title}`}
                className="absolute inset-0 z-10 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/60"
              />

              {/* Mobile : rail vertical + jalon dans le bloc (ils bougent
                  ensemble à l'apparition, contrairement au desktop). */}
              <div
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-0.5 -translate-x-1/2 opacity-100 lg:opacity-0"
              >
                <div className="frise-fill-y rule-brand-y h-full w-full rounded-full" />
              </div>
              <div
                aria-hidden="true"
                className="absolute left-0 top-[1px] -translate-x-1/2 rounded-full bg-background p-1 opacity-100 lg:opacity-0"
              >
                <span className="relative block h-[9px] w-[9px]">
                  <span className="absolute inset-0 scale-[0.8] rounded-full bg-[#26415c]" />
                  <span
                    className={`frise-dot-${i + 1} absolute inset-0 rounded-full bg-brand-emerald shadow-[0_0_12px_rgba(52,211,153,0.9)]`}
                  />
                </span>
              </div>

              {/* Le bloc : DEUX états seulement. Plein quand l'écran joue
                  cette étape (mêmes fenêtres que les scènes), en retrait
                  sinon. */}
              <div className={`frise-step-${i + 1}`}>
                <span className="text-gradient inline-block font-mono text-xl font-semibold tracking-display">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-base font-semibold tracking-display transition-colors group-hover:text-accent-cyan">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
