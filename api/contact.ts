import { Resend } from "resend";
import { contactFormSchema } from "../src/utils/contact-schema";
import { SITE_CONFIG } from "../src/utils/site";

const resendApiKey = process.env.RESEND_API_KEY;
const contactEmail = process.env.CONTACT_EMAIL;

const rateLimitStore = globalThis as typeof globalThis & {
  __contactRateLimit?: Map<string, { count: number; resetAt: number }>;
};

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 3;

const getClientIp = (request: Request) => {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (!forwardedFor) {
    return "unknown";
  }

  return forwardedFor.split(",")[0]?.trim() || "unknown";
};

const isRateLimited = (ipAddress: string) => {
  const now = Date.now();
  const store = rateLimitStore.__contactRateLimit ?? new Map<string, { count: number; resetAt: number }>();
  const currentEntry = store.get(ipAddress);

  if (!currentEntry || currentEntry.resetAt <= now) {
    store.set(ipAddress, { count: 1, resetAt: now + WINDOW_MS });
    rateLimitStore.__contactRateLimit = store;
    return false;
  }

  if (currentEntry.count >= MAX_REQUESTS) {
    rateLimitStore.__contactRateLimit = store;
    return true;
  }

  currentEntry.count += 1;
  store.set(ipAddress, currentEntry);
  rateLimitStore.__contactRateLimit = store;
  return false;
};

export default {
  async fetch(request: Request) {
    if (request.method !== "POST") {
      return Response.json(
        { success: false, message: "Method not allowed." },
        { status: 405 },
      );
    }

    if (!resendApiKey || !contactEmail) {
      return Response.json(
        {
          success: false,
          message: "Contact form is not configured yet. Please set RESEND_API_KEY and CONTACT_EMAIL.",
        },
        { status: 500 },
      );
    }

    const ipAddress = getClientIp(request);

    if (isRateLimited(ipAddress)) {
      return Response.json(
        {
          success: false,
          message: "Too many requests. Please wait a few minutes and try again.",
        },
        { status: 429 },
      );
    }

    let payload: unknown;

    try {
      payload = await request.json();
    } catch {
      return Response.json(
        { success: false, message: "Invalid request body." },
        { status: 400 },
      );
    }

    const validationResult = contactFormSchema.safeParse(payload);

    if (!validationResult.success) {
      return Response.json(
        {
          success: false,
          message: "Validation failed.",
          fieldErrors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { name, email, message, company } = validationResult.data;

    if (company) {
      return Response.json(
        { success: true, message: "Message received." },
        { status: 200 },
      );
    }

    const resend = new Resend(resendApiKey);
    const submittedAt = new Date().toISOString();

    const { error } = await resend.emails.send({
      from: SITE_CONFIG.emailFrom,
      to: contactEmail,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Submitted: ${submittedAt}`,
        "",
        message,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <h2 style="margin-bottom: 16px;">New portfolio contact</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Submitted:</strong> ${submittedAt}</p>
          <p style="margin-top: 24px;"><strong>Message</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    if (error) {
      return Response.json(
        {
          success: false,
          message: "The message could not be sent right now. Please try again shortly.",
        },
        { status: 502 },
      );
    }

    return Response.json(
      {
        success: true,
        message: "Your message was sent successfully. I will get back to you soon.",
      },
      { status: 200 },
    );
  },
};
