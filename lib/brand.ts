// EPOXY NATION PRO — Brand Configuration
// Powered by Xtreme Polishing Systems — America's #1 All-American Epoxy Super Store

export const BRAND = {
  name: "Epoxy Nation Pro",
  tagline: "Phoenix's Premier Epoxy & Concrete Coating Specialists",
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

// Named default export for backward compat
export const brand = BRAND;
export default BRAND;

// Lead scoring utility
export function scoreLead(data: {
  sqft?: number;
  projectType?: string;
  timeline?: string;
  source?: string;
}): number {
  let score = 50;
  if (data.sqft && data.sqft > 400) score += 15;
  if (data.projectType === "commercial") score += 20;
  if (data.timeline === "asap" || data.timeline === "1-2 weeks") score += 15;
  if (data.source === "google") score += 10;
  return Math.min(score, 100);
}

// City config for location cloning
export interface CityConfig {
  city: string;
  state: string;
  stateAbbr: string;
  phone: string;
  slug: string;
}

export const PHOENIX_CONFIG: CityConfig = {
  city: "Phoenix",
  state: "Arizona",
  stateAbbr: "AZ",
  phone: "(602) 555-0100",
  slug: "phoenix",
};
