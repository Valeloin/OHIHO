import type { BadgeTone } from "@/lib/portail/status";

const TONE_CLASSES: Record<BadgeTone, string> = {
  muted: "bg-surface-2 text-muted",
  teal: "bg-accent-cyan/10 text-accent-cyan",
  emerald: "bg-brand-emerald/10 text-brand-emerald",
  red: "bg-red-400/10 text-red-400",
  amber: "bg-amber-400/10 text-amber-400",
};

// Pastille de statut : sans, bas de casse, sans filet. Le fond teinté suffit
// à la détacher — le filet en plus créait une troisième ligne de contour sur
// des cartes qui en ont déjà une.
export default function StatusBadge({
  label,
  tone,
}: {
  label: string;
  tone: BadgeTone;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-[13px] font-medium ${TONE_CLASSES[tone]}`}
    >
      <span
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-current"
        aria-hidden="true"
      />
      {label}
    </span>
  );
}
