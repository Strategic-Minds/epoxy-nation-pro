import type { ReactNode } from "react";
import { PhoenixLeadForm } from "../PhoenixLeadForm";
import { dailyPhotos, floorSystems, installerJobs, phoenixImages, progressSteps, project, projectChecklist } from "../../lib/phoenix-demo-data";

const phoneHref = "tel:16027303499";

function EnterpriseStyles() {
  return (
    <style>{`
      .pep { --black:#050505; --ink:#111; --muted:#646464; --line:#dddddd; --gold:#f6b800; --gold2:#ffd75a; --paper:#f6f6f4; --ok:#25a84a; --card:#fff; min-height:100vh; background:#f7f7f4; color:var(--ink); font-family:Arial, Helvetica, sans-serif; letter-spacing:0; }
      .pep * { box-sizing:border-box; }
      .pep img { display:block; max-width:100%; }
      .pep a { color:inherit; text-decoration:none; }
      .pep button, .pep input, .pep select, .pep textarea { font:inherit; }
      .pep-header { position:sticky; top:0; z-index:20; display:flex; align-items:center; justify-content:space-between; gap:26px; min-height:72px; padding:12px clamp(18px,4vw,46px); background:#050505; color:#fff; box-shadow:0 10px 30px rgba(0,0,0,.22); }
      .pep-logo { display:flex; align-items:center; gap:10px; min-width:210px; font-weight:950; text-transform:uppercase; }
      .pep-logo img { width:205px; height:auto; }
      .pep-nav { display:flex; align-items:center; justify-content:center; gap:26px; font-size:14px; font-weight:850; }
      .pep-nav a.active { color:var(--gold); }
      .pep-user { display:flex; align-items:center; gap:12px; font-weight:800; }
      .pep-avatar { display:grid; place-items:center; width:42px; height:42px; border-radius:999px; background:linear-gradient(135deg,#222,#777); color:#fff; border:2px solid var(--gold); }
      .pep-btn { display:inline-flex; align-items:center; justify-content:center; gap:8px; min-height:42px; padding:0 18px; border-radius:6px; border:1px solid #d4d4d4; background:#fff; color:#090909; font-weight:900; cursor:pointer; white-space:nowrap; }
      .pep-btn.gold { border-color:#e2a500; background:linear-gradient(180deg,var(--gold2),var(--gold)); box-shadow:0 10px 22px rgba(246,184,0,.25); }
      .pep-btn.dark { background:#050505; border-color:#050505; color:#fff; }
      .pep-btn.wide { width:100%; }
      .pep-card { background:var(--card); border:1px solid var(--line); border-radius:8px; box-shadow:0 12px 28px rgba(0,0,0,.08); }
      .pep-section { width:min(100% - 44px, 1430px); margin:0 auto; padding:26px 0; }
      .pep-h1, .pep h1, .pep h2, .pep h3 { margin:0; letter-spacing:0; }
      .pep-h1 { font-family:Impact, 'Arial Black', sans-serif; font-size:clamp(44px,5.4vw,88px); line-height:.98; text-transform:uppercase; }
      .pep h2 { font-size:28px; line-height:1.05; }
      .pep h3 { font-size:18px; }
      .pep-kicker { margin:0 0 8px; color:var(--gold); font-size:12px; font-weight:950; text-transform:uppercase; }
      .pep-muted { color:var(--muted); line-height:1.45; }
      .pep-layout { display:grid; grid-template-columns:280px minmax(0,1fr); gap:26px; width:min(100% - 44px, 1430px); margin:0 auto; padding:26px 0 46px; }
      .pep-side { display:grid; gap:16px; align-content:start; }
      .pep-filter { padding:18px; }
      .pep-filter h3 { margin-bottom:12px; font-size:15px; text-transform:uppercase; }
      .pep-filter a, .pep-filter label { display:flex; align-items:center; gap:10px; min-height:34px; font-weight:750; color:#252525; }
      .pep-swatches { display:grid; grid-template-columns:repeat(5, 1fr); gap:10px; }
      .pep-dot { width:27px; height:27px; border-radius:999px; border:1px solid #d0d0d0; }
      .design-hero { position:relative; overflow:hidden; min-height:330px; display:grid; grid-template-columns:minmax(0,1fr) 300px; gap:22px; padding:34px; background:#fff; }
      .design-hero:after { content:''; position:absolute; inset:0 0 0 35%; background:linear-gradient(90deg,rgba(255,255,255,.96),rgba(255,255,255,.72),rgba(255,255,255,.2)), url('/images/hero-garage-approved.webp?v=approved-final-20260617') center/cover; z-index:0; }
      .design-hero > * { position:relative; z-index:1; }
      .hero-points { display:flex; gap:34px; margin-top:26px; font-weight:800; }
      .featured { align-self:end; padding:16px; }
      .featured .sample { height:100px; border-radius:5px; margin-bottom:10px; }
      .system-row { margin-top:22px; }
      .row-title { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; text-transform:uppercase; }
      .product-grid { display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); gap:14px; }
      .product { overflow:hidden; }
      .sample { min-height:88px; background-size:28px 28px, cover; }
      .product-body { padding:12px; display:grid; gap:8px; }
      .product-actions { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
      .product-actions .pep-btn { min-height:34px; padding:0 8px; font-size:12px; }
      .hero-public { display:grid; grid-template-columns:minmax(0,1fr) 360px; gap:28px; align-items:center; min-height:560px; padding:38px clamp(22px,4vw,54px); background:linear-gradient(90deg,#fff 0 39%,rgba(255,255,255,.82) 48%,rgba(255,255,255,.1)), url('/images/hero-garage-approved.webp?v=approved-final-20260617') center/cover; }
      .quote-panel { padding:20px; background:rgba(255,255,255,.96); }
      .upload-choice { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin:12px 0; }
      .mini-upload { display:grid; place-items:center; min-height:72px; border:1px dashed #bdbdbd; border-radius:7px; font-size:12px; font-weight:850; text-align:center; }
      .quote-fields { display:grid; gap:10px; }
      .quote-fields input, .quote-fields select, .quote-fields textarea { width:100%; min-height:40px; padding:0 12px; border:1px solid #cfcfcf; border-radius:5px; background:#fff; }
      .trust-strip { display:grid; grid-template-columns:repeat(5,1fr); gap:1px; padding:0; transform:translateY(-22px); }
      .trust-strip span { min-height:62px; display:grid; place-items:center; background:#fff; border:1px solid #dedede; font-weight:850; text-align:center; font-size:13px; }
      .split-proof { display:grid; grid-template-columns:1fr 1fr; overflow:hidden; min-height:170px; }
      .split-proof div { display:grid; align-content:end; padding:14px; color:#fff; background-size:cover; background-position:center; font-weight:950; }
      .service-mini { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
      .service-mini article { overflow:hidden; }
      .service-mini img { width:100%; height:126px; object-fit:cover; }
      .service-mini div { padding:14px; }
      .portal-strip { display:grid; grid-template-columns:repeat(6,1fr) 260px; gap:10px; align-items:center; padding:18px; margin-bottom:30px; }
      .portal-strip a, .portal-strip strong { min-height:62px; display:grid; place-items:center; border:1px solid #e2e2e2; border-radius:7px; text-align:center; font-weight:850; }
      .dashboard { width:min(100% - 44px, 1450px); margin:0 auto; padding:22px 0 46px; display:grid; gap:16px; grid-template-columns:1.1fr .9fr .58fr; }
      .dash-hero { display:grid; grid-template-columns:1fr 1fr; overflow:hidden; min-height:260px; }
      .dash-copy { padding:28px; }
      .dash-hero img { width:100%; height:100%; object-fit:cover; }
      .status-card, .next-card, .overview-card, .install-card, .crew-card, .doc-card, .support-card { padding:20px; }
      .status-card { display:grid; gap:18px; }
      .timeline { display:grid; grid-template-columns:repeat(5,1fr); align-items:start; gap:8px; }
      .timeline span { display:grid; justify-items:center; gap:7px; font-size:11px; text-align:center; font-weight:800; }
      .bubble { display:grid; place-items:center; width:38px; height:38px; border-radius:999px; border:1px solid #cfcfcf; background:#fff; font-weight:950; }
      .bubble.active { background:var(--gold); border-color:var(--gold); }
      .dashboard-wide { grid-column:span 2; }
      .overview-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; align-items:stretch; }
      .overview-grid img { width:100%; height:100%; min-height:210px; object-fit:cover; border-radius:6px; }
      .kv { display:grid; grid-template-columns:1fr 1fr; gap:12px; font-size:14px; }
      .kv b { display:block; margin-top:4px; }
      .check-list { display:grid; gap:9px; }
      .check-item { display:grid; grid-template-columns:28px 1fr auto; gap:10px; align-items:center; padding:9px 10px; border-radius:7px; border:1px solid #e4e4e4; }
      .check-dot { display:grid; place-items:center; width:21px; height:21px; border-radius:999px; background:#e9e9e9; font-size:12px; font-weight:950; }
      .check-item.done .check-dot { background:var(--ok); color:#fff; }
      .check-item.active { border-color:var(--gold); background:#fff8df; }
      .photo-row { display:grid; grid-template-columns:repeat(5,1fr) 120px; gap:12px; }
      .photo-row img { width:100%; height:104px; object-fit:cover; border-radius:6px; }
      .signature { min-height:88px; border:1px solid #d6d6d6; border-radius:7px; background:linear-gradient(160deg,transparent 0 42%,#111 43% 45%,transparent 46% 100%); }
      .quote-shell { width:min(100% - 44px, 1400px); margin:0 auto; padding:28px 0 48px; display:grid; grid-template-columns:minmax(0,1fr) 260px; gap:22px; }
      .stepper { display:grid; grid-template-columns:repeat(6,1fr); gap:8px; margin:24px 0; }
      .stepper span { display:grid; justify-items:center; gap:5px; font-size:11px; text-align:center; font-weight:850; }
      .upload-grid { display:grid; grid-template-columns:1fr 1.2fr; gap:14px; align-items:center; }
      .drop { min-height:118px; display:grid; place-items:center; border:2px dashed #cfcfcf; border-radius:8px; text-align:center; color:#555; font-weight:850; }
      .thumbs { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
      .thumb { min-height:104px; border-radius:7px; background-size:cover; background-position:center; position:relative; overflow:hidden; }
      .thumb:after { content:'x'; position:absolute; top:6px; right:6px; width:22px; height:22px; display:grid; place-items:center; border-radius:999px; background:#fff; font-weight:950; }
      .quote-form-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; }
      .choice-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
      .choice { min-height:86px; display:grid; place-items:end center; padding:8px; border:1px solid #d8d8d8; border-radius:7px; font-weight:850; background-size:cover; }
      .summary-rail { position:sticky; top:94px; align-self:start; padding:18px; }
      .installer-shell { min-height:100vh; display:grid; grid-template-columns:220px minmax(0,1fr); background:#fff; }
      .installer-brand { padding:34px 26px; background:#050505; color:#fff; display:grid; align-content:start; gap:28px; }
      .installer-brand img { width:160px; }
      .installer-features { display:grid; gap:20px; color:#f3f3f3; font-size:14px; }
      .phone-grid { display:grid; grid-template-columns:repeat(4,minmax(210px,1fr)); gap:22px; padding:28px; align-items:start; }
      .phone-screen { min-height:610px; border:10px solid #050505; border-radius:34px; background:#fff; overflow:hidden; box-shadow:0 18px 42px rgba(0,0,0,.22); }
      .phone-top { display:flex; align-items:center; justify-content:space-between; min-height:64px; padding:12px 16px; background:#050505; color:#fff; }
      .phone-body { padding:14px; display:grid; gap:12px; }
      .job-card { padding:12px; border:1px solid #dfdfdf; border-radius:8px; display:grid; gap:8px; }
      .bottom-nav { position:sticky; bottom:0; display:grid; grid-template-columns:repeat(5,1fr); gap:1px; min-height:58px; background:#050505; color:#fff; font-size:10px; text-align:center; }
      .bottom-nav a { display:grid; place-items:center; color:#fff; }
      .ops-grid { padding:28px; display:grid; grid-template-columns:170px minmax(0,1fr); gap:24px; background:#f5f5f3; min-height:calc(100vh - 72px); }
      .ops-side { padding:18px; background:#050505; color:#fff; border-radius:8px; display:grid; gap:10px; align-content:start; }
      .ops-main { display:grid; gap:18px; }
      .stats { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
      .stat { padding:18px; }
      .stat b { font-size:30px; display:block; }
      .table { display:grid; gap:1px; background:#e2e2e2; border:1px solid #e2e2e2; border-radius:8px; overflow:hidden; }
      .table-row { display:grid; grid-template-columns:1fr 1.5fr .8fr .8fr; gap:12px; padding:13px; background:#fff; font-weight:750; }
      .badge { display:inline-flex; align-items:center; justify-content:center; width:max-content; min-height:24px; padding:0 9px; border-radius:999px; background:#fff3c0; color:#8a6200; font-size:11px; font-weight:950; }
      @media (max-width: 980px) { .pep-header { min-height:70px; } .pep-logo img { width:170px; } .pep-nav, .pep-user, .desktop-only { display:none; } .pep-layout, .hero-public, .dashboard, .quote-shell, .installer-shell, .ops-grid { grid-template-columns:1fr; width:100%; padding-left:14px; padding-right:14px; } .design-hero { grid-template-columns:1fr; padding:22px; } .design-hero:after { inset:0; opacity:.82; } .product-grid, .service-mini, .quote-form-grid, .photo-row, .phone-grid, .stats { grid-template-columns:1fr 1fr; } .trust-strip, .portal-strip, .stepper { grid-template-columns:repeat(2,1fr); transform:none; } .quote-shell { gap:14px; } .summary-rail { position:static; } .installer-brand { display:none; } .phone-grid { padding:14px; } .phone-screen { min-height:auto; border-width:6px; border-radius:26px; } .ops-grid { padding-top:14px; } }
      @media (max-width: 560px) { .pep-section { width:100%; padding:14px; } .pep-h1 { font-size:38px; } .hero-public { min-height:520px; align-items:end; color:#fff; background:linear-gradient(180deg,rgba(0,0,0,.15),rgba(0,0,0,.72)), url('/images/hero-garage-approved.webp?v=approved-final-20260617') center/cover; } .quote-panel { background:#fff; color:#111; } .upload-choice, .product-grid, .service-mini, .overview-grid, .quote-form-grid, .choice-grid, .photo-row, .phone-grid, .stats { grid-template-columns:1fr; } .dashboard { width:100%; padding:14px; grid-template-columns:1fr; } .dashboard-wide { grid-column:auto; } .dash-hero { grid-template-columns:1fr; } .hero-points { display:none; } .pep-card { border-radius:8px; } .bottom-nav { position:sticky; } }
    `}</style>
  );
}

