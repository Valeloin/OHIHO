"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  email: z.string().trim().email("Adresse email invalide."),
});

export async function requestPasswordReset(
  _prevState: { error?: string; success?: boolean } | null,
  formData: FormData
): Promise<{ error?: string; success?: boolean } | null> {
  const parsed = schema.safeParse({ email: formData.get("email") });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }

  const supabase = createClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ohiho.fr";

  const { error } = await supabase.auth.resetPasswordForEmail(
    parsed.data.email,
    { redirectTo: `${siteUrl}/auth/callback?next=/nouveau-mot-de-passe` }
  );

  if (error) {
    console.error("[requestPasswordReset] Supabase error:", error.message);
  }

  // On renvoie toujours un succès : ne pas révéler si l'email a un compte ou non.
  return { success: true };
}
