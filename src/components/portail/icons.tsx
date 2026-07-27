// Jeu d'icônes minimal du portail. Écrit à la main plutôt qu'importé d'une
// librairie : cinq traits suffisent et ça évite d'embarquer un paquet entier
// pour six pictogrammes.
type IconProps = { className?: string };

const BASE = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function IconOverview({ className }: IconProps) {
  return (
    <svg {...BASE} className={className}>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
    </svg>
  );
}

export function IconUser({ className }: IconProps) {
  return (
    <svg {...BASE} className={className}>
      <circle cx="12" cy="8" r="3.75" />
      <path d="M4.5 20.5c0-3.6 3.4-5.75 7.5-5.75s7.5 2.15 7.5 5.75" />
    </svg>
  );
}

export function IconProject({ className }: IconProps) {
  return (
    <svg {...BASE} className={className}>
      <path d="M12 3 3 7.5l9 4.5 9-4.5L12 3Z" />
      <path d="m3 12.5 9 4.5 9-4.5" />
      <path d="m3 17 9 4.5 9-4.5" />
    </svg>
  );
}

export function IconInvoice({ className }: IconProps) {
  return (
    <svg {...BASE} className={className}>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="M2.5 10h19" />
      <path d="M6.5 14.5h4" />
    </svg>
  );
}

export function IconSupport({ className }: IconProps) {
  return (
    <svg {...BASE} className={className}>
      <path d="M21 14.5a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2Z" />
    </svg>
  );
}

export function IconLogout({ className }: IconProps) {
  return (
    <svg {...BASE} className={className}>
      <path d="M9.5 20.5H5.5a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2h4" />
      <path d="m16 16.5 4.5-4.5L16 7.5" />
      <path d="M20.5 12h-11" />
    </svg>
  );
}

export function IconChevron({ className }: IconProps) {
  return (
    <svg {...BASE} className={className}>
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}
