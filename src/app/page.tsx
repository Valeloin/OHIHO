import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import HowItWorks from "@/components/HowItWorks";
import Expertise from "@/components/Expertise";
import WhyUs from "@/components/WhyUs";
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
      <Hero data={content.hero} />
      <Portfolio data={content.portfolio} />
      <Services
        data={content.services}
        quotes={content.quotes}
        devisHref={devisHref}
      />
      <HowItWorks data={content.method} />
      <Expertise data={content.expertise} />
      <WhyUs data={content.whyUs} />
      <ContactSection data={content.contact} />
      <ScrollNav />
    </main>
  );
}
