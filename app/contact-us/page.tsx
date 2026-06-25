import { MobileNavigation } from "../components/MobileNavigation";

const phone = "772-209-0266";
const phoneHref = "tel:17722090266";
const email = "JEREMY@SHOPXPS.COM";
const mailHref = `mailto:${email}?subject=Phoenix%20Epoxy%20Pros%20Digital%20Bid`;
const heroImage = "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-service-patio.webp?v=1781648601";

const contactOptions = [
  ["Start Digital Bid", "Best for customers who want the 15% coupon, 24-hour estimate review, upload path, and job tracker handoff.", "/digital-estimator"],
  ["Request ASAP Service", "Use the estimator or portal entry and select ASAP service so the request is visible in the project package.", "/customer-portal"],
  ["Preview Portal System", "See how proposals, payment links, project status, finish selections, photos, and warranty records are intended to connect.", "/portal-system"],
  ["View Gallery", "Look at garage, commercial, patio, repair, and finish examples before choosing a direction.", "/gallery"]
];

export default function ContactUsPage() {
  return (
    <main className="branded-page">
      <header className="portal-login-header branded-page-header">
        <a href="/" aria-label="Back to Phoenix Epoxy Pros">
          <img src="/images/logo-header.webp" alt="Phoenix Epoxy Pros" />
        </a>
        <MobileNavigation />
        <a className="portal-home-link" href="/digital-estimator">Get quote</a>
      </header>

      <section className="branded-hero" aria-label="Contact Phoenix Epoxy Pros">
        <div className="branded-hero-media" aria-hidden="true">
          <img src={heroImage} alt="" />
        </div>
        <div className="branded-hero-copy">
          <span className="section-kicker">Contact Us</span>
          <h1>Send the floor details once and keep the estimate moving.</h1>
          <p>
            For the fastest path, start the Digital Bid and upload the floor photos, measurements, surface condition,
            finish direction, desired color, and any inspiration images. The estimate package is routed for email review.
          </p>
          <div className="branded-hero-actions">
            <a className="gold-button" href="/digital-estimator">Start Digital Bid</a>
            <a className="dark-button" href={phoneHref}>Call {phone}</a>
          </div>
        </div>
        <aside className="branded-hero-panel">
          <h2>Direct Contact</h2>
          <ul>
            <li>Phone: {phone}</li>
            <li>Email: {email}</li>
            <li>Best estimate path: Digital Bid with photos</li>
            <li>ASAP requests: mark ASAP inside the intake</li>
          </ul>
        </aside>
      </section>

      <section className="branded-band light">
        <div className="branded-section-head">
          <span className="section-kicker">Choose A Path</span>
          <h2>Every contact route should lead to a clean next step.</h2>
          <p>
            The Digital Bid is the strongest path because it collects the information needed for a 24-hour estimate,
            proposal, warranty details, and tracker-ready project setup.
          </p>
        </div>
        <div className="branded-grid two">
          {contactOptions.map(([title, text, href]) => (
            <a className="branded-card" href={href} key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="branded-band">
        <div className="contact-grid">
          <article className="contact-panel">
            <span className="section-kicker">Call</span>
            <h3>{phone}</h3>
            <p>Use the phone line for urgent questions, scheduling context, or help deciding which floor system to start with.</p>
            <a className="gold-button" href={phoneHref}>Call Now</a>
          </article>
          <article className="contact-panel">
            <span className="section-kicker">Email</span>
            <h3>{email}</h3>
            <p>Email is the proposal path. Digital Bid submissions are built so the estimate package can be reviewed and answered by email.</p>
            <a className="gold-button" href={mailHref}>Email Jeremy</a>
          </article>
        </div>
      </section>
    </main>
  );
}
