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
      {/* Barre de progression du défilement */}
      <div
        className="fixed left-0 top-0 z-[60] h-0.5 bg-accent-cyan"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      {/* Flèches de navigation par section — desktop uniquement */}
      <div className="fixed bottom-6 right-6 z-50 hidden flex-col gap-3 lg:flex">
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
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={hidden}
      className={`flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#141416] shadow-lg ring-1 ring-black/10 transition-all duration-300 hover:scale-110 ${
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