function Header({ active = "" }: { active?: string }) {
  const links = [
    ["Dashboard", "/customer-portal/dashboard"],
    ["Projects", "/customer-portal/projects/demo"],
    ["Documents", "/customer-portal/projects/demo"],
    ["Messages", "/customer-portal/dashboard"],
    ["Visualizer", "/design"]
  ];
  return (
    <header className="pep-header">
      <a className="pep-logo" href="/"><img src={phoenixImages.logo} alt="Phoenix Epoxy Pros" /></a>
      <nav className="pep-nav" aria-label="Phoenix navigation">
        {links.map(([label, href]) => <a className={active === label ? "active" : ""} href={href} key={label}>{label}</a>)}
        <a href={phoneHref}>Call</a>
      </nav>
      <div className="pep-user"><span className="pep-avatar">JL</span><span>Hi, Jason</span></div>
      <span className="pep-btn gold">Get Quote</span>
    </header>
  );
}

function Page({ children, active }: { children: ReactNode; active?: string }) {
  return <main className="pep"><EnterpriseStyles /><Header active={active} />{children}</main>;
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return <div style={{ marginBottom: 16 }}><p className="pep-kicker">{kicker}</p><h2>{title}</h2></div>;
}

function Sample({ texture }: { texture: string }) {
  return <div className="sample" style={{ background: texture }} />;
}

