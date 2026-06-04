# CLAUDE.md — MAA Saraswati Veterinary Hospital Website

> Read automatically by Claude Code at the start of every session.
> Single source of truth for project conventions, commands, and rules.

---

## Project Overview

**Client**: MAA Saraswati Veterinary Hospital, Hyderabad
**Type**: Multilingual charity/NGO website with built-in Admin Panel
**Repo structure**: Monorepo — `frontend/` (Next.js) and `backend/` (Express) in the same repo

```
maa-website/
├── frontend/          ← Next.js 14 + JavaScript + Tailwind CSS
├── backend/           ← Node.js + Express + MySQL (Sequelize)
├── CLAUDE.md          ← (this file)
├── agents.md
├── ecosystem.config.js ← PM2 config for both apps
└── docs/
    ├── 01_ARCHITECTURE.md
    ├── 02_PRD.md
    ├── 03_AI_PROMPTS.md
    ├── 04_UI_PROMPTS.md
    └── 05_STYLE_GUIDE.md
```

---

## Essential Commands

### Frontend (Next.js)
```bash
cd frontend
npm install               # install dependencies
npm run dev               # dev server → http://localhost:3000
npm run build             # production build (.next/)
npm run start             # run production build locally
npm run lint              # ESLint + Next.js lint
```

### Backend (Express)
```bash
cd backend
npm install
npm run dev               # nodemon → http://localhost:5000
npm start                 # production (PM2 manages this)
node scripts/seed.js      # create admin user + seed page_content
```

### Full-stack local dev
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

### Deployment (VPS)
```bash
# Build and deploy both apps
cd frontend && npm run build
pm2 startOrRestart ecosystem.config.js
pm2 save

# Restart individually
pm2 restart maa-frontend
pm2 restart maa-api
pm2 logs              # view all logs
pm2 status            # health check
```

---

## Architecture at a Glance

| Layer | Technology |
|---|---|
| Framework | Next.js 14 — App Router |
| Language | JavaScript (no TypeScript) |
| Styling | Tailwind CSS 3 with custom tokens |
| Fonts | next/font — DM Serif Display + Plus Jakarta Sans |
| Images | next/image (auto WebP, lazy load, sizing) |
| i18n | react-i18next (EN · TE · HI · TA) — client components only |
| HTTP | Axios via `src/services/api.js` |
| Forms | React Hook Form v7 — 'use client' only |
| Animation | Framer Motion v11 — 'use client' only |
| Notifications | React Hot Toast — 'use client' |
| Icons | Lucide React — strokeWidth={1.5} size={20} |
| Backend | Node.js 20 LTS + Express 4 |
| ORM | Sequelize 6 (MySQL) |
| Auth | JWT in httpOnly cookie + bcryptjs |
| Uploads | Multer disk storage on VPS |
| Email | Nodemailer SMTP |
| Process | PM2 (both frontend and backend) |
| Proxy | Nginx (port 80/443 → 3000 and 5000) |

---

## CRITICAL — Server vs Client Components

**This is the #1 rule in Next.js App Router. Never get this wrong.**

```
'use client' REQUIRED for:
  - Any component using useState, useEffect, useRef
  - Any component using useTranslation() (react-i18next)
  - Any component using Framer Motion
  - Any component using React Hook Form
  - Any component with onClick, onChange, or other event handlers
  - AuthContext, ProtectedRoute, LanguageSwitcher, ScrollToTop
  - Navbar (mobile menu state), StatsBar (counter), all gallery components

Server Components (no directive — Next.js default):
  - page.js files (static shell — they import client components)
  - Footer, PageHero, PawDivider (purely static markup)
  - layout.js files
```

**Pattern for every page.js:**
```js
// src/app/about/page.js — Server Component (no 'use client')
import AboutClient from '@/components/about/AboutClient'  // 'use client' child

export const metadata = {
  title: 'About Us | MAA Saraswati Veterinary Hospital',
  description: '...',
}

export default function AboutPage() {
  return <AboutClient />  // Client component does data fetching + rendering
}
```

