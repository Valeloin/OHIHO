import type { ReactNode } from "react";

// Bandeau de page : titre à gauche, action principale à droite, filet en
// dessous. Le même sur les cinq onglets, pour qu'on sache où on est d'un
// coup d'œil.
export default function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
      <div className="min-w-0">
        <h1 className="portail-title">{title}</h1>
        {subtitle && <p className="mt-2 text-[14px] text-muted">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
