const chartBoards = [
  {
    id: "flake",
    title: "Top Flake Colors",
    subtitle: "Full-broadcast flake finish options.",
    image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-top-flake-colors-approved.png?v=1781670774",
    alt: "XPS top 12 epoxy flake color chart"
  },
  {
    id: "metallic",
    title: "Top Metallic Colors",
    subtitle: "Decorative metallic epoxy finish options.",
    image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-top-metallic-colors-standardized.png?v=1781670766",
    alt: "XPS top metallic colors chart"
  },
  {
    id: "quartz",
    title: "Top Quartz Colors",
    subtitle: "Quartz texture finish options.",
    image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-top-quartz-colors-standardized.png?v=1781670783",
    alt: "XPS top quartz colors chart"
  },
  {
    id: "solid",
    title: "Solid Color Epoxy Base Coats",
    subtitle: "Solid color epoxy is typically used as the base coat during the application process.",
    image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-solid-color-epoxy-base-coats.png?v=1781680330",
    alt: "XPS solid color epoxy base coat chart"
  },
  {
    id: "glitter",
    title: "Top Glitter Additive Colors",
    subtitle: "Glitter is an additive, but it can also be used to create an overall sparkle look.",
    image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-top-glitter-additive-colors.png?v=1781680348",
    alt: "XPS top glitter additive color chart"
  },
  {
    id: "stain",
    title: "Concrete Dye & Stain Colors",
    subtitle: "Concrete dye and stain options for polished or decorative concrete color direction.",
    image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-concrete-dye-stain-colors.png?v=1781680338",
    alt: "XPS concrete dye and stain color chart"
  }
];

export function FinishVisualizer() {
  return (
    <section className="xps-flake-chart-section" id="color-chart" aria-label="Epoxy color charts">
      <div className="xps-custom-color-note">
        <strong>Don&apos;t see your color?</strong>
        <span>Contact us, we have many other custom colors perfect for you!</span>
      </div>
      <div className="xps-chart-board">
        <div className="xps-chart-board-grid">
          {chartBoards.map((board) => (
            <article className="xps-chart-frame" key={board.id}>
              <div className="xps-chart-copy">
                <h2>{board.title}</h2>
                <p>{board.subtitle}</p>
              </div>
              <div className="xps-chart-image-shell" data-chart={board.id}>
                <img src={board.image} alt={board.alt} />
              </div>
            </article>
          ))}
        </div>
        <p className="xps-chart-disclaimer">
          Due to computer screen differences, some colors may slightly differ in person, and especially when sealer is applied which may give it a &quot;wet look&quot; which enriches the color.
        </p>
      </div>
    </section>
  );
}
