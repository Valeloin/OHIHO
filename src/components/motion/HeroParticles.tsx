// Pastilles lumineuses flottantes du hero — pur CSS (keyframes
// `particle-float` dans globals.css), aucun JavaScript côté client.
// Positions et rythmes fixés à la main : rendu identique serveur/client,
// et une répartition choisie plutôt qu'aléatoire.
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

const PARTICLES: Particle[] = [
  { left: "6%", top: "28%", size: 6, rgb: TEAL, duration: 9, delay: 0 },
  { left: "12%", top: "62%", size: 4, rgb: BLEU, duration: 12, delay: -3 },
  { left: "18%", top: "18%", size: 5, rgb: VERT, duration: 10, delay: -6 },
  { left: "24%", top: "74%", size: 7, rgb: TEAL, duration: 13, delay: -2 },
  { left: "30%", top: "38%", size: 4, rgb: BLEU, duration: 8, delay: -5 },
  { left: "38%", top: "12%", size: 5, rgb: TEAL, duration: 11, delay: -8 },
  { left: "46%", top: "82%", size: 6, rgb: VERT, duration: 9, delay: -4 },
  { left: "54%", top: "20%", size: 4, rgb: BLEU, duration: 12, delay: -1 },
  { left: "62%", top: "68%", size: 5, rgb: TEAL, duration: 10, delay: -7 },
  { left: "70%", top: "30%", size: 7, rgb: VERT, duration: 13, delay: -9 },
  { left: "76%", top: "78%", size: 4, rgb: BLEU, duration: 8, delay: -3 },
  { left: "82%", top: "16%", size: 6, rgb: TEAL, duration: 11, delay: -5 },
  { left: "88%", top: "52%", size: 5, rgb: VERT, duration: 9, delay: -2 },
  { left: "94%", top: "34%", size: 4, rgb: BLEU, duration: 12, delay: -6 },
];

export default function HeroParticles() {
  return (
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
            background: `rgba(${p.rgb}, 0.55)`,
            boxShadow: `0 0 ${p.size * 2}px rgba(${p.rgb}, 0.4)`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
