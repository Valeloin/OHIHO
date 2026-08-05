"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";
import ServicesBackdrop from "@/components/motion/ServicesBackdrop";
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
// SECTION SERVICES — carrousel coverflow des 4 formules (fond dégradé +
// carrousel repris de la passation du 2026-08-05), les 4 paliers toujours
// visibles dessous.
//
// Chaque carte affiche la CAPTURE D'UN PROJET RÉEL quand le palier en a
// une (champ « Capture » de /admin, image dans /public) et retombe sur
// l'animation de la formule sinon. Les cartes tournent sur l'horloge de
// la vitrine (svc-carousel-1..4, 33,6 s) : le mouvement latéral et le gel
// au clic (Web Animations API, instant absolu) fonctionnent à l'identique
// pour une image ou une animation.
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

// Familles gelées au clic : la rotation du carrousel (svc-carousel-*) et
// tout ce qui suit la sélection (sv-*). Les micro-animations internes des
// scènes continuent. Noms distincts de pv-scene-* : ces classes-là sont
// partagées avec la vitrine du hero (HeroShowcase), les toucher casserait
// son crossfade.
const FROZEN_PREFIXES = ["svc-carousel-", "sv-"];

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
      className="services-vivid section-screen relative overflow-hidden border-t border-border"
    >
      <ServicesBackdrop />
      <SectionLabel lead={data.title}>{data.kicker}</SectionLabel>

      <div
        ref={rootRef}
        className="relative mx-auto my-auto w-full max-w-7xl px-6 py-6"
      >
        {/* Carrousel « coverflow » : les 4 formules tournent côte à côte —
            une nette au centre, une réduite à droite, une à l'arrière, une
            réduite à gauche — plutôt que de se succéder dans un cadre
            unique. Mouvement strictement latéral (svc-carousel-1..4,
            globals.css), même horloge de 33,6 s que le reste de la
            vitrine. `overflow-visible` : les cartes de côté débordent
            volontairement du conteneur pour se laisser deviner. */}
        <Reveal delay={0.1}>
          <div
            className="relative mx-auto w-full max-w-5xl"
            style={{ aspectRatio: "2.72 / 1" }}
          >
            {formulas.map((formula, i) => (
              <div
                key={formula.type}
                className={`svc-carousel-${i + 1} absolute left-1/2 top-1/2 w-[64%] -translate-x-1/2 -translate-y-1/2 aspect-[400/220] overflow-hidden rounded-xl ring-1 ring-white/25 shadow-2xl shadow-black/30`}
              >
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
        <RevealGroup className="mt-7 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {formulas.map((formula, i) => (
            <RevealItem
              key={formula.type}
              className={`service-offer-card sv-card-${i + 1} group relative h-full cursor-pointer overflow-hidden rounded-2xl`}
            >
              <button
                type="button"
                onClick={() => setScene(scene === i + 1 ? null : i + 1)}
                aria-pressed={scene === i + 1}
                aria-label={`Voir ${formula.label} dans le cadre`}
                className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              />

              {/* Filet actif synchronisé avec la fenêtre du carrousel. */}
              <div
                aria-hidden="true"
                className={`sv-bar-${i + 1} service-offer-progress absolute inset-x-0 top-0 h-[3px] origin-left`}
              />

              <div className={`sv-step-${i + 1} flex min-h-[205px] h-full flex-col p-5`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="service-offer-number font-mono text-[11px] font-semibold uppercase tracking-[0.18em]">
                    Format {String(i + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden="true" className="service-offer-glyph"><i /><i /><i /></span>
                </div>
                <h3 className="mt-5 text-[17px] font-semibold tracking-display text-white">
                  {formula.label}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.55] text-white/75 lg:line-clamp-3">
                  {formula.description}
                </p>
                {formula.delay && (
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-[#a6f8d5]">
                    {formula.delay}
                  </p>
                )}
                <Link
                  href={serviceHref(formula.type)}
                  className="service-offer-link relative z-20 mt-auto pt-4 inline-flex items-center justify-between gap-3 text-[12px] font-semibold text-white"
                >
                  <span>Découvrir</span>
                  <span aria-hidden="true" className="service-offer-arrow">↗</span>
                </Link>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
