"use client";
export { COLOR_CHARTS } from "../lib/color-charts";
import type { ReactNode } from "react";
import { useState, useEffect } from "react";

// ─── SIDEBAR CONFIG PER ROLE ──────────────────────────────────────────────────
const SIDEBARS = {
  admin: [
    { label: "Dashboard",    href: "/admin-dashboard",   icon: "▦" },
    { label: "All Leads",    href: "/admin-dashboard",   icon: "👥" },
    { label: "Proposals",    href: "/admin-dashboard",   icon: "📋" },
    { label: "Messages",     href: "/admin-dashboard",   icon: "💬" },
    { label: "Schedule",     href: "/admin-dashboard",   icon: "📅" },
    { label: "Active Jobs",  href: "/admin-dashboard",   icon: "🔧" },
    { label: "Crew Board",   href: "/crew-dashboard",    icon: "👷" },
    { label: "Owner View",   href: "/owner-dashboard",   icon: "📊" },
    { label: "Settings",     href: "#",                  icon: "⚙️" },
  ],
  owner: [
    { label: "Overview",     href: "/owner-dashboard",   icon: "▦" },
    { label: "Revenue",      href: "/owner-dashboard",   icon: "💰" },
    { label: "Conversion",   href: "/owner-dashboard",   icon: "📈" },
    { label: "Locations",    href: "/owner-dashboard",   icon: "🏙️" },
    { label: "Operations",   href: "/admin-dashboard",   icon: "⚙️" },
    { label: "Crew Board",   href: "/crew-dashboard",    icon: "👷" },
    { label: "Settings",     href: "#",                  icon: "🔧" },
  ],
  crew: [
    { label: "My Jobs",       href: "/crew-dashboard",    icon: "▦" },
    { label: "Today's Jobs",  href: "/crew-dashboard",    icon: "📋" },
    { label: "Schedule",      href: "/crew-dashboard",    icon: "📅" },
    { label: "Photos",        href: "/crew-dashboard",    icon: "📷" },
    { label: "Change Orders", href: "/crew-dashboard",    icon: "✏️" },
    { label: "Messages",      href: "/crew-dashboard",    icon: "💬" },
    { label: "Settings",      href: "#",                  icon: "⚙️" },
  ],
  customer: [
    { label: "My Dashboard",  href: "/customer-portal/dashboard", icon: "▦" },
    { label: "Project Status",href: "/customer-portal/dashboard", icon: "📋" },
    { label: "Color Charts",  href: "/customer-portal/dashboard#colors", icon: "🎨" },
    { label: "Floor Design",  href: "/customer-portal/dashboard#design", icon: "🖼️" },
    { label: "Documents",     href: "/customer-portal/dashboard", icon: "📄" },
    { label: "Messages",      href: "/customer-portal/dashboard", icon: "💬" },
    { label: "WhatsApp",      href: "https://wa.me/17722090266",  icon: "📱" },
  ],
  installer: [
    { label: "Command Center", href: "/ops",     icon: "▦" },
    { label: "Jobs",           href: "/ops",     icon: "📋" },
    { label: "Schedule",       href: "/ops",     icon: "📅" },
    { label: "Customers",      href: "/ops",     icon: "👥" },
    { label: "Reports",        href: "/ops",     icon: "📊" },
    { label: "Photos",         href: "/ops",     icon: "📷" },
    { label: "Settings",       href: "#",        icon: "⚙️" },
  ],
};

