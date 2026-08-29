import nodemailer from "nodemailer";
import { z } from "zod";

export const INQUIRY_RECIPIENT_FALLBACK = "vyden.co@gmail.com";

// Small HTML escaper — prevents email HTML injection from user input.
function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export const inquirySchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  contactNumber: z.string().trim().min(7).max(20),
  email: z.string().trim().email().max(200),
  companyName: z.string().trim().max(100).optional().or(z.literal("")),
  service: z.string().trim().min(1).max(100),
  requirements: z.string().trim().max(2000).optional().or(z.literal("")),
  // Honeypot — must be empty when submitted by a human.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type InquiryData = z.infer<typeof inquirySchema>;

export function validateInquiry(raw: unknown): InquiryData {
  return inquirySchema.parse(raw);
}

function createTransporter() {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

function buildInquiryMail(data: InquiryData) {
  // Escape every user field before it touches HTML.
  const fullName = escapeHtml(data.fullName);
  const contactNumber = escapeHtml(data.contactNumber);
  const email = escapeHtml(data.email);
  const companyName = escapeHtml(data.companyName || "");
  const service = escapeHtml(data.service);
  const requirements = escapeHtml(data.requirements || "");

  return {
    from: process.env.EMAIL_USER,
    to: process.env.INQUIRY_RECIPIENT || INQUIRY_RECIPIENT_FALLBACK,
    subject: `New Project Inquiry: ${service} from ${fullName}`,
    text: `
Full Name: ${data.fullName}
Contact Number: ${data.contactNumber}
Email: ${data.email}
Company Name: ${data.companyName || "N/A"}
Service Interested: ${data.service}
Requirements/Doubts: ${data.requirements || "N/A"}
`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #070f1a; border-bottom: 2px solid #c9a96e; padding-bottom: 10px;">New Project Inquiry</h2>
        <p>You have received a new inquiry from your website.</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 150px;">Full Name:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Contact Number:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${contactNumber}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Company Name:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${companyName || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Service:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${service}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Requirements:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${requirements || "N/A"}</td>
          </tr>
        </table>
        <p style="margin-top: 30px; font-size: 12px; color: #888;">This email was sent from the Vyden Co. website inquiry form.</p>
      </div>
    `,
  };
}

export function hasEmailCredentials(): boolean {
  return Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS);
}

export async function sendInquiryEmail(raw: unknown): Promise<void> {
  const data = validateInquiry(raw);
  if (data.website) {
    // Honeypot filled — silently drop as if sent (bots think they succeeded).
    console.warn("Honeypot triggered — inquiry dropped.");
    return;
  }
  await createTransporter().sendMail(buildInquiryMail(data));
}
