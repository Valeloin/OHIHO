// ============================================================
// Scènes animées des 4 formules de projet — une histoire par
// formule, jouée en boucle sur une horloge de 8,4 s.
//
// Même langage visuel que les maquettes du portail (fenêtre de
// navigateur stylisée, 100 % SVG, aucune image), mais animées en
// PUR CSS (classes pv-* de globals.css, zéro JS) : le composant
// reste un server component et ne dépend pas de framer-motion.
//
// Ces scènes sont DÉCORATIVES (aria-hidden) : le texte qui les
// accompagne porte le sens.
//
// Correspondance formule → scène (l'API reste celle des devis) :
//   landing       → SceneDigitalisation (les tâches se cochent)
//   intermediaire → SceneMaintenance    (l'erreur est corrigée)
//   refonte       → SceneRefonte        (avant / après)
//   application   → SceneApplication    (tableau de bord)
//
// Couleurs : les trois couleurs de base sont lues dans des
// variables CSS avec repli, pour qu'un parent puisse les
// surcharger en style inline (même patron que quoteStyleVars
// dans DevisWizard, alimenté par les couleurs de l'admin) :
//   --pv-screen  fond d'écran de la maquette
//   --pv-blocks  aplats, cartes, barre du navigateur
//   --pv-accent  accent de la maquette
// Le trio de marque (ciel / teal / émeraude) reste fixe : c'est
// l'identité du logo, elle n'est pas éditable.
//
// NB : ce fichier ne remplace pas FormulaPreview (portail + admin),
// qui garde son aperçu live des couleurs du CMS.
// ============================================================

import type { QuoteProjectType } from "@/lib/supabase/types";

/* --- Palette ------------------------------------------------
   SCREEN / BLOCKS / ACCENT sont pilotables ; LINE et BRIGHT sont
   les deux neutres clairs de la palette nuit, indispensables pour
   rester lisible sur le fond sombre (traits et textes secondaires
   pour LINE, éléments qui doivent ressortir pour BRIGHT). */
const SCREEN = "var(--pv-screen, #071522)";
const BLOCKS = "var(--pv-blocks, #23405c)";
const ACCENT = "var(--pv-accent, #22d3c4)";
const LINE = "#9fb2cc";
const BRIGHT = "#eef4fc";
const SKY = "rgb(var(--brand-sky))";
const EMERALD = "rgb(var(--brand-emerald))";

/* --- Barre de navigateur, commune à toutes les scènes --- */
export function Chrome({
  url,
  urlSwap,
}: {
  url?: string;
  /** [avant, après] : l'URL change en même temps que la scène
      bascule (mêmes horloges pv-old / pv-new de 8,4 s). */
  urlSwap?: [string, string];
}) {
  return (
    <>
      <rect width="400" height="26" fill={BLOCKS} fillOpacity="0.55" />
      {/* Pastilles du trio de marque : elles scintillent en opacité,
          jamais en taille, et sont décalées pour éviter l'effet de vague. */}
      <circle className="pv-dot" cx="16" cy="13" r="4" fill={SKY} />
      <circle
        className="pv-dot"
        style={{ animationDelay: "0.4s" }}
        cx="30"
        cy="13"
        r="4"
        fill={ACCENT}
      />
      <circle
        className="pv-dot"
        style={{ animationDelay: "0.8s" }}
        cx="44"
        cy="13"
        r="4"
        fill={EMERALD}
      />
      {url || urlSwap ? (
        <>
          <rect
            x="130"
            y="5"
            width="160"
            height="16"
            rx="8"
            fill={BLOCKS}
            fillOpacity="0.5"
          />
          {urlSwap ? (
            <>
              <text
                className="pv-old"
                x="210"
                y="16.5"
                textAnchor="middle"
                fontSize="9"
                fontWeight="600"
                fill={LINE}
                fillOpacity="0.75"
              >
                {urlSwap[0]}
              </text>
              <text
                className="pv-new"
                x="210"
                y="16.5"
                textAnchor="middle"
                fontSize="9"
                fontWeight="600"
                fill={LINE}
                fillOpacity="0.75"
              >
                {urlSwap[1]}
              </text>
            </>
          ) : (
            <text
              x="210"
              y="16.5"
              textAnchor="middle"
              fontSize="9"
              fontWeight="600"
              fill={LINE}
              fillOpacity="0.75"
            >
              {url}
            </text>
          )}
        </>
      ) : (
        <rect
          x="150"
          y="7"
          width="120"
          height="12"
          rx="6"
          fill={BLOCKS}
          fillOpacity="0.5"
        />
      )}
    </>
  );
}

