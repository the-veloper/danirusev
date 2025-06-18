export const supabaseConfig = {
  auth: {
    autoConfirm: false,
    providers: [],
    identityEmailTemplates: {
      confirmSignUp: {
        subject: "Confirm Your Email",
        content: `
          <h2>Welcome to Our Store!</h2>
          <p>Please confirm your email address by clicking the link below:</p>
          <a href="{{ .ConfirmationURL }}" style="display: inline-block; background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
            Confirm Email
          </a>
          <p>If you didn't create an account, you can safely ignore this email.</p>
        `,
        sender: "E-Commerce Store <noreply@updates.echoray.io>",
      },
      resetPassword: {
        subject: "Reset Your Password",
        content: `
          <h2>Reset Your Password</h2>
          <p>Click the link below to reset your password:</p>
          <a href="{{ .ConfirmationURL }}" style="display: inline-block; background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
            Reset Password
          </a>
          <p>If you didn't request a password reset, you can safely ignore this email.</p>
        `,
        sender: "E-Commerce Store <noreply@updates.echoray.io>",
      },
      magicLink: {
        subject: "Your Magic Link",
        content: `
          <h2>Login to Your Account</h2>
          <p>Click the link below to sign in to your account:</p>
          <a href="{{ .ConfirmationURL }}" style="display: inline-block; background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
            Sign In
          </a>
          <p>If you didn't request this link, you can safely ignore this email.</p>
        `,
        sender: "E-Commerce Store <noreply@updates.echoray.io>",
      },
      emailChange: {
        subject: "Confirm Email Change",
        content: `
          <h2>Confirm Email Change</h2>
          <p>Click the link below to confirm your new email address:</p>
          <a href="{{ .ConfirmationURL }}" style="display: inline-block; background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
            Confirm Email Change
          </a>
          <p>If you didn't request this change, please contact support immediately.</p>
        `,
        sender: "E-Commerce Store <noreply@updates.echoray.io>",
      },
    },
  },
}; 