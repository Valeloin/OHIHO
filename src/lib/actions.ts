"use server";

import { z } from "zod";
import { sendContactEmail } from "@/lib/resend";

type ActionResult = { error?: string; success?: boolean };

const contactSchema = z.object({
  name: z.string().trim().min(1, "Le nom est requis."),
  email: z.string().trim().email("Adresse email invalide."),
  message: z.string().trim().min(10, "Merci de détailler un peu votre message."),
});

export async function sendContactMessage(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }

  try {
    await sendContactEmail({
      to: "contact@ohiho.fr",
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message,
    });
  } catch (err) {
    console.error("[sendContactMessage] error:", err);
    return { error: "Impossible d'envoyer le message, veuillez réessayer." };
  }

  return { success: true };
}
