// Écran de la section Méthode : UNE ANIMATION PAR ÉTAPE, enchaînées en
// boucle. Remplace la vitrine 3D des deux appareils (MethodShowcase) à la
// demande du 2026-07-27.
//
// La visibilité de chaque scène est portée par les classes `frise-desc-*`
// (13,44 s) — celles qui pilotent déjà le titre et la description de
// l'étape en cours : la scène affichée est donc TOUJOURS celle de l'étape
// annoncée, par construction, sans second jeu d'horaires.
//
// Les micro-animations INTERNES des scènes (pastilles, remplissages)
// tournent sur leurs propres horloges pv-* : une boucle rapide dans une
// scène qui, elle, apparaît et disparaît sur l'horloge de la frise.
//
// Pur CSS, aucun JavaScript : le composant reste un server component.
// Décoratif (aria-hidden) : le texte au-dessus et en dessous porte le sens.
import { Chrome } from "@/components/motion/ServiceScene";

const SCREEN = "#071522";
const BLOCKS = "#23405c";
const ACCENT = "#22d3c4";
const LINE = "#9fb2cc";
const BRIGHT = "#eef4fc";
const SKY = "rgb(var(--brand-sky))";
const EMERALD = "rgb(var(--brand-emerald))";

/* --- 01 · Échange initial : une conversation ------------------------- */
function SceneEchange() {
  return (
    <g>
      {/* Vous, à gauche */}
      <circle cx="42" cy="66" r="12" fill={BLOCKS} fillOpacity="0.7" />
      <rect x="62" y="48" width="188" height="36" rx="12" fill={BLOCKS} fillOpacity="0.45" />
      <rect x="78" y="60" width="120" height="7" rx="3.5" fill={BRIGHT} fillOpacity="0.6" />
      <rect x="78" y="71" width="80" height="5" rx="2.5" fill={LINE} fillOpacity="0.35" />

      {/* OHIHO, à droite */}
      <circle cx="358" cy="128" r="12" fill={ACCENT} fillOpacity="0.8" />
      <rect x="150" y="110" width="188" height="36" rx="12" fill={ACCENT} fillOpacity="0.16" />
      <rect x="166" y="122" width="130" height="7" rx="3.5" fill={BRIGHT} fillOpacity="0.6" />
      <rect x="166" y="133" width="94" height="5" rx="2.5" fill={LINE} fillOpacity="0.35" />

      {/* Réponse en cours de frappe : trois points qui scintillent. */}
      <rect x="62" y="172" width="64" height="26" rx="13" fill={BLOCKS} fillOpacity="0.45" />
      {[82, 94, 106].map((cx, i) => (
        <circle
          key={cx}
          className="pv-dot"
          style={{ animationDelay: `${i * 0.35}s` }}
          cx={cx}
          cy="185"
          r="3.5"
          fill={LINE}
        />
      ))}
    </g>
  );
}

/* --- 02 · Maquette & devis : le fil de fer + le devis chiffré -------- */
function SceneMaquette() {
  return (
    <g>
      {/* La maquette, en fil de fer */}
      <rect x="24" y="44" width="200" height="156" rx="10" fill={BLOCKS} fillOpacity="0.25" />
      <rect x="40" y="60" width="90" height="10" rx="5" fill={BRIGHT} fillOpacity="0.55" />
      <rect x="40" y="78" width="140" height="6" rx="3" fill={LINE} fillOpacity="0.3" />
      <rect x="40" y="96" width="76" height="42" rx="6" fill="none" stroke={SKY} strokeOpacity="0.5" strokeDasharray="5 4" />
      <rect x="128" y="96" width="76" height="42" rx="6" fill="none" stroke={ACCENT} strokeOpacity="0.5" strokeDasharray="5 4" />
      <rect x="40" y="150" width="164" height="34" rx="6" fill="none" stroke={EMERALD} strokeOpacity="0.45" strokeDasharray="5 4" />

      {/* Le devis : des lignes chiffrées, un total mis en avant */}
      <rect x="244" y="44" width="132" height="156" rx="10" fill={BLOCKS} fillOpacity="0.4" />
      <rect x="258" y="60" width="66" height="8" rx="4" fill={BRIGHT} fillOpacity="0.6" />
      {[82, 100, 118, 136].map((y) => (
        <g key={y}>
          <rect x="258" y={y} width="58" height="5" rx="2.5" fill={LINE} fillOpacity="0.35" />
          <rect x="334" y={y} width="28" height="5" rx="2.5" fill={LINE} fillOpacity="0.5" />
        </g>
      ))}
      <rect x="256" y="158" width="108" height="26" rx="13" fill={ACCENT} fillOpacity="0.18" />
      <rect x="268" y="168" width="40" height="6" rx="3" fill={ACCENT} fillOpacity="0.9" />
      <rect x="330" y="168" width="24" height="6" rx="3" fill={BRIGHT} fillOpacity="0.8" />
    </g>
  );
}

