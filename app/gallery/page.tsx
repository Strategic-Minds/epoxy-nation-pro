"use client";
import { useState } from "react";
import { MobileNavigation } from "../components/MobileNavigation";

const CDN = "https://cdn.shopify.com/s/files/1/0754/8905/0678/files";

const GALLERY_ITEMS = [
  { id: 1, category: "Garage Floors", title: "Full-Broadcast Flake System", location: "Scottsdale, AZ", sqft: "520 sqft", system: "Polyaspartic Flake", img: `${CDN}/phoenix-epoxy-pros-service-garage.webp?v=1781648581`, tag: "Most Popular" },
  { id: 2, category: "Before & After", title: "Complete Surface Transformation", location: "Phoenix, AZ", sqft: "480 sqft", system: "Metallic Epoxy", img: `${CDN}/phoenix-epoxy-pros-before-after.webp?v=1781648570`, tag: "Before/After" },
  { id: 3, category: "Commercial", title: "Commercial Warehouse System", location: "Mesa, AZ", sqft: "8,200 sqft", system: "Industrial Epoxy", img: `${CDN}/phoenix-epoxy-pros-service-commercial.webp?v=1781648591`, tag: "Commercial" },
  { id: 4, category: "Patios", title: "Outdoor Patio Coating", location: "Chandler, AZ", sqft: "640 sqft", system: "Polyaspartic UV", img: `${CDN}/phoenix-epoxy-pros-service-patio.webp?v=1781648601`, tag: "Outdoor" },
  { id: 5, category: "Garage Floors", title: "Repair & Resurface", location: "Gilbert, AZ", sqft: "420 sqft", system: "Diamond Grind + Epoxy", img: `${CDN}/phoenix-epoxy-pros-service-repair.webp?v=1781648616`, tag: "Repair" },
  { id: 6, category: "Process", title: "Surface Prep — Diamond Grind", location: "Tempe, AZ", sqft: "580 sqft", system: "Prep Stage", img: `${CDN}/nashville-resin-worx-process-02-prep-work.png?v=1781036569`, tag: "Process" },
  { id: 7, category: "Process", title: "Base Coat Application", location: "Phoenix, AZ", sqft: "500 sqft", system: "Base Layer", img: `${CDN}/nashville-resin-worx-process-03-base-coat.png?v=1781036578`, tag: "Process" },
  { id: 8, category: "Process", title: "Beauty Coat — Flake Broadcast", location: "Scottsdale, AZ", sqft: "460 sqft", system: "Full Broadcast", img: `${CDN}/nashville-resin-worx-process-04-beauty-coat.png?v=1781036586`, tag: "Process" },
  { id: 9, category: "Process", title: "Final Inspection Walkthrough", location: "Phoenix, AZ", sqft: "490 sqft", system: "Polyaspartic Top", img: `${CDN}/nashville-resin-worx-process-06-final-inspection.png?v=1781036605`, tag: "Final" },
  { id: 10, category: "Color Systems", title: "Top Flake Color Options", location: "XPS Color System", sqft: "All sizes", system: "Flake System", img: `${CDN}/xps-top-flake-colors-approved.png?v=1781670774`, tag: "Colors" },
  { id: 11, category: "Color Systems", title: "Metallic Epoxy Colors", location: "XPS Color System", sqft: "All sizes", system: "Metallic System", img: `${CDN}/xps-top-metallic-colors-standardized.png?v=1781670766`, tag: "Colors" },
  { id: 12, category: "Color Systems", title: "Quartz Color Options", location: "XPS Color System", sqft: "All sizes", system: "Quartz System", img: `${CDN}/xps-top-quartz-colors-standardized.png?v=1781670783`, tag: "Colors" },
];

const CATS = ["All", "Garage Floors", "Commercial", "Patios", "Before & After", "Process", "Color Systems"];

