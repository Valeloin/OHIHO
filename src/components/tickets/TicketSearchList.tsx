"use client";

import { useState } from "react";
import TicketCard from "./TicketCard";
import type { Ticket } from "@/lib/supabase/types";

export default function TicketSearchList({
  tickets,
  basePath,
}: {
  tickets: Ticket[];
  basePath: string;
}) {
  const [query, setQuery] = useState("");

  const trimmed = query.trim().toLowerCase();
  const filtered = trimmed
    ? tickets.filter((t) =>
        `${t.reference} ${t.title}`.toLowerCase().includes(trimmed)
      )
    : tickets;

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher un ticket (ex. OHIHO-000001)"
        className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
      />

      <div className="mt-4 flex flex-col gap-3">
        {filtered.length === 0 && (
          <div className="card-surface rounded-2xl p-8 text-center">
            <p className="text-sm text-muted">
              {tickets.length === 0
                ? "Vous n'avez pas encore de ticket. Créez-en un si vous avez une question."
                : "Aucun ticket ne correspond à votre recherche."}
            </p>
          </div>
        )}
        {filtered.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            href={`${basePath}/${ticket.id}`}
          />
        ))}
      </div>
    </div>
  );
}
