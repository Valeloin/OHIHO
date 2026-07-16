import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import HowItWorks from "@/components/HowItWorks";
import Expertise from "@/components/Expertise";
import WhyUs from "@/components/WhyUs";
import ContactSection from "@/components/ContactSection";
import ScrollNav from "@/components/ScrollNav";
import { getContent } from "@/lib/content";

export default async function Home() {
  const content = await getContent();
  return (
    <main>
      <Hero data={content.hero} />
      <Portfolio />
      <Services />
      <HowItWorks />
      <Expertise />
      <WhyUs />
      <ContactSection />
      <ScrollNav />
    </main>
  );
}
