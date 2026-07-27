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
        className="inline-flex items-center gap-2 text-muted transition-colors hover:text-foreground"
      >
        <span aria-hidden="true">←</span> Retour au support
      </Link>

      <div className="mt-6">
        <PageHeader title="Nouveau ticket" />
      </div>

      <NewTicketForm />
    </div>
  );
}
