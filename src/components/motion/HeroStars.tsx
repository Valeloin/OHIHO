type HeroStar = {
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  color: "cyan" | "emerald";
};

// Quelques étoiles seulement reprennent les points forts du fond raster.
// Les positions et les rythmes restent déterministes pour éviter tout saut
// à l'hydratation et tout clignotement collectif.
const STARS: HeroStar[] = [
  { left: "22.5%", top: "53%", size: 3.2, duration: 5.8, delay: -1.4, color: "cyan" },
  { left: "49.6%", top: "50%", size: 3.4, duration: 7.1, delay: -4.2, color: "cyan" },
  { left: "63%", top: "28%", size: 3, duration: 6.4, delay: -2.6, color: "cyan" },
  { left: "72.7%", top: "40%", size: 2.8, duration: 8.2, delay: -5.5, color: "cyan" },
  { left: "76.8%", top: "61%", size: 3.2, duration: 6.8, delay: -0.8, color: "emerald" },
  { left: "90.8%", top: "26%", size: 2.8, duration: 7.6, delay: -3.3, color: "emerald" },
  { left: "95.2%", top: "58%", size: 3.1, duration: 5.9, delay: -4.8, color: "emerald" },
];

export default function HeroStars() {
  return (
    <div aria-hidden="true" className="hero-stars pointer-events-none absolute inset-0 overflow-hidden">
      {STARS.map((star, index) => (
        <span
          key={index}
          className={`hero-star hero-star--${star.color}`}
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
