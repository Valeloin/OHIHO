"use client";

import { motion } from "framer-motion";
import type { QuoteProjectType } from "@/lib/supabase/types";

/**
 * Maquettes schématiques animées, une par formule de projet.
 * Même langage visuel que ProjectMockup (fenêtre de navigateur stylisée, 100% SVG,
 * aucune image externe), enrichi d'animations framer-motion pour illustrer
 * ce à quoi ressemble chaque type de projet.
 *
 * Les trois couleurs de base (fond d'écran, blocs, accent) sont éditables
 * depuis /admin ; les nuances intermédiaires (barre du navigateur, blocs
 * atténués…) sont dérivées automatiquement.
 */

export type PreviewColors = {
  screen: string;
  blocks: string;
  accent: string;
};

// Replis de la DA « Banderole » : neutres nuit bleu-teal + le teal du wordmark.
// (Les anciens replis venaient des DA vert-nuit / encre, abandonnées.)
const DEFAULT_COLORS: PreviewColors = {
  screen: "#071522",
  blocks: "#23405c",
  accent: "#22d3c4",
};

// Gris bleuté servant à éclaircir les mélanges (pastilles du navigateur, blocs
// « avant » de la refonte) : le gris de texte de la palette nuit.
const STONE = "#9fb2cc";

const HEX = /^#[0-9a-fA-F]{6}$/;

function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

// Mélange deux couleurs (t = 0 → a, t = 1 → b).
function mix(a: string, b: string, t: number): string {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  const to = (i: number) =>
    Math.round(ca[i] + (cb[i] - ca[i]) * t)
      .toString(16)
      .padStart(2, "0");
  return `#${to(0)}${to(1)}${to(2)}`;
}

type Palette = {
  screen: string;
  chrome: string; // barre du navigateur
  urlBar: string;
  block: string;
  blockSoft: string;
  sidebar: string;
  dot: string;
  accent: string;
};

function buildPalette(colors?: Partial<PreviewColors>): Palette {
  const safe = (v: string | undefined, fallback: string) =>
    v && HEX.test(v) ? v : fallback;
  const screen = safe(colors?.screen, DEFAULT_COLORS.screen);
  const blocks = safe(colors?.blocks, DEFAULT_COLORS.blocks);
  const accent = safe(colors?.accent, DEFAULT_COLORS.accent);
  return {
    screen,
    chrome: mix(screen, blocks, 0.35),
    urlBar: mix(screen, blocks, 0.05),
    block: blocks,
    blockSoft: mix(screen, blocks, 0.55),
    sidebar: mix(screen, blocks, 0.2),
    dot: mix(blocks, STONE, 0.35),
    accent,
  };
}

function Chrome({ p }: { p: Palette }) {
  return (
    <>
      <rect width="400" height="26" rx="8" fill={p.chrome} />
      <rect y="14" width="400" height="12" fill={p.chrome} />
      <circle cx="18" cy="13" r="3.5" fill={p.dot} />
      <circle cx="30" cy="13" r="3.5" fill={p.dot} />
      <circle cx="42" cy="13" r="3.5" fill={p.dot} />
      <rect x="60" y="7" width="150" height="12" rx="6" fill={p.urlBar} />
    </>
  );
}

