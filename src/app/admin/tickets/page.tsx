import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import TicketCard from "@/components/tickets/TicketCard";
import TicketFilters from "@/components/tickets/TicketFilters";
import type { Ticket, TicketPriority, TicketStatus } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Tous les tickets — OHIHO",
};

export default async function AdminTicketsPage({
  searchParams,
}: {
  searchParams: { status?: string; priority?: string };
}) {
  const supabase = createClient();

  let query = supabase
    .from("tickets")
    .select("*")
    .order("updated_at", { ascending: false });

  if (searchParams.status) {
    query = query.eq("status", searchParams.status as TicketStatus);
  }
  if (searchParams.priority) {
    query = query.eq("priority", searchParams.priority as TicketPriority);
  }

  const { data: tickets } = await query;
  const list = (tickets ?? []) as Ticket[];

  return (
    <div>
      <TicketFilters />

      <div className="mt-6 flex flex-col gap-3">
        {list.length === 0 && (
          <div className="card-surface rounded-2xl p-8 text-center">
            <p className="text-sm text-muted">Aucun ticket pour ces filtres.</p>
          </div>
        )}
        {list.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            href={`/admin/tickets/${ticket.id}`}
          />
        ))}
      </div>
    </div>
  );
}
