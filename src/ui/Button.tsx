import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "white" | "outline" | "outline-light";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-gradient-to-b from-brand-400 to-brand-600 text-white hover:from-brand-400 hover:to-brand-500 active:scale-[0.97] shadow-[0_1px_2px_rgba(0,0,0,0.2),0_4px_12px_rgba(231,94,41,0.2),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.2),0_8px_24px_rgba(231,94,41,0.25),inset_0_1px_0_rgba(255,255,255,0.15)]",
  ghost:
    "text-neutral-300 hover:text-fg hover:bg-tint active:bg-tint",
  white:
    "bg-white text-[#111113] hover:bg-[#F7F5F2] active:scale-[0.97] shadow-[0_1px_3px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.06)]",
  outline:
    "border border-neutral-700 text-neutral-300 hover:border-neutral-500 hover:text-fg hover:bg-white/[0.02]",
  "outline-light":
    "border border-neutral-300 text-neutral-700 hover:border-neutral-500 hover:bg-neutral-100 active:bg-neutral-200",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 cursor-pointer select-none",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
