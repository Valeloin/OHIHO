import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Connexion — OHIHO",
  description: "Connectez-vous à votre espace client OHIHO pour suivre l'avancement de vos projets web.",
};

export default function ConnexionPage({
  searchParams,
}: {
  searchParams: { next?: string; error?: string };
}) {
  return (
    <main>
      <div className="mx-auto max-w-md px-6 py-16">
        <p className="kicker">Espace client</p>
        <h1 className="mt-5 text-3xl font-semibold tracking-display">
          Se connecter
        </h1>
        <p className="mt-3 text-sm text-muted">
          Accédez à votre espace pour suivre vos projets web.
        </p>

        {searchParams.error === "confirmation" && (
          <p className="mt-4 rounded-xl border-l-2 border-red-400/60 bg-red-400/10 px-4 py-3 text-sm text-red-400">
            Le lien de confirmation est invalide ou a expiré. Réessayez de
            vous connecter ou de vous inscrire.
          </p>
        )}

        <div className="mt-8">
          <LoginForm next={searchParams.next} />
        </div>
      </div>
    </main>
  );
}
