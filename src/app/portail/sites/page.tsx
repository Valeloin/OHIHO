import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mes sites & outils — OHIHO",
};

export default function PortailSitesPage() {
  return (
    <div className="card-surface rounded-2xl p-8 text-center">
      <p className="text-sm text-muted">
        Les sites et applications que nous développons pour vous apparaîtront
        ici une fois livrés, avec un accès direct.
      </p>
      <Link
        href="/portail/devis/nouveau"
        className="mt-6 inline-flex rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
      >
        Demander un devis
      </Link>
    </div>
  );
}
