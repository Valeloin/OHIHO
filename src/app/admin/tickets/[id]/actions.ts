"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { addMessageSchema, updateTicketSchema } from "@/lib/tickets/schema";
import type { Ticket, TicketPriority, TicketStatus } from "@/lib/supabase/types";

export async function addStaffMessage(
  ticketId: string,
  _prevState: { error: string } | null,
  formData: FormData
): Promise<{ error: string } | null> {
  const parsed = addMessageSchema.safeParse({
    ticketId,
    body: formData.get("body"),
    isInternalNote: formData.get("isInternalNote") === "true",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Message invalide." };
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Vous devez être connecté." };
  }

  const { error } = await supabase.from("ticket_messages").insert({
    ticket_id: parsed.data.ticketId,
    author_id: user.id,
    body: parsed.data.body,
    is_internal_note: parsed.data.isInternalNote ?? false,
  });

  if (error) {
    console.error("[addStaffMessage] Supabase error:", error.message);
    return { error: "Impossible d'envoyer le message, veuillez réessayer." };
  }

  revalidatePath(`/admin/tickets/${ticketId}`);
  return null;
}

export async function updateTicket(input: {
  ticketId: string;
  status?: TicketStatus;
  priority?: TicketPriority;
  assignedTo?: string | null;
}) {
  const parsed = updateTicketSchema.safeParse(input);
  if (!parsed.success) return;

  const supabase = createClient();
  const update: Partial<Ticket> = {};
  if (parsed.data.status) update.status = parsed.data.status;
  if (parsed.data.priority) update.priority = parsed.data.priority;
  if (parsed.data.assignedTo !== undefined) update.assigned_to = parsed.data.assignedTo;

  await supabase.from("tickets").update(update).eq("id", parsed.data.ticketId);

  revalidatePath(`/admin/tickets/${parsed.data.ticketId}`);
  revalidatePath("/admin/tickets");
}
