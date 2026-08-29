import { hasEmailCredentials, sendInquiryEmail } from "../lib/mailer";
import { ZodError } from "zod";
import type { InquiryData } from "../lib/mailer";

interface ApiRequest {
  method?: string;
  body: InquiryData & { website?: string };
}

interface ApiResponse {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (!hasEmailCredentials()) {
    console.warn("Email credentials missing. Inquiry logged to console only.");
    return res.status(200).json({ success: true, warning: "Credentials missing" });
  }

  try {
    await sendInquiryEmail(req.body);
    return res.status(200).json({ success: true });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: "Invalid inquiry data", issues: error.issues });
    }
    console.error(error);
    return res.status(500).json({ error: "Email failed" });
  }
}