/* ============================================================
   1. DIGITALISATION — les tâches se cochent, la progression avance.
   Quatre lignes de tâche : la coche apparaît sur chacune à son
   tour (2 / 16 / 30 / 44 %), la barre de progression se remplit
   jusqu'à 56 %, tout se maintient jusqu'à 90 %, puis tout se
   décoche ENSEMBLE à couvert pendant l'interstitiel.
   ============================================================ */
export function SceneDigitalisation() {
  const rows = [44, 84, 124, 164];
  return (
    <>
      {rows.map((y, i) => (
        <g key={y}>
          <rect
            x="36"
            y={y}
            width="328"
            height="30"
            rx="8"
            fill={BLOCKS}
            fillOpacity="0.35"
            stroke={BLOCKS}
          />
          <rect x="48" y={y + 9} width="12" height="12" rx="3" fill={SKY} fillOpacity="0.5" />
          <rect
            x="72"
            y={y + 9}
            width={140 - i * 14}
            height="7"
            rx="3.5"
            fill={BRIGHT}
            fillOpacity="0.5"
          />
          <rect
            x="72"
            y={y + 19}
            width={90 - i * 8}
            height="4"
            rx="2"
            fill={LINE}
            fillOpacity="0.3"
          />
          {/* Cochage séquentiel — tout se décoche ensemble en fin de cycle */}
          <g className={`pv-pop-${i + 1}`}>
            <circle cx="340" cy={y + 15} r="10" fill={EMERALD} fillOpacity="0.18" />
            <path
              d={`M334 ${y + 15}l4 4 8 -8`}
              stroke={EMERALD}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>
        </g>
      ))}
      {/* Progression */}
      <rect x="36" y="204" width="328" height="8" rx="4" fill={BLOCKS} fillOpacity="0.5" />
      <rect className="pv-fill" x="36" y="204" width="328" height="8" rx="4" fill={ACCENT} fillOpacity="0.85" />
    </>
  );
}

/* ============================================================
   2. MAINTENANCE — le fichier défile (0-20 %), s'arrête pile sur
   la ligne fautive, celle-ci clignote et la pastille ✕ apparaît
   (26-46 %), puis la correction est validée par un ✓ (52-95 %).
   ============================================================ */
