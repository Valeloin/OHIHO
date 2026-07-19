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
          // Noms hérités des DA précédentes, conservés le temps que les
          // derniers usages soient nettoyés.
          violet: "rgb(var(--accent) / <alpha-value>)",
          emerald: "rgb(var(--brand-emerald) / <alpha-value>)",
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
