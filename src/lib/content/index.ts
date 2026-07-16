import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import {
  isSupabaseConfigured,
  CONTENT_TABLE,
  CONTENT_ROW_ID,
} from "@/lib/supabase/config";
import { defaultContent } from "./defaults";
import type { SiteContent } from "./types";

// Fusionne le contenu enregistré par-dessus les valeurs par défaut, section par
// section, pour qu'un champ manquant ne casse jamais l'affichage.
function mergeContent(stored: Partial<SiteContent> | null): SiteContent {
  if (!stored) return defaultContent;
  return {
    theme: { ...defaultContent.theme, ...stored.theme },
    hero: { ...defaultContent.hero, ...stored.hero },
    portfolio: { ...defaultContent.portfolio, ...stored.portfolio },
    services: { ...defaultContent.services, ...stored.services },
    method: { ...defaultContent.method, ...stored.method },
    expertise: { ...defaultContent.expertise, ...stored.expertise },
    whyUs: { ...defaultContent.whyUs, ...stored.whyUs },
    contact: { ...defaultContent.contact, ...stored.contact },
    footer: { ...defaultContent.footer, ...stored.footer },
  };
}

// Récupère le contenu du site. `cache` évite les appels multiples par requête.
export const getContent = cache(async (): Promise<SiteContent> => {
  if (!isSupabaseConfigured()) {
    return defaultContent;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from(CONTENT_TABLE)
      .select("data")
      .eq("id", CONTENT_ROW_ID)
      .maybeSingle();

    if (error || !data) {
      return defaultContent;
    }

    return mergeContent(data.data as Partial<SiteContent>);
  } catch {
    // Souci réseau/config : on retombe sur le contenu par défaut.
    return defaultContent;
  }
});
