import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const data = await resend.emails.send({
      from: 'E-Commerce Store <noreply@updates.echoray.io>',
      to: [email],
      subject: 'Password Reset Instructions',
      html: `
        <h1>Reset Your Password</h1>
        <p>You'll receive another email shortly with a link to reset your password.</p>
        <p>If you didn't request this password reset, you can safely ignore this email.</p>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
} 