import { RevealOnScroll } from "@/ui/RevealOnScroll";
import { SectionHeading } from "@/ui/SectionHeading";
import { Star } from "lucide-react";
import { StaggerGroup, StaggerItem } from "@/ui/StaggerGroup";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  avatar: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Partner Plus transformó mi red de contactos en una fuente de ingreso constante. En 3 meses llegué a nivel Oro y las comisiones superaron mis expectativas.",
    name: "Roberto S.",
    role: "Director de Agencia Automotriz",
    initials: "RS",
    avatar: "/images/avatar-roberto.jpg",
  },
  {
    quote:
      "Lo mejor es que mis clientes reciben un servicio de arrendamiento excelente y yo gano comisiones recurrentes sin esfuerzo adicional. Es ganar-ganar.",
    name: "Mariana T.",
    role: "Asesora Financiera Independiente",
    initials: "MT",
    avatar: "/images/avatar-mariana.jpg",
  },
  {
    quote:
      "La plataforma es transparente, los pagos llegan puntualmente cada mes y el soporte es de primera. No he encontrado nada igual en el mercado.",
    name: "Carlos M.",
    role: "Broker de Seguros Vehiculares",
    initials: "CM",
    avatar: "/images/avatar-carlos.jpg",
  },
];

export function Testimonials() {
  return (
    <section className="section-divider relative py-16 sm:py-20 lg:py-32 bg-neutral-950 overflow-x-clip">
      {/* Subtle depth gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-dark via-neutral-950 to-surface-dark pointer-events-none" />
      {/* Ambient glow */}
      <div className="absolute top-0 right-[20%] w-[600px] h-[400px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(255,110,30,0.02)_0%,_transparent_70%)] lg:bg-brand-500/[0.02] lg:blur-[180px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionHeading
            title="Lo que dicen nuestros partners"
            subtitle="Historias reales de profesionales que ya están generando ingresos con Partner Plus."
          />
        </RevealOnScroll>

        <StaggerGroup stagger={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5">
          {TESTIMONIALS.map((t, i) => (
            <StaggerItem key={t.name} index={i}>
              <div className="glass-card group relative p-5 sm:p-6 lg:p-8 rounded-2xl h-full flex flex-col">
                {/* Large quote mark */}
                <span
                  className="absolute top-4 right-5 text-[5rem] font-display font-black leading-none text-brand-500/[0.06] select-none pointer-events-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>

                {/* Stars */}
                <div className="flex gap-0.5 mb-3 sm:mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-3.5 h-3.5 fill-gold-500 text-gold-500"
                    />
                  ))}
                </div>

                {/* Quote text */}
                <blockquote className="relative text-sm sm:text-[0.938rem] text-neutral-300 leading-relaxed mb-5 sm:mb-8 flex-1 [text-wrap:pretty]">
                  {t.quote}
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 sm:pt-6 border-t border-edge">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center ring-2 ring-brand-500/20 shrink-0">
                    <span className="text-sm sm:text-base font-bold text-white select-none">{t.initials}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-fg">
                      {t.name}
                    </p>
                    <p className="text-xs text-neutral-500">{t.role}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
