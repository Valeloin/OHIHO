"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  isSupabaseConfigured,
  CONTENT_TABLE,
  CONTENT_ROW_ID,
} from "@/lib/supabase/config";
import { defaultContent } from "./defaults";
import type { SiteContent } from "./types";

type ActionResult = { ok: boolean; error?: string };

// Enregistre l'intégralité du contenu du site. L'écriture est réservée au rôle
// admin (contrôlé par la sécurité RLS de Supabase, cf. migration 006).
export async function saveContent(content: SiteContent): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Supabase n'est pas configuré." };
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, error: "Non autorisé. Reconnectez-vous." };
  }

  const { error } = await supabase.from(CONTENT_TABLE).upsert({
    id: CONTENT_ROW_ID,
    data: content,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    console.error("[saveContent] Supabase error:", error.message);
    return { ok: false, error: "Enregistrement impossible (droits admin ?)." };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return { ok: true };
}

// Réinitialise le contenu aux valeurs par défaut.
export async function resetContent(): Promise<ActionResult> {
  return saveContent(defaultContent);
}
