import { MobileNavigation } from "../components/MobileNavigation";

const images = {
  hero: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-service-garage.webp?v=1781648581",
  beforeAfter: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-before-after.webp?v=1781648570",
  garage: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-service-garage.webp?v=1781648581",
  commercial: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-service-commercial.webp?v=1781648591",
  patio: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-service-patio.webp?v=1781648601",
  repair: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-service-repair.webp?v=1781648616",
  prep: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-process-02-prep-work.png?v=1781036569",
  base: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-process-03-base-coat.png?v=1781036578",
  beauty: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-process-04-beauty-coat.png?v=1781036586",
  final: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-process-06-final-inspection.png?v=1781036605"
};

const galleryItems = [
  ["Before / After", "Surface prep and finish transformation", images.beforeAfter],
  ["Garage Floor Coatings", "Full-broadcast flake direction", images.garage],
  ["Commercial Floors", "Durable systems for working spaces", images.commercial],
  ["Patios & Outdoor Concrete", "Outdoor surface direction", images.patio],
  ["Repair & Surface Prep", "Cracks, failed coatings, and slab review", images.repair],
  ["Prep Work", "The stage that decides the bond", images.prep],
  ["Base Coat", "System-specific foundation coat", images.base],
  ["Beauty Coat", "Flake, metallic, quartz, and decorative layer", images.beauty],
  ["Final Inspection", "Walkthrough, care guidance, and finish review", images.final]
];

const selectionNotes = [
  "Save or reference any gallery finish you like before starting the Digital Bid.",
  "Upload pictures of floors you currently like, including examples found on this site or online.",
  "Use color charts on the home page to help narrow the desired finish and desired color before submitting."
];

export default function GalleryPage() {
  return (
    <main className="branded-page">
      <header className="portal-login-header branded-page-header">
        <a href="/" aria-label="Back to Phoenix Epoxy Pros">
          <img src="/images/logo-header.webp" alt="Phoenix Epoxy Pros" />
        </a>
        <MobileNavigation />
        <a className="portal-home-link" href="/digital-estimator">Quote a project</a>
      </header>

      <section className="branded-hero" aria-label="Floor project gallery">
        <div className="branded-hero-media" aria-hidden="true">
          <img src={images.hero} alt="" />
        </div>
        <div className="branded-hero-copy">
          <span className="section-kicker">Gallery</span>
          <h1>Find the floor direction before starting the Digital Bid.</h1>
          <p>
            Browse garage, commercial, patio, repair, prep, and finish examples. When you start the estimator, upload any
            photos from this site or online that match the floor look you want.
          </p>
          <div className="branded-hero-actions">
            <a className="gold-button" href="/digital-estimator">Quote A Similar Project</a>
            <a className="dark-button" href="/#color-chart">View Color Charts</a>
          </div>
        </div>
        <aside className="branded-hero-panel">
          <h2>Before You Submit</h2>
          <ul>
            {selectionNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="branded-band light">
        <div className="branded-section-head">
          <span className="section-kicker">Project Examples</span>
          <h2>Use the gallery to guide finish, color, and system direction.</h2>
          <p>
            The estimator works best when customers attach current floor images plus visual references for what they want
            the finished floor to look like.
          </p>
        </div>
        <div className="branded-gallery-grid">
          {galleryItems.map(([title, description, image]) => (
            <a href="/digital-estimator" key={title}>
              <img src={image} alt={`${title} example`} />
              <strong>{title}</strong>
              <span>{description}</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
