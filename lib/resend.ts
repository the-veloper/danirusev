import { Resend } from 'resend';

// Initialize Resend with API key
export const resend = new Resend(process.env.RESEND_API_KEY);

// Email templates
export const emailTemplates = {
  confirmEmail: (to: string, confirmationUrl: string) => ({
    from: 'E-Commerce Store <noreply@updates.echoray.io>',
    to,
    subject: 'Confirm your email address',
    html: `
      <h2>Welcome to Our Store!</h2>
      <p>Please click the link below to confirm your email address:</p>
      <a href="${confirmationUrl}" style="display: inline-block; background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
        Confirm Email
      </a>
      <p>If you didn't create an account, you can safely ignore this email.</p>
    `,
  }),

  resetPassword: (to: string, resetUrl: string) => ({
    from: 'E-Commerce Store <noreply@updates.echoray.io>',
    to,
    subject: 'Reset your password',
    html: `
      <h2>Reset Your Password</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}" style="display: inline-block; background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
        Reset Password
      </a>
      <p>If you didn't request a password reset, you can safely ignore this email.</p>
    `,
  }),
}; 