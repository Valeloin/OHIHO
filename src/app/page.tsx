import Hero from "@/components/home/Hero";
import Offres from "@/components/home/Offres";
import Methode from "@/components/home/Methode";
import Realisations from "@/components/home/Realisations";
import Preuves from "@/components/home/Preuves";
import Contact from "@/components/home/Contact";

// Accueil : une seule page longue, dans cet ordre. Ce qu'on propose, comment
// on travaille, ce qu'on a livré, ce qui rassure, comment nous joindre.
export default function Home() {
  return (
    <main>
      <Hero />
      <Offres />
      <Methode />
      <Realisations />
      <Preuves />
      <Contact />
    </main>
  );
}
