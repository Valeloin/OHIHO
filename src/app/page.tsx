import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Expertise from "@/components/Expertise";
import WhyUs from "@/components/WhyUs";
import BlogPreview from "@/components/BlogPreview";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <HowItWorks />
      <Expertise />
      <WhyUs />
      <BlogPreview />
      <ContactSection />
    </main>
  );
}