// ─── SHARED STYLES ────────────────────────────────────────────────────────────
function ShellStyles() {
  return (
    <style>{`
      *, *::before, *::after { box-sizing: border-box; }
      .ds-shell { display:flex; flex-direction:column; min-height:100vh; background:#f4f5f6; font-family:Arial,Helvetica,sans-serif; }
      .ds-header { position:sticky; top:0; z-index:30; display:flex; align-items:center; justify-content:space-between; gap:12px; min-height:64px; padding:10px 16px; background:#050505; color:#fff; box-shadow:0 4px 20px rgba(0,0,0,.3); }
      .ds-header-logo { display:flex; align-items:center; gap:10px; min-width:0; }
      .ds-header-logo img { height:38px; width:auto; flex-shrink:0; }
      .ds-header-role { font-size:.66rem; font-weight:900; text-transform:uppercase; letter-spacing:.08em; color:#f6b800; border:1px solid #f6b800; padding:2px 8px; border-radius:4px; white-space:nowrap; }
      .ds-header-user { font-size:.8rem; font-weight:700; color:rgba(255,255,255,.7); display:none; }
      .ds-header-cta { display:inline-flex; align-items:center; gap:6px; padding:7px 14px; background:linear-gradient(180deg,#ffd75a,#f6b800); color:#050505; font-weight:900; font-size:.78rem; border-radius:6px; text-decoration:none; border:none; cursor:pointer; white-space:nowrap; flex-shrink:0; }
      
      /* MOBILE BOTTOM NAV */
      .ds-bottom-nav { display:none; position:fixed; bottom:0; left:0; right:0; z-index:40; background:#050505; border-top:1px solid #1a1a1a; padding:0 0 env(safe-area-inset-bottom); }
      .ds-bottom-nav-inner { display:grid; grid-template-columns: repeat(5, 1fr); }
      .ds-bottom-nav a { display:flex; flex-direction:column; align-items:center; justify-content:center; padding:8px 4px 6px; color:rgba(255,255,255,.5); font-size:.58rem; font-weight:700; text-decoration:none; gap:3px; border-top:2px solid transparent; }
      .ds-bottom-nav a.active, .ds-bottom-nav a:hover { color:#f6b800; border-top-color:#f6b800; }
      .ds-bottom-nav a span.icon { font-size:1.2rem; line-height:1; }
      .ds-body { display:flex; flex:1; }
      .ds-sidebar { width:220px; min-height:100%; flex-shrink:0; background:#050505; padding:24px 0; display:flex; flex-direction:column; gap:2px; }
      .ds-sidebar-section { padding:10px 20px 4px; font-size:.62rem; font-weight:900; text-transform:uppercase; letter-spacing:.1em; color:rgba(255,255,255,.3); margin-top:8px; }
      .ds-sidebar a { display:flex; align-items:center; gap:10px; padding:9px 20px; color:rgba(255,255,255,.7); font-size:.84rem; font-weight:700; text-decoration:none; border-left:3px solid transparent; transition:all .15s; }
      .ds-sidebar a:hover { background:rgba(255,255,255,.06); color:#fff; }
      .ds-sidebar a.active { color:#f6b800; background:rgba(246,184,0,.1); border-left-color:#f6b800; }
      .ds-main { flex:1; padding:20px 16px; display:flex; flex-direction:column; gap:16px; overflow-x:hidden; min-width:0; }
      
      /* KPI ROW */
      .ds-kpi-row { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; }
      .ds-kpi { background:#fff; border:1px solid #e2e6e8; border-radius:8px; padding:14px 16px; }
      .ds-kpi-label { font-size:.65rem; font-weight:900; text-transform:uppercase; color:#888; margin:0 0 5px; }
      .ds-kpi-value { font-size:1.4rem; font-weight:900; margin:0 0 2px; color:#050505; }
      .ds-kpi-sub { font-size:.7rem; color:#888; margin:0; }
      
      /* CARDS */
      .ds-card { background:#fff; border:1px solid #e2e6e8; border-radius:8px; box-shadow:0 2px 10px rgba(0,0,0,.05); overflow:hidden; }
      .ds-card-head { display:flex; align-items:center; justify-content:space-between; padding:14px 16px 12px; border-bottom:1px solid #f0f2f3; }
      .ds-card-title { font-size:.9rem; font-weight:900; text-transform:uppercase; letter-spacing:.04em; margin:0; }
      .ds-card-body { padding:16px; }
      
      /* BUTTONS */
      .ds-btn { display:inline-flex; align-items:center; justify-content:center; gap:8px; padding:8px 16px; border-radius:6px; font-size:.8rem; font-weight:900; cursor:pointer; text-decoration:none; border:1px solid #d4d4d4; background:#fff; color:#050505; white-space:nowrap; }
      .ds-btn.gold { background:linear-gradient(180deg,#ffd75a,#f6b800); border-color:#e2a500; color:#050505; box-shadow:0 4px 14px rgba(246,184,0,.22); }
      .ds-btn.dark { background:#050505; border-color:#050505; color:#fff; }
      .ds-btn.whatsapp { background:#25d366; border-color:#1ebe5d; color:#fff; }
      .ds-btn.full { width:100%; }
      
      /* TABLES */
      .ds-table { width:100%; border-collapse:collapse; font-size:.82rem; }
      .ds-table th { text-align:left; padding:8px 12px; font-size:.65rem; font-weight:900; text-transform:uppercase; color:#888; border-bottom:2px solid #e8eaec; }
      .ds-table td { padding:10px 12px; border-bottom:1px solid #f0f2f3; }
      
      /* BADGES */
      .ds-badge { display:inline-flex; align-items:center; padding:3px 9px; border-radius:999px; font-size:.65rem; font-weight:900; text-transform:uppercase; }
      .ds-badge.green { background:#d1fae5; color:#065f46; }
      .ds-badge.blue  { background:#dbeafe; color:#1e40af; }
      .ds-badge.amber { background:#fef3c7; color:#92400e; }
      .ds-badge.red   { background:#fee2e2; color:#991b1b; }
      
      /* TIMELINE — VERTICAL ON MOBILE */
      .ds-timeline { display:flex; flex-direction:column; gap:0; }
      .ds-timeline-step { display:grid; grid-template-columns:44px 1fr; gap:12px; align-items:center; padding:10px 0; position:relative; }
      .ds-timeline-step:not(:last-child)::after { content:''; position:absolute; left:21px; top:54px; bottom:-10px; width:2px; background:#e2e6e8; }
      .ds-timeline-step.done::after { background:#25a84a; }
      .ds-timeline-step.active::after { background:#f6b800; }
      .ds-timeline-step-info { display:flex; flex-direction:column; gap:2px; }
      .ds-timeline-step-info strong { font-size:.86rem; font-weight:900; color:#050505; }
      .ds-timeline-step-info span { font-size:.72rem; color:#888; }
      .ds-timeline-step.active .ds-timeline-step-info strong { color:#050505; }
      .ds-timeline-step.active .ds-timeline-step-info span { color:#f6b800; font-weight:800; }
      .ds-bubble { display:grid; place-items:center; width:40px; height:40px; border-radius:999px; border:2px solid #d4d4d4; background:#fff; font-weight:900; font-size:.84rem; flex-shrink:0; }
      .ds-timeline-step.done .ds-bubble { background:#25a84a; border-color:#25a84a; color:#fff; }
      .ds-timeline-step.active .ds-bubble { background:#f6b800; border-color:#f6b800; color:#050505; }
      
      /* COLOR CHARTS */
      .ds-color-charts { display:grid; grid-template-columns:1fr; gap:14px; }
      .ds-color-chart-card { border:1px solid #e2e6e8; border-radius:8px; overflow:hidden; background:#fff; }
      .ds-color-chart-card img { width:100%; display:block; }
      .ds-color-chart-info { padding:10px 14px; }
      .ds-color-chart-info h3 { margin:0 0 3px; font-size:.84rem; font-weight:900; text-transform:uppercase; }
      .ds-color-chart-info p { margin:0; font-size:.76rem; color:#888; }
      
      /* FLOOR DESIGNER */
      .ds-floor-designer { display:flex; flex-direction:column; }
      .ds-floor-preview { background:linear-gradient(135deg,#1a1a1a,#2d2d2d); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; color:#fff; padding:24px; min-height:200px; }
      .ds-floor-preview img { width:100%; max-height:200px; object-fit:cover; border-radius:6px; }
      .ds-floor-upload { background:#fff; padding:20px; display:flex; flex-direction:column; gap:14px; }
      .ds-drop-zone { min-height:110px; border:2px dashed #d4d4d4; border-radius:8px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; color:#888; font-size:.82rem; font-weight:800; cursor:pointer; transition:border-color .2s; padding:16px; text-align:center; }
      .ds-drop-zone:hover { border-color:#f6b800; color:#050505; }
      
      /* STEP LIST */
      .ds-step-list { display:flex; flex-direction:column; gap:8px; }
      .ds-step { display:grid; grid-template-columns:36px 1fr; gap:10px; align-items:start; padding:10px 12px; border-radius:7px; border:1px solid #e8eaec; }
      .ds-step.done { background:#f0fdf4; border-color:#bbf7d0; }
      .ds-step.active { background:#fffbeb; border-color:#fde68a; }
      .ds-step-num { display:grid; place-items:center; width:32px; height:32px; border-radius:999px; background:#e9e9e9; font-weight:900; font-size:.82rem; flex-shrink:0; }
      .ds-step.done .ds-step-num { background:#25a84a; color:#fff; }
      .ds-step.active .ds-step-num { background:#f6b800; color:#050505; }
      .ds-step-info strong { display:block; font-size:.84rem; font-weight:900; margin-bottom:2px; }
      .ds-step-info span { font-size:.76rem; color:#888; }
      
      /* PWA INSTALL BANNER */
      .ds-pwa-banner { display:none; position:fixed; bottom:calc(64px + env(safe-area-inset-bottom)); left:12px; right:12px; z-index:50; background:#050505; border:1px solid #f6b800; border-radius:14px; padding:0; box-shadow:0 12px 40px rgba(0,0,0,.6); overflow:hidden; }
      .ds-pwa-banner.visible { display:flex; flex-direction:column; }
      .ds-pwa-banner-top { display:flex; align-items:center; gap:12px; padding:14px 16px 10px; }
      .ds-pwa-banner-icon { width:52px; height:52px; border-radius:12px; background:linear-gradient(180deg,#ffd75a,#f6b800); display:grid; place-items:center; font-size:1.5rem; flex-shrink:0; box-shadow:0 4px 12px rgba(246,184,0,.4); }
      .ds-pwa-banner-text { flex:1; min-width:0; }
      .ds-pwa-banner-text strong { display:block; color:#fff; font-size:.96rem; font-weight:900; }
      .ds-pwa-banner-text em { display:block; color:rgba(255,255,255,.5); font-size:.73rem; font-style:normal; margin-top:2px; }
      .ds-pwa-banner-close { color:rgba(255,255,255,.35); font-size:1.4rem; background:none; border:none; cursor:pointer; padding:0 4px; flex-shrink:0; line-height:1; }
      .ds-pwa-banner-perks { display:grid; grid-template-columns:1fr 1fr 1fr; gap:0; border-top:1px solid rgba(255,255,255,.08); border-bottom:1px solid rgba(255,255,255,.08); }
      .ds-pwa-banner-perk { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px; padding:10px 8px; text-align:center; }
      .ds-pwa-banner-perk span:first-child { font-size:1.1rem; }
      .ds-pwa-banner-perk span:last-child { color:rgba(255,255,255,.55); font-size:.65rem; font-weight:700; }
      .ds-pwa-banner-actions { display:grid; grid-template-columns:1fr; gap:8px; padding:12px 16px 14px; }
      .ds-pwa-banner-btn { background:linear-gradient(180deg,#ffd75a,#f6b800); color:#050505; font-weight:900; font-size:.9rem; padding:12px 18px; border-radius:10px; border:none; cursor:pointer; width:100%; letter-spacing:.02em; }
      .ds-pwa-banner-ios-hint { color:rgba(255,255,255,.45); font-size:.7rem; text-align:center; padding:0 0 4px; }

      /* MOBILE-FIRST BREAKPOINTS */
      @media(min-width:768px) {
        .ds-header-user { display:block; }
        .ds-sidebar { display:flex; }
        .ds-bottom-nav { display:none !important; }
        .ds-kpi-row { grid-template-columns:repeat(4,1fr); }
        .ds-main { padding:28px 32px; gap:22px; }
        .ds-timeline { flex-direction:row; }
        .ds-timeline-step { grid-template-columns:1fr; grid-template-rows:auto auto auto; justify-items:center; text-align:center; padding:8px; }
        .ds-timeline-step:not(:last-child)::after { display:none; }
        .ds-timeline-step-info { align-items:center; }
        .ds-color-charts { grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); }
        .ds-floor-designer { flex-direction:row; min-height:320px; }
        .ds-pwa-banner { display:none !important; }
      }
      @media(max-width:767px) {
        .ds-sidebar { display:none; }
        .ds-bottom-nav { display:block; }
        .ds-main { padding-bottom:calc(80px + env(safe-area-inset-bottom)); }
      }
    `}</style>
  );
}

