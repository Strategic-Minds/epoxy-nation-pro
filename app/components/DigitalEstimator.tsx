"use client";

import { FormEvent, useState } from "react";

type StartState = "idle" | "opening" | "ready" | "error";

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

const estimatorSteps = [
  "Start here with name, email, phone, ZIP, project type, and ASAP request if needed.",
  "The full Digital Bid form opens with your details already filled in.",
  "Upload multiple floor photos, measurements, current covering, finish choice, and inspiration pictures.",
  "Jeremy receives the package for review, then sends the proposal, payment path, warranty information, and tracker access steps."
];

export function DigitalEstimator() {
  const [startState, setStartState] = useState<StartState>("idle");
  const [message, setMessage] = useState("Start the Digital Bid here and finish the upload on the dedicated estimator page.");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStartState("opening");
    setMessage("Opening the Digital Bid System...");

    const formData = new FormData(event.currentTarget);
    const lead = {
      fullName: String(formData.get("fullName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      zipCode: String(formData.get("zipCode") || "").trim(),
      projectType: String(formData.get("projectType") || "").trim(),
      asapServiceRequested: formData.get("asapServiceRequested") === "yes" ? "yes" : "no"
    };

    if (!lead.fullName || !lead.email || !lead.phone || !lead.zipCode || !lead.projectType) {
      setStartState("error");
      setMessage("Please enter your name, email, phone, ZIP code, and project type to continue.");
      return;
    }

    window.sessionStorage.setItem("xpsEstimatorLead", JSON.stringify(lead));
    const params = new URLSearchParams(lead);
    setStartState("ready");
    window.location.assign(`/digital-estimator?${params.toString()}`);
  }

  return (
    <section className="digital-estimator-section" id="digital-estimator" aria-label="Digital Estimator 15 percent offer">
      <div className="digital-estimator-copy">
        <span className="section-kicker">15% Digital Estimator Offer</span>
        <h2>Save 15% by starting your bid online.</h2>
        <p>
          The Digital Bid System keeps the estimate package clean from the first click: contact details, floor images,
          measurements, existing covering, desired finish, desired color, warranty notes, proposal handoff, and job tracker setup.
        </p>
        <ul>
          {estimatorSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </div>

      <form className="digital-estimator-form" onSubmit={handleSubmit}>
        <input type="hidden" name="source" value="xps_homepage_digital_estimator_start" />
        <input type="hidden" name="campaign" value="15_percent_digital_estimator" />

        <div className="field-row">
          <label className="form-field">
            <span>Full name</span>
            <input name="fullName" required autoComplete="name" />
          </label>
          <label className="form-field">
            <span>Email</span>
            <input name="email" type="email" required autoComplete="email" />
          </label>
        </div>

        <div className="field-row">
          <label className="form-field">
            <span>Phone</span>
            <input name="phone" type="tel" required autoComplete="tel" />
          </label>
          <label className="form-field">
            <span>ZIP code</span>
            <input name="zipCode" inputMode="numeric" required autoComplete="postal-code" />
          </label>
        </div>

        <label className="form-field">
          <span>Project type</span>
          <select name="projectType" required defaultValue="">
            <option value="" disabled>Choose project type</option>
            {projectTypes.map((project) => (
              <option key={project}>{project}</option>
            ))}
          </select>
        </label>

        <label className="asap-check">
          <input name="asapServiceRequested" type="checkbox" value="yes" />
          <span>Request ASAP service</span>
        </label>

        <button className="gold-button form-submit" type="submit" disabled={startState === "opening"}>
          {startState === "opening" ? "Opening..." : "Start Digital Bid"}
        </button>

        <p className={`form-status ${startState}`} aria-live="polite">{message}</p>
        <small className="digital-estimator-footnote">
          On the next page you can upload multiple job photos and any floor examples you like from this site or online.
        </small>
      </form>
    </section>
  );
}