const CSS = `
  .gallery-page { background: #fafafa; min-height: 100vh; }

  /* HERO */
  .gallery-hero {
    background: #050505;
    padding: 72px 32px 60px;
    text-align: center;
    border-bottom: 1px solid #111;
  }
  .gallery-hero-label {
    font-size: 10px; font-weight: 900; letter-spacing: .2em;
    text-transform: uppercase; color: #F6B800; margin-bottom: 16px;
  }
  .gallery-hero-h1 {
    font-size: clamp(36px, 5vw, 64px);
    font-weight: 900; color: #fff;
    letter-spacing: -2px; line-height: 1.0;
    margin-bottom: 18px;
  }
  .gallery-hero-h1 span { color: #F6B800; }
  .gallery-hero-sub {
    font-size: 18px; color: rgba(255,255,255,.55);
    max-width: 560px; margin: 0 auto 40px;
    line-height: 1.6;
  }
  .gallery-hero-stats {
    display: flex; justify-content: center; gap: 48px;
    flex-wrap: wrap;
  }
  .gallery-stat-n { font-size: 32px; font-weight: 900; color: #fff; line-height: 1; }
  .gallery-stat-l { font-size: 12px; color: rgba(255,255,255,.4); margin-top: 4px; font-weight: 600; }

  /* FILTER BAR */
  .gallery-filters {
    position: sticky; top: 68px; z-index: 50;
    background: #fff; border-bottom: 1px solid #e5e7eb;
    padding: 0 32px;
    display: flex; align-items: center; gap: 4px;
    overflow-x: auto; scrollbar-width: none;
  }
  .gallery-filters::-webkit-scrollbar { display: none; }
  .filter-btn {
    flex-shrink: 0; padding: 16px 18px;
    font-size: 13px; font-weight: 700;
    color: #666; border: none;
    background: transparent; cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all .15s; white-space: nowrap;
    font-family: inherit;
  }
  .filter-btn:hover { color: #000; }
  .filter-btn.active { color: #F6B800; border-bottom-color: #F6B800; }

  /* GRID */
  .gallery-container { max-width: 1400px; margin: 0 auto; padding: 48px 24px 96px; }
  .gallery-count { font-size: 13px; color: #888; font-weight: 600; margin-bottom: 28px; }
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: 2px;
  }

  /* CARD */
  .gallery-card {
    position: relative; overflow: hidden;
    aspect-ratio: 4/3; cursor: pointer;
    background: #0a0a0a;
  }
  .gallery-card img {
    width: 100%; height: 100%;
    object-fit: cover; display: block;
    transition: transform .4s ease;
  }
  .gallery-card:hover img { transform: scale(1.04); }
  .gallery-card-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,.85) 0%, rgba(0,0,0,.15) 50%, transparent 100%);
    opacity: 0; transition: opacity .3s ease;
    display: flex; flex-direction: column;
    justify-content: flex-end; padding: 24px;
  }
  .gallery-card:hover .gallery-card-overlay { opacity: 1; }
  .gallery-card-tag {
    display: inline-block; margin-bottom: 8px;
    padding: 3px 10px; border-radius: 4px;
    background: #F6B800; color: #000;
    font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: .1em;
    width: fit-content;
  }
  .gallery-card-title { font-size: 16px; font-weight: 800; color: #fff; margin-bottom: 4px; line-height: 1.2; }
  .gallery-card-meta { font-size: 12px; color: rgba(255,255,255,.6); }

  /* ALWAYS-VISIBLE BOTTOM INFO (mobile) */
  .gallery-card-info {
    padding: 14px 16px 16px;
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
  }
  .gallery-card-info-title { font-size: 14px; font-weight: 800; color: #0a0a0a; margin-bottom: 3px; }
  .gallery-card-info-meta { font-size: 12px; color: #888; }
  .gallery-card-info-tag {
    display: inline-block; margin-top: 6px;
    padding: 2px 8px; border-radius: 3px;
    background: #FFF8E1; color: #B8860B;
    font-size: 10px; font-weight: 800; text-transform: uppercase;
  }

  /* LIGHTBOX */
  .lightbox {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(0,0,0,.95); display: flex; align-items: center; justify-content: center;
    padding: 20px;
  }
  .lightbox-inner { position: relative; max-width: 1000px; width: 100%; }
  .lightbox-img { width: 100%; max-height: 80vh; object-fit: contain; border-radius: 4px; display: block; }
  .lightbox-close {
    position: absolute; top: -48px; right: 0;
    background: rgba(255,255,255,.1); border: none; color: #fff;
    width: 40px; height: 40px; border-radius: 50%; cursor: pointer;
    font-size: 18px; display: flex; align-items: center; justify-content: center;
    font-family: inherit;
  }
  .lightbox-info { margin-top: 20px; }
  .lightbox-title { font-size: 20px; font-weight: 900; color: #fff; margin-bottom: 4px; }
  .lightbox-meta { font-size: 14px; color: rgba(255,255,255,.5); }

  /* CTA BANNER */
  .gallery-cta {
    background: #F6B800; padding: 64px 32px; text-align: center;
  }
  .gallery-cta-h { font-size: clamp(28px,4vw,44px); font-weight: 900; color: #000; letter-spacing: -1px; margin-bottom: 12px; }
  .gallery-cta-sub { font-size: 18px; color: rgba(0,0,0,.6); margin-bottom: 32px; }
  .gallery-cta-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: #000; color: #F6B800;
    font-size: 16px; font-weight: 900; padding: 16px 36px; border-radius: 7px;
    text-decoration: none; transition: background .15s;
  }
  .gallery-cta-btn:hover { background: #111; opacity: 1; }

  @media (max-width: 640px) {
    .gallery-grid { grid-template-columns: 1fr 1fr; gap: 1px; }
    .gallery-card { aspect-ratio: 1; }
    .gallery-hero { padding: 56px 20px 48px; }
    .gallery-hero-stats { gap: 28px; }
    .gallery-filters { padding: 0 16px; }
    .gallery-container { padding: 32px 16px 80px; }
  }
`;

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter(i => i.category === active);
  const lbItem = lightbox !== null ? GALLERY_ITEMS.find(i => i.id === lightbox) : null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="gallery-page">

        {/* HERO */}
        <section className="gallery-hero">
          <div className="gallery-hero-label">Project Gallery</div>
          <h1 className="gallery-hero-h1">500+ Arizona Floors<br/><span>Transformed.</span></h1>
          <p className="gallery-hero-sub">
            Every photo is a real Phoenix-area project. Real crews. Real results. Powered by Xtreme Polishing Systems.
          </p>
          <div className="gallery-hero-stats">
            {[["500+","Projects Completed"],["4.9★","Google Rating"],["10yr","Warranty"],["AZ","Licensed & Insured"]].map(([n,l]) => (
              <div key={l}>
                <div className="gallery-stat-n">{n}</div>
                <div className="gallery-stat-l">{l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FILTER */}
        <div className="gallery-filters" role="tablist">
          {CATS.map(cat => (
            <button key={cat} role="tab" aria-selected={active===cat} className={`filter-btn${active===cat?" active":""}`} onClick={() => setActive(cat)}>
              {cat} {cat==="All" ? `(${GALLERY_ITEMS.length})` : `(${GALLERY_ITEMS.filter(i=>i.category===cat).length})`}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="gallery-container">
          <p className="gallery-count">{filtered.length} project{filtered.length !== 1 ? "s" : ""}{active !== "All" ? ` in ${active}` : ""}</p>
          <div className="gallery-grid">
            {filtered.map(item => (
              <div key={item.id}>
                <div className="gallery-card" onClick={() => setLightbox(item.id)} role="button" tabIndex={0} aria-label={item.title}>
                  <img src={item.img} alt={item.title} loading="lazy" />
                  <div className="gallery-card-overlay">
                    <span className="gallery-card-tag">{item.tag}</span>
                    <div className="gallery-card-title">{item.title}</div>
                    <div className="gallery-card-meta">{item.location} · {item.sqft} · {item.system}</div>
                  </div>
                </div>
                <div className="gallery-card-info">
                  <div className="gallery-card-info-title">{item.title}</div>
                  <div className="gallery-card-info-meta">{item.location} · {item.sqft}</div>
                  <span className="gallery-card-info-tag">{item.system}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="gallery-cta">
          <div className="gallery-cta-h">Want a Floor Like These?</div>
          <p className="gallery-cta-sub">Get your free digital estimate in under 10 minutes.</p>
          <a href="/digital-estimator" className="gallery-cta-btn">Start Your Free Estimate →</a>
        </div>

      </div>

      {/* LIGHTBOX */}
      {lbItem && (
        <div className="lightbox" onClick={() => setLightbox(null)} role="dialog" aria-modal="true">
          <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">✕</button>
            <img className="lightbox-img" src={lbItem.img} alt={lbItem.title} />
            <div className="lightbox-info">
              <div className="lightbox-title">{lbItem.title}</div>
              <div className="lightbox-meta">{lbItem.location} · {lbItem.sqft} · {lbItem.system}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
