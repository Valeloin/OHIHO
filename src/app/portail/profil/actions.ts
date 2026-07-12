"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const profileSchema = z.object({
  fullName: z.string().trim().min(1, "Le nom est requis."),
  company: z.string().trim().optional(),
});

export async function updateProfile(
  _prevState: { error: string; success?: boolean } | null,
  formData: FormData
): Promise<{ error: string; success?: boolean } | null> {
  const parsed = profileSchema.safeParse({
    fullName: formData.get("fullName"),
    company: formData.get("company"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }

  const supabase = createClient();
  const { error } = await supabase.rpc("update_own_profile", {
    p_full_name: parsed.data.fullName,
    p_company: parsed.data.company || null,
  });

  if (error) {
    console.error("[updateProfile] Supabase error:", error.message);
    return { error: "Impossible de mettre à jour le profil, veuillez réessayer." };
  }

  revalidatePath("/portail/profil");
  revalidatePath("/portail");
  return { error: "", success: true };
}
