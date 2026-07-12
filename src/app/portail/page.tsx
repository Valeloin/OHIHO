import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mes tickets — OHIHO",
};

export default function PortailPage() {
  return (
    <div className="card-surface rounded-2xl p-8">
      <p className="text-sm text-muted">
        Le suivi de vos tickets arrive très prochainement dans cet espace.
        Revenez bientôt pour ouvrir et suivre vos demandes de support.
      </p>
    </div>
  );
}
