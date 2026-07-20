import Hero from "@/components/Hero";
import HeroShowcase from "@/components/motion/HeroShowcase";
import { formulasFrom } from "@/lib/quotes";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import HowItWorks from "@/components/HowItWorks";
import Expertise from "@/components/Expertise";
import WhyUs from "@/components/WhyUs";
import Suivi from "@/components/Suivi";
import ContactSection from "@/components/ContactSection";
import ScrollNav from "@/components/ScrollNav";
import { getContent } from "@/lib/content";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default async function Home() {
  const content = await getContent();

  // Les cartes de services mènent au devis si le visiteur est connecté,
  // sinon à l'inscription.
  let loggedIn = false;
  if (isSupabaseConfigured()) {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    loggedIn = !!user;
  }
  const devisHref = loggedIn ? "/portail/devis/nouveau" : "/inscription";
  return (
    <main>
      {/* La vitrine est passée en prop (et non importée par Hero) : Hero est
          un composant client, un import y embarquerait tout le SVG des scènes
          dans le bundle. Les libellés suivent l'ordre de PROJECT_TYPES, qui
          est aussi celui des scènes de la vitrine. */}
      <Hero
        data={content.hero}
        formulaLabels={formulasFrom(content.quotes).map((f) => f.label)}
        showcase={<HeroShowcase />}
      />
      <Services
        data={content.services}
        quotes={content.quotes}
        devisHref={devisHref}
      />
      <HowItWorks data={content.method} />
      <Expertise data={content.expertise} />
      <WhyUs data={content.whyUs} />
      {/* Prolonge « Pourquoi OHIHO » : la promesse d'accompagnement, montrée
          concrètement par l'espace de suivi livré avec chaque site. */}
      <Suivi />
      <Portfolio data={content.portfolio} />
      <ContactSection data={content.contact} />
      <ScrollNav />
    </main>
  );
}
