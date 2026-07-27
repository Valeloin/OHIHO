import type { Metadata } from "next";
import Link from "next/link";
import { requireProfile } from "@/lib/supabase/session";
import StatusBadge from "@/components/portail/StatusBadge";
import PageHeader from "@/components/portail/PageHeader";
import {
  IconProject,
  IconInvoice,
  IconSupport,
  IconChevron,
} from "@/components/portail/icons";
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

function Tile({
  href,
  label,
  Icon,
  headline,
  detail,
  badge,
}: {
  href: string;
  label: string;
  Icon: (props: { className?: string }) => JSX.Element;
  headline: string;
  detail?: string;
  badge?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="card-surface group flex h-full flex-col overflow-hidden transition-colors hover:border-accent-cyan/40"
    >
      <div className="flex items-center gap-2.5 border-b border-border px-5 py-3">
        <Icon className="h-[18px] w-[18px] shrink-0 text-muted" />
        <span className="text-[14px] font-medium">{label}</span>
        <IconChevron className="ml-auto h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[17px] font-semibold leading-snug">{headline}</p>
        {badge && <div className="mt-3">{badge}</div>}
        {detail && (
          <p className="mt-3 line-clamp-2 text-[14px] text-muted">{detail}</p>
        )}
      </div>
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
        title={profile.first_name ? `Bonjour ${profile.first_name}` : "Bonjour"}
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Tile
          href="/portail/sites"
          label="Mon projet"
          Icon={IconProject}
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

        <Tile
          href="/portail/facturation"
          label="Facturation"
          Icon={IconInvoice}
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

        <Tile
          href="/portail/tickets"
          label="Support"
          Icon={IconSupport}
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
