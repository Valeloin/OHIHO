"use client";

import { useEffect, useState } from "react";

// Bascule clair / sombre.
//
// Le thème appliqué est décidé AVANT le premier rendu par le script en ligne
// du layout (voir SCRIPT_THEME dans layout.tsx) : ce composant ne fait que
// refléter l'état déjà en place et le changer. Il ne décide de rien au
// montage, sinon le bouton afficherait la mauvaise icône une fraction de
// seconde.
//
// Trois états côté visiteur : clair explicite, sombre explicite, ou rien
// choisi (on suit le système). Le bouton ne montre que deux positions —
// « ce que j'affiche maintenant » et « ce vers quoi je bascule ».

const CLE = "ohiho-theme";

export default function ThemeToggle() {
  const [sombre, setSombre] = useState(false);

  useEffect(() => {
    // L'attribut est déjà posé par le script en ligne ; s'il est absent,
    // c'est qu'on suit le système.
    const pose = document.documentElement.getAttribute("data-theme");
    setSombre(
      pose
        ? pose === "dark"
        : window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }, []);

  function basculer() {
    // On lit l'état RÉEL du document, pas la variable du composant : deux
    // clics rapprochés dans le même cycle de rendu liraient deux fois la
    // même valeur périmée et la seconde bascule ne ferait rien.
    const pose = document.documentElement.getAttribute("data-theme");
    const estSombre = pose
      ? pose === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;

    const prochain = estSombre ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", prochain);
    try {
      localStorage.setItem(CLE, prochain);
    } catch {
      // Navigation privée stricte : le choix ne survivra pas au
      // rechargement, mais la page bascule quand même.
    }
    setSombre(!estSombre);
  }

  return (
    <button
      type="button"
      onClick={basculer}
      aria-label={sombre ? "Passer en thème clair" : "Passer en thème sombre"}
      title={sombre ? "Thème clair" : "Thème sombre"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors"
      style={{ borderColor: "var(--line)" }}
    >
      {/* Deux icônes dessinées à la main : pas de bibliothèque d'icônes
          embarquée pour deux glyphes. */}
      {sombre ? (
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          aria-hidden
        >
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.7 6.7 0 0 0 10.5 10.5z" />
        </svg>
      )}
    </button>
  );
}
