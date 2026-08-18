import { NextResponse } from "next/server";
import { z } from "zod";
import dbConnect from "@/lib/dbConnect";
import Lead from "@/models/Lead";
import { resend } from "@/lib/resend";
import { adminNotificationTemplate, thankYouTemplate } from "@/lib/emailTemplates";
import { siteConfig } from "@/config/siteConfig";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  subject: z.string().min(3),
  message: z.string().min(10),
});

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid form data. Please check your inputs." },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message } = parsed.data;

    await dbConnect();

    const lead = await Lead.create({ name, email, phone, subject, message });

    // Fire both emails in parallel — don't let email failure block success response
    // if DB save already succeeded (lead is safely stored either way)
    try {
      await Promise.all([
        resend.emails.send({
          from: `${siteConfig.name} <onboarding@resend.dev>`,
          to: process.env.ADMIN_EMAIL,
          subject: `New Inquiry: ${subject}`,
          html: adminNotificationTemplate({ name, email, phone, subject, message }),
        }),
        resend.emails.send({
          from: `${siteConfig.name} <onboarding@resend.dev>`,
          to: email,
          subject: `Thank you for contacting ${siteConfig.name}`,
          html: thankYouTemplate({ name }),
        }),
      ]);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Lead is already saved — don't fail the whole request over email issues
    }

    return NextResponse.json(
      { success: true, message: "Your message has been sent successfully!", leadId: lead._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}