export function SceneMaintenance() {
  // Un long fichier de code : 13 rangées, la fautive est la 9e (y=222).
  // Le groupe .pv-scroll remonte de 110 px → elle s'arrête pile à y=112.
  const widths = [150, 210, 180, 226, 130, 194, 168, 204, 0, 176, 148, 216, 186];
  return (
    <>
      {/* Fenêtre de défilement : tout ce qui sort de la zone de
          contenu est coupé net — aucun chevauchement avec le haut. */}
      <defs>
        <clipPath id="ohv-scroll-clip">
          <rect x="0" y="40" width="400" height="180" />
        </clipPath>
      </defs>
      <g clipPath="url(#ohv-scroll-clip)">
        <g className="pv-scroll">
          {widths.map((w, k) => {
            const y = 46 + k * 22;
            return (
              <g key={y}>
                {/* Gouttière : numéro de ligne */}
                <rect x="24" y={y} width="14" height="7" rx="3.5" fill={LINE} fillOpacity="0.22" />
                {w > 0 ? (
                  <rect
                    x="56"
                    y={y}
                    width={w}
                    height="9"
                    rx="4.5"
                    fill={LINE}
                    fillOpacity="0.28"
                    opacity={k % 2 ? 0.8 : 1}
                  />
                ) : (
                  /* LA ligne fautive : normale pendant le défilement,
                     clignote à l'arrêt, puis validée */
                  <rect
                    className="pv-code"
                    x="56"
                    y={y}
                    width="240"
                    height="9"
                    rx="4.5"
                    fill={LINE}
                    fillOpacity="0.28"
                  />
                )}
              </g>
            );
          })}
        </g>
      </g>
      {/* Pastille erreur (✕) pendant le clignotement… */}
      <g className="pv-err">
        <circle cx="330" cy="116" r="12" fill={ACCENT} fillOpacity="0.15" />
        <path
          d="M325 111l10 10M335 111l-10 10"
          stroke={ACCENT}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </g>
      {/* …puis correction validée (✓) une fois la ligne saine */}
      <g className="pv-fix">
        <circle cx="330" cy="116" r="12" fill={EMERALD} fillOpacity="0.18" />
        <path
          d="M323 116l5 5 9 -9"
          stroke={EMERALD}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
      {/* Badge maintenance en bas à droite (fond opaque : le code
          défile dessous sans le traverser) */}
      <rect x="284" y="182" width="88" height="24" rx="12" fill={SCREEN} />
      <rect x="284" y="182" width="88" height="24" rx="12" fill={ACCENT} fillOpacity="0.12" />
      <circle cx="298" cy="194" r="4" fill={ACCENT} fillOpacity="0.85" />
      <rect x="308" y="190" width="52" height="8" rx="4" fill={ACCENT} fillOpacity="0.4" />
    </>
  );
}

/* ============================================================
   3. REFONTE — avant / après.
   L'Avant est terne et tassé (gris bleuté de la palette nuit à
   très faible opacité, jamais du bordeaux : sur fond sombre il
   disparaîtrait). L'Après arrive en cascade, les micro-barres se
   chargent, et un reflet balaye l'écran en dernier acte.
   ============================================================ */
export function SceneRefonte() {
  const cards = [
    { x: 40, color: SKY },
    { x: 154, color: ACCENT },
    { x: 268, color: EMERALD },
  ];
  return (
    <>
      {/* AVANT — figé, sans respiration */}
      <g className="pv-old" fill={LINE}>
        <rect x="28" y="40" width="120" height="10" rx="1" fillOpacity="0.3" />
        <rect x="300" y="38" width="42" height="14" rx="1" fillOpacity="0.25" />
        <rect x="28" y="58" width="344" height="6" rx="1" fillOpacity="0.13" />
        <rect x="28" y="70" width="344" height="6" rx="1" fillOpacity="0.13" />
        <rect x="28" y="88" width="166" height="58" rx="1" fillOpacity="0.1" />
        <rect x="206" y="88" width="166" height="58" rx="1" fillOpacity="0.1" />
        <rect x="28" y="156" width="344" height="6" rx="1" fillOpacity="0.13" />
        <rect x="28" y="168" width="298" height="6" rx="1" fillOpacity="0.13" />
        <rect x="28" y="180" width="212" height="6" rx="1" fillOpacity="0.13" />
        {/* Étiquette en pastille, marge garantie avec le bord bas */}
        <rect x="28" y="192" width="58" height="20" rx="10" fillOpacity="0.1" />
        <text x="57" y="206" textAnchor="middle" fontSize="12" fontWeight="700" fillOpacity="0.55">
          Avant
        </text>
      </g>

      {/* APRÈS — aéré, arrondi, aux couleurs de la marque */}
      <g className="pv-new">
        <rect className="pv-in-1" x="40" y="46" width="150" height="15" rx="6" fill={BRIGHT} fillOpacity="0.85" />
        <rect className="pv-in-2" x="40" y="70" width="96" height="8" rx="4" fill={EMERALD} fillOpacity="0.8" />
        <rect className="pv-in-3" x="40" y="90" width="76" height="20" rx="10" fill={ACCENT} />
        <g className="pv-in-2">
          <rect x="250" y="44" width="122" height="88" rx="12" fill={BLOCKS} fillOpacity="0.55" />
          {/* Scintillement interne */}
          <rect className="pv-dot" x="264" y="58" width="60" height="8" rx="4" fill={SKY} fillOpacity="0.85" />
        </g>
        {/* 3 cartes riches : pastille colorée, contenu, micro-barre qui se
            charge — le site refondu est vivant. Apparition décalée. */}
        {cards.map((card, i) => (
          <g key={card.x} className={`pv-in-${4 + i}`}>
            <rect x={card.x} y="146" width="104" height="40" rx="10" fill={BLOCKS} fillOpacity="0.5" />
            <circle cx={card.x + 18} cy="160" r="5" fill={card.color} />
            <rect x={card.x + 30} y="152" width="48" height="6" rx="3" fill={BRIGHT} fillOpacity="0.5" />
            <rect x={card.x + 30} y="162" width="34" height="4" rx="2" fill={LINE} fillOpacity="0.3" />
            <rect
              className="pv-spark"
              x={card.x + 12}
              y="174"
              width="80"
              height="4"
              rx="2"
              fill={card.color}
              fillOpacity="0.6"
            />
          </g>
        ))}
        <g className="pv-in-3">
          <rect x="306" y="192" width="66" height="20" rx="10" fill={ACCENT} fillOpacity="0.16" />
          <text x="339" y="206" textAnchor="middle" fontSize="12" fontWeight="700" fill={ACCENT}>
            Après
          </text>
        </g>
        {/* Reflet « tout neuf » : bande lumineuse qui balaye l'écran */}
        <defs>
          <linearGradient id="ohv-shine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={BRIGHT} stopOpacity="0" />
            <stop offset="0.5" stopColor={BRIGHT} stopOpacity="0.28" />
            <stop offset="1" stopColor={BRIGHT} stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect className="pv-shine" x="-90" y="26" width="80" height="194" fill="url(#ohv-shine)" />
      </g>
    </>
  );
}

