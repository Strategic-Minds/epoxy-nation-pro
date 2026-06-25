import { COLOR_CHARTS } from "../lib/color-charts";

export default function DesignPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#f4f5f6", fontFamily: "Arial, Helvetica, sans-serif" }}>
      <header style={{ background: "#050505", padding: "14px clamp(18px,4vw,48px)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/"><img src="/images/logo-header.webp" alt="Phoenix Epoxy Pros" style={{ height: 44 }} /></a>
        <a href="/customer-portal/dashboard" style={{ display: "inline-flex", alignItems: "center", padding: "8px 18px", background: "linear-gradient(180deg,#ffd75a,#f6b800)", color: "#050505", fontWeight: 900, borderRadius: 6, textDecoration: "none", fontSize: ".84rem" }}>Open My Dashboard →</a>
      </header>

      <div style={{ width: "min(100% - 44px, 1300px)", margin: "0 auto", padding: "36px 0 60px" }}>
        <div style={{ marginBottom: 32 }}>
          <p style={{ margin: "0 0 6px", fontSize: ".72rem", fontWeight: 900, textTransform: "uppercase", color: "#f6b800", letterSpacing: ".08em" }}>Floor Design Center</p>
          <h1 style={{ margin: 0, fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 900, textTransform: "uppercase" }}>Choose Your Color System</h1>
          <p style={{ margin: "10px 0 0", color: "#666", fontSize: ".92rem" }}>Browse all available finish systems. Go to your dashboard to select your finish and upload your floor photos.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: 22 }}>
          {COLOR_CHARTS.map((chart) => (
            <div key={chart.id} style={{ background: "#fff", borderRadius: 10, border: "1px solid #e2e6e8", overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,.06)" }}>
              <img src={chart.image} alt={chart.alt} style={{ width: "100%", display: "block" }} />
              <div style={{ padding: "16px 20px 20px" }}>
                <h2 style={{ margin: "0 0 6px", fontSize: "1rem", fontWeight: 900, textTransform: "uppercase" }}>{chart.title}</h2>
                <p style={{ margin: "0 0 14px", fontSize: ".82rem", color: "#888" }}>{chart.subtitle}</p>
                <a href="/customer-portal/dashboard#colors" style={{ display: "inline-flex", alignItems: "center", padding: "8px 18px", background: "linear-gradient(180deg,#ffd75a,#f6b800)", color: "#050505", fontWeight: 900, borderRadius: 6, textDecoration: "none", fontSize: ".8rem" }}>
                  Select This Finish →
                </a>
              </div>
            </div>
          ))}
        </div>

        <p style={{ marginTop: 28, fontSize: ".76rem", color: "#aaa", textAlign: "center" }}>
          Due to screen differences, colors may vary slightly in person. Sealer application may enrich or darken the color.
        </p>
      </div>
    </main>
  );
}
