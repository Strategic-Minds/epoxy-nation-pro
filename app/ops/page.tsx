"use client";
import { DashboardShell } from "../components/DashboardShell";

const jobs = [
  { id: "J-1001", name: "Smith Residence",   time: "8:00 AM",  status: "In Progress" },
  { id: "J-1002", name: "Johnson Warehouse", time: "10:30 AM", status: "In Progress" },
  { id: "J-1003", name: "Garcia Residence",  time: "1:00 PM",  status: "Scheduled"   },
];

export default function OpsPage() {
  return (
    <DashboardShell role="installer" roleLabel="Installer / Ops" user="Desktop Command Center" active="Command Center">

      {/* KPIs */}
      <div className="ds-kpi-row">
        {[
          { label: "Today's Jobs",       value: "12", sub: "Across all crews"      },
          { label: "In Progress",        value: "7",  sub: "Active right now"      },
          { label: "Completed",          value: "5",  sub: "Today"                 },
          { label: "Open Change Orders", value: "3",  sub: "Awaiting approval"     },
        ].map(({ label, value, sub }) => (
          <div className="ds-kpi" key={label}>
            <p className="ds-kpi-label">{label}</p>
            <p className="ds-kpi-value">{value}</p>
            <p className="ds-kpi-sub">{sub}</p>
          </div>
        ))}
      </div>

      {/* Jobs Overview */}
      <div className="ds-card">
        <div className="ds-card-head">
          <h2 className="ds-card-title">Jobs Overview</h2>
          <a className="ds-btn gold" href="/admin-dashboard">Full Admin View</a>
        </div>
        <div className="ds-card-body" style={{ padding:0 }}>
          <table className="ds-table">
            <thead>
              <tr>{["Job","Customer","Time","Status","Action"].map(h=><th key={h}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td style={{ fontWeight:900, color:"#f6b800" }}>{job.id}</td>
                  <td style={{ fontWeight:700 }}>{job.name}</td>
                  <td>{job.time}</td>
                  <td><span className={`ds-badge ${job.status === "In Progress" ? "green" : "blue"}`}>{job.status}</span></td>
                  <td><a className="ds-btn" href="#" style={{ fontSize:".76rem", padding:"5px 12px" }}>Open</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick nav to other dashboards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
        {[
          { title:"Admin Dashboard",    href:"/admin-dashboard",            cta:"Open Admin"    },
          { title:"Owner Overview",     href:"/owner-dashboard",            cta:"Owner View"    },
          { title:"Crew Board",         href:"/crew-dashboard",             cta:"View Crew"     },
        ].map(({ title, href, cta }) => (
          <div className="ds-card ds-card-body" key={title} style={{ padding:"20px 22px" }}>
            <h3 style={{ fontWeight:900, textTransform:"uppercase", fontSize:".88rem", margin:"0 0 10px" }}>{title}</h3>
            <a className="ds-btn dark" href={href}>{cta}</a>
          </div>
        ))}
      </div>

    </DashboardShell>
  );
}
