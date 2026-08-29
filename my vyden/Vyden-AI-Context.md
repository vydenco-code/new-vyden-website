# Vyden Co. — Complete AI Context File

> **Purpose:** Feed this file to any AI (ChatGPT, Claude, Grok, etc.) so it instantly understands Vyden Co. — who you are, what you do, your website, brand voice, services, clients, tech stack, and positioning. Last updated: 2026-08-26 — Website v2.0 (Multi-Page).

---

## 1. Brand Identity

- **Legal / Brand Name:** Vyden Co.
- **Tagline / Promise:** _Vyden Your Horizons_ — _We Build Brands. We Drive Growth. We Shape Futures._
- **Core Belief:** _If you dare to grow, we dare to deliver._
- **Positioning (use this exact line with AI):** Vyden Co. is a **full-service marketing and software solutions company** — not just a digital agency. We provide **all digital marketing services + all traditional marketing services + custom internal software** built around each client's unique process.
- **Location:** Kolkata, West Bengal, India — serving clients **globally** (Global Digital Agency).
- **Founded:** Young team of passionate professionals who have lived and breathed digital from the very beginning. Started as a shared dream among driven individuals, now a results-focused company.
- **Personality:** Premium, ambitious, relentless, young, data-driven, AI-powered, no-guesswork, hands-on.

---

## 2. Domains, Socials & Contact — Single Source of Truth

All contact data is centralized in `src/data/site.tsx` — change it once, everywhere updates.

| Field | Value |
|---|---|
| **Primary Domain** | `https://www.vyden.co.in` |
| **Email** | `vyden.co@gmail.com` |
| **Phone (display)** | `+91 99037 99675` |
| **Phone (raw / tel:)** | `+919903799675` |
| **WhatsApp Number** | `919903799675` |
| **WhatsApp Chat URL** | `https://wa.me/919903799675` |
| **WhatsApp Prefilled** | `https://wa.me/919903799675?text=Hi%20Vyden%20Co.%2C%20I%20want%20to%20know%20more!` |
| **Address** | Kolkata, West Bengal, India — 700001 (Geo: 22.5726, 88.3639) |
| **Hours** | Mon–Sat 09:00–18:00 IST |

### Social Links (exact URLs from codebase)

| Platform | URL | Handle |
|---|---|---|
| Instagram | `https://www.instagram.com/vyden.co/` | @vyden.co |
| Facebook | `https://www.facebook.com/profile.php?id=61583503198232` | Vyden Co. page |
| LinkedIn | `https://www.linkedin.com/company/vyden-co/` | vyden-co |
| X (Twitter) | `https://x.com/vyden_co` | @vyden_co |
| WhatsApp | `https://wa.me/919903799675` | — |

Use these exact URLs in AI outputs — do not invent handles.

---

## 3. Brand Story, Vision & Philosophy

### Story (from `src/components/Story.tsx`)
Vyden Co. was founded on a simple yet powerful idea — to turn a shared dream into a bold reality. Rooted in Kolkata and shaped by an ever-evolving digital landscape, the team studied algorithms, consumer behavior, SEO, content strategy, Meta/Google Ads, and web design long before entering the industry. Every solution comes from real expertise, not guesswork. Vyden is more than an agency — a team of complementary strengths united by delivering results that move the needle.

