import type { Metadata } from "next";
import ResetRequestForm from "@/components/auth/ResetRequestForm";

export const metadata: Metadata = {
  title: "Mot de passe oublié — OHIHO",
  description: "Réinitialisez le mot de passe de votre espace client OHIHO.",
};

export default function MotDePasseOubliePage() {
  return (
    <main className="bg-grid">
      <div className="mx-auto max-w-md px-6 py-16">
        <p className="text-sm font-mono font-medium uppercase tracking-wider text-accent-cyan">
          Espace client
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          Mot de passe oublié
        </h1>
        <p className="mt-3 text-sm text-muted">
          Entrez votre email et recevez un lien pour choisir un nouveau mot de
          passe.
        </p>

        <div className="mt-8">
          <ResetRequestForm />
        </div>
      </div>
    </main>
  );
}
