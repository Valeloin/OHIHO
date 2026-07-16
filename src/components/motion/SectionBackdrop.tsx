import AnimatedGlow from "@/components/motion/AnimatedGlow";

// Fond commun des sections intérieures, sur le modèle du hero : trame en
// grille + halos flottants + quelques pastilles lumineuses discrètes.
// Pur CSS (keyframes `particle-float`), aucun JavaScript côté client.
const BLEU = "56, 189, 248"; // #38bdf8
const TEAL = "34, 211, 196"; // #22d3c4
const VERT = "52, 211, 153"; // #34d399

type Particle = {
  left: string;
  top: string;
  size: number; // px
  rgb: string;
  duration: number; // s
  delay: number; // s
};

// Moins nombreuses et plus discrètes que sur le hero : les sections
// contiennent du texte à lire.
const PARTICLES: Particle[] = [
  { left: "4%", top: "24%", size: 4, rgb: TEAL, duration: 11, delay: -2 },
  { left: "14%", top: "78%", size: 5, rgb: BLEU, duration: 9, delay: -6 },
  { left: "38%", top: "10%", size: 4, rgb: VERT, duration: 13, delay: -4 },
  { left: "64%", top: "86%", size: 4, rgb: TEAL, duration: 10, delay: -8 },
  { left: "84%", top: "14%", size: 5, rgb: BLEU, duration: 12, delay: -3 },
  { left: "94%", top: "62%", size: 4, rgb: VERT, duration: 9, delay: -5 },
];

export default function SectionBackdrop() {
  return (
    <>
      {/* Trame en grille, comme le hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid"
      />
      {/* Halos flottants */}
      <AnimatedGlow variant="subtle" />
      {/* Pastilles lumineuses */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="particle absolute rounded-full"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: `rgba(${p.rgb}, 0.45)`,
              boxShadow: `0 0 ${p.size * 2}px rgba(${p.rgb}, 0.3)`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}
