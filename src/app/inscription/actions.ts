"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const signUpSchema = z.object({
  fullName: z.string().trim().min(1, "Le nom est requis."),
  company: z.string().trim().optional(),
  email: z.string().trim().email("Adresse email invalide."),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères."),
  phone: z.string().trim().optional(),
  companySize: z.string().trim().optional(),
  need: z.string().trim().optional(),
  message: z.string().trim().optional(),
});

export async function signUp(
  _prevState: { error: string } | null,
  formData: FormData
): Promise<{ error: string } | null> {
  const parsed = signUpSchema.safeParse({
    fullName: formData.get("fullName"),
    company: formData.get("company"),
    email: formData.get("email"),
    password: formData.get("password"),
    phone: formData.get("phone"),
    companySize: formData.get("companySize"),
    need: formData.get("need"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }

  const { fullName, company, email, password, phone, companySize, need, message } =
    parsed.data;
  const supabase = createClient();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ohiho.fr";

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        company: company || null,
        phone: phone || null,
        company_size: companySize || null,
        need: need || null,
        signup_message: message || null,
      },
      emailRedirectTo: `${siteUrl}/auth/callback`,
    },
  });

  if (error) {
    console.error("[signUp] Supabase error:", error.status, error.code, error.message);
    return {
      error:
        error.message === "User already registered"
          ? "Un compte existe déjà avec cet email."
          : "Impossible de créer le compte, veuillez réessayer.",
    };
  }

  redirect("/inscription/confirmation");
}
