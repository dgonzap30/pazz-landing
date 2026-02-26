import { lazy, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SocialProofMarquee } from "@/components/SocialProofMarquee";

const HowItWorks = lazy(() =>
  import("@/components/HowItWorks").then((m) => ({ default: m.HowItWorks })),
);
const ProductShowcase = lazy(() =>
  import("@/components/ProductShowcase").then((m) => ({
    default: m.ProductShowcase,
  })),
);
const CommissionSimulator = lazy(() =>
  import("@/components/CommissionSimulator").then((m) => ({
    default: m.CommissionSimulator,
  })),
);
const Benefits = lazy(() =>
  import("@/components/Benefits").then((m) => ({ default: m.Benefits })),
);
const Testimonials = lazy(() =>
  import("@/components/Testimonials").then((m) => ({
    default: m.Testimonials,
  })),
);
const FAQ = lazy(() =>
  import("@/components/FAQ").then((m) => ({ default: m.FAQ })),
);
const CTABanner = lazy(() =>
  import("@/components/CTABanner").then((m) => ({ default: m.CTABanner })),
);
const Footer = lazy(() =>
  import("@/components/Footer").then((m) => ({ default: m.Footer })),
);

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProofMarquee />
        <Suspense fallback={null}>
          <HowItWorks />
          <ProductShowcase />
          <CommissionSimulator />
          <Benefits />
          <Testimonials />
          <FAQ />
          <CTABanner />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
