"use client";
import { DashboardShell } from "../components/DashboardShell";

const jobs = [
  { id: "J-1001", name: "Smith Residence",    time: "8:00 AM",  sqft: "2,000", system: "Garage Floor", status: "In Progress", checklist: "2/6", photos: "4"  },
  { id: "J-1002", name: "Johnson Warehouse",  time: "10:30 AM", sqft: "8,500", system: "Warehouse",    status: "In Progress", checklist: "1/6", photos: "2"  },
  { id: "J-1003", name: "Garcia Residence",   time: "1:00 PM",  sqft: "450",   system: "Garage Floor", status: "Scheduled",   checklist: "0/6", photos: "0"  },
];

export default function InstallerPage() {
  return (
    <DashboardShell role="installer" roleLabel="Installer" user="Field View" active="My Jobs">

      <div className="ds-kpi-row">
        {[
          { label: "Active Jobs",       value: "2",  sub: "In progress now" },
          { label: "Scheduled Today",   value: "1",  sub: "Garcia 1:00 PM"  },
          { label: "Photos Uploaded",   value: "6",  sub: "Across all jobs" },
          { label: "Open Change Orders",value: "1",  sub: "Pending approval"},
        ].map(({ label, value, sub }) => (
          <div className="ds-kpi" key={label}>
            <p className="ds-kpi-label">{label}</p>
            <p className="ds-kpi-value">{value}</p>
            <p className="ds-kpi-sub">{sub}</p>
          </div>
        ))}
      </div>

      <div className="ds-card">
        <div className="ds-card-head">
          <h2 className="ds-card-title">My Jobs Today</h2>
          <a className="ds-btn" href="/ops">Command Center View</a>
        </div>
        <div className="ds-card-body" style={{ padding: 0, overflowX: "auto" }}>
          <table className="ds-table">
            <thead>
              <tr>{["Job","Customer","Time","System","Sq Ft","Status","Checklist","Photos","Actions"].map(h=><th key={h}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td style={{ fontWeight: 900, color: "#f6b800" }}>{job.id}</td>
                  <td style={{ fontWeight: 700 }}>{job.name}</td>
                  <td>{job.time}</td>
                  <td>{job.system}</td>
                  <td>{job.sqft} sqft</td>
                  <td><span className={`ds-badge ${job.status === "In Progress" ? "green" : "blue"}`}>{job.status}</span></td>
                  <td>{job.checklist}</td>
                  <td>{job.photos}</td>
                  <td style={{ display: "flex", gap: 6 }}>
                    <a className="ds-btn" style={{ fontSize: ".72rem", padding: "5px 10px" }} href="#">Open</a>
                    <a className="ds-btn" style={{ fontSize: ".72rem", padding: "5px 10px" }} href="#">📷 Photos</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        {[
          { title: "Upload Photos",     desc: "Add progress photos to the active job record.",  cls: "gold",  cta: "Upload Now"        },
          { title: "Change Order",      desc: "Submit a scope change for customer approval.",    cls: "dark",  cta: "New Change Order"  },
          { title: "Color Approval",    desc: "Send color approval request to the customer.",   cls: "",      cta: "Send Request"      },
        ].map(({ title, desc, cls, cta }) => (
          <div className="ds-card ds-card-body" key={title} style={{ padding: "22px 24px" }}>
            <h3 style={{ fontWeight: 900, textTransform: "uppercase", fontSize: ".88rem", margin: "0 0 8px" }}>{title}</h3>
            <p style={{ color: "#888", fontSize: ".84rem", margin: "0 0 16px" }}>{desc}</p>
            <a className={`ds-btn ${cls}`} href="#">{cta}</a>
          </div>
        ))}
      </div>

    </DashboardShell>
  );
}
