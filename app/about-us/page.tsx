import { MobileNavigation } from "../components/MobileNavigation";

const heroImage = "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-service-commercial.webp?v=1781648591";

const standards = [
  ["Surface Prep First", "Grinding, crack repair, failed coating removal, and slab review decide whether a coating bonds correctly."],
  ["System Fit", "Garage, commercial, patio, polished concrete, quartz, flake, and metallic systems are matched to how the floor will be used."],
  ["Clear Estimate Path", "The Digital Bid keeps photos, measurements, desired finish, color choice, and warranty information connected."],
  ["Client Visibility", "The Portal System is designed to make project status, proposal details, payment path, schedule, progress, and warranty easier to follow." ]
];

const serviceValues = [
  "Practical guidance before the customer commits to a finish.",
  "Finish and color options that match the surface and use case.",
  "Estimate review by email so the customer has a written proposal path.",
  "A tracker-ready workflow that can grow with the project after approval."
];

export default function AboutUsPage() {
  return (
    <main className="branded-page">
      <header className="portal-login-header branded-page-header">
        <a href="/" aria-label="Back to Phoenix Epoxy Pros">
          <img src="/images/logo-header.webp" alt="Phoenix Epoxy Pros" />
        </a>
        <MobileNavigation />
        <a className="portal-home-link" href="/contact-us">Contact us</a>
      </header>

      <section className="branded-hero" aria-label="About Phoenix Epoxy Pros">
        <div className="branded-hero-media" aria-hidden="true">
          <img src={heroImage} alt="" />
        </div>
        <div className="branded-hero-copy">
          <span className="section-kicker">About Us</span>
          <h1>Floor coating work built around prep, clarity, and follow-through.</h1>
          <p>
            Phoenix Epoxy Pros and the XPS workflow are built for customers who want a better estimate experience, a
            clear finish direction, and a project path they can actually track from the first request forward.
          </p>
          <div className="branded-hero-actions">
            <a className="gold-button" href="/digital-estimator">Start Digital Bid</a>
            <a className="dark-button" href="/gallery">View Gallery</a>
          </div>
        </div>
        <aside className="branded-hero-panel">
          <h2>What We Care About</h2>
          <ul>
            <li>Correct surface preparation</li>
            <li>Real finish system guidance</li>
            <li>Professional client communication</li>
            <li>Clean proposal and warranty handoff</li>
            <li>Job tracking that reduces uncertainty</li>
          </ul>
        </aside>
      </section>

      <section className="branded-band light">
        <div className="branded-section-head">
          <span className="section-kicker">Operating Standards</span>
          <h2>The system is designed around what actually makes a floor successful.</h2>
          <p>
            Most customers do not need more confusion. They need someone to ask the right questions, review the slab,
            guide the finish, and make the next step obvious.
          </p>
        </div>
        <div className="branded-grid two">
          {standards.map(([title, text]) => (
            <article className="branded-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="branded-band">
        <div className="branded-section-head">
          <span className="section-kicker">Customer Experience</span>
          <h2>Less chasing. Better information. Faster proposal decisions.</h2>
          <p>
            The website is being shaped around a full workflow: Digital Bid, email estimate, proposal, payment link,
            temporary tracker access, installation checkpoints, and warranty information.
          </p>
        </div>
        <ul className="branded-check-list">
          {serviceValues.map((value) => (
            <li key={value}>{value}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
