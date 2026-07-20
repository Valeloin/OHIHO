// Pictogrammes animés des chiffres du hero. Un dessin par argument, en pur
// CSS (classes `hs-*` de globals.css) : aucun JavaScript, le composant reste
// un server component.
//
// Le choix se fait par INDICE et non par le texte : les libellés viennent du
// CMS et peuvent changer, l'indice non. Au-delà de quatre chiffres, on boucle
// sur les quatre dessins (`% 4`) plutôt que de rendre du vide.
const SKY = "#38bdf8";
const TEAL = "#22d3c4";
const EMERALD = "#34d399";
const RAIL = "#23405c";

function Sliders() {
  return (
    <>
      {[0, 1, 2].map((r) => (
        <rect key={r} x="6" y={11 + r * 9} width="28" height="2" rx="1" fill={RAIL} />
      ))}
      <circle className="hs hs-knob-a" cx="13" cy="12" r="3.5" fill={SKY} />
      <circle className="hs hs-knob-b" cx="27" cy="21" r="3.5" fill={TEAL} />
      <circle className="hs hs-knob-a" cx="16" cy="30" r="3.5" fill={EMERALD} style={{ animationDelay: "-2.8s" }} />
    </>
  );
}

function Parcours() {
  return (
    <>
      <path d="M8 28h24" stroke={RAIL} strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="8" cy="28" r="3" fill={SKY} />
      <circle className="hs hs-travel" cx="8" cy="28" r="3" fill={TEAL} />
      <circle cx="32" cy="28" r="3" fill={RAIL} />
      <path
        className="hs hs-arrive"
        d="M14 14l4 4 8 -8"
        pathLength={1}
        stroke={EMERALD}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </>
  );
}

function Barres() {
  // Le motif de l'emblème OHIHO : trois barres, la centrale plus haute.
  const bars = [
    { x: 10, h: 14, fill: SKY, delay: "0s" },
    { x: 18, h: 22, fill: TEAL, delay: "-2.1s" },
    { x: 26, h: 16, fill: EMERALD, delay: "-4.2s" },
  ];
  return (
    <>
      <path d="M6 33h28" stroke={RAIL} strokeWidth="2" strokeLinecap="round" fill="none" />
      {bars.map((b) => (
        <rect
          key={b.x}
          className="hs hs-bar"
          x={b.x}
          y={31 - b.h}
          width="5"
          height={b.h}
          rx="2.5"
          fill={b.fill}
          style={{ animationDelay: b.delay }}
        />
      ))}
    </>
  );
}

function Interface() {
  return (
    <>
      <rect x="5" y="8" width="30" height="24" rx="4" fill="none" stroke={RAIL} strokeWidth="2" />
      <path d="M5 15h30" stroke={RAIL} strokeWidth="2" />
      {/* L'interrupteur : la piste, puis la pastille qui bascule. */}
      <rect x="11" y="20" width="18" height="8" rx="4" fill={RAIL} />
      <circle className="hs hs-switch" cx="15" cy="24" r="3" fill={EMERALD} />
      {/* Le curseur vient le cliquer. */}
      <path
        className="hs hs-cursor"
        d="M25 25l7 3 -3 1 -1 3z"
        fill={TEAL}
      />
    </>
  );
}

const GLYPHS = [Sliders, Parcours, Barres, Interface];

export default function StatGlyph({ index }: { index: number }) {
  const Glyph = GLYPHS[index % GLYPHS.length];
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
      className="h-10 w-10"
    >
      <Glyph />
    </svg>
  );
}
