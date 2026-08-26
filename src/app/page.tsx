import Hero from "@/components/home/Hero";
import Arguments from "@/components/home/Arguments";
import Offres from "@/components/home/Offres";
import Methode from "@/components/home/Methode";
import Realisations from "@/components/home/Realisations";
import Faq from "@/components/home/Faq";
import Contact from "@/components/home/Contact";

// Landing refaite de bout en bout le 2026-08-26.
//
// L'ordre suit le chemin d'un visiteur : ce qu'on lui promet (hero), pourquoi
// il peut le croire (arguments), ce qu'il peut acheter (offres), comment ça
// se passe (méthode), la preuve que ça tourne (réalisations), ses dernières
// objections (FAQ), et comment nous joindre (contact).
export default function Home() {
  return (
    <main>
      <Hero />
      <Arguments />
      <Offres />
      <Methode />
      <Realisations />
      <Faq />
      <Contact />
    </main>
  );
}
