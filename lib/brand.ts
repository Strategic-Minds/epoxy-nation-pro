// EPOXY NATION PRO — Brand Configuration
// Powered by Xtreme Polishing Systems — America's #1 All-American Epoxy Super Store

export const BRAND = {
  name: "Epoxy Nation Pro",
  tagline: "Epoxy Nation Pro — Phoenix's Premier Epoxy & Concrete Coating Specialists",
  phone: "(602) 555-0100",
  whatsapp: "16025550100",
  email: "info@epoxynationpro.com",
  city: "Phoenix",
  state: "Arizona",
  stateAbbr: "AZ",
  markets: ["Phoenix", "Scottsdale", "Tempe", "Mesa", "Chandler", "Gilbert", "Glendale", "Peoria"],
  poweredBy: "Xtreme Polishing Systems",
  poweredByUrl: "https://xtremepolishingsystems.com",
  poweredByTagline: "America's #1 All-American Epoxy Super Store",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  googleMapsKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "",
} as const;
