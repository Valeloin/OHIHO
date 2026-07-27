"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { TicketPriority, TicketStatus } from "@/lib/supabase/types";

// Écriture réservée aux rôles admin/technicien : contrôlé par la sécurité
// RLS de Supabase (tickets_staff_update), pas par ce code — même motif que
// updateInvoiceStatus dans admin/clients/actions.ts.
export async function updateTicketStatus(
  ticketId: string,
  status: TicketStatus
) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("tickets").update({ status }).eq("id", ticketId);
  revalidatePath(`/admin/tickets/${ticketId}`);
  revalidatePath("/admin/tickets");
  revalidatePath(`/portail/tickets/${ticketId}`);
  revalidatePath("/portail/tickets");
}

export async function updateTicketPriority(
  ticketId: string,
  priority: TicketPriority
) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("tickets").update({ priority }).eq("id", ticketId);
  revalidatePath(`/admin/tickets/${ticketId}`);
  revalidatePath("/admin/tickets");
  revalidatePath(`/portail/tickets/${ticketId}`);
  revalidatePath("/portail/tickets");
}