function BottomNav() {
  return <nav className="bottom-nav" aria-label="Mobile app navigation"><a href="/">Home</a><a href="/design">Visualizer</a><a href="/customer-portal/dashboard">Projects</a><a href="/customer-portal/dashboard">Favorites</a><a href="/quote/design">Quote</a></nav>;
}

export function PublicQuoteLanding() {
  return (
    <Page>
      <section className="hero-public">
        <div>
          <p className="pep-kicker">Phoenix Epoxy Pros</p>
          <h1 className="pep-h1">See Your New Floor Before You Buy</h1>
          <p className="pep-muted" style={{ maxWidth: 520, fontSize: 18 }}>Upload your current floor, save your favorite designs, and get a digital quote in 12 hours or less.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 20 }}><a className="pep-btn gold" href="/quote/design">Start My Quote</a><a className="pep-btn" href="/visualizer">Launch Floor Visualizer</a></div>
        </div>
        <section className="quote-panel pep-card" aria-label="Digital quote form">
          <h2>Get A Digital Quote</h2>
          <div className="upload-choice"><label className="mini-upload"><input type="file" hidden />Upload Current Floor</label><label className="mini-upload"><input type="file" hidden />Upload Favorite Floor</label></div>
          <PhoenixLeadForm />
        </section>
      </section>
      <section className="pep-section trust-strip" aria-label="Trust checkpoints"><span>4.9 Reviews</span><span>Digital Quotes</span><span>E-Sign Contracts</span><span>Project Tracking</span><span>Warranty Included</span></section>
      <section className="pep-section" id="before-after"><SectionTitle kicker="Before / After" title="Compare the transformation before committing" /><div className="split-proof pep-card"><div style={{ backgroundImage: `url(${phoenixImages.repair})` }}>Before</div><div style={{ backgroundImage: `url(${phoenixImages.beforeAfter})` }}>After</div></div></section>
      <section className="pep-section"><SectionTitle kicker="Our services" title="Built for garages, shops, patios, and repairs" /><div className="service-mini">{[["Garage Floors", phoenixImages.garage], ["Commercial Floors", phoenixImages.commercial], ["Patios & Outdoor Spaces", phoenixImages.patio], ["Floor Repair", phoenixImages.repair]].map(([title, image]) => <article className="pep-card" key={title}><img src={image} alt={`${title} example`} /><div><h3>{title}</h3><p className="pep-muted">Durable. Seamless. Built to last.</p><a href="/quote/design">Learn More</a></div></article>)}</div></section>
      <section className="pep-section portal-strip pep-card"><strong>Your Project Portal</strong><a href="/quote/design">Uploads</a><a href="/quote/design">Quote</a><a href="/customer-portal/dashboard">Contract</a><a href="/customer-portal/dashboard">Schedule</a><a href="/customer-portal/projects/demo">Track Project</a><a href="/customer-portal/dashboard">Warranty</a><a className="pep-btn gold" href="/quote/design">Start My Quote</a></section>
      <BottomNav />
    </Page>
  );
}

