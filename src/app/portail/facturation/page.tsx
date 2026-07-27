import type { Metadata } from "next";
import Link from "next/link";
import { requireProfile } from "@/lib/supabase/session";
import StatusBadge from "@/components/portail/StatusBadge";
import PageHeader from "@/components/portail/PageHeader";
import EmptyState from "@/components/portail/EmptyState";
import { invoiceDisplayStatus } from "@/lib/portail/status";
import { formatCents } from "@/lib/money";
import type { Invoice } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Facturation · OHIHO",
  robots: { index: false, follow: false },
};

function formatDate(value: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function PortailFacturationPage() {
  const { supabase, user } = await requireProfile();

  const { data } = await supabase
    .from("invoices")
    .select("*")
    .eq("client_id", user.id)
    .order("issue_date", { ascending: false });

  const invoices = (data as Invoice[] | null) ?? [];

  // Les brouillons ne sont pas encore émis : ils ne comptent pas dans le
  // restant dû.
  const dueCents = invoices
    .filter((i) => i.status === "envoyee")
    .reduce((sum, i) => sum + i.amount_cents, 0);

  return (
    <div>
      <PageHeader title="Facturation" />

      {invoices.length === 0 ? (
        <EmptyState
          title="Aucune facture"
          description="Vos factures apparaîtront ici au fur et à mesure de nos échanges."
          action={
            <Link
              href="/#contact"
              className="btn-outline inline-flex px-6 py-2.5 font-semibold"
            >
              Nous contacter
            </Link>
          }
        />
      ) : (
        <>
          {/* Un seul chiffre mis en avant : ce qu'il reste à régler. Le reste
              se lit dans la liste, inutile d'en faire des compteurs. */}
          {dueCents > 0 && (
            <div className="card-surface mb-6 flex flex-wrap items-baseline justify-between gap-3 p-6">
              <p className="text-muted">Restant à régler</p>
              <p className="text-2xl font-semibold">{formatCents(dueCents)}</p>
            </div>
          )}

          <div className="card-surface divide-y divide-border">
            {invoices.map((invoice) => {
              const { label, tone } = invoiceDisplayStatus(
                invoice.status,
                invoice.due_date
              );
              const issued = formatDate(invoice.issue_date);
              const due = formatDate(invoice.due_date);

              return (
                <div
                  key={invoice.id}
                  className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 p-6"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{invoice.description}</p>
                    <p className="mt-1 text-[14px] text-muted">
                      {invoice.number} · émise le {issued}
                      {due ? ` · à régler avant le ${due}` : ""}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-5">
                    <StatusBadge label={label} tone={tone} />
                    <p className="text-lg font-semibold">
                      {formatCents(invoice.amount_cents)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
