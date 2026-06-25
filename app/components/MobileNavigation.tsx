"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const phone = "772-209-0266";
const phoneHref = "tel:17722090266";

const NAV_LINKS = [
  { label: "Home",               href: "/",                           section: "Main" },
  { label: "About Us",           href: "/about-us",                   section: "Main" },
  { label: "Gallery",            href: "/gallery",                    section: "Main" },
  { label: "Contact Us",         href: "/contact-us",                 section: "Main" },
  { label: "Start Digital Bid",  href: "/digital-estimator",          section: "Get Started" },
  { label: "Design Center",      href: "/design",                     section: "Get Started" },
  { label: "My Dashboard",       href: "/customer-portal/dashboard",  section: "Client Portal" },
  { label: "Admin Dashboard",    href: "/admin-dashboard",            section: "Operations" },
  { label: "Owner Dashboard",    href: "/owner-dashboard",            section: "Operations" },
  { label: "Crew Dashboard",     href: "/crew-dashboard",             section: "Operations" },
  { label: "Installer App",      href: "/installer",                  section: "Operations" },
  { label: "Ops Command Center", href: "/ops",                        section: "Operations" },
];

const SECTIONS = ["Main", "Get Started", "Client Portal", "Operations"];

// All styles self-contained so NO external CSS file can interfere
const CSS = `
  .mnav-trigger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    background: transparent;
    border: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }
  .mnav-trigger .bar {
    display: block;
    width: 22px;
    height: 2px;
    background: #fff;
    border-radius: 2px;
    transition: transform .22s ease, opacity .22s ease;
  }
  .mnav-trigger.is-open .bar:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .mnav-trigger.is-open .bar:nth-child(2) { opacity: 0; }
  .mnav-trigger.is-open .bar:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  .mnav-backdrop {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.55);
    z-index: 9998;
  }
  .mnav-backdrop.is-open { display: block; }

  .mnav-drawer {
    position: fixed;
    top: 0; right: 0; bottom: 0;
    width: min(320px, 88vw);
    background: #050505;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    transform: translateX(100%);
    transition: transform .28s cubic-bezier(.4,0,.2,1);
    box-shadow: -8px 0 32px rgba(0,0,0,.5);
    overscroll-behavior: contain;
  }
  .mnav-drawer.is-open { transform: translateX(0); }

  .mnav-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(255,255,255,.1);
    flex-shrink: 0;
  }
  .mnav-head img { height: 36px; width: auto; }
  .mnav-x {
    width: 34px; height: 34px;
    border-radius: 50%;
    background: rgba(255,255,255,.1);
    border: none;
    color: #fff;
    font-size: 1rem;
    display: grid;
    place-items: center;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  .mnav-section-label {
    padding: 14px 20px 4px;
    font-size: .6rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: .12em;
    color: rgba(255,255,255,.3);
  }
  .mnav-item {
    display: flex;
    align-items: center;
    padding: 11px 20px;
    color: rgba(255,255,255,.8);
    font-size: .9rem;
    font-weight: 700;
    text-decoration: none;
    border-left: 3px solid transparent;
    -webkit-tap-highlight-color: transparent;
  }
  .mnav-item:active { background: rgba(255,255,255,.08); }
  .mnav-item.is-active { color: #f6b800; border-left-color: #f6b800; background: rgba(246,184,0,.07); }

  .mnav-footer {
    margin-top: auto;
    padding: 20px;
    border-top: 1px solid rgba(255,255,255,.1);
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex-shrink: 0;
  }
  .mnav-footer a {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 20px;
    border-radius: 6px;
    font-weight: 900;
    font-size: .88rem;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
  }
  .mnav-cta  { background: linear-gradient(180deg,#ffd75a,#f6b800); color: #050505; }
  .mnav-wa   { background: #25d366; color: #fff; }
  .mnav-call { background: rgba(255,255,255,.07); color: #fff; border: 1px solid rgba(255,255,255,.15); }
`;

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ── HAMBURGER BUTTON ── */}
      <button
        ref={btnRef}
        className={`mnav-trigger${open ? " is-open" : ""}`}
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-haspopup="dialog"
        onPointerDown={(e) => { e.stopPropagation(); setOpen(v => !v); }}
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>

      {/* ── BACKDROP ── */}
      <div
        className={`mnav-backdrop${open ? " is-open" : ""}`}
        onPointerDown={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* ── DRAWER ── */}
      <nav
        className={`mnav-drawer${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <div className="mnav-head">
          <div style="display:flex;align-items:center;gap:10px"><div style="width:32px;height:32px;background:#F6B800;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:900;color:#000">ENP</div><span style="color:#fff;font-weight:900;font-size:15px">Epoxy Nation Pro</span></div>
          <button className="mnav-x" onPointerDown={() => setOpen(false)} aria-label="Close menu">✕</button>
        </div>

        {SECTIONS.map((section) => (
          <div key={section}>
            <p className="mnav-section-label">{section}</p>
            {NAV_LINKS.filter(l => l.section === section).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`mnav-item${pathname === link.href ? " is-active" : ""}`}
                onPointerDown={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        ))}

        <div className="mnav-footer">
          <a className="mnav-cta" href="/digital-estimator" onPointerDown={() => setOpen(false)}>
            Start Digital Bid →
          </a>
          <a className="mnav-wa" href="https://wa.me/17722090266" target="_blank" rel="noopener noreferrer">
            📱 WhatsApp Us
          </a>
          <a className="mnav-call" href={phoneHref}>
            📞 {phone}
          </a>
        </div>
      </nav>
    </>
  );
}
