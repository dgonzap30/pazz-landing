import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/ui/Button";
import { NAV_LINKS } from "@/lib/constants";
import { useScrollSpy } from "@/hooks/useScrollSpy";

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
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-1 h-1 rounded-full bg-brand-500 transition-all duration-300" />
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

      {/* Mobile menu — always mounted, visibility toggled via CSS */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 top-16 sm:top-18 bg-neutral-950/98 backdrop-blur-2xl z-40 transition-opacity duration-300",
          mobileOpen
            ? "opacity-100"
            : "opacity-0 pointer-events-none",
        )}
      >
        <div
          className={cn(
            "px-5 sm:px-6 py-6 sm:py-8 flex flex-col gap-0.5 transition-all duration-300 delay-50",
            mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
        >
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block px-4 py-3.5 text-lg font-display font-semibold rounded-xl transition-all duration-300",
                activeId === link.href.replace("#", "")
                  ? "text-brand-400 bg-brand-600/10"
                  : "text-neutral-300 hover:text-fg hover:bg-tint",
                mobileOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4",
              )}
              style={{ transitionDelay: mobileOpen ? `${100 + i * 50}ms` : "0ms" }}
            >
              {link.label}
            </a>
          ))}
          <div
            className={cn(
              "pt-6 transition-opacity duration-300",
              mobileOpen ? "opacity-100" : "opacity-0",
            )}
            style={{ transitionDelay: mobileOpen ? "400ms" : "0ms" }}
          >
            <Button size="lg" className="w-full">
              Regístrate
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
