import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confirmez votre email — OHIHO",
};

export default function ConfirmationPage() {
  return (
    <main className="bg-grid">
      <div className="mx-auto max-w-md px-6 py-16 text-center">
        <p className="text-sm font-mono font-medium uppercase tracking-wider text-accent-emerald">
          Presque terminé
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          Confirmez votre email
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Nous vous avons envoyé un lien de confirmation. Cliquez dessus pour
          activer votre compte, puis connectez-vous pour accéder à votre
          espace client.
        </p>
        <a
          href="/connexion"
          className="mt-8 inline-block rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
        >
          Aller à la connexion
        </a>
      </div>
    </main>
  );
}
