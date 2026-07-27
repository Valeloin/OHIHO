"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { sendTicketNotificationEmail } from "@/lib/resend";

type ActionResult = { error?: string };

const STAFF_EMAIL = "contact@ohiho.fr";

function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://ohiho.fr";
}

const createTicketSchema = z.object({
  subject: z.string().trim().min(1, "L'objet est requis.").max(200),
  body: z.string().trim().min(1, "Merci de décrire votre problème."),
});

// Utilisée par le client ET le staff : la RLS fait le vrai contrôle d'accès,
// cette action ne vérifie que la présence d'une session (même motif que
// upsertProject dans admin/clients/actions.ts).
export async function createTicket(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const parsed = createTicketSchema.safeParse({
    subject: formData.get("subject"),
    body: formData.get("body"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Non autorisé. Reconnectez-vous." };

  const { data: ticket, error: ticketError } = await supabase
    .from("tickets")
    .insert({ client_id: user.id, subject: parsed.data.subject })
    .select("id")
    .single();

  if (ticketError || !ticket) {
    console.error("[createTicket] Supabase error:", ticketError?.message);
    return { error: "Impossible de créer le ticket, veuillez réessayer." };
  }

  const { error: messageError } = await supabase.from("ticket_messages").insert({
    ticket_id: ticket.id,
    author_id: user.id,
    body: parsed.data.body,
  });

  if (messageError) {
    console.error("[createTicket] Supabase error:", messageError.message);
    return { error: "Impossible de créer le ticket, veuillez réessayer." };
  }

  await sendTicketNotificationEmail({
    to: STAFF_EMAIL,
    subject: `Nouveau ticket : ${parsed.data.subject}`,
    ticketUrl: `${siteUrl()}/admin/tickets/${ticket.id}`,
    preview: parsed.data.body.slice(0, 200),
  });

  redirect(`/portail/tickets/${ticket.id}`);
}

const replySchema = z.object({
  ticketId: z.string().uuid(),
  body: z.string().trim().min(1, "Le message ne peut pas être vide."),
});

export async function replyToTicket(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const parsed = replySchema.safeParse({
    ticketId: formData.get("ticketId"),
    body: formData.get("body"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Non autorisé. Reconnectez-vous." };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const { data: ticket } = await supabase
    .from("tickets")
    .select("client_id, subject")
    .eq("id", parsed.data.ticketId)
    .single();

  if (!ticket) return { error: "Ticket introuvable." };

  const { error } = await supabase.from("ticket_messages").insert({
    ticket_id: parsed.data.ticketId,
    author_id: user.id,
    body: parsed.data.body,
  });

  if (error) {
    console.error("[replyToTicket] Supabase error:", error.message);
    return { error: "Impossible d'envoyer le message, veuillez réessayer." };
  }

  const isClient = profile?.role === "client";

  if (isClient) {
    await supabase.rpc("reopen_ticket_if_closed", {
      p_ticket_id: parsed.data.ticketId,
    });
  }

  if (isClient) {
    await sendTicketNotificationEmail({
      to: STAFF_EMAIL,
      subject: `Nouvelle réponse : ${ticket.subject}`,
      ticketUrl: `${siteUrl()}/admin/tickets/${parsed.data.ticketId}`,
      preview: parsed.data.body.slice(0, 200),
    });
  } else {
    const { data: clientProfile } = await supabase
      .from("profiles")
      .select("email")
      .eq("id", ticket.client_id)
      .single();

    if (clientProfile?.email) {
      await sendTicketNotificationEmail({
        to: clientProfile.email,
        subject: `Nouvelle réponse : ${ticket.subject}`,
        ticketUrl: `${siteUrl()}/portail/tickets/${parsed.data.ticketId}`,
        preview: parsed.data.body.slice(0, 200),
      });
    }
  }

  revalidatePath(`/portail/tickets/${parsed.data.ticketId}`);
  revalidatePath("/portail/tickets");
  revalidatePath(`/admin/tickets/${parsed.data.ticketId}`);
  revalidatePath("/admin/tickets");

  return {};
}
