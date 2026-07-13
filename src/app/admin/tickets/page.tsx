import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import TicketCard from "@/components/tickets/TicketCard";
import TicketFilters from "@/components/tickets/TicketFilters";
import TicketStats from "@/components/tickets/TicketStats";
import type { Ticket, TicketPriority, TicketStatus } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Ticket Dashboard — OHIHO",
};

export default async function AdminTicketsPage({
  searchParams,
}: {
  searchParams: { status?: string; priority?: string };
}) {
  const supabase = createClient();

  const { data: allStatuses } = await supabase.from("tickets").select("status");
  const statusList = (allStatuses ?? []) as { status: TicketStatus }[];
  const counts: Record<TicketStatus, number> = {
    open: 0,
    in_progress: 0,
    waiting_customer: 0,
    resolved: 0,
    closed: 0,
  };
  statusList.forEach((t) => {
    counts[t.status] += 1;
  });

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
      <TicketStats total={statusList.length} counts={counts} />

      <div className="mt-6">
        <TicketFilters />
      </div>

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