---

## Project Conventions

### General
- **No TypeScript** — JavaScript only
- **No inline styles** — Tailwind only; CSS vars in `globals.css`
- All user-facing strings through `useTranslation()` — never hardcoded English
- All API calls through `src/services/api.js` — never raw `fetch()` in components
- Every data-fetching component handles: loading · data · error · empty states
- Use `next/image` for ALL images — never `<img>` tags
- Use `next/link` for ALL internal navigation — never `<a href>`

### next/image Usage
```jsx
import Image from 'next/image'

// ✅ Correct
<Image
  src={photo.url}
  alt={photo.caption || 'Gallery photo'}
  width={800}
  height={600}
  className="rounded-2xl object-cover w-full h-full"
/>

// For fill layout (inside a relative container)
<div className="relative aspect-video w-full">
  <Image src={url} alt={alt} fill className="object-cover rounded-2xl" />
</div>

// ❌ Never use <img> tags
```

### next/link Usage
```jsx
import Link from 'next/link'

// ✅ Correct
<Link href="/donate" className="btn-primary">Donate Now</Link>

// ❌ Never use <a href="/donate">
```

### File Naming
```
App pages:    lowercase folders + page.js   → app/our-team/page.js
Components:   PascalCase .jsx               → HeroSection.jsx
Hooks:        camelCase .js                 → useFetch.js
Services:     camelCase .js                 → api.js
i18n files:   lowercase .json              → en.json, te.json
```

### Import Aliases
```js
// next.config.js sets @/ → src/
import Navbar from '@/components/common/Navbar'
import api from '@/services/api'
import { useFetch } from '@/hooks/useFetch'
```

### Standard page.js Shell
```js
// src/app/[route]/page.js
import PageClient from '@/components/[route]/PageClient'

export const metadata = {
  title: 'Page Title | MAA Saraswati Veterinary Hospital',
  description: 'Page description for SEO.',
}

export default function Page() {
  return <PageClient />
}
```

### Standard Client Component Shell
```jsx
// src/components/[route]/PageClient.jsx
'use client'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useFetch } from '@/hooks/useFetch'
import PageHero from '@/components/common/PageHero'

export default function PageClient() {
  const { t } = useTranslation()
  const { data, loading, error } = useFetch('/api/endpoint')

  if (loading) return <SkeletonState />
  if (error)   return <ErrorState />

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHero title={t('page.hero.title')} />
      {/* sections */}
    </motion.main>
  )
}
```

---

## Environment Variables

### frontend/.env.local
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_NAME=MAA Saraswati Veterinary Hospital
```
> Note: `NEXT_PUBLIC_` prefix required for browser-accessible vars in Next.js

### frontend/.env.production
```
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
NEXT_PUBLIC_SITE_NAME=MAA Saraswati Veterinary Hospital
```

### backend/.env
```
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_USER=db_username
DB_PASS=db_password
DB_NAME=maa_hospital
JWT_SECRET=long_random_secret_here
JWT_EXPIRES_IN=15m
ADMIN_EMAIL=admin@maahospital.org
ADMIN_PASSWORD=change_this_password
SMTP_HOST=smtp.yourdomain.com
SMTP_PORT=587
SMTP_USER=noreply@maahospital.org
SMTP_PASS=smtp_password
CONTACT_FORM_TO=info@maahospital.org
ALLOWED_ORIGIN=http://localhost:3000
UPLOAD_DIR=./uploads
```

### next.config.js
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'yourdomain.com'],  // allow VPS domain for next/image
  },
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    }]
  },
}
module.exports = nextConfig
```

---

## Design System (Quick Reference)

### Colours
```
Saffron (CTA):   #F4830F  → bg-saffron / text-saffron
Forest (heading):#2C5F2D  → bg-forest  / text-forest
Cream (page bg): #FFF8F0  → bg-cream
Charcoal (text): #2D2D2D  → text-charcoal
Muted (caption): #6B7280  → text-muted
```

