import { z } from "zod";
import { OFFRES } from "./offres";

// Sujets proposés dans le formulaire : les quatre offres, plus « autre » pour
// les demandes qui n'entrent dans aucune case.
export const SUJETS = [
  ...OFFRES.map((offre) => ({ value: offre.slug, label: offre.label })),
  { value: "autre", label: "Autre / je ne sais pas encore" },
];

const SUJETS_VALIDES = SUJETS.map((s) => s.value) as [string, ...string[]];

// Validation partagée : le formulaire l'utilise côté navigateur pour les
// messages d'erreur, la route API la rejoue côté serveur — un envoi forgé
// hors du formulaire est arrêté de la même façon.
export const contactSchema = z.object({
  nom: z
    .string()
    .trim()
    .min(2, "Indiquez votre nom.")
    .max(80, "Ce nom est trop long."),
  email: z
    .string()
    .trim()
    .max(160, "Cette adresse est trop longue.")
    // Regex volontairement simple : elle écarte les fautes de frappe
    // évidentes, la vraie vérification étant que le message arrive.
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Cette adresse email semble incomplète."),
  sujet: z.enum(SUJETS_VALIDES),
  message: z
    .string()
    .trim()
    .min(20, "Décrivez votre projet en quelques lignes (20 caractères minimum).")
    .max(4000, "Ce message est trop long."),
  // Champ piège : invisible et hors tabulation dans le formulaire, donc
  // toujours vide pour un humain. Un robot qui remplit tout se trahit ici.
  //
  // Le schéma l'accepte rempli exprès : c'est la route API qui décide quoi en
  // faire (répondre « envoyé » sans rien envoyer). S'il était rejeté ici, le
  // robot apprendrait qu'il a été repéré.
  societe: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export function labelSujet(value: string): string {
  return SUJETS.find((s) => s.value === value)?.label ?? value;
}
