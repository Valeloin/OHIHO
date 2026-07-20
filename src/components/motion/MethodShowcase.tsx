// Écran d'ordinateur de la section Méthode : une scène par étape, qui défile
// sur l'horloge de la frise (16,8 s).
//
// La VISIBILITÉ des scènes réutilise les classes `frise-desc-*` — celles qui
// pilotent déjà la description de la carte. La synchronisation avec la frise
// est donc garantie par construction : il n'y a pas deux jeux d'horaires à
// tenir alignés à la main.
//
// Pur CSS, aucun JavaScript : le composant reste un server component.
const RAIL = "#23405c";
const SKY = "#38bdf8";
const TEAL = "#22d3c4";
const EMERALD = "#34d399";

/* 01 — Échange initial : la conversation s'installe. */
function Echange() {
  return (
    <g>
      <g className="mv mv-bubble-1">
        <rect x="24" y="34" width="96" height="18" rx="9" fill={RAIL} />
      </g>
      <g className="mv mv-bubble-2">
        <rect x="112" y="58" width="80" height="18" rx="9" fill={TEAL} opacity="0.85" />
      </g>
      <g className="mv mv-bubble-3">
        <rect x="24" y="82" width="110" height="18" rx="9" fill={RAIL} />
      </g>
    </g>
  );
}

/* 02 — Maquette & devis : le cadre se trace, le montant s'inscrit. */
function Maquette() {
  return (
    <g>
      <rect
        className="mv mv-draw"
        x="24"
        y="28"
        width="120"
        height="72"
        rx="6"
        pathLength={1}
        fill="none"
        stroke={SKY}
        strokeWidth="2"
      />
      <rect x="158" y="34" width="58" height="6" rx="3" fill={RAIL} />
      <rect x="158" y="48" width="42" height="6" rx="3" fill={RAIL} />
      <rect
        className="mv mv-amount"
        x="158"
        y="70"
        width="58"
        height="10"
        rx="5"
        fill={EMERALD}
      />
    </g>
  );
}

/* 03 — Développement : les lignes s'écrivent les unes après les autres. */
function Developpement() {
  // Décalages courts (0 à -0,4 s) : ils échelonnent l'écriture des lignes
  // tout en gardant chaque fenêtre à l'intérieur de celle de la scène.
  const lignes = [
    { y: 32, w: 120, x: 24, fill: RAIL, delay: "0s" },
    { y: 48, w: 90, x: 38, fill: TEAL, delay: "-0.1s" },
    { y: 64, w: 140, x: 38, fill: RAIL, delay: "-0.2s" },
    { y: 80, w: 70, x: 52, fill: SKY, delay: "-0.3s" },
    { y: 96, w: 110, x: 24, fill: RAIL, delay: "-0.4s" },
  ];
  return (
    <g>
      {lignes.map((l) => (
        <rect
          key={l.y}
          className="mv mv-code"
          x={l.x}
          y={l.y}
          width={l.w}
          height="7"
          rx="3.5"
          fill={l.fill}
          style={{ animationDelay: l.delay }}
        />
      ))}
    </g>
  );
}

/* 04 — Mise en ligne & suivi : la jauge se remplit, la coche valide. */
function EnLigne() {
  return (
    <g>
      <rect x="24" y="58" width="150" height="10" rx="5" fill={RAIL} />
      <rect
        className="mv mv-deploy"
        x="24"
        y="58"
        width="150"
        height="10"
        rx="5"
        fill={EMERALD}
      />
      <path
        className="mv mv-done"
        d="M190 63l7 7 14 -14"
        pathLength={1}
        fill="none"
        stroke={EMERALD}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="24" y="86" width="94" height="6" rx="3" fill={RAIL} />
    </g>
  );
}

const SCENES = [Echange, Maquette, Developpement, EnLigne];

export default function MethodShowcase({ steps }: { steps: number }) {
  // On ne rend que les scènes dont l'étape existe : si l'admin passe de 4 à
  // 3 étapes, la 4e ne s'affiche pas dans le vide.
  const visibles = SCENES.slice(0, Math.min(steps, SCENES.length));

  return (
    // Vue de trois-quarts plutôt que de face. La perspective est portée par
    // le parent et la rotation par le SVG : c'est ce couple qui donne la
    // profondeur, une rotation seule aplatirait l'objet.
    // Les animations internes ne sont pas affectées — leurs transformations
    // se composent avec celle-ci au lieu de l'écraser.
    <div className="[perspective:1100px]">
      <svg
        viewBox="0 0 320 200"
        aria-hidden="true"
        focusable="false"
        className="h-auto w-full origin-center drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)] [transform:rotateY(-17deg)_rotateX(7deg)]"
      >
      {/* Écran */}
      <rect
        x="30"
        y="8"
        width="260"
        height="150"
        rx="10"
        fill="#071522"
        stroke={RAIL}
        strokeWidth="2"
      />
      {/* Barre de fenêtre */}
      <path d="M30 26h260" stroke={RAIL} strokeWidth="2" />
      <circle cx="44" cy="17" r="2.5" fill={RAIL} />
      <circle cx="53" cy="17" r="2.5" fill={RAIL} />
      <circle cx="62" cy="17" r="2.5" fill={RAIL} />

      {/* Les scènes, décalées sous la barre de fenêtre. Chacune emprunte la
          fenêtre d'affichage de son étape (frise-desc-N). */}
      <g transform="translate(38 30)">
        {visibles.map((Scene, i) => (
          <g key={i} className={`frise-desc-${i + 1}`}>
            <Scene />
          </g>
        ))}
      </g>

      {/* Socle du portable */}
      <path
        d="M14 166h292l-8 12H22z"
        fill="#071522"
        stroke={RAIL}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M140 172h40" stroke={RAIL} strokeWidth="2" strokeLinecap="round" />
      <path d="M30 158h260" stroke={RAIL} strokeWidth="2" />
      {/* Liseré de marque sur la tranche : rappel discret du logo. */}
        <path
          d="M120 166h80"
          stroke={TEAL}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
