"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createTicketSchema } from "@/lib/tickets/schema";

export async function createTicket(
  _prevState: { error: string } | null,
  formData: FormData
): Promise<{ error: string } | null> {
  const parsed = createTicketSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    priority: formData.get("priority"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Vous devez être connecté pour créer un ticket." };
  }

  const { data, error } = await supabase
    .from("tickets")
    .insert({
      title: parsed.data.title,
      description: parsed.data.description,
      category: parsed.data.category,
      priority: parsed.data.priority,
      created_by: user.id,
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("[createTicket] Supabase error:", error?.message);
    return { error: "Impossible de créer le ticket, veuillez réessayer." };
  }

  redirect(`/portail/tickets/${data.id}`);
}
