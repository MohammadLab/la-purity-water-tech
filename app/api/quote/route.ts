// app/api/quote/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import QuoteEmail from "@/emails/QuoteEmail";
import { client } from "@/lib/sanity.client"; // your existing configured Sanity client

export const runtime = "nodejs";

const resendApiKey = process.env.RESEND_API_KEY || "";
const emailTo = process.env.EMAIL_TO || "";
const emailFrom =
  process.env.EMAIL_FROM || 'LaPurity <onboarding@resend.dev>'; // temp sender works for testing

const canSendEmail = !!(resendApiKey && emailTo);

const resend = canSendEmail ? new Resend(resendApiKey) : null;

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

    const { name, email, phone = "", city = "", subject = "New quote request", message } = body;

    // 1) Save to Sanity (always)
    const lead = await client.create({
      _type: "lead",
      name,
      email,
      phone,
      city,
      subject,
      message,
      createdAt: new Date().toISOString(),
    });

    // 2) Email (only if envs are set)
    let emailId: string | null = null;
    if (canSendEmail && resend) {
      const { data, error } = await resend.emails.send({
        from: emailFrom,
        to: emailTo,          // any inbox you have today (Gmail is fine)
        replyTo: email,      // so you can hit "reply" to the sender
        subject: `Quote request • ${name}`,
        react: QuoteEmail({ name, email, phone, city, message, submittedAt: new Date() }),
      });
      if (error) throw error;
      emailId = data?.id ?? null;
    }

    return NextResponse.json({
      ok: true,
      emailSent: canSendEmail,
      emailId,
      leadId: lead?._id || null,
    });
  } catch (err: any) {
    console.error("quote:error", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
