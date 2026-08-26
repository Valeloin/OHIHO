import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tokens relevés sur la DA de mycalories. Les valeurs vivent dans
        // globals.css : aucune couleur n'est écrite en dur ici ni dans les
        // composants.
        page: "var(--page)",
        surface: "var(--surface)",
        "surface-alt": "var(--surface-alt)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        ink: "var(--ink)",
        "ink-muted": "var(--ink-muted)",
        accent: "var(--accent)",
        "accent-text": "var(--accent-text)",
        "on-accent": "var(--on-accent)",
        deep: "var(--deep)",
        "deep-alt": "var(--deep-alt)",
        "on-deep": "var(--on-deep)",
        "on-deep-muted": "var(--on-deep-muted)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        DEFAULT: "var(--radius-control)",
        md: "var(--radius-control)",
        lg: "var(--radius-control)",
        xl: "var(--radius)",
        "2xl": "var(--radius)",
      },
      maxWidth: {
        prose: "62ch",
      },
    },
  },
  plugins: [],
};
export default config;
