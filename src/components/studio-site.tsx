import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/booking";
import { publicStorageUrl, useStudioContent } from "@/lib/studio-content";

const navigation = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Studio", to: "/studio" },
] as const;

export function StudioSiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  const content = useStudioContent();
  const pathname = useLocation({ select: (location) => location.pathname });
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Link to="/" className="brand-mark" aria-label={`${content.brandName} home`}>
          <img className="brand-logo" src={publicStorageUrl(content.logo)} alt="" />
          <span className="brand-copy">
            <span>{content.brandName}</span>
            <small>INTERIOR STUDIO · MIDRAND</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`nav-link${pathname === item.to ? " is-active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Button asChild className="site-button header-book-button hidden sm:inline-flex">
            <Link to="/book">
              Book a consultation <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="mobile-book-link sm:hidden">
            <Link to="/book">Book <ArrowUpRight aria-hidden="true" /></Link>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="menu-trigger sm:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            title={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
      </div>

      {menuOpen ? (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
          {navigation.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`mobile-nav-link${pathname === item.to ? " is-active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/book" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
            Book a consultation <ArrowUpRight aria-hidden="true" />
          </Link>
        </nav>
      ) : null}
    </header>
  );
}

function SiteFooter() {
  const content = useStudioContent();
  const currentYear = "2026";

  return (
    <footer className="site-footer">
      <div className="site-container footer-main">
        <div className="footer-brand-block">
          <img src={publicStorageUrl(content.logo)} alt="" className="footer-logo" />
          <p className="footer-brand-name">{content.brandName}</p>
          <p className="footer-tagline">Thoughtfully made for the way you live.</p>
        </div>
        <div className="footer-column">
          <p className="footer-label">Explore</p>
          <Link to="/services">Services</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/studio">Our studio</Link>
          <Link to="/book">Book a consultation</Link>
        </div>
        <div className="footer-column footer-contact">
          <p className="footer-label">Visit & enquire</p>
          <p>{content.location}</p>
          <a
            href={buildWhatsAppUrl("Hello Tanya & Leslie Interiors, I would like to enquire.", content.whatsappNumber)}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="site-container footer-bottom">
        <span>© {currentYear} {content.brandName}</span>
        <span>Midrand, South Africa</span>
      </div>
    </footer>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`section-heading section-heading-${align}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">
        {title} <span className="script-accent">{accent}</span>
      </h2>
      <p className="section-description">{description}</p>
    </div>
  );
}

export function TextArrowLink({ to, children }: { to: "/services" | "/projects" | "/studio" | "/book"; children: React.ReactNode }) {
  return (
    <Link to={to} className="text-arrow-link">
      {children} <ArrowUpRight aria-hidden="true" />
    </Link>
  );
}