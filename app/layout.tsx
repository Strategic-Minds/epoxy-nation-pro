import type { Metadata } from "next";
import "./globals.css";
import { MobileNavigation } from "./components/MobileNavigation";

export const metadata: Metadata = {
  title: "Epoxy Nation Pro | Phoenix's #1 Epoxy & Concrete Coating Specialists",
  description: "Phoenix epoxy floor experts. Garage floors, commercial spaces, patios & polished concrete. Free digital estimate in 10 minutes. Powered by Xtreme Polishing Systems.",
  keywords: "epoxy floor Phoenix, garage floor coating Phoenix AZ, epoxy flooring Phoenix, concrete coating Phoenix",
  openGraph: {
    title: "Epoxy Nation Pro | Phoenix's #1 Epoxy Floor Specialists",
    description: "Digital bid in 10 minutes. Real-time project tracking. Lifetime warranty. Powered by Xtreme Polishing Systems.",
    images: ["https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-service-garage.webp"],
  },
};

const CDN = "https://cdn.shopify.com/s/files/1/0754/8905/0678/files";

const GLOBAL_NAV_CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
  a { color: inherit; text-decoration: none; }

  /* ─── GLOBAL HEADER ─── */
  .g-header {
    position: sticky;
    top: 0;
    z-index: 200;
    background: #050505;
    border-bottom: 1px solid rgba(255,255,255,.08);
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 28px;
  }
  .g-logo-wrap { display: flex; align-items: center; gap: 12px; text-decoration: none; }
  .g-logo-mark {
    width: 38px; height: 38px;
    background: #F6B800;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 900; color: #000; letter-spacing: -0.5px;
    flex-shrink: 0;
  }
  .g-logo-text { line-height: 1; }
  .g-logo-name { font-size: 15px; font-weight: 900; color: #fff; letter-spacing: -0.3px; }
  .g-logo-sub { font-size: 9px; font-weight: 700; color: #F6B800; letter-spacing: .16em; text-transform: uppercase; margin-top: 2px; display: block; }

  .g-nav-links { display: flex; align-items: center; gap: 4px; list-style: none; margin: 0; padding: 0; }
  .g-nav-links a {
    padding: 7px 14px; border-radius: 6px;
    color: rgba(255,255,255,.6); font-size: 13.5px; font-weight: 600;
    transition: color .15s, background .15s;
    white-space: nowrap;
  }
  .g-nav-links a:hover { color: #fff; background: rgba(255,255,255,.06); }
  .g-nav-links a.active { color: #F6B800; background: rgba(246,184,0,.08); }

  .g-nav-actions { display: flex; align-items: center; gap: 10px; }
  .g-portal-btn {
    padding: 7px 16px; border-radius: 6px;
    color: rgba(255,255,255,.55); font-size: 13px; font-weight: 600;
    border: 1px solid rgba(255,255,255,.12);
    background: transparent;
    transition: all .15s;
    cursor: pointer; text-decoration: none;
  }
  .g-portal-btn:hover { color: #fff; border-color: rgba(255,255,255,.3); background: rgba(255,255,255,.05); }
  .g-cta-btn {
    padding: 9px 20px; border-radius: 6px;
    background: #F6B800; color: #000;
    font-size: 13.5px; font-weight: 800;
    border: none; cursor: pointer;
    transition: background .15s, transform .1s;
    text-decoration: none; display: inline-block;
  }
  .g-cta-btn:hover { background: #e5a800; transform: translateY(-1px); opacity: 1; }

  @media (max-width: 900px) {
    .g-nav-links { display: none; }
    .g-nav-actions { display: none; }
  }
  @media (min-width: 901px) {
    .g-hamburger-wrap { display: none; }
  }
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#050505" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <style dangerouslySetInnerHTML={{ __html: GLOBAL_NAV_CSS }} />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#fff' }}>

        {/* ─── GLOBAL HEADER — on every page ─── */}
        <header className="g-header">
          <a href="/" className="g-logo-wrap">
            <div className="g-logo-mark">ENP</div>
            <div className="g-logo-text">
              <div className="g-logo-name">Epoxy Nation Pro</div>
              <small className="g-logo-sub">Powered by XPS</small>
            </div>
          </a>

          {/* Desktop nav */}
          <nav aria-label="Main navigation">
            <ul className="g-nav-links">
              <li><a href="/">Home</a></li>
              <li><a href="/gallery">Gallery</a></li>
              <li><a href="/design">Design Center</a></li>
              <li><a href="/digital-estimator">Get Estimate</a></li>
              <li><a href="/about-us">About</a></li>
              <li><a href="/contact-us">Contact</a></li>
            </ul>
          </nav>

          <div className="g-nav-actions">
            <a href="/customer-portal" className="g-portal-btn">Client Portal</a>
            <a href="/digital-estimator" className="g-cta-btn">Free Estimate →</a>
          </div>

          {/* Mobile hamburger */}
          <div className="g-hamburger-wrap">
            <MobileNavigation />
          </div>
        </header>

        <main>{children}</main>

      </body>
    </html>
  );
}
