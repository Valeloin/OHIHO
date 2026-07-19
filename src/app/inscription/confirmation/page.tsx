import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confirmez votre email — OHIHO",
};

export default function ConfirmationPage() {
  return (
    <main>
      {/* Aligné à gauche comme les autres pages de l'espace client : le point
          vert du kicker et la chasse serrée du titre donnent le ton éditorial. */}
      <div className="mx-auto max-w-md px-6 py-16">
        <p className="kicker">Presque terminé</p>
        <h1 className="mt-5 text-3xl font-semibold tracking-display">
          Confirmez votre email
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Nous vous avons envoyé un lien de confirmation. Cliquez dessus pour
          activer votre compte, puis connectez-vous pour accéder à votre
          espace client.
        </p>
        <a
          href="/connexion"
          className="btn-accent mt-8 inline-block px-6 py-3 text-sm font-semibold"
        >
          Aller à la connexion
        </a>
      </div>
    </main>
  );
}
