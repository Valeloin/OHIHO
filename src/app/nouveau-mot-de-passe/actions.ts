"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const schema = z
  .object({
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères."),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Les deux mots de passe ne correspondent pas.",
    path: ["confirm"],
  });

export async function updatePassword(
  _prevState: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string } | null> {
  const parsed = schema.safeParse({
    password: formData.get("password"),
    confirm: formData.get("confirm"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });

  if (error) {
    console.error("[updatePassword] Supabase error:", error.message);
    return {
      error:
        "Le lien de réinitialisation est invalide ou a expiré. Redemandez-en un.",
    };
  }

  redirect("/portail");
}
