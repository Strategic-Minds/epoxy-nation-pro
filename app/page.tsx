"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

// ─── XPS CDN ASSETS ────────────────────────────────────────────────────────
const CDN = "https://cdn.shopify.com/s/files/1/0754/8905/0678/files";
const IMG = {
  heroGarage:    `${CDN}/phoenix-epoxy-pros-service-garage.webp?v=1781648581`,
  serviceGarage: `${CDN}/phoenix-epoxy-pros-service-garage.webp?v=1781648581`,
  serviceComm:   `${CDN}/phoenix-epoxy-pros-service-commercial.webp?v=1781648591`,
  servicePatio:  `${CDN}/phoenix-epoxy-pros-service-patio.webp?v=1781648601`,
  serviceRepair: `${CDN}/phoenix-epoxy-pros-service-repair.webp?v=1781648616`,
  colorFlake:    `${CDN}/xps-top-flake-colors-approved.png?v=1781670774`,
  colorMetallic: `${CDN}/xps-top-metallic-colors-standardized.png?v=1781670766`,
  colorQuartz:   `${CDN}/xps-top-quartz-colors-standardized.png?v=1781670783`,
  colorSolid:    `${CDN}/xps-solid-color-epoxy-base-coats.png?v=1781680330`,
  colorGlitter:  `${CDN}/xps-top-glitter-additive-colors.png?v=1781680348`,
};

