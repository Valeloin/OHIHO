const SCREEN = "var(--pv-screen, #071522)";
const BLOCKS = "var(--pv-blocks, #23405c)";
const STONE = "#9fb2cc";
const BONE = "#eef4fc";

// Espace de suivi livré avec chaque site : trois demandes ouvertes se règlent
// l'une après l'autre et la barre d'avancement suit. Pur CSS (classes bt-*
// dans globals.css), aucun JavaScript — le composant reste server component.
// Décoratif : le texte qui l'accompagne porte l'information.
function Ligne({
  y,
  index,
  largeur,
}: {
  y: number;
  index: 1 | 2 | 3;
  largeur: number;
}) {
  return (
    <g>
      {/* Fond de ligne */}
      <rect x="24" y={y} width="352" height="34" rx="8" fill={BLOCKS} opacity="0.32" />
      {/* Référence de la demande */}
      <rect x="36" y={y + 13} width="26" height="8" rx="4" fill={STONE} opacity="0.45" />
      {/* Intitulé */}
      <rect x="72" y={y + 13} width={largeur} height="8" rx="4" fill={BONE} opacity="0.55" />

      {/* Pastille « ouvert » — teal, tant que la demande n'est pas réglée */}
      <g className={`bt-chip-${index}`}>
        <rect
          x="300"
          y={y + 9}
          width="60"
          height="16"
          rx="8"
          fill="rgb(var(--brand-teal) / 0.16)"
        />
        <rect
          x="310"
          y={y + 15}
          width="40"
          height="4"
          rx="2"
          fill="rgb(var(--brand-teal))"
        />
      </g>

      {/* Pastille « réglé » — émeraude et sa coche, une fois traitée */}
      <g className={`bt-check-${index}`}>
        <circle
          cx="330"
          cy={y + 17}
          r="11"
          fill="rgb(var(--brand-emerald) / 0.16)"
        />
        <path
          d={`M324 ${y + 17}l4 4 8 -8`}
          stroke="rgb(var(--brand-emerald))"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </g>
  );
}

export default function TicketScene() {
  return (
    <svg
      viewBox="0 0 400 220"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="400" height="220" fill={SCREEN} />

      {/* Barre de fenêtre */}
      <rect x="0" y="0" width="400" height="26" fill={BLOCKS} opacity="0.4" />
      <circle cx="16" cy="13" r="3.5" fill={STONE} opacity="0.5" />
      <circle cx="28" cy="13" r="3.5" fill={STONE} opacity="0.5" />
      <circle cx="40" cy="13" r="3.5" fill={STONE} opacity="0.5" />
      <rect x="150" y="8" width="100" height="10" rx="5" fill={BLOCKS} opacity="0.7" />

      {/* Titre de l'espace */}
      <rect x="24" y="42" width="96" height="9" rx="4.5" fill={BONE} opacity="0.75" />

      {/* Avancement global */}
      <rect x="24" y="62" width="352" height="5" rx="2.5" fill={BLOCKS} opacity="0.45" />
      <rect
        className="bt-fill"
        x="24"
        y="62"
        width="352"
        height="5"
        rx="2.5"
        fill="rgb(var(--brand-emerald))"
      />

      <Ligne y={84} index={1} largeur={150} />
      <Ligne y={128} index={2} largeur={120} />
      <Ligne y={172} index={3} largeur={168} />
    </svg>
  );
}
