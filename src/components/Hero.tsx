import { HERO } from "@/lib/constants";
import { Button } from "@/ui/Button";
import { AnimatedCounter } from "@/ui/AnimatedCounter";
import { RevealOnScroll } from "@/ui/RevealOnScroll";
import { ArrowRight, TrendingUp, Users, Star } from "lucide-react";

const STAT_ICONS = [Users, TrendingUp, Star];

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex flex-col justify-center overflow-x-clip bg-surface-dark"
    >
      {/* ─── Atmospheric background layers ─── */}

      {/* Primary brand glow — top-left warm light source */}
      <div className="absolute top-[5%] left-[10%] w-[500px] h-[400px] lg:w-[900px] lg:h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(255,110,30,0.09)_0%,_transparent_70%)] lg:bg-brand-500/[0.06] lg:blur-[200px] pointer-events-none opacity-50" />

      {/* Secondary glow — subtle warm right-side fill */}
      <div className="absolute bottom-[20%] right-[5%] w-[600px] h-[400px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(231,94,41,0.03)_0%,_transparent_70%)] lg:bg-brand-600/[0.03] lg:blur-[180px] pointer-events-none" />

      {/* Dot pattern for depth */}
      <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />

      {/* Mobile car backdrop — subtle full-width depth layer */}
      <div
        className="lg:hidden absolute inset-0 pointer-events-none"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 15%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.5) 75%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 15%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.5) 75%, transparent 100%)",
        }}
      >
        <img
          src="/images/hero-car-alt.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-[center_55%] opacity-[0.13]"
        />
        <div className="absolute inset-0 bg-brand-900/15 mix-blend-multiply" />
      </div>

      {/* Desktop car reveal — right side, fades into background */}
      <div
        className="hidden lg:block absolute inset-y-0 right-0 w-[55%] pointer-events-none"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 40%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 40%)",
        }}
      >
        <img
          src="/images/hero-car-alt.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-[0.28]"
          fetchPriority="high"
        />
        {/* Warm tint overlay */}
        <div className="absolute inset-0 bg-brand-900/10 mix-blend-multiply" />
        {/* Gentle vignette edges */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-surface-dark/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-surface-dark/50 to-transparent" />
      </div>

      {/* Noise overlay for texture */}
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 w-full pt-20 pb-10 sm:pt-24 sm:pb-14 lg:pt-32 lg:pb-20">
        <div className="max-w-4xl">
          {/* Decorative accent */}
          <RevealOnScroll delay={0}>
            <div className="flex items-center gap-2 mb-4 lg:mb-5">
              <div className="w-8 h-[3px] rounded-full bg-gradient-to-r from-brand-500 to-brand-400" />
              <div className="w-2 h-[3px] rounded-full bg-brand-500/40" />
            </div>
          </RevealOnScroll>

          {/* Headline */}
          <RevealOnScroll delay={0.05} direction="blur">
            <h1 className="font-display text-[clamp(2.25rem,5.5vw,5.25rem)] font-extrabold tracking-[-0.03em] leading-[1.06] text-fg [text-wrap:balance]">
              Convierte tu red de contactos
              <br />
              en{" "}
              <span className="gradient-text">
                {HERO.titleHighlight}
              </span>
            </h1>
          </RevealOnScroll>

          {/* Subtitle */}
          <RevealOnScroll delay={0.15}>
            <p className="mt-3 sm:mt-4 lg:mt-5 text-[0.938rem] sm:text-base lg:text-lg text-neutral-400 leading-relaxed max-w-2xl [text-wrap:pretty]">
              Únete al programa que ya ha pagado{" "}
              <span className="text-fg font-medium">
                más de $2M en comisiones
              </span>
              . Refiere clientes a Pazz, el marketplace líder en arrendamiento
              automotriz, y gana hasta{" "}
              <span className="text-brand-400 font-semibold">2%</span> por cada
              contrato cerrado.
            </p>
          </RevealOnScroll>

          {/* CTAs */}
          <RevealOnScroll delay={0.25}>
            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button size="lg" className="group">
                {HERO.primaryCta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
              <a href="#simulador">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  {HERO.secondaryCta}
                </Button>
              </a>
            </div>
          </RevealOnScroll>
        </div>

        {/* Stats */}
        <RevealOnScroll delay={0.35} className="mt-8 sm:mt-12 lg:mt-16">
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {HERO.stats.map((stat, i) => {
              const Icon = STAT_ICONS[i];
              return (
                <div
                  key={stat.label}
                  className="group rounded-xl sm:rounded-2xl p-2.5 sm:p-5 lg:p-6 glass-card overflow-hidden"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5 sm:gap-3">
                      <div className="flex w-5 h-5 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-md sm:rounded-lg bg-brand-500/10 items-center justify-center shrink-0">
                        <Icon className="w-2.5 h-2.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-brand-500" />
                      </div>
                      <span className="text-xl sm:text-2xl lg:text-4xl font-display font-bold text-fg tabular-nums truncate">
                        <AnimatedCounter
                          target={stat.value}
                          prefix={stat.prefix}
                          suffix={stat.suffix}
                          decimals={stat.decimals}
                        />
                      </span>
                    </div>
                    <span className="text-[0.625rem] sm:text-xs text-neutral-500 uppercase tracking-wider font-medium mt-1.5 sm:mt-2">
                      {stat.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </RevealOnScroll>
      </div>

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none z-10" />
    </section>
  );
}