### Vision (from `src/components/Vision.tsx` — honest framing)
> _At Vyden Co., our vision is to become a globally recognized leader in digital marketing and drop servicing, setting new benchmarks for innovation, performance, and scalability._ (Note: currently being reworded to honest aspirational language — e.g. _"We're building Vyden Co. into a globally recognized name in marketing and business software solutions"_ — avoid claiming leadership you haven't earned yet. AI should use the honest version.)

**Three Pillars:**
1. **Global Expansion** — brand recognized across continents with world-class solutions.
2. **AI-Powered Innovation** — AI as catalyst for intelligent strategies and optimized campaigns.
3. **Sustainable Growth Models** — scalable, cost-efficient marketing ecosystems.

### Philosophy
- Don't follow trends — study, understand, and use them.
- Action over talk, push boundaries, constantly evolve.
- Data + AI + relentless ambition.

---

## 4. Services — Complete List (9 core + Custom Software)

Source: `src/data/services.ts`. Each has `title`, `description`, `details[]`. Inquiry form dropdown (`src/components/InquiryForm.tsx`) includes all + "Other".

### 4.1 Social Media Marketing
High-converting campaigns across all platforms. Details: Profile Setup & Management, Organic Growth, Meta Ads (FB & IG), Performance Marketing & Lead Gen, Brand Presence, Creative Content (Reels/Posts/Carousels/Ad Creatives), Audience Targeting & Conversion Optimization.

### 4.2 Google Business & Local SEO
Dominate local search and Maps. Details: GBP Setup & Verification, SEO Keyword-Rich Description, Local SEO & Maps Ranking, Google Ads, Ongoing Maintenance, Online Reputation Management (Reviews).

### 4.3 Branding & Public Relations
Brand identities + PR across digital/traditional. Details: Brand Identity & Rebranding, Logo & Visual Theme, Brand Positioning, Social & Google Branding Alignment, Influencer Collabs & Media Outreach, PR Campaign Planning, Event Promotions & Newspaper Advertisements.

### 4.4 Podcast Production
End-to-end. Details: Complete Management, Strategy/Script/Flow, Studio Setup & Equipment Support, Anchor Hosting/Audio & Video Editing, Marketing & Multi-Platform Distribution.

### 4.5 WhatsApp Automation & AI — **FLAGSHIP**
Automate conversations, nurture leads, convert faster. Details: Custom Chatbot Flows, Automated Lead Gen & CRM Integration, Bulk Messaging Campaigns, AI Smart Response Automation, Sales Funnel Setup & Performance Tracking.

### 4.6 Web & App Development — **FLAGSHIP**
Fast, scalable, conversion-focused. Details: Custom Website Design & Dev, Static/Dynamic & E-commerce Dev, Mobile App (iOS & Android), Maintenance/Optimization/Security, AI Integration & Automation Features.

### 4.7 Influencer Marketing
Network of 500+ influencers & UGC creators. Details: 500+ Network, Niche-Specific Strategy, Outreach & Collaboration Management, Performance Tracking & Reporting.

### 4.8 Graphic Design & Creative
Professional creative. Details: Social Media Creative Design, Ad Creatives for Performance Marketing, Print Ads & Marketing Collateral, Packaging & Label Design, Logo & Complete Brand Identity Systems.

### 4.9 Outdoor Advertising (Traditional Marketing)
High-impact physical presence. Details: Premium Hoarding (Backlit & Non-lit), Strategic Bannering & Frame Displays, End-to-End Leafletting (Design/Print/Distribution/Newspaper Insertion), Sunpack Solutions, Experiential Marketing (Lookwalkers & Event Management), Print Media (Newspaper Ads & Inserts), Point of Sale (Lolipops, Flenges, Posters, Danglers & Standees).

### 4.10 Custom Internal Software — Dedicated Page `/software`
Built around the client's exact process. Most common builds:
- **Lead-Tracking CRM** — every inquiry from calls/WhatsApp/ads/walk-ins in one place, assign, follow up.
- **Inventory Systems** — live stock visibility, purchases/sales, low-stock alerts.
- **WhatsApp Automation Dashboards** — all conversations/broadcasts/automated replies in one dashboard, connected to leads.
- **Booking & Appointment Systems** — online booking, real-time schedule, reminders, calendar sync.
- **Custom Sheets & Internal Jobs** — replace scattered spreadsheets with one clean system + custom fields/reports.
- **Built Around Your Use Case** — if it's unique, we design around it.

**Process (Software Page):** 01 Sit With Your Process → 02 Map the Tool → 03 Build & Test (real data) → 04 Train & Support.

> For AI: When listing services, always include Traditional (Outdoor Advertising) and Custom Software alongside digital — never position as "only digital."

---

## 5. Clients / Work — Case Studies

Source: `src/data/clients.ts` — slugs `rg-cellulars`, `realme`, `kolkata-filter-fusion` + two drafts `new-client-one`, `new-client-two`.

| Client | Slug | Tag | What We Did |
|---|---|---|---|
| **RG Cellulars** | `rg-cellulars` | Multi-Brand Mobile Retail | Organic Social Growth, Complete Page Management, Brand Identity Refresh, Influencer Marketing for Local Reach, WhatsApp Automation for Lead Handling, Meta Ads for Targeted Sales Growth |
| **Realme** | `realme` | Global Smartphone Brand | Regional Launch Strategy across West Bengal (Realme 16 Pro Series), Mega Influencer Campaign, High-Reach Digital Awareness, Coordinated Multi-Creator Promotions |
| **Kolkata Filter Fusion (KFF)** | `kolkata-filter-fusion` | Café Brand | Initial Social Boost Strategy, High-Quality Video Content Production, 150,000+ Organic Reach, Direct Increase in Footfall, Menu Card & Promotional Leaflet Design |

**Two new clients:** Draft entries exist. Add logos to `public/clients/new-client-one/` and `new-client-two/` and fill `src/data/clients.ts`, set `draft: false` to publish. See `public/clients/*/README.txt`.

Work is shown **brief** on Home (`src/components/ClientStrip.tsx` — logo row) and **detailed** on `/work` and `/work/:slug`.

---

## 6. Website Architecture — Pages & Routes

Tech: React 19 + Vite + Tailwind CSS 4 + Motion + Express (see §9). Custom lightweight router `src/router.tsx` (no `react-router-dom`), `src/inquiry.ts` context for global inquiry modal. SPA fallback via `server.ts` + Vite `appType: "spa"`.

| Route | File | Content |
|---|---|---|
| `/` | `src/pages/HomePage.tsx` | Hero + Story + ServicesPreview (6 cards, last highlighted) + SoftwareTeaser (5 tool chips) + ClientStrip (3 logos) + CTA |
| `/about` | `src/pages/AboutPage.tsx` | `PageHeader` + Story + Vision + CTA |
| `/services` | `src/pages/ServicesPage.tsx` | `PageHeader` + Services (9 unlock cards) + CTA |
| `/software` | `src/pages/SoftwarePage.tsx` | `PageHeader` (pattern) + "What We Build" 6 cards + "How We Work" 4 steps + CTA |
| `/work` | `src/pages/WorkPage.tsx` | `PageHeader` + project grid (detailed cards) |
| `/work/:slug` | `src/pages/WorkDetailPage.tsx` | Hero with logo + tag + "What We Delivered" numbered list + CTA; 404 if unknown slug |
| `/contact` | `src/pages/ContactPage.tsx` | `PageHeader` + contact info cards (Call/WhatsApp/Email/Location) + socials + `InquiryForm` |
| `*` | `src/pages/NotFoundPage.tsx` | 404 |

Shared layout in `src/App.tsx`: `Navbar` + `Footer` + `WhatsAppFloat` + `CustomCursor` + `LegalModal` + `InquiryModal` + skip-to-content link (`#main-content`). All pages use `usePageMeta` hook for per-page `<title>`.

To add a page: create `src/pages/X.tsx` with `usePageMeta`, add route in `src/App.tsx:Routes()`, add link in `Navbar.tsx` + `Footer.tsx`, update `public/sitemap.xml`.

---

## 7. Design System

From `src/index.css`:

- **Fonts:** Serif `Cormorant Garamond` (300–700) for headings, Sans `Outfit` (300–600) for body. Loaded via Google Fonts `fonts.googleapis.com`.
- **Colors:** `--color-navy: #1a2d4a`, `--navy-mid: #12223a`, `--navy-light: #1e3a5f`, `--navy-deep: #0d1e33` (primary bg), `--gold: #c9a96e` (accent), `--gold-light: #e8c98a`, `--off-white: #f5f3ef`, `--wa-green: #25D366`.
- **Style:** Premium, dark navy + gold, serif headings, thin gold dividers, `border-l-[3px] border-gold` cards, `mix-blend` overlays, noise overlay (`noise-overlay` fixed div), `custom-scrollbar`.
- **Motion:** `motion/react` — `initial: opacity 0, y:20` + `whileInView: opacity 1` with stagger; hero carousel infinite `y: -1000` loop.

Do not change palette or typography when writing copy — keep visual language intact.

---

## 8. Tech Stack & Project Structure

**Package:** `react-example@0.0.0` (private), `type: module`, Node 24.19.0, npm 11.17.0.

**Scripts:** `npm run dev` → `tsx server.ts` (Express + Vite middleware, port 3000), `npm run build` → `vite build` (→ `dist/`), `npm run preview` → `vite preview`, `npm run lint` → `tsc --noEmit`.

**Key Deps:** `react@19`, `react-dom@19`, `vite@6.2`, `@vitejs/plugin-react@5`, `@tailwindcss/vite@4`, `tailwindcss@4`, `motion@12`, `lucide-react@0.546`, `express@4.21`, `helmet@8`, `compression`, `express-rate-limit`, `nodemailer@8`, `zod`, `dotenv@17`, `tsx@4`, `typescript@5.8`.

**Prod Server (`server.ts`):** Express with `helmet` (CSP enabled only in production), `compression`, `express.json({ limit: "10kb" })`, rate-limited `POST /api/inquiry` (20/15min), `GET /healthz`, Vite middleware in dev / static `dist/` with 1y cache for assets + `no-cache` for `index.html` in prod. Inquiry emails via `lib/mailer.ts` (Nodemailer Gmail SMTP, `zod` validation, `escapeHtml`, honeypot `website` field). Serverless fallback `api/send-email.ts` for Vercel.

**Structure:**
```
api/send-email.ts
lib/mailer.ts
public/{vyden-logo.svg, rg logo - Edited.svg, Realme_logo.svg, kff logo.svg, clients/{new-client-one,new-client-two}/README.txt, sitemap.xml, robots.txt, manifest.json}
src/{App.tsx, main.tsx, index.css, router.tsx, inquiry.ts, data/{site.tsx, services.ts, clients.ts, legal.tsx}, hooks/{useOverlay.ts,usePageMeta.ts}, components/{Navbar.tsx,Hero.tsx,Story.tsx,Vision.tsx,Services.tsx,ServicesPreview.tsx,SoftwareTeaser.tsx,ClientStrip.tsx,CTA.tsx,Footer.tsx,WhatsAppFloat.tsx,CustomCursor.tsx,LegalModal.tsx,InquiryModal.tsx,InquiryForm.tsx,PageHeader.tsx,SectionHeader.tsx,icons/WhatsAppIcon.tsx}, pages/{HomePage.tsx,AboutPage.tsx,ServicesPage.tsx,SoftwarePage.tsx,WorkPage.tsx,WorkDetailPage.tsx,ContactPage.tsx,NotFoundPage.tsx}}
server.ts, vite.config.ts, tsconfig.json, opencode.json
my vyden/  (this folder)
```

---

## 9. SEO & Meta

- **Title:** `Vyden Co. | Premium Digital Marketing & AI Growth Agency Kolkata` (`index.html:7`)
- **Description:** `Vyden Co. is the best digital marketing agency in Kolkata. We provide AI-powered social media marketing, SEO, branding, and podcast production globally.` (needs future expansion to mention traditional + software)
- **Keywords:** `digital marketing agency in Kolkata, best Kolkata digital marketing agencies, podcast creation in Kolkata, graphic designing in Kolkata, WhatsApp automation in Kolkata, social media marketing in Kolkata, meta ads marketing in Kolkata, Google ads marketing in Kolkata, Website Development in kolkata`
- **OG:** `og:title`, `og:description`, `og:image: https://www.vyden.co.in/vyden-logo.svg`, `twitter:card: summary_large_image`, `theme-color: #0d1e33`
- **JSON-LD (`index.html:17`):** `WebSite` + `LocalBusiness` (Kolkata, West Bengal, 700001, tel +919903799675, sameAs: Facebook/Instagram/LinkedIn/X)
- **Sitemap:** `public/sitemap.xml` — `/`, `/about`, `/services`, `/software`, `/work`, `/contact` (lastmod 2026-08-26)
- **Footer SEO strip:** 8 keywords in low opacity.
- **Per-page titles:** via `usePageMeta` (e.g. `Services | Vyden Co.`).

For AI-generated SEO copy, keep Kolkata digital marketing keywords but add: `traditional marketing agency Kolkata`, `custom software development Kolkata`, `hoarding advertising Kolkata`, `website development in Kolkata`.

---

## 10. Voice, Tone & Writing Rules for AI

- **Sound human, not AI.** No generic fluff, no "In today's digital era...". Match existing site voice: premium, direct, confident, slightly ambitious, concise.
- **Study the real site copy first** — mirror phrasing like "relentless ambition", "measurable impact", "tailor to the modern world".
- **Never claim "leading/global leader" as fact** — frame as building toward it.
- **Always position as full-service** — digital + traditional + custom software. If you list services, include at least one traditional (Outdoor Advertising) and one software (Custom Internal Software).
- **Keep gold/navy premium feel in words** — no slang, no emojis unless asked.

**Example prompt for another AI:**
> You are writing for Vyden Co., a full-service marketing and software solutions company in Kolkata (digital + traditional + custom internal software). Use the contact/social/domain details and service list in this file exactly. Write in Vyden's premium human voice — concise, ambitious, no AI filler. Always include Traditional Marketing and Custom Software when summarizing what Vyden does.

---

## 11. How to Update

- **Contact/socials:** edit `src/data/site.tsx` (+ `index.html` JSON-LD if address/phone changes).
- **Services:** edit `src/data/services.ts` — automatically appears on `/services`, Home preview, and footer (footer reads from site data, services preview reads from services data).
- **Clients:** drop logo into `public/clients/<slug>/`, add entry to `src/data/clients.ts` (copy existing), set `logoUrl: "/clients/<slug>/file.svg"`, remove `draft: true`.
- **Legal:** edit `src/data/legal.tsx`.
- **Pages:** see §6.

---

## 12. Environment

Copy `.env.example` to `.env`:
```
PORT=3000
NODE_ENV=development
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password
INQUIRY_RECIPIENT=vyden.co@gmail.com
```
Without email creds, `POST /api/inquiry` logs to console only (expected). Health: `GET /healthz`.

---

## 13. Version History

- **v1.0** — Single-page site (Hero/Story/Services/Vision/Projects/CTA) + Express + Nodemailer, AI Studio scaffold, `@google/genai` unused.
- **v2.0 (2026-08-26, current)** — Multi-page (7 routes + detail), custom `router.tsx` + `inquiry.ts`, extracted `data/` layer (`site.tsx`, `services.ts`, `clients.ts`, `legal.tsx`), shared `PageHeader`/`SectionHeader`, `lib/mailer.ts` with `zod` + `escapeHtml` + honeypot, server hardening (`helmet` CSP prod-only, `compression`, `rateLimit` 20/15min, `healthz`, cache headers), `InquiryForm.tsx` extracted, `Vision.tsx` picsum replaced with local CSS visual, `useOverlay`/`usePageMeta` hooks, `React.lazy` per page, vendor chunk strategy, `opencode.json` Playwright MCP, `.env.example`, `my vyden/` context folder.

---

*End of file — feed this entire document to any AI for complete Vyden context.*
