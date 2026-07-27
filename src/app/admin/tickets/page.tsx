import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/session";
import AdminHeader from "@/components/admin/AdminHeader";
import StatusBadge from "@/components/portail/StatusBadge";
import {
  TICKET_STATUS_LABEL,
  TICKET_STATUS_TONE,
  TICKET_PRIORITY_LABEL,
  TICKET_PRIORITY_TONE,
} from "@/lib/portail/status";
import type { Ticket } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tickets · Admin OHIHO",
  robots: { index: false, follow: false },
};

export default async function AdminTicketsPage() {
  const { supabase } = await requireAdmin();

  const { data: tickets } = await supabase
    .from("tickets")
    .select("*")
    .order("updated_at", { ascending: false });

  const clientIds = Array.from(
    new Set((tickets ?? []).map((t) => t.client_id))
  );
  const { data: clients } = await supabase
    .from("profiles")
    .select("id, full_name, email")
    .in("id", clientIds.length > 0 ? clientIds : ["00000000-0000-0000-0000-000000000000"]);

  const clientMap = new Map((clients ?? []).map((c) => [c.id, c] as const));

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader active="/admin/tickets" />

      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-2xl font-semibold tracking-tight">Tickets</h1>
        <p className="mt-2 text-sm text-muted">
          Tous les tickets, tous clients confondus, triés par activité récente.
        </p>

        <div className="mt-8 grid gap-4">
          {(!tickets || tickets.length === 0) && (
            <p className="text-sm text-muted">Aucun ticket pour le moment.</p>
          )}
          {(tickets as Ticket[] | null)?.map((ticket) => {
            const client = clientMap.get(ticket.client_id);
            return (
              <Link
                key={ticket.id}
                href={`/admin/tickets/${ticket.id}`}
                className="card-surface flex flex-wrap items-center justify-between gap-3 p-5 transition-colors hover:border-accent-cyan/40"
              >
                <div>
                  <p className="font-semibold">{ticket.subject}</p>
                  <p className="mt-1 text-xs text-muted">
                    {client?.full_name || client?.email || "Client inconnu"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge
                    label={TICKET_PRIORITY_LABEL[ticket.priority]}
                    tone={TICKET_PRIORITY_TONE[ticket.priority]}
                  />
                  <StatusBadge
                    label={TICKET_STATUS_LABEL[ticket.status]}
                    tone={TICKET_STATUS_TONE[ticket.status]}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
