// Ciel étoilé de la banderole : de minuscules points clairs, semés de façon
// irrégulière sur le fond nuit. Positions FIXES et écrites en dur (pas de
// Math.random, qui produirait un rendu différent entre le serveur et le
// client et casserait l'hydratation). Aucune animation : la banderole est
// immobile, le site aussi.
type Star = { left: string; top: string; size: number; opacity: number };

const STARS: Star[] = [
  { left: "6%", top: "18%", size: 2, opacity: 0.5 },
  { left: "11%", top: "62%", size: 1.5, opacity: 0.35 },
  { left: "17%", top: "34%", size: 2.5, opacity: 0.45 },
  { left: "23%", top: "78%", size: 1.5, opacity: 0.3 },
  { left: "29%", top: "12%", size: 2, opacity: 0.4 },
  { left: "36%", top: "52%", size: 1.5, opacity: 0.3 },
  { left: "43%", top: "24%", size: 2, opacity: 0.45 },
  { left: "51%", top: "72%", size: 1.5, opacity: 0.35 },
  { left: "58%", top: "16%", size: 2.5, opacity: 0.4 },
  { left: "64%", top: "44%", size: 1.5, opacity: 0.3 },
  { left: "71%", top: "80%", size: 2, opacity: 0.4 },
  { left: "78%", top: "28%", size: 1.5, opacity: 0.35 },
  { left: "84%", top: "58%", size: 2.5, opacity: 0.45 },
  { left: "91%", top: "20%", size: 1.5, opacity: 0.3 },
  { left: "95%", top: "70%", size: 2, opacity: 0.4 },
];

export default function Starfield({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {STARS.map((star, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-foreground"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  );
}
