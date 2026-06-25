import { MobileNavigation } from "../components/MobileNavigation";

const heroImage = "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-before-after.webp?v=1781648570";

const workflow = [
  ["Digital Bid Submitted", "The customer sends contact details, measurements, existing floor, concrete condition, finish, color, notes, and photos."],
  ["Estimator Review", "Jeremy reviews the full package and prepares the estimate, warranty information, and proposal path."],
  ["Proposal By Email", "The proposal is delivered to the customer's email, keeping communication simple and documented."],
  ["Payment Link Sent", "After the proposal is accepted, the customer receives the payment link for the approved scope."],
  ["Tracker Access Issued", "Temporary portal details are released after payment so the customer can follow schedule, prep, progress, and warranty items."]
];

const dashboardItems = [
  ["Finish Selections", "The chosen floor finish, desired color, inspiration photos, and color chart direction stay visible in the job record."],
  ["Project Status", "Customers can see received, under review, proposal sent, payment pending, scheduled, in progress, and warranty stages."],
  ["Uploads & Notes", "Floor photos, measurements, existing floor covering, concrete condition, and estimator notes stay connected."],
  ["Messages & Documents", "Proposal status, payment link path, warranty information, care details, and key updates can be organized around one project." ]
];

export default function PortalSystemPage() {
  return (
    <main className="branded-page">
      <header className="portal-login-header branded-page-header">
        <a href="/" aria-label="Back to Phoenix Epoxy Pros">
          <img src="/images/logo-header.webp" alt="Phoenix Epoxy Pros" />
        </a>
        <MobileNavigation />
        <a className="portal-home-link" href="/job-tracker">View tracker</a>
      </header>

      <section className="branded-hero" aria-label="Portal System">
        <div className="branded-hero-media" aria-hidden="true">
          <img src={heroImage} alt="" />
        </div>
        <div className="branded-hero-copy">
          <span className="section-kicker">Portal System</span>
          <h1>A simpler client dashboard from first bid to final warranty.</h1>
          <p>
            The portal strategy keeps the customer path easy: email-first intake, Digital Bid details, proposal delivery,
            payment link follow-up, then temporary job tracker access when the project is ready to move forward.
          </p>
          <div className="branded-hero-actions">
            <a className="gold-button" href="/customer-portal">Start temporary entry</a>
            <a className="dark-button" href="/job-tracker">Preview job tracker</a>
          </div>
        </div>
        <aside className="branded-hero-panel">
          <h2>Client Dashboard Should Show</h2>
          <ul>
            <li>Customer details and service ZIP</li>
            <li>Chosen finish and chosen color</li>
            <li>Uploaded floor and inspiration images</li>
            <li>Proposal, payment, schedule, and warranty status</li>
            <li>Instant chat and ASAP service request visibility</li>
          </ul>
        </aside>
      </section>

      <section className="branded-band light">
        <div className="branded-section-head">
          <span className="section-kicker">Workflow</span>
          <h2>The customer always knows the next step.</h2>
          <p>
            This is the operating path the website is built around now. It keeps the customer from needing a password at
            the start, while still preparing the system for stronger account access later.
          </p>
        </div>
        <div className="branded-grid">
          {workflow.map(([title, text], index) => (
            <article className="branded-card" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="branded-band">
        <div className="branded-section-head">
          <span className="section-kicker">Dashboard Strategy</span>
          <h2>Built around the full bid record, not a blank login screen.</h2>
          <p>
            The client dashboard needs to feel useful immediately. That means showing their actual color, finish,
            measurements, photos, coupon, proposal path, and job status instead of making them hunt for updates.
          </p>
        </div>
        <div className="branded-grid two">
          {dashboardItems.map(([title, text]) => (
            <article className="branded-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
