import Hero from "@/components/home/Hero";
import Offres from "@/components/home/Offres";
import Methode from "@/components/home/Methode";
import Realisations from "@/components/home/Realisations";
import Faq from "@/components/home/Faq";
import Contact from "@/components/home/Contact";

// Accueil, restructuré le 2026-08-26 à la demande de Valentin : mêmes
// informations, structure repensée.
//
// Hero centré → comparatif des offres → frise de la méthode → réalisations
// en bandeaux → FAQ (qui absorbe les anciennes « preuves ») → contact.
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
