// SETUP REQUIRED:
// 1. Go to resend.com → sign up free → get API key
// 2. In Vercel dashboard → your project → Settings → Environment Variables
// 3. Add: RESEND_API_KEY = your_key_here
// 4. For local dev: create .env.local at project root with:
//    RESEND_API_KEY=your_resend_api_key_here
// 5. .env.local is already in .gitignore — never commit it

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

/* ─── Rate Limiting (in-memory, resets on cold start) ──────────────────── */
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 3;

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }

  const timestamps = (rateLimitMap.get(ip) as number[]).filter(
    (t) => now - t < windowMs
  );
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);

  return timestamps.length > maxRequests;
}

/* ─── Handler ───────────────────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  // Rate limiting — use x-forwarded-for (Vercel) or fallback
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many messages. Please try again later.' },
      { status: 429 }
    );
  }

  // Parse body
  let body: { name?: string; email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { name, email, message } = body;

  // Basic presence validation
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Name, email, and message are required.' },
      { status: 400 }
    );
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: 'Invalid email address.' },
      { status: 400 }
    );
  }

  // Send via Resend
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      // UPDATE THIS — after verifying your domain on Resend, change to:
      // from: 'Portfolio Contact <contact@yourdomain.com>'
      from: 'Portfolio Contact <onboarding@resend.dev>',
      // UPDATE THIS — replace with your actual email address
      to: 'vasanth11rvb2022@gmail.com',
      replyTo: email,
      subject: `New message from ${name} — Portfolio Contact`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a; border-bottom: 2px solid #3b82f6; padding-bottom: 12px;">
            New Portfolio Contact
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; color: #666; width: 80px; vertical-align: top;">
                <strong>Name</strong>
              </td>
              <td style="padding: 12px 0; color: #1a1a1a;">
                ${name}
              </td>
            </tr>
            <tr style="border-top: 1px solid #eee;">
              <td style="padding: 12px 0; color: #666; vertical-align: top;">
                <strong>Email</strong>
              </td>
              <td style="padding: 12px 0;">
                <a href="mailto:${email}" style="color: #3b82f6;">${email}</a>
              </td>
            </tr>
            <tr style="border-top: 1px solid #eee;">
              <td style="padding: 12px 0; color: #666; vertical-align: top;">
                <strong>Message</strong>
              </td>
              <td style="padding: 12px 0; color: #1a1a1a; line-height: 1.6;">
                ${message.replace(/\n/g, '<br/>')}
              </td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 12px; background: #f0f9ff;
                      border-radius: 8px; font-size: 13px; color: #666;">
            Sent from your portfolio contact form.
            Reply directly to this email to respond to ${name}.
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Resend error:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again.' },
      { status: 500 }
    );
  }
}
