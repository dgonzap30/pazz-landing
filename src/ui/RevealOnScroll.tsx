import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/cn";

interface RevealOnScrollProps {
  children: ReactNode;
  direction?: "up" | "left" | "right" | "fade" | "blur";
  delay?: number;
  className?: string;
}

const variants = {
  up: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)", scale: 0.97 },
    visible: { opacity: 1, filter: "blur(0px)", scale: 1 },
  },
};

export function RevealOnScroll({
  children,
  direction = "up",
  delay = 0,
  className,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const v = variants[direction];

  return (
    <motion.div
      ref={ref}
      initial={v.hidden}
      animate={isInView ? v.visible : v.hidden}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        delay,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
