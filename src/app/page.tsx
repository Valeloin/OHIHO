import Hero from "@/components/Hero";
import HeroShowcase from "@/components/motion/HeroShowcase";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import HowItWorks from "@/components/HowItWorks";
import Expertise from "@/components/Expertise";
import WhyUs from "@/components/WhyUs";
import ContactSection from "@/components/ContactSection";
import ScrollNav from "@/components/ScrollNav";
import { getContent } from "@/lib/content";
import { SERVICE_TYPES } from "@/lib/services";


export default async function Home() {
  const content = await getContent();

  return (
    <main>
      {/* La vitrine est passée en prop (et non importée par Hero) : Hero est
          un composant client, un import y embarquerait tout le SVG des scènes
          dans le bundle. Les libellés suivent l'ordre de SERVICE_TYPES, qui
          est aussi celui des scènes de la vitrine. */}
      <Hero
        data={content.hero}
        formulaLabels={SERVICE_TYPES.map((t) => content.services.offers[t].label)}
        showcase={<HeroShowcase />}
      />
      <Services data={content.services} />
      <HowItWorks data={content.method} />
      <Expertise data={content.expertise} />
      <WhyUs data={content.whyUs} />
      {/* BugTrack a sa propre page (/bugtrack) depuis le 2026-07-27, reliée
          par la tuile « BugTrack » de Réalisations juste en dessous — plus
          de section dédiée ici sur l'accueil. */}
      <Portfolio data={content.portfolio} />
      <ContactSection data={content.contact} />
      <ScrollNav />
    </main>
  );
}
