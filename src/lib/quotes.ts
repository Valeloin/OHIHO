import type { QuoteProjectType, QuoteStatus } from "@/lib/supabase/types";
import type { QuotesContent, QuoteFormulaContent } from "@/lib/content/types";

/**
 * Aides autour du parcours de devis. Les libellés (formules, budgets, délais,
 * statuts) sont éditables depuis /admin et vivent dans le contenu du site
 * (`content.quotes`) — voir src/lib/content. Seuls l'ordre d'affichage et les
 * types techniques restent définis ici.
 */

export type Formula = QuoteFormulaContent & { type: QuoteProjectType };

// Ordre d'affichage des formules dans l'assistant.
export const PROJECT_TYPES: QuoteProjectType[] = [
  "landing",
  "intermediaire",
  "refonte",
  "application",
];

export function formulasFrom(quotes: QuotesContent): Formula[] {
  return PROJECT_TYPES.map((type) => ({ type, ...quotes.formulas[type] }));
}

export function formulaLabel(
  type: QuoteProjectType,
  quotes: QuotesContent
): string {
  return quotes.formulas[type]?.label ?? type;
}

export function statusLabel(
  status: QuoteStatus,
  quotes: QuotesContent
): string {
  return quotes.statusLabels[status] ?? status;
}
