import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { logoUrl } from "@/lib/assets";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { email, location, phoneDisplay, phoneHref, whatsappHref } from "@/lib/contact";

const nav = [
  { to: "/", label: "Home" },
  { to: "/it-hub", label: "IT Hub" },
  { to: "/infra", label: "Infra" },
  { to: "/about", label: "About" },
  { to: "/team", label: "Team" },
  { to: "/careers", label: "Careers" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src={logoUrl}
            alt="VGM Group logo"
            className="h-14 w-14 object-contain sm:h-16 sm:w-16"
          />
          <span className="whitespace-nowrap font-display text-2xl font-bold leading-none tracking-normal text-gilded sm:text-3xl">
            VGM Group
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          className="text-primary md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border/70 px-5 pb-4 pt-2 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="py-2 text-sm uppercase tracking-[0.16em] text-muted-foreground"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <img src={logoUrl} alt="VGM Group" className="h-16 w-16 object-contain" />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Building businesses. Creating futures. Two verticals, one standard of craft.
          </p>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-[0.2em] text-primary">Companies</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/it-hub" className="hover:text-primary">
                VGM IT Hub Technologies
              </Link>
            </li>
            <li>
              <Link to="/infra" className="hover:text-primary">
                VGM Hub Infra
              </Link>
            </li>
            <li>
              <Link to="/careers" className="hover:text-primary">
                Careers
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-[0.2em] text-primary">Reach us</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href={`mailto:${email}`} className="hover:text-primary">
                {email}
              </a>
            </li>
            <li>
              <a href={phoneHref} className="hover:text-primary">
                {phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 hover:text-primary"
              >
                <WhatsAppIcon className="size-4 text-[#25D366]" />
                WhatsApp {phoneDisplay}
              </a>
            </li>
            <li>{location}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/70 py-5 text-center text-xs tracking-[0.15em] text-muted-foreground">
        © {new Date().getFullYear()} VGM GROUP — ALL RIGHTS RESERVED
      </div>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <section className="border-b border-border/70 bg-surface/40">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <p className="text-xs uppercase tracking-[0.35em] text-primary">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl leading-tight md:text-5xl">
          <span className="text-gilded">{title}</span>
        </h1>
        <div className="rule-gold mt-6 w-40" />
        <p className="mt-6 max-w-2xl text-muted-foreground">{copy}</p>
      </div>
    </section>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`Chat with VGM Group on WhatsApp at ${phoneDisplay}`}
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-[#25D366] py-3 pl-3 pr-4 text-white shadow-lg shadow-black/25 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
    >
      <WhatsAppIcon className="size-7" />
      <span className="hidden text-xs font-semibold uppercase tracking-[0.14em] sm:inline">
        Chat on WhatsApp
      </span>
    </a>
  );
}
