"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { eurosToCents } from "@/lib/money";
import type { InvoiceStatus } from "@/lib/supabase/types";

type ActionResult = { error?: string };

const stepSchema = z.object({
  label: z.string().trim().min(1),
  done: z.boolean(),
});

const projectSchema = z.object({
  projectId: z.string().optional(),
  clientId: z.string().uuid(),
  name: z.string().trim().min(1, "Le nom du projet est requis."),
  status: z.enum(["nouveau", "en_cours", "en_revision", "livre"]),
  notes: z.string().trim().optional(),
  steps: z.array(stepSchema),
});

function parseSteps(raw: FormDataEntryValue | null) {
  try {
    const parsed = JSON.parse(String(raw ?? "[]"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return null;
  }
}

// Écriture réservée aux rôles admin/technicien : contrôlé par la sécurité
// RLS de Supabase (policies *_staff_write), pas par ce code.
export async function upsertProject(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const steps = parseSteps(formData.get("steps"));
  if (steps === null) return { error: "Étapes invalides." };

  const parsed = projectSchema.safeParse({
    projectId: formData.get("projectId") || undefined,
    clientId: formData.get("clientId"),
    name: formData.get("name"),
    status: formData.get("status"),
    notes: formData.get("notes"),
    steps,
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Non autorisé. Reconnectez-vous." };

  const { projectId, clientId, name, status, notes, steps: parsedSteps } =
    parsed.data;

  const { error } = await supabase.from("projects").upsert({
    ...(projectId ? { id: projectId } : {}),
    client_id: clientId,
    name,
    status,
    notes: notes || null,
    steps: parsedSteps,
  });

  if (error) {
    console.error("[upsertProject] Supabase error:", error.message);
    return { error: "Enregistrement impossible (droits admin ?)." };
  }

  revalidatePath(`/admin/clients/${clientId}`);
  revalidatePath("/portail/sites");
  return {};
}

export async function deleteProject(projectId: string, clientId: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("projects").delete().eq("id", projectId);
  revalidatePath(`/admin/clients/${clientId}`);
  revalidatePath("/portail/sites");
}

const invoiceSchema = z.object({
  invoiceId: z.string().optional(),
  clientId: z.string().uuid(),
  number: z.string().trim().min(1, "Le numéro de facture est requis."),
  description: z.string().trim().min(1, "La description est requise."),
  amount: z.string().trim().min(1, "Le montant est requis."),
  status: z.enum(["brouillon", "envoyee", "payee"]),
  issueDate: z.string().trim().min(1, "La date d'émission est requise."),
  dueDate: z.string().trim().optional(),
});

export async function upsertInvoice(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const parsed = invoiceSchema.safeParse({
    invoiceId: formData.get("invoiceId") || undefined,
    clientId: formData.get("clientId"),
    number: formData.get("number"),
    description: formData.get("description"),
    amount: formData.get("amount"),
    status: formData.get("status"),
    issueDate: formData.get("issueDate"),
    dueDate: formData.get("dueDate"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Non autorisé. Reconnectez-vous." };

  const {
    invoiceId,
    clientId,
    number,
    description,
    amount,
    status,
    issueDate,
    dueDate,
  } = parsed.data;

  const { error } = await supabase.from("invoices").upsert({
    ...(invoiceId ? { id: invoiceId } : {}),
    client_id: clientId,
    number,
    description,
    amount_cents: eurosToCents(amount),
    status,
    issue_date: issueDate,
    due_date: dueDate || null,
  });

  if (error) {
    console.error("[upsertInvoice] Supabase error:", error.message);
    return { error: "Enregistrement impossible (droits admin ?)." };
  }

  revalidatePath(`/admin/clients/${clientId}`);
  revalidatePath("/portail/facturation");
  return {};
}

export async function deleteInvoice(invoiceId: string, clientId: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("invoices").delete().eq("id", invoiceId);
  revalidatePath(`/admin/clients/${clientId}`);
  revalidatePath("/portail/facturation");
}

export async function updateInvoiceStatus(
  invoiceId: string,
  clientId: string,
  status: InvoiceStatus
) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("invoices").update({ status }).eq("id", invoiceId);
  revalidatePath(`/admin/clients/${clientId}`);
  revalidatePath("/portail/facturation");
}
