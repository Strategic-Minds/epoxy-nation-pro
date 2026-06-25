"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);

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

  return (
    <main style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", background: "#0a0a0a", minHeight: "100vh" }}>

      {/* HEADER */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "#050505", borderBottom: "1px solid #222", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", letterSpacing: "-0.5px" }}>
            EPOXY <span style={{ color: "#F6B800" }}>NATION PRO</span>
          </div>
        </div>
        <nav style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <a href="/gallery" style={{ color: "#aaa", textDecoration: "none", fontSize: 14 }}>Gallery</a>
          <a href="/design" style={{ color: "#aaa", textDecoration: "none", fontSize: 14 }}>Design</a>
          <a href="/customer-portal/dashboard" style={{ color: "#aaa", textDecoration: "none", fontSize: 14 }}>My Dashboard</a>
          <a href="/digital-estimator" style={{ background: "#F6B800", color: "#000", fontWeight: 700, fontSize: 13, padding: "8px 18px", borderRadius: 6, textDecoration: "none" }}>
            Get Free Bid
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section style={{ position: "relative", minHeight: "90vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-service-garage.webp?v=1781648581)", backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.35)" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "60px 24px", display: "grid", gridTemplateColumns: "1fr 420px", gap: 60, alignItems: "center", width: "100%" }}>

          {/* LEFT: Copy */}
          <div>
            {/* XPS Badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(246,184,0,0.12)", border: "1px solid #F6B800", borderRadius: 20, padding: "5px 14px", marginBottom: 20 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#F6B800" }} />
              <span style={{ color: "#F6B800", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
                Powered by Xtreme Polishing Systems — America's #1 Epoxy Super Store
              </span>
            </div>

            <h1 style={{ color: "#fff", fontSize: "clamp(32px, 5vw, 58px)", fontWeight: 900, lineHeight: 1.1, margin: "0 0 20px" }}>
              Phoenix's Most Advanced<br />
              <span style={{ color: "#F6B800" }}>Epoxy Floor</span><br />
              Coating System
            </h1>

            <p style={{ color: "#ccc", fontSize: 17, lineHeight: 1.6, marginBottom: 28, maxWidth: 520 }}>
              Garage floors, commercial spaces, patios & polished concrete.
              Digital bid in 10 minutes. Real-time project tracking.
              Backed by XPS-certified materials.
            </p>

            {/* Trust badges */}
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 32 }}>
              {[
                { num: "4.9★", label: "Google Rating" },
                { num: "200+", label: "Phoenix Jobs" },
                { num: "24hr", label: "Bid Turnaround" },
                { num: "Lifetime", label: "Warranty" },
              ].map(({ num, label }) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div style={{ color: "#F6B800", fontSize: 20, fontWeight: 900 }}>{num}</div>
                  <div style={{ color: "#888", fontSize: 11 }}>{label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="/digital-estimator" style={{ background: "#F6B800", color: "#000", fontWeight: 800, fontSize: 15, padding: "14px 28px", borderRadius: 8, textDecoration: "none" }}>
                Get My Digital Bid — Free
              </a>
              <a href="https://wa.me/16025550100" target="_blank" rel="noopener noreferrer"
                style={{ background: "transparent", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 28px", borderRadius: 8, textDecoration: "none", border: "1px solid #444" }}>
                💬 WhatsApp Us
              </a>
            </div>
          </div>

          {/* RIGHT: Lead Form */}
          <div style={{ background: "rgba(10,10,10,0.92)", border: "1px solid #333", borderRadius: 16, padding: "36px 28px", backdropFilter: "blur(12px)" }}>
            <div style={{ color: "#F6B800", fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
              Get Your Free Digital Bid
            </div>
            <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 900, margin: "0 0 6px" }}>
              See Your Floor Transformed
            </h2>
            <p style={{ color: "#888", fontSize: 13, margin: "0 0 24px" }}>
              Upload a photo. See your finish in real time. Bid ready in 10 minutes.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { key: "name",  placeholder: "Your Full Name",    type: "text"  },
                { key: "email", placeholder: "Email Address",     type: "email" },
                { key: "phone", placeholder: "Phone / WhatsApp",  type: "tel"   },
              ].map(({ key, placeholder, type }) => (
                <input key={key} type={type} required placeholder={placeholder}
                  value={form[key as keyof typeof form]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  style={{ background: "#141414", border: "1px solid #333", borderRadius: 8, padding: "12px 14px", color: "#fff", fontSize: 14, outline: "none", width: "100%", boxSizing: "border-box" }}
                />
              ))}

              <button type="submit" disabled={submitting}
                style={{ background: "#F6B800", color: "#000", fontWeight: 800, fontSize: 15, padding: 14, borderRadius: 8, border: "none", cursor: "pointer", marginTop: 4 }}>
                {submitting ? "Getting Your Bid Ready..." : "Start My Digital Bid →"}
              </button>
            </form>

            <p style={{ color: "#555", fontSize: 11, textAlign: "center", margin: "14px 0 0" }}>
              No spam. No sales calls. Just your digital bid.
            </p>

            <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid #222", textAlign: "center" }}>
              <span style={{ color: "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: 1 }}>
                Powered by
              </span>
              <div style={{ color: "#F6B800", fontSize: 11, fontWeight: 700, marginTop: 2 }}>
                Xtreme Polishing Systems<br />
                <span style={{ color: "#666", fontWeight: 400 }}>America's #1 All-American Epoxy Super Store</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ background: "#0f0f0f", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ color: "#F6B800", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Our Services</div>
            <h2 style={{ color: "#fff", fontSize: 36, fontWeight: 900, margin: 0 }}>
              Every Epoxy System. One Certified Team.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {[
              { title: "Garage Floors", desc: "Full broadcast flake, metallic, solid color, polyaspartic. 1-day install.", img: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-service-garage.webp?v=1781648581" },
              { title: "Metallic Epoxy", desc: "Custom metallic pigment systems. Every pour is unique.", img: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-service-commercial.webp?v=1781648591" },
              { title: "Commercial Floors", desc: "Industrial epoxy, polished concrete, safety striping.", img: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-service-patio.webp?v=1781648601" },
              { title: "Polished Concrete", desc: "Grind, hone, polish, seal. Showroom-quality finish.", img: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-service-repair.webp?v=1781648616" },
            ].map(({ title, desc, img }) => (
              <div key={title} style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #222" }}>
                <div style={{ height: 180, backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <div style={{ background: "#141414", padding: "16px" }}>
                  <div style={{ color: "#fff", fontWeight: 800, fontSize: 15, marginBottom: 6 }}>{title}</div>
                  <div style={{ color: "#888", fontSize: 13 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — THE DOMINOS TRACKER MOMENT */}
      <section style={{ background: "#080808", padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ color: "#F6B800", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Full Transparency</div>
            <h2 style={{ color: "#fff", fontSize: 36, fontWeight: 900, margin: "0 0 12px" }}>
              You Know Where Your Project Stands. Always.
            </h2>
            <p style={{ color: "#888", fontSize: 16 }}>Real-time tracking from first contact to final sign-off.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { step: "01", title: "Submit Your Digital Bid", sub: "3-field form. Upload your floor photo. See your finish in the visualizer. Bid ready in 10 minutes.", status: "done" },
              { step: "02", title: "Receive Your Quote + Create Account", sub: "Transparent line-item bid with exact XPS materials. Sign in to view, approve, and track.", status: "done" },
              { step: "03", title: "Approve & Schedule", sub: "Digital approval. Deposit via Square. Your install date locked in Google Calendar.", status: "active" },
              { step: "04", title: "Install Day — Live Updates", sub: "Crew checks in. Color approval before product opens. Photo updates throughout. No surprises.", status: "" },
              { step: "05", title: "Final Approval + Google Review", sub: "Sign off digitally. Balance paid. Warranty issued. Maintenance guide delivered.", status: "" },
            ].map(({ step, title, sub, status }) => (
              <div key={step} style={{ display: "flex", gap: 20, padding: "20px 0", borderBottom: "1px solid #1a1a1a", alignItems: "flex-start" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: status === "done" ? "#F6B800" : status === "active" ? "#fff" : "#222", color: status === "done" ? "#000" : status === "active" ? "#000" : "#666", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, flexShrink: 0 }}>
                  {status === "done" ? "✓" : step}
                </div>
                <div>
                  <div style={{ color: status ? "#fff" : "#888", fontWeight: 800, fontSize: 16 }}>{title}</div>
                  <div style={{ color: "#666", fontSize: 13, marginTop: 4 }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COLOR CHARTS */}
      <section style={{ background: "#0f0f0f", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ color: "#F6B800", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>XPS Color Systems</div>
            <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 900, margin: 0 }}>Choose Your Finish</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {[
              { label: "Full Broadcast Flake", img: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-top-flake-colors-approved.png?v=1781670774" },
              { label: "Metallic Epoxy", img: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-top-metallic-colors-standardized.png?v=1781670766" },
              { label: "Solid Color Base", img: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-solid-color-epoxy-base-coats.png?v=1781680330" },
            ].map(({ label, img }) => (
              <div key={label} style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #222" }}>
                <img src={img} alt={label} style={{ width: "100%", display: "block" }} />
                <div style={{ background: "#141414", padding: "12px 16px", color: "#fff", fontWeight: 700, fontSize: 14 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <section style={{ background: "#F6B800", padding: "60px 24px", textAlign: "center" }}>
        <h2 style={{ color: "#000", fontSize: 32, fontWeight: 900, margin: "0 0 12px" }}>
          Ready to Transform Your Floor?
        </h2>
        <p style={{ color: "#333", fontSize: 16, margin: "0 0 28px" }}>
          Digital bid in 10 minutes. No sales call required.
        </p>
        <a href="/digital-estimator" style={{ background: "#000", color: "#F6B800", fontWeight: 800, fontSize: 16, padding: "16px 36px", borderRadius: 8, textDecoration: "none" }}>
          Start My Digital Bid →
        </a>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#030303", padding: "32px 24px", textAlign: "center", borderTop: "1px solid #111" }}>
        <div style={{ color: "#F6B800", fontWeight: 800, fontSize: 14, marginBottom: 4 }}>EPOXY NATION PRO</div>
        <div style={{ color: "#555", fontSize: 12, marginBottom: 12 }}>Phoenix, AZ  ·  (602) 555-0100</div>
        <div style={{ color: "#444", fontSize: 11 }}>
          Powered by <span style={{ color: "#F6B800" }}>Xtreme Polishing Systems</span> — America's #1 All-American Epoxy Super Store
        </div>
        <div style={{ color: "#333", fontSize: 10, marginTop: 12 }}>
          © 2026 Epoxy Nation Pro. All rights reserved.
        </div>
      </footer>

    </main>
  );
}
