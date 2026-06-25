import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, source, city, sqft, projectType, timeline } = body;

    // Log to console (Supabase can be added when keys are provided)
    console.log("New lead:", { name, email, phone, source, city, sqft, projectType, timeline });

    // Attempt Supabase insert if env vars present
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      await fetch(`${supabaseUrl}/rest/v1/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": supabaseKey,
          "Authorization": `Bearer ${supabaseKey}`,
          "Prefer": "return=minimal",
        },
        body: JSON.stringify({
          name, email, phone,
          source: source || "homepage",
          city: city || "Phoenix",
          status: "new",
          score: 70,
        }),
      });
    }

    return NextResponse.json({ success: true, message: "Lead received" });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "Lead API active — Epoxy Nation Pro" });
}