export function FloorDesignCenter() {
  return (
    <Page active="Visualizer">
      <div className="pep-layout">
        <aside className="pep-side">
          <section className="pep-filter pep-card"><h3>Floor Design Center</h3><p className="pep-muted">Explore premium floor systems designed to elevate any space.</p>{["All Floor Systems", "Flake Systems", "Metallic Epoxy", "Glitter Floors", "Concrete Stain", "Polished Concrete", "Custom Blends"].map((item) => <a href="#systems" key={item}>{item}</a>)}</section>
          <section className="pep-filter pep-card"><h3>Filter By Space</h3>{["Garages", "Basements", "Patios & Outdoors", "Commercial", "Retail", "Showrooms"].map((item) => <label key={item}><input type="checkbox" /> {item}</label>)}</section>
          <section className="pep-filter pep-card"><h3>Color Family</h3><div className="pep-swatches">{["#777", "#ccc", "#9b784a", "#8b4b15", "#3b210f", "#1f4e84", "#bb1320", "#8b8720", "#789039"].map((c) => <span className="pep-dot" style={{ background: c }} key={c} />)}</div></section>
        </aside>
        <section id="systems">
          <div className="design-hero pep-card"><div><p className="pep-kicker">Floor Design Center</p><h1 className="pep-h1">Floor Design Center</h1><p className="pep-muted" style={{ maxWidth: 520 }}>Find the perfect floor. Built for beauty. Made to last. Save favorites, view in our visualizer, or use selections to get a quote.</p><div className="hero-points"><span>Premium Materials</span><span>Built to Last</span><span>Installed by Experts</span></div></div><aside className="featured pep-card"><p className="pep-kicker">Featured Design</p><Sample texture={floorSystems[0].items[0].texture} /><h3>Domino Flake System</h3><p className="pep-muted">A timeless blend of black, white, and gray.</p><a className="pep-btn gold wide" href="/visualizer?design=domino">View in Visualizer</a></aside></div>
          {floorSystems.map((family) => <section className="system-row" key={family.family}><div className="row-title"><h2>{family.family}</h2><a href="/quote/design">View All</a></div><div className="product-grid">{family.items.map((item) => <article className="product pep-card" key={item.name}><Sample texture={item.texture} /><div className="product-body"><h3>{item.name}</h3><p className="pep-muted">{item.description}</p><div className="product-actions"><a className="pep-btn" href="/customer-portal/dashboard">Save</a><a className="pep-btn" href={`/visualizer?design=${item.name.toLowerCase()}`}>Visualizer</a></div><a className="pep-btn gold wide" href={`/quote/design?system=${item.name.toLowerCase()}`}>Use for Quote</a></div></article>)}</div></section>)}
        </section>
      </div>
      <BottomNav />
    </Page>
  );
}

