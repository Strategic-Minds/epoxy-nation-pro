import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID!;
const TWILIO_TOKEN = process.env.TWILIO_AUTH_TOKEN!;
const TWILIO_SMS_FROM = process.env.TWILIO_SMS_FROM || "+15616780328";
const JEREMY_PHONE = process.env.JEREMY_PHONE || "+17722090266";
const HEYGEN_API_KEY = process.env.HEYGEN_API_KEY!;
const JEREMY_AVATAR_ID = "199f5f195f5d48eca14ab6b39b2e00e0";
const HEYGEN_VOICE_ID = "2d5b0e6cf36f460aa7fc47e3eee4ba54"; // English male

// ── 1. SCORE LEAD ──────────────────────────────────────────────
function scoreLead(data: Record<string, unknown>): { score: number; grade: string } {
  let score = 40;
  if (data.square_footage && Number(data.square_footage) > 400) score += 15;
  if (data.asap_requested) score += 20;
  if (data.whatsapp_consent) score += 10;
  if (data.phone) score += 10;
  if (data.desired_finish) score += 5;
  const grade = score >= 80 ? "hot" : score >= 60 ? "warm" : "cold";
  return { score: Math.min(score, 100), grade };
}

// ── 2. INSERT TO SUPABASE ──────────────────────────────────────
async function insertLead(payload: Record<string, unknown>) {
  const token = crypto.randomUUID();
  const { score, grade } = scoreLead(payload);

  const record = {
    full_name: payload.name || payload.full_name,
    email: payload.email,
    phone: String(payload.phone || "").replace(/\D/g, ""),
    zip_code: payload.zip_code || payload.zipCode,
    address: payload.address || payload.city,
    project_type: payload.project_type || payload.projectType || "Garage Floors",
    square_footage: payload.square_footage || payload.sqft || null,
    desired_finish: payload.desired_finish || payload.finish || null,
    desired_color: payload.desired_color || payload.color || null,
    asap_requested: Boolean(payload.asap_requested || payload.asap),
    preferred_timeline: payload.preferred_timeline || payload.timeline || null,
    notes: payload.notes || null,
    whatsapp_consent: Boolean(payload.whatsapp_consent || payload.whatsapp),
    whatsapp_number: String(payload.phone || "").replace(/\D/g, ""),
    source_campaign: payload.source_campaign || payload.campaign || "organic",
    source_page: payload.source_page || payload.source || "homepage",
    ai_score: score,
    lead_score: grade,
    status: "new",
    dashboard_token: token,
    coupon_claimed: Boolean(payload.coupon_claimed),
    raw_payload: payload,
  };

  const res = await fetch(`${SUPABASE_URL}/rest/v1/pep_leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_SERVICE_KEY,
      "Authorization": `Bearer ${SUPABASE_SERVICE_KEY}`,
      "Prefer": "return=representation",
    },
    body: JSON.stringify(record),
  });

  const data = await res.json();
  return { record, inserted: data?.[0] || record, score, grade, token };
}

// ── 3. SMS ALERT TO JEREMY ─────────────────────────────────────
async function sendSMSAlert(lead: Record<string, unknown>, score: number, grade: string) {
  const gradeEmoji = grade === "hot" ? "🔥" : grade === "warm" ? "⚡" : "❄️";
  const name = lead.full_name || lead.name;
  const phone = lead.phone;
  const project = lead.project_type || "Floor Project";
  const sqft = lead.square_footage ? `${lead.square_footage} sqft` : "Size TBD";
  const finish = lead.desired_finish || "TBD";
  const asap = lead.asap_requested ? "ASAP ⚡" : lead.preferred_timeline || "Flexible";
  const dashUrl = `https://phoenix-epoxy-pros-site.vercel.app/customer-portal/dashboard?token=${lead.dashboard_token}`;

  const msg = `${gradeEmoji} NEW LEAD — Score: ${score}/100 (${grade.toUpperCase()})
━━━━━━━━━━━━━━━━━━━
👤 ${name}
📱 ${phone}
🏠 ${project} | ${sqft}
🎨 Finish: ${finish}
⏰ Timeline: ${asap}
━━━━━━━━━━━━━━━━━━━
📋 Dashboard: ${dashUrl}`;

  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${TWILIO_SID}:${TWILIO_TOKEN}`).toString("base64")}`,
      },
      body: new URLSearchParams({
        From: TWILIO_SMS_FROM,
        To: JEREMY_PHONE,
        Body: msg,
      }),
    }
  );
  const result = await res.json();
  return { sms_sid: result.sid, sms_status: result.status, sms_error: result.error_code };
}