// ─── MOBILE BOTTOM NAV (customer focused) ────────────────────────────────────
function MobileBottomNav({ role, active }: { role: keyof typeof SIDEBARS; active: string }) {
  const items = SIDEBARS[role].slice(0, 5);
  return (
    <nav className="ds-bottom-nav" aria-label="Mobile navigation">
      <div className="ds-bottom-nav-inner">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={item.label === active ? "active" : ""}
            target={item.href.startsWith("https://wa.me") ? "_blank" : undefined}
            rel={item.href.startsWith("https://wa.me") ? "noopener noreferrer" : undefined}
          >
            <span className="icon">{item.icon}</span>
            {item.label.split(" ")[0]}
          </a>
        ))}
      </div>
    </nav>
  );
}

// ─── PWA INSTALL BANNER ───────────────────────────────────────────────────────
function PwaInstallBanner() {
  const [show, setShow] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [platform, setPlatform] = useState<"android"|"ios"|"desktop">("desktop");

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as any).standalone === true;
    if (isStandalone) return;

    const dismissed = localStorage.getItem("pwa-banner-dismissed");
    if (dismissed) return;

    const ua = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(ua);
    const isAndroid = /android/.test(ua);

    if (isIOS) {
      setPlatform("ios");
      setTimeout(() => setShow(true), 2500);
    } else if (isAndroid) {
      setPlatform("android");
    } else {
      setPlatform("desktop");
    }

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function handleInstall() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      if (outcome === "accepted") {
        setShow(false);
        localStorage.setItem("pwa-banner-dismissed", "installed");
        return;
      }
    }
    setShow(false);
    localStorage.setItem("pwa-banner-dismissed", "true");
  }

  function handleDismiss() {
    setShow(false);
    localStorage.setItem("pwa-banner-dismissed", "true");
  }

  if (!show) return null;

  return (
    <div className="ds-pwa-banner visible" role="dialog" aria-label="Install app">
      {/* TOP ROW */}
      <div className="ds-pwa-banner-top">
        <div className="ds-pwa-banner-icon">🏗️</div>
        <div className="ds-pwa-banner-text">
          <strong>Phoenix Epoxy Pros</strong>
          <em>Your project portal — add to home screen</em>
        </div>
        <button className="ds-pwa-banner-close" onClick={handleDismiss} aria-label="Dismiss">×</button>
      </div>

      {/* PERKS ROW */}
      <div className="ds-pwa-banner-perks">
        <div className="ds-pwa-banner-perk">
          <span>📋</span><span>Track Status</span>
        </div>
        <div className="ds-pwa-banner-perk">
          <span>🎨</span><span>Pick Colors</span>
        </div>
        <div className="ds-pwa-banner-perk">
          <span>📱</span><span>WhatsApp Us</span>
        </div>
      </div>

      {/* ACTION */}
      <div className="ds-pwa-banner-actions">
        {platform === "ios" ? (
          <>
            <p className="ds-pwa-banner-ios-hint">
              Tap the Share button ( ⬆️ ) in Safari, then "Add to Home Screen"
            </p>
            <button className="ds-pwa-banner-btn" onClick={handleDismiss}>Got it ✓</button>
          </>
        ) : (
          <button className="ds-pwa-banner-btn" onClick={handleInstall}>
            ⬇️ Install App — Free
          </button>
        )}
      </div>
    </div>
  );
}

