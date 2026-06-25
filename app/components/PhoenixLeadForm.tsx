"use client";
import { FormEvent, useState } from "react";

type State = "idle" | "submitting" | "error";

export function PhoenixLeadForm() {
  const [state, setState] = useState<State>("idle");
  const [msg, setMsg] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name  = String(fd.get("fullName") || "").trim();
    const email = String(fd.get("email")    || "").trim();
    const phone = String(fd.get("phone")    || "").trim();

    if (!name || !email || !phone) {
      setState("error");
      setMsg("Please enter your name, email, and phone number.");
      return;
    }

    setState("submitting");
    // Store in sessionStorage so dashboard can read it
    window.sessionStorage.setItem("xpsLead", JSON.stringify({ fullName: name, email, phone }));
    const p = new URLSearchParams({ fullName: name, email, phone });
    window.location.assign(`/customer-portal/dashboard?${p.toString()}`);
  }

  return (
    <form className="estimate-card" id="estimate" onSubmit={handleSubmit}>
      <div className="form-head">
        <h2>Start Digital Bid</h2>
        <p style={{ margin: "4px 0 0", fontSize: ".78rem", color: "rgba(255,255,255,.7)" }}>Name, email &amp; phone — that's it</p>
      </div>

      <label className="form-field">
        <input name="fullName" placeholder="Full Name" required autoComplete="name" />
      </label>

      <label className="form-field">
        <input name="email" type="email" placeholder="Email Address" required autoComplete="email" />
      </label>

      <label className="form-field">
        <input name="phone" placeholder="Phone Number" required autoComplete="tel" />
      </label>

      {msg && <p style={{ margin: "0 0 6px", fontSize: ".78rem", color: state === "error" ? "#ef4444" : "#fff" }}>{msg}</p>}

      <button className="gold-button form-submit" type="submit" disabled={state === "submitting"}>
        {state === "submitting" ? "Opening your dashboard..." : "Start Digital Bid →"}
      </button>

      <p style={{ margin: "8px 0 0", fontSize: ".72rem", color: "rgba(255,255,255,.55)", textAlign: "center" }}>
        You'll choose your finish &amp; color inside your dashboard
      </p>
    </form>
  );
}
