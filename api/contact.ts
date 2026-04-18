import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { contactFormSchema } from "../src/utils/contact-schema.js";
import { SITE_CONFIG } from "../src/utils/site.js";

const escapeHtml = (str: string) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");

const resendApiKey = process.env.RESEND_API_KEY;
const contactEmail = process.env.CONTACT_EMAIL;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://danielstriver.vercel.app",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Distributed rate limiter via Upstash Redis — falls back to in-memory when env vars absent
let ratelimit: Ratelimit | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(3, "10 m"),
    prefix: "portfolio:contact",
  });
}

// In-memory fallback (cold-start only — not reliable in production without Upstash)
const rateLimitStore = globalThis as typeof globalThis & {
  __contactRateLimit?: Map<string, { count: number; resetAt: number }>;
};
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 3;

const getClientIp = (request: Request): string => {
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const forwardedFor = request.headers.get("x-forwarded-for");
  if (!forwardedFor) return "unknown";

  const ips = forwardedFor.split(",");
  return ips[ips.length - 1]?.trim() || "unknown";
};

const isInMemoryRateLimited = (ipAddress: string): boolean => {
  if (ipAddress === "unknown") return false;
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
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (request.method !== "POST") {
      return Response.json(
        { success: false, message: "Method not allowed." },
        { status: 405, headers: CORS_HEADERS },
      );
    }

    if (!resendApiKey || !contactEmail) {
      return Response.json(
        {
          success: false,
          message: "The contact form is temporarily unavailable. Please try again later.",
        },
        { status: 500, headers: CORS_HEADERS },
      );
    }

    const ipAddress = getClientIp(request);

    if (ratelimit) {
      const identifier = ipAddress === "unknown" ? "global" : ipAddress;
      const { success } = await ratelimit.limit(identifier);
      if (!success) {
        return Response.json(
          { success: false, message: "Too many requests. Please wait a few minutes and try again." },
          { status: 429, headers: CORS_HEADERS },
        );
      }
    } else if (isInMemoryRateLimited(ipAddress)) {
      return Response.json(
        { success: false, message: "Too many requests. Please wait a few minutes and try again." },
        { status: 429, headers: CORS_HEADERS },
      );
    }

    let payload: unknown;

    try {
      payload = await request.json();
    } catch {
      return Response.json(
        { success: false, message: "Invalid request body." },
        { status: 400, headers: CORS_HEADERS },
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
        { status: 400, headers: CORS_HEADERS },
      );
    }

    const { name, email, message, company } = validationResult.data;

    if (company) {
      return Response.json(
        { success: true, message: "Message received." },
        { status: 200, headers: CORS_HEADERS },
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
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Submitted:</strong> ${escapeHtml(submittedAt)}</p>
          <p style="margin-top: 24px;"><strong>Message</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    if (error) {
      return Response.json(
        {
          success: false,
          message: "The message could not be sent right now. Please try again shortly.",
        },
        { status: 502, headers: CORS_HEADERS },
      );
    }

    return Response.json(
      {
        success: true,
        message: "Your message was sent successfully. I will get back to you soon.",
      },
      { status: 200, headers: CORS_HEADERS },
    );
  },
};
