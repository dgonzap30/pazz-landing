import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  dark = true,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 sm:mb-12 lg:mb-16",
        align === "center" && "text-center max-w-2xl mx-auto",
        className,
      )}
    >
      {/* Accent bar */}
      {align === "center" && (
        <div className="flex justify-center mb-5 sm:mb-6">
          <div className="w-8 h-0.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-400" />
        </div>
      )}
      <h2
        className={cn(
          "font-display text-[clamp(1.75rem,4vw,3rem)] font-extrabold tracking-[-0.02em] leading-[1.1] [text-wrap:balance]",
          dark ? "text-fg" : "text-neutral-900",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 sm:mt-5 text-[0.938rem] lg:text-base leading-relaxed max-w-xl [text-wrap:pretty]",
            align === "center" && "mx-auto",
            dark ? "text-neutral-400" : "text-neutral-500",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
