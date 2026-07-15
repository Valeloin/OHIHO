import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import HowItWorks from "@/components/HowItWorks";
import Expertise from "@/components/Expertise";
import WhyUs from "@/components/WhyUs";
import ContactSection from "@/components/ContactSection";
import ScrollNav from "@/components/ScrollNav";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Portfolio />
      <HowItWorks />
      <Expertise />
      <WhyUs />
      <ContactSection />
      <ScrollNav />
    </main>
  );
}
