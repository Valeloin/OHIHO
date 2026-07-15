import type { Metadata } from "next";
import NewPasswordForm from "@/components/auth/NewPasswordForm";

export const metadata: Metadata = {
  title: "Nouveau mot de passe — OHIHO",
};

export default function NouveauMotDePassePage() {
  return (
    <main className="bg-grid">
      <div className="mx-auto max-w-md px-6 py-16">
        <p className="text-sm font-mono font-medium uppercase tracking-wider text-accent-cyan">
          Espace client
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          Choisir un nouveau mot de passe
        </h1>
        <p className="mt-3 text-sm text-muted">
          Saisissez votre nouveau mot de passe pour votre espace client.
        </p>

        <div className="mt-8">
          <NewPasswordForm />
        </div>
      </div>
    </main>
  );
}
