import type { Metadata } from "next";
import Link from "next/link";
import { requireProfile } from "@/lib/supabase/session";
import StatusBadge from "@/components/portail/StatusBadge";
import PageHeader from "@/components/portail/PageHeader";
import {
  PROJECT_STATUS_LABEL,
  PROJECT_STATUS_TONE,
  invoiceDisplayStatus,
  ticketNeedsAction,
} from "@/lib/portail/status";
import { formatCents } from "@/lib/money";
import { BugTrackError, listTickets } from "@/lib/bugtrack";
import type { Project, Invoice } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Tableau de bord · OHIHO",
  robots: { index: false, follow: false },
};

function OverviewTile({
  href,
  kicker,
  children,
  cta = "Voir le détail",
}: {
  href: string;
  kicker: string;
  children: React.ReactNode;
  cta?: string;
}) {
  return (
    <Link
      href={href}
      className="card-surface flex h-full flex-col p-6 transition-colors hover:border-accent-cyan/40"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-cyan">
        {kicker}
      </p>
      <div className="mt-4 flex-1">{children}</div>
      <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-cyan">
        {cta}
        <span aria-hidden="true">→</span>
      </p>
    </Link>
  );
}

export default async function PortailDashboardPage() {
  const { supabase, user, profile } = await requireProfile();

  const [{ data: projects }, { data: invoices }, tickets] = await Promise.all([
    supabase
      .from("projects")
      .select("*")
      .eq("client_id", user.id)
      .order("updated_at", { ascending: false }),
    supabase
      .from("invoices")
      .select("*")
      .eq("client_id", user.id)
      .order("issue_date", { ascending: false }),
    listTickets(user.id).catch((err) =>
      err instanceof BugTrackError ? [] : Promise.reject(err)
    ),
  ]);

  const project = (projects as Project[] | null)?.[0];
  const invoice = (invoices as Invoice[] | null)?.[0];
  const pendingTickets = tickets.filter((t) => ticketNeedsAction(t.status));
  const latestTicket = tickets[0];

  return (
    <div>
      <PageHeader
        kicker="Espace client"
        title={
          profile.first_name
            ? `Bienvenue, ${profile.first_name}`
            : "Bienvenue"
        }
        subtitle="Un coup d'œil sur votre projet, votre facturation et vos demandes de support."
      />

      <div className="grid gap-5 md:grid-cols-3">
        <OverviewTile href="/portail/sites" kicker="Mon projet">
          {project ? (
            <>
              <p className="text-lg font-semibold">{project.name}</p>
              <div className="mt-3">
                <StatusBadge
                  label={PROJECT_STATUS_LABEL[project.status]}
                  tone={PROJECT_STATUS_TONE[project.status]}
                />
              </div>
              {project.steps.length > 0 && (
                <p className="mt-3 text-xs text-muted">
                  {project.steps.filter((s) => s.done).length} /{" "}
                  {project.steps.length} étapes terminées
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-muted">
              Aucun projet pour le moment.
            </p>
          )}
        </OverviewTile>

        <OverviewTile href="/portail/facturation" kicker="Facturation">
          {invoice ? (
            <>
              <p className="text-lg font-semibold tracking-display">
                {formatCents(invoice.amount_cents)}
              </p>
              <div className="mt-3">
                {(() => {
                  const { label, tone } = invoiceDisplayStatus(
                    invoice.status,
                    invoice.due_date
                  );
                  return <StatusBadge label={label} tone={tone} />;
                })()}
              </div>
              <p className="mt-3 truncate text-xs text-muted">
                {invoice.description}
              </p>
            </>
          ) : (
            <p className="text-sm text-muted">
              Aucune facture pour le moment.
            </p>
          )}
        </OverviewTile>

        <OverviewTile href="/portail/tickets" kicker="Support">
          {latestTicket ? (
            <>
              <p className="text-lg font-semibold">
                {pendingTickets.length > 0
                  ? `${pendingTickets.length} ticket${pendingTickets.length > 1 ? "s" : ""} à traiter`
                  : "Tout est à jour"}
              </p>
              <p className="mt-3 truncate text-xs text-muted">
                Dernier ticket : {latestTicket.title}
              </p>
            </>
          ) : (
            <p className="text-sm text-muted">
              Aucun ticket pour le moment.
            </p>
          )}
        </OverviewTile>
      </div>
    </div>
  );
}
