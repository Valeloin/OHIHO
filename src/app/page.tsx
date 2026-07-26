import Hero from "@/components/Hero";
import HeroShowcase from "@/components/motion/HeroShowcase";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import HowItWorks from "@/components/HowItWorks";
import Expertise from "@/components/Expertise";
import WhyUs from "@/components/WhyUs";
import BugTrack from "@/components/BugTrack";
import ContactSection from "@/components/ContactSection";
import ScrollNav from "@/components/ScrollNav";
import { getContent } from "@/lib/content";

const SERVICE_TYPES = ["landing", "intermediaire", "refonte", "application"] as const;

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
      {/* Prolonge « Pourquoi OHIHO » : la promesse d'accompagnement, montrée
          concrètement par l'outil livré avec chaque site.
          Il y avait ici deux sections, « Suivi » puis « BugTrack », qui
          décrivaient le même mécanisme de tickets — l'une sans nommer
          l'outil, l'autre sans dire qu'il est livré avec le site. Elles ont
          été fusionnées dans BugTrack, et Suivi.tsx supprimé. */}
      <BugTrack />
      <Portfolio data={content.portfolio} />
      <ContactSection data={content.contact} />
      <ScrollNav />
    </main>
  );
}
