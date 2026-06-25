import { MobileNavigation } from "../components/MobileNavigation";

const heroImage = "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-service-garage.webp?v=1781648581";

const intakeItems = [
  ["01", "Customer Basics", "Full name, address, email, phone, ZIP code, and ASAP service request start the bid cleanly."],
  ["02", "Floor Details", "Measurements, existing covering, concrete condition, desired finish, desired color, and notes give the estimator real context."],
  ["03", "Multiple Photo Uploads", "Customers can attach current floor photos plus pictures of floors they like from XPS, the website, or online."],
  ["04", "24-Hour Email Review", "Jeremy receives the package, reviews it, and sends the estimate, warranty information, and proposal path by email."],
  ["05", "15% Coupon Attached", "The Digital Bid discount stays connected to the request so the customer sees why finishing the intake matters."],
  ["06", "Tracker Handoff", "After proposal approval and payment link completion, temporary job tracker access can be issued." ]
];

const finishDetails = [
  "Full broadcast flake, metallic epoxy, quartz, solid color, glitter accents, polished concrete, and sealed concrete paths are represented.",
  "Color options follow the selected finish, including Natural Concrete for polished and sealed concrete requests.",
  "Existing floor choices include bare concrete, paint, laminate, tile, VCT, peeling epoxy, and carpet.",
  "Concrete condition choices capture new, fair with some cracks, or bad with cracks and holes."
];

export default function DigitalBidPage() {
  return (
    <main className="branded-page">
      <header className="portal-login-header branded-page-header">
        <a href="/" aria-label="Back to Phoenix Epoxy Pros">
          <img src="/images/logo-header.webp" alt="Phoenix Epoxy Pros" />
        </a>
        <MobileNavigation />
        <a className="portal-home-link" href="/digital-estimator">Open estimator</a>
      </header>

      <section className="branded-hero" aria-label="Digital Bid System">
        <div className="branded-hero-media" aria-hidden="true">
          <img src={heroImage} alt="" />
        </div>
        <div className="branded-hero-copy">
          <span className="section-kicker">Digital Bid System</span>
          <h1>Get a cleaner floor estimate without waiting on a phone chain.</h1>
          <p>
            The XPS Digital Bid captures the exact information needed to price the floor: measurements, current surface,
            concrete condition, finish direction, color choice, photos, inspiration images, and the 15% estimator coupon.
          </p>
          <div className="branded-hero-actions">
            <a className="gold-button" href="/digital-estimator">Start Digital Bid</a>
            <a className="dark-button" href="/portal-system">See Portal System</a>
          </div>
        </div>
        <aside className="branded-hero-panel">
          <h2>Included With Every Digital Bid</h2>
          <ul>
            <li>15% digital estimator coupon</li>
            <li>Guaranteed estimate review within 24 hours</li>
            <li>Multiple job image uploads</li>
            <li>Warranty information by email</li>
            <li>Job tracker handoff after proposal approval</li>
          </ul>
        </aside>
      </section>

      <section className="branded-band light">
        <div className="branded-section-head">
          <span className="section-kicker">What It Collects</span>
          <h2>The estimator asks the right questions up front.</h2>
          <p>
            The goal is to remove back-and-forth, protect the customer discount, and give Jeremy the full package needed
            to create a warranty-backed proposal quickly.
          </p>
        </div>
        <div className="branded-grid three">
          {intakeItems.map(([number, title, text]) => (
            <article className="branded-card" key={title}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="branded-band">
        <div className="branded-section-head">
          <span className="section-kicker">Finish Logic</span>
          <h2>Color, finish, and condition stay connected.</h2>
          <p>
            A good estimate depends on the finish system. The Digital Bid keeps color choices tied to the selected finish,
            while also capturing what is already on the floor and how much repair work may be needed.
          </p>
        </div>
        <ul className="branded-check-list">
          {finishDetails.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
