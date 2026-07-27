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

  // Un arrêt par section, sans exception : chaque section faisant exactement
  // la hauteur utile de l'écran, caler son bord haut sous le bandeau la fait
  // remplir la fenêtre au pixel près. Le Hero n'a plus besoin d'être traité à
  // part — son bord haut est déjà à 0 une fois le bandeau retiré.
  function sectionTargets(): number[] {
    return Array.from(document.querySelectorAll<HTMLElement>("main > section"))
      .map((s) => sectionScrollTarget(s))
      .sort((a, b) => a - b);
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
          Poussées sur le BORD DROIT : centrées sur l'axe du contenu, elles
          se superposaient aux titres et aux cartes, trop présentes. Sur le
          bord, elles ne croisent jamais le contenu (les sections sont à
          max-w-7xl, il reste une gouttière vide sur les grands écrans) et
          restent là où la barre de défilement les fait déjà chercher. */}
      <div
        className="fixed right-5 z-50 hidden lg:block"
        style={{ top: "calc(var(--header-h) + 1.25rem)" }}
      >
        <ArrowButton
          direction="up"
          label="Section précédente"
          onClick={scrollToPrev}
          hidden={atTop}
        />
      </div>
      <div className="fixed bottom-5 right-5 z-50 hidden lg:block">
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
  // Discrètes par défaut : pas de fond ni d'ombre (`card-surface` les
  // faisait lire comme un bouton à part entière plutôt que comme un repère
  // de navigation secondaire), une simple opacité réduite qui monte au
  // survol pour signaler l'interactivité sans occuper l'œil en continu.
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={hidden}
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-muted transition-all duration-300 hover:border-accent-cyan/50 hover:text-accent-cyan hover:opacity-100 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-25"
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
        className="h-4 w-4"
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
