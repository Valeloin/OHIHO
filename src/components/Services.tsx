"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";
import SectionBackdrop from "@/components/motion/SectionBackdrop";
import SectionLabel from "@/components/SectionLabel";
import {
  Chrome,
  SceneLanding,
  SceneSitePages,
  SceneRefonte,
  SceneApplication,
} from "@/components/motion/ServiceScene";
import { SERVICE_TYPES, serviceHref } from "@/lib/services";
import type { ServicesContent, ServiceType } from "@/lib/content/types";

// ============================================================
// SECTION SERVICES — un grand cadre navigateur qui met en scène UNE
// formule à la fois, les 4 paliers toujours visibles dessous.
//
// Le cadre affiche la CAPTURE D'UN PROJET RÉEL quand le palier en a une
// (champ « Capture » de /admin, image dans /public) et retombe sur
// l'animation de la formule sinon. Les couches tournent sur l'horloge de
// la vitrine (pv-scene-1..4, 33,6 s) : le fondu croisé et le gel au clic
// (Web Animations API, instant absolu) fonctionnent à l'identique pour
// une image ou une animation.
// ============================================================

const SCENES: Record<ServiceType, () => JSX.Element> = {
  landing: SceneLanding,
  intermediaire: SceneSitePages,
  refonte: SceneRefonte,
  application: SceneApplication,
};

// Instant représentatif de chaque scène sur l'horloge de 33,6 s (milieu de
// fenêtre : 12 / 37 / 62 / 87 %).
const FREEZE_MS: Record<number, number> = {
  1: 4032,
  2: 12432,
  3: 20832,
  4: 29232,
};

// Familles gelées au clic : la rotation (pv-scene-*) et tout ce qui suit la
// sélection (sv-*). Les micro-animations internes des scènes continuent.
const FROZEN_PREFIXES = ["pv-scene-", "sv-"];

/* Une couche du cadre : la capture réelle du palier, ou son animation. */
function FrameLayer({
  type,
  label,
  screenshot,
}: {
  type: ServiceType;
  label: string;
  screenshot: string;
}) {
  if (screenshot) {
    return (
      <div className="absolute inset-0">
        {/* Barre de navigateur, version HTML (les scènes portent la leur
            en SVG) : mêmes proportions, mêmes pastilles de marque. */}
        <div className="flex h-[11.8%] items-center gap-1.5 bg-[#23405c]/55 px-3">
          <span className="h-2 w-2 rounded-full bg-brand-sky" />
          <span className="h-2 w-2 rounded-full bg-accent-cyan" />
          <span className="h-2 w-2 rounded-full bg-brand-emerald" />
        </div>
        <div className="relative h-[88.2%]">
          <Image
            src={screenshot}
            alt={`Capture d'un projet ${label}`}
            fill
            sizes="(max-width: 768px) 100vw, 672px"
            className="object-cover object-top"
          />
        </div>
      </div>
    );
  }

  const Scene = SCENES[type];
  return (
    <svg
      viewBox="0 0 400 220"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="400" height="220" fill="var(--pv-screen, #071522)" />
      <Scene />
      <Chrome url="votre-projet.fr" />
    </svg>
  );
}

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
        className="relative mx-auto my-auto w-full max-w-6xl px-6 py-6"
      >
        {/* Le cadre, seul au centre : capture réelle ou animation, une
            formule à la fois. L'aspect est celui des scènes (400/220). */}
        <Reveal delay={0.1}>
          <div className="relative mx-auto aspect-[400/220] w-full max-w-xl overflow-hidden rounded-xl ring-1 ring-border">
            {formulas.map((formula, i) => (
              <div key={formula.type} className={`pv-scene-${i + 1} absolute inset-0`}>
                <FrameLayer
                  type={formula.type}
                  label={formula.label}
                  screenshot={formula.screenshot}
                />
              </div>
            ))}
          </div>
        </Reveal>

        {/* Les 4 paliers, toujours visibles. UNE COLONNE sous 768 px : à
            deux colonnes, les descriptions de 01/02 se faisaient tronquer
            sur mobile. La coupe à 3 lignes ne vaut qu'à partir de lg, où
            les colonnes doivent rester à la même hauteur. */}
        <RevealGroup className="mt-8 grid gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          {formulas.map((formula, i) => (
            <RevealItem
              key={formula.type}
              className="group relative cursor-pointer"
            >
              <button
                type="button"
                onClick={() => setScene(scene === i + 1 ? null : i + 1)}
                aria-pressed={scene === i + 1}
                aria-label={`Voir ${formula.label} dans le cadre`}
                className="absolute inset-0 z-10 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/60"
              />

              {/* Indicateur de palier ACTIF : filet au dégradé de marque,
                  sur la même horloge que le cadre (sv-bar-*). */}
              <div
                aria-hidden="true"
                className={`sv-bar-${i + 1} rule-brand mb-4 h-0.5 w-full rounded-full`}
              />

              {/* Bloc atténué à 0,55 et non 0,4 : à 0,4 le texte passait
                  sous le seuil AA — à 0,55 le titre tient ~5,2:1 et la
                  description ~4,6:1 sur le fond nuit. */}
              <div className={`sv-step-${i + 1}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-gradient inline-block font-mono text-xl font-semibold tracking-display">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* Chevron : les paliers sont cliquables, il faut que ça
                      se voie même à l'état inactif. */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5"
                  >
                    <path d="m9 5 7 7-7 7" />
                  </svg>
                </div>
                <h3 className="mt-2 text-base font-semibold tracking-display transition-colors group-hover:text-accent-cyan">
                  {formula.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted lg:line-clamp-3">
                  {formula.description}
                </p>
                {formula.delay && (
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-brand-teal">
                    {formula.delay}
                  </p>
                )}
                <Link
                  href={serviceHref(formula.type)}
                  className="relative z-20 mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent-cyan"
                >
                  Découvrir
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Appel à l'action de fin de section. */}
        <Reveal>
          <div className="mt-8 flex justify-center">
            <Link
              href="/#contact"
              className="btn-accent inline-flex px-7 py-3 text-sm"
            >
              Nous contacter
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
