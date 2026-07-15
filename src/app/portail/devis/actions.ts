"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { sendMail } from "@/lib/email";
import { formulaLabel } from "@/lib/quotes";

const quoteSchema = z.object({
  projectType: z.enum(["landing", "intermediaire", "refonte", "application"]),
  company: z.string().trim().max(200).optional(),
  budgetRange: z.string().trim().max(100).optional(),
  timeline: z.string().trim().max(100).optional(),
  description: z
    .string()
    .trim()
    .min(10, "Merci de décrire votre projet en quelques mots (10 caractères minimum)."),
  options: z.array(z.string().trim().max(100)).max(20).optional(),
});

export type QuotePayload = z.input<typeof quoteSchema>;

type QuoteResult =
  | { ok: true; reference: string }
  | { ok: false; error: string };

export async function submitQuoteRequest(
  payload: QuotePayload
): Promise<QuoteResult> {
  const parsed = quoteSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Formulaire invalide.",
    };
  }

  const { projectType, company, budgetRange, timeline, description, options } =
    parsed.data;

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, error: "Vous devez être connecté pour envoyer un devis." };
  }

  const { data, error } = await supabase
    .from("quote_requests")
    .insert({
      created_by: user.id,
      project_type: projectType,
      company: company || null,
      budget_range: budgetRange || null,
      timeline: timeline || null,
      description,
      options: options ?? [],
    })
    .select("reference")
    .single();

  if (error || !data) {
    console.error("[submitQuoteRequest] Supabase error:", error?.message);
    return {
      ok: false,
      error: "Impossible d'enregistrer votre demande, veuillez réessayer.",
    };
  }

  // Notification email (best-effort) : le devis est déjà enregistré, donc un
  // échec d'envoi ne doit pas faire perdre la demande au client.
  try {
    await sendMail({
      subject: `Nouveau pré-devis ${data.reference} — ${formulaLabel(projectType)}`,
      replyTo: user.email,
      text: [
        `Référence : ${data.reference}`,
        `Formule : ${formulaLabel(projectType)}`,
        `Client : ${user.email}`,
        `Entreprise : ${company || "-"}`,
        `Budget : ${budgetRange || "-"}`,
        `Délai : ${timeline || "-"}`,
        `Options : ${options && options.length ? options.join(", ") : "-"}`,
        "",
        "Description du projet :",
        description,
      ].join("\n"),
    });
  } catch (err) {
    console.error("[submitQuoteRequest] Échec envoi email pré-devis:", err);
  }

  revalidatePath("/portail/devis");
  return { ok: true, reference: data.reference };
}
