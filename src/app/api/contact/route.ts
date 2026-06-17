import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { contactFormSchema } from "@/lib/validations";

// Server-side validation schema using shared error codes
const contactSchema = contactFormSchema.extend({
  // Honeypot field - should be empty for real submissions
  b_website: z.string().max(0, { message: "bot.detected" }).optional(),
});

// Simple rate limiting using in-memory store
const rateLimit = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3; // Max 3 submissions per minute per IP

function cleanupRateLimit() {
  const now = Date.now();
  for (const [ip, entry] of rateLimit.entries()) {
    if (now - entry.timestamp > RATE_LIMIT_WINDOW) {
      rateLimit.delete(ip);
    }
  }
}

function isRateLimited(ip: string): boolean {
  cleanupRateLimit();
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now - entry.timestamp > RATE_LIMIT_WINDOW) {
    rateLimit.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (entry.count >= MAX_REQUESTS) {
    return true;
  }

  entry.count++;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const ip = forwardedFor?.split(",")[0]?.trim() || realIp || null;

    // Check rate limit when IP is available; skip otherwise
    if (ip && isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate input
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      console.error("validation_failed_details:", JSON.stringify(result.error.format(), null, 2));
      const errors = result.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      );
    }

    const { name, email, phone, service, message } = result.data;

    // Check if Resend API key is configured
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error("contact_api_missing_resend_key");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Initialize Resend
    const resend = new Resend(resendApiKey);

    // Get recipient email from env or use default
    const toEmail = process.env.CONTACT_EMAIL || "hello@vektadev.com";

    // Send email
    const { data, error } = await resend.emails.send({
      from: "VektaDev Contact Form <onboarding@resend.dev>",
      to: [toEmail],
      replyTo: email,
      subject: `New contact form submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
        ${service ? `<p><strong>Service:</strong> ${escapeHtml(service)}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">
          This email was sent from the VektaDev website contact form.
        </p>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ""}
${service ? `Service: ${service}` : ""}

Message:
${message}

---
This email was sent from the VektaDev website contact form.
      `.trim(),
    });

    if (error) {
      console.error("contact_api_send_error:", JSON.stringify(error, null, 2));
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, messageId: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("contact_api_unhandled_error", (error as Error)?.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper function to escape HTML to prevent XSS
function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
}

