"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { addMessageSchema } from "@/lib/tickets/schema";

export async function addMessage(
  ticketId: string,
  _prevState: { error: string } | null,
  formData: FormData
): Promise<{ error: string } | null> {
  const parsed = addMessageSchema.safeParse({
    ticketId,
    body: formData.get("body"),
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
    is_internal_note: false,
  });

  if (error) {
    console.error("[addMessage] Supabase error:", error.message);
    return { error: "Impossible d'envoyer le message, veuillez réessayer." };
  }

  revalidatePath(`/portail/tickets/${ticketId}`);
  return null;
}
