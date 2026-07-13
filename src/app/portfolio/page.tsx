import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Portfolio — OHIHO",
  description:
    "Les sites et applications web réalisés par OHIHO — portfolio en cours de construction.",
};

export default function PortfolioPage() {
  return (
    <main className="bg-grid">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <p className="text-sm font-mono font-medium uppercase tracking-wider text-accent-cyan">
          Réalisations
        </p>
        <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Mon portfolio
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          Cette page est en cours de construction — les sites et applications
          que j&apos;ai déjà réalisés, ou que je suis en train de développer,
          y seront présentés au fur et à mesure.
        </p>

        <div className="card-surface mt-10 rounded-2xl p-8 text-center">
          <p className="text-sm text-muted">
            Aucun projet publié pour le moment. Revenez bientôt, ou
            contactez-moi directement pour parler de votre projet.
          </p>
          <Link
            href="/#contact"
            className="mt-6 inline-flex rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            Discuter de mon projet
          </Link>
        </div>

        <Link
          href="/#services"
          className="mt-10 inline-flex text-sm font-medium text-accent-cyan hover:underline"
        >
          ← Retour aux services
        </Link>
      </div>
    </main>
  );
}
