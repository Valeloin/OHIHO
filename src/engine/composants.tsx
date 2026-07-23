import type { ComponentType } from "react";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import ResetRequestForm from "@/components/auth/ResetRequestForm";
import NewPasswordForm from "@/components/auth/NewPasswordForm";
import DevisWizard from "@/components/portail/DevisWizard";
import ProfileForm from "@/components/portail/ProfileForm";
import { createClient } from "@/lib/supabase/server";
import { getContent } from "@/lib/content";
import HeroShowcase from "@/components/motion/HeroShowcase";
import MethodShowcase from "@/components/motion/MethodShowcase";
import TicketScene from "@/components/motion/TicketScene";
import SectionBackdrop from "@/components/motion/SectionBackdrop";
import ServiceScene from "@/components/motion/ServiceScene";

// La frise Méthode attend le nombre d'étapes (4 dans OHIHO).
function SceneMethode() {
  return <MethodShowcase steps={4} />;
}

// Les 4 vignettes de formules attendent un `type` : ServiceScene fournit déjà
// la fenêtre (svg + fond + barre de navigateur), on ne fixe que la formule.
function SceneMaintenance() {
  return <ServiceScene type="landing" />;
}
function SceneDigitalisation() {
  return <ServiceScene type="intermediaire" />;
}
function SceneRefonte() {
  return <ServiceScene type="refonte" />;
}
function SceneApplication() {
  return <ServiceScene type="application" />;
}

// Message affiché quand un composant réservé à l'espace client est posé sur une
// page publique et que le visiteur n'est pas connecté.
function MessageConnexion() {
  return (
    <div style={{ padding: "1.5rem", border: "1px solid #23405c", borderRadius: "14px", background: "#102436", color: "#9fb2cc", textAlign: "center" }}>
      <p style={{ margin: 0 }}>Cette partie est réservée à votre espace client.</p>
      <a href="/connexion" style={{ color: "#22d3c4", display: "inline-block", marginTop: "0.75rem" }}>Se connecter →</a>
    </div>
  );
}

// Wrapper « devis » : récupère l'utilisateur + sa société + la config devis.
async function DevisEmbarque() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <MessageConnexion />;
  const { data: profile } = await supabase.from("profiles").select("company").eq("id", user.id).single();
  const content = await getContent();
  return <DevisWizard defaultCompany={profile?.company ?? ""} quotes={content.quotes} />;
}

// Wrapper « profil » : récupère l'utilisateur connecté et ses infos.
async function ProfilEmbarque() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <MessageConnexion />;
  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name, last_name, phone, address, company, email")
    .eq("id", user.id)
    .single();
  return (
    <ProfileForm
      email={profile?.email ?? user.email ?? ""}
      firstName={profile?.first_name ?? null}
      lastName={profile?.last_name ?? null}
      phone={profile?.phone ?? null}
      address={profile?.address ?? null}
      company={profile?.company ?? null}
    />
  );
}

// Registre des « blocs-composants » : de vrais composants fonctionnels d'OHIHO,
// embarquables dans une page éditée par le moteur. Ils restent pilotés par leur
// propre code (server actions, Supabase…) ; le moteur ne fait que les POSER.
export const COMPOSANTS: Record<string, ComponentType> = {
  connexion: LoginForm as ComponentType,
  inscription: SignupForm as ComponentType,
  "mot-de-passe-oublie": ResetRequestForm as ComponentType,
  "nouveau-mot-de-passe": NewPasswordForm as ComponentType,
  devis: DevisEmbarque as unknown as ComponentType,
  profil: ProfilEmbarque as unknown as ComponentType,
  // Scènes animées signature d'OHIHO (les @keyframes vivent dans globals.css).
  "scene-hero": HeroShowcase as ComponentType,
  "scene-methode": SceneMethode as ComponentType,
  "scene-bugtrack": TicketScene as ComponentType,
  "fond-anime": SectionBackdrop as ComponentType,
  "scene-maintenance": SceneMaintenance as ComponentType,
  "scene-digitalisation": SceneDigitalisation as ComponentType,
  "scene-refonte": SceneRefonte as ComponentType,
  "scene-application": SceneApplication as ComponentType,
};

// Libellés pour l'interface (panneau / palette de l'extension).
export const COMPOSANTS_LISTE: { nom: string; label: string }[] = [
  { nom: "connexion", label: "Connexion" },
  { nom: "inscription", label: "Inscription" },
  { nom: "mot-de-passe-oublie", label: "Mot de passe oublié" },
  { nom: "nouveau-mot-de-passe", label: "Nouveau mot de passe" },
  { nom: "devis", label: "Demande de devis" },
  { nom: "profil", label: "Profil client" },
  { nom: "scene-hero", label: "🎬 Scène — héro" },
  { nom: "scene-methode", label: "🎬 Scène — méthode" },
  { nom: "scene-bugtrack", label: "🎬 Scène — BugTrack" },
  { nom: "fond-anime", label: "🎬 Fond animé" },
  { nom: "scene-maintenance", label: "🎬 Scène — maintenance" },
  { nom: "scene-digitalisation", label: "🎬 Scène — digitalisation" },
  { nom: "scene-refonte", label: "🎬 Scène — refonte" },
  { nom: "scene-application", label: "🎬 Scène — application" },
];
