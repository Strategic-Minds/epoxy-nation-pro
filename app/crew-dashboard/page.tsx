"use client";
import { DashboardShell } from "../components/DashboardShell";

const jobs = [
  { id: "J-1001", name: "Smith Residence",    address: "1234 Maple Dr.",      system: "Garage Floor", sqft: "2,000", status: "In Progress", photos: "4",  checklists: "2/6" },
  { id: "J-1002", name: "Johnson Warehouse",  address: "4921 N 23rd Ave",     system: "Warehouse",    sqft: "8,500", status: "In Progress", photos: "2",  checklists: "1/6" },
  { id: "J-1003", name: "Garcia Residence",   address: "7890 E Desert Cove",  system: "Garage Floor", sqft: "450",   status: "Scheduled",   photos: "0",  checklists: "0/6" },
];

export default function CrewDashboardPage() {
  return (
    <DashboardShell role="crew" roleLabel="Crew" user="Installer View" active="My Jobs">

      {/* KPIs */}
      <div className="ds-kpi-row">
        {[
          { label: "Today's Jobs",    value: "3",    sub: "2 in progress" },
          { label: "Photos Uploaded", value: "6",    sub: "Across all active jobs" },
          { label: "Open Change Orders", value: "1", sub: "Awaiting approval" },
          { label: "Completed Today", value: "0",    sub: "In progress" },
        ].map(({ label, value, sub }) => (
          <div className="ds-kpi" key={label}>
            <p className="ds-kpi-label">{label}</p>
            <p className="ds-kpi-value">{value}</p>
            <p className="ds-kpi-sub">{sub}</p>
          </div>
        ))}
      </div>

      {/* Jobs Table */}
      <div className="ds-card">
        <div className="ds-card-head">
          <h2 className="ds-card-title">Today's Jobs</h2>
          <span style={{ fontSize:".78rem", color:"#888" }}>Tap a job to open details</span>
        </div>
        <div className="ds-card-body" style={{ padding:0, overflowX:"auto" }}>
          <table className="ds-table">
            <thead>
              <tr>{["Job ID","Customer","Address","System","Sq Ft","Status","Photos","Checklist","Actions"].map(h=><th key={h}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td style={{ fontWeight:900, color:"#f6b800" }}>{job.id}</td>
                  <td style={{ fontWeight:700 }}>{job.name}</td>
                  <td style={{ color:"#888" }}>{job.address}</td>
                  <td>{job.system}</td>
                  <td>{job.sqft} sqft</td>
                  <td><span className={`ds-badge ${job.status === "In Progress" ? "green" : "blue"}`}>{job.status}</span></td>
                  <td>{job.photos}</td>
                  <td>{job.checklists}</td>
                  <td style={{ display:"flex", gap:6 }}>
                    <a className="ds-btn" href="#" style={{ fontSize:".72rem", padding:"5px 10px" }}>Open</a>
                    <a className="ds-btn" href="#" style={{ fontSize:".72rem", padding:"5px 10px" }}>📷</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Daily actions */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16 }}>
        {[
          { title:"Upload Photos",       desc:"Add progress photos to the active job record.", cta:"Upload Now",     cls:"gold"  },
          { title:"Change Order",        desc:"Submit a change order for scope adjustments.",  cta:"New Change Order",cls:"dark" },
          { title:"Color Approval",      desc:"Request customer sign-off on the chosen color.", cta:"Send Request",  cls:""      },
        ].map(({ title, desc, cta, cls }) => (
          <div className="ds-card ds-card-body" key={title} style={{ padding:"22px 24px" }}>
            <h3 style={{ fontWeight:900, textTransform:"uppercase", margin:"0 0 8px", fontSize:".88rem" }}>{title}</h3>
            <p style={{ color:"#888", fontSize:".84rem", margin:"0 0 16px" }}>{desc}</p>
            <a className={`ds-btn ${cls}`} href="#">{cta}</a>
          </div>
        ))}
      </div>

    </DashboardShell>
  );
}
