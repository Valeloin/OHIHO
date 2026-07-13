import type { TicketMessage } from "@/lib/supabase/types";
import { formatDate } from "@/lib/formatDate";

type Author = { id: string; full_name: string | null; role: string };

export default function MessageThread({
  messages,
  authors,
  currentUserId,
}: {
  messages: TicketMessage[];
  authors: Record<string, Author>;
  currentUserId: string;
}) {
  if (messages.length === 0) {
    return (
      <p className="text-sm text-muted">Aucun échange pour l&apos;instant.</p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {messages.map((message) => {
        const author = authors[message.author_id];
        const isMine = message.author_id === currentUserId;
        const isStaff = author?.role === "technician" || author?.role === "admin";

        return (
          <div
            key={message.id}
            className={`card-surface rounded-2xl p-5 ${
              message.is_internal_note ? "border-accent-violet/40" : ""
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold text-foreground">
                {isMine ? "Vous" : author?.full_name || "Équipe OHIHO"}
                {isStaff && !isMine && (
                  <span className="ml-2 font-mono text-[10px] uppercase text-accent-cyan">
                    Équipe
                  </span>
                )}
              </p>
              <p className="text-xs text-muted">
                {formatDate(message.created_at)}
              </p>
            </div>
            {message.is_internal_note && (
              <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-accent-violet">
                Note interne
              </p>
            )}
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
              {message.body}
            </p>
          </div>
        );
      })}
    </div>
  );
}