function Landing({ p }: { p: Palette }) {
  // Une longue page qui défile en boucle sous la fenêtre.
  return (
    <>
      <clipPath id="clip-landing">
        <rect x="0" y="26" width="400" height="194" />
      </clipPath>
      <g clipPath="url(#clip-landing)">
        <motion.g
          initial={{ y: 0 }}
          animate={{ y: [0, -150, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
        >
          {/* Hero */}
          <rect x="40" y="48" width="220" height="18" rx="5" fill={p.block} />
          <rect x="40" y="74" width="150" height="10" rx="5" fill={p.blockSoft} />
          {/* Bouton en pilule, comme les boutons de la banderole. */}
          <rect x="40" y="98" width="80" height="22" rx="11" fill={p.accent} />
          <rect x="300" y="48" width="72" height="72" rx="10" fill={p.blockSoft} />
          <rect x="312" y="60" width="48" height="8" rx="4" fill={p.accent} opacity="0.6" />
          {/* Section 1 */}
          <rect x="40" y="150" width="332" height="60" rx="10" fill={p.blockSoft} />
          <rect x="56" y="166" width="120" height="9" rx="4" fill={p.accent} opacity="0.7" />
          <rect x="56" y="184" width="200" height="7" rx="3" fill={p.block} />
          {/* Section 2 : cartes */}
          <rect x="40" y="228" width="104" height="70" rx="10" fill={p.blockSoft} />
          <rect x="154" y="228" width="104" height="70" rx="10" fill={p.blockSoft} />
          <rect x="268" y="228" width="104" height="70" rx="10" fill={p.blockSoft} />
          {/* Bandeau CTA */}
          <rect x="40" y="316" width="332" height="46" rx="10" fill={p.accent} opacity="0.85" />
        </motion.g>
      </g>
    </>
  );
}

function Intermediaire({ p }: { p: Palette }) {
  // Plusieurs onglets : le surlignage passe de page en page, le contenu se recompose.
  const tabs = [40, 118, 196, 274];
  return (
    <>
      {/* Barre de navigation multi-pages */}
      {tabs.map((x, i) => (
        <rect key={x} x={x} y="40" width="60" height="10" rx="5" fill={p.block} opacity={i === 0 ? 0.9 : 0.5} />
      ))}
      <motion.rect
        y="54"
        width="60"
        height="3"
        rx="1.5"
        fill={p.accent}
        initial={{ x: 40 }}
        animate={{ x: [40, 118, 196, 274, 40] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", times: [0, 0.28, 0.56, 0.84, 1] }}
      />
      {/* Contenu qui se recompose (deux dispositions en fondu croisé) */}
      <motion.g
        animate={{ opacity: [1, 0, 1, 0, 1] }}
        transition={{ duration: 6, repeat: Infinity, times: [0, 0.28, 0.5, 0.78, 1] }}
      >
        <rect x="40" y="76" width="200" height="14" rx="5" fill={p.block} />
        <rect x="40" y="98" width="120" height="9" rx="4" fill={p.blockSoft} />
        <rect x="40" y="128" width="160" height="82" rx="10" fill={p.blockSoft} />
        <rect x="220" y="128" width="152" height="82" rx="10" fill={p.blockSoft} />
      </motion.g>
      <motion.g
        animate={{ opacity: [0, 1, 0, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity, times: [0, 0.28, 0.5, 0.78, 1] }}
      >
        <rect x="40" y="76" width="332" height="60" rx="10" fill={p.blockSoft} />
        <rect x="40" y="148" width="104" height="62" rx="10" fill={p.blockSoft} />
        <rect x="154" y="148" width="104" height="62" rx="10" fill={p.blockSoft} />
        <rect x="268" y="148" width="104" height="62" rx="10" fill={p.blockSoft} />
        <rect x="56" y="92" width="90" height="9" rx="4" fill={p.accent} opacity="0.7" />
      </motion.g>
    </>
  );
}

function Refonte({ p }: { p: Palette }) {
  // Avant / après : fondu croisé entre un ancien site terne et une version moderne.
  const oldBlock = mix(p.screen, STONE, 0.28);
  const oldSoft = mix(p.screen, STONE, 0.18);
  const oldText = mix(p.screen, STONE, 0.55);
  return (
    <>
      {/* AVANT — terne et tassé */}
      <motion.g
        animate={{ opacity: [1, 1, 0, 0, 1] }}
        transition={{ duration: 6, repeat: Infinity, times: [0, 0.35, 0.5, 0.9, 1] }}
      >
        <rect x="30" y="42" width="120" height="10" rx="2" fill={oldBlock} />
        <rect x="30" y="58" width="340" height="6" rx="2" fill={oldSoft} />
        <rect x="30" y="70" width="340" height="6" rx="2" fill={oldSoft} />
        <rect x="30" y="88" width="164" height="60" rx="2" fill={oldSoft} />
        <rect x="206" y="88" width="164" height="60" rx="2" fill={oldSoft} />
        <rect x="30" y="158" width="340" height="6" rx="2" fill={oldSoft} />
        <rect x="30" y="170" width="300" height="6" rx="2" fill={oldSoft} />
        <rect x="30" y="188" width="200" height="6" rx="2" fill={oldSoft} />
        <rect x="300" y="40" width="34" height="14" rx="2" fill={oldBlock} />
        <text x="30" y="212" fill={oldText} fontSize="13" fontFamily="monospace">Avant</text>
      </motion.g>
      {/* APRÈS — aéré et coloré */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity, times: [0, 0.35, 0.5, 0.9, 1] }}
      >
        <rect x="40" y="46" width="150" height="16" rx="5" fill={p.block} />
        <rect x="40" y="70" width="96" height="9" rx="4" fill={p.accent} opacity="0.7" />
        <rect x="40" y="92" width="72" height="20" rx="10" fill={p.accent} />
        <rect x="250" y="46" width="120" height="90" rx="12" fill={p.blockSoft} />
        <rect x="264" y="60" width="60" height="8" rx="4" fill={p.accent} opacity="0.6" />
        <rect x="40" y="150" width="104" height="56" rx="10" fill={p.blockSoft} />
        <rect x="154" y="150" width="104" height="56" rx="10" fill={p.blockSoft} />
        <rect x="268" y="150" width="104" height="56" rx="10" fill={p.blockSoft} />
        <text x="40" y="222" fill={p.accent} fontSize="13" fontFamily="monospace">Après</text>
      </motion.g>
    </>
  );
}

function Application({ p }: { p: Palette }) {
  // Tableau de bord : barre latérale + tuiles + graphique animé.
  // Les barres sont ancrées au BAS du cadre du graphique (y=132..212) : base à
  // 204 et hauteurs ≤ 62 pour rester à l'intérieur pendant l'animation.
  const bars = [
    { x: 208, base: 204, min: 26, max: 62 },
    { x: 240, base: 204, min: 46, max: 20 },
    { x: 272, base: 204, min: 18, max: 54 },
    { x: 304, base: 204, min: 58, max: 34 },
    { x: 336, base: 204, min: 30, max: 50 },
  ];
  return (
    <>
      {/* Barre latérale */}
      <rect x="0" y="26" width="60" height="194" fill={p.sidebar} />
      <rect x="14" y="46" width="32" height="8" rx="4" fill={p.accent} opacity="0.8" />
      <rect x="14" y="66" width="32" height="7" rx="3.5" fill={p.block} />
      <rect x="14" y="82" width="32" height="7" rx="3.5" fill={p.block} />
      <rect x="14" y="98" width="32" height="7" rx="3.5" fill={p.block} />
      {/* En-tête */}
      <rect x="76" y="42" width="120" height="12" rx="5" fill={p.block} />
      <circle cx="360" cy="48" r="10" fill={p.blockSoft} />
      {/* Tuiles de stats */}
      <rect x="76" y="70" width="90" height="48" rx="8" fill={p.blockSoft} />
      <rect x="176" y="70" width="90" height="48" rx="8" fill={p.blockSoft} />
      <rect x="276" y="70" width="96" height="48" rx="8" fill={p.blockSoft} />
      <rect x="86" y="82" width="40" height="7" rx="3.5" fill={p.accent} opacity="0.7" />
      <rect x="186" y="82" width="40" height="7" rx="3.5" fill={p.accent} opacity="0.7" />
      <rect x="286" y="82" width="40" height="7" rx="3.5" fill={p.accent} opacity="0.7" />
      {/* Graphique à barres animé */}
      <rect x="76" y="132" width="296" height="80" rx="8" fill={p.blockSoft} />
      {bars.map((b, i) => (
        <motion.rect
          key={b.x}
          x={b.x}
          width="18"
          rx="3"
          fill={p.accent}
          opacity={0.85}
          initial={{ y: b.base - b.min, height: b.min }}
          animate={{
            y: [b.base - b.min, b.base - b.max, b.base - b.min],
            height: [b.min, b.max, b.min],
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.18,
          }}
        />
      ))}
    </>
  );
}

export default function FormulaPreview({
  type,
  colors,
}: {
  type: QuoteProjectType;
  colors?: Partial<PreviewColors>;
}) {
  const p = buildPalette(colors);

  return (
    <svg
      viewBox="0 0 400 220"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      role="img"
      aria-label={`Aperçu — ${type}`}
    >
      {/* Arrondi doux : la maquette s'inscrit dans son cadre arrondi. */}
      <rect width="400" height="220" rx="10" fill={p.screen} />
      {type === "application" ? (
        <Application p={p} />
      ) : (
        <>
          {type === "landing" && <Landing p={p} />}
          {type === "intermediaire" && <Intermediaire p={p} />}
          {type === "refonte" && <Refonte p={p} />}
        </>
      )}
      <Chrome p={p} />
      {/* Liseré interne pour l'intégration sur fond clair */}
      <rect
        x="0.5"
        y="0.5"
        width="399"
        height="219"
        rx="10"
        fill="none"
        stroke="rgba(255,255,255,0.06)"
      />
    </svg>
  );
}
