const ACCENT_COLORS = {
  cyan: "#38bdf8",
  violet: "#818cf8",
  emerald: "#34d399",
} as const;

export default function ProjectMockup({
  accent = "cyan",
}: {
  accent?: keyof typeof ACCENT_COLORS;
}) {
  const color = ACCENT_COLORS[accent];

  return (
    <svg
      viewBox="0 0 400 260"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      role="img"
      aria-label="Aperçu générique de site"
    >
      <rect width="400" height="260" rx="14" fill="#0f1524" />

      {/* browser chrome */}
      <rect width="400" height="34" rx="14" fill="#151b2c" />
      <rect y="20" width="400" height="14" fill="#151b2c" />
      <circle cx="20" cy="17" r="4" fill="#3a4460" />
      <circle cx="34" cy="17" r="4" fill="#3a4460" />
      <circle cx="48" cy="17" r="4" fill="#3a4460" />
      <rect x="70" y="10" width="180" height="14" rx="7" fill="#1c2436" />

      {/* nav */}
      <rect x="24" y="54" width="46" height="10" rx="5" fill={color} opacity="0.6" />
      <rect x="90" y="54" width="36" height="10" rx="5" fill="#2a3550" />
      <rect x="134" y="54" width="36" height="10" rx="5" fill="#2a3550" />
      <rect x="178" y="54" width="36" height="10" rx="5" fill="#2a3550" />
      <rect x="330" y="50" width="46" height="18" rx="9" fill={color} opacity="0.85" />

      {/* hero block */}
      <rect x="24" y="88" width="220" height="16" rx="4" fill="#3a4460" />
      <rect x="24" y="112" width="160" height="12" rx="4" fill="#2a3550" />
      <rect x="24" y="140" width="90" height="24" rx="12" fill={color} />

      {/* content cards */}
      <rect x="24" y="188" width="106" height="52" rx="8" fill="#151b2c" />
      <rect x="147" y="188" width="106" height="52" rx="8" fill="#151b2c" />
      <rect x="270" y="188" width="106" height="52" rx="8" fill="#151b2c" />
      <rect x="36" y="200" width="60" height="8" rx="4" fill={color} opacity="0.7" />
      <rect x="36" y="214" width="80" height="6" rx="3" fill="#2a3550" />
      <rect x="159" y="200" width="60" height="8" rx="4" fill={color} opacity="0.7" />
      <rect x="159" y="214" width="80" height="6" rx="3" fill="#2a3550" />
      <rect x="282" y="200" width="60" height="8" rx="4" fill={color} opacity="0.7" />
      <rect x="282" y="214" width="80" height="6" rx="3" fill="#2a3550" />
    </svg>
  );
}
