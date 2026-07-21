"use client";

import { useCallback, useEffect, useState } from "react";
import { animateScrollTo, sectionScrollTarget } from "@/lib/scroll";

export default function ScrollNav() {
  const [progress, setProgress] = useState(0);
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);

  // Masque la barre de défilement tant que ce composant est monté (page d'accueil).
  useEffect(() => {
    document.documentElement.classList.add("hide-scrollbar");
    return () => document.documentElement.classList.remove("hide-scrollbar");
  }, []);

  const update = useCallback(() => {
    const scrollTop = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    setProgress(max > 0 ? Math.min(100, (scrollTop / max) * 100) : 0);
    setAtTop(scrollTop < 12);
    setAtBottom(scrollTop >= max - 12);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  // Points d'arrêt des flèches : le haut de page (le Hero), puis le titre de
  // chaque section suivante. On exclut le Hero des cibles "titre" (sa 1re étape
  // est le sommet, à 0), sinon le premier clic vers le bas s'arrêterait sur le
  // titre du Hero au lieu de sauter à la section Services.
  function sectionTargets(): number[] {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main > section")
    );
    return [0, ...sections.slice(1).map((s) => sectionScrollTarget(s))].sort(
      (a, b) => a - b
    );
  }

  function scrollToNext() {
    const y = window.scrollY;
    const next = sectionTargets().find((t) => t > y + 4);
    animateScrollTo(next ?? document.documentElement.scrollHeight, update);
  }

  function scrollToPrev() {
    const y = window.scrollY;
    const prev = sectionTargets().filter((t) => t < y - 4);
    animateScrollTo(prev.length ? prev[prev.length - 1] : 0, update);
  }

  return (
    <>
      {/* Barre de progression du défilement, posée sur un rail visible : on lit
          la position ET la course restante. La barre porte le dégradé de marque
          (bleu ciel → teal → émeraude), statique comme la banderole. */}
      <div
        className="fixed left-0 top-0 z-[60] h-0.5 w-full bg-border"
        aria-hidden="true"
      >
        <div
          className="rule-brand h-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Flèches de navigation par section — desktop uniquement.
          Coin BAS-GAUCHE et non bas-droite : le gros rond d'arrivée de la
          frise vit dans le coin bas-droite du contenu et, quand la section
          Méthode défile jusqu'au bas de la fenêtre, les deux se
          télescopaient. La frise occupant toute la largeur, aucun coin n'est
          totalement libre, mais à gauche les flèches ne croisent qu'un texte
          discret au lieu du rond lumineux. */}
      <div className="fixed bottom-6 left-6 z-50 hidden flex-col gap-3 lg:flex">
        <ArrowButton
          direction="up"
          label="Section précédente"
          onClick={scrollToPrev}
          hidden={atTop}
        />
        <ArrowButton
          direction="down"
          label="Section suivante"
          onClick={scrollToNext}
          hidden={atBottom}
        />
      </div>
    </>
  );
}

function ArrowButton({
  direction,
  label,
  onClick,
  hidden,
}: {
  direction: "up" | "down";
  label: string;
  onClick: () => void;
  hidden: boolean;
}) {
  // Pilules rondes posées sur la surface nuit bleu-teal : filet fin, fond de
  // surface, seul le teal interactif marque le survol.
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={hidden}
      className={`card-surface flex h-11 w-11 items-center justify-center rounded-full text-muted transition-all duration-300 hover:text-accent-cyan ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        {direction === "up" ? (
          <path d="m18 15-6-6-6 6" />
        ) : (
          <path d="m6 9 6 6 6-6" />
        )}
      </svg>
    </button>
  );
}
