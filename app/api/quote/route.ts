// app/api/quote/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import QuoteEmail from "@/emails/QuoteEmail";
import { createClient } from "@sanity/client";

export const runtime = "nodejs"; // ensure Node runtime, not Edge

// ----- Sanity clients: read-only (no token) and write-enabled (with token)
const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const SANITY_TOKEN = process.env.SANITY_API_WRITE_TOKEN || ""; // <- add this if you want to save leads

const sanityRead = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: "2025-01-01",
  useCdn: true,
});

const sanityWrite = SANITY_TOKEN
  ? createClient({
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    apiVersion: "2025-01-01",
    token: SANITY_TOKEN, // WRITE token required for client.create()
    useCdn: false,
  })
  : null;

// ----- Resend (email) optional
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const EMAIL_TO = process.env.EMAIL_TO || ""; // where you receive
const EMAIL_FROM =
  process.env.EMAIL_FROM || 'LaPurity <onboarding@resend.dev>'; // dev-friendly default

const canSendEmail = !!(RESEND_API_KEY && EMAIL_TO);
const resend = canSendEmail ? new Resend(RESEND_API_KEY) : null;

// ----- Basic validator (email required)
function invalid(body: any) {
  if (!body || typeof body !== "object") return true;
  const required = ["name", "email", "message"];
  return required.some((k) => !String(body[k] || "").trim());
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (invalid(body)) {
      return NextResponse.json({ ok: false, error: "Invalid submission" }, { status: 400 });
    }

    const {
      name,
      email,
      phone = "",
      city = "",
      subject = "New quote request",
      message,
      hp = "",
    } = body;

    // Honeypot
    if (hp) {
      return NextResponse.json({ ok: true, skipped: true }); // silently drop bots
    }

    let leadId: string | null = null;
    let emailId: string | null = null;
    let emailSent = false;
    let leadSaved = false;

    // 1) Save to Sanity if we have a write token
    if (sanityWrite) {
      try {
        const lead = await sanityWrite.create({
          _type: "lead",
          name,
          email,
          phone,
          city,
          subject,
          message,
          createdAt: new Date().toISOString(),
        });
        leadId = lead?._id || null;
        leadSaved = true;
      } catch (e) {
        console.error("sanity:create lead error", e);
        // Do NOT fail the request just because saving failed
      }
    }

    // 2) Send email if configured
    if (canSendEmail && resend) {
      try {
        const { data, error } = await resend.emails.send({
          from: EMAIL_FROM,
          to: EMAIL_TO,
          subject: `Quote request • ${name}`,
          replyTo: email || undefined,              // ← fix
          react: QuoteEmail({ name, email, phone, city, message, submittedAt: new Date() }),
        });

        if (error) throw error;
        emailId = data?.id ?? null;
        emailSent = true;
      } catch (e) {
        console.error("resend:error", e);
        // Do NOT fail the request just because email failed
      }
    }

    return NextResponse.json({
      ok: true,
      leadSaved,
      emailSent,
      leadId,
      emailId,
    });
  } catch (err) {
    console.error("quote:server error", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
