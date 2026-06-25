"use client";
import { DashboardShell } from "../components/DashboardShell";

const leads = [
  { name: "Mike Torres",   zip: "85001", type: "Garage Floor", status: "new",           score: "hot",  sqft: 620,  submitted: "2h ago"     },
  { name: "Sarah Chen",    zip: "85251", type: "Commercial",   status: "proposal_sent",  score: "warm", sqft: 1800, submitted: "Yesterday"  },
  { name: "James Romero",  zip: "85308", type: "Patio",        status: "deposit_paid",   score: "hot",  sqft: 400,  submitted: "2 days ago" },
  { name: "Linda Park",    zip: "85044", type: "Garage Floor", status: "new",            score: "cold", sqft: 500,  submitted: "3h ago"     },
];

const scoreColor: Record<string, string> = { hot: "red", warm: "amber", cold: "blue" };
const statusBadge: Record<string, { label: string; cls: string }> = {
  new:            { label: "New Lead",      cls: "blue"  },
  proposal_sent:  { label: "Proposal Sent", cls: "amber" },
  deposit_paid:   { label: "Deposit Paid",  cls: "green" },
};

export default function AdminDashboardPage() {
  return (
    <DashboardShell role="admin" roleLabel="Admin" user="Jeremy Bensen — Admin" active="Dashboard">

      {/* KPIs */}
      <div className="ds-kpi-row">
        {[
          { label: "New Leads Today",      value: "4",      sub: "+2 vs yesterday",      color: "#3b82f6" },
          { label: "Proposals Out",        value: "7",      sub: "3 awaiting approval",  color: "#8b5cf6" },
          { label: "Active Jobs",          value: "2",      sub: "Installs this week",   color: "#10b981" },
          { label: "Revenue This Month",   value: "$18,400",sub: "Deposits collected",   color: "#050505" },
        ].map(({ label, value, sub, color }) => (
          <div className="ds-kpi" key={label}>
            <p className="ds-kpi-label">{label}</p>
            <p className="ds-kpi-value" style={{ color }}>{value}</p>
            <p className="ds-kpi-sub">{sub}</p>
          </div>
        ))}
      </div>

      {/* Lead Pipeline */}
      <div className="ds-card">
        <div className="ds-card-head">
          <h2 className="ds-card-title">Lead Pipeline</h2>
          <a className="ds-btn gold" href="/digital-estimator">+ New Lead</a>
        </div>
        <div className="ds-card-body" style={{ padding: 0, overflowX: "auto" }}>
          <table className="ds-table">
            <thead>
              <tr>
                {["Customer", "ZIP", "Type", "Sq Ft", "Score", "Status", "Submitted", "Action"].map(h => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.name}>
                  <td style={{ fontWeight: 700 }}>{lead.name}</td>
                  <td>{lead.zip}</td>
                  <td>{lead.type}</td>
                  <td>{lead.sqft} sqft</td>
                  <td><span className={`ds-badge ${scoreColor[lead.score]}`}>{lead.score}</span></td>
                  <td><span className={`ds-badge ${statusBadge[lead.status].cls}`}>{statusBadge[lead.status].label}</span></td>
                  <td style={{ color: "#888" }}>{lead.submitted}</td>
                  <td><a className="ds-btn" href="#">Review</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="ds-card ds-card-body" style={{ background: "#050505", padding: "22px 24px" }}>
          <h3 style={{ fontWeight: 900, textTransform: "uppercase", color: "#fff", margin: "0 0 8px" }}>Proposals Waiting</h3>
          <p style={{ color: "rgba(255,255,255,.6)", fontSize: ".88rem", margin: "0 0 16px" }}>3 customers haven't approved yet. Send a follow-up.</p>
          <a className="ds-btn gold" href="#">Send Follow-Up</a>
        </div>
        <div className="ds-card ds-card-body" style={{ padding: "22px 24px" }}>
          <h3 style={{ fontWeight: 900, textTransform: "uppercase", margin: "0 0 8px" }}>Crew Schedule</h3>
          <p style={{ color: "#888", fontSize: ".88rem", margin: "0 0 16px" }}>2 installs this week. 1 prep day tomorrow.</p>
          <a className="ds-btn dark" href="/crew-dashboard">View Crew Board</a>
        </div>
      </div>

    </DashboardShell>
  );
}
