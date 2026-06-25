"use client";
import { brand } from "@/lib/brand";

const allSteps = [
  { num: 1, label: "Project Submitted", date: "Jun 18", done: true },
  { num: 2, label: "Quote Ready", date: "Jun 19", done: true },
  { num: 3, label: "Contract Signed", date: "Jun 20", done: true },
  { num: 4, label: "Install Date Confirmed", date: "Jun 21", done: true },
  { num: 5, label: "Prep Checklist", date: "Jun 22", done: true },
  { num: 6, label: "Installer En Route", date: "Jun 26 7:30 AM", done: false, active: true },
  { num: 7, label: "Walkthrough", date: "", done: false },
  { num: 8, label: "Surface Prep / Grind", date: "", done: false },
  { num: 9, label: "Base Coat", date: "", done: false },
  { num: 10, label: "Flake Broadcast", date: "", done: false },
  { num: 11, label: "Topcoat Applied", date: "", done: false },
  { num: 12, label: "Color Approval", date: "", done: false },
  { num: 13, label: "Final Photos", date: "", done: false },
  { num: 14, label: "Customer Walkthrough", date: "", done: false },
  { num: 15, label: "Warranty Delivered", date: "", done: false },
];

export default function ProjectPage({ params }: { params: { id: string } }) {
  return (
    <main style={{ minHeight: "100vh", background: "#f5f5f5", fontFamily: "Inter, sans-serif" }}>
      {/* Nav */}
      <nav style={{ background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", height: 64, position: "sticky", top: 0, zIndex: 50 }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <img src={"/images/logo-header.webp"} alt={brand.name} style={{ height: 40, width: 40, borderRadius: 6, background: "#333" }} />
          <div style={{ color: "#d4a017", fontWeight: 900, fontSize: "1rem", textTransform: "uppercase", letterSpacing: 1 }}>Phoenix Epoxy Pros</div>
        </a>
        <div style={{ display: "flex", gap: 32 }}>
          {["Dashboard", "Projects", "Documents", "Messages", "Visualizer", "Call"].map((item) => (
            <a key={item} href={item === "Dashboard" ? "/customer-dashboard" : "#"} style={{ color: item === "Projects" ? "#d4a017" : "#ccc", fontWeight: 600, fontSize: ".9rem", textDecoration: "none" }}>{item}</a>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#d4a017", display: "grid", placeItems: "center", fontWeight: 900, color: "#1a1a1a", fontSize: ".88rem" }}>JL</div>
          <a href="/digital-estimator" style={{ background: "#d4a017", color: "#1a1a1a", fontWeight: 900, padding: "10px 22px", borderRadius: 6, fontSize: ".9rem", textDecoration: "none" }}>Get Quote</a>
        </div>
      </nav>

      {/* Header */}
      <div style={{ padding: "24px 32px 0", maxWidth: 1400, margin: "0 auto" }}>
        <a href="/customer-dashboard" style={{ color: "#888", fontSize: ".85rem", textDecoration: "none" }}>← Back to Projects</a>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 8 }}>
          <h1 style={{ margin: 0, fontSize: "1.8rem", fontWeight: 900 }}>Garcia Residence</h1>
          <span style={{ background: "#fef3c7", color: "#92400e", fontWeight: 700, fontSize: ".78rem", padding: "4px 12px", borderRadius: 999, textTransform: "uppercase" }}>In Progress</span>
        </div>
        <p style={{ margin: "6px 0 0", color: "#666", fontSize: ".88rem" }}>4421 W Cactus Rd, Phoenix AZ 85031 · Project ID: PXP-2026-0042 · Garage Floor · 620 sq ft</p>
      </div>

      {/* 4-panel grid */}
      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr 280px 240px", gap: 20, padding: "20px 32px 100px", maxWidth: 1400, margin: "0 auto" }}>
        {/* LEFT — 15-step progress list */}
        <div style={{ background: "#fff", borderRadius: 12, padding: "22px", border: "1px solid #e5e7eb" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontWeight: 900, fontSize: "1rem" }}>Project Progress</h3>
            <span style={{ fontSize: ".78rem", color: "#888" }}>{allSteps.filter(s => s.done).length} of {allSteps.length} Steps</span>
          </div>
          <div style={{ display: "grid", gap: 6 }}>
            {allSteps.map((step) => (
              <div key={step.num} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 6, background: step.active ? "#fef9ec" : "transparent", border: step.active ? "1px solid #d4a017" : "1px solid transparent" }}>
                <div style={{
                  width: 26, height: 26, borderRadius: "50%", flexShrink: 0, display: "grid", placeItems: "center", fontSize: ".75rem", fontWeight: 900,
                  background: step.done ? "#d4a017" : step.active ? "#d4a017" : "#e5e7eb",
                  color: step.done || step.active ? "#1a1a1a" : "#999"
                }}>
                  {step.done && !step.active ? "✓" : step.num}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: ".82rem", fontWeight: step.active ? 900 : 600, color: step.active ? "#1a1a1a" : step.done ? "#333" : "#999" }}>{step.label}</p>
                </div>
                {step.date && <span style={{ fontSize: ".72rem", color: "#aaa", whiteSpace: "nowrap" }}>{step.date}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* CENTER — Install details + daily progress */}
        <div style={{ display: "grid", gap: 20, alignContent: "start" }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: "24px 28px", border: "1px solid #e5e7eb" }}>
            <h3 style={{ margin: "0 0 20px", fontWeight: 900, fontSize: "1.1rem" }}>Install Details</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              {[
                { label: "Install Date", value: "Jun 26, 2026" },
                { label: "Arrival Window", value: "7:30 AM – 8:00 AM" },
                { label: "Floor System", value: "Full Broadcast Flake" },
                { label: "Selected Color", value: "Gravel — Light Gray Base" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ margin: "0 0 2px", fontSize: ".72rem", color: "#888", fontWeight: 700, textTransform: "uppercase" }}>{label}</p>
                  <p style={{ margin: 0, fontWeight: 700 }}>{value}</p>
                </div>
              ))}
            </div>
            <a href="#" style={{ display: "block", textAlign: "center", border: "1px solid #e5e7eb", borderRadius: 8, padding: "12px", color: "#333", fontWeight: 700, textDecoration: "none", fontSize: ".9rem" }}>Reschedule</a>
          </div>

          <div style={{ background: "#fff", borderRadius: 12, padding: "24px 28px", border: "1px solid #e5e7eb" }}>
            <h3 style={{ margin: "0 0 16px", fontWeight: 900, fontSize: "1.1rem" }}>Daily Progress</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
              {[1,2,3,4].map((i) => (
                <div key={i} style={{ borderRadius: 8, overflow: "hidden", aspectRatio: "1", background: "#e5e7eb", display: "grid", placeItems: "center" }}>
                  <span style={{ fontSize: "1.5rem" }}>📷</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Crew leader */}
        <div style={{ display: "grid", gap: 20, alignContent: "start" }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: "22px", border: "1px solid #e5e7eb" }}>
            <h3 style={{ margin: "0 0 14px", fontWeight: 900, fontSize: "1rem" }}>Crew Leader</h3>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#d4a017", display: "grid", placeItems: "center", fontWeight: 900, fontSize: "1.2rem", color: "#1a1a1a" }}>MR</div>
              <div>
                <p style={{ margin: 0, fontWeight: 900 }}>Miguel Rodriguez</p>
                <p style={{ margin: "2px 0", fontSize: ".82rem", color: "#666" }}>Lead Installer</p>
                <p style={{ margin: 0, fontSize: ".8rem", color: "#d4a017", fontWeight: 700 }}>⭐ 4.9 (127 reviews)</p>
              </div>
            </div>
            <a href="tel:+16025550182" style={{ display: "block", textAlign: "center", background: "#1a1a1a", color: "#fff", fontWeight: 700, padding: "12px", borderRadius: 8, textDecoration: "none", fontSize: ".9rem" }}>📞 Call Crew Leader</a>
          </div>

          <div style={{ background: "#fff", borderRadius: 12, padding: "22px", border: "1px solid #e5e7eb" }}>
            <h3 style={{ margin: "0 0 12px", fontWeight: 900, fontSize: "1rem" }}>Messages</h3>
            <p style={{ margin: "0 0 14px", color: "#666", fontSize: ".85rem" }}>Send a message to the team directly.</p>
            <textarea placeholder="Type a message..." style={{ width: "100%", minHeight: 80, border: "1px solid #e5e7eb", borderRadius: 6, padding: "10px 12px", fontSize: ".85rem", resize: "vertical", fontFamily: "Inter, sans-serif" }} />
            <a href="#" style={{ display: "block", textAlign: "center", background: "#d4a017", color: "#1a1a1a", fontWeight: 700, padding: "10px", borderRadius: 8, textDecoration: "none", fontSize: ".88rem", marginTop: 10 }}>Send Message</a>
          </div>
        </div>

        {/* FAR RIGHT — Color approval */}
        <div style={{ display: "grid", gap: 20, alignContent: "start" }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: "22px", border: "1px solid #e5e7eb" }}>
            <h3 style={{ margin: "0 0 12px", fontWeight: 900, fontSize: "1rem" }}>Color Approval</h3>
            <div style={{ borderRadius: 8, overflow: "hidden", aspectRatio: "1", background: "repeating-linear-gradient(135deg,#2a2a2a 0,#2a2a2a 20px,#4a4a4a 20px,#4a4a4a 40px)", marginBottom: 12 }} />
            <p style={{ margin: "0 0 2px", fontWeight: 900 }}>Domino</p>
            <p style={{ margin: "0 0 4px", fontSize: ".82rem", color: "#666" }}>Full Broadcast</p>
            <p style={{ margin: "0 0 16px", fontSize: ".82rem", color: "#666" }}>Base: Light Gray</p>
            <a href="#" style={{ display: "block", textAlign: "center", background: "#d4a017", color: "#1a1a1a", fontWeight: 700, padding: "10px", borderRadius: 8, textDecoration: "none", fontSize: ".88rem" }}>Review & Approve</a>
          </div>

          <div style={{ background: "#fff", borderRadius: 12, padding: "22px", border: "1px solid #e5e7eb" }}>
            <h3 style={{ margin: "0 0 12px", fontWeight: 900, fontSize: "1rem" }}>Documents</h3>
            {["Contract.pdf", "Warranty.pdf", "Care Guide.pdf"].map((doc) => (
              <a key={doc} href="#" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid #f0f0f0", textDecoration: "none", color: "#333", fontSize: ".85rem" }}>
                📄 {doc} <span style={{ color: "#d4a017", fontSize: ".8rem" }}>Download</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#1a1a1a", display: "flex", justifyContent: "space-around", padding: "10px 0 16px", borderTop: "1px solid #333" }}>
        {[["🏠","Home"],["🎨","Visualizer"],["📋","Projects"],["⭐","Favorites"],["💬","Quote"]].map(([icon, label]) => (
          <a key={label as string} href="#" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, color: "#999", textDecoration: "none", fontSize: ".7rem" }}>
            <span style={{ fontSize: "1.2rem" }}>{icon}</span>{label}
          </a>
        ))}
      </nav>
    </main>
  );
}
