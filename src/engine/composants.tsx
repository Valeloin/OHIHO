import type { ComponentType } from "react";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import ResetRequestForm from "@/components/auth/ResetRequestForm";
import NewPasswordForm from "@/components/auth/NewPasswordForm";

// Registre des « blocs-composants » : de vrais composants fonctionnels d'OHIHO,
// embarquables dans une page éditée par le moteur. Ils restent pilotés par leur
// propre code (server actions, Supabase…) ; le moteur ne fait que les POSER.
export const COMPOSANTS: Record<string, ComponentType> = {
  connexion: LoginForm as ComponentType,
  inscription: SignupForm as ComponentType,
  "mot-de-passe-oublie": ResetRequestForm as ComponentType,
  "nouveau-mot-de-passe": NewPasswordForm as ComponentType,
};

// Libellés pour l'interface (panneau / palette de l'extension).
export const COMPOSANTS_LISTE: { nom: string; label: string }[] = [
  { nom: "connexion", label: "Connexion" },
  { nom: "inscription", label: "Inscription" },
  { nom: "mot-de-passe-oublie", label: "Mot de passe oublié" },
  { nom: "nouveau-mot-de-passe", label: "Nouveau mot de passe" },
];
