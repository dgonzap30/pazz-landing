import { Marquee } from "@/ui/Marquee";

const ITEMS = [
  "+100 Partners activos",
  "$2M+ en comisiones pagadas",
  "4.8\u2605 calificación promedio",
  "Aprobación en menos de 24 hrs",
  "Sin costos de inscripción",
];

export function SocialProofMarquee() {
  return (
    <div className="relative bg-neutral-950 border-y border-edge overflow-hidden">
      {/* Subtle brand gradient across the bar */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-500/[0.02] via-transparent to-brand-500/[0.02] pointer-events-none" />

      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />

      <Marquee duration={35} className="py-3.5 sm:py-4">
        {ITEMS.map((text) => (
          <span
            key={text}
            className="flex items-center gap-5 sm:gap-8 mx-5 sm:mx-8 whitespace-nowrap"
          >
            <span className="w-1 h-1 rounded-full bg-brand-500/60 shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-neutral-400">
              {text}
            </span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
