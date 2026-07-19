// Halo de fond de la DA « Banderole ».
// Sur la banderole, le fond nuit s'éclaircit en son centre d'un voile teal,
// et le bord bas-droite porte une pointe de vert. Reproduit ici en nappes
// FIXES (aucune animation) : pur CSS, le composant reste un server component.
const TEAL = "34, 211, 196"; // #22d3c4
const EMERALD = "52, 211, 153"; // #34d399
const SKY = "56, 189, 248"; // #38bdf8

type Wash = {
  pos: string; // classes de positionnement
  size: string;
  rgb: string;
  alpha: number;
};

const VARIANTS: Record<"hero" | "subtle", Wash[]> = {
  // Hero : la nappe teal centrale de la banderole, plus deux touches de
  // bleu et de vert aux extrémités du dégradé de marque.
  hero: [
    {
      pos: "left-1/2 top-0 -translate-x-1/2 -translate-y-1/4",
      size: "h-[640px] w-[1100px]",
      rgb: TEAL,
      alpha: 0.14,
    },
    {
      pos: "left-[4%] top-[45%]",
      size: "h-[380px] w-[380px]",
      rgb: SKY,
      alpha: 0.09,
    },
    {
      pos: "right-[2%] bottom-[6%]",
      size: "h-[360px] w-[360px]",
      rgb: EMERALD,
      alpha: 0.09,
    },
  ],
  // Sections intérieures : une seule nappe, très diluée.
  subtle: [
    {
      pos: "right-[-8%] top-[8%]",
      size: "h-[520px] w-[560px]",
      rgb: TEAL,
      alpha: 0.06,
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
  const washes = VARIANTS[variant];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {washes.map((wash, i) => (
        <div
          key={i}
          className={`absolute rounded-full blur-3xl ${wash.pos} ${wash.size}`}
          style={{
            background: `radial-gradient(circle, rgba(${wash.rgb}, ${wash.alpha}) 0%, rgba(${wash.rgb}, 0) 70%)`,
          }}
        />
      ))}
    </div>
  );
}
