import type { Metadata } from "next";
import Link from "next/link";
import { requireProfile } from "@/lib/supabase/session";
import StatusBadge from "@/components/portail/StatusBadge";
import { invoiceDisplayStatus } from "@/lib/portail/status";
import { formatCents } from "@/lib/money";
import type { Invoice } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Facturation · OHIHO",
  robots: { index: false, follow: false },
};

function formatDate(value: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("fr-FR");
}

export default async function PortailFacturationPage() {
  const { supabase, user } = await requireProfile();

  const { data: invoices } = await supabase
    .from("invoices")
    .select("*")
    .eq("client_id", user.id)
    .order("issue_date", { ascending: false });

  if (!invoices || invoices.length === 0) {
    return (
      <div className="card-surface p-6 sm:p-8">
        <p className="text-sm leading-relaxed text-muted">
          Vos factures apparaîtront ici au fur et à mesure de nos échanges.
        </p>
        <Link
          href="mailto:contact@ohiho.fr"
          className="btn-accent mt-6 inline-flex px-6 py-2.5 text-sm font-semibold"
        >
          Nous contacter
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      {(invoices as Invoice[]).map((invoice) => {
        const { label, tone } = invoiceDisplayStatus(
          invoice.status,
          invoice.due_date
        );
        const issued = formatDate(invoice.issue_date);
        const due = formatDate(invoice.due_date);

        return (
          <div key={invoice.id} className="card-surface p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                  {invoice.number}
                </p>
                <h2 className="mt-1 text-lg font-semibold">
                  {invoice.description}
                </h2>
              </div>
              <StatusBadge label={label} tone={tone} />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
              <p className="text-2xl font-semibold tracking-display">
                {formatCents(invoice.amount_cents)}
              </p>
              <p className="text-xs text-muted">
                Émise le {issued}
                {due ? ` · Échéance le ${due}` : ""}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
