import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  duration?: number;
  className?: string;
  reverse?: boolean;
}

export function Marquee({
  children,
  duration = 30,
  className,
  reverse = false,
}: MarqueeProps) {
  return (
    <div
      className={cn("overflow-hidden", className)}
      style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
    >
      <div
        className="marquee-track"
        style={{ direction: reverse ? "rtl" : "ltr" }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
