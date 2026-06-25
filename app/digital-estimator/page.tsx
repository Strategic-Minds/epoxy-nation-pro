"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { MobileNavigation } from "../components/MobileNavigation";

type SubmitState = "idle" | "sending" | "sent" | "error";

type LeadBasics = {
  fullName: string;
  address: string;
  email: string;
  phone: string;
  zipCode: string;
  projectType: string;
  asapServiceRequested: string;
};

const projectTypes = [
  "Garage Floors",
  "Commercial Floors",
  "Patios & Outdoor Spaces",
  "Floor Repair",
  "Polished Concrete",
  "Decorative Concrete",
  "Epoxy Training Classes",
  "Business Starter Training"
];

const finishOptions = [
  "Full Broadcast Flake",
  "Metallic Epoxy",
  "Polished Concrete",
  "Sealed Concrete",
  "Quartz System",
  "Solid Color Epoxy",
  "Glitter / Metallic Accents"
];

const colorOptionsByFinish: Record<string, string[]> = {
  "Full Broadcast Flake": ["Domino", "Tidal Wave", "Creekbed", "Cabin Fever", "Gravel", "Nightfall", "Custom flake blend"],
  "Metallic Epoxy": ["Pearl White", "Graphite", "Silver Smoke", "Copper Drift", "Ocean Blue", "Black Marble", "Custom metallic"],
  "Polished Concrete": ["Natural Concrete", "Light Natural", "Warm Natural", "Salt and Pepper", "Charcoal Natural"],
  "Sealed Concrete": ["Natural Concrete", "Light Natural", "Warm Natural", "Charcoal Natural", "Clear sealed concrete"],
  "Quartz System": ["Natural Quartz", "Dolphin Gray", "Tan Blend", "Black / White Blend", "Custom quartz blend"],
  "Solid Color Epoxy": ["Light Gray", "Medium Gray", "Tile Red", "Safety Yellow", "Black", "White", "Custom solid color"],
  "Glitter / Metallic Accents": ["Silver Glitter", "Gold Glitter", "Blue Metallic", "Copper Metallic", "Pearl Accent", "Custom glitter color"]
};

const emptyLead: LeadBasics = {
  fullName: "",
  address: "",
  email: "",
  phone: "",
  zipCode: "",
  projectType: "",
  asapServiceRequested: "no"
};

