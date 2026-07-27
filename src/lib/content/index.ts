import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import {
  isSupabaseConfigured,
  CONTENT_TABLE,
  CONTENT_ROW_ID,
} from "@/lib/supabase/config";
import { defaultContent } from "./defaults";
import type {
  ContactContent,
  HeroContent,
  PortfolioContent,
  SiteContent,
  ThemeContent,
} from "./types";

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

// Même principe pour la section Contact. Elle a longtemps servi d'appel à
// l'inscription puis à la demande de devis ; ces deux dispositifs ont été
// retirés (devis le 2026-07-25, formulaire le 2026-07-27) mais leurs textes
// restent figés en base depuis un ancien enregistrement de /admin. Ce ne sont
// plus des choix éditoriaux, juste des restes : on les remplace par les
// libellés actuels.
const LEGACY_CONTACT_DEFAULTS: Partial<Record<keyof ContactContent, string[]>> =
  {
    kicker: ["votre projet", "démarrer", "demander un devis"],
    title: [
      "prêt à lancer votre site ou application ?",
      "prêt à lancer votre projet ?",
      "parlons de votre projet",
    ],
    subtitle: [
      "créez votre compte en une minute, puis décrivez votre besoin via une demande de devis guidée. nous revenons vers vous rapidement pour en discuter.",
      "créez votre compte en une minute, puis décrivez votre besoin via une demande de devis guidée. nous revenons vers vous rapidement pour en parler.",
    ],
    // L'adresse générique est remplacée par l'adresse nominative depuis le
    // 2026-07-27 : c'est Valentin qu'on contacte, pas un service.
    email: ["contact@ohiho.fr"],
  };

// Les deux boutons principaux du site ont successivement mené au devis
// (retiré le 2026-07-25) puis à la création de compte (mise en attente le
// 2026-07-27). Ils mènent désormais à la section Contact. Ces anciens
// libellés restent figés en base par un enregistrement de /admin : ils ne
// décrivent plus la destination, on les remplace.
const LEGACY_CTA_LABELS = [
  "demander un devis",
  "demander mon devis",
  "obtenir un devis",
  "créer mon compte",
  "créer un compte",
];

const LEGACY_HERO_DEFAULTS: Partial<Record<keyof HeroContent, string[]>> = {
  ctaPrimary: LEGACY_CTA_LABELS,
};

const LEGACY_PORTFOLIO_DEFAULTS: Partial<
  Record<keyof PortfolioContent, string[]>
> = {
  ctaButton: LEGACY_CTA_LABELS,
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
    hero: normalizeLegacy(
      { ...defaultContent.hero, ...stored.hero },
      defaultContent.hero,
      LEGACY_HERO_DEFAULTS
    ),
    portfolio: normalizeLegacy(
      { ...defaultContent.portfolio, ...stored.portfolio },
      defaultContent.portfolio,
      LEGACY_PORTFOLIO_DEFAULTS
    ),
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
    contact: normalizeLegacy(
      { ...defaultContent.contact, ...stored.contact },
      defaultContent.contact,
      LEGACY_CONTACT_DEFAULTS
    ),
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