export function ProjectDesignQuoteCenter() {
  return (
    <Page>
      <section className="quote-shell">
        <div>
          <h1>Project Design & Quote Center</h1><p className="pep-muted">Tell us about your project and we will send a custom quote within 12 hours.</p>
          <div className="stepper">{["Floor Photos", "Inspiration", "Project Details", "Floor System", "Contact", "Submit"].map((s, i) => <span key={s}><b className={`bubble ${i === 0 ? "active" : ""}`}>{i + 1}</b>{s}</span>)}</div>
          <section className="pep-card status-card"><h2>1. Upload Current Floor Photos</h2><div className="upload-grid"><label className="drop"><input type="file" multiple hidden />Drag & drop photos here or click to browse<br />JPG, PNG or HEIC up to 20MB each</label><div className="thumbs">{[phoenixImages.garage, phoenixImages.hero, phoenixImages.commercial].map((img) => <div className="thumb" style={{ backgroundImage: `url(${img})` }} key={img} />)}</div></div></section>
          <section className="pep-card status-card" style={{ marginTop: 16 }}><h2>2. Upload Favorite Floor / Inspiration</h2><div className="upload-grid"><label className="drop"><input type="file" multiple hidden />Drag & drop photos here or click to browse</label><div className="thumbs">{floorSystems[0].items.slice(0, 3).map((item) => <div className="thumb" style={{ background: item.texture }} key={item.name} />)}</div></div></section>
          <div className="quote-form-grid" style={{ marginTop: 16 }}><section className="pep-card status-card"><h3>3. Project Details</h3><div className="quote-fields"><select defaultValue="Garage"><option>Garage</option><option>Commercial</option></select><input defaultValue="1234 N 25th Ave, Phoenix, AZ 85029" /><input defaultValue="600" /><select defaultValue="Within 30 Days"><option>Within 30 Days</option></select></div></section><section className="pep-card status-card"><h3>4. Desired Floor System</h3><div className="choice-grid">{["Flake", "Metallic", "Glitter", "Concrete Stain", "Polished Concrete", "Not Sure Yet"].map((c) => <label className="choice" key={c}><input type="radio" name="system" defaultChecked={c === "Flake"} />{c}</label>)}</div></section><section className="pep-card status-card"><h3>5. Contact Information</h3><div className="quote-fields"><input defaultValue="John Smith" /><input defaultValue="(602) 555-0184" /><input defaultValue="john.smith@email.com" /><label><input type="checkbox" defaultChecked /> Yes, send text updates about my quote.</label></div></section></div>
          <section className="pep-card status-card" style={{ marginTop: 16 }}><h2>6. Submit for 12-Hour Quote Review</h2><p className="pep-muted">Local demo uploads only. File persistence stays disabled until storage and CRM gates are approved.</p><a className="pep-btn gold" href="/customer-portal/dashboard">Submit Project For Quote</a></section>
        </div>
        <aside className="summary-rail pep-card"><h2>Project Summary</h2><div className="thumbs" style={{ gridTemplateColumns: "repeat(3,1fr)", margin: "14px 0" }}>{[phoenixImages.garage, phoenixImages.hero, phoenixImages.beforeAfter].map((img) => <div className="thumb" style={{ backgroundImage: `url(${img})` }} key={img} />)}</div><p><b>Project Type</b><br />Garage</p><p><b>Property Type</b><br />Residential</p><p><b>Square Footage</b><br />600 sq ft</p><p><b>Floor System</b><br />Flake</p><a className="pep-btn gold wide" href={phoneHref}>Need Help? Call Us</a></aside>
      </section>
      <BottomNav />
    </Page>
  );
}

