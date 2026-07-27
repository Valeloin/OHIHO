import type {
  InvoiceStatus,
  ProjectStatus,
  TicketPriority,
  TicketStatus,
} from "@/lib/supabase/types";

export type BadgeTone = "muted" | "teal" | "emerald" | "red";

export const PROJECT_STATUS_LABEL: Record<ProjectStatus, string> = {
  nouveau: "Nouveau",
  en_cours: "En cours",
  en_revision: "En révision",
  livre: "Livré",
};

export const PROJECT_STATUS_TONE: Record<ProjectStatus, BadgeTone> = {
  nouveau: "muted",
  en_cours: "teal",
  en_revision: "teal",
  livre: "emerald",
};

export const INVOICE_STATUS_LABEL: Record<InvoiceStatus, string> = {
  brouillon: "Brouillon",
  envoyee: "Envoyée",
  payee: "Payée",
};

export const INVOICE_STATUS_TONE: Record<InvoiceStatus, BadgeTone> = {
  brouillon: "muted",
  envoyee: "teal",
  payee: "emerald",
};

// Le statut "en retard" n'est jamais stocké : il se déduit de due_date à
// l'affichage, pour ne pas demander à Valentin de penser à un statut de plus.
export function invoiceDisplayStatus(
  status: InvoiceStatus,
  dueDate: string | null
): { label: string; tone: BadgeTone } {
  const isLate =
    status === "envoyee" && !!dueDate && new Date(dueDate) < new Date();

  if (isLate) return { label: "En retard", tone: "red" };
  return { label: INVOICE_STATUS_LABEL[status], tone: INVOICE_STATUS_TONE[status] };
}

export const TICKET_STATUS_LABEL: Record<TicketStatus, string> = {
  recue: "Reçue",
  en_cours: "En cours d'analyse",
  corrigee: "Corrigée",
  fermee: "Fermée",
};

export const TICKET_STATUS_TONE: Record<TicketStatus, BadgeTone> = {
  recue: "muted",
  en_cours: "teal",
  corrigee: "emerald",
  fermee: "muted",
};

export const TICKET_PRIORITY_LABEL: Record<TicketPriority, string> = {
  basse: "Basse",
  normale: "Normale",
  haute: "Haute",
  urgente: "Urgente",
};

export const TICKET_PRIORITY_TONE: Record<TicketPriority, BadgeTone> = {
  basse: "muted",
  normale: "muted",
  haute: "teal",
  urgente: "red",
};
