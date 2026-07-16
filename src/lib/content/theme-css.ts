import type { ThemeContent } from "./types";
import { defaultContent } from "./defaults";

// Génère le CSS d'écrasement du thème à partir des couleurs enregistrées dans
// l'admin. On n'émet QUE ce qui diffère des valeurs par défaut : globals.css
// reste la source de vérité tant que rien n'est personnalisé.
// Le sélecteur `html:root` est volontairement plus spécifique que `:root`
// pour gagner quel que soit l'ordre d'injection des feuilles de style.

const HEX = /^#[0-9a-fA-F]{6}$/;

function safeHex(value: string | undefined, fallback: string): string {
  return value && HEX.test(value) ? value : fallback;
}

function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

// Éclaircit une couleur vers le blanc (pour dériver le second ton du dégradé
// de titre quand l'accent change).
function lighten(hex: string, amount: number): string {
  const mix = (c: number) => Math.round(c + (255 - c) * amount);
  const [r, g, b] = hexToRgb(hex).map(mix) as [number, number, number];
  const to = (c: number) => c.toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

export function themeCss(theme: ThemeContent): string {
  const d = defaultContent.theme;
  const accent = safeHex(theme.accent, d.accent);
  const headerBg = safeHex(theme.headerBg, d.headerBg);
  const cardDark = safeHex(theme.cardDark, d.cardDark);
  const background = safeHex(theme.darkBackground, d.darkBackground);
  const surface = safeHex(theme.darkSurface, d.darkSurface);

  const vars: string[] = [];
  const extra: string[] = [];

  if (accent.toLowerCase() !== d.accent.toLowerCase()) {
    const [r, g, b] = hexToRgb(accent);
    const accent2 = lighten(accent, 0.55);
    vars.push(
      `--accent: ${r} ${g} ${b};`,
      `--accent-2: ${accent2};`,
      `--accent-glow: rgb(${r} ${g} ${b} / 0.28);`
    );
  }
  if (background.toLowerCase() !== d.darkBackground.toLowerCase()) {
    vars.push(`--background: ${background};`);
  }
  if (surface.toLowerCase() !== d.darkSurface.toLowerCase()) {
    vars.push(`--surface: ${surface};`);
  }
  if (headerBg.toLowerCase() !== d.headerBg.toLowerCase()) {
    vars.push(`--header-bg: ${headerBg};`);
  }
  if (cardDark.toLowerCase() !== d.cardDark.toLowerCase()) {
    extra.push(`html:root .card-dark { background: ${cardDark}; }`);
  }

  const blocks: string[] = [];
  if (vars.length) blocks.push(`html:root { ${vars.join(" ")} }`);
  blocks.push(...extra);

  return blocks.join("\n");
}
