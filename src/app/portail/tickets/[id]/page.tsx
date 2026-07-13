import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { addMessage } from "./actions";
import MessageThread from "@/components/tickets/MessageThread";
import ReplyForm from "@/components/tickets/ReplyForm";
import StatusBadge from "@/components/ui/StatusBadge";
import PriorityBadge from "@/components/ui/PriorityBadge";
import { CATEGORY_LABELS } from "@/lib/tickets/constants";
import type { Ticket, TicketMessage } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Ticket — OHIHO",
};

export default async function TicketDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: ticket } = await supabase
    .from("tickets")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!ticket) notFound();

  const { data: messages } = await supabase
    .from("ticket_messages")
    .select("*")
    .eq("ticket_id", params.id)
    .order("created_at", { ascending: true });

  const messageList = (messages ?? []) as TicketMessage[];
  const authorIds = Array.from(new Set(messageList.map((m) => m.author_id)));

  const { data: profiles } = authorIds.length
    ? await supabase
        .from("profiles")
        .select("id, full_name, role")
        .in("id", authorIds)
    : { data: [] };

  const authors = Object.fromEntries(
    (profiles ?? []).map((p) => [p.id, p])
  );

  const boundAddMessage = addMessage.bind(null, params.id);
  const t = ticket as Ticket;

  return (
    <div>
      <Link
        href="/portail/tickets"
        className="text-sm font-medium text-accent-cyan hover:underline"
      >
        ← Mes tickets
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-muted">{t.reference}</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">
            {t.title}
          </h2>
          <p className="mt-1 text-sm text-muted">
            {CATEGORY_LABELS[t.category]}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <PriorityBadge priority={t.priority} />
          <StatusBadge status={t.status} />
        </div>
      </div>

      <div className="card-surface mt-6 rounded-2xl p-5">
        <p className="text-xs font-medium text-muted">Description</p>
        <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
          {t.description}
        </p>
      </div>

      <div className="mt-8">
        <MessageThread
          messages={messageList}
          authors={authors as Record<string, { id: string; full_name: string | null; role: string }>}
          currentUserId={user!.id}
        />
      </div>

      <ReplyForm action={boundAddMessage} />
    </div>
  );
}
