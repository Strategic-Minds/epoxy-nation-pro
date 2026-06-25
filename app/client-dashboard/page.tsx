"use client";

import { useEffect, useMemo, useState } from "react";

type AttachmentSummary = {
  name: string;
  type?: string;
  size?: number;
  stored?: boolean;
  path?: string;
};

type DashboardLead = {
  fullName?: string;
  email?: string;
  phone?: string;
  zipCode?: string;
  address?: string;
  projectType?: string;
  floorMeasurements?: string;
  existingFloorCovering?: string;
  concreteCondition?: string;
  desiredFinish?: string;
  desiredColor?: string;
  asapServiceRequested?: string;
  asapNotes?: string;
  preferredTimeline?: string;
  timeline?: string;
  notes?: string;
  attachments?: AttachmentSummary[];
  attachmentCount?: number;
  submittedAt?: string;
  score?: string;
  leadId?: string;
  storedInSupabase?: string;
  notificationSent?: string;
  deliveryMode?: string;
  estimateRecipient?: string;
  coupon?: string;
  estimateGuarantee?: string;
  proposalWorkflow?: string;
};

const workflowSteps = [
  {
    key: "submitted",
    number: "01",
    title: "Digital Bid Submitted",
    status: "Complete",
    text: "Contact details, address, floor measurements, current floor, concrete condition, finish, color, notes, ASAP request, and image names are attached to this request."
  },
  {
    key: "review",
    number: "02",
    title: "Estimator Review",
    status: "In Review",
    text: "Jeremy reviews the photos, measurements, existing floor covering, concrete condition, desired finish, selected color, and urgency notes."
  },
  {
    key: "proposal",
    number: "03",
    title: "Proposal + Warranty Email",
    status: "Next",
    text: "The estimate is delivered by email within the 24-hour path with scope, warranty information, 15% Digital Estimator coupon, and recommended system."
  },
  {
    key: "payment",
    number: "04",
    title: "Payment Link",
    status: "After Approval",
    text: "After the proposal is approved, XPS sends the payment link so the job can move from estimate to active project."
  },
  {
    key: "tracker",
    number: "05",
    title: "Job Tracker Access",
    status: "After Payment",
    text: "Temporary tracker access is sent after payment, with schedule checkpoints, documents, warranty details, messages, and progress updates."
  }
];

const colorMap: Record<string, string> = {
  Domino: "#d7d8d8",
  "Tidal Wave": "#6d7f8a",
  Creekbed: "#8d826e",
  "Cabin Fever": "#7f705d",
  Gravel: "#777b7c",
  Nightfall: "#2d3337",
  "Pearl White": "#f2f1eb",
  Graphite: "#3d4144",
  "Silver Smoke": "#9aa0a3",
  "Copper Drift": "#a56b42",
  "Ocean Blue": "#1f6f9f",
  "Black Marble": "#101112",
  "Natural Concrete": "#a6a197",
  "Light Natural": "#c1beb5",
  "Warm Natural": "#b0a38d",
  "Salt and Pepper": "#8d8f8b",
  "Charcoal Natural": "#4c4f4d",
  "Natural Quartz": "#d3c7ac",
  "Dolphin Gray": "#7f878c",
  "Tan Blend": "#b9a07c",
  "Black / White Blend": "#2a2a2a",
  "Light Gray": "#b9bdc1",
  "Medium Gray": "#7d8387",
  "Tile Red": "#9e332b",
  "Safety Yellow": "#f6b800",
  Black: "#050505",
  White: "#ffffff",
  "Silver Glitter": "#cfd3d6",
  "Gold Glitter": "#d4a531",
  "Blue Metallic": "#286f9f",
  "Copper Metallic": "#a65f35",
  "Pearl Accent": "#f1eee5"
};

