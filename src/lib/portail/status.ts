import type { InvoiceStatus, ProjectStatus } from "@/lib/supabase/types";
import type { BugTrackPriority, BugTrackStatus } from "@/lib/bugtrack";

export type BadgeTone = "muted" | "teal" | "emerald" | "red" | "amber";

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

// BugTrack (bugtrack.ohiho.fr) renvoie ces 8 valeurs telles quelles, accents
// compris — ce sont les statuts stockés, pas des libellés à traduire.
export const BUGTRACK_STATUS_LABEL: Record<BugTrackStatus, string> = {
  Nouveau: "Nouveau",
  "En analyse": "En analyse",
  "En cours": "En cours",
  "En attente d'informations": "En attente d'informations",
  "Informations reçues": "Informations reçues",
  Livré: "Livré",
  Clos: "Clos",
  Réouvert: "Réouvert",
};

// "En attente d'informations" et "Livré" attendent une action du client :
// ton "amber" dédié, distinct de "red" (urgence/erreur) et "emerald"
// (positif/terminé) pour ne pas donner le sens inverse.
export const BUGTRACK_STATUS_TONE: Record<BugTrackStatus, BadgeTone> = {
  Nouveau: "muted",
  "En analyse": "teal",
  "En cours": "teal",
  "En attente d'informations": "amber",
  "Informations reçues": "muted",
  Livré: "amber",
  Clos: "muted",
  Réouvert: "teal",
};

export const BUGTRACK_PRIORITY_LABEL: Record<BugTrackPriority, string> = {
  faible: "Faible",
  moyen: "Moyen",
  élevé: "Élevé",
  bloquant: "Bloquant",
};

export const BUGTRACK_PRIORITY_TONE: Record<BugTrackPriority, BadgeTone> = {
  faible: "muted",
  moyen: "muted",
  élevé: "teal",
  bloquant: "red",
};

// Tickets où la balle est dans le camp du client — à faire remonter en tête
// de liste plutôt que de compter sur la seule couleur du badge.
export function ticketNeedsAction(status: BugTrackStatus): boolean {
  return status === "En attente d'informations" || status === "Livré";
}
