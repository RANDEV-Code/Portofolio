import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * POST /api/contact
 * Body: { name: string; email: string; message: string }
 *
 * Sends the contact form data as an email to the portfolio owner using
 * Nodemailer + Gmail SMTP. Credentials are loaded from environment variables:
 *   GMAIL_USER     — Gmail address used as sender (e.g. ricoadriannaibaho5@gmail.com)
 *   GMAIL_APP_PASS — 16-character Gmail App Password (NOT your login password)
 *   CONTACT_TO     — Recipient address (defaults to GMAIL_USER if omitted)
 */
export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  // Basic server-side validation
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASS;

  if (!gmailUser || !gmailPass) {
    console.error("[contact] Missing GMAIL_USER or GMAIL_APP_PASS env vars.");
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  });

  const recipientEmail = process.env.CONTACT_TO ?? gmailUser;

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${gmailUser}>`,
      replyTo: `"${name}" <${email}>`,
      to: recipientEmail,
      subject: `📬 New message from ${name} — Portfolio`,
      html: `
        <div style="font-family: monospace; max-width: 560px; border: 3px solid #000; padding: 24px; background: #fff;">
          <div style="background: #FFDE4D; border: 3px solid #000; padding: 10px 16px; margin-bottom: 20px;">
            <strong style="font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">
              ◆ New Portfolio Message
            </strong>
          </div>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>

          <div style="margin-top: 16px; border: 2px solid #000; padding: 16px; background: #f9f9f9;">
            <strong>Message:</strong>
            <p style="margin-top: 8px; white-space: pre-wrap;">${message}</p>
          </div>

          <p style="margin-top: 20px; font-size: 11px; color: #888;">
            Sent from portfolio contact form — reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Failed to send email:", err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
