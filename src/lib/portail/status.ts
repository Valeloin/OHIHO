import type { InvoiceStatus, ProjectStatus } from "@/lib/supabase/types";

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