// ─── INLINE STYLES ─────────────────────────────────────────────────────────
const S = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background: #fff; color: #0a0a0a; -webkit-font-smoothing: antialiased; font-size: 17px; line-height: 1.5; }
  a { color: inherit; text-decoration: none; }

  /* ── NAV ── */
  .enp-nav { position: sticky; top: 0; z-index: 100; background: #050505; border-bottom: 1px solid #1a1a1a; height: 68px; display: flex; align-items: center; justify-content: space-between; padding: 0 32px; }
  .enp-logo { font-size: 21px; font-weight: 900; color: #fff; letter-spacing: -0.5px; line-height: 1; }
  .enp-logo span { color: #F6B800; }
  .enp-logo small { display: block; font-size: 9px; font-weight: 700; color: #F6B800; letter-spacing: .18em; text-transform: uppercase; margin-top: 2px; }
  .enp-navlinks { display: flex; gap: 32px; align-items: center; list-style: none; }
  .enp-navlinks a { color: rgba(255,255,255,.65); font-size: 14px; font-weight: 600; letter-spacing: .01em; transition: color .15s; }
  .enp-navlinks a:hover { color: #fff; }
  .enp-navlinks .cta { background: #F6B800; color: #000 !important; font-weight: 800; padding: 9px 22px; border-radius: 6px; font-size: 14px; }
  .enp-ham { display: none; flex-direction: column; justify-content: center; gap: 5px; width: 44px; height: 44px; background: transparent; border: none; cursor: pointer; padding: 10px; }
  .enp-ham span { display: block; height: 2px; width: 100%; background: #fff; border-radius: 2px; transition: all .22s ease; }
  .enp-ham.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .enp-ham.open span:nth-child(2) { opacity: 0; }
  .enp-ham.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  .enp-drawer { position: fixed; inset: 0; top: 68px; background: #050505; z-index: 99; padding: 24px; display: flex; flex-direction: column; gap: 4px; transform: translateX(100%); transition: transform .28s cubic-bezier(.4,0,.2,1); }
  .enp-drawer.open { transform: translateX(0); }
  .enp-drawer a { display: block; padding: 14px 16px; color: rgba(255,255,255,.8); font-size: 16px; font-weight: 700; border-bottom: 1px solid #1a1a1a; }
  .enp-drawer .cta { background: #F6B800; color: #000; border-radius: 8px; text-align: center; margin-top: 12px; border: none; }

  /* ── SECTIONS ── */
  .sec { padding: 96px 32px; max-width: 1280px; margin: 0 auto; }
  .sec-full { padding: 96px 32px; }
  .sec-label { font-size: 11px; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; color: #F6B800; margin-bottom: 14px; }
  .sec-h2 { font-size: clamp(32px,4vw,52px); font-weight: 900; line-height: 1.05; letter-spacing: -1.5px; margin-bottom: 18px; }
  .sec-h2.light { color: #fff; }
  .sec-sub { font-size: 18px; color: #555; line-height: 1.6; max-width: 600px; margin-bottom: 48px; }
  .sec-sub.light { color: rgba(255,255,255,.6); }

  /* ── BUTTONS ── */
  .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-weight: 800; font-size: 16px; padding: 15px 32px; border-radius: 7px; cursor: pointer; border: none; transition: all .15s; font-family: inherit; text-decoration: none; }
  .btn-gold { background: #F6B800; color: #000; }
  .btn-gold:hover { background: #e0a800; }
  .btn-white { background: #fff; color: #000; }
  .btn-outline { background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,.3); }
  .btn-outline:hover { border-color: #fff; background: rgba(255,255,255,.06); }
  .btn-dark { background: #0a0a0a; color: #F6B800; }
  .btn-sm { font-size: 14px; padding: 11px 22px; }

  /* ── HERO ── */
  .hero { position: relative; min-height: 94vh; display: flex; align-items: center; overflow: hidden; background: #050505; }
  .hero-bg { position: absolute; inset: 0; background-image: url('${CDN}/phoenix-epoxy-pros-service-garage.webp?v=1781648581'); background-size: cover; background-position: center 30%; }
  .hero-overlay { position: absolute; inset: 0; background: linear-gradient(105deg, rgba(5,5,5,.88) 45%, rgba(5,5,5,.55) 100%); }
  .hero-inner { position: relative; z-index: 2; max-width: 1280px; margin: 0 auto; width: 100%; padding: 80px 32px; display: grid; grid-template-columns: 1fr 400px; gap: 80px; align-items: center; }
  .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(246,184,0,.1); border: 1px solid rgba(246,184,0,.35); color: #F6B800; font-size: 11px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; padding: 7px 16px; border-radius: 100px; margin-bottom: 28px; }
  .hero-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #F6B800; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1}50%{opacity:.4} }
  .hero-h1 { font-size: clamp(40px,6vw,76px); font-weight: 900; color: #fff; line-height: 1; letter-spacing: -2.5px; margin-bottom: 24px; }
  .hero-h1 em { color: #F6B800; font-style: normal; display: block; }
  .hero-p { font-size: 18px; color: rgba(255,255,255,.7); line-height: 1.65; max-width: 520px; margin-bottom: 40px; }
  .hero-stats { display: flex; gap: 36px; padding-top: 40px; border-top: 1px solid rgba(255,255,255,.1); margin-top: 12px; flex-wrap: wrap; }
  .hero-stat-n { font-size: 28px; font-weight: 900; color: #fff; line-height: 1; }
  .hero-stat-l { font-size: 12px; color: rgba(255,255,255,.45); margin-top: 4px; font-weight: 600; }

  /* ── FORM CARD ── */
  .form-card { background: #fff; border-radius: 16px; padding: 36px 32px; box-shadow: 0 32px 80px rgba(0,0,0,.5); }
  .form-card-label { font-size: 11px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; color: #F6B800; margin-bottom: 6px; }
  .form-card-h { font-size: 24px; font-weight: 900; color: #0a0a0a; letter-spacing: -0.5px; margin-bottom: 6px; }
  .form-card-sub { font-size: 14px; color: #777; margin-bottom: 26px; line-height: 1.5; }
  .f-inp { width: 100%; padding: 13px 16px; border: 1.5px solid #e5e7eb; border-radius: 8px; font-size: 15px; color: #0a0a0a; background: #fff; outline: none; transition: border-color .15s; font-family: inherit; display: block; margin-bottom: 12px; }
  .f-inp:focus { border-color: #F6B800; }
  .f-sub { width: 100%; padding: 15px; background: #F6B800; color: #000; font-weight: 900; font-size: 16px; border: none; border-radius: 8px; cursor: pointer; font-family: inherit; transition: background .15s; }
  .f-sub:hover { background: #e0a800; }
  .f-sub:disabled { opacity: .65; cursor: not-allowed; }
  .form-footer { text-align: center; font-size: 12px; color: #aaa; margin-top: 14px; }
  .form-powered { margin-top: 20px; padding-top: 16px; border-top: 1px solid #f0f0f0; text-align: center; font-size: 11px; color: #bbb; text-transform: uppercase; letter-spacing: .1em; }
  .form-powered strong { display: block; color: #555; font-size: 12px; margin-top: 3px; text-transform: none; letter-spacing: 0; }

  /* ── TRUST BAR ── */
  .trust-bar { background: #F6B800; padding: 18px 32px; display: flex; align-items: center; justify-content: center; gap: 48px; flex-wrap: wrap; }
  .trust-item { font-size: 14px; font-weight: 800; color: #000; display: flex; align-items: center; gap: 8px; }

  /* ── SERVICES ── */
  .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 2px; }
  .service-card { position: relative; overflow: hidden; aspect-ratio: 4/3; cursor: pointer; }
  .service-card-bg { position: absolute; inset: 0; background-size: cover; background-position: center; transition: transform .4s ease; }
  .service-card:hover .service-card-bg { transform: scale(1.05); }
  .service-card-overlay { position: absolute; inset: 0; background: linear-gradient(0deg, rgba(0,0,0,.85) 0%, rgba(0,0,0,.1) 60%); }
  .service-card-body { position: absolute; bottom: 0; left: 0; right: 0; padding: 24px 20px; }
  .service-card-title { font-size: 20px; font-weight: 900; color: #fff; letter-spacing: -0.3px; margin-bottom: 4px; }
  .service-card-desc { font-size: 13px; color: rgba(255,255,255,.65); line-height: 1.4; }
  .service-card-tag { display: inline-block; background: #F6B800; color: #000; font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: 4px; letter-spacing: .06em; text-transform: uppercase; margin-bottom: 8px; }

  /* ── HOW IT WORKS ── */
  .hw-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
  .hw-steps { display: flex; flex-direction: column; gap: 0; }
  .hw-step { display: flex; gap: 20px; padding: 24px 0; border-bottom: 1px solid #f0f0f0; position: relative; }
  .hw-step:last-child { border-bottom: none; }
  .hw-num { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 900; flex-shrink: 0; transition: all .2s; }
  .hw-num.done { background: #0a0a0a; color: #F6B800; }
  .hw-num.active { background: #F6B800; color: #000; box-shadow: 0 0 0 5px rgba(246,184,0,.2); }
  .hw-num.pending { background: #f5f5f5; color: #bbb; }
  .hw-step-title { font-size: 17px; font-weight: 800; color: #0a0a0a; margin-bottom: 4px; }
  .hw-step-sub { font-size: 14px; color: #777; line-height: 1.5; }
  .hw-visual { position: sticky; top: 80px; }
  .hw-phone { background: #0a0a0a; border-radius: 20px; padding: 24px; border: 1px solid #1a1a1a; }
  .hw-phone-bar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #1a1a1a; }
  .hw-tracker-step { display: flex; align-items: center; gap: 10px; padding: 12px 14px; border-radius: 8px; margin-bottom: 6px; }
  .hw-tracker-step.done { background: rgba(37,168,74,.12); }
  .hw-tracker-step.active { background: rgba(246,184,0,.12); border: 1px solid rgba(246,184,0,.3); }
  .hw-tracker-step.pending { background: #141414; }
  .hw-tracker-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
  .hw-tracker-dot.done { background: #25a84a; }
  .hw-tracker-dot.active { background: #F6B800; }
  .hw-tracker-dot.pending { background: #333; }
  .hw-tracker-label { font-size: 13px; font-weight: 700; }
  .hw-tracker-label.done { color: #25a84a; }
  .hw-tracker-label.active { color: #F6B800; }
  .hw-tracker-label.pending { color: #555; }

  /* ── COLOR CHARTS ── */
  .colors-bg { background: #0a0a0a; }
  .colors-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; }
  .color-card { border-radius: 12px; overflow: hidden; border: 1px solid #1a1a1a; background: #111; transition: border-color .2s; cursor: pointer; }
  .color-card:hover { border-color: #F6B800; }
  .color-card img { width: 100%; display: block; aspect-ratio: 4/3; object-fit: cover; }
  .color-card-body { padding: 16px 18px; display: flex; align-items: center; justify-content: space-between; }
  .color-card-name { font-size: 14px; font-weight: 800; color: #fff; }
  .color-card-sub { font-size: 12px; color: rgba(255,255,255,.45); margin-top: 2px; }
  .color-card-arrow { color: #F6B800; font-size: 18px; }

  /* ── GALLERY ── */
  .gallery-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; }
  .gallery-item { aspect-ratio: 1; overflow: hidden; background: #111; position: relative; }
  .gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s ease; display: block; }
  .gallery-item:hover img { transform: scale(1.06); }
  .gallery-item.tall { grid-row: span 2; aspect-ratio: auto; }

  /* ── SOCIAL PROOF ── */
  .reviews-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
  .review-card { background: #fff; border: 1px solid #eee; border-radius: 12px; padding: 24px; }
  .review-stars { color: #F6B800; font-size: 16px; letter-spacing: 2px; margin-bottom: 12px; }
  .review-text { font-size: 15px; color: #333; line-height: 1.6; margin-bottom: 16px; font-style: italic; }
  .review-author { font-size: 13px; font-weight: 800; color: #0a0a0a; }
  .review-job { font-size: 12px; color: #999; margin-top: 2px; }

  /* ── CTA BAND ── */
  .cta-band { background: #050505; padding: 96px 32px; text-align: center; }
  .cta-band h2 { font-size: clamp(32px,5vw,56px); font-weight: 900; color: #fff; letter-spacing: -2px; margin-bottom: 16px; }
  .cta-band p { font-size: 18px; color: rgba(255,255,255,.55); max-width: 560px; margin: 0 auto 40px; line-height: 1.6; }

  /* ── FOOTER ── */
  .footer { background: #030303; padding: 56px 32px 40px; border-top: 1px solid #111; }
  .footer-inner { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; }
  .footer-brand { font-size: 20px; font-weight: 900; color: #fff; letter-spacing: -0.5px; margin-bottom: 10px; }
  .footer-brand span { color: #F6B800; }
  .footer-tagline { font-size: 13px; color: rgba(255,255,255,.35); line-height: 1.6; max-width: 260px; }
  .footer-col-title { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .14em; color: rgba(255,255,255,.3); margin-bottom: 16px; }
  .footer-col-link { display: block; font-size: 14px; color: rgba(255,255,255,.55); margin-bottom: 10px; font-weight: 500; transition: color .15s; }
  .footer-col-link:hover { color: #fff; }
  .footer-bottom { max-width: 1280px; margin: 40px auto 0; padding-top: 24px; border-top: 1px solid #111; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
  .footer-copy { font-size: 12px; color: rgba(255,255,255,.25); }
  .footer-xps { font-size: 12px; color: rgba(255,255,255,.3); }
  .footer-xps span { color: #F6B800; }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .hero-inner { grid-template-columns: 1fr; gap: 40px; padding: 60px 20px; }
    .form-card { display: none; }
    .hero-h1 { font-size: clamp(38px,9vw,60px); }
    .hero-mobile-form { display: flex !important; }
    .hw-grid { grid-template-columns: 1fr; }
    .hw-visual { display: none; }
    .gallery-grid { grid-template-columns: repeat(2, 1fr); }
    .footer-inner { grid-template-columns: 1fr 1fr; gap: 32px; }
    .enp-navlinks { display: none; }
    .enp-ham { display: flex; }
    .sec { padding: 64px 20px; }
    .sec-full { padding: 64px 20px; }
  }
  @media (max-width: 600px) {
    .gallery-grid { grid-template-columns: repeat(2, 1fr); }
    .footer-inner { grid-template-columns: 1fr; }
    .trust-bar { gap: 20px; padding: 16px 20px; }
    .services-grid { grid-template-columns: 1fr 1fr; }
  }
`;

export default function HomePage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "homepage_hero", city: "Phoenix" }),
      });
    } catch (_) {}
    router.push(`/customer-portal/dashboard?name=${encodeURIComponent(form.name)}`);
  }

  const SERVICES = [
    { title: "Garage Floors",     desc: "Full broadcast flake, metallic, solid color, polyaspartic. 1-day install.",    img: IMG.serviceGarage, tag: "MOST POPULAR" },
    { title: "Metallic Epoxy",    desc: "Liquid-poured metallic pigment. Every pour is completely unique.",              img: IMG.serviceComm,   tag: "" },
    { title: "Commercial Floors", desc: "Industrial-grade epoxy, polished concrete, safety striping. Large-scale ready.", img: IMG.servicePatio,  tag: "" },
    { title: "Polished Concrete", desc: "Grind, hone, densify, polish, seal. Diamond-cut showroom finish.",               img: IMG.serviceRepair, tag: "" },
  ];

  const STEPS = [
    { n: "01", title: "Submit Your Digital Bid",           sub: "3-field form + floor photo. AI bid engine returns a transparent quote in 10 minutes.", state: "done"   },
    { n: "02", title: "Review Your Line-Item Proposal",    sub: "Exact XPS materials, labor, timeline. Approve digitally. No phone call required.",    state: "active" },
    { n: "03", title: "Lock Your Install Date",            sub: "Deposit paid. Calendar invite sent. Crew assigned. Your slot is locked.",             state: "pending" },
    { n: "04", title: "Install Day — Live Updates",        sub: "Crew checks in via app. Color approval before product opens. Photos every 2 hours.", state: "pending" },
    { n: "05", title: "Digital Sign-Off + Warranty",       sub: "Balance paid. Lifetime warranty issued. Maintenance guide delivered. Review requested.", state: "pending" },
  ];

  const REVIEWS = [
    { stars: 5, text: "The digital bid was ready in 8 minutes. Crew showed up exactly when they said. Floor looks like a showroom. I've gotten compliments from every single person who's seen the garage.", author: "Ryan M.", job: "Full Broadcast Flake — Scottsdale, AZ" },
    { stars: 5, text: "I had 3 quotes. These guys were the only ones who gave me a real line-item breakdown before we even talked. That level of transparency won me over before the first conversation.", author: "Amanda K.", job: "Metallic Epoxy — Chandler, AZ" },
    { stars: 5, text: "Commercial property, 4,200 sq ft. They handled the whole thing in 2 days. The tracker system kept me updated without me having to chase anyone. Professional all the way through.", author: "Marcus D.", job: "Commercial Floor — Tempe, AZ" },
  ];

  const COLOR_SYSTEMS = [
    { label: "Full Broadcast Flake",   sub: "12 colorways · Most popular",      img: IMG.colorFlake    },
    { label: "Metallic Epoxy",         sub: "8 colorways · Showroom grade",     img: IMG.colorMetallic },
    { label: "Quartz System",          sub: "10 colorways · Commercial grade",  img: IMG.colorQuartz   },
    { label: "Solid Color Base Coats", sub: "Full color palette available",     img: IMG.colorSolid    },
    { label: "Glitter Additive",       sub: "Sparkle over any system",          img: IMG.colorGlitter  },
  ];

  const FormFields = (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
      {[
        { key: "name",  placeholder: "Your Full Name",    type: "text"  },
        { key: "email", placeholder: "Email Address",     type: "email" },
        { key: "phone", placeholder: "Phone / WhatsApp",  type: "tel"   },
      ].map(({ key, placeholder, type }) => (
        <input key={key} type={type} required placeholder={placeholder}
          className="f-inp"
          value={form[key as keyof typeof form]}
          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        />
      ))}
      <button type="submit" className="f-sub" disabled={submitting}>
        {submitting ? "Getting Your Bid Ready…" : "Start My Digital Bid →"}
      </button>
    </form>
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: S }} />

      {/* ── NAV ─────────────────────────────────────────── */}
      <nav className="enp-nav">
        <div className="enp-logo">
          EPOXY <span>NATION</span> PRO
          <small>Powered by Xtreme Polishing Systems</small>
        </div>
        <ul className="enp-navlinks">
          <li><a href="/gallery">Gallery</a></li>
          <li><a href="/design">Design Center</a></li>
          <li><a href="/digital-estimator">How It Works</a></li>
          <li><a href="/customer-portal/dashboard">My Dashboard</a></li>
          <li><a href="/digital-estimator" className="cta">Get Free Bid</a></li>
        </ul>
        <button className={`enp-ham${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(m => !m)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>
      <div className={`enp-drawer${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(false)}>
        <a href="/gallery">Gallery</a>
        <a href="/design">Design Center</a>
        <a href="/digital-estimator">How It Works</a>
        <a href="/customer-portal/dashboard">My Dashboard</a>
        <a href="https://wa.me/16025550100" target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
        <a href="/digital-estimator" className="cta">Get Free Bid →</a>
      </div>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-inner">
          <div>
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              America&apos;s #1 Epoxy Super Store — Xtreme Polishing Systems
            </div>
            <h1 className="hero-h1">
              Phoenix&apos;s Most<br />
              Advanced<br />
              <em>Epoxy Floor</em>
              Coating System
            </h1>
            <p className="hero-p">
              Garage floors, commercial spaces, patios &amp; polished concrete.
              Digital bid in 10 minutes. Real-time project tracking.
              Backed by XPS-certified materials.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href="/digital-estimator" className="btn btn-gold">Get My Digital Bid — Free</a>
              <a href="https://wa.me/16025550100" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                WhatsApp Us
              </a>
            </div>
            <div className="hero-stats">
              {[["4.9★","Google Rating"],["200+","Phoenix Jobs"],["24hr","Bid Turnaround"],["Lifetime","Warranty"]].map(([n,l]) => (
                <div key={l}><div className="hero-stat-n">{n}</div><div className="hero-stat-l">{l}</div></div>
              ))}
            </div>
          </div>

          {/* FORM CARD — desktop */}
          <div className="form-card">
            <p className="form-card-label">Get Your Free Digital Bid</p>
            <h2 className="form-card-h">See Your Floor Transformed</h2>
            <p className="form-card-sub">Upload a photo. See your finish in real time. Bid ready in 10 minutes.</p>
            {FormFields}
            <p className="form-footer">No spam. No sales calls. Just your digital bid.</p>
            <p className="form-powered">Powered by<strong>Xtreme Polishing Systems — America&apos;s #1 Epoxy Super Store</strong></p>
          </div>
        </div>
      </section>

      {/* MOBILE FORM — shown below hero on mobile */}
      <section style={{ display: "none", padding: "32px 20px", background: "#fff" }} className="hero-mobile-form">
        <p className="form-card-label" style={{ marginBottom: 6 }}>Get Your Free Digital Bid</p>
        <h2 className="form-card-h" style={{ marginBottom: 20 }}>See Your Floor Transformed</h2>
        {FormFields}
      </section>

      {/* ── TRUST BAR ───────────────────────────────────── */}
      <div className="trust-bar">
        {["✓ Licensed & Insured","✓ XPS-Certified Materials","✓ 24hr Digital Bid","✓ Lifetime Warranty","✓ 5-Star Google Reviews"].map(t => (
          <span key={t} className="trust-item">{t}</span>
        ))}
      </div>

      {/* ── SERVICES ────────────────────────────────────── */}
      <section style={{ background: "#0a0a0a" }}>
        <div className="sec" style={{ paddingBottom: 24 }}>
          <p className="sec-label">Our Services</p>
          <h2 className="sec-h2 light">Every Epoxy System.<br />One Certified Team.</h2>
          <p className="sec-sub light">From residential garage floors to 10,000 sq ft commercial installations — all backed by XPS-sourced materials and a lifetime warranty.</p>
        </div>
        <div className="services-grid">
          {SERVICES.map(({ title, desc, img, tag }) => (
            <div key={title} className="service-card">
              <div className="service-card-bg" style={{ backgroundImage: `url(${img})` }} />
              <div className="service-card-overlay" />
              <div className="service-card-body">
                {tag && <div className="service-card-tag">{tag}</div>}
                <div className="service-card-title">{title}</div>
                <div className="service-card-desc">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────── */}
      <section style={{ background: "#fff" }}>
        <div className="sec">
          <p className="sec-label">Full Transparency</p>
          <h2 className="sec-h2">You Know Where Your<br />Project Stands. Always.</h2>
          <p className="sec-sub">Real-time tracking from first contact to final sign-off. No phone tag. No surprises.</p>

          <div className="hw-grid">
            <div className="hw-steps">
              {STEPS.map(({ n, title, sub, state }) => (
                <div key={n} className="hw-step">
                  <div className={`hw-num ${state}`}>{state === "done" ? "✓" : n}</div>
                  <div>
                    <div className="hw-step-title">{title}</div>
                    <div className="hw-step-sub">{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* LIVE TRACKER MOCKUP */}
            <div className="hw-visual">
              <div className="hw-phone">
                <div className="hw-phone-bar">
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#25a84a" }} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>PXP-0587 — LIVE</span>
                  </div>
                  <span style={{ fontSize: 11, color: "#555" }}>Updated now</span>
                </div>
                {[
                  { label: "Bid Submitted",        state: "done",    time: "9:02 AM" },
                  { label: "Estimator Review",      state: "done",    time: "9:14 AM" },
                  { label: "Proposal Sent",         state: "active",  time: "In progress" },
                  { label: "Approve & Schedule",    state: "pending", time: "—" },
                  { label: "Install Day",           state: "pending", time: "—" },
                  { label: "Final Sign-Off",        state: "pending", time: "—" },
                ].map(({ label, state, time }) => (
                  <div key={label} className={`hw-tracker-step ${state}`}>
                    <div className={`hw-tracker-dot ${state}`} />
                    <div style={{ flex: 1 }}>
                      <div className={`hw-tracker-label ${state}`}>{label}</div>
                    </div>
                    <span style={{ fontSize: 11, color: state === "pending" ? "#333" : state === "active" ? "#F6B800" : "#25a84a", fontWeight: 700 }}>{time}</span>
                  </div>
                ))}
                <div style={{ marginTop: 16, padding: "12px 14px", background: "rgba(246,184,0,.1)", borderRadius: 8, border: "1px solid rgba(246,184,0,.25)" }}>
                  <div style={{ fontSize: 11, color: "#F6B800", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Estimator Note</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.7)", lineHeight: 1.5 }}>Your proposal is ready. Check your email for a 15% OFF coupon — your reward for using the digital bid system.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COLOR CHARTS ────────────────────────────────── */}
      <section className="colors-bg sec-full">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
          <p className="sec-label">XPS Color Systems</p>
          <h2 className="sec-h2 light">Choose Your Finish</h2>
          <p className="sec-sub light" style={{ marginBottom: 40 }}>Every system backed by Xtreme Polishing Systems materials. The same finishes used by 2,000+ certified contractors nationwide.</p>

          <div className="colors-grid">
            {COLOR_SYSTEMS.map(({ label, sub, img }) => (
              <a key={label} href="/design" className="color-card">
                <img src={img} alt={label} loading="lazy" />
                <div className="color-card-body">
                  <div>
                    <div className="color-card-name">{label}</div>
                    <div className="color-card-sub">{sub}</div>
                  </div>
                  <div className="color-card-arrow">→</div>
                </div>
              </a>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <a href="/design" className="btn btn-gold">Explore All Color Systems →</a>
          </div>
        </div>
      </section>

      {/* ── GALLERY ─────────────────────────────────────── */}
      <section style={{ background: "#fff" }}>
        <div className="sec" style={{ paddingBottom: 0 }}>
          <p className="sec-label">Our Work</p>
          <h2 className="sec-h2">Real Phoenix Floors.<br />Real Results.</h2>
          <p className="sec-sub">Every photo is an actual job completed by our certified crew using XPS-sourced materials.</p>
        </div>
        <div className="gallery-grid" style={{ marginTop: 40 }}>
          {[IMG.serviceGarage, IMG.serviceComm, IMG.servicePatio, IMG.serviceRepair, IMG.serviceGarage, IMG.serviceComm, IMG.servicePatio, IMG.serviceRepair].map((src, i) => (
            <div key={i} className={`gallery-item${i === 0 ? " tall" : ""}`}>
              <img src={src} alt={`Epoxy floor job ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <a href="/gallery" className="btn btn-dark btn-sm">View Full Gallery →</a>
        </div>
      </section>

      {/* ── REVIEWS ─────────────────────────────────────── */}
      <section style={{ background: "#f8f8f8" }}>
        <div className="sec">
          <p className="sec-label">Customer Reviews</p>
          <h2 className="sec-h2">4.9 Stars. 200+ Phoenix Jobs.</h2>
          <p className="sec-sub">Every project tracked. Every customer surveyed. Our reputation runs on transparency.</p>
          <div className="reviews-grid">
            {REVIEWS.map(({ stars, text, author, job }) => (
              <div key={author} className="review-card">
                <div className="review-stars">{"★".repeat(stars)}</div>
                <p className="review-text">&ldquo;{text}&rdquo;</p>
                <div className="review-author">{author}</div>
                <div className="review-job">{job}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ────────────────────────────────────── */}
      <section className="cta-band">
        <h2>Ready to Transform<br />Your Floor?</h2>
        <p>Digital bid in 10 minutes. No sales call required. Powered by Xtreme Polishing Systems — America&apos;s #1 Epoxy Super Store.</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/digital-estimator" className="btn btn-gold">Start My Digital Bid — Free</a>
          <a href="https://wa.me/16025550100" target="_blank" rel="noopener noreferrer" className="btn btn-outline">WhatsApp Us Now</a>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <div className="footer-brand">EPOXY <span>NATION</span> PRO</div>
            <p className="footer-tagline">Phoenix&apos;s most advanced epoxy floor coating system. Powered by Xtreme Polishing Systems — America&apos;s #1 All-American Epoxy Super Store.</p>
            <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
              <a href="/digital-estimator" className="btn btn-gold btn-sm">Get Free Bid</a>
              <a href="https://wa.me/16025550100" target="_blank" rel="noopener noreferrer" className="btn btn-sm" style={{ background: "#25d366", color: "#fff" }}>WhatsApp</a>
            </div>
          </div>
          <div>
            <p className="footer-col-title">Services</p>
            {["Garage Floors","Metallic Epoxy","Commercial Floors","Polished Concrete","Patio & Outdoor"].map(s => (
              <a key={s} href="/gallery" className="footer-col-link">{s}</a>
            ))}
          </div>
          <div>
            <p className="footer-col-title">Resources</p>
            {[["Color Charts","/design"],["Floor Visualizer","/design"],["Digital Bid","/digital-estimator"],["My Dashboard","/customer-portal/dashboard"],["Gallery","/gallery"]].map(([l,h]) => (
              <a key={l} href={h} className="footer-col-link">{l}</a>
            ))}
          </div>
          <div>
            <p className="footer-col-title">Contact</p>
            <p className="footer-col-link">(602) 555-0100</p>
            <a href="https://wa.me/16025550100" target="_blank" rel="noopener noreferrer" className="footer-col-link">WhatsApp</a>
            <p className="footer-col-link">Phoenix, AZ</p>
            <p className="footer-col-link" style={{ marginTop: 16, color: "rgba(255,255,255,.2)", fontSize: 12 }}>Mon–Sat 7am–6pm</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© 2026 Epoxy Nation Pro. All rights reserved.</p>
          <p className="footer-xps">Powered by <span>Xtreme Polishing Systems</span></p>
        </div>
      </footer>
    </>
  );
}
