import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { QuoteRequest } from "@/lib/supabase/types";
import { formulaLabel, STATUS_LABELS } from "@/lib/quotes";

export const metadata: Metadata = {
  title: "Mes devis — OHIHO",
};

const STATUS_STYLES: Record<string, string> = {
  received: "border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan",
  in_review: "border-accent-violet/40 bg-accent-violet/10 text-accent-violet",
  quoted: "border-accent-emerald/40 bg-accent-emerald/10 text-accent-emerald",
  closed: "border-border bg-surface text-muted",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function DevisPage() {
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
          <h2 className="text-lg font-semibold">Mes demandes de devis</h2>
          <p className="mt-1 text-sm text-muted">
            Suivez l&apos;avancement de vos demandes ici.
          </p>
        </div>
        <Link
          href="/portail/devis/nouveau"
          className="rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
        >
          Demander un devis
        </Link>
      </div>

      {list.length === 0 ? (
        <div className="card-surface mt-6 rounded-2xl p-10 text-center">
          <p className="text-sm text-muted">
            Vous n&apos;avez pas encore de demande de devis. Lancez-vous en
            quelques minutes.
          </p>
          <Link
            href="/portail/devis/nouveau"
            className="mt-6 inline-flex rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent-cyan/60 hover:bg-surface"
          >
            Créer ma première demande
          </Link>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {list.map((q) => (
            <li
              key={q.id}
              className="card-surface flex flex-wrap items-center justify-between gap-3 rounded-2xl px-6 py-4"
            >
              <div>
                <p className="font-mono text-xs text-muted">{q.reference}</p>
                <p className="mt-0.5 font-semibold">
                  {formulaLabel(q.project_type)}
                </p>
                <p className="mt-0.5 text-xs text-muted">
                  Envoyée le {formatDate(q.created_at)}
                </p>
              </div>
              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium ${
                  STATUS_STYLES[q.status] ?? STATUS_STYLES.closed
                }`}
              >
                {STATUS_LABELS[q.status]}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
