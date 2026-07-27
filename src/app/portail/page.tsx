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

// Une tuile = une phrase et un statut. Rien de plus : la vue d'ensemble sert
// à décider où aller, pas à tout lire.
function OverviewTile({
  href,
  label,
  headline,
  detail,
  badge,
}: {
  href: string;
  label: string;
  headline: string;
  detail?: string;
  badge?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="card-surface flex h-full flex-col p-6 transition-colors hover:border-accent-cyan/40"
    >
      <p className="text-[13px] text-muted">{label}</p>
      <p className="mt-2 text-lg font-semibold leading-snug">{headline}</p>
      {badge && <div className="mt-4">{badge}</div>}
      {detail && (
        <p className="mt-4 line-clamp-2 text-[14px] text-muted">{detail}</p>
      )}
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

  const invoiceStatus = invoice
    ? invoiceDisplayStatus(invoice.status, invoice.due_date)
    : null;

  return (
    <div>
      <PageHeader
        title={
          profile.first_name ? `Bonjour ${profile.first_name}` : "Bonjour"
        }
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <OverviewTile
          href="/portail/sites"
          label="Mon projet"
          headline={project ? project.name : "Aucun projet en cours"}
          badge={
            project ? (
              <StatusBadge
                label={PROJECT_STATUS_LABEL[project.status]}
                tone={PROJECT_STATUS_TONE[project.status]}
              />
            ) : undefined
          }
          detail={
            project && project.steps.length > 0
              ? `${project.steps.filter((s) => s.done).length} étapes terminées sur ${project.steps.length}`
              : undefined
          }
        />

        <OverviewTile
          href="/portail/facturation"
          label="Facturation"
          headline={
            invoice ? formatCents(invoice.amount_cents) : "Aucune facture"
          }
          badge={
            invoiceStatus ? (
              <StatusBadge
                label={invoiceStatus.label}
                tone={invoiceStatus.tone}
              />
            ) : undefined
          }
          detail={invoice?.description}
        />

        <OverviewTile
          href="/portail/tickets"
          label="Support"
          headline={
            !latestTicket
              ? "Aucun ticket"
              : pendingTickets.length > 0
                ? `${pendingTickets.length} ticket${pendingTickets.length > 1 ? "s" : ""} attend${pendingTickets.length > 1 ? "ent" : ""} votre réponse`
                : "Tout est à jour"
          }
          detail={latestTicket ? `Dernier : ${latestTicket.title}` : undefined}
        />
      </div>
    </div>
  );
}
