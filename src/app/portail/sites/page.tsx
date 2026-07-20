import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mes sites & outils · OHIHO",
};

export default function PortailSitesPage() {
  return (
    <div className="card-surface p-8">
      <p className="text-sm leading-relaxed text-muted">
        Les sites et applications que nous développons pour vous apparaîtront
        ici une fois livrés, avec un accès direct.
      </p>
      <Link
        href="/portail/devis/nouveau"
        className="btn-accent mt-6 inline-flex px-6 py-2.5 text-sm font-semibold"
      >
        Demander un devis
      </Link>
    </div>
  );
}