/* --- 03 · Développement : l'éditeur, le code s'écrit ------------------ */
function SceneDeveloppement() {
  const widths = [128, 176, 150, 196, 112, 164, 140, 184];
  return (
    <g>
      {/* Barre latérale de l'éditeur */}
      <rect x="24" y="44" width="52" height="156" rx="8" fill={BLOCKS} fillOpacity="0.35" />
      {[58, 74, 90, 106].map((y, i) => (
        <rect key={y} x="34" y={y} width="32" height="6" rx="3" fill={i === 1 ? ACCENT : LINE} fillOpacity={i === 1 ? 0.8 : 0.3} />
      ))}

      {/* Le fichier : lignes de code indentées, deux couleurs de marque */}
      <rect x="88" y="44" width="288" height="156" rx="8" fill={BLOCKS} fillOpacity="0.22" />
      {widths.map((w, i) => (
        <rect
          key={i}
          x={104 + (i % 3 === 1 ? 18 : i % 3 === 2 ? 36 : 0)}
          y={58 + i * 15}
          width={w - (i % 3) * 12}
          height="6"
          rx="3"
          fill={i % 4 === 0 ? SKY : i % 4 === 2 ? EMERALD : LINE}
          fillOpacity={i % 4 === 1 || i % 4 === 3 ? 0.35 : 0.6}
        />
      ))}

      {/* Curseur qui clignote en bout de dernière ligne */}
      <rect className="pv-dot" x="262" y="161" width="2.5" height="10" fill={BRIGHT} />

      {/* La progression du chantier, sous le fichier */}
      <rect x="104" y="184" width="256" height="6" rx="3" fill={BLOCKS} fillOpacity="0.6" />
      <rect className="pv-fill" x="104" y="184" width="256" height="6" rx="3" fill={ACCENT} fillOpacity="0.85" />
    </g>
  );
}

/* --- 04 · Mise en ligne & suivi : le site est là, la courbe veille ---- */
function SceneEnLigne() {
  return (
    <g>
      {/* Le site livré, réduit : en-tête + hero */}
      <rect x="24" y="44" width="200" height="156" rx="10" fill={BLOCKS} fillOpacity="0.3" />
      <rect x="24" y="44" width="200" height="18" rx="9" fill={BLOCKS} fillOpacity="0.5" />
      <rect x="40" y="78" width="104" height="9" rx="4.5" fill={BRIGHT} fillOpacity="0.75" />
      <rect x="40" y="93" width="80" height="6" rx="3" fill={LINE} fillOpacity="0.35" />
      <rect x="40" y="110" width="58" height="18" rx="9" fill={ACCENT} fillOpacity="0.85" />
      <rect x="40" y="146" width="164" height="38" rx="6" fill={BLOCKS} fillOpacity="0.4" />

      {/* La coche de mise en ligne */}
      <circle cx="224" cy="62" r="16" fill={SCREEN} stroke={EMERALD} strokeWidth="2.5" />
      <path d="M217 62l5 5 9 -9" fill="none" stroke={EMERALD} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

      {/* Le suivi : la courbe de disponibilité, tracée en boucle */}
      <rect x="244" y="80" width="132" height="120" rx="10" fill={BLOCKS} fillOpacity="0.4" />
      <rect x="258" y="94" width="56" height="7" rx="3.5" fill={BRIGHT} fillOpacity="0.55" />
      {[118, 140, 162].map((y) => (
        <rect key={y} x="258" y={y} width="104" height="1" fill={LINE} fillOpacity="0.15" />
      ))}
      <polyline
        className="pv-line"
        points="258,168 278,150 296,158 316,132 336,140 362,116"
        fill="none"
        stroke={EMERALD}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle className="pv-dot" cx="362" cy="116" r="4" fill={EMERALD} />
    </g>
  );
}

