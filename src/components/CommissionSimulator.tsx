import { useState, useMemo } from "react";
import { calculateCommission, formatCurrency, LEVELS } from "@/lib/commission";
import { SectionHeading } from "@/ui/SectionHeading";
import { RevealOnScroll } from "@/ui/RevealOnScroll";
import { Button } from "@/ui/Button";
import { Trophy, ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

const ACCUMULATED_MIN = 0;
const ACCUMULATED_MAX = 15_000_000;
const CURRENT_MIN = 0;
const CURRENT_MAX = 5_000_000;
const STEP = 100_000;

// Level boundary positions as percentages
const SILVER_POS = (3_000_000 / ACCUMULATED_MAX) * 100; // 20%
const GOLD_POS = (9_000_000 / ACCUMULATED_MAX) * 100; // 60%

export function CommissionSimulator() {
  const [accumulated, setAccumulated] = useState(5_000_000);
  const [currentMonth, setCurrentMonth] = useState(1_500_000);

  const { level, commission } = useMemo(
    () => calculateCommission(accumulated, currentMonth),
    [accumulated, currentMonth],
  );

  const accumulatedPercent =
    ((accumulated - ACCUMULATED_MIN) / (ACCUMULATED_MAX - ACCUMULATED_MIN)) *
    100;
  const currentPercent =
    ((currentMonth - CURRENT_MIN) / (CURRENT_MAX - CURRENT_MIN)) * 100;

  return (
    <section
      id="simulador"
      className="section-divider relative py-16 sm:py-20 lg:py-32 bg-surface-dark overflow-x-clip"
    >
      {/* Ambient glow behind simulator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-brand-500/[0.03] blur-[200px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionHeading
            title="¿Cuánto podrías ganar?"
            subtitle="Mueve los controles y descubre tu comisión mensual estimada."
          />
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6 items-stretch">
              {/* Sliders panel */}
              <div className="lg:col-span-3 space-y-6 sm:space-y-8 p-5 sm:p-6 lg:p-8 rounded-2xl glass-card">
                {/* Level progress bar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Tu nivel actual
                    </span>
                    <span className="text-xs font-bold text-brand-400 transition-all duration-200">
                      {level.name} · {(level.rate * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="relative h-2.5 rounded-full bg-neutral-800 overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{ width: `${accumulatedPercent}%` }}
                    />
                    {/* Shimmer on the fill */}
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{ width: `${accumulatedPercent}%` }}
                    />
                    {/* Level boundary markers */}
                    <div
                      className="absolute inset-y-0 w-0.5 bg-neutral-600/60"
                      style={{ left: `${SILVER_POS}%` }}
                    />
                    <div
                      className="absolute inset-y-0 w-0.5 bg-neutral-600/60"
                      style={{ left: `${GOLD_POS}%` }}
                    />
                  </div>
                  <div className="relative mt-1.5 text-[10px] text-neutral-600 h-4">
                    <span className="absolute left-0">Bronce</span>
                    <span
                      className="absolute -translate-x-1/2"
                      style={{ left: `${SILVER_POS}%` }}
                    >
                      Plata
                    </span>
                    <span
                      className="absolute -translate-x-1/2"
                      style={{ left: `${GOLD_POS}%` }}
                    >
                      Oro
                    </span>
                  </div>
                </div>

                {/* Accumulated slider */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-1">
                    <label className="text-xs sm:text-sm font-medium text-neutral-300">
                      Monto arrendado acumulado{" "}
                      <span className="text-neutral-500">(últimos 3 meses)</span>
                    </label>
                    <span className="text-sm font-bold text-brand-400 tabular-nums font-display">
                      {formatCurrency(accumulated)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={ACCUMULATED_MIN}
                    max={ACCUMULATED_MAX}
                    step={STEP}
                    value={accumulated}
                    onChange={(e) => setAccumulated(Number(e.target.value))}
                    className="w-full"
                    style={{
                      background: `linear-gradient(to right, var(--color-brand-500) ${accumulatedPercent}%, var(--color-neutral-700) ${accumulatedPercent}%)`,
                    }}
                  />
                  <div className="flex justify-between mt-2 text-xs text-neutral-600">
                    <span>{formatCurrency(ACCUMULATED_MIN)}</span>
                    <span>{formatCurrency(ACCUMULATED_MAX)}</span>
                  </div>
                </div>

                {/* Current month slider */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-1">
                    <label className="text-xs sm:text-sm font-medium text-neutral-300">
                      Monto arrendado en el mes en curso
                    </label>
                    <span className="text-sm font-bold text-brand-400 tabular-nums font-display">
                      {formatCurrency(currentMonth)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={CURRENT_MIN}
                    max={CURRENT_MAX}
                    step={STEP}
                    value={currentMonth}
                    onChange={(e) => setCurrentMonth(Number(e.target.value))}
                    className="w-full"
                    style={{
                      background: `linear-gradient(to right, var(--color-brand-500) ${currentPercent}%, var(--color-neutral-700) ${currentPercent}%)`,
                    }}
                  />
                  <div className="flex justify-between mt-2 text-xs text-neutral-600">
                    <span>{formatCurrency(CURRENT_MIN)}</span>
                    <span>{formatCurrency(CURRENT_MAX)}</span>
                  </div>
                </div>

                {/* Level indicators */}
                <div className="flex gap-1.5 sm:gap-2 pt-2">
                  {LEVELS.map((l) => (
                    <div
                      key={l.name}
                      className={cn(
                        "flex-1 py-2 sm:py-2.5 px-2 sm:px-3 rounded-lg text-center text-[0.625rem] sm:text-xs font-semibold transition-all duration-300 border",
                        level.name === l.name
                          ? "bg-brand-600/15 border-brand-600/30 text-brand-400 shadow-[0_0_16px_rgba(231,94,41,0.08)]"
                          : "bg-tint border-edge text-neutral-500",
                      )}
                    >
                      {l.name} · {(l.rate * 100).toFixed(1)}%
                    </div>
                  ))}
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  *La comisión mensual se determina por tu nivel, el cual se
                  calcula con base en el monto arrendado acumulado en los
                  últimos 3 meses.
                </p>
              </div>

              {/* Result card */}
              <div className="lg:col-span-2 relative rounded-2xl overflow-hidden">
                {/* Gradient border glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-500/20 via-brand-500/5 to-brand-600/20 pointer-events-none" />

                <div className="relative bg-surface-card rounded-2xl text-fg p-5 sm:p-6 lg:p-8 flex flex-col items-center text-center justify-center h-full m-[1px]">
                  {/* Subtle radial glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(231,94,41,0.04)_0%,_transparent_60%)] pointer-events-none rounded-2xl" />

                  <div
                    className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-all duration-400"
                    style={{ backgroundColor: level.color + "18" }}
                  >
                    <Trophy
                      className="w-8 h-8 transition-colors duration-300"
                      style={{ color: level.color }}
                    />
                  </div>

                  <span className="relative text-xs text-neutral-500 uppercase tracking-wider font-semibold mb-1">
                    Nivel
                  </span>
                  <span className="relative text-2xl font-display font-bold mb-1 transition-all duration-200">
                    {level.name}
                  </span>
                  <span className="relative text-sm text-neutral-500 mb-5 sm:mb-8">
                    {(level.rate * 100).toFixed(1)}% de comisión
                  </span>

                  <div className="relative w-full h-px bg-gradient-to-r from-transparent via-neutral-400/20 to-transparent mb-5 sm:mb-8" />

                  <span className="relative text-xs text-neutral-500 uppercase tracking-wider font-semibold mb-3">
                    Comisión del mes en curso
                  </span>
                  <span className="relative text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold gradient-text tabular-nums tracking-tight transition-all duration-300">
                    {formatCurrency(commission)}
                  </span>

                  <Button variant="primary" size="lg" className="relative w-full mt-6 sm:mt-8 lg:mt-10 group">
                    Regístrate como partner
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
