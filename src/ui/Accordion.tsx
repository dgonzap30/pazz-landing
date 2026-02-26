import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

interface AccordionProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  dark?: boolean;
}

export function Accordion({
  question,
  answer,
  isOpen,
  onToggle,
  dark = false,
}: AccordionProps) {
  return (
    <div
      className={cn(
        "border-b",
        dark ? "border-edge" : "border-neutral-200",
      )}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 sm:py-6 text-left cursor-pointer group"
      >
        <span
          className={cn(
            "text-sm sm:text-base font-medium pr-4 sm:pr-6 transition-colors",
            dark
              ? "text-neutral-200 group-hover:text-brand-400"
              : "text-neutral-900 group-hover:text-brand-600",
          )}
        >
          {question}
        </span>
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300",
            isOpen
              ? "bg-brand-600/15 rotate-180"
              : dark
                ? "bg-tint"
                : "bg-neutral-100",
          )}
        >
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-colors",
              isOpen
                ? "text-brand-500"
                : dark
                  ? "text-neutral-500"
                  : "text-neutral-400",
            )}
          />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p
              className={cn(
                "pb-4 sm:pb-6 leading-relaxed text-sm sm:text-[0.938rem]",
                dark ? "text-neutral-400" : "text-neutral-500",
              )}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
