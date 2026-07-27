"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireProfile } from "@/lib/supabase/session";
import {
  BugTrackError,
  createTicket as bugtrackCreateTicket,
  postMessage,
  closeTicket as bugtrackCloseTicket,
  reopenTicket as bugtrackReopenTicket,
} from "@/lib/bugtrack";

type ActionResult = { error?: string };

function bugTrackErrorMessage(err: unknown): string {
  if (err instanceof BugTrackError) {
    if (err.details?.length) {
      return err.details.map((d) => d.message).join(" ");
    }
    return err.message;
  }
  return "Une erreur est survenue, veuillez réessayer.";
}

const createTicketSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Le titre doit contenir au moins 5 caractères.")
    .max(255),
  description: z
    .string()
    .trim()
    .min(10, "Merci de décrire votre problème plus en détail."),
  software: z.string().trim().min(1, "Précisez le logiciel concerné."),
  version: z.string().trim().max(100).optional(),
  priority: z.enum(["faible", "moyen", "élevé", "bloquant"], {
    message: "Priorité invalide.",
  }),
});

export async function createTicket(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const parsed = createTicketSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    software: formData.get("software"),
    version: formData.get("version") || undefined,
    priority: formData.get("priority"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }

  const { user, profile } = await requireProfile();

  try {
    const ticket = await bugtrackCreateTicket({
      user_id: user.id,
      user_email: user.email ?? "",
      user_name: profile.full_name || user.email || "Client",
      title: parsed.data.title,
      description: parsed.data.description,
      software: parsed.data.software,
      version: parsed.data.version || null,
      priority: parsed.data.priority,
    });
    redirect(`/portail/tickets/${ticket.id}`);
  } catch (err) {
    if (err instanceof BugTrackError) {
      return { error: bugTrackErrorMessage(err) };
    }
    throw err;
  }
}

const replySchema = z.object({
  ticketId: z.string().min(1),
  message: z.string().trim().min(1, "Le message ne peut pas être vide.").max(5000),
});

export async function replyToTicket(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const parsed = replySchema.safeParse({
    ticketId: formData.get("ticketId"),
    message: formData.get("message"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }

  // user_id vient TOUJOURS de la session serveur, jamais du formulaire —
  // sinon un client pourrait lire/écrire sur le ticket d'un autre en
  // changeant l'identifiant transmis.
  const { user } = await requireProfile();

  try {
    await postMessage(parsed.data.ticketId, user.id, parsed.data.message);
  } catch (err) {
    return { error: bugTrackErrorMessage(err) };
  }

  revalidatePath(`/portail/tickets/${parsed.data.ticketId}`);
  revalidatePath("/portail/tickets");
  return {};
}

const ticketIdSchema = z.object({ ticketId: z.string().min(1) });

export async function closeTicket(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const parsed = ticketIdSchema.safeParse({ ticketId: formData.get("ticketId") });
  if (!parsed.success) return { error: "Ticket invalide." };

  const { user } = await requireProfile();

  try {
    await bugtrackCloseTicket(parsed.data.ticketId, user.id);
  } catch (err) {
    return { error: bugTrackErrorMessage(err) };
  }

  revalidatePath(`/portail/tickets/${parsed.data.ticketId}`);
  revalidatePath("/portail/tickets");
  return {};
}

const reopenSchema = z.object({
  ticketId: z.string().min(1),
  reason: z.string().trim().max(5000).optional(),
});

export async function reopenTicket(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const parsed = reopenSchema.safeParse({
    ticketId: formData.get("ticketId"),
    reason: formData.get("reason") || undefined,
  });
  if (!parsed.success) return { error: "Ticket invalide." };

  const { user } = await requireProfile();

  try {
    await bugtrackReopenTicket(parsed.data.ticketId, user.id, parsed.data.reason);
  } catch (err) {
    return { error: bugTrackErrorMessage(err) };
  }

  revalidatePath(`/portail/tickets/${parsed.data.ticketId}`);
  revalidatePath("/portail/tickets");
  return {};
}
