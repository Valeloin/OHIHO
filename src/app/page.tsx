import Hero from "@/components/home/Hero";
import Offres from "@/components/home/Offres";
import Methode from "@/components/home/Methode";
import Realisations from "@/components/home/Realisations";
import Faq from "@/components/home/Faq";
import Contact from "@/components/home/Contact";

// Accueil. L'ordre suit le chemin d'un visiteur : ce qu'on lui promet et ce
// qu'on vend (hero), le détail des formules, comment ça se passe, la preuve
// que ça tourne, ses dernières objections, et comment nous joindre.
//
// Le bandeau des six arguments qui vivait ici a été supprimé le 2026-08-26 :
// quatre de ses six promesses étaient déjà, mot pour mot, des questions de la
// FAQ. Deux formulations de la même chose sur une même page, c'est ce qui
// rendait le haut de page confus.
export default function Home() {
  return (
    <main>
      <Hero />
      <Offres />
      <Methode />
      <Realisations />
      <Faq />
      <Contact />
    </main>
  );
}
