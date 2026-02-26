import { Button } from "@/ui/Button";
import { RevealOnScroll } from "@/ui/RevealOnScroll";
import { ArrowRight, ShieldCheck, Clock, Ban } from "lucide-react";

const GUARANTEES = [
  { icon: Ban, text: "Sin costos de inscripción" },
  { icon: ShieldCheck, text: "Sin contratos de permanencia" },
  { icon: Clock, text: "Regístrate en 5 minutos" },
];

export function CTABanner() {
  return (
    <section className="relative overflow-x-clip py-16 sm:py-20 lg:py-32">
      {/* Textured background — golden mesh beneath brand gradient */}
      <img
        src="/images/cta-texture.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-overlay"
      />
      {/* Brand gradient overlay — richer, more dramatic */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-600/90 via-brand-600/85 to-brand-800/95" />

      {/* Noise texture for depth */}
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      {/* Radial highlight from center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.08)_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-6 lg:px-8 text-center">
        <RevealOnScroll direction="blur">
          <h2 className="font-display text-[clamp(1.75rem,4.5vw,3.5rem)] font-extrabold text-white tracking-[-0.02em] leading-tight [text-wrap:balance]">
            Tu primera comisión{" "}
            <span className="text-white/70">
              podría llegar este mes
            </span>
          </h2>

          <p className="mt-4 sm:mt-5 text-[0.938rem] sm:text-lg text-white/50 leading-relaxed max-w-xl mx-auto [text-wrap:pretty]">
            Únete a +100 partners que ya están generando ingresos recurrentes
            con Pazz. Regístrate en minutos y comienza a referir hoy.
          </p>

          <div className="mt-7 sm:mt-10">
            <Button variant="white" size="lg" className="group shadow-[0_4px_24px_rgba(0,0,0,0.15)]">
              Regístrate ahora
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </div>

          {/* Guarantee badges */}
          <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-2.5 sm:gap-y-3">
            {GUARANTEES.map((g) => {
              const Icon = g.icon;
              return (
                <span
                  key={g.text}
                  className="flex items-center gap-2 text-xs sm:text-sm text-white/60 font-medium"
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  {g.text}
                </span>
              );
            })}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
