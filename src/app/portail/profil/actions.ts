"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const profileSchema = z.object({
  firstName: z.string().trim().min(1, "Le prénom est requis."),
  lastName: z.string().trim().min(1, "Le nom est requis."),
  phone: z.string().trim().optional(),
  address: z.string().trim().optional(),
  company: z.string().trim().optional(),
});

export async function updateProfile(
  _prevState: { error: string; success?: boolean } | null,
  formData: FormData
): Promise<{ error: string; success?: boolean } | null> {
  const parsed = profileSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    company: formData.get("company"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }

  const supabase = createClient();
  const { error } = await supabase.rpc("update_own_profile", {
    p_first_name: parsed.data.firstName,
    p_last_name: parsed.data.lastName || null,
    p_phone: parsed.data.phone || null,
    p_address: parsed.data.address || null,
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
