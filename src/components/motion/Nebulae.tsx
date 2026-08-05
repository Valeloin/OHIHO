// Nébuleuses diffuses communes aux fonds nuit. Elles restent purement
// décoratives et vivent derrière le contenu, les scènes et les lucioles.
export default function Nebulae({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`nebula-field pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <span className="nebula nebula-cyan" />
      <span className="nebula nebula-teal" />
      <span className="nebula nebula-emerald" />
      <span className="nebula nebula-hero-center" />
      <span className="nebula nebula-hero-upper" />
    </div>
  );
}
