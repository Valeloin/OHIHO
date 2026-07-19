// DA « Banderole » : les maquettes reprennent le trio de marque du logo posé
// sur les neutres nuit bleu-teal. Les clés restent celles du type Project ;
// seules les valeurs changent.
const ACCENT_COLORS = {
  cyan: "#38bdf8", // bleu ciel de marque
  violet: "#22d3c4", // teal de marque (le « I » du wordmark)
  emerald: "#34d399", // vert émeraude de marque
  red: "#23405c", // filet nuit, pour les accents sourds
} as const;

export default function ProjectMockup({
  accent = "cyan",
  label = "Aperçu générique de site",
}: {
  accent?: keyof typeof ACCENT_COLORS;
  label?: string;
}) {
  const color = ACCENT_COLORS[accent];

  return (
    <svg
      viewBox="0 0 400 260"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      role="img"
      aria-label={label}
    >
      {/* Fond nuit bleu-teal */}
      <rect width="400" height="260" fill="#091a29" />

      {/* chrome de navigateur : aplat surface + filet 1px */}
      <rect width="400" height="34" fill="#102436" />
      <rect y="33.5" width="400" height="1" fill="#23405c" />
      <rect x="16" y="14" width="6" height="6" rx="3" fill="#23405c" />
      <rect x="30" y="14" width="6" height="6" rx="3" fill="#23405c" />
      <rect x="44" y="14" width="6" height="6" rx="3" fill="#23405c" />
      <rect x="70" y="10" width="180" height="14" rx="7" fill="#17304a" />

      {/* nav */}
      <rect x="24" y="54" width="46" height="10" rx="5" fill={color} opacity="0.7" />
      <rect x="90" y="54" width="36" height="10" rx="5" fill="#23405c" />
      <rect x="134" y="54" width="36" height="10" rx="5" fill="#23405c" />
      <rect x="178" y="54" width="36" height="10" rx="5" fill="#23405c" />
      {/* Bouton de nav en pilule, comme la banderole */}
      <rect x="330" y="50" width="46" height="18" rx="9" fill={color} opacity="0.9" />

      {/* bloc héros */}
      <rect x="24" y="88" width="220" height="16" rx="8" fill="#9fb2cc" opacity="0.55" />
      <rect x="24" y="112" width="160" height="12" rx="6" fill="#23405c" />
      <rect x="24" y="140" width="90" height="24" rx="12" fill={color} />

      {/* cartes de contenu : aplat surface + filet */}
      <rect x="24" y="188" width="106" height="52" rx="8" fill="#102436" stroke="#23405c" />
      <rect x="147" y="188" width="106" height="52" rx="8" fill="#102436" stroke="#23405c" />
      <rect x="270" y="188" width="106" height="52" rx="8" fill="#102436" stroke="#23405c" />
      <rect x="36" y="200" width="60" height="8" rx="4" fill={color} opacity="0.8" />
      <rect x="36" y="214" width="80" height="6" rx="3" fill="#23405c" />
      <rect x="159" y="200" width="60" height="8" rx="4" fill={color} opacity="0.8" />
      <rect x="159" y="214" width="80" height="6" rx="3" fill="#23405c" />
      <rect x="282" y="200" width="60" height="8" rx="4" fill={color} opacity="0.8" />
      <rect x="282" y="214" width="80" height="6" rx="3" fill="#23405c" />
    </svg>
  );
}
