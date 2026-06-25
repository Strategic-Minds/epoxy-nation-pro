export type LeadSmsPayload = {
  fullName: string;
  phone: string;
  email: string;
  projectType: string;
  squareFootage: string;
  timeline: string;
  budget: string;
  score: string;
  photoCount: number;
  smsConsent: boolean;
};

export type SmsNotificationResult = {
  configured: boolean;
  ownerAlertSent: boolean;
  customerConfirmationSent: boolean;
  skipped: string[];
  errors: string[];
};

type TwilioConfig = {
  accountSid: string;
  authToken: string;
  messagingServiceSid: string;
  fromPhoneNumber: string;
  ownerNotifyTo: string;
  enableCustomerSms: boolean;
  statusCallbackUrl: string;
};

const truthy = new Set(["1", "true", "yes", "on"]);

function env(name: string) {
  return process.env[name]?.trim() || "";
}

function getTwilioConfig(): TwilioConfig {
  return {
    accountSid: env("TWILIO_ACCOUNT_SID"),
    authToken: env("TWILIO_AUTH_TOKEN"),
    messagingServiceSid: env("TWILIO_MESSAGING_SERVICE_SID"),
    fromPhoneNumber: env("TWILIO_FROM_PHONE_NUMBER"),
    ownerNotifyTo: env("TWILIO_OWNER_NOTIFY_TO"),
    enableCustomerSms: truthy.has(env("TWILIO_ENABLE_CUSTOMER_SMS").toLowerCase()),
    statusCallbackUrl: env("TWILIO_STATUS_CALLBACK_URL")
  };
}

function hasTwilioSender(config: TwilioConfig) {
  return Boolean(config.messagingServiceSid || config.fromPhoneNumber);
}

function isTwilioConfigured(config: TwilioConfig) {
  return Boolean(config.accountSid && config.authToken && hasTwilioSender(config));
}

function normalizePhoneNumber(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  if (trimmed.startsWith("+")) {
    return `+${trimmed.replace(/\D/g, "")}`;
  }

  const digits = trimmed.replace(/\D/g, "");

  if (digits.length === 10) {
    return `+1${digits}`;
  }

  if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`;
  }

  return trimmed;
}

function fallback(value: string, label = "Not provided") {
  return value.trim() || label;
}

function buildOwnerLeadAlert(payload: LeadSmsPayload) {
  return [
    `New Phoenix Epoxy Pros lead: ${fallback(payload.fullName, "Unknown name")}`,
    `Phone: ${fallback(payload.phone)}`,
    `Email: ${fallback(payload.email)}`,
    `Project: ${fallback(payload.projectType)}`,
    `Sq ft: ${fallback(payload.squareFootage)}`,
    `Timeline: ${fallback(payload.timeline)}`,
    `Budget: ${fallback(payload.budget)}`,
    `Photos: ${payload.photoCount}`,
    `Lead score: ${payload.score}`
  ].join("\n");
}

function buildCustomerConfirmation() {
  return [
    "Phoenix Epoxy Pros received your online estimate request.",
    "Your 15% online estimate coupon is noted.",
    "Call 772-209-0266 if you need to add photos or details.",
    "Reply STOP to opt out."
  ].join(" ");
}

async function sendTwilioMessage(config: TwilioConfig, to: string, body: string) {
  const normalizedTo = normalizePhoneNumber(to);

  if (!normalizedTo) {
    throw new Error("Missing destination phone number.");
  }

  const params = new URLSearchParams({
    To: normalizedTo,
    Body: body
  });

  if (config.messagingServiceSid) {
    params.set("MessagingServiceSid", config.messagingServiceSid);
  } else {
    params.set("From", normalizePhoneNumber(config.fromPhoneNumber));
  }

  if (config.statusCallbackUrl) {
    params.set("StatusCallback", config.statusCallbackUrl);
  }

  const authHeader = Buffer.from(`${config.accountSid}:${config.authToken}`).toString("base64");
  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${config.accountSid}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${authHeader}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params
  });

  if (!response.ok) {
    let message = `Twilio returned HTTP ${response.status}.`;

    try {
      const errorBody = (await response.json()) as { message?: string };
      if (errorBody.message) {
        message = `Twilio returned HTTP ${response.status}: ${errorBody.message}`;
      }
    } catch {
      // Keep the generic status message if Twilio does not return JSON.
    }

    throw new Error(message);
  }
}

export async function sendLeadSmsNotifications(payload: LeadSmsPayload): Promise<SmsNotificationResult> {
  const config = getTwilioConfig();
  const result: SmsNotificationResult = {
    configured: isTwilioConfigured(config),
    ownerAlertSent: false,
    customerConfirmationSent: false,
    skipped: [],
    errors: []
  };

  if (!result.configured) {
    result.skipped.push("Twilio environment variables are not fully configured.");
    return result;
  }

  if (config.ownerNotifyTo) {
    try {
      await sendTwilioMessage(config, config.ownerNotifyTo, buildOwnerLeadAlert(payload));
      result.ownerAlertSent = true;
    } catch (error) {
      result.errors.push(error instanceof Error ? error.message : "Owner SMS alert failed.");
    }
  } else {
    result.skipped.push("TWILIO_OWNER_NOTIFY_TO is not set.");
  }

  if (!config.enableCustomerSms) {
    result.skipped.push("Customer SMS confirmation is disabled.");
  } else if (!payload.smsConsent) {
    result.skipped.push("Customer did not opt in to SMS updates.");
  } else {
    try {
      await sendTwilioMessage(config, payload.phone, buildCustomerConfirmation());
      result.customerConfirmationSent = true;
    } catch (error) {
      result.errors.push(error instanceof Error ? error.message : "Customer SMS confirmation failed.");
    }
  }

  return result;
}
