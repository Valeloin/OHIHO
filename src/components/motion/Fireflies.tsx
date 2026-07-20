// Lucioles du fond : de minuscules points verts qui clignotent lentement,
// à la place des étoiles blanches fixes de la version précédente.
//
// Le mouvement est un SCINTILLEMENT D'OPACITÉ, jamais un déplacement
// ondulatoire ni un `scale` : c'est ce que fait une vraie luciole, et c'est
// aussi la seule forme d'animation de pastille retenue sur les projets de
// Valentin (l'ondulation lui donne le mal de mer).
//
// Positions, tailles et horloges sont FIXES et écrites en dur : un
// Math.random() produirait un rendu différent entre le serveur et le client
// et casserait l'hydratation. Chaque luciole a sa propre durée et son propre
// décalage pour que l'ensemble ne clignote jamais en cadence.
type Firefly = {
  left: string;
  top: string;
  size: number; // px
  duration: number; // s
  delay: number; // s — négatif : le cycle démarre déjà entamé
  peak: number; // opacité au sommet du clignotement
};

const FIREFLIES: Firefly[] = [
  { left: "5%", top: "22%", size: 2.5, duration: 6.5, delay: -1.2, peak: 0.9 },
  { left: "11%", top: "64%", size: 2, duration: 8.2, delay: -4.6, peak: 0.7 },
  { left: "16%", top: "36%", size: 3, duration: 5.4, delay: -2.9, peak: 0.95 },
  { left: "22%", top: "80%", size: 1.5, duration: 9.1, delay: -0.4, peak: 0.6 },
  { left: "28%", top: "14%", size: 2.5, duration: 7.3, delay: -5.8, peak: 0.85 },
  { left: "34%", top: "54%", size: 2, duration: 6.1, delay: -3.3, peak: 0.75 },
  { left: "41%", top: "26%", size: 3, duration: 8.7, delay: -6.5, peak: 0.9 },
  { left: "47%", top: "72%", size: 1.5, duration: 5.9, delay: -1.9, peak: 0.65 },
  { left: "53%", top: "18%", size: 2.5, duration: 7.8, delay: -4.1, peak: 0.85 },
  { left: "59%", top: "60%", size: 2, duration: 6.8, delay: -2.2, peak: 0.7 },
  { left: "65%", top: "34%", size: 3, duration: 9.4, delay: -7.1, peak: 0.95 },
  { left: "71%", top: "82%", size: 1.5, duration: 5.6, delay: -3.7, peak: 0.6 },
  { left: "77%", top: "24%", size: 2.5, duration: 8.4, delay: -0.9, peak: 0.8 },
  { left: "83%", top: "56%", size: 2, duration: 6.3, delay: -5.2, peak: 0.75 },
  { left: "88%", top: "38%", size: 3, duration: 7.6, delay: -2.6, peak: 0.9 },
  { left: "93%", top: "70%", size: 1.5, duration: 9.8, delay: -6.9, peak: 0.65 },
  { left: "96%", top: "16%", size: 2.5, duration: 6.9, delay: -3.9, peak: 0.85 },
  { left: "8%", top: "46%", size: 2, duration: 8.9, delay: -1.6, peak: 0.7 },
];

export default function Fireflies({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {FIREFLIES.map((fly, i) => {
        // Dérive : période, décalage et amplitude DÉRIVÉS DE L'INDICE, donc
        // stables entre le serveur et le client (un Math.random casserait
        // l'hydratation). Les trois suites ont des pas premiers entre eux
        // avec le nombre de lucioles : deux voisines ne retombent jamais sur
        // la même combinaison, et aucune vague d'ensemble ne se forme.
        const driftDuration = 19 + ((i * 7) % 16); // 19 → 34 s
        const driftDelay = -((i * 5) % 17); // départ déjà entamé
        const driftAmp = 4 + (i % 5) * 1.25; // 4 → 9 px

        return (
          <span
            key={i}
            className="firefly absolute rounded-full"
            style={{
              left: fly.left,
              top: fly.top,
              width: fly.size,
              height: fly.size,
              // Opacité de base : c'est elle qui subsiste si le visiteur a
              // désactivé les animations, donc elle doit rester visible.
              opacity: 0.45,
              // Deux animations en parallèle : scintillement, puis dérive.
              // L'ordre suit celui de `animation-name` dans globals.css.
              animationDuration: `${fly.duration}s, ${driftDuration}s`,
              animationDelay: `${fly.delay}s, ${driftDelay}s`,
              // Sommet du clignotement, lu par les keyframes `firefly-glow`.
              ["--fly-peak" as string]: fly.peak,
              // Le halo grandit avec la luciole pour garder un rendu homogène.
              ["--fly-halo" as string]: `${fly.size * 2.5}px`,
              // Amplitude de la dérive, lue par `firefly-drift`.
              ["--fly-drift" as string]: `${driftAmp}px`,
            }}
          />
        );
      })}
    </div>
  );
}