const SCENES = [SceneEchange, SceneMaquette, SceneDeveloppement, SceneEnLigne];

/* Une SEULE scène, toujours visible : la version page (/methode/…) de la
   vitrine. Pas de classe frise-desc-*, donc pas de rotation — les
   micro-animations internes de la scène continuent de vivre. */
export function MethodSceneSingle({ index }: { index: number }) {
  const Scene = SCENES[Math.max(0, Math.min(index, SCENES.length - 1))];
  return (
    <svg
      viewBox="0 0 400 220"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="400" height="220" fill={SCREEN} />
      <Scene />
      <Chrome url="votre-projet.fr" />
    </svg>
  );
}

export default function MethodScenes({ steps }: { steps: number }) {
  // On ne rend que les scènes dont l'étape existe : si l'admin passe de
  // 4 à 3 étapes, la 4e ne s'affiche pas dans le vide.
  const visibles = SCENES.slice(0, Math.min(steps, SCENES.length));

  return (
    <svg
      viewBox="0 0 400 220"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="400" height="220" fill={SCREEN} />
      {visibles.map((Scene, i) => (
        <g key={i} className={`frise-desc-${i + 1}`}>
          <Scene />
        </g>
      ))}

      {/* TRANSITION DE MARQUE entre les scènes, la même que la vitrine du
          hero/services : un voile nuit couvre le changement, l'emblème OHIHO
          s'y affiche avec son anneau en rotation. Calée sur l'horloge de la
          frise (classes frise-veil / frise-emblem, quatre passages par
          cycle) : le préfixe `frise-` garantit qu'elle gèle et reprend avec
          le reste au clic sur une étape. */}
      <g className="frise-veil">
        <rect x="0" y="26" width="400" height="194" fill={SCREEN} opacity="0.94" />
      </g>
      <g className="frise-emblem">
        <svg x="166" y="89" width="68" height="68" viewBox="0 0 100 100">
          <defs>
            <linearGradient
              id="mvt-ring"
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
            <radialGradient id="mvt-disc" cx="0.4" cy="0.32" r="0.9">
              <stop offset="0" stopColor="#16273f" />
              <stop offset="1" stopColor="#0a1524" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="46.5" fill="url(#mvt-disc)" />
          <circle
            cx="50"
            cy="50"
            r="46.5"
            fill="none"
            stroke="var(--pv-blocks, #23405c)"
            strokeWidth="5"
          />
          <g className="pv-rotate">
            <circle
              cx="50"
              cy="50"
              r="46.5"
              fill="none"
              stroke="url(#mvt-ring)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="152 140"
            />
          </g>
          <rect x="30" y="28" width="8" height="44" rx="4" fill="rgb(var(--brand-sky))" />
          <rect x="46" y="21" width="8" height="58" rx="4" fill="rgb(var(--brand-teal))" />
          <rect x="62" y="28" width="8" height="44" rx="4" fill="rgb(var(--brand-emerald))" />
        </svg>
      </g>

      <Chrome url="votre-projet.fr" />
    </svg>
  );
}
