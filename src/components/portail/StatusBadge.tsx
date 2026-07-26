import type { BadgeTone } from "@/lib/portail/status";

const TONE_CLASSES: Record<BadgeTone, string> = {
  muted: "border-border bg-surface-2/60 text-muted",
  teal: "border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan",
  emerald: "border-brand-emerald/40 bg-brand-emerald/10 text-brand-emerald",
  red: "border-red-400/40 bg-red-400/10 text-red-400",
};

export default function StatusBadge({
  label,
  tone,
}: {
  label: string;
  tone: BadgeTone;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] ${TONE_CLASSES[tone]}`}
    >
      <span
        className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]"
        aria-hidden="true"
      />
      {label}
    </span>
  );
}
