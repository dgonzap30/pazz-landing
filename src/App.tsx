import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SocialProofMarquee } from "@/components/SocialProofMarquee";
import { HowItWorks } from "@/components/HowItWorks";
import { ProductShowcase } from "@/components/ProductShowcase";
import { CommissionSimulator } from "@/components/CommissionSimulator";
import { Benefits } from "@/components/Benefits";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { CTABanner } from "@/components/CTABanner";
import { Footer } from "@/components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProofMarquee />
        <HowItWorks />
        <ProductShowcase />
        <CommissionSimulator />
        <Benefits />
        <Testimonials />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
