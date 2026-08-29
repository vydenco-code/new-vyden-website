# Vyden Co. — Website

Marketing website for **Vyden Co.**, a premium digital marketing agency. Built with React 19, Vite, Tailwind CSS 4, and Motion, with an Express backend for the project inquiry form.

## Tech Stack

- **Frontend:** React 19 + TypeScript, Vite, Tailwind CSS 4, Motion (animations), lucide-react (icons)
- **Backend:** Express + Nodemailer (inquiry emails via Gmail SMTP)

## Getting Started

**Prerequisites:** Node.js

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure environment variables in a `.env` file:

   ```env
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   INQUIRY_RECIPIENT=vyden.co@gmail.com
   ```

   > If email credentials are not set, inquiries are logged to the console instead of emailed.

3. Run the app:

   ```bash
   npm run dev
   ```

   The server runs at `http://localhost:3000`.

## Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start dev server (Express + Vite)    |
| `npm run build`   | Build production bundle to `dist/`   |
| `npm run preview` | Preview the production build         |
| `npm run lint`    | Type-check with TypeScript           |
| `npm run clean`   | Remove the `dist` folder             |

## Project Structure

```
├── api/
│   └── send-email.ts      # Serverless email handler (Vercel-style deploys)
├── public/
│   ├── clients/           # Client logo folders (drop new logos here)
│   └── ...                # Static assets (logos, manifest, robots.txt, sitemap.xml)
├── src/
│   ├── components/        # Shared sections & UI (Navbar, Hero, modals, forms, etc.)
│   ├── data/
│   │   └── clients.ts     # Client/project data (add new clients here)
│   ├── pages/             # Home, About, Services, Software, Work, Contact, 404
│   ├── router.tsx         # Lightweight client-side router
│   ├── App.tsx            # Layout & routing
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles / Tailwind entry
├── server.ts              # Express server: serves the SPA + POST /api/inquiry
└── vite.config.ts
```

### Pages

| Route | Description |
| ----- | ----------- |
| `/` | Home — hero, about brief, services preview, custom software teaser, clients strip |
| `/about` | Story + Vision |
| `/services` | All core marketing services |
| `/software` | Custom internal software offering |
| `/work` | Client case studies overview |
| `/work/:slug` | Individual case study |
| `/contact` | Contact details + inquiry form |

### Adding a new client

1. Drop the logo into `public/clients/<client-slug>/`
2. Open `src/data/clients.ts`, copy an existing entry, fill in details, set `logoUrl` and remove `draft: true`

## Deployment

For standard Node hosting:

```bash
npm run build
NODE_ENV=production npm run dev   # or run server.ts with your process manager
```

The Express server serves `dist/` (with SPA fallback for all routes) and handles inquiry submissions at `POST /api/inquiry`. For serverless platforms (e.g., Vercel), `api/send-email.ts` provides the equivalent endpoint.

