import { MobileNavigation } from "../components/MobileNavigation";

const summaryItems = [
  ["Digital Bid", "Customer details, uploads, measurements, floor condition, finish, and color choices stay attached to one estimate record."],
  ["Proposal Path", "Jeremy reviews the package, sends the proposal by email, and keeps warranty information tied to the estimate."],
  ["Payment Link", "After proposal approval, the payment link is sent before temporary tracker access is released."],
  ["Email-First Access", "The target login model is a secure email link so clients are not forced to remember another password."]
];

const trackerTimeline = [
  ["01", "Digital Bid Submitted", "Customer details, floor measurements, existing covering, concrete condition, colors, and images are received."],
  ["02", "Estimator Review", "Jeremy reviews the package, checks finish fit, and prepares the warranty-backed proposal."],
  ["03", "Proposal Emailed", "The proposal is delivered by email with project scope, warranty information, and the payment link path."],
  ["04", "Payment Confirmed", "After payment, the customer receives temporary job tracker access while email-link login is activated."],
  ["05", "Install Scheduled", "Schedule, prep checklist, finish selections, documents, and messages stay attached to the job."],
  ["06", "Crew Progress", "Progress photos, checkpoints, notes, and change-order needs can be organized by job stage."],
  ["07", "Final Walkthrough", "Completion details, customer notes, final photos, and any remaining action items are documented."],
  ["08", "Warranty & Care", "Warranty details, care instructions, photos, and completion notes remain available after install."]
];

const operatingWorkflow = [
  ["Estimate Intake", "The website collects the contact details first, then the Digital Bid page captures measurements, existing floor, concrete condition, desired finish, desired color, notes, and multiple images."],
  ["Review Queue", "Submissions route to Jeremy for human estimate review before any customer-facing price or warranty claim is sent."],
  ["Proposal + Payment", "The proposal is emailed with scope and warranty details. Payment is handled through a link after approval, then tracker access is released."],
  ["Tracked Delivery", "The tracker organizes schedule, prep, photos, approvals, completion, warranty, care instructions, and post-job records around the customer email." ]
];

const trackerAdvantages = [
  "Clients see what was received and what happens next instead of chasing scattered texts.",
  "Photos, color selections, measurements, proposal status, payment path, and warranty details stay tied to one job.",
  "Email-first access keeps the customer path simple while still allowing a stronger authenticated portal later.",
  "Home office can mature the same workflow into estimator, crew, schedule, billing, and warranty dashboards."
];

export default function JobTrackerPage() {
  return (
    <main className="portal-login-page job-tracker-preview-page">
      <header className="portal-login-header branded-page-header">
        <a href="/" aria-label="Back to Phoenix Epoxy Pros">
          <img src="/images/logo-header.webp" alt="Phoenix Epoxy Pros" />
        </a>
        <MobileNavigation />
        <a className="portal-home-link" href="/digital-estimator">Start digital bid</a>
      </header>

      <section className="portal-login-hero" aria-label="XPS job tracker system preview">
        <div className="portal-login-copy">
          <span className="section-kicker">Job Tracker System</span>
          <h1>Immediate project visibility after the Digital Bid.</h1>
          <p>
            This tracker preview shows the client experience being built: estimate status, proposal handoff, payment link
            follow-up, temporary access, schedule checkpoints, progress photos, warranty information, and care details.
          </p>
          <div className="portal-proof-row" aria-label="Tracker highlights">
            <span>Proposal status</span>
            <span>Payment link path</span>
            <span>Email access target</span>
            <span>Warranty records</span>
          </div>
        </div>

        <aside className="portal-login-panel job-tracker-summary-panel">
          <p className="portal-panel-eyebrow">Client tracking preview</p>
          <h2>Current Job</h2>
          <ul>
            {summaryItems.map(([title, text]) => (
              <li key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="job-tracker-dashboard" aria-label="Tracker dashboard timeline">
        <div className="job-tracker-dashboard-inner">
          <article className="job-tracker-ticket">
            <span className="job-tracker-status-pill">Preview Mode</span>
            <h2>Digital Bid to Installed Floor</h2>
            <dl>
              <dt>Client</dt>
              <dd>Email-connected customer record after proposal approval</dd>
              <dt>Estimate</dt>
              <dd>Guaranteed 24-hour review path</dd>
              <dt>Discount</dt>
              <dd>15% Digital Estimator coupon attached</dd>
              <dt>Next Step</dt>
              <dd>Proposal email, payment link, then tracker access</dd>
            </dl>
          </article>

          <ol className="job-tracker-timeline">
            {trackerTimeline.map(([number, title, text]) => (
              <li key={title}>
                <strong>{number} / {title}</strong>
                <span>{text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="job-tracker-operating-plan" aria-label="Job tracker operating workflow">
        <div className="job-tracker-operating-copy">
          <span className="section-kicker">Workflow Strategy</span>
          <h2>One customer email. One job record. One clear next step.</h2>
          <p>
            The system is intentionally simple for clients now and expandable for operations later. Customers start with an
            email-based estimate path; the business can grow the same record into proposal, scheduling, crew, payment, and warranty workflows.
          </p>
        </div>

        <div className="job-tracker-plan-grid">
          {operatingWorkflow.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="job-tracker-advantage-band" aria-label="Job tracker client advantages">
        <div>
          <span className="section-kicker">Why Clients Like It</span>
          <h2>Less friction. More confidence.</h2>
        </div>
        <ul>
          {trackerAdvantages.map((advantage) => (
            <li key={advantage}>{advantage}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
