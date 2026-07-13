import type {
  TicketCategory,
  TicketPriority,
  TicketStatus,
} from "@/lib/supabase/types";

export const STATUS_LABELS: Record<TicketStatus, string> = {
  open: "Nouveau",
  in_progress: "En cours",
  waiting_customer: "En attente client",
  resolved: "Résolu",
  closed: "Clôturé",
};

export const STATUS_COLORS: Record<TicketStatus, string> = {
  open: "text-accent-cyan",
  in_progress: "text-accent-violet",
  waiting_customer: "text-muted",
  resolved: "text-accent-emerald",
  closed: "text-muted",
};

export const PRIORITY_LABELS: Record<TicketPriority, string> = {
  low: "Faible",
  medium: "Moyenne",
  high: "Élevée",
  urgent: "Urgente",
};

export const PRIORITY_COLORS: Record<TicketPriority, string> = {
  low: "text-muted",
  medium: "text-accent-cyan",
  high: "text-accent-violet",
  urgent: "text-red-400",
};

export const CATEGORY_LABELS: Record<TicketCategory, string> = {
  hardware: "Accès à la plateforme",
  software: "Contenu d'une formation",
  network: "Problème technique",
  account_access: "Compte & facturation",
  other: "Autre",
};

export const STATUS_OPTIONS = Object.entries(STATUS_LABELS) as [
  TicketStatus,
  string,
][];

export const PRIORITY_OPTIONS = Object.entries(PRIORITY_LABELS) as [
  TicketPriority,
  string,
][];

export const CATEGORY_OPTIONS = Object.entries(CATEGORY_LABELS) as [
  TicketCategory,
  string,
][];
