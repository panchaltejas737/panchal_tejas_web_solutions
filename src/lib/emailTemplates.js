import { siteConfig } from "@/config/siteConfig";

export function adminNotificationTemplate({ name, email, phone, subject, message }) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; background-color: #F4F5F7;">
      <div style="background-color: #ffffff; border-radius: 12px; padding: 32px; border: 1px solid #E4E6EA;">
        <h2 style="color: #1A2540; margin-top: 0;">New Contact Form Submission</h2>
        <p style="color: #5B6470; font-size: 14px;">You've received a new inquiry from your website.</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr><td style="padding: 8px 0; color: #5B6470; font-size: 13px; width: 100px;">Name</td><td style="padding: 8px 0; color: #1E2124; font-weight: 600;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #5B6470; font-size: 13px;">Email</td><td style="padding: 8px 0; color: #1E2124; font-weight: 600;">${email}</td></tr>
          <tr><td style="padding: 8px 0; color: #5B6470; font-size: 13px;">Phone</td><td style="padding: 8px 0; color: #1E2124; font-weight: 600;">${phone}</td></tr>
          <tr><td style="padding: 8px 0; color: #5B6470; font-size: 13px;">Subject</td><td style="padding: 8px 0; color: #1E2124; font-weight: 600;">${subject}</td></tr>
        </table>
        <div style="margin-top: 16px; padding: 16px; background-color: #F4F5F7; border-radius: 8px;">
          <p style="color: #1E2124; font-size: 14px; margin: 0; white-space: pre-wrap;">${message}</p>
        </div>
      </div>
    </div>
  `;
}

export function thankYouTemplate({ name }) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; background-color: #F4F5F7;">
      <div style="background-color: #ffffff; border-radius: 12px; padding: 32px; border: 1px solid #E4E6EA;">
        <h2 style="color: #1A2540; margin-top: 0;">Thank You, ${name}!</h2>
        <p style="color: #5B6470; font-size: 14px; line-height: 1.6;">
          We've received your message and appreciate you reaching out to
          <strong>${siteConfig.name}</strong>. Our team will review your inquiry
          and get back to you within 24 hours.
        </p>
        <p style="color: #5B6470; font-size: 14px; line-height: 1.6;">
          In the meantime, feel free to explore our work or reply directly to
          this email if you have anything else to add.
        </p>
        <p style="color: #1E2124; font-size: 14px; margin-top: 24px;">
          Best regards,<br/>
          <strong>${siteConfig.name}</strong>
        </p>
      </div>
    </div>
  `;
}