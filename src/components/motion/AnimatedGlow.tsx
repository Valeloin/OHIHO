// Halos lumineux flottants, purs CSS (keyframes `drift` dans globals.css) :
// aucun JavaScript côté client, le composant reste un server component.
// DA bleu → vert : les halos déclinent les trois teintes de la marque
// (bleu ciel, teal, vert émeraude) pour faire vivre le dégradé en fond.
const BLEU = "56, 189, 248"; // #38bdf8
const TEAL = "34, 211, 196"; // #22d3c4
const VERT = "52, 211, 153"; // #34d399

type Blob = {
  pos: string; // classes de positionnement
  size: string;
  rgb: string; // teinte du halo (canaux R, G, B)
  alpha: number; // intensité du halo
  drift: string; // classe d'animation drift-a / drift-b / drift-c
};

const VARIANTS: Record<"hero" | "subtle", Blob[]> = {
  hero: [
    {
      pos: "left-1/2 top-0 -translate-x-1/2 -translate-y-1/4",
      size: "h-[520px] w-[720px]",
      rgb: TEAL,
      alpha: 0.13,
      drift: "drift-a",
    },
    {
      pos: "left-[6%] top-[38%]",
      size: "h-[340px] w-[340px]",
      rgb: BLEU,
      alpha: 0.1,
      drift: "drift-b",
    },
    {
      pos: "right-[4%] top-[12%]",
      size: "h-[300px] w-[300px]",
      rgb: VERT,
      alpha: 0.09,
      drift: "drift-c",
    },
  ],
  // Sections intérieures : présence discrète mais vivante.
  subtle: [
    {
      pos: "left-[8%] top-[18%]",
      size: "h-[420px] w-[420px]",
      rgb: BLEU,
      alpha: 0.08,
      drift: "drift-b",
    },
    {
      pos: "left-[42%] top-[46%]",
      size: "h-[320px] w-[320px]",
      rgb: TEAL,
      alpha: 0.06,
      drift: "drift-a",
    },
    {
      pos: "right-[4%] bottom-[8%]",
      size: "h-[360px] w-[360px]",
      rgb: VERT,
      alpha: 0.07,
      drift: "drift-c",
    },
  ],
};

export default function AnimatedGlow({
  variant = "subtle",
  className = "",
}: {
  variant?: keyof typeof VARIANTS;
  className?: string;
}) {
  const blobs = VARIANTS[variant];

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {blobs.map((blob, i) => (
        <div key={i} className={`absolute ${blob.pos} ${blob.size}`}>
          <div
            className={`h-full w-full rounded-full blur-3xl ${blob.drift}`}
            style={{
              background: `radial-gradient(circle, rgba(${blob.rgb}, ${blob.alpha}) 0%, rgba(${blob.rgb}, 0) 70%)`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
