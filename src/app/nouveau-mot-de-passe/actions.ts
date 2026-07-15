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

  // Sans session de récupération valide, on ne peut pas changer le mot de passe.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return {
      error:
        "Votre session de réinitialisation a expiré ou le lien a déjà été utilisé. Demandez un nouveau lien depuis « Mot de passe oublié ».",
    };
  }

  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });

  if (error) {
    console.error("[updatePassword] Supabase error:", error.status, error.message);
    const msg = error.message.toLowerCase();
    if (msg.includes("different") || msg.includes("same")) {
      return {
        error: "Le nouveau mot de passe doit être différent de l'ancien.",
      };
    }
    if (msg.includes("session") || msg.includes("token") || msg.includes("jwt")) {
      return {
        error:
          "Lien de réinitialisation expiré ou déjà utilisé. Demandez-en un nouveau.",
      };
    }
    return { error: `Impossible de changer le mot de passe : ${error.message}` };
  }

  redirect("/portail");
}
