import { useState, useEffect, useRef, useCallback, useLayoutEffect } from "react";
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

  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const dotRef = useRef<HTMLSpanElement>(null);
  const [indicator, setIndicator] = useState<{ left: number } | null>(null);
  const prevIndicator = useRef<{ left: number; idx: number } | null>(null);

  const measureIndicator = useCallback(() => {
    if (!activeId || !navRef.current) {
      setIndicator(null);
      return;
    }
    const linkEl = linkRefs.current.get(activeId);
    if (!linkEl) return;
    const navRect = navRef.current.getBoundingClientRect();
    const linkRect = linkEl.getBoundingClientRect();
    setIndicator({ left: linkRect.left - navRect.left + linkRect.width / 2 });
  }, [activeId]);

  useEffect(measureIndicator, [measureIndicator]);

  useEffect(() => {
    window.addEventListener("resize", measureIndicator);
    return () => window.removeEventListener("resize", measureIndicator);
  }, [measureIndicator]);

  // Hop the dot through each intermediate link with parabolic arcs
  const runningAnim = useRef<Animation | null>(null);

  useLayoutEffect(() => {
    const dot = dotRef.current;
    const nav = navRef.current;

    if (!indicator || !dot || !nav) {
      prevIndicator.current = null;
      return;
    }

    const currIdx = sectionIds.indexOf(activeId);
    const prev = prevIndicator.current;
    prevIndicator.current = { left: indicator.left, idx: currIdx };

    if (!prev || prev.idx === currIdx || currIdx === -1) return;

    const navRect = nav.getBoundingClientRect();
    const centers = sectionIds.map((id) => {
      const el = linkRefs.current.get(id);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return r.left - navRect.left + r.width / 2;
    });

    const dir = prev.idx < currIdx ? 1 : -1;
    const stops: number[] = [];
    for (let i = prev.idx; ; i += dir) {
      const c = centers[i];
      if (c === null) return;
      stops.push(c);
      if (i === currIdx) break;
    }

    const numHops = stops.length - 1;
    if (numHops < 1) return;

    // All movement via transform only (GPU composited, no layout thrashing).
    // Positions are relative to indicator.left (the final resting X).
    const finalX = stops[numHops];
    const stepsPerHop = 12;
    const totalSteps = numHops * stepsPerHop;
    const peakH = 8;
    const keyframes: Keyframe[] = [];

    for (let h = 0; h < numHops; h++) {
      const fromX = stops[h];
      const toX = stops[h + 1];
      const hopH = peakH * Math.pow(0.8, h); // decreasing energy each bounce
      const last = h === numHops - 1;

      for (let s = 0; s <= (last ? stepsPerHop : stepsPerHop - 1); s++) {
        const t = s / stepsPerHop;
        const x = fromX + (toX - fromX) * t - finalX;
        const y = -4 * hopH * t * (1 - t); // parabolic arc
        const isEnd = last && s === stepsPerHop;

        keyframes.push({
          transform: isEnd
            ? "translateX(-50%)"
            : `translateX(calc(-50% + ${x.toFixed(1)}px)) translateY(${y.toFixed(1)}px)`,
          offset: (h * stepsPerHop + s) / totalSteps,
        });
      }
    }

    runningAnim.current?.cancel();
    runningAnim.current = dot.animate(keyframes, {
      duration: Math.min(numHops * 180, 700),
      easing: "linear",
      fill: "none",
    });
  }, [indicator, activeId]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        ticking = false;
      });
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
        "fixed top-0 inset-x-0 z-50 transition-[background-color,border-color,box-shadow] duration-500",
        scrolled
          ? "bg-neutral-950/95 lg:bg-neutral-950/70 lg:backdrop-blur-2xl border-b border-edge shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
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
        <div ref={navRef} className="hidden lg:flex items-center gap-0.5 relative">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                ref={(el) => {
                  if (el) linkRefs.current.set(id, el);
                }}
                className={cn(
                  "relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                  activeId === id
                    ? "text-fg"
                    : "text-neutral-400 hover:text-fg",
                )}
              >
                {link.label}
              </a>
            );
          })}

          {/* Hopping dot */}
          <span
            ref={dotRef}
            className={cn(
              "nav-dot absolute -bottom-1 transition-[opacity,scale] duration-300",
              indicator ? "opacity-100 scale-100" : "opacity-0 scale-0",
            )}
            style={{
              left: indicator ? indicator.left : 0,
              transform: "translateX(-50%)",
            }}
          />
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
          "lg:hidden fixed inset-0 top-16 sm:top-18 bg-neutral-950/[0.98] z-40 transition-opacity duration-300",
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
