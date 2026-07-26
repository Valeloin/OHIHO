import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mes sites & outils · OHIHO",
  robots: { index: false, follow: false },
};

export default function PortailSitesPage() {
  return (
    <div className="card-surface p-6 sm:p-8">
      <p className="text-sm leading-relaxed text-muted">
        Les sites et applications que nous développons pour vous apparaîtront
        ici une fois livrés, avec un accès direct.
      </p>
      <Link
        href="mailto:contact@ohiho.fr"
        className="btn-accent mt-6 inline-flex px-6 py-2.5 text-sm font-semibold"
      >
        Décrivez votre projet
      </Link>
    </div>
  );
}
