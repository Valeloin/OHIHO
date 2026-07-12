import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import FormationFocus from "@/components/FormationFocus";
import WhyUs from "@/components/WhyUs";
import BlogPreview from "@/components/BlogPreview";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <HowItWorks />
      <FormationFocus />
      <WhyUs />
      <BlogPreview />
      <ContactSection />
    </main>
  );
}
