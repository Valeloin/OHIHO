import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // DA « Ciel » (2026-08-25). Les valeurs vivent dans globals.css :
        // aucune couleur n'est écrite en dur ici ni dans les composants.
        page: "var(--page)",
        surface: "var(--surface)",
        "surface-alt": "var(--surface-alt)",
        ink: "var(--ink)",
        "ink-muted": "var(--ink-muted)",
        line: "var(--line)",
        // Fond bleu nuit des sections d'appui, et ses deux teintes de texte.
        deep: "var(--deep)",
        "deep-alt": "var(--deep-alt)",
        "on-deep": "var(--on-deep)",
        "on-deep-muted": "var(--on-deep-muted)",
        // Trio de marque du logo, en canaux RGB pour que les modificateurs
        // d'opacité de Tailwind fonctionnent (`bg-brand-emerald/10`).
        brand: {
          sky: "rgb(var(--brand-sky) / <alpha-value>)",
          teal: "rgb(var(--brand-teal) / <alpha-value>)",
          emerald: "rgb(var(--brand-emerald) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        md: "calc(var(--radius) - 6px)",
        lg: "calc(var(--radius) - 3px)",
        xl: "var(--radius)",
        "2xl": "calc(var(--radius) + 8px)",
      },
      letterSpacing: {
        display: "-0.035em",
      },
      maxWidth: {
        prose: "62ch",
      },
    },
  },
  plugins: [],
};
export default config;
