import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/session";
import AdminHeader from "@/components/admin/AdminHeader";
import TicketControls from "@/components/admin/TicketControls";
import TicketThread from "@/components/portail/TicketThread";
import type { TicketMessage } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ticket · Admin OHIHO",
  robots: { index: false, follow: false },
};

export default async function AdminTicketDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { supabase, user } = await requireAdmin();

  const { data: ticket } = await supabase
    .from("tickets")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!ticket) notFound();

  const { data: client } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", ticket.client_id)
    .single();

  const { data: messages } = await supabase
    .from("ticket_messages")
    .select("*")
    .eq("ticket_id", ticket.id)
    .order("created_at", { ascending: true });

  const authorIds = Array.from(
    new Set((messages ?? []).map((m) => m.author_id))
  );
  const { data: authors } = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .in("id", authorIds.length > 0 ? authorIds : [user.id]);

  const authorMap = new Map((authors ?? []).map((a) => [a.id, a] as const));

  function authorLabel(authorId: string) {
    if (authorId === user.id) return "Vous";
    const author = authorMap.get(authorId);
    if (author?.role === "admin" || author?.role === "technician") {
      return "OHIHO";
    }
    return author?.full_name || "Client";
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader active="/admin/tickets" />

      <main className="mx-auto max-w-5xl px-6 py-10">
        <Link
          href="/admin/tickets"
          className="text-xs text-muted hover:text-foreground"
        >
          ← Tous les tickets
        </Link>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {ticket.subject}
            </h1>
            <p className="mt-2 text-sm text-muted">
              {client?.full_name || client?.email}
            </p>
          </div>
          <TicketControls
            ticketId={ticket.id}
            status={ticket.status}
            priority={ticket.priority}
          />
        </div>

        <div className="mt-8">
          <TicketThread
            ticketId={ticket.id}
            messages={(messages as TicketMessage[]) ?? []}
            currentUserId={user.id}
            authorLabel={authorLabel}
          />
        </div>
      </main>
    </div>
  );
}
