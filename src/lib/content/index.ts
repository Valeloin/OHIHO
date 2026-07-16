import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import {
  isSupabaseConfigured,
  CONTENT_TABLE,
  CONTENT_ROW_ID,
} from "@/lib/supabase/config";
import { defaultContent } from "./defaults";
import type { SiteContent, ThemeContent } from "./types";

// Valeurs par défaut de l'ANCIEN thème (avant la bascule en sombre unique du
// 2026-07-16). Un enregistrement fait à cette époque a figé ces valeurs en
// base sans que ce soit un choix : on les traite comme « non personnalisées »
// et on les remplace par les défauts actuels.
const LEGACY_THEME_DEFAULTS: Partial<ThemeContent> = {
  accent: "#2f9fe4",
  headerBg: "#0f1b2e",
};

function normalizeTheme(stored: Partial<ThemeContent> | undefined): ThemeContent {
  const theme = { ...defaultContent.theme, ...stored };
  (Object.keys(LEGACY_THEME_DEFAULTS) as (keyof ThemeContent)[]).forEach(
    (key) => {
      if (theme[key]?.toLowerCase() === LEGACY_THEME_DEFAULTS[key]) {
        theme[key] = defaultContent.theme[key];
      }
    }
  );
  return theme;
}

// Fusionne le contenu enregistré par-dessus les valeurs par défaut, section par
// section, pour qu'un champ manquant ne casse jamais l'affichage.
function mergeContent(stored: Partial<SiteContent> | null): SiteContent {
  if (!stored) return defaultContent;
  return {
    theme: normalizeTheme(stored.theme),
    hero: { ...defaultContent.hero, ...stored.hero },
    portfolio: { ...defaultContent.portfolio, ...stored.portfolio },
    services: { ...defaultContent.services, ...stored.services },
    method: { ...defaultContent.method, ...stored.method },
    expertise: { ...defaultContent.expertise, ...stored.expertise },
    whyUs: { ...defaultContent.whyUs, ...stored.whyUs },
    contact: { ...defaultContent.contact, ...stored.contact },
    footer: { ...defaultContent.footer, ...stored.footer },
    quotes: {
      ...defaultContent.quotes,
      ...stored.quotes,
      colors: {
        ...defaultContent.quotes.colors,
        ...stored.quotes?.colors,
      },
      formulas: {
        landing: {
          ...defaultContent.quotes.formulas.landing,
          ...stored.quotes?.formulas?.landing,
        },
        intermediaire: {
          ...defaultContent.quotes.formulas.intermediaire,
          ...stored.quotes?.formulas?.intermediaire,
        },
        refonte: {
          ...defaultContent.quotes.formulas.refonte,
          ...stored.quotes?.formulas?.refonte,
        },
        application: {
          ...defaultContent.quotes.formulas.application,
          ...stored.quotes?.formulas?.application,
        },
      },
      statusLabels: {
        ...defaultContent.quotes.statusLabels,
        ...stored.quotes?.statusLabels,
      },
    },
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
