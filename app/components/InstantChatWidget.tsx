"use client";

import { FormEvent, useEffect, useState } from "react";

type ChatState = "idle" | "open" | "sending" | "sent" | "error";

function readStoredLead() {
  try {
    const stored = window.sessionStorage.getItem("xpsClientDashboard") || window.sessionStorage.getItem("xpsEstimatorLead");
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function readValue(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function projectContext(storedLead: Record<string, string>) {
  const context = [
    storedLead.projectType ? `Project: ${storedLead.projectType}` : "",
    storedLead.address ? `Address: ${storedLead.address}` : "",
    storedLead.zipCode ? `ZIP: ${storedLead.zipCode}` : "",
    storedLead.floorMeasurements ? `Measurements: ${storedLead.floorMeasurements}` : "",
    storedLead.existingFloorCovering ? `Existing floor: ${storedLead.existingFloorCovering}` : "",
    storedLead.concreteCondition ? `Concrete condition: ${storedLead.concreteCondition}` : "",
    storedLead.desiredFinish ? `Desired finish: ${storedLead.desiredFinish}` : "",
    storedLead.desiredColor ? `Desired color: ${storedLead.desiredColor}` : "",
    storedLead.preferredTimeline ? `Preferred timeline: ${storedLead.preferredTimeline}` : "",
    storedLead.leadId ? `Lead ID: ${storedLead.leadId}` : ""
  ].filter(Boolean);

  return context.length ? `\n\nDashboard context:\n${context.join("\n")}` : "";
}

export function InstantChatWidget() {
  const [chatState, setChatState] = useState<ChatState>("idle");
  const [message, setMessage] = useState("Send a quick message and we will follow up by phone or email.");

  const isOpen = chatState !== "idle";

  useEffect(() => {
    function openChat() {
      setChatState("open");
      setMessage("Send a quick message and we will follow up by phone or email.");
    }

    window.addEventListener("xps:open-chat", openChat);
    return () => window.removeEventListener("xps:open-chat", openChat);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setChatState("sending");
    setMessage("Sending your chat request...");

    const storedLead = readStoredLead();
    const formData = new FormData(event.currentTarget);
    const chatMessage = readValue(formData, "chatMessage");
    const fullName = readValue(formData, "fullName") || storedLead.fullName || "Website visitor";
    const email = readValue(formData, "email") || storedLead.email || "";
    const phone = readValue(formData, "phone") || storedLead.phone || "";
    const asapServiceRequested = readValue(formData, "asapServiceRequested") === "yes" ? "yes" : storedLead.asapServiceRequested === "yes" ? "yes" : "no";

    if (!chatMessage) {
      setChatState("error");
      setMessage("Please enter a quick message so we know how to help.");
      return;
    }

    formData.set("source", "xps_instant_chat");
    formData.set("campaign", "instant_chat_request");
    formData.set("fullName", fullName);
    formData.set("email", email);
    formData.set("phone", phone);
    formData.set("address", storedLead.address || "");
    formData.set("projectType", readValue(formData, "projectType") || storedLead.projectType || "Instant Chat");
    formData.set("zipCode", readValue(formData, "zipCode") || storedLead.zipCode || "");
    formData.set("floorMeasurements", storedLead.floorMeasurements || "");
    formData.set("existingFloorCovering", storedLead.existingFloorCovering || "");
    formData.set("concreteCondition", storedLead.concreteCondition || "");
    formData.set("desiredFinish", storedLead.desiredFinish || "");
    formData.set("desiredColor", storedLead.desiredColor || "");
    formData.set("preferredTimeline", storedLead.preferredTimeline || "Instant chat request");
    formData.set("asapServiceRequested", asapServiceRequested);
    formData.set("timeline", asapServiceRequested === "yes" ? "ASAP instant chat request" : "Instant chat request");
    formData.set("notes", `Instant chat request: ${chatMessage}${projectContext(storedLead)}`);
    formData.set("notificationEmail", "jeremy@shopxps.com");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        body: formData
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "Chat request failed.");
      }

      setChatState("sent");
      setMessage(result.notification?.sent ? "Message sent. The XPS team will follow up from here." : "Message saved for review. The XPS team will follow up from here.");
    } catch (error) {
      setChatState("error");
      setMessage(error instanceof Error ? error.message : "Chat request failed.");
    }
  }

  return (
    <aside id="instant-chat" className={`instant-chat-widget ${isOpen ? "open" : "closed"}`} aria-label="Instant chat request">
      {isOpen ? (
        <div className="instant-chat-panel">
          <div className="instant-chat-head">
            <div>
              <span>Instant Chat</span>
              <strong>Need help with your floor?</strong>
            </div>
            <button type="button" aria-label="Close instant chat" onClick={() => setChatState("idle")}>x</button>
          </div>

          <form onSubmit={handleSubmit}>
            <label>
              <span>Your message</span>
              <textarea name="chatMessage" rows={4} placeholder="Ask a question, request ASAP service, or tell us what you need." required />
            </label>
            <div className="instant-chat-fields">
              <label>
                <span>Name</span>
                <input name="fullName" autoComplete="name" />
              </label>
              <label>
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" />
              </label>
              <label>
                <span>Phone</span>
                <input name="phone" type="tel" autoComplete="tel" />
              </label>
              <label>
                <span>ZIP</span>
                <input name="zipCode" inputMode="numeric" autoComplete="postal-code" />
              </label>
            </div>
            <label className="instant-chat-asap">
              <input name="asapServiceRequested" type="checkbox" value="yes" />
              <span>Request ASAP service</span>
            </label>
            <button className="gold-button" type="submit" disabled={chatState === "sending"}>
              {chatState === "sending" ? "Sending..." : "Send Chat Request"}
            </button>
            <p className={`instant-chat-status ${chatState}`} aria-live="polite">{message}</p>
          </form>
        </div>
      ) : (
        <button className="instant-chat-launch" type="button" onClick={() => setChatState("open")}>
          <span>Instant Chat</span>
          <strong>ASAP help</strong>
        </button>
      )}
    </aside>
  );
}
