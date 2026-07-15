"use client";

import { motion } from "framer-motion";
import type { QuoteProjectType } from "@/lib/supabase/types";

/**
 * Maquettes schématiques animées, une par formule de projet.
 * Même langage visuel que ProjectMockup (fenêtre de navigateur stylisée, 100% SVG,
 * aucune image externe), enrichi d'animations framer-motion pour illustrer
 * ce à quoi ressemble chaque type de projet.
 */

const ACCENT: Record<QuoteProjectType, string> = {
  landing: "#38bdf8",
  intermediaire: "#818cf8",
  refonte: "#34d399",
  application: "#38bdf8",
};

const SCREEN = "#0e1526";
const CHROME = "#172033";
const BLOCK = "#26314a";
const BLOCK_SOFT = "#1c2437";

function Chrome() {
  return (
    <>
      <rect width="400" height="26" rx="12" fill={CHROME} />
      <rect y="14" width="400" height="12" fill={CHROME} />
      <circle cx="18" cy="13" r="3.5" fill="#3a4460" />
      <circle cx="30" cy="13" r="3.5" fill="#3a4460" />
      <circle cx="42" cy="13" r="3.5" fill="#3a4460" />
      <rect x="60" y="7" width="150" height="12" rx="6" fill="#0f1626" />
    </>
  );
}

function Landing({ color }: { color: string }) {
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
          <rect x="40" y="48" width="220" height="18" rx="5" fill={BLOCK} />
          <rect x="40" y="74" width="150" height="10" rx="5" fill={BLOCK_SOFT} />
          <rect x="40" y="98" width="80" height="22" rx="11" fill={color} />
          <rect x="300" y="48" width="72" height="72" rx="10" fill={BLOCK_SOFT} />
          <rect x="312" y="60" width="48" height="8" rx="4" fill={color} opacity="0.6" />
          {/* Section 1 */}
          <rect x="40" y="150" width="332" height="60" rx="10" fill={BLOCK_SOFT} />
          <rect x="56" y="166" width="120" height="9" rx="4" fill={color} opacity="0.7" />
          <rect x="56" y="184" width="200" height="7" rx="3" fill={BLOCK} />
          {/* Section 2 : cartes */}
          <rect x="40" y="228" width="104" height="70" rx="10" fill={BLOCK_SOFT} />
          <rect x="154" y="228" width="104" height="70" rx="10" fill={BLOCK_SOFT} />
          <rect x="268" y="228" width="104" height="70" rx="10" fill={BLOCK_SOFT} />
          {/* Bandeau CTA */}
          <rect x="40" y="316" width="332" height="46" rx="10" fill={color} opacity="0.85" />
        </motion.g>
      </g>
    </>
  );
}

