import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { QuoteRequest } from "@/lib/supabase/types";
import { getContent } from "@/lib/content";
import { formulaLabel, statusLabel } from "@/lib/quotes";

export const metadata: Metadata = {
  title: "Mes devis · OHIHO",
};

// Statuts en PILULES, comme les puces de la banderole : les neutres nuit
// portent les états passifs, le teal marque le statut actif (en cours d'étude)
// et le vert émeraude le statut abouti (devis envoyé).
const STATUS_STYLES: Record<string, string> = {
  received: "rounded-full border-border bg-surface-2 text-foreground",
  in_review:
    "rounded-full border-accent-cyan/50 bg-accent-cyan/10 text-accent-cyan",
  quoted:
    "rounded-full border-brand-emerald/50 bg-brand-emerald/10 text-brand-emerald",
  closed: "rounded-full border-border bg-transparent text-muted",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function DevisPage() {
  const { quotes: quotesContent } = await getContent();
  const supabase = createClient();
  const { data: quotes } = await supabase
    .from("quote_requests")
    .select("id, reference, project_type, status, created_at")
    .order("created_at", { ascending: false });

  const list = (quotes ?? []) as Pick<
    QuoteRequest,
    "id" | "reference" | "project_type" | "status" | "created_at"
  >[];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-display">
            {quotesContent.listTitle}
          </h2>
          <p className="mt-1 text-sm text-muted">{quotesContent.listSubtitle}</p>
        </div>
        <Link
          href="/portail/devis/nouveau"
          className="btn-accent px-6 py-2.5 text-sm font-semibold"
        >
          Demander un devis
        </Link>
      </div>

      {list.length === 0 ? (
        <div className="card-surface mt-6 p-10">
          <p className="text-sm leading-relaxed text-muted">
            {quotesContent.emptyText}
          </p>
          <Link
            href="/portail/devis/nouveau"
            className="btn-outline mt-6 inline-flex px-6 py-2.5 text-sm font-semibold"
          >
            Créer ma première demande
          </Link>
        </div>
      ) : (
        <ul className="mt-6 space-y-2">
          {list.map((q) => (
            <li
              key={q.id}
              className="card-surface flex flex-wrap items-center justify-between gap-3 px-6 py-4"
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-cyan">
                  {q.reference}
                </p>
                <p className="mt-1 font-semibold tracking-display">
                  {formulaLabel(q.project_type, quotesContent)}
                </p>
                <p className="mt-1 font-mono text-[11px] text-muted">
                  Envoyée le {formatDate(q.created_at)}
                </p>
              </div>
              <span
                className={`border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${
                  STATUS_STYLES[q.status] ?? STATUS_STYLES.closed
                }`}
              >
                {statusLabel(q.status, quotesContent)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
