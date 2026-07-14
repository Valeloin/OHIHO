import type { Metadata } from "next";
import SignupForm from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Créer un compte — OHIHO",
  description: "Créez votre compte pour accéder à vos formations OHIHO.",
};

export default function InscriptionPage() {
  return (
    <main className="bg-grid">
      <div className="mx-auto max-w-md px-6 py-16">
        <p className="text-sm font-mono font-medium uppercase tracking-wider text-accent-cyan">
          Espace client
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          Créer votre compte
        </h1>
        <p className="mt-3 text-sm text-muted">
          Créez votre compte pour accéder à vos formations RGPD et IA.
        </p>

        <div className="mt-8">
          <SignupForm />
        </div>
      </div>
    </main>
  );
}
