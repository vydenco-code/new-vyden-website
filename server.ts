import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { hasEmailCredentials, sendInquiryEmail } from "./lib/mailer";
import { ZodError } from "zod";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(compression());

  app.use(helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: process.env.NODE_ENV === "production" ? {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
        imgSrc: ["'self'", "data:", "https:", "blob:"],
        connectSrc: ["'self'"],
        frameSrc: ["'self'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
      },
    } : false,
  }));

  // Limit body size — inquiry payloads are tiny.
  app.use(express.json({ limit: "10kb" }));

  // Health check — no rate limit, no auth.
  app.get("/healthz", (_req, res) => {
    res.status(200).json({ status: "ok", uptime: process.uptime() });
  });

  const inquiryLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many requests, please try again later." },
  });

  // API Routes
  app.post("/api/inquiry", inquiryLimiter, async (req, res) => {
    // Bot check is inside sendInquiryEmail (honeypot). Validation is via zod.
    console.log("Received Inquiry:", { ...req.body, website: undefined });

    if (!hasEmailCredentials()) {
      // Validate shape even when we are not sending, so bad payloads get 400.
      try {
        // Lightweight shape check without side-effect; re-use send path
        // but avoid actually sending when creds missing.
        const { validateInquiry } = await import("./lib/mailer");
        const data = validateInquiry(req.body);
        if (data.website) {
          return res.status(200).json({ message: "Inquiry received" });
        }
      } catch (e) {
        if (e instanceof ZodError) {
          return res.status(400).json({ message: "Invalid inquiry data", issues: e.issues });
        }
        // fall through to generic handling
      }
      console.warn("Email credentials missing. Inquiry logged to console only.");
      return res.status(200).json({ message: "Inquiry received (Email not sent - credentials missing)" });
    }

    try {
      await sendInquiryEmail(req.body);
      console.log("Email sent successfully");
      res.status(200).json({ message: "Inquiry sent successfully" });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid inquiry data", issues: error.issues });
      }
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Failed to send inquiry email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    // Assets (hashed filenames) — cache for a year
    app.use(express.static(distPath, {
      maxAge: "1y",
      immutable: true,
      index: false,
      setHeaders(res, filePath) {
        // index.html must not be cached long — SPA entry
        if (filePath.endsWith("index.html")) {
          res.setHeader("Cache-Control", "no-cache");
        }
      },
    }));
    app.get("*", (_req, res) => {
      res.setHeader("Cache-Control", "no-cache");
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
