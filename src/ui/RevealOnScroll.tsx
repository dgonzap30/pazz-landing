import { type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface RevealOnScrollProps {
  children: ReactNode;
  direction?: "up" | "left" | "right" | "fade" | "blur";
  delay?: number;
  className?: string;
}

const hiddenStyles: Record<string, string> = {
  up: "translate-y-6 opacity-0",
  left: "-translate-x-6 opacity-0",
  right: "translate-x-6 opacity-0",
  fade: "opacity-0",
  blur: "opacity-0 blur-[10px] scale-[0.97]",
};

export function RevealOnScroll({
  children,
  direction = "up",
  delay = 0,
  className,
}: RevealOnScrollProps) {
  const { ref, isInView } = useIntersectionObserver({ once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform,filter] duration-800 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isInView
          ? "translate-y-0 translate-x-0 opacity-100 blur-0 scale-100"
          : hiddenStyles[direction],
        className,
      )}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
