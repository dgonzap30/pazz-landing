import { FOOTER } from "@/lib/constants";
import { Mail, Phone } from "lucide-react";

function SocialIcon({ type }: { type: string }) {
  const paths: Record<string, string> = {
    facebook:
      "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
    instagram:
      "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z",
    tiktok:
      "M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z",
    linkedin:
      "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  };

  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[type] || ""} />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-neutral-950 border-t border-edge overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <picture>
              <source srcSet="/logos/pazz-partner-plus-white.svg" media="(prefers-color-scheme: dark)" />
              <img
                src="/logos/pazz-partner-plus-black.svg"
                alt="PAZZ Partner+"
                className="h-8 sm:h-9 mb-4 sm:mb-5"
              />
            </picture>
            <p className="text-sm leading-relaxed text-neutral-500 max-w-xs">
              {FOOTER.tagline}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-5">
              Enlaces
            </h4>
            <ul className="space-y-3">
              {FOOTER.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-neutral-500 hover:text-fg transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-5">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${FOOTER.contact.email}`}
                  className="flex items-center gap-2.5 text-sm text-neutral-500 hover:text-fg transition-colors duration-200"
                >
                  <Mail className="w-4 h-4 shrink-0 text-neutral-600" />
                  {FOOTER.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${FOOTER.contact.phone}`}
                  className="flex items-center gap-2.5 text-sm text-neutral-500 hover:text-fg transition-colors duration-200"
                >
                  <Phone className="w-4 h-4 shrink-0 text-neutral-600" />
                  {FOOTER.contact.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-5">
              Legal
            </h4>
            <ul className="space-y-3">
              {FOOTER.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-neutral-500 hover:text-fg transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-edge flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-600">
            &copy; {new Date().getFullYear()} Pazz Leasing. Todos los derechos
            reservados.
          </p>
          <div className="flex items-center gap-5">
            {Object.entries(FOOTER.social).map(([type, url]) => (
              <a
                key={type}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-brand-400 transition-colors duration-200"
                aria-label={type}
              >
                <SocialIcon type={type} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
