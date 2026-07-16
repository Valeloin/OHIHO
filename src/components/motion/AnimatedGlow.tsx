// Halos lumineux flottants, purs CSS (keyframes `drift` dans globals.css) :
// aucun JavaScript côté client, le composant reste un server component.
type Blob = {
  pos: string; // classes de positionnement
  size: string;
  alpha: number; // intensité du halo (opacité du dégradé accent)
  drift: string; // classe d'animation drift-a / drift-b / drift-c
};

const VARIANTS: Record<"hero" | "subtle", Blob[]> = {
  hero: [
    {
      pos: "left-1/2 top-0 -translate-x-1/2 -translate-y-1/4",
      size: "h-[520px] w-[720px]",
      alpha: 0.14,
      drift: "drift-a",
    },
    {
      pos: "left-[6%] top-[38%]",
      size: "h-[340px] w-[340px]",
      alpha: 0.09,
      drift: "drift-b",
    },
    {
      pos: "right-[4%] top-[12%]",
      size: "h-[300px] w-[300px]",
      alpha: 0.08,
      drift: "drift-c",
    },
  ],
  // Sections intérieures : présence discrète mais vivante.
  subtle: [
    {
      pos: "left-[8%] top-[18%]",
      size: "h-[420px] w-[420px]",
      alpha: 0.06,
      drift: "drift-b",
    },
    {
      pos: "right-[4%] bottom-[8%]",
      size: "h-[360px] w-[360px]",
      alpha: 0.05,
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
              background: `radial-gradient(circle, rgb(var(--accent) / ${blob.alpha}) 0%, rgb(var(--accent) / 0) 70%)`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