export function CustomerDashboard() {
  return (
    <Page active="Dashboard">
      <section className="dashboard">
        <article className="dash-hero pep-card"><div className="dash-copy"><p>Welcome back,</p><h1>{project.customer}!</h1><p className="pep-muted">Your project is on track. We are excited to bring your new floor to life.</p><a className="pep-btn gold" href="/customer-portal/projects/demo">View My Project</a></div><img src={phoenixImages.hero} alt="Garage project" /></article>
        <article className="status-card pep-card"><p className="pep-kicker">Current Project Status</p><h2>{project.status}</h2><p className="pep-muted">Your installation date is confirmed. We are getting everything ready.</p><Progress active={4} /><a className="pep-btn wide" href="/customer-portal/projects/demo">View Full Timeline</a></article>
        <article className="next-card pep-card"><p className="pep-kicker">Next Action</p><h2>{project.nextAction}</h2><p className="pep-muted">Complete your pre-installation prep to keep your project on schedule.</p><a className="pep-btn gold wide" href="/customer-portal/projects/demo">View Prep Checklist</a></article>
        <article className="overview-card dashboard-wide pep-card"><SectionTitle kicker="Project Overview" title="Selected project" /><div className="overview-grid"><div className="kv"><span>Project ID<b>{project.id}</b></span><span>System Type<b>{project.system}</b></span><span>Color<b>{project.color}</b></span><span>Location<b>{project.phoenixAddress}</b></span></div><img src={phoenixImages.garage} alt="Project floor" /></div></article>
        <article className="status-card pep-card"><h3>Saved Design / Selected Color</h3><div style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: 16 }}><Sample texture={floorSystems[0].items[1].texture} /><div><h3>Gravel</h3><p className="pep-muted">Full Broadcast System</p></div></div></article>
        <article className="status-card pep-card"><h3>Installer</h3><p><b>Mike Reynolds</b><br />Lead Installer<br />15+ Years Experience</p><a className="pep-btn wide" href="/customer-portal/projects/demo">Message Mike</a></article>
        <article className="status-card pep-card"><h3>Quote & Contract Status</h3><p>Quote - Approved</p><p>Contract - Signed</p></article>
        <article className="status-card pep-card"><h3>Prep Checklist Summary</h3><p style={{ fontSize: 36, fontWeight: 950, color: "#1f9a42" }}>80%</p><p className="pep-muted">4 of 5 tasks complete.</p></article>
      </section>
      <BottomNav />
    </Page>
  );
}

