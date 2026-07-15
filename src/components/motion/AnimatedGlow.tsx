const PALETTES = {
  // Un seul halo statique et discret sur le hero — plus de blobs animés.
  hero: "radial-gradient(circle, rgba(56,189,248,0.10) 0%, rgba(56,189,248,0) 70%)",
  subtle: null,
};

export default function AnimatedGlow({
  variant = "subtle",
  className = "",
}: {
  variant?: keyof typeof PALETTES;
  className?: string;
}) {
  const glow = PALETTES[variant];

  // Les sections intérieures restent épurées : aucun halo.
  if (!glow) return null;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className="absolute left-1/2 top-0 h-[520px] w-[720px] -translate-x-1/2 -translate-y-1/4 rounded-full blur-3xl"
        style={{ background: glow }}
      />
    </div>
  );
}
