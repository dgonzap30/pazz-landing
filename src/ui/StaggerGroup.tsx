import { type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface StaggerGroupProps {
  children: ReactNode;
  stagger?: number;
  className?: string;
}

export function StaggerGroup({
  children,
  stagger = 0.08,
  className,
}: StaggerGroupProps) {
  const { ref, isInView } = useIntersectionObserver({ once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{ "--stagger": `${stagger}s` } as React.CSSProperties}
      data-in-view={isInView ? "" : undefined}
    >
      {children}
    </div>
  );
}

export function StaggerItem({
  children,
  index,
  className,
}: {
  children: ReactNode;
  index: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "translate-y-4 opacity-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "[[data-in-view]>&]:translate-y-0 [[data-in-view]>&]:opacity-100",
        className,
      )}
      style={{
        transitionDelay: `calc(0.1s + ${index} * var(--stagger, 0.08s))`,
      }}
    >
      {children}
    </div>
  );
}
