import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mes formations — OHIHO",
};

export default function PortailPage() {
  return (
    <div className="card-surface rounded-2xl p-8">
      <p className="text-sm text-muted">
        L&apos;accès à vos formations vidéo arrive très prochainement dans cet
        espace. Revenez bientôt pour retrouver vos modules RGPD et IA.
      </p>
    </div>
  );
}
