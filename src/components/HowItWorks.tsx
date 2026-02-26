import { HOW_IT_WORKS } from "@/lib/constants";
import { SectionHeading } from "@/ui/SectionHeading";
import { RevealOnScroll } from "@/ui/RevealOnScroll";
import { StaggerGroup, staggerItem } from "@/ui/StaggerGroup";
import { motion } from "framer-motion";

export function HowItWorks() {
  return (
    <section id="como-funciona" className="section-divider relative py-16 sm:py-20 lg:py-32 bg-surface-dark overflow-x-clip">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-brand-500/[0.02] blur-[160px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionHeading
            title="Empieza a ganar en 4 pasos"
            subtitle="Un proceso simple y rápido. Regístrate hoy y podrías recibir tu primera comisión este mes."
          />
        </RevealOnScroll>

        <div className="relative">
          {/* Connector line — gradient with glow */}
          <div className="hidden lg:block absolute top-[3.5rem] left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-px overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-brand-500/30 via-brand-400/50 to-brand-500/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-500/10 via-brand-400/20 to-brand-500/10 blur-sm" />
          </div>

          <StaggerGroup stagger={0.12} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5">
            {HOW_IT_WORKS.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.number} variants={staggerItem}>
                  <div className="gradient-border-card group relative p-7 lg:p-9 rounded-2xl h-full">
                    {/* Step number watermark */}
                    <span className="absolute top-3 right-4 text-[5rem] font-display font-black text-neutral-700/20 leading-none select-none pointer-events-none">
                      {step.number}
                    </span>

                    <div className="relative z-10 w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/15 flex items-center justify-center mb-6 group-hover:bg-brand-500/15 group-hover:border-brand-500/25 transition-all duration-300">
                      <Icon className="w-5 h-5 text-brand-400" />
                    </div>

                    <h3 className="relative text-lg font-display font-bold text-fg mb-2">
                      {step.title}
                    </h3>
                    <p className="relative text-sm text-neutral-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