function Intermediaire({ color }: { color: string }) {
  // Plusieurs onglets : le surlignage passe de page en page, le contenu se recompose.
  const tabs = [40, 118, 196, 274];
  return (
    <>
      {/* Barre de navigation multi-pages */}
      {tabs.map((x, i) => (
        <rect key={x} x={x} y="40" width="60" height="10" rx="5" fill={BLOCK} opacity={i === 0 ? 0.9 : 0.5} />
      ))}
      <motion.rect
        y="54"
        width="60"
        height="3"
        rx="1.5"
        fill={color}
        initial={{ x: 40 }}
        animate={{ x: [40, 118, 196, 274, 40] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", times: [0, 0.28, 0.56, 0.84, 1] }}
      />
      {/* Contenu qui se recompose (deux dispositions en fondu croisé) */}
      <motion.g
        animate={{ opacity: [1, 0, 1, 0, 1] }}
        transition={{ duration: 6, repeat: Infinity, times: [0, 0.28, 0.5, 0.78, 1] }}
      >
        <rect x="40" y="76" width="200" height="14" rx="5" fill={BLOCK} />
        <rect x="40" y="98" width="120" height="9" rx="4" fill={BLOCK_SOFT} />
        <rect x="40" y="128" width="160" height="82" rx="10" fill={BLOCK_SOFT} />
        <rect x="220" y="128" width="152" height="82" rx="10" fill={BLOCK_SOFT} />
      </motion.g>
      <motion.g
        animate={{ opacity: [0, 1, 0, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity, times: [0, 0.28, 0.5, 0.78, 1] }}
      >
        <rect x="40" y="76" width="332" height="60" rx="10" fill={BLOCK_SOFT} />
        <rect x="40" y="148" width="104" height="62" rx="10" fill={BLOCK_SOFT} />
        <rect x="154" y="148" width="104" height="62" rx="10" fill={BLOCK_SOFT} />
        <rect x="268" y="148" width="104" height="62" rx="10" fill={BLOCK_SOFT} />
        <rect x="56" y="92" width="90" height="9" rx="4" fill={color} opacity="0.7" />
      </motion.g>
    </>
  );
}

function Refonte({ color }: { color: string }) {
  // Avant / après : fondu croisé entre un ancien site terne et une version moderne.
  return (
    <>
      {/* AVANT — terne et tassé */}
      <motion.g
        animate={{ opacity: [1, 1, 0, 0, 1] }}
        transition={{ duration: 6, repeat: Infinity, times: [0, 0.35, 0.5, 0.9, 1] }}
      >
        <rect x="30" y="42" width="120" height="10" rx="2" fill="#3a4460" />
        <rect x="30" y="58" width="340" height="6" rx="2" fill="#2a3550" />
        <rect x="30" y="70" width="340" height="6" rx="2" fill="#2a3550" />
        <rect x="30" y="88" width="164" height="60" rx="2" fill="#2a3550" />
        <rect x="206" y="88" width="164" height="60" rx="2" fill="#2a3550" />
        <rect x="30" y="158" width="340" height="6" rx="2" fill="#2a3550" />
        <rect x="30" y="170" width="300" height="6" rx="2" fill="#2a3550" />
        <rect x="30" y="188" width="200" height="6" rx="2" fill="#2a3550" />
        <rect x="300" y="40" width="34" height="14" rx="2" fill="#3a4460" />
        <text x="30" y="212" fill="#5b6472" fontSize="13" fontFamily="monospace">Avant</text>
      </motion.g>
      {/* APRÈS — aéré et coloré */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity, times: [0, 0.35, 0.5, 0.9, 1] }}
      >
        <rect x="40" y="46" width="150" height="16" rx="5" fill={BLOCK} />
        <rect x="40" y="70" width="96" height="9" rx="4" fill={color} opacity="0.7" />
        <rect x="40" y="92" width="72" height="20" rx="10" fill={color} />
        <rect x="250" y="46" width="120" height="90" rx="12" fill={BLOCK_SOFT} />
        <rect x="264" y="60" width="60" height="8" rx="4" fill={color} opacity="0.6" />
        <rect x="40" y="150" width="104" height="56" rx="10" fill={BLOCK_SOFT} />
        <rect x="154" y="150" width="104" height="56" rx="10" fill={BLOCK_SOFT} />
        <rect x="268" y="150" width="104" height="56" rx="10" fill={BLOCK_SOFT} />
        <text x="40" y="222" fill={color} fontSize="13" fontFamily="monospace">Après</text>
      </motion.g>
    </>
  );
}

function Application({ color }: { color: string }) {
  // Tableau de bord : barre latérale + tuiles + graphique animé.
  const bars = [
    { x: 214, base: 150, min: 40, max: 96 },
    { x: 250, base: 150, min: 66, max: 30 },
    { x: 286, base: 150, min: 30, max: 82 },
    { x: 322, base: 150, min: 88, max: 52 },
    { x: 358, base: 150, min: 48, max: 74 },
  ];
  return (
    <>
      {/* Barre latérale */}
      <rect x="0" y="26" width="60" height="194" fill="#131b2b" />
      <rect x="14" y="46" width="32" height="8" rx="4" fill={color} opacity="0.8" />
      <rect x="14" y="66" width="32" height="7" rx="3.5" fill={BLOCK} />
      <rect x="14" y="82" width="32" height="7" rx="3.5" fill={BLOCK} />
      <rect x="14" y="98" width="32" height="7" rx="3.5" fill={BLOCK} />
      {/* En-tête */}
      <rect x="76" y="42" width="120" height="12" rx="5" fill={BLOCK} />
      <circle cx="360" cy="48" r="10" fill={BLOCK_SOFT} />
      {/* Tuiles de stats */}
      <rect x="76" y="70" width="90" height="48" rx="8" fill={BLOCK_SOFT} />
      <rect x="176" y="70" width="90" height="48" rx="8" fill={BLOCK_SOFT} />
      <rect x="276" y="70" width="96" height="48" rx="8" fill={BLOCK_SOFT} />
      <rect x="86" y="82" width="40" height="7" rx="3.5" fill={color} opacity="0.7" />
      <rect x="186" y="82" width="40" height="7" rx="3.5" fill={color} opacity="0.7" />
      <rect x="286" y="82" width="40" height="7" rx="3.5" fill={color} opacity="0.7" />
      {/* Graphique à barres animé */}
      <rect x="76" y="132" width="296" height="80" rx="8" fill={BLOCK_SOFT} />
      {bars.map((b, i) => (
        <motion.rect
          key={b.x}
          x={b.x}
          width="18"
          rx="3"
          fill={color}
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

export default function FormulaPreview({ type }: { type: QuoteProjectType }) {
  const color = ACCENT[type];

  return (
    <svg
      viewBox="0 0 400 220"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      role="img"
      aria-label={`Aperçu — ${type}`}
    >
      <rect width="400" height="220" rx="12" fill={SCREEN} />
      {type === "application" ? (
        <Application color={color} />
      ) : (
        <>
          {type === "landing" && <Landing color={color} />}
          {type === "intermediaire" && <Intermediaire color={color} />}
          {type === "refonte" && <Refonte color={color} />}
        </>
      )}
      <Chrome />
      {/* Liseré interne pour l'intégration sur fond clair */}
      <rect
        x="0.5"
        y="0.5"
        width="399"
        height="219"
        rx="12"
        fill="none"
        stroke="rgba(255,255,255,0.06)"
      />
    </svg>
  );
}