// ── 4. QUEUE HEYGEN VIDEO ──────────────────────────────────────
async function queueHeyGenVideo(lead: Record<string, unknown>) {
  const name = (lead.full_name || lead.name || "there") as string;
  const firstName = name.split(" ")[0];
  const project = (lead.project_type || "garage floor") as string;
  const city = (lead.address || "Phoenix") as string;

  const script = `Hey ${firstName}, this is Jeremy from Phoenix Epoxy Pros. I just received your request for a ${project.toLowerCase()} in ${city} and I wanted to personally reach out. We've been transforming floors in the Phoenix area for over 10 years, and I'd love to show you what's possible for your space. I'm going to have one of our specialists reach out within the next 30 minutes to schedule your free on-site estimate. Talk soon.`;

  const payload = {
    video_inputs: [
      {
        character: {
          type: "avatar",
          avatar_id: JEREMY_AVATAR_ID,
          avatar_style: "normal",
        },
        voice: {
          type: "text",
          input_text: script,
          voice_id: HEYGEN_VOICE_ID,
          speed: 1.0,
        },
        background: {
          type: "color",
          value: "#1a1a1a",
        },
      },
    ],
    dimension: { width: 1280, height: 720 },
    aspect_ratio: "16:9",
    caption: false,
  };

  const res = await fetch("https://api.heygen.com/v2/video/generate", {
    method: "POST",
    headers: {
      "X-Api-Key": HEYGEN_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  return {
    heygen_video_id: result?.data?.video_id || null,
    heygen_status: result?.code === 100 ? "queued" : "error",
    heygen_error: result?.message || null,
  };
}

// ── 5. UPDATE SUPABASE WITH RESULTS ───────────────────────────
async function updateLeadRecord(leadId: string, updates: Record<string, unknown>) {
  await fetch(`${SUPABASE_URL}/rest/v1/pep_leads?id=eq.${leadId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_SERVICE_KEY,
      "Authorization": `Bearer ${SUPABASE_SERVICE_KEY}`,
      "Prefer": "return=minimal",
    },
    body: JSON.stringify(updates),
  });
}

// ── MAIN HANDLER ───────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Insert lead to Supabase
    const { inserted, score, grade, token } = await insertLead(body);
    const leadId = inserted.id;

    // 2. Fire SMS + HeyGen in parallel
    const [smsResult, heygenResult] = await Promise.allSettled([
      sendSMSAlert(inserted, score, grade),
      queueHeyGenVideo(inserted),
    ]);

    const sms = smsResult.status === "fulfilled" ? smsResult.value : { sms_error: "sms_failed" };
    const heygen = heygenResult.status === "fulfilled" ? heygenResult.value : { heygen_error: "heygen_failed" };

    // 3. Update lead record with pipeline results
    if (leadId) {
      await updateLeadRecord(leadId, {
        notes: `SMS: ${sms.sms_status || "sent"} | HeyGen: ${heygen.heygen_video_id || "queued"}`,
      });
    }

    console.log(`✅ Lead pipeline complete: ${inserted.full_name} | Score: ${score} (${grade}) | SMS: ${sms.sms_status} | HeyGen: ${heygen.heygen_video_id}`);

    return NextResponse.json({
      success: true,
      lead_id: leadId,
      score,
      grade,
      dashboard_token: token,
      dashboard_url: `https://phoenix-epoxy-pros-site.vercel.app/customer-portal/dashboard?token=${token}`,
      sms_sent: !sms.sms_error,
      video_queued: !!heygen.heygen_video_id,
    });
  } catch (error) {
    console.error("❌ Lead pipeline error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: "Lead pipeline active",
    version: "3.0",
    pipeline: ["supabase", "twilio_sms", "heygen_video"],
    timestamp: new Date().toISOString(),
  });
}