function readStoredDashboard() {
  try {
    const stored = window.sessionStorage.getItem("xpsClientDashboard");
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function formatDate(value?: string) {
  if (!value) return "Just submitted";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Just submitted";
  return date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

function display(value?: string, fallback = "Not provided yet") {
  return value && value.trim() ? value : fallback;
}

function fileSize(size?: number) {
  if (!size) return "size pending";
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ClientDashboardPage() {
  const [lead, setLead] = useState<DashboardLead>({});
  const [activeStep, setActiveStep] = useState("review");
  const [checkedActions, setCheckedActions] = useState<string[]>(["review-details"]);

  useEffect(() => {
    const storedLead = readStoredDashboard();
    const params = new URLSearchParams(window.location.search);
    setLead({
      ...storedLead,
      fullName: params.get("fullName") || storedLead.fullName || "Your project",
      email: params.get("email") || storedLead.email || "",
      phone: params.get("phone") || storedLead.phone || "",
      zipCode: params.get("zipCode") || storedLead.zipCode || "",
      projectType: params.get("projectType") || storedLead.projectType || "Digital Bid",
      desiredFinish: params.get("finish") || storedLead.desiredFinish || "Finish pending",
      desiredColor: params.get("color") || storedLead.desiredColor || "Color pending",
      asapServiceRequested: params.get("asap") || storedLead.asapServiceRequested || "no"
    });
  }, []);

  const isAsap = lead.asapServiceRequested === "yes";
  const submittedAt = useMemo(() => formatDate(lead.submittedAt), [lead.submittedAt]);
  const statusLabel = isAsap ? "ASAP Review Requested" : "Estimator Review Queued";
  const colorValue = lead.desiredColor || "Color pending";
  const swatchColor = colorMap[colorValue] || "#f6b800";
  const attachments = lead.attachments || [];
  const attachmentCount = lead.attachmentCount ?? attachments.length;
  const activeWorkflow = workflowSteps.find((step) => step.key === activeStep) || workflowSteps[1];
  const deliveryLabel = lead.notificationSent === "yes"
    ? "Email sent to Jeremy"
    : lead.storedInSupabase === "yes"
      ? "Saved for review"
      : "Delivery needs connection check";

  function openChat() {
    window.dispatchEvent(new CustomEvent("xps:open-chat"));
  }

  function toggleAction(action: string) {
    setCheckedActions((current) => current.includes(action)
      ? current.filter((item) => item !== action)
      : [...current, action]
    );
  }

  return (
    <main className="portal-login-page client-dashboard-page">
      <header className="portal-login-header">
        <a href="/" aria-label="Back to Phoenix Epoxy Pros">
          <img src="/images/logo-header.webp" alt="Phoenix Epoxy Pros" />
        </a>
        <nav className="client-dashboard-nav" aria-label="Dashboard links">
          <a className="portal-home-link" href="/digital-estimator">Update bid</a>
          <a className="portal-home-link" href="/job-tracker">View tracker</a>
          <a className="portal-home-link" href="tel:17722090266">Call XPS</a>
        </nav>
      </header>

      <section className="client-dashboard-hero" aria-label="Client dashboard">
        <div className="client-dashboard-copy">
          <span className="section-kicker">Client Dashboard</span>
          <h1>Your Digital Bid is now in motion.</h1>
          <p>
            This dashboard keeps the estimate package, selected finish, chosen color, ASAP request, image uploads,
            proposal path, payment link step, and job tracker handoff in one clean view.
          </p>
          <div className="portal-proof-row" aria-label="Dashboard status">
            <span>{statusLabel}</span>
            <span>15% coupon attached</span>
            <span>24-hour estimate path</span>
            <span>{deliveryLabel}</span>
          </div>
        </div>

        <aside className="client-dashboard-card dashboard-status-card">
          <span className={`job-tracker-status-pill ${isAsap ? "asap" : ""}`}>{statusLabel}</span>
          <h2>{lead.fullName || "Your Project"}</h2>
          <dl>
            <dt>Submitted</dt>
            <dd>{submittedAt}</dd>
            <dt>Project</dt>
            <dd>{display(lead.projectType, "Digital Bid")}</dd>
            <dt>Email</dt>
            <dd>{display(lead.email, "Email pending")}</dd>
            <dt>Phone</dt>
            <dd>{display(lead.phone, "Phone pending")}</dd>
            <dt>ZIP</dt>
            <dd>{display(lead.zipCode, "ZIP pending")}</dd>
            <dt>Lead ID</dt>
            <dd>{display(lead.leadId, "Created after queue confirmation")}</dd>
          </dl>
        </aside>
      </section>

      <section className="client-dashboard-command" aria-label="Digital bid command center">
        <article className="client-dashboard-color-card">
          <span className="section-kicker">Selected Finish</span>
          <div className="dashboard-color-row">
            <span className="dashboard-color-swatch" style={{ background: swatchColor }} aria-hidden="true" />
            <div>
              <h2>{display(lead.desiredFinish, "Finish pending")}</h2>
              <p>{display(lead.desiredColor, "Color pending")}</p>
            </div>
          </div>
        </article>

        <article className="client-dashboard-metric-card">
          <span className="section-kicker">15% Coupon</span>
          <strong>Attached</strong>
          <p>{lead.coupon || "15% Digital Estimator coupon"}</p>
        </article>

        <article className="client-dashboard-metric-card">
          <span className="section-kicker">Uploaded Images</span>
          <strong>{attachmentCount}</strong>
          <p>Floor photos and inspiration screenshots connected to this estimate package.</p>
        </article>

        <article className="client-dashboard-metric-card">
          <span className="section-kicker">Delivery</span>
          <strong>{deliveryLabel}</strong>
          <p>Estimate review is routed to {lead.estimateRecipient || "jeremy@shopxps.com"} when email is configured.</p>
        </article>
      </section>

      <section className="client-dashboard-workflow" aria-label="Interactive workflow tracker">
        <div className="client-dashboard-workflow-head">
          <span className="section-kicker">Workflow</span>
          <h2>From digital bid to tracked job</h2>
          <p>{activeWorkflow.text}</p>
        </div>
        <div className="client-workflow-step-list" role="tablist" aria-label="Estimate workflow steps">
          {workflowSteps.map((step) => (
            <button
              key={step.key}
              className={`client-workflow-step ${activeStep === step.key ? "active" : ""}`}
              type="button"
              onClick={() => setActiveStep(step.key)}
            >
              <span>{step.number}</span>
              <strong>{step.title}</strong>
              <small>{step.status}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="client-dashboard-summary" aria-label="Submitted project summary">
        <article>
          <span className="section-kicker">Estimate Package</span>
          <h2>What XPS received</h2>
          <div className="client-dashboard-grid">
            <p><strong>Address</strong><span>{display(lead.address)}</span></p>
            <p><strong>Measurements</strong><span>{display(lead.floorMeasurements)}</span></p>
            <p><strong>Existing Floor</strong><span>{display(lead.existingFloorCovering)}</span></p>
            <p><strong>Concrete Condition</strong><span>{display(lead.concreteCondition)}</span></p>
            <p><strong>Desired Finish</strong><span>{display(lead.desiredFinish)}</span></p>
            <p><strong>Desired Color</strong><span>{display(lead.desiredColor)}</span></p>
            <p><strong>Preferred Timeline</strong><span>{display(lead.preferredTimeline || lead.timeline)}</span></p>
            <p><strong>Project Notes</strong><span>{display(lead.notes)}</span></p>
          </div>
        </article>

        <aside className="client-dashboard-asap-card">
          <span className="section-kicker">ASAP Service</span>
          <h2>{isAsap ? "Flagged for urgent review" : "Standard review"}</h2>
          <p>
            {isAsap
              ? "This request is marked ASAP. Use instant chat for any urgent access, schedule, or business-down details."
              : "Need faster service? Open instant chat and mark the message as ASAP so the request is routed with urgency."}
          </p>
          {lead.asapNotes ? <p className="client-dashboard-note"><strong>ASAP note:</strong> {lead.asapNotes}</p> : null}
          <button className="gold-button dashboard-chat-button" type="button" onClick={openChat}>Open Instant Chat</button>
        </aside>
      </section>

      <section className="client-dashboard-assets" aria-label="Images and client actions">
        <article className="client-dashboard-upload-list">
          <span className="section-kicker">Images</span>
          <h2>Uploaded floor package</h2>
          {attachments.length ? (
            <ul>
              {attachments.map((file, index) => (
                <li key={`${file.name}-${index}`}>
                  <strong>{file.name}</strong>
                  <span>{file.type || "image"} / {fileSize(file.size)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No images are listed in this browser session yet. If you submitted photos, they are handled by the estimator package delivery path.</p>
          )}
        </article>

        <article className="client-dashboard-actions-card">
          <span className="section-kicker">Client Actions</span>
          <h2>Keep the bid moving</h2>
          <label>
            <input type="checkbox" checked={checkedActions.includes("review-details")} onChange={() => toggleAction("review-details")} />
            <span>Review finish, color, measurement, and concrete condition details.</span>
          </label>
          <label>
            <input type="checkbox" checked={checkedActions.includes("watch-email")} onChange={() => toggleAction("watch-email")} />
            <span>Watch email for the proposal, warranty information, and 15% coupon estimate.</span>
          </label>
          <label>
            <input type="checkbox" checked={checkedActions.includes("payment-link")} onChange={() => toggleAction("payment-link")} />
            <span>Use the payment link after proposal approval to unlock temporary tracker access.</span>
          </label>
          <div className="dashboard-action-row">
            <a className="gold-button" href="/digital-estimator">Update Bid Details</a>
            <button className="gold-button secondary" type="button" onClick={openChat}>Ask A Question</button>
          </div>
        </article>
      </section>
    </main>
  );
}
