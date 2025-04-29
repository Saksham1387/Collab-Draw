import { randomBytes } from "crypto";

export function generateResetToken() {
  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 15 * 60 * 1000);

  return {
    token,
    expires,
  };
}

export function getEmailTemplate(name: string, link: string) {
  const html = `
      <div style="font-family: Arial, sans-serif; background-color: #000000; color: #ffffff; padding: 40px; border-radius: 8px; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1E90FF;">Password Reset Request</h1>
        <p>Hi ${name},</p>
        <p>
          We received a request to reset your password. Click the button below to choose a new password:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${link}" style="background-color: #1E90FF; color: #ffffff; padding: 12px 24px; border-radius: 5px; text-decoration: none; font-weight: bold; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p>If you didn’t request a password reset, you can safely ignore this email—your password hasn’t been changed.</p>
        <p style="font-size: 0.9em; color: #bbbbbb;">
          This link will expire in 15 minutes for security reasons.
        </p>
        <p style="margin-top: 40px;">Thanks,<br />The Support Team</p>
      </div>
    `;

  return html;
}
