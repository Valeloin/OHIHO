import type { ReactNode } from "react";

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
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="portail-title">{title}</h1>
        {subtitle && (
          <p className="mt-2 max-w-xl text-muted">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
