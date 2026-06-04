# MAA Saraswati Veterinary Hospital — System Architecture

---

## 1. Overview

A multilingual (EN / TE / HI / TA), media-rich public website backed by a **custom built-in Admin Panel**. Frontend runs on **Next.js 14 (App Router)** for SSR, SEO, and built-in image optimisation. Backend is a separate **Node.js + Express + MySQL** API. Both run on the same VPS behind Nginx.

---

## 2. High-Level Architecture Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                        BROWSER / CLIENT                      │
│                                                              │
│   ┌──────────────────────────┐  ┌───────────────────────┐   │
│   │   Public Website         │  │   Admin Panel         │   │
│   │   Next.js App Router     │  │   (Protected Routes)  │   │
│   │   SSR + Client Comps     │  │   JWT Auth            │   │
│   │   next/image optimised   │  │   CRUD + File Upload  │   │
│   └────────────┬─────────────┘  └───────────┬───────────┘   │
└────────────────┼───────────────────────────┼───────────────-┘
                 │  HTTPS (Axios / fetch)     │
                 ▼                            ▼
┌──────────────────────────────────────────────────────────────┐
│           VPS — Nginx Reverse Proxy (Port 80/443)            │
│                                                              │
│  ┌─────────────────────────┐  ┌──────────────────────────┐  │
│  │ Next.js App  (Port 3000)│  │ Express API  (Port 5000) │  │
│  │ PM2 managed             │  │ PM2 managed              │  │
│  │ next start              │  │ /api/* routes            │  │
│  └─────────────────────────┘  └─────────────┬────────────┘  │
│                                             │               │
│                              ┌──────────────┴────────────┐  │
│                              │  MySQL Database (cPanel)  │  │
│                              └───────────────────────────┘  │
│                                                              │
│                         /uploads/ (static, Nginx served)    │
└──────────────────────────────────────────────────────────────┘
```

---

## 3. Frontend Architecture (Next.js 14)

### 3.1 Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 14 | App Router |
| Language | JavaScript (ES2022+) | No TypeScript |
| Styling | Tailwind CSS 3 | Custom tokens |
| Fonts | next/font (Google) | DM Serif Display + Plus Jakarta Sans |
| Images | next/image | Auto optimisation, lazy load, WebP |
| i18n | react-i18next | EN · TE · HI · TA |
| HTTP | Axios | Via src/services/api.js |
| Icons | Lucide React | strokeWidth 1.5 |
| Animation | Framer Motion 11 | 'use client' components only |
| Forms | React Hook Form 7 | 'use client' components only |
| Notifications | React Hot Toast | 'use client' |
| Lightbox | yet-another-react-lightbox | 'use client' |
| Video Player | React Player | 'use client' |

### 3.2 App Router Folder Structure

```
frontend/
├── public/
│   ├── favicon.ico
│   ├── og-image.jpg
│   └── paw-pattern.svg
├── src/
│   ├── app/                          ← Next.js App Router
│   │   ├── layout.js                 ← Root layout (Navbar + Footer + Providers)
│   │   ├── page.js                   ← Home  /
│   │   ├── globals.css               ← Global styles + Tailwind directives
│   │   ├── about/
│   │   │   └── page.js              ← /about
│   │   ├── infrastructure/
│   │   │   └── page.js              ← /infrastructure
│   │   ├── medical-facilities/
│   │   │   └── page.js              ← /medical-facilities
│   │   ├── our-team/
│   │   │   └── page.js              ← /our-team
│   │   ├── gallery/
│   │   │   └── page.js              ← /gallery
│   │   ├── csr-activities/
│   │   │   └── page.js              ← /csr-activities
│   │   ├── donate/
│   │   │   └── page.js              ← /donate
│   │   ├── sponsor/
│   │   │   └── page.js              ← /sponsor
│   │   ├── contact/
│   │   │   └── page.js              ← /contact
│   │   └── admin/
│   │       ├── page.js              ← /admin  (login)
│   │       ├── layout.js            ← Admin layout (sidebar, no Navbar/Footer)
│   │       ├── dashboard/page.js
│   │       ├── gallery/page.js
│   │       ├── team/page.js
│   │       ├── csr/page.js
│   │       └── content/page.js
│   │
│   ├── components/
│   │   ├── common/                  ← Shared layout atoms
│   │   │   ├── Navbar.jsx           ← 'use client' (mobile menu state)
│   │   │   ├── Footer.jsx           ← Server component
│   │   │   ├── PageHero.jsx         ← Server component
│   │   │   ├── PawDivider.jsx       ← Server component
│   │   │   ├── ScrollToTop.jsx      ← 'use client'
│   │   │   └── LanguageSwitcher.jsx ← 'use client'
│   │   ├── home/
│   │   │   ├── HeroSection.jsx      ← 'use client' (animation)
│   │   │   ├── StatsBar.jsx         ← 'use client' (counter animation)
│   │   │   ├── MissionCard.jsx      ← 'use client'
│   │   │   └── DonateCallout.jsx
│   │   ├── gallery/
│   │   │   ├── PhotoGrid.jsx        ← 'use client'
│   │   │   └── VideoGrid.jsx        ← 'use client'
│   │   └── admin/
│   │       ├── AdminSidebar.jsx     ← 'use client'
│   │       ├── UploadForm.jsx       ← 'use client'
│   │       ├── DataTable.jsx        ← 'use client'
│   │       └── ProtectedRoute.jsx   ← 'use client'
│   │
│   ├── hooks/
│   │   ├── useAuth.js               ← 'use client'
│   │   └── useFetch.js              ← client-side data fetching
│   ├── context/
│   │   └── AuthContext.jsx          ← 'use client' Provider
│   ├── services/
│   │   └── api.js                   ← Axios instance
│   ├── i18n/
│   │   ├── index.js                 ← i18next init (client-safe)
│   │   └── locales/
│   │       ├── en.json
│   │       ├── te.json
│   │       ├── hi.json
│   │       └── ta.json
│   └── utils/
│       ├── motionVariants.js
│       └── helpers.js
│
├── next.config.js
├── tailwind.config.js
└── package.json
```

### 3.3 Server vs Client Component Rules

This is the most important Next.js concept. Follow this strictly:

| Component Type | Use When | Directive |
|---|---|---|
| **Server Component** (default) | Static content, no state, no browser APIs | None needed |
| **Client Component** | useState, useEffect, event handlers, animations, i18n hooks | `'use client'` at top |

```
Server Components (no directive):
  Footer, PageHero, PawDivider, all page.js files (shell)

Client Components ('use client'):
  Navbar (mobile menu state)
  HeroSection, StatsBar (Framer Motion)
  PhotoGrid, VideoGrid (lightbox, modal state)
  ContactForm, all admin forms (React Hook Form)
  LanguageSwitcher (i18n state)
  ScrollToTop (scroll event)
  AuthContext, ProtectedRoute (auth state)
  Any component using useTranslation()
```

### 3.4 Routing Map (App Router — file-based)

| File Path | URL | Protected |
|---|---|---|
| `src/app/page.js` | `/` | No |
| `src/app/about/page.js` | `/about` | No |
| `src/app/infrastructure/page.js` | `/infrastructure` | No |
| `src/app/medical-facilities/page.js` | `/medical-facilities` | No |
| `src/app/our-team/page.js` | `/our-team` | No |
| `src/app/gallery/page.js` | `/gallery` | No |
| `src/app/csr-activities/page.js` | `/csr-activities` | No |
| `src/app/donate/page.js` | `/donate` | No |
| `src/app/sponsor/page.js` | `/sponsor` | No |
| `src/app/contact/page.js` | `/contact` | No |
| `src/app/admin/page.js` | `/admin` | No (login page) |
| `src/app/admin/dashboard/page.js` | `/admin/dashboard` | **Yes (JWT)** |
| `src/app/admin/gallery/page.js` | `/admin/gallery` | **Yes (JWT)** |
| `src/app/admin/team/page.js` | `/admin/team` | **Yes (JWT)** |
| `src/app/admin/csr/page.js` | `/admin/csr` | **Yes (JWT)** |
| `src/app/admin/content/page.js` | `/admin/content` | **Yes (JWT)** |

### 3.5 SEO — Metadata API (per page)

Next.js App Router has a built-in Metadata API. Every `page.js` exports metadata:

```js
// src/app/about/page.js
export const metadata = {
  title: 'About Us | MAA Saraswati Veterinary Hospital',
  description: 'Learn about our mission to provide free veterinary care in Hyderabad.',
  openGraph: {
    title: 'About Us | MAA Saraswati Veterinary Hospital',
    description: '...',
    images: ['/og-image.jpg'],
  },
}
```

### 3.6 Font Loading (next/font)

```js
// src/app/layout.js
import { DM_Serif_Display, Plus_Jakarta_Sans } from 'next/font/google'

const dmSerif = DM_Serif_Display({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-display',
})
const plusJakarta = Plus_Jakarta_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-body',
})
// Apply: className={`${dmSerif.variable} ${plusJakarta.variable}`} on <html>
```

### 3.7 Design System (Tailwind Theme)

```js
// tailwind.config.js
colors: {
  saffron:  { DEFAULT: '#F4830F', light: '#FDB96B', dark: '#C4650A', subtle: '#FEF3E7' },
  forest:   { DEFAULT: '#2C5F2D', light: '#4A8A4C', dark: '#1A3D1B', subtle: '#EBF4EB' },
  cream:    '#FFF8F0',
  charcoal: '#2D2D2D',
  muted:    '#6B7280',
},
fontFamily: {
  display: ['var(--font-display)', 'Georgia', 'serif'],
  body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
},
```

---

## 4. Backend Architecture

*(Unchanged from previous — Node.js + Express + MySQL)*

### 4.1 Tech Stack

| Layer | Choice |
|---|---|
| Runtime | Node.js 20 LTS |
| Framework | Express 4.x |
| ORM | Sequelize 6.x |
| Auth | jsonwebtoken + bcryptjs |
| File Upload | Multer (disk storage) |
| Email | Nodemailer |
| Validation | express-validator |
| Security | Helmet, CORS, express-rate-limit |
| Process | PM2 |

### 4.2 REST API Endpoints (unchanged)

```
POST   /api/auth/login
GET    /api/gallery/photos    POST  /api/gallery/photos    DELETE /api/gallery/photos/:id
GET    /api/gallery/videos    POST  /api/gallery/videos    DELETE /api/gallery/videos/:id
GET    /api/team              POST  /api/team   PUT /api/team/:id   DELETE /api/team/:id
GET    /api/csr               POST  /api/csr    PUT /api/csr/:id    DELETE /api/csr/:id
GET    /api/content/:page     PUT   /api/content/:page
POST   /api/contact
GET    /api/admin/stats
```

---

## 5. Database Schema (MySQL — unchanged)

```
admins          id · email · password · created_at
gallery_photos  id · filename · filepath · caption · category · created_at
gallery_videos  id · filename · filepath · thumbnail · title · created_at
team_members    id · name · designation · qualification · photo_path · display_order · created_at
csr_activities  id · title · description · date · images(JSON) · created_at
page_content    id · page_key · block_key · content_en · content_te · content_hi · content_ta · updated_at
```

---

## 6. i18n Architecture

- **Library**: `react-i18next` (client components only — `'use client'` required)
- **Languages**: English (`en`), Telugu (`te`), Hindi (`hi`), Tamil (`ta`)
- **i18n init file**: `src/i18n/index.js` — imported in a client `I18nProvider` wrapper
- **Detection**: localStorage → browser → fallback `en`
- **Fonts**: Loaded via `next/font` for Latin; `next/font/google` for Indian scripts

---

## 7. File Storage (unchanged)

```
/var/www/maa-backend/uploads/
├── images/gallery/   ├── images/team/   ├── images/csr/
└── videos/gallery/
```
Served as static via Express: `app.use('/uploads', express.static('uploads'))`

---

## 8. Deployment Architecture

```
VPS (cPanel)
├── Nginx
│   ├── yourdomain.com      → proxy to Next.js :3000
│   ├── yourdomain.com/api  → proxy to Express  :5000
│   └── yourdomain.com/uploads → static file serve
├── Next.js App  (PM2 — next start, port 3000)
├── Express API  (PM2 — node server.js, port 5000)
├── MySQL        (cPanel MySQL manager)
└── SSL          (Let's Encrypt via cPanel AutoSSL)
```

### Nginx Config

```nginx
server {
  server_name yourdomain.com;

  # Next.js app
  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  # Express API
  location /api {
    proxy_pass http://localhost:5000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
  }

  # Uploaded media files
  location /uploads {
    alias /var/www/maa-backend/uploads;
    expires 30d;
    add_header Cache-Control "public, no-transform";
  }
}
```

### PM2 Ecosystem

```js
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'maa-frontend',
      cwd: './frontend',
      script: 'node_modules/.bin/next',
      args: 'start',
      env: { PORT: 3000, NODE_ENV: 'production' },
    },
    {
      name: 'maa-api',
      cwd: './backend',
      script: 'server.js',
      env: { PORT: 5000, NODE_ENV: 'production' },
    },
  ],
}
```

---

## 9. Security Checklist (unchanged)

| Concern | Solution |
|---|---|
| Admin auth | JWT (httpOnly cookie) |
| Passwords | bcryptjs, saltRounds 12 |
| File uploads | Mimetype whitelist, uuid rename, size limits |
| API abuse | express-rate-limit |
| XSS / Headers | Helmet.js (backend) + Next.js security headers |
| CORS | Whitelist production domain only |
| SQL injection | Sequelize parameterised queries |
| Next.js headers | next.config.js `headers()` for X-Frame-Options, CSP |
