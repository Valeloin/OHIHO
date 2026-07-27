import type { ReactNode } from "react";
import { IconChevron } from "@/components/portail/icons";

// Bloc de contenu du portail : un bandeau de titre, un filet, puis le corps.
// `flush` retire le rembourrage du corps pour les listes qui portent déjà le
// leur ligne par ligne.
export default function Panel({
  title,
  action,
  children,
  flush = false,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  flush?: boolean;
}) {
  return (
    <section className="card-surface overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-3.5">
        <h2 className="font-medium">{title}</h2>
        {action}
      </div>
      <div className={flush ? "" : "p-6"}>{children}</div>
    </section>
  );
}

// Même bloc, mais repliable — pour ce qui est consultable sans être
// nécessaire à chaque visite.
export function CollapsiblePanel({
  title,
  meta,
  children,
  defaultOpen = false,
}: {
  title: string;
  meta?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details className="card-surface group overflow-hidden" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center gap-3 px-6 py-3.5 [&::-webkit-details-marker]:hidden">
        <IconChevron className="h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-90" />
        <span className="font-medium">{title}</span>
        {meta && <span className="ml-auto text-[14px] text-muted">{meta}</span>}
      </summary>
      <div className="border-t border-border p-6">{children}</div>
    </details>
  );
}
