import type { Metadata } from "next";
import Link from "next/link";
import { requireProfile } from "@/lib/supabase/session";
import StatusBadge from "@/components/portail/StatusBadge";
import PageHeader from "@/components/portail/PageHeader";
import EmptyState from "@/components/portail/EmptyState";
import Panel from "@/components/portail/Panel";
import DetailGrid from "@/components/portail/DetailGrid";
import { invoiceDisplayStatus } from "@/lib/portail/status";
import { formatCents } from "@/lib/money";
import type { Invoice } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Facturation · OHIHO",
  robots: { index: false, follow: false },
};

function formatDate(value: string | null) {
  if (!value) return "—";
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

  // Les brouillons ne sont pas encore émis : ils ne comptent ni dans le
  // restant dû ni dans le total réglé.
  const dueCents = invoices
    .filter((i) => i.status === "envoyee")
    .reduce((sum, i) => sum + i.amount_cents, 0);
  const paidCents = invoices
    .filter((i) => i.status === "payee")
    .reduce((sum, i) => sum + i.amount_cents, 0);
  const issuedCount = invoices.filter((i) => i.status !== "brouillon").length;

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
        <div className="grid gap-6">
          <Panel title="Résumé">
            <DetailGrid
              items={[
                {
                  label: "Restant à régler",
                  value: (
                    <p
                      className={`text-xl font-semibold ${
                        dueCents > 0 ? "text-amber-400" : ""
                      }`}
                    >
                      {formatCents(dueCents)}
                    </p>
                  ),
                },
                {
                  label: "Déjà réglé",
                  value: (
                    <p className="text-xl font-semibold">
                      {formatCents(paidCents)}
                    </p>
                  ),
                },
                {
                  label: "Factures émises",
                  value: (
                    <p className="text-xl font-semibold">{issuedCount}</p>
                  ),
                },
              ]}
            />
          </Panel>

          <Panel title="Historique" flush>
            <div className="divide-y divide-border">
              {invoices.map((invoice) => {
                const { label, tone } = invoiceDisplayStatus(
                  invoice.status,
                  invoice.due_date
                );

                return (
                  <div
                    key={invoice.id}
                    className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 py-4"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-medium">{invoice.description}</p>
                      <p className="mt-1 text-[13px] text-muted">
                        {invoice.number} · émise le{" "}
                        {formatDate(invoice.issue_date)}
                        {invoice.due_date
                          ? ` · à régler avant le ${formatDate(invoice.due_date)}`
                          : ""}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-5">
                      <StatusBadge label={label} tone={tone} />
                      <p className="w-28 text-right font-semibold">
                        {formatCents(invoice.amount_cents)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>
        </div>
      )}
    </div>
  );
}
