import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/ui/Button";
import { NAV_LINKS } from "@/lib/constants";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { AnimatePresence, motion } from "framer-motion";

const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useScrollSpy(sectionIds);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-neutral-950/70 backdrop-blur-2xl border-b border-edge shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="shrink-0 relative z-10">
          <picture>
            <source srcSet="/logos/pazz-partner-plus-white.svg" media="(prefers-color-scheme: dark)" />
            <img
              src="/logos/pazz-partner-plus-black.svg"
              alt="PAZZ Partner+"
              className="h-8 sm:h-9 lg:h-10"
            />
          </picture>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                activeId === link.href.replace("#", "")
                  ? "text-fg"
                  : "text-neutral-400 hover:text-fg",
              )}
            >
              {link.label}
              {activeId === link.href.replace("#", "") && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-1 h-1 rounded-full bg-brand-500"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button size="sm" className="hidden lg:inline-flex">
            Regístrate
          </Button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-tint transition-colors cursor-pointer"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-neutral-300" />
            ) : (
              <Menu className="w-5 h-5 text-neutral-300" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu — full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 top-16 sm:top-18 bg-neutral-950/98 backdrop-blur-2xl z-40"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="px-5 sm:px-6 py-6 sm:py-8 flex flex-col gap-0.5"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className={cn(
                    "block px-4 py-3.5 text-lg font-display font-semibold rounded-xl transition-colors",
                    activeId === link.href.replace("#", "")
                      ? "text-brand-400 bg-brand-600/10"
                      : "text-neutral-300 hover:text-fg hover:bg-tint",
                  )}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="pt-6"
              >
                <Button size="lg" className="w-full">
                  Regístrate
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