/* ============================================================
   4. APPLICATION — l'outil métier sur mesure.
   Le menu change d'onglet et le contenu bascule : tuiles de
   chiffres + barres vivantes → les sommets apparaissent un à un
   puis la courbe se trace à travers eux.
   ============================================================ */
export function SceneApplication() {
  // Variantes a/b/c + délais irréguliers = mouvement anarchique de
  // données vivantes (jamais de vague synchronisée).
  const bars = [
    { x: 205, h: 56, fill: SKY, o: 0.7, variant: "pv-bar-a", delay: "0s" },
    { x: 237, h: 40, fill: SKY, o: 0.9, variant: "pv-bar-c", delay: "0.6s" },
    { x: 269, h: 62, fill: EMERALD, o: 0.8, variant: "pv-bar-b", delay: "0.15s" },
    { x: 301, h: 46, fill: ACCENT, o: 0.85, variant: "pv-bar-a", delay: "1.1s" },
    { x: 333, h: 58, fill: ACCENT, o: 0.65, variant: "pv-bar-c", delay: "0.35s" },
  ];
  return (
    <>
      {/* Barre latérale : l'indicateur d'onglet actif se déplace */}
      <rect x="0" y="26" width="60" height="194" fill={BLOCKS} fillOpacity="0.3" />
      <rect className="pv-side" x="8" y="41" width="44" height="14" rx="7" fill={ACCENT} fillOpacity="0.16" />
      {/* La couleur active suit l'indicateur d'onglet */}
      <rect className="pv-tab-1" x="13" y="44" width="34" height="8" rx="4" fill={ACCENT} fillOpacity="0.8" />
      <rect className="pv-tab-2" x="13" y="64" width="34" height="7" rx="3.5" fill={BLOCKS} />
      <rect x="13" y="80" width="34" height="7" rx="3.5" fill={BLOCKS} />
      <rect x="13" y="96" width="34" height="7" rx="3.5" fill={BLOCKS} />
      {/* En-tête */}
      <rect x="76" y="42" width="120" height="12" rx="6" fill={BRIGHT} fillOpacity="0.5" />
      <circle cx="360" cy="48" r="10" fill={BLOCKS} fillOpacity="0.7" />

      {/* VUE 1 — tuiles de chiffres + barres */}
      <g className="pv-old">
        {[76, 178, 280].map((x, i) => (
          <g key={x}>
            <rect
              x={x}
              y="68"
              width="92"
              height="46"
              rx="8"
              fill={BLOCKS}
              fillOpacity="0.35"
              stroke={BLOCKS}
            />
            <rect x={x + 12} y="80" width="38" height="6" rx="3" fill={LINE} fillOpacity="0.35" />
            <rect
              x={x + 12}
              y="94"
              width={i === 0 ? 52 : i === 1 ? 44 : 48}
              height="10"
              rx="5"
              fill={i === 0 ? BRIGHT : i === 1 ? ACCENT : EMERALD}
              fillOpacity={i === 0 ? 0.7 : 0.85}
            />
          </g>
        ))}
        <rect
          x="76"
          y="128"
          width="296"
          height="84"
          rx="8"
          fill={BLOCKS}
          fillOpacity="0.3"
          stroke={BLOCKS}
        />
        {bars.map((b) => (
          <rect
            key={b.x}
            className={`pv-bar ${b.variant}`}
            style={{ animationDelay: b.delay }}
            x={b.x}
            y={204 - b.h}
            width="18"
            height={b.h}
            rx="3"
            fill={b.fill}
            fillOpacity={b.o}
          />
        ))}
      </g>

      {/* VUE 2 — la courbe se trace et grimpe */}
      <g className="pv-new">
        <rect
          x="76"
          y="68"
          width="296"
          height="144"
          rx="8"
          fill={BLOCKS}
          fillOpacity="0.3"
          stroke={BLOCKS}
        />
        {[100, 132, 164].map((y) => (
          <line key={y} x1="92" y1={y} x2="356" y2={y} stroke={LINE} strokeOpacity="0.14" strokeWidth="1.5" />
        ))}
        {/* 1. Les 5 sommets apparaissent un à un… */}
        <circle className="pv-peak-1" cx="142" cy="158" r="5" fill={SKY} />
        <circle className="pv-peak-2" cx="186" cy="172" r="5" fill={EMERALD} />
        <circle className="pv-peak-3" cx="232" cy="124" r="5" fill={SKY} />
        <circle className="pv-peak-4" cx="270" cy="142" r="5" fill={EMERALD} />
        <circle className="pv-peak-5" cx="322" cy="96" r="5" fill={ACCENT} />
        {/* 2. …puis la courbe se trace à travers eux */}
        <path
          className="pv-line"
          d="M96 190 L142 158 L186 172 L232 124 L270 142 L322 96"
          fill="none"
          stroke={ACCENT}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </>
  );
}

