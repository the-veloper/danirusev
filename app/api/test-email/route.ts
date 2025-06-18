import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';

export async function GET() {
  try {
    const data = await resend.emails.send({
      from: 'E-Commerce Store <noreply@updates.echoray.io>',
      to: ['your-email@example.com'], // Replace with your email for testing
      subject: 'Test Email',
      html: '<h1>Test Email</h1><p>This is a test email to verify the Resend configuration.</p>',
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
} 