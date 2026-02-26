import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/constants";
import { RevealOnScroll } from "@/ui/RevealOnScroll";
import { Accordion } from "@/ui/Accordion";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="preguntas" className="section-divider relative py-16 sm:py-20 lg:py-32 bg-surface-dark">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-16">
          {/* Left column — heading */}
          <RevealOnScroll className="lg:col-span-2">
            <div className="lg:sticky lg:top-28">
              <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-tight leading-[1.1] text-fg">
                Preguntas
                <br />
                frecuentes
              </h2>
              <p className="mt-3 sm:mt-5 text-sm sm:text-base text-neutral-400 leading-relaxed [text-wrap:pretty]">
                Todo lo que necesitas saber sobre el programa Partner+. ¿No encuentras respuesta?{" "}
                <a
                  href="mailto:info@partnerplus.mx"
                  className="text-brand-400 hover:text-brand-300 font-medium underline underline-offset-4 decoration-brand-600/40 hover:decoration-brand-400 transition-colors"
                >
                  Contáctanos
                </a>
              </p>
            </div>
          </RevealOnScroll>

          {/* Right column — accordions */}
          <RevealOnScroll delay={0.15} className="lg:col-span-3">
            <div className="border-t border-edge">
              {FAQ_ITEMS.map((item, i) => (
                <Accordion
                  key={i}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openIndex === i}
                  onToggle={() =>
                    setOpenIndex(openIndex === i ? null : i)
                  }
                  dark
                />
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
