import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("Please define the RESEND_API_KEY environment variable in .env.local");
}

export const resend = new Resend(process.env.RESEND_API_KEY);