function Progress({ active }: { active: number }) {
  return <div className="timeline">{progressSteps.map((step, index) => <span key={step}><b className={`bubble ${index + 1 === active ? "active" : ""}`}>{index + 1}</b>{step}</span>)}</div>;
}

export function CustomerProjectDetail({ projectId }: { projectId: string }) {
  return (
    <Page active="Projects">
      <section className="pep-section"><a href="/customer-portal/dashboard">Back to Projects</a><h1>{project.residence} <span className="badge">In Progress</span></h1><p className="pep-muted">{project.address} | Project ID: {projectId || project.projectId} | Garage Floor | {project.squareFeet}</p></section>
      <section className="dashboard" style={{ gridTemplateColumns: "360px 1fr 320px" }}>
        <aside className="pep-card status-card"><h3>Project Progress <span style={{ float: "right", fontSize: 12 }}>15 of 15 Steps</span></h3><div className="check-list">{projectChecklist.map(([label, date, state], index) => <div className={`check-item ${state}`} key={label}><span className="check-dot">{state === "done" ? "✓" : index + 1}</span><strong>{index + 1}. {label}</strong><small>{date}</small></div>)}</div></aside>
        <div style={{ display: "grid", gap: 16 }}><div className="overview-grid"><article className="install-card pep-card"><h3>Install Details</h3><p>Install Date<br /><b>{project.installDate}</b></p><p>Arrival Window<br /><b>{project.arrivalWindow}</b></p><a className="pep-btn wide" href="/quote/design">Reschedule</a></article><article className="crew-card pep-card"><h3>Crew Leader</h3><p><b>Miguel Rodriguez</b><br />Lead Installer<br />4.9 (127 reviews)</p><a className="pep-btn gold" href={phoneHref}>Call Crew Leader</a></article></div><article className="pep-card status-card"><h3>Daily Progress</h3><div className="photo-row">{dailyPhotos.map((photo) => <div key={photo.title}><img src={photo.image} alt={photo.title} /><strong>{photo.title}</strong><small>{photo.time}</small></div>)}<div className="pep-card" style={{ display: "grid", placeItems: "center" }}>+6 More Photos</div></div></article><div className="overview-grid"><article className="doc-card pep-card"><h3>Documents</h3>{["Contract Agreement", "Warranty Information", "Care & Maintenance Guide"].map((d) => <p key={d}>{d} <a href="/customer-portal/dashboard">Download</a></p>)}</article><article className="doc-card pep-card"><h3>Change Order</h3><p className="pep-muted">No Change Orders. Your project is on track.</p></article></div></div>
        <aside className="support-card pep-card"><h3>Color Approval</h3><Sample texture={floorSystems[0].items[0].texture} /><p><b>Domino</b><br />Full Broadcast<br />Base: Light Gray</p><a className="pep-btn gold wide" href="/quote/design">Review & Approve Color</a></aside>
      </section>
      <BottomNav />
    </Page>
  );
}

export function InstallerPwa() {
  return (
    <main className="pep installer-shell"><EnterpriseStyles /><aside className="installer-brand"><img src={phoenixImages.logo} alt="Phoenix Epoxy Pros" /><h1>Installer PWA / Job Tracker</h1><p>Built for crews. Designed for results.</p><div className="installer-features"><span>Daily Job Tracking & Scheduling</span><span>Digital Checklists & Forms</span><span>Photo & Document Capture</span><span>Customer Signatures & Approvals</span><span>Works Offline. Syncs Anywhere.</span></div></aside><section className="phone-grid"><Phone title="Today" subtitle="Thursday, May 16, 2024"><div className="phone-body">{installerJobs.map((job) => <a className="job-card" href={`/installer/jobs/${job.id}`} key={job.id}><span className="badge">{job.status}</span><h3>{job.name}</h3><p className="pep-muted">{job.address}<br />{job.system} - {job.size}</p><small>{job.checklists} checklists | {job.photos} photos</small></a>)}</div></Phone><Phone title="Job Overview" subtitle="J-1001 Smith Residence"><div className="phone-body"><h2>J-1001</h2><p><b>Smith Residence</b><br />1234 Maple Dr.<br />Phoenix, AZ 85016</p><a className="pep-btn gold wide" href="/installer/jobs/J-1001">Start / Check-In</a></div></Phone><Phone title="Arrival Check-In" subtitle="1 of 6"><div className="phone-body">{["Arrived on site", "Checked in with customer", "Reviewed scope of work", "Verified job site is ready", "Safety briefing completed"].map((item, i) => <label className="check-item" key={item}><input type="checkbox" defaultChecked={i < 2} />{item}</label>)}<a className="pep-btn gold wide" href="/installer/jobs/J-1001">Continue</a></div></Phone><Phone title="Final Walkthrough" subtitle="6 of 6"><div className="phone-body"><label className="check-item"><input type="checkbox" defaultChecked /> Work completed per scope</label><label className="check-item"><input type="checkbox" defaultChecked /> Customer satisfied</label><div className="signature" /><a className="pep-btn gold wide" href="/ops">Job Complete</a></div></Phone></section></main>
  );
}

function Phone({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return <article className="phone-screen"><div className="phone-top"><b>{title}</b><span>{subtitle}</span></div>{children}<BottomNav /></article>;
}

export function InstallerJobDetail({ jobId }: { jobId: string }) {
  return <InstallerPwa />;
}

export function OpsCommandCenter() {
  return (
    <Page>
      <section className="ops-grid"><aside className="ops-side"><b>PHOENIX</b>{["Dashboard", "Jobs", "Schedule", "Customers", "Reports", "Photos", "Settings"].map((item) => <a href="/ops" key={item}>{item}</a>)}</aside><div className="ops-main"><h1>Desktop Command Center</h1><p className="pep-muted">Real-time visibility. Smarter operations. Demo data only until auth and live data are approved.</p><div className="stats">{[["Today's Jobs", "12"], ["In Progress", "7"], ["Completed", "5"], ["Open Change Orders", "3"]].map(([label, value]) => <article className="stat pep-card" key={label}><b>{value}</b>{label}</article>)}</div><section className="pep-card status-card"><h2>Jobs Overview</h2><div className="table"><div className="table-row"><b>Job</b><b>Customer</b><b>Time</b><b>Status</b></div>{installerJobs.map((job, i) => <div className="table-row" key={job.id}><span>{job.id}</span><span>{job.name}</span><span>{["8:00 AM", "10:30 AM", "1:00 PM"][i]}</span><span className="badge">{job.status}</span></div>)}</div></section></div></section>
    </Page>
  );
}

