import type { Metadata } from "next";
import Link from "next/link";
import TicketForm from "@/components/tickets/TicketForm";

export const metadata: Metadata = {
  title: "Nouveau ticket — OHIHO",
};

export default function NouveauTicketPage() {
  return (
    <div>
      <Link
        href="/portail/tickets"
        className="text-sm font-medium text-accent-cyan hover:underline"
      >
        ← Mes tickets
      </Link>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight">
        Nouveau ticket
      </h2>
      <p className="mt-2 text-sm text-muted">
        Décrivez votre demande, notre équipe vous répond sous 24h ouvrées.
      </p>
      <div className="mt-6">
        <TicketForm />
      </div>
    </div>
  );
}
