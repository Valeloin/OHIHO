import {
  Chrome,
  SceneDigitalisation,
  SceneMaintenance,
  SceneRefonte,
  SceneApplication,
} from "@/components/motion/ServiceScene";

// ============================================================
// Vitrine tournante : les 4 formules de projet se succèdent en
// boucle (fondus croisés doux toutes les 8,4 s, cycle complet de
// 33,6 s — classes pv-scene-* de globals.css). Pur CSS, zéro JS,
// server component, décoratif (aria-hidden).
//
// Chaque histoire est TERMINÉE à 85 % de son quart : la bascule
// ne coupe jamais une animation en cours. Entre deux scènes, un
// interstitiel (voile + emblème OHIHO dont l'anneau tourne +
// coche + gerbe d'étincelles) couvre la réinitialisation.
//
// Sans animation (prefers-reduced-motion) : la scène 1 reste
// affichée dans son état final, sans voile ni interstitiel.
//
// Les libellés de formule qui accompagnent la vitrine peuvent
// être synchronisés avec les classes pv-title-1..4 (mêmes
// horloges, cross-slide) et les puces de progression avec
// pv-scene-1..4 — le branchement se fait côté page.
// ============================================================
export default function HeroShowcase() {
  return (
    <svg
      viewBox="0 0 400 220"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full rounded-xl"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="400" height="220" fill="var(--pv-screen, #071522)" />
      <g className="pv-scene-1">
        <SceneDigitalisation />
      </g>
      <g className="pv-scene-2">
        <SceneMaintenance />
      </g>
      <g className="pv-scene-3">
        <SceneRefonte />
      </g>
      <g className="pv-scene-4">
        <SceneApplication />
      </g>

      {/* Transition : voile nuit qui masque la réinitialisation */}
      <g className="pv-trans">
        <rect
          x="0"
          y="26"
          width="400"
          height="194"
          fill="var(--pv-screen, #071522)"
          opacity="0.94"
        />
      </g>

      {/* Emblème OHIHO : le disque nuit, son anneau au dégradé de
          marque qui tourne, et le trident (ciel / teal plus haut /
          émeraude). Le trident reste FIXE : c'est le logo, il doit
          rester reconnaissable — seul l'anneau tourne. */}
      <g className="pv-spin-vis">
        <svg x="162" y="80" width="76" height="76" viewBox="0 0 100 100">
          <defs>
            <linearGradient
              id="ohv-ring"
              x1="18"
              y1="10"
              x2="86"
              y2="92"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="rgb(var(--brand-sky))" />
              <stop offset="0.5" stopColor="rgb(var(--brand-teal))" />
              <stop offset="1" stopColor="rgb(var(--brand-emerald))" />
            </linearGradient>
            <radialGradient id="ohv-disc" cx="0.4" cy="0.32" r="0.9">
              <stop offset="0" stopColor="#16273f" />
              <stop offset="1" stopColor="#0a1524" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="46.5" fill="url(#ohv-disc)" />
          {/* Anneau au repos, à peine visible, pour garder le cercle fermé */}
          <circle
            cx="50"
            cy="50"
            r="46.5"
            fill="none"
            stroke="var(--pv-blocks, #23405c)"
            strokeWidth="5"
          />
          {/* Arc de marque en rotation (2,2 s par tour) */}
          <g className="pv-rotate">
            <circle
              cx="50"
              cy="50"
              r="46.5"
              fill="none"
              stroke="url(#ohv-ring)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="152 140"
            />
          </g>
          {/* Le trident du logo-mark, aux trois couleurs de marque */}
          <rect x="30" y="28" width="8" height="44" rx="4" fill="rgb(var(--brand-sky))" />
          <rect x="46" y="21" width="8" height="58" rx="4" fill="rgb(var(--brand-teal))" />
          <rect x="62" y="28" width="8" height="44" rx="4" fill="rgb(var(--brand-emerald))" />
        </svg>
      </g>

      {/* Gerbe d'étincelles : rayons qui jaillissent de la coche */}
      <g className="pv-burst" fill="none">
        <g strokeWidth="3" strokeLinecap="round">
          <path d="M226 118h22" stroke="rgb(var(--brand-sky))" />
          <path d="M218 100l16 -16" stroke="rgb(var(--brand-emerald))" />
          <path d="M200 92v-22" stroke="rgb(var(--brand-teal))" />
          <path d="M182 100l-16 -16" stroke="rgb(var(--brand-sky))" />
          <path d="M174 118h-22" stroke="rgb(var(--brand-emerald))" />
          <path d="M182 136l-16 16" stroke="rgb(var(--brand-teal))" />
          <path d="M200 144v22" stroke="rgb(var(--brand-sky))" />
          <path d="M218 136l16 16" stroke="rgb(var(--brand-emerald))" />
        </g>
      </g>

      {/* Coche de validation, en émeraude (la couleur de réussite) */}
      <g className="pv-ok">
        <circle cx="200" cy="118" r="16" fill="rgb(var(--brand-emerald) / 0.18)" />
        <path
          d="M191 118l6 6 12 -12"
          stroke="rgb(var(--brand-emerald))"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>

      <Chrome url="votre-projet.fr" />
    </svg>
  );
}
