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
    // DA « Banderole » : par défaut le dégradé de marque reste le trio du
    // logo (bleu → teal → vert, défini dans globals.css). Si l'accent est
    // personnalisé depuis l'admin, on aligne aussi la teinte centrale et les
    // deux bornes dessus, pour que rien ne jure avec la couleur choisie.
    vars.push(
      `--accent: ${r} ${g} ${b};`,
      `--brand-teal: ${r} ${g} ${b};`,
      `--gradient-from: ${accent};`,
      `--gradient-to: ${accent};`,
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