function readStoredLead() {
  try {
    const stored = window.sessionStorage.getItem("xpsEstimatorLead");
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function formValue(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function attachedFiles(formData: FormData) {
  return formData.getAll("attachments")
    .filter((item): item is File => item instanceof File && item.size > 0)
    .map((file) => ({
      name: file.name,
      type: file.type || "application/octet-stream",
      size: file.size
    }));
}

export default function DigitalEstimatorPage() {
  const [lead, setLead] = useState<LeadBasics>(emptyLead);
  const [desiredFinish, setDesiredFinish] = useState(finishOptions[0]);
  const [desiredColor, setDesiredColor] = useState(colorOptionsByFinish[finishOptions[0]][0]);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("Complete the intake and attach job images to claim the 15% digital estimator coupon.");

  const colorOptions = useMemo(() => colorOptionsByFinish[desiredFinish] || ["Custom color"], [desiredFinish]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const storedLead = readStoredLead();

    setLead({
      fullName: params.get("fullName") || storedLead.fullName || "",
      address: storedLead.address || "",
      email: params.get("email") || storedLead.email || "",
      phone: params.get("phone") || storedLead.phone || "",
      zipCode: params.get("zipCode") || storedLead.zipCode || "",
      projectType: params.get("projectType") || storedLead.projectType || "",
      asapServiceRequested: params.get("asapServiceRequested") || storedLead.asapServiceRequested || "no"
    });
  }, []);

  function updateLead(key: keyof LeadBasics, value: string) {
    setLead((current) => ({ ...current, [key]: value }));
  }

  function updateFinish(value: string) {
    setDesiredFinish(value);
    setDesiredColor((colorOptionsByFinish[value] || ["Custom color"])[0]);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("sending");
    setMessage("Uploading your estimator package...");

    const formData = new FormData(event.currentTarget);
    const asapServiceRequested = lead.asapServiceRequested === "yes" ? "yes" : "no";
    const preferredTimeline = formValue(formData, "preferredTimeline") || "24-hour digital estimator request";
    const timeline = asapServiceRequested === "yes"
      ? `ASAP service request - ${preferredTimeline}`
      : preferredTimeline;
    const attachments = attachedFiles(formData);
    const notes = formValue(formData, "notes");
    const asapNotes = formValue(formData, "asapNotes");

    formData.set("source", "xps_digital_estimator");
    formData.set("campaign", "15_percent_digital_estimator_coupon");
    formData.set("timeline", timeline);
    formData.set("asapServiceRequested", asapServiceRequested);
    formData.set("desiredFinish", desiredFinish);
    formData.set("desiredColor", desiredColor);
    formData.set("notificationEmail", "jeremy@shopxps.com");
    formData.set("proposalWorkflow", "Email estimate to Jeremy, send proposal to customer, send payment link, then send temporary job tracker sign-in after payment.");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        body: formData
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "Estimator submission failed.");
      }

      const dashboardLead = {
        fullName: formValue(formData, "fullName"),
        address: formValue(formData, "address"),
        email: formValue(formData, "email"),
        phone: formValue(formData, "phone"),
        zipCode: formValue(formData, "zipCode"),
        projectType: formValue(formData, "projectType"),
        floorMeasurements: formValue(formData, "floorMeasurements"),
        existingFloorCovering: formValue(formData, "existingFloorCovering"),
        concreteCondition: formValue(formData, "concreteCondition"),
        desiredFinish,
        desiredColor,
        asapServiceRequested,
        asapNotes,
        preferredTimeline,
        timeline,
        notes,
        attachments,
        attachmentCount: attachments.length,
        submittedAt: new Date().toISOString(),
        score: result.score || "new",
        leadId: result.persistence?.leadId || result.leadPackage?.leadId || "",
        storedInSupabase: result.persistence?.stored ? "yes" : "no",
        notificationSent: result.notification?.sent ? "yes" : "no",
        estimateRecipient: result.notification?.to || "jeremy@shopxps.com",
        deliveryMode: result.notification?.sent ? "email_sent" : "supabase_queue",
        coupon: "15% Digital Estimator coupon",
        estimateGuarantee: "Guaranteed estimate within 24 hours by email with warranty information and job tracker next steps.",
        proposalWorkflow: "Jeremy reviews the package, sends proposal and warranty details by email, sends payment link after approval, then sends temporary job tracker access after payment."
      };

      window.sessionStorage.setItem("xpsClientDashboard", JSON.stringify(dashboardLead));
      setSubmitState("sent");
      setMessage("Received. Opening your client dashboard now...");

      const params = new URLSearchParams({
        fullName: dashboardLead.fullName,
        email: dashboardLead.email,
        phone: dashboardLead.phone,
        zipCode: dashboardLead.zipCode,
        projectType: dashboardLead.projectType,
        finish: dashboardLead.desiredFinish,
        color: dashboardLead.desiredColor,
        asap: dashboardLead.asapServiceRequested
      });
      window.location.assign(`/client-dashboard?${params.toString()}`);
    } catch (error) {
      setSubmitState("error");
      setMessage(error instanceof Error ? error.message : "Estimator submission failed.");
    }
  }

  return (
    <main className="portal-login-page digital-estimator-page">
      <header className="portal-login-header branded-page-header">
        <a href="/" aria-label="Back to Phoenix Epoxy Pros">
          <img src="/images/logo-header.webp" alt="Phoenix Epoxy Pros" />
        </a>
        <MobileNavigation />
        <a className="portal-home-link" href="/job-tracker">View job tracker</a>
      </header>

      <section className="portal-login-hero digital-estimator-hero" aria-label="Digital estimator form">
        <div className="portal-login-copy">
          <span className="section-kicker">15% off with Digital Estimator</span>
          <h1>Upload the floor details. Get the estimate in 24 hours.</h1>
          <p>
            Send photos, measurements, current floor covering, desired finish, and color direction. Your estimator package
            is prepared for review, proposal delivery, payment link follow-up, and temporary job tracker access after payment.
          </p>
          <div className="portal-proof-row" aria-label="Estimator guarantees">
            <span>Multiple floor images</span>
            <span>15% coupon</span>
            <span>24-hour email estimate</span>
            <span>ASAP request option</span>
          </div>
        </div>

        <form className="digital-estimator-panel" onSubmit={handleSubmit}>
          <div className="digital-estimator-form-head">
            <p className="portal-panel-eyebrow">Professional estimate intake</p>
            <h2>Digital Bid System</h2>
          </div>

          <div className="digital-estimator-grid-fields">
            <label className="digital-estimator-field">
              <span>Full Name</span>
              <input name="fullName" value={lead.fullName} onChange={(event) => updateLead("fullName", event.target.value)} required />
            </label>
            <label className="digital-estimator-field">
              <span>Address</span>
              <input name="address" value={lead.address} onChange={(event) => updateLead("address", event.target.value)} required />
            </label>
            <label className="digital-estimator-field">
              <span>Email</span>
              <input name="email" type="email" value={lead.email} onChange={(event) => updateLead("email", event.target.value)} required />
            </label>
            <label className="digital-estimator-field">
              <span>Phone Number</span>
              <input name="phone" type="tel" value={lead.phone} onChange={(event) => updateLead("phone", event.target.value)} required />
            </label>
            <label className="digital-estimator-field">
              <span>ZIP Code</span>
              <input name="zipCode" inputMode="numeric" value={lead.zipCode} onChange={(event) => updateLead("zipCode", event.target.value)} required />
            </label>
            <label className="digital-estimator-field">
              <span>Project Type</span>
              <select name="projectType" value={lead.projectType} onChange={(event) => updateLead("projectType", event.target.value)} required>
                <option value="" disabled>Choose project type</option>
                {projectTypes.map((project) => <option key={project}>{project}</option>)}
              </select>
            </label>
            <label className="digital-estimator-field">
              <span>Floor Measurements</span>
              <input name="floorMeasurements" placeholder="Example: 24 x 22 garage or 528 sq ft" required />
            </label>
            <label className="digital-estimator-field">
              <span>Existing Floor</span>
              <select name="existingFloorCovering" required>
                <option>Bare Concrete</option>
                <option>Paint</option>
                <option>Laminate</option>
                <option>Tile</option>
                <option>VCT</option>
                <option>Peeling Epoxy</option>
                <option>Carpet</option>
              </select>
            </label>
            <label className="digital-estimator-field">
              <span>Condition of Concrete</span>
              <select name="concreteCondition" required>
                <option>New</option>
                <option>Fair - Some Cracks</option>
                <option>Bad - Cracks and Holes</option>
              </select>
            </label>
            <label className="digital-estimator-field">
              <span>Desired Floor Finish</span>
              <select name="desiredFinishSelect" value={desiredFinish} onChange={(event) => updateFinish(event.target.value)} required>
                {finishOptions.map((finish) => <option key={finish}>{finish}</option>)}
              </select>
            </label>
            <label className="digital-estimator-field">
              <span>Desired Color</span>
              <select name="desiredColorSelect" value={desiredColor} onChange={(event) => setDesiredColor(event.target.value)} required>
                {colorOptions.map((color) => <option key={color}>{color}</option>)}
              </select>
            </label>
            <label className="digital-estimator-field">
              <span>Preferred Timeline</span>
              <select name="preferredTimeline" defaultValue="24-hour digital estimator request" required>
                <option>ASAP - urgent review requested</option>
                <option>24-hour digital estimator request</option>
                <option>This week</option>
                <option>2-4 weeks</option>
                <option>Planning ahead</option>
              </select>
            </label>
          </div>

          <div className="digital-estimator-asap digital-estimator-wide">
            <label className="asap-check">
              <input
                name="asapServiceRequested"
                type="checkbox"
                value="yes"
                checked={lead.asapServiceRequested === "yes"}
                onChange={(event) => updateLead("asapServiceRequested", event.target.checked ? "yes" : "no")}
              />
              <span>Request ASAP service</span>
            </label>
            <label className="digital-estimator-field">
              <span>ASAP Notes</span>
              <textarea name="asapNotes" rows={3} placeholder="Tell us if this is urgent, if a business is down, or if you need the floor scheduled quickly." />
            </label>
          </div>

          <label className="digital-estimator-field digital-estimator-wide">
            <span>Project Notes</span>
            <textarea name="notes" rows={4} placeholder="Tell us about cracks, coatings, moisture, timeline, access, color chart selections, or floors you want us to match." />
          </label>

          <label className="digital-estimator-file digital-estimator-wide">
            <span>Attach Job Images</span>
            <input name="attachments" type="file" accept="image/png,image/jpeg,image/webp" multiple />
            <small>Upload multiple current floor pictures. Also upload a picture or screenshot of any floors you currently like that you found on our site or online.</small>
          </label>

          <div className="digital-estimator-flow-note digital-estimator-wide">
            <strong>What happens next</strong>
            <span>Jeremy receives the estimator package, your proposal is sent by email, then the payment link and temporary job tracker sign-in follow after approval and payment. After you submit, this page opens your client dashboard.</span>
          </div>

          <button className="gold-button digital-estimator-submit" type="submit" disabled={submitState === "sending"}>
            {submitState === "sending" ? "Submitting..." : "Submit Digital Bid"}
          </button>
          <p className={`portal-login-status ${submitState}`} aria-live="polite">{message}</p>
        </form>
      </section>
    </main>
  );
}