// ─── SHARED HEADER ────────────────────────────────────────────────────────────
function DsHeader({ role, user }: { role: string; user: string }) {
  return (
    <header className="ds-header">
      <div className="ds-header-logo">
        <a href="/"><img src="/images/logo-header.webp" alt="Phoenix Epoxy Pros" /></a>
        <span className="ds-header-role">{role}</span>
      </div>
      <span className="ds-header-user">{user}</span>
      <a className="ds-header-cta" href="/">← Home</a>
    </header>
  );
}

// ─── SHARED SIDEBAR ───────────────────────────────────────────────────────────
function DsSidebar({ role, active }: { role: keyof typeof SIDEBARS; active: string }) {
  const items = SIDEBARS[role];
  return (
    <nav className="ds-sidebar">
      <div className="ds-sidebar-section">{role.toUpperCase()}</div>
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className={item.label === active ? "active" : ""}
          target={item.href.startsWith("https://wa.me") ? "_blank" : undefined}
          rel={item.href.startsWith("https://wa.me") ? "noopener noreferrer" : undefined}
        >
          <span>{item.icon}</span>
          {item.label}
        </a>
      ))}
    </nav>
  );
}

// ─── EXPORTED SHELL WRAPPER ───────────────────────────────────────────────────
export function DashboardShell({
  role,
  roleLabel,
  user,
  active,
  children,
}: {
  role: keyof typeof SIDEBARS;
  roleLabel: string;
  user: string;
  active: string;
  children: ReactNode;
}) {
  return (
    <div className="ds-shell">
      <ShellStyles />
      <DsHeader role={roleLabel} user={user} />
      <div className="ds-body">
        <DsSidebar role={role} active={active} />
        <main className="ds-main">{children}</main>
      </div>
      <MobileBottomNav role={role} active={active} />
      <PwaInstallBanner />
    </div>
  );
}

export { ShellStyles, DsHeader, DsSidebar };
