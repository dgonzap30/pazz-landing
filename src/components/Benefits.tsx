import { BENEFITS } from "@/lib/constants";
import { SectionHeading } from "@/ui/SectionHeading";
import { RevealOnScroll } from "@/ui/RevealOnScroll";
import { StaggerGroup, staggerItem } from "@/ui/StaggerGroup";
import { motion } from "framer-motion";

export function Benefits() {
  return (
    <section id="beneficios" className="section-divider relative py-16 sm:py-20 lg:py-32 bg-surface-dark overflow-x-clip">
      {/* Dot pattern for texture */}
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionHeading
            title="¿Por qué ser un partner?"
            subtitle="Accede a beneficios exclusivos diseñados para maximizar tus ganancias."
          />
        </RevealOnScroll>

        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <motion.div key={benefit.title} variants={staggerItem}>
                <div className="gradient-border-card group relative p-5 sm:p-6 lg:p-7 rounded-2xl h-full">
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-500/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-500/8 border border-brand-500/10 flex items-center justify-center group-hover:bg-brand-500/12 group-hover:border-brand-500/20 transition-all duration-300 mb-4 sm:mb-5">
                    <Icon className="w-5 h-5 text-brand-400 group-hover:text-brand-300 transition-colors duration-300" />
                  </div>
                  <h3 className="relative text-base font-display font-bold text-fg mb-2">
                    {benefit.title}
                  </h3>
                  <p className="relative text-sm text-neutral-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
