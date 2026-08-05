import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        border: "var(--border)",
        muted: "var(--muted)",
        // DA « Banderole » : le trio de marque du logo. `accent`/`accent-cyan`
        // = le teal interactif (pilotable depuis /admin) ; `brand-*` = les
        // trois teintes fixes du logo, pour le dégradé et les points verts.
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          cyan: "rgb(var(--accent) / <alpha-value>)",
        },
        brand: {
          sky: "rgb(var(--brand-sky) / <alpha-value>)",
          teal: "rgb(var(--brand-teal) / <alpha-value>)",
          emerald: "rgb(var(--brand-emerald) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        // Réservé à l'accent « Parlons-en. » de la section Contact
        // (passation du 2026-08-05) : seule apparition d'une serif sur le
        // site, le reste de la DA est entièrement en sans-serif. Pile
        // système (pas de next/font/google) : cet environnement de dev a
        // un accès très lent à Google Fonts (~7 s par requête), et une
        // police système reste cohérente en prod comme en local.
        serif: [
          "ui-serif",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "Times",
          "serif",
        ],
      },
      borderRadius: {
        // Le rayon des cartes vient du token CSS ; les pilules gardent
        // `rounded-full`, qui n'est pas surchargé ici.
        DEFAULT: "var(--radius)",
        md: "var(--radius)",
        lg: "var(--radius)",
        xl: "var(--radius)",
        "2xl": "var(--radius)",
      },
      letterSpacing: {
        display: "-0.03em",
      },
    },
  },
  plugins: [],
};
export default config;