### Fonts (via next/font CSS variables)
```
Display headings: var(--font-display)  → font-display  (DM Serif Display)
Body / UI:        var(--font-body)     → font-body     (Plus Jakarta Sans)
```

### Key Tailwind Classes
```
Card:          bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.07)] p-6
Btn primary:   bg-saffron text-white rounded-full px-6 py-3 font-semibold hover:bg-saffron-dark
Btn outline:   border-2 border-forest text-forest rounded-full px-6 py-3 hover:bg-forest hover:text-white
Section wrap:  max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-16 md:py-24
Input:         border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-saffron/40
```

---

## Database Tables

| Table | Purpose |
|---|---|
| `admins` | Admin credentials (bcrypt) |
| `gallery_photos` | Photos — filepath, caption, category |
| `gallery_videos` | Videos — filepath, title, thumbnail |
| `team_members` | Doctors/staff — name, designation, photo, order |
| `csr_activities` | Activities — title, date, description, images (JSON) |
| `page_content` | Editable text — keyed by page+block, all 4 languages |

---

## API Endpoints Summary

```
POST   /api/auth/login              Admin login → JWT cookie
GET    /api/gallery/photos          Public photo list
POST   /api/gallery/photos          Upload photo       [Auth]
DELETE /api/gallery/photos/:id                         [Auth]
GET    /api/gallery/videos          Public video list
POST   /api/gallery/videos          Upload video       [Auth]
DELETE /api/gallery/videos/:id                         [Auth]
GET    /api/team                    Public team list
POST/PUT/DELETE /api/team(/:id)     CRUD              [Auth]
GET    /api/csr                     Public CSR list
POST/PUT/DELETE /api/csr(/:id)      CRUD              [Auth]
GET    /api/content/:page           Page content (public)
PUT    /api/content/:page           Update content     [Auth]
POST   /api/contact                 Contact form → email
GET    /api/admin/stats             Dashboard counts   [Auth]
```

---

## Critical Rules (Never Break)

```
1.  'use client' on every component using hooks, events, or animations
2.  next/image for ALL images — never <img> tags
3.  next/link for ALL internal links — never <a href>
4.  NEXT_PUBLIC_ prefix on all frontend env vars
5.  Every JSX string through t() — no hardcoded English
6.  No TypeScript — JavaScript throughout
7.  No inline styles — Tailwind only
8.  JWT in httpOnly cookie only — never localStorage
9.  No raw SQL — Sequelize only
10. Never commit .env files
11. Always handle loading + error + empty states
12. All API calls through src/services/api.js only
```

---

## Placeholders to Update Before Launch

```
[ ] Production domain → next.config.js images.domains + backend ALLOWED_ORIGIN
[ ] Hospital email     → backend/.env CONTACT_FORM_TO
[ ] UPI ID            → DB page_content (donate page)
[ ] Bank details      → DB page_content (donate page)
[ ] WhatsApp number   → i18n locale files
[ ] Ambulance phone   → i18n locale files
[ ] Google Maps embed → ContactClient.jsx (update coords)
[ ] Admin credentials → backend/.env before seed
[ ] SSL certificate   → cPanel AutoSSL after deployment
```

---

## Docs Index

| File | Contents |
|---|---|
| `docs/01_ARCHITECTURE.md` | System diagram, Next.js structure, DB schema, Nginx config |
| `docs/02_PRD.md` | All 10 page requirements + Admin panel spec |
| `docs/03_AI_PROMPTS.md` | Build prompts 1–11 for every part of the project |
| `docs/04_UI_PROMPTS.md` | UI-specific prompts for every page and component |
| `docs/05_STYLE_GUIDE.md` | Colours, typography, component library, motion rules |
| `agents.md` | 6 sub-agent definitions for parallel development |
