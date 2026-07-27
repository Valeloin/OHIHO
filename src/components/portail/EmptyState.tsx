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
    <div className="card-surface px-6 py-14 text-center sm:px-10">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-muted">{description}</p>
      {action && <div className="mt-7">{action}</div>}
    </div>
  );
}
