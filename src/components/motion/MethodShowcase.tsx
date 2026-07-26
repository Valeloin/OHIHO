// Écran de la section Méthode : une scène par étape, qui défile sur
// l'horloge de la frise (13,44 s).
//
// Même fenêtre de navigateur plate que les vignettes Services (Chrome +
// couleurs --pv-*) plutôt que l'ancien duo portable/téléphone en 3D : plus
// cohérent avec le reste du site, et plus simple à lire.
//
// La VISIBILITÉ des scènes réutilise les classes `frise-desc-*` — celles qui
// pilotent déjà la description de la carte. La synchronisation avec la frise
// est donc garantie par construction : il n'y a pas deux jeux d'horaires à
// tenir alignés à la main.
//
// Pur CSS, aucun JavaScript : le composant reste un server component.
import { Chrome } from "@/components/motion/ServiceScene";

const SCREEN = "var(--pv-screen, #071522)";
const BLOCKS = "var(--pv-blocks, #23405c)";
const ACCENT = "var(--pv-accent, #22d3c4)";
const SKY = "rgb(var(--brand-sky))";
const EMERALD = "rgb(var(--brand-emerald))";

/* Emblème OHIHO, redessiné à la demande plutôt qu'importé : le fichier
   public/logo-mark.svg porte ses propres `id` de dégradé, et l'inclure deux
   fois dans la même page ferait doublon. */
function Emblem({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const k = r / 46.5;
  const bar = (x: number, y: number, h: number, fill: string) => (
    <rect
      key={x}
      x={cx + (x - 50) * k}
      y={cy + (y - 50) * k}
      width={8 * k}
      height={h * k}
      rx={4 * k}
      fill={fill}
    />
  );
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={SCREEN} stroke="url(#mv-ring)" strokeWidth={Math.max(1, 5 * k)} />
      {bar(30, 28, 44, SKY)}
      {bar(46, 21, 58, ACCENT)}
      {bar(62, 28, 44, EMERALD)}
    </g>
  );
}

/* 01 — Échange initial : la conversation s'installe. */
function Echange() {
  return (
    <g>
      <g className="mv mv-bubble-1">
        <rect x="24" y="34" width="112" height="20" rx="10" fill={BLOCKS} />
      </g>
      <g className="mv mv-bubble-2">
        <rect x="132" y="60" width="94" height="20" rx="10" fill={ACCENT} fillOpacity="0.85" />
      </g>
      <g className="mv mv-bubble-3">
        <rect x="24" y="86" width="128" height="20" rx="10" fill={BLOCKS} />
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
        width="140"
        height="84"
        rx="8"
        pathLength={1}
        fill="none"
        stroke={SKY}
        strokeWidth="2"
      />
      <rect x="184" y="36" width="68" height="7" rx="3.5" fill={BLOCKS} />
      <rect x="184" y="52" width="50" height="7" rx="3.5" fill={BLOCKS} />
      <rect className="mv mv-amount" x="184" y="80" width="68" height="12" rx="6" fill={EMERALD} />
    </g>
  );
}

/* 03 — Développement. Le texte promet deux choses : « votre site prend
   forme » ET « des points d'étape réguliers pour suivre l'avancement ».
   Les lignes de code s'écrivent à gauche, une colonne de jalons cochés
   s'ajoute à droite : ce sont les points d'étape, qui se valident au fil de
   l'écriture. */
function Developpement() {
  const lignes = [
    { y: 32, w: 106, x: 24, fill: BLOCKS, delay: "0s" },
    { y: 50, w: 78, x: 42, fill: ACCENT, delay: "-0.1s" },
    { y: 68, w: 120, x: 42, fill: BLOCKS, delay: "-0.2s" },
    { y: 86, w: 62, x: 60, fill: SKY, delay: "-0.3s" },
    { y: 104, w: 96, x: 24, fill: BLOCKS, delay: "-0.4s" },
  ];
  const jalons = [
    { y: 38, delay: "-0.1s" },
    { y: 66, delay: "-0.25s" },
    { y: 94, delay: "-0.4s" },
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
          height="8"
          rx="4"
          fill={l.fill}
          style={{ animationDelay: l.delay }}
        />
      ))}
      <path d="M198 28v88" stroke={BLOCKS} strokeWidth="1.5" opacity="0.6" />
      {jalons.map((j) => (
        <g key={j.y}>
          <rect x="216" y={j.y} width="60" height="7" rx="3.5" fill={BLOCKS} />
          <path
            className="mv mv-code"
            d={`M${212} ${j.y + 3.5}l4 4 6 -7`}
            transform="translate(-10 0)"
            pathLength={1}
            fill="none"
            stroke={EMERALD}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animationDelay: j.delay }}
          />
        </g>
      ))}
    </g>
  );
}

/* 04 — Mise en ligne & suivi. La jauge se remplit et se valide, puis une
   enveloppe arrive : le suivi qui prend le relais une fois le site en
   ligne. La bande centrale reste libre pour l'emblème, qui apparaît entre
   les deux moments. */
function EnLigne() {
  return (
    <g>
      <rect x="24" y="10" width="180" height="12" rx="6" fill={BLOCKS} />
      <rect className="mv mv-deploy" x="24" y="10" width="180" height="12" rx="6" fill={EMERALD} />
      <path
        className="mv mv-done"
        d="M228 17l8 8 16 -16"
        pathLength={1}
        fill="none"
        stroke={EMERALD}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g className="mv mv-follow" style={{ animationDelay: "0.35s" }}>
        <rect x="152" y="132" width="40" height="24" rx="5" fill="none" stroke={SKY} strokeWidth="2.5" />
        <path d="M152 136l20 12 20 -12" fill="none" stroke={SKY} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  );
}

const SCENES = [Echange, Maquette, Developpement, EnLigne];

export default function MethodShowcase({ steps }: { steps: number }) {
  // On ne rend que les scènes dont l'étape existe : si l'admin passe de 4 à
  // 3 étapes, la 4e ne s'affiche pas dans le vide.
  const visibles = SCENES.slice(0, Math.min(steps, SCENES.length));

  return (
    <svg
      viewBox="0 0 400 220"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full rounded-xl"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="mv-ring" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor={SKY} />
          <stop offset="0.5" stopColor={ACCENT} />
          <stop offset="1" stopColor={EMERALD} />
        </linearGradient>
        <clipPath id="mv-clip">
          <rect x="0" y="26" width="400" height="194" />
        </clipPath>
      </defs>

      <rect width="400" height="220" fill={SCREEN} />
      <Chrome />

      <g clipPath="url(#mv-clip)">
        {/* Emblème CENTRÉ dans la zone d'écran, dessiné AVANT les scènes
            pour passer derrière elles. */}
        <g className="mv-brand">
          <Emblem cx={200} cy={122} r={30} />
        </g>

        {/* Les scènes, décalées sous la barre de fenêtre. Chacune emprunte
            la fenêtre d'affichage de son étape (frise-desc-N). */}
        <g transform="translate(0 12)">
          {visibles.map((Scene, i) => (
            <g key={i} className={`frise-desc-${i + 1}`}>
              <Scene />
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}
