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
    month: "short",
    year: "numeric",
  });
}

function SummaryTile({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: string;
  hint?: string;
  accent?: boolean;
}) {
  return (
    <div className="card-surface p-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        {label}
      </p>
      <p
        className={`mt-3 text-2xl font-semibold tracking-display ${
          accent ? "text-amber-400" : ""
        }`}
      >
        {value}
      </p>
      {hint && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
    </div>
  );
}

export default async function PortailFacturationPage() {
  const { supabase, user } = await requireProfile();

  const { data } = await supabase
    .from("invoices")
    .select("*")
    .eq("client_id", user.id)
    .order("issue_date", { ascending: false });

  const invoices = (data as Invoice[] | null) ?? [];

  // Les brouillons restent visibles dans la liste mais ne comptent ni dans le
  // restant dû ni dans le total réglé : rien n'a encore été émis.
  const paidCents = invoices
    .filter((i) => i.status === "payee")
    .reduce((sum, i) => sum + i.amount_cents, 0);
  const dueCents = invoices
    .filter((i) => i.status === "envoyee")
    .reduce((sum, i) => sum + i.amount_cents, 0);
  const lateCount = invoices.filter(
    (i) =>
      i.status === "envoyee" && !!i.due_date && new Date(i.due_date) < new Date()
  ).length;

  return (
    <div>
      <PageHeader
        title="Facturation"
        subtitle="Le récapitulatif de vos factures et de ce qui reste à régler."
      />

      {invoices.length === 0 ? (
        <EmptyState
          title="Aucune facture"
          description="Vos factures apparaîtront ici au fur et à mesure de nos échanges, avec leur montant et leur échéance."
          action={
            <Link
              href="/#contact"
              className="btn-outline inline-flex px-6 py-2.5 text-sm font-semibold"
            >
              Nous contacter
            </Link>
          }
        />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <SummaryTile
              label="Restant dû"
              value={formatCents(dueCents)}
              hint={
                lateCount > 0
                  ? `${lateCount} facture${lateCount > 1 ? "s" : ""} en retard`
                  : "À jour"
              }
              accent={dueCents > 0}
            />
            <SummaryTile label="Déjà réglé" value={formatCents(paidCents)} />
            <SummaryTile
              label="Factures"
              value={String(invoices.filter((i) => i.status !== "brouillon").length)}
              hint="Depuis le début"
            />
          </div>

          {/* Une seule carte, des lignes séparées par un filet : plus proche
              d'un relevé que d'une pile de cartes indépendantes. */}
          <div className="card-surface mt-6 divide-y divide-border">
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
                  className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 p-5 sm:p-6"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-cyan">
                        {invoice.number}
                      </p>
                      <StatusBadge label={label} tone={tone} />
                    </div>
                    <p className="mt-2 font-medium">{invoice.description}</p>
                    <p className="mt-1.5 text-xs text-muted">
                      Émise le {issued}
                      {due ? ` · Échéance le ${due}` : ""}
                    </p>
                  </div>

                  <p className="shrink-0 text-xl font-semibold tracking-display">
                    {formatCents(invoice.amount_cents)}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
