"use client";
import { useState } from "react";
import { DashboardShell } from "../../components/DashboardShell";
import { COLOR_CHARTS } from "../../lib/color-charts";

const STEPS = [
  { num: 1, label: "Bid Submitted",    sub: "Complete",        state: "done"   },
  { num: 2, label: "Estimator Review", sub: "In Progress",     state: "active" },
  { num: 3, label: "Proposal Sent",    sub: "Next",            state: ""       },
  { num: 4, label: "Approve & Pay",    sub: "After Proposal",  state: ""       },
  { num: 5, label: "Install Scheduled",sub: "After Payment",   state: ""       },
];

const CHECKLIST = [
  { label: "Contact info submitted",        done: true  },
  { label: "Photos uploaded",               done: true  },
  { label: "Floor measurements provided",   done: true  },
  { label: "Finish & color selected",       done: false, active: true },
  { label: "Proposal received",             done: false },
  { label: "Proposal approved",             done: false },
  { label: "Deposit payment completed",     done: false },
  { label: "Install date confirmed",        done: false },
  { label: "Pre-install prep done",         done: false },
  { label: "Installation complete",         done: false },
  { label: "Final walkthrough & sign-off",  done: false },
  { label: "Warranty issued",               done: false },
];

export default function CustomerDashboardPage() {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [selectedChart, setSelectedChart] = useState<string | null>(null);

  function handleFloorUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewSrc(url);
  }

  return (
    <DashboardShell role="customer" roleLabel="Customer Portal" user="Jason L." active="My Dashboard">

      <style>{`
        .cd-welcome { display:grid; grid-template-columns:1fr; gap:0; }
        .cd-welcome-body { padding:20px 16px; display:flex; flex-direction:column; gap:10px; }
        .cd-welcome-photo { height:180px; overflow:hidden; }
        .cd-welcome-photo img { width:100%; height:100%; object-fit:cover; }
        .cd-welcome-status { padding:16px; background:#fffbeb; border-top:1px solid #fde68a; }
        @media(min-width:600px) {
          .cd-welcome { grid-template-columns:1fr 2fr 1fr; }
          .cd-welcome-photo { height:auto; min-height:180px; }
          .cd-welcome-status { border-top:none; border-left:1px solid #fde68a; }
        }
      `}</style>

      {/* ── WELCOME CARD ── */}
      <div className="ds-card">
        <div className="cd-welcome">
          <div className="cd-welcome-body">
            <p style={{ margin: 0, fontSize: ".68rem", fontWeight: 900, textTransform: "uppercase", color: "#888" }}>Welcome back</p>
            <h1 style={{ margin: 0, fontSize: "1.6rem", fontWeight: 900 }}>Jason!</h1>
            <p style={{ margin: 0, fontSize: ".82rem", color: "#666" }}>Your project is in estimator review. Proposal ready within 24 hrs.</p>
            <a className="ds-btn gold full" href="https://wa.me/17722090266" target="_blank" rel="noopener noreferrer" style={{ marginTop: 4 }}>
              📱 WhatsApp Us
            </a>
          </div>
          <div className="cd-welcome-photo">
            <img src="https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-service-garage.webp?v=1781648581" alt="Your project" />
          </div>
          <div className="cd-welcome-status">
            <p style={{ margin: "0 0 4px", fontSize: ".68rem", fontWeight: 900, textTransform: "uppercase", color: "#f6b800" }}>Current Status</p>
            <h2 style={{ margin: "0 0 6px", fontSize: "1rem", fontWeight: 900 }}>Estimator Review</h2>
            <p style={{ margin: "0 0 10px", fontSize: ".78rem", color: "#666" }}>Watch email for your proposal + 15% coupon.</p>
            <a className="ds-btn dark full" href="https://wa.me/17722090266" target="_blank" rel="noopener noreferrer" style={{ fontSize: ".76rem" }}>Ask a Question</a>
          </div>
        </div>
      </div>

      {/* ── KPI ROW ── */}
      <div className="ds-kpi-row">
        {[
          { label: "Project ID",   value: "PXP-0587",     sub: "Keep for reference" },
          { label: "System",       value: "Full Broadcast",sub: "Garage Floor" },
          { label: "Discount",     value: "15% OFF",       sub: "Digital bid coupon" },
          { label: "Estimate ETA", value: "24 hrs",        sub: "Proposal by email" },
        ].map(({ label, value, sub }) => (
          <div className="ds-kpi" key={label}>
            <p className="ds-kpi-label">{label}</p>
            <p className="ds-kpi-value">{value}</p>
            <p className="ds-kpi-sub">{sub}</p>
          </div>
        ))}
      </div>

      {/* ── PROJECT TIMELINE ── */}
      <div className="ds-card">
        <div className="ds-card-head">
          <h2 className="ds-card-title">Project Timeline</h2>
        </div>
        <div className="ds-card-body">
          <div className="ds-timeline">
            {STEPS.map((step) => (
              <div key={step.num} className={`ds-timeline-step ${step.state}`}>
                <div className="ds-bubble">{step.state === "done" ? "✓" : step.num}</div>
                <div className="ds-timeline-step-info">
                  <strong>{step.label}</strong>
                  <span>{step.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CHECKLIST ── */}
      <div className="ds-card">
        <div className="ds-card-head">
          <h2 className="ds-card-title">Project Checklist</h2>
          <span className="ds-badge amber">3 / 12 Done</span>
        </div>
        <div className="ds-card-body">
          <div className="ds-step-list">
            {CHECKLIST.map((item, i) => (
              <div
                key={item.label}
                className={`ds-step${item.done ? " done" : item.active ? " active" : ""}`}
              >
                <div className="ds-step-num">{item.done ? "✓" : i + 1}</div>
                <div className="ds-step-info">
                  <strong>{item.label}</strong>
                  <span>{item.done ? "Complete" : item.active ? "Action needed" : "Pending"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── COLOR CHARTS ── */}
      <div className="ds-card" id="colors">
        <div className="ds-card-head">
          <h2 className="ds-card-title">Choose Your Finish</h2>
          <span className="ds-badge blue">{COLOR_CHARTS.length} Systems</span>
        </div>
        <div className="ds-card-body">
          {selectedChart && (
            <div style={{ marginBottom: 16, padding: 12, background: "#fffbeb", borderRadius: 8, border: "1px solid #fde68a", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: ".84rem", fontWeight: 900 }}>Selected: {selectedChart}</span>
              <button className="ds-btn" style={{ fontSize: ".72rem" }} onClick={() => setSelectedChart(null)}>Clear</button>
            </div>
          )}
          <div className="ds-color-charts">
            {COLOR_CHARTS.map((chart) => (
              <div
                key={chart.title}
                className="ds-color-chart-card"
                style={{ cursor: "pointer", outline: selectedChart === chart.title ? "2px solid #f6b800" : "none" }}
                onClick={() => setSelectedChart(chart.title)}
              >
                <img src={chart.image} alt={chart.title} loading="lazy" />
                <div className="ds-color-chart-info">
                  <h3>{chart.title}</h3>
                  <p>{chart.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FLOOR DESIGNER ── */}
      <div className="ds-card" id="design">
        <div className="ds-card-head">
          <h2 className="ds-card-title">Floor Designer</h2>
        </div>
        <div className="ds-floor-designer">
          <div className="ds-floor-preview">
            {previewSrc
              ? <img src={previewSrc} alt="Your floor preview" />
              : <>
                  <div style={{ fontSize: "2.5rem" }}>🏠</div>
                  <p style={{ margin: 0, fontSize: ".82rem", color: "rgba(255,255,255,.6)", textAlign: "center" }}>Upload a photo to visualize your floor</p>
                </>
            }
          </div>
          <div className="ds-floor-upload">
            <h3 style={{ margin: "0 0 8px", fontSize: ".9rem", fontWeight: 900 }}>Upload Your Floor Photo</h3>
            <label className="ds-drop-zone" htmlFor="floor-upload-input">
              📷 Tap to upload floor photo
              <span style={{ fontSize: ".72rem", fontWeight: 400 }}>JPG, PNG, HEIC accepted</span>
            </label>
            <input
              id="floor-upload-input"
              type="file"
              accept="image/*"
              capture="environment"
              style={{ display: "none" }}
              onChange={handleFloorUpload}
            />
            {selectedChart && (
              <div style={{ background: "#f4f5f6", borderRadius: 6, padding: 12 }}>
                <p style={{ margin: "0 0 4px", fontSize: ".72rem", fontWeight: 900, textTransform: "uppercase", color: "#888" }}>Selected Finish</p>
                <p style={{ margin: 0, fontSize: ".88rem", fontWeight: 900 }}>{selectedChart}</p>
              </div>
            )}
            <a className="ds-btn gold full" href="https://wa.me/17722090266" target="_blank" rel="noopener noreferrer">
              💬 Send to Estimator
            </a>
          </div>
        </div>
      </div>

      {/* ── DOCUMENTS ── */}
      <div className="ds-card">
        <div className="ds-card-head">
          <h2 className="ds-card-title">Documents</h2>
        </div>
        <div className="ds-card-body">
          <table className="ds-table">
            <thead>
              <tr>
                <th>Document</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { doc: "Digital Bid Intake",    status: "complete", badge: "green" },
                { doc: "Project Proposal",      status: "pending",  badge: "amber" },
                { doc: "Deposit Invoice",       status: "pending",  badge: "amber" },
                { doc: "Install Agreement",     status: "pending",  badge: "amber" },
                { doc: "Warranty Certificate",  status: "pending",  badge: "amber" },
              ].map(({ doc, status, badge }) => (
                <tr key={doc}>
                  <td style={{ fontWeight: 700 }}>{doc}</td>
                  <td><span className={`ds-badge ${badge}`}>{status}</span></td>
                  <td>
                    {status === "complete"
                      ? <a href="#" className="ds-btn" style={{ fontSize: ".72rem", padding: "4px 10px" }}>View</a>
                      : <span style={{ color: "#aaa", fontSize: ".78rem" }}>—</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </DashboardShell>
  );
}
