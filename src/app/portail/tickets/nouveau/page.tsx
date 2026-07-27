import type { Metadata } from "next";
import Link from "next/link";
import NewTicketForm from "@/components/portail/NewTicketForm";
import PageHeader from "@/components/portail/PageHeader";

export const metadata: Metadata = {
  title: "Nouveau ticket · OHIHO",
  robots: { index: false, follow: false },
};

export default function NouveauTicketPage() {
  return (
    <div>
      <Link
        href="/portail/tickets"
        className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-foreground"
      >
        <span aria-hidden="true">←</span> Retour au support
      </Link>

      <div className="mt-5">
        <PageHeader
          title="Nouveau ticket"
          subtitle="Décrivez le problème le plus précisément possible : plus le contexte est clair, plus la réponse est rapide."
        />
      </div>

      <NewTicketForm />
    </div>
  );
}