/* --- Aiguillage : la scène correspondant à une formule --- */
export function Scene({ type }: { type: QuoteProjectType }) {
  if (type === "landing") return <SceneDigitalisation />;
  if (type === "intermediaire") return <SceneMaintenance />;
  if (type === "refonte") return <SceneRefonte />;
  return <SceneApplication />;
}

// Fausses URLs : elles rendent la fenêtre plus crédible. Comme dans
// les vignettes d'origine, seules deux scènes en portent une ; les
// deux autres gardent la barre d'adresse neutre.
// Refonte : l'URL bascule avec la scène (ancien site → nouveau).
const CHROME_PROPS: Record<
  QuoteProjectType,
  { url?: string; urlSwap?: [string, string] }
> = {
  landing: {},
  intermediaire: {},
  refonte: { urlSwap: ["ancien-site.fr", "votre-nouveau-site.fr"] },
  application: { url: "votre-application.fr" },
};

/* --- Vignette autonome : une scène dans sa fenêtre --- */
export default function ServiceScene({ type }: { type: QuoteProjectType }) {
  return (
    <svg
      viewBox="0 0 400 220"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="400" height="220" fill={SCREEN} />
      <Scene type={type} />
      <Chrome {...CHROME_PROPS[type]} />
    </svg>
  );
}
