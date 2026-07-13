import { z } from "zod";

export const createTicketSchema = z.object({
  title: z.string().trim().min(3, "Le titre doit contenir au moins 3 caractères."),
  description: z.string().trim().min(10, "Décrivez votre demande en quelques mots."),
  category: z.enum(["hardware", "software", "network", "account_access", "other"]),
  priority: z.enum(["low", "medium", "high", "urgent"]),
});

export const addMessageSchema = z.object({
  ticketId: z.string().uuid(),
  body: z.string().trim().min(1, "Le message ne peut pas être vide."),
  isInternalNote: z.boolean().optional(),
});

export const updateTicketSchema = z.object({
  ticketId: z.string().uuid(),
  status: z.enum(["open", "in_progress", "waiting_customer", "resolved", "closed"]).optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
  assignedTo: z.string().uuid().nullable().optional(),
});
