"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";
import SectionBackdrop from "@/components/motion/SectionBackdrop";
import SectionLabel from "@/components/SectionLabel";
import HeroShowcase from "@/components/motion/HeroShowcase";
import { SERVICE_TYPES, serviceHref } from "@/lib/services";
import type { ServicesContent } from "@/lib/content/types";

// ============================================================
// SECTION SERVICES — même patron que la Méthode (2026-07-28) :
//
//   titre épinglé + phrase (SectionLabel)
//   ┌──────────────────────────┐
//   │ écran (UNE formule à la  │  ← la vitrine tournante (33,6 s),
//   │ fois, en grand)          │    la même mécanique que le hero
//   └──────────────────────────┘
//    01        02        03        04   ← les 4 formules TOUJOURS
//    Landing   Site      Refonte  App     visibles ; celle qui joue
//                                          est pleine, les autres en
//                                          retrait (jamais masquées)
//
// Les quatre vignettes alignées qui jouaient toutes en même temps ont été
// remplacées à la demande : une seule formule est mise en scène à la fois,
// en grand. Cliquer un bloc fige la vitrine sur sa scène (Web Animations
// API, instant absolu — voir la Méthode) ; recliquer rend la main à la
// rotation. « Découvrir » reste un vrai lien vers la page de la formule.
// ============================================================

// Instant représentatif de chaque scène sur l'horloge de 33,6 s de la
// vitrine (milieu de fenêtre : 12 / 37 / 62 / 87 %).
const FREEZE_MS: Record<number, number> = {
  1: 4032,
  2: 12432,
  3: 20832,
  4: 29232,
};

// Familles d'animations à figer : la ROTATION de la vitrine (scènes,
// interstitiel) et les blocs qui la suivent. Les micro-animations internes
// des scènes (8,4 s) continuent de vivre dans la scène figée.
const FROZEN_PREFIXES = [
  "pv-scene-",
  "pv-trans",
  "pv-spin-vis",
  "pv-ok",
  "pv-burst",
  "sv-step-",
];

export default function Services({ data }: { data: ServicesContent }) {
  const formulas = SERVICE_TYPES.map((type) => ({
    type,
    ...data.offers[type],
  }));

  const [scene, setScene] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.getAnimations({ subtree: true }).forEach((animation) => {
      if (!(animation instanceof CSSAnimation)) return;
      const name = animation.animationName;
      if (!FROZEN_PREFIXES.some((p) => name.startsWith(p))) return;
      if (scene) {
        animation.currentTime = FREEZE_MS[scene];
        animation.pause();
      } else {
        animation.play();
      }
    });
  }, [scene]);

  return (
    <section
      id="services"
      className="section-screen relative overflow-hidden border-t border-border"
    >
      <SectionBackdrop />
      <SectionLabel lead={data.title}>{data.kicker}</SectionLabel>

      <div
        ref={rootRef}
        className="relative mx-auto my-auto w-full max-w-6xl px-6 py-8"
      >
        {/* L'écran, seul au centre, en grand : une formule à la fois. */}
        <Reveal delay={0.1}>
          <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl ring-1 ring-border">
            <HeroShowcase />
          </div>
        </Reveal>

        {/* Les 4 formules, toujours visibles sous l'écran. Le bloc dont la
            scène joue est plein (sv-step-*), les autres en retrait. */}
        <RevealGroup className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {formulas.map((formula, i) => (
            <RevealItem
              key={formula.type}
              className="group relative cursor-pointer"
            >
              {/* Le bloc est le bouton de sélection de la scène (calque
                  invisible, comme la Méthode). */}
              <button
                type="button"
                onClick={() => setScene(scene === i + 1 ? null : i + 1)}
                aria-pressed={scene === i + 1}
                aria-label={`Voir l'animation ${formula.label}`}
                className="absolute inset-0 z-10 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/60"
              />

              <div className={`sv-step-${i + 1}`}>
                <span className="text-gradient inline-block font-mono text-xl font-semibold tracking-display">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-base font-semibold tracking-display transition-colors group-hover:text-accent-cyan">
                  {formula.label}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                  {formula.description}
                </p>
                {/* Vrai lien vers la page de la formule, AU-DESSUS du calque
                    de sélection (z-20). */}
                <Link
                  href={serviceHref(formula.type)}
                  className="relative z-20 mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent-cyan"
                >
                  Découvrir
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
