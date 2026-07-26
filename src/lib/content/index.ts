import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import {
  isSupabaseConfigured,
  CONTENT_TABLE,
  CONTENT_ROW_ID,
} from "@/lib/supabase/config";
import { defaultContent } from "./defaults";
import type { SiteContent, ThemeContent } from "./types";

// Valeurs par défaut des ANCIENS thèmes (thème clair, puis navy/bleu d'avant
// la DA bleu → vert du 2026-07-16). Un enregistrement fait à ces époques a
// figé ces valeurs en base sans que ce soit un choix : on les traite comme
// « non personnalisées » et on les remplace par les défauts actuels.
const LEGACY_THEME_DEFAULTS: Partial<Record<keyof ThemeContent, string[]>> = {
  accent: ["#2f9fe4", "#3faaf0", "#34d399"],
  headerBg: ["#0f1b2e", "#0b1524", "#0a1524", "#0b0b0d", "#0a1512"],
  cardDark: ["#0e1526", "#0a1524", "#08080a", "#071310"],
  darkBackground: ["#0f1b2e", "#0d1b2e", "#0b0b0d", "#0a1512"],
  darkSurface: ["#182a44", "#14273e", "#131316", "#101f1a"],
};

function normalizeLegacy<T extends Record<string, unknown>>(
  merged: T,
  defaults: T,
  legacy: Partial<Record<keyof T, string[]>>
): T {
  (Object.keys(legacy) as (keyof T)[]).forEach((key) => {
    const value = merged[key];
    if (
      typeof value === "string" &&
      legacy[key]!.includes(value.toLowerCase())
    ) {
      merged[key] = defaults[key];
    }
  });
  return merged;
}

function normalizeTheme(stored: Partial<ThemeContent> | undefined): ThemeContent {
  return normalizeLegacy(
    { ...defaultContent.theme, ...stored },
    defaultContent.theme,
    LEGACY_THEME_DEFAULTS
  );
}

// Fusionne le contenu enregistré par-dessus les valeurs par défaut, section par
// section, pour qu'un champ manquant ne casse jamais l'affichage.
function mergeContent(stored: Partial<SiteContent> | null): SiteContent {
  if (!stored) return defaultContent;
  return {
    theme: normalizeTheme(stored.theme),
    hero: { ...defaultContent.hero, ...stored.hero },
    portfolio: { ...defaultContent.portfolio, ...stored.portfolio },
    services: {
      ...defaultContent.services,
      ...stored.services,
      offers: {
        landing: {
          ...defaultContent.services.offers.landing,
          ...stored.services?.offers?.landing,
        },
        intermediaire: {
          ...defaultContent.services.offers.intermediaire,
          ...stored.services?.offers?.intermediaire,
        },
        refonte: {
          ...defaultContent.services.offers.refonte,
          ...stored.services?.offers?.refonte,
        },
        application: {
          ...defaultContent.services.offers.application,
          ...stored.services?.offers?.application,
        },
      },
    },
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
