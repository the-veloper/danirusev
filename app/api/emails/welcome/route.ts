import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    const data = await resend.emails.send({
      from: 'E-Commerce Store <noreply@updates.echoray.io>',
      to: [email],
      subject: 'Welcome to Our Store!',
      html: `
        <h1>Welcome to Our Store, ${name}!</h1>
        <p>Thank you for signing up. We're excited to have you as a member of our community.</p>
        <p>You'll receive another email shortly with a link to verify your email address.</p>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
} 