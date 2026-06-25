"use client";
import { brand } from "@/lib/brand";

const timelineSteps = [
  { num: 1, label: "Quote Approved", date: "Jun 18", done: true },
  { num: 2, label: "Contract Signed", date: "Jun 19", done: true },
  { num: 3, label: "Prep Complete", date: "Jun 20", done: true },
  { num: 4, label: "Installation", date: "Jun 26", done: false, active: true },
  { num: 5, label: "Complete", date: "", done: false },
];

export default function CustomerDashboardPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#f5f5f5", fontFamily: "Inter, sans-serif" }}>
      {/* Nav */}
      <nav style={{ background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", height: 64, position: "sticky", top: 0, zIndex: 50 }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <img src={"/images/logo-header.webp"} alt={brand.name} style={{ height: 40, width: 40, borderRadius: 6, background: "#333", objectFit: "contain" }} />
          <div>
            <div style={{ color: "#d4a017", fontWeight: 900, fontSize: "1rem", textTransform: "uppercase", letterSpacing: 1 }}>Phoenix Epoxy Pros</div>
          </div>
        </a>
        <div style={{ display: "flex", gap: 32 }}>
          {["Dashboard", "Projects", "Documents", "Messages", "Visualizer", "Call"].map((item) => (
            <a key={item} href="#" style={{ color: item === "Dashboard" ? "#d4a017" : "#ccc", fontWeight: 600, fontSize: ".9rem", textDecoration: "none", borderBottom: item === "Dashboard" ? "2px solid #d4a017" : "none", paddingBottom: 2 }}>{item}</a>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#d4a017", display: "grid", placeItems: "center", fontWeight: 900, color: "#1a1a1a", fontSize: ".88rem" }}>JL</div>
            <span style={{ color: "#ccc", fontSize: ".9rem" }}>Hi, Jason</span>
          </div>
          <a href="/digital-estimator" style={{ background: "#d4a017", color: "#1a1a1a", fontWeight: 900, padding: "10px 22px", borderRadius: 6, fontSize: ".9rem", textDecoration: "none" }}>Get Quote</a>
        </div>
      </nav>

      {/* Main 3-panel dashboard */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", gap: 20, padding: "28px 32px", maxWidth: 1400, margin: "0 auto" }}>
        {/* LEFT — Welcome */}
        <div style={{ background: "#fff", borderRadius: 12, overflow: "hidden", border: "1px solid #e5e7eb" }}>
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
            alt="Garage floor"
            style={{ width: "100%", height: 200, objectFit: "cover" }}
          />
          <div style={{ padding: "20px 22px" }}>
            <p style={{ margin: "0 0 4px", color: "#888", fontSize: ".85rem" }}>Welcome back,</p>
            <h2 style={{ margin: "0 0 12px", fontSize: "2rem", fontWeight: 900 }}>Jason!</h2>
            <p style={{ margin: "0 0 20px", color: "#555", fontSize: ".9rem", lineHeight: 1.5 }}>Your project is on track. We are excited to bring your new floor to life.</p>
            <a href="#" style={{ display: "inline-block", background: "#1a1a1a", color: "#fff", fontWeight: 700, padding: "10px 22px", borderRadius: 6, fontSize: ".88rem", textDecoration: "none" }}>View My Project</a>
          </div>
        </div>

        {/* CENTER — Project status & timeline */}
        <div style={{ display: "grid", gap: 20 }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: "28px 32px", border: "1px solid #e5e7eb" }}>
            <p style={{ margin: "0 0 6px", fontSize: ".75rem", fontWeight: 900, textTransform: "uppercase", color: "#d4a017", letterSpacing: 1 }}>Current Project Status</p>
            <h2 style={{ margin: "0 0 12px", fontSize: "1.8rem", fontWeight: 900 }}>Installation Scheduled</h2>
            <p style={{ margin: "0 0 28px", color: "#555", fontSize: ".92rem" }}>Your installation date is confirmed. We are getting everything ready.</p>

            {/* Step tracker */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 0, marginBottom: 24 }}>
              {timelineSteps.map((step, i) => (
                <div key={step.num} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                  {/* Connector line */}
                  {i < timelineSteps.length - 1 && (
                    <div style={{ position: "absolute", top: 20, left: "50%", width: "100%", height: 2, background: step.done ? "#d4a017" : "#e5e7eb", zIndex: 0 }} />
                  )}
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%", zIndex: 1,
                    display: "grid", placeItems: "center", fontWeight: 900, fontSize: ".88rem",
                    background: step.active ? "#d4a017" : step.done ? "#d4a017" : "#e5e7eb",
                    color: step.active || step.done ? "#1a1a1a" : "#999",
                    border: step.active ? "3px solid #1a1a1a" : "none",
                  }}>
                    {step.done && !step.active ? "✓" : step.num}
                  </div>
                  <p style={{ margin: "8px 0 2px", fontSize: ".75rem", fontWeight: 700, textAlign: "center" }}>{step.label}</p>
                  {step.date && <p style={{ margin: 0, fontSize: ".7rem", color: "#999" }}>{step.date}</p>}
                </div>
              ))}
            </div>

            <a href="#" style={{ display: "block", textAlign: "center", border: "1px solid #e5e7eb", borderRadius: 8, padding: "12px", color: "#333", fontWeight: 700, textDecoration: "none", fontSize: ".9rem" }}>View Full Timeline</a>
          </div>

          {/* Project overview */}
          <div style={{ background: "#fff", borderRadius: 12, padding: "24px 28px", border: "1px solid #e5e7eb" }}>
            <p style={{ margin: "0 0 4px", fontSize: ".75rem", fontWeight: 900, textTransform: "uppercase", color: "#888", letterSpacing: 1 }}>Project Overview</p>
            <h3 style={{ margin: "0 0 16px", fontSize: "1.4rem", fontWeight: 900 }}>Selected Project</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              {[
                { label: "Project ID", value: "PXP-2026-0042" },
                { label: "System Type", value: "Full Broadcast Flake" },
                { label: "Square Footage", value: "620 sq ft" },
                { label: "Install Date", value: "Jun 26, 2026" },
                { label: "Crew Leader", value: "Miguel Rodriguez" },
                { label: "Arrival Window", value: "7:30 AM – 8:00 AM" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ margin: "0 0 2px", fontSize: ".72rem", color: "#888", fontWeight: 700, textTransform: "uppercase" }}>{label}</p>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: ".92rem" }}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Next action + color */}
        <div style={{ display: "grid", gap: 20, alignContent: "start" }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: "24px 22px", border: "1px solid #e5e7eb" }}>
            <p style={{ margin: "0 0 4px", fontSize: ".75rem", fontWeight: 900, textTransform: "uppercase", color: "#d4a017", letterSpacing: 1 }}>Next Action</p>
            <h3 style={{ margin: "0 0 12px", fontSize: "1.3rem", fontWeight: 900 }}>Prep Your Space</h3>
            <p style={{ margin: "0 0 18px", color: "#555", fontSize: ".88rem", lineHeight: 1.5 }}>Complete your pre-installation prep to keep your project on schedule.</p>
            <a href="#" style={{ display: "block", textAlign: "center", background: "#d4a017", color: "#1a1a1a", fontWeight: 900, padding: "12px", borderRadius: 8, textDecoration: "none", fontSize: ".9rem" }}>View Prep Checklist</a>
          </div>

          <div style={{ background: "#fff", borderRadius: 12, padding: "22px", border: "1px solid #e5e7eb" }}>
            <p style={{ margin: "0 0 10px", fontWeight: 900, fontSize: ".88rem" }}>Saved Design / Selected Color</p>
            <div style={{ borderRadius: 8, overflow: "hidden", aspectRatio: "16/9", background: "#1a1a1a", marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "100%", height: "100%", background: "repeating-linear-gradient(135deg, #2a2a2a 0px, #2a2a2a 20px, #4a4a4a 20px, #4a4a4a 40px)" }} />
            </div>
            <p style={{ margin: "0 0 2px", fontWeight: 900 }}>Gravel</p>
            <p style={{ margin: "0 0 14px", fontSize: ".82rem", color: "#666" }}>Full Broadcast · Base: Light Gray</p>
            <a href="/design" style={{ display: "block", textAlign: "center", border: "1px solid #d4a017", color: "#d4a017", fontWeight: 700, padding: "10px", borderRadius: 8, textDecoration: "none", fontSize: ".88rem" }}>Change Design</a>
          </div>

          {/* Quick links */}
          <div style={{ background: "#fff", borderRadius: 12, padding: "20px 22px", border: "1px solid #e5e7eb" }}>
            <p style={{ margin: "0 0 12px", fontWeight: 900 }}>Quick Links</p>
            {["View Contract", "Make Payment", "Message Team", "Schedule Change"].map((label) => (
              <a key={label} href="#" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f0f0f0", textDecoration: "none", color: "#333", fontSize: ".88rem", fontWeight: 600 }}>
                {label} <span style={{ color: "#d4a017" }}>→</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#1a1a1a", display: "flex", justifyContent: "space-around", padding: "10px 0 16px", borderTop: "1px solid #333" }}>
        {[["🏠", "Home"], ["🎨", "Visualizer"], ["📋", "Projects"], ["⭐", "Favorites"], ["💬", "Quote"]].map(([icon, label]) => (
          <a key={label as string} href="#" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, color: "#999", textDecoration: "none", fontSize: ".7rem" }}>
            <span style={{ fontSize: "1.2rem" }}>{icon}</span>{label}
          </a>
        ))}
      </nav>
    </main>
  );
}
