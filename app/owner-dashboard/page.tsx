"use client";
import { DashboardShell } from "../components/DashboardShell";

export default function OwnerDashboardPage() {
  return (
    <DashboardShell role="owner" roleLabel="Owner" user="Jeremy Bensen — Owner" active="Overview">

      {/* Revenue KPIs */}
      <div className="ds-kpi-row">
        {[
          { label: "Monthly Revenue",   value: "$42,800", sub: "+18% vs last month",     color: "#10b981" },
          { label: "Leads This Month",  value: "34",      sub: "+9 vs last month",        color: "#3b82f6" },
          { label: "Conversion Rate",   value: "28%",     sub: "-2% vs target",           color: "#f59e0b" },
          { label: "Avg Job Value",     value: "$4,850",  sub: "Up from $4,100",          color: "#050505" },
        ].map(({ label, value, sub, color }) => (
          <div className="ds-kpi" key={label}>
            <p className="ds-kpi-label">{label}</p>
            <p className="ds-kpi-value" style={{ color }}>{value}</p>
            <p className="ds-kpi-sub">{sub}</p>
          </div>
        ))}
      </div>

      {/* Pipeline Stages */}
      <div className="ds-card">
        <div className="ds-card-head"><h2 className="ds-card-title">Pipeline by Stage</h2></div>
        <div className="ds-card-body" style={{ padding: 0 }}>
          <table className="ds-table">
            <thead>
              <tr>{["Stage","Count","Value","Action"].map(h=><th key={h}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {[
                ["New Leads",      "12", "$58,200",  "blue"  ],
                ["Proposal Sent",  "7",  "$34,100",  "amber" ],
                ["Deposit Paid",   "4",  "$19,400",  "green" ],
                ["Scheduled",      "2",  "$9,700",   "green" ],
                ["Completed",      "9",  "$43,650",  "blue"  ],
              ].map(([stage,count,value,cls])=>(
                <tr key={stage as string}>
                  <td style={{ fontWeight:700 }}>{stage}</td>
                  <td>{count}</td>
                  <td style={{ fontWeight:700 }}>{value}</td>
                  <td><span className={`ds-badge ${cls}`}>{stage as string}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Navigation tiles */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
        {[
          { title:"Operations Dashboard", desc:"All leads, proposals, active jobs, and crew schedule.", href:"/admin-dashboard", cta:"Open Ops" },
          { title:"Crew Board",           desc:"Installer job list, daily photos, and change orders.",  href:"/crew-dashboard",  cta:"View Crew" },
          { title:"Customer Portals",     desc:"Customer project tracking, color charts, and WhatsApp.", href:"/customer-portal/dashboard", cta:"View Portal" },
        ].map(({ title, desc, href, cta }) => (
          <div className="ds-card ds-card-body" key={title} style={{ padding:"22px 24px" }}>
            <h3 style={{ fontWeight:900, textTransform:"uppercase", margin:"0 0 8px", fontSize:".9rem" }}>{title}</h3>
            <p style={{ color:"#888", fontSize:".84rem", margin:"0 0 16px" }}>{desc}</p>
            <a className="ds-btn dark" href={href}>{cta}</a>
          </div>
        ))}
      </div>

    </DashboardShell>
  );
}
