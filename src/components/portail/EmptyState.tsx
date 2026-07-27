import type { ReactNode } from "react";

export default function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="card-dark flex flex-col items-center px-6 py-14 text-center sm:px-10">
      {/* Anneau au dégradé de marque, creux : signale « rien ici pour
          l'instant » sans recourir à une icône hors DA. Le disque intérieur
          reprend l'aplat de `.card-dark` (#071522) pour évider l'anneau. */}
      <span
        aria-hidden="true"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-sky via-brand-teal to-brand-emerald"
      >
        <span className="h-[3.15rem] w-[3.15rem] rounded-full bg-[#071522]" />
      </span>

      <h2 className="mt-6 text-lg font-semibold tracking-display">{title}</h2>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
        {description}
      </p>
      {action && <div className="mt-7">{action}</div>}
    </div>
  );
}
