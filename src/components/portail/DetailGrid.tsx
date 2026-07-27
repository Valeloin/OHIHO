import type { ReactNode } from "react";

// Grille libellé / valeur, le motif de lecture d'un tableau de bord : le
// libellé discret au-dessus, la valeur en pleine lisibilité en dessous.
export default function DetailGrid({
  items,
}: {
  items: { label: string; value: ReactNode }[];
}) {
  return (
    <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="min-w-0">
          <dt className="text-[13px] text-muted">{item.label}</dt>
          <dd className="mt-2">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
