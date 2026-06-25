import { NextResponse } from "next/server";
import { scoreLead } from "@/lib/brand";
import { sendLeadSmsNotifications, type LeadSmsPayload } from "@/lib/twilio";

export async function POST(request: Request) {
  const formData = await request.formData();
  const files = formData.getAll("photos").filter((file) => file instanceof File && file.size > 0);

  const lead: Omit<LeadSmsPayload, "score" | "photoCount"> = {
    fullName: String(formData.get("fullName") || ""),
    phone: String(formData.get("phone") || ""),
    email: String(formData.get("email") || ""),
    projectType: String(formData.get("projectType") || ""),
    squareFootage: String(formData.get("squareFootage") || ""),
    timeline: String(formData.get("timeline") || ""),
    budget: String(formData.get("budget") || ""),
    smsConsent: String(formData.get("smsConsent") || "") === "yes"
  };

  const score = scoreLead(lead.timeline, files.length > 0, lead.budget.length > 0);
  const smsNotifications = await sendLeadSmsNotifications({
    ...lead,
    score,
    photoCount: files.length
  });

  return NextResponse.json({
    ok: true,
    score,
    sms: {
      configured: smsNotifications.configured,
      ownerAlertSent: smsNotifications.ownerAlertSent,
      customerConfirmationSent: smsNotifications.customerConfirmationSent,
      skipped: smsNotifications.skipped,
      errors: process.env.NODE_ENV === "production" ? [] : smsNotifications.errors
    },
    message: "Lead captured. Twilio SMS notifications run automatically when production credentials are configured."
  });
}
