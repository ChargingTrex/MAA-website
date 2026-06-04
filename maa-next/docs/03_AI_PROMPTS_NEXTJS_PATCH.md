# AI Prompts — Next.js Overrides

> This file REPLACES Prompts 1, 2, 3, 9, and 11 from 03_AI_PROMPTS.md.
> Prompts 4–8 and 10 remain valid — just swap any Vite/React Router references
> with the Next.js equivalents noted at the bottom.

---

## UPDATED PROJECT CONTEXT BLOCK
> Paste this instead of the original context block.

```
I am building a website for MAA Saraswati Veterinary Hospital — a free veterinary hospital in Hyderabad, India.

TECH STACK:
- Framework:  Next.js 14 (App Router) — JavaScript only, no TypeScript
- Styling:    Tailwind CSS 3 with custom design tokens
- Fonts:      next/font — DM Serif Display (--font-display) + Plus Jakarta Sans (--font-body)
- Images:     next/image — always, never <img> tags
- Navigation: next/link  — always, never <a href> for internal links
- i18n:       react-i18next (client components only — 'use client' required)
- HTTP:       Axios via src/services/api.js (NEXT_PUBLIC_API_URL)
- Forms:      React Hook Form v7 — 'use client' components only
- Animation:  Framer Motion v11 — 'use client' components only
- Icons:      Lucide React (size=20, strokeWidth=1.5)
- Notifications: React Hot Toast

BACKEND (separate — Node.js + Express + MySQL):
- Auth:       JWT in httpOnly cookie (credentials: 'include' on Axios)
- Uploads:    Multer disk storage on VPS, served at /uploads/

SERVER vs CLIENT COMPONENT RULE:
- page.js files = Server Components (export metadata + render one Client Component)
- All logic, state, events, animations, i18n → 'use client' Client Components
- 'use client' is required on: anything with useState/useEffect/hooks, Framer Motion,
  React Hook Form, useTranslation(), onClick/onChange handlers, AuthContext

DESIGN:
- Primary: Saffron #F4830F (bg-saffron, text-saffron)
- Secondary: Forest Green #2C5F2D (bg-forest, text-forest)
- Background: Cream #FFF8F0 (bg-cream)
- Text: Charcoal #2D2D2D (text-charcoal)
- Cards: rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.07)] p-6
- Buttons primary: bg-saffron text-white rounded-full px-6 py-3 font-semibold hover:bg-saffron-dark
- Buttons outline: border-2 border-forest text-forest rounded-full px-6 py-3 hover:bg-forest hover:text-white
- Fonts via CSS vars: font-display (headings), font-body (all UI text)

CONVENTIONS:
- All user-facing strings: const { t } = useTranslation() — never hardcode English
- All API calls: import api from '@/services/api' — never raw fetch()
- Import alias: @/ maps to src/
- Env vars: NEXT_PUBLIC_ prefix for browser-accessible vars
- Always handle loading skeleton + error + empty states
```

---

## PROMPT 1 (UPDATED) — Project Scaffold

```
Using the project context above, scaffold the full Next.js 14 project.

1. package.json
   Dependencies: next, react, react-dom, tailwindcss, postcss, autoprefixer,
   react-i18next, i18next, i18next-browser-languagedetector,
   axios, react-hook-form, framer-motion, react-hot-toast, lucide-react,
   yet-another-react-lightbox, react-player

2. next.config.js
   - images.domains: ['localhost', 'yourdomain.com']
   - Experimental: { appDir: true } (if needed for version)
   - Security headers via headers() for X-Frame-Options, X-Content-Type-Options
   - Path alias: @/ → ./src/

3. tailwind.config.js
   - content: ['./src/**/*.{js,jsx}']
   - Custom colors: saffron (DEFAULT/light/dark/subtle), forest (DEFAULT/light/dark/subtle),
     cream, charcoal, muted
   - Custom fontFamily: display (var(--font-display)), body (var(--font-body))

4. src/app/globals.css
   - @tailwind base/components/utilities
   - :root with all CSS custom properties (colour tokens)
   - @layer components: .section-wrapper, .section-heading, .section-subtext,
     .card, .btn-primary, .btn-outline
   - font-family on body: var(--font-body)

5. src/app/layout.js (Root Layout — Server Component)
   - Import DM_Serif_Display and Plus_Jakarta_Sans from next/font/google
   - Apply font CSS variable classes to <html>
   - Wrap children with: I18nProvider (client), AuthProvider (client), Toaster
   - Include Navbar and Footer (inside Providers)
   - Include the 4px saffron top stripe: <div className="fixed top-0 left-0 right-0 h-1 bg-saffron z-50" />

6. src/i18n/index.js
   - Import i18next, react-i18next, LanguageDetector
   - Import en.json, te.json, hi.json, ta.json
   - Guard: if (!i18n.isInitialized) to prevent double-init in Next.js
   - Detection order: localStorage → navigator → fallback 'en'

7. src/i18n/I18nProvider.jsx ('use client')
   - Import i18n config (triggers init)
   - Return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>

8. src/context/AuthContext.jsx ('use client')
   - isAuthenticated state (check via JWT cookie on mount)
   - login(email, password) → POST /api/auth/login → set state
   - logout() → POST /api/auth/logout → clear state → router.push('/admin')

9. src/services/api.js
   - Axios instance: baseURL = process.env.NEXT_PUBLIC_API_URL
   - withCredentials: true (for httpOnly cookie JWT)
   - Request interceptor: set Content-Type: application/json

10. src/hooks/useFetch.js ('use client')
    - (url, deps=[]) → { data, loading, error }
    - Uses api.get(url) inside useEffect

11. src/utils/motionVariants.js
    - Export: fadeUp, staggerContainer, fadeIn, scaleIn, slideInRight

12. Create skeleton page.js for all 10 public routes + all 5 admin routes
    (each with metadata export and a placeholder Client Component import)

Output every file with its full path as a comment on line 1.
```

---

## PROMPT 2 (UPDATED) — Layout Components

```
Using the project context above, build the root layout components.

PART A — src/app/layout.js (Server Component — no 'use client')
- Import DM_Serif_Display and Plus_Jakarta_Sans from 'next/font/google'
  dmSerif: weight ['400'], subsets ['latin'], variable '--font-display'
  jakarta: weight ['400','500','600','700'], subsets ['latin'], variable '--font-body'
- Apply both variable classes on <html lang="en">
- Render: <body> → I18nProvider → AuthProvider →
    fixed saffron top stripe (h-1) → Navbar → children → Footer → Toaster

PART B — Navbar (src/components/common/Navbar.jsx) — 'use client'
- Use next/link for ALL nav links
- Logo: next/image component (src='/logo.svg') with width=120 height=48
- Desktop: nav links using <Link href="/route"> (not React Router NavLink)
- Active link: usePathname() from next/navigation to detect current route
  Apply text-saffron font-semibold when pathname === href
- Language switcher (LanguageSwitcher component)
- Donate button: <Link href="/donate" className="btn-primary">
- Mobile drawer: useState for open/closed, Framer Motion slide-in from right

PART C — LanguageSwitcher (src/components/common/LanguageSwitcher.jsx) — 'use client'
- useTranslation() to get i18n instance
- i18n.changeLanguage(code) + localStorage.setItem('i18nLang', code)
- On mount: read localStorage and apply

PART D — Footer (src/components/common/Footer.jsx) — Server Component
- All links use next/link
- No 'use client' needed (purely static)
- Forest green background, three columns, paw tagline

PART E — ScrollToTop (src/components/common/ScrollToTop.jsx) — 'use client'
- useEffect + window.addEventListener('scroll')
- Fixed position, Framer Motion fade+scale

Output complete JSX code for all components.
```

---

## PROMPT 3 (UPDATED) — Home Page

```
Using the project context above, build the Home page.

PART A — src/app/page.js (Server Component)
export const metadata = {
  title: 'MAA Saraswati Veterinary Hospital | Free Veterinary Care, Hyderabad',
  description: 'Free veterinary care for all animals in Hyderabad. 5000+ animals treated.',
  openGraph: { title: '...', description: '...', images: ['/og-image.jpg'] },
}
export default function HomePage() { return <HomeClient /> }

PART B — src/components/home/HomeClient.jsx ('use client')
Include all 6 sections — same content spec as original Prompt 3, with these Next.js changes:
- All images: next/image with proper width/height or fill+relative container
- All links: next/link (not useNavigate or <a href>)
- Data fetching: useFetch hook (client-side)
- Framer Motion scroll animations on staggered card grids
- useTranslation() for all strings

SECTION SPECS (unchanged from original):
1. HeroSection — full viewport, gradient overlay, heading, 2 CTA buttons, scroll indicator
2. StatsBar — saffron bg, 4 animated counters (IntersectionObserver)
3. Mission & Vision Cards — fetched from /api/content/home
4. Services Grid — 6 icon cards
5. Donate Callout Banner — forest green, saffron button
6. Latest CSR — 3 cards from /api/csr?limit=3 with next/image for card photos

For the hero background image use:
<div className="relative min-h-screen">
  <Image src={heroImg} alt="Hero" fill className="object-cover" priority />
  <div className="absolute inset-0 bg-gradient-to-br from-forest/82 to-saffron/55" />
  {/* content */}
</div>
```

---

## PROMPT 9 (UPDATED) — Backend Setup

```
[Unchanged from original Prompt 9 — backend is pure Express, not affected by Next.js]

One addition: CORS must be configured with credentials: true to support
httpOnly cookies from the Next.js frontend:

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN,   // e.g. http://localhost:3000 or https://yourdomain.com
  credentials: true,                     // required for httpOnly cookie auth
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))
```

---

## PROMPT 11 (UPDATED) — Deployment Guide

```
Write a step-by-step deployment guide for the MAA website on a cPanel VPS.
The site uses Next.js 14 (NOT a static site — requires Node.js running).

Cover:

1. VPS PREREQUISITES
   - Node.js 20 LTS (via nvm)
   - PM2 globally: npm install -g pm2
   - Nginx installed and running
   - MySQL running (cPanel manages this)

2. DATABASE
   - Create MySQL database and user via cPanel
   - Run: cd backend && node scripts/seed.js

3. BACKEND DEPLOY
   - Upload backend/ via FTP or git clone
   - cd backend && npm install --production
   - Create backend/.env (list all required vars)
   - pm2 start server.js --name maa-api
   - pm2 save

4. FRONTEND DEPLOY (CRITICAL — Next.js is NOT static)
   - Upload entire frontend/ folder to VPS (NOT just dist/)
   - cd frontend && npm install --production
   - npm run build          ← builds .next/ folder
   - Create frontend/.env.production with NEXT_PUBLIC_API_URL
   - pm2 start node_modules/.bin/next --name maa-frontend -- start -p 3000
   - OR use ecosystem.config.js: pm2 startOrRestart ecosystem.config.js
   - pm2 save
   - pm2 startup            ← auto-start on VPS reboot

5. NGINX CONFIG
   Provide exact nginx.conf:
   - Proxy yourdomain.com → localhost:3000 (Next.js)
   - Proxy yourdomain.com/api → localhost:5000 (Express)
   - Static /uploads → backend uploads folder
   - Include proxy headers for Next.js (Upgrade, Connection, Host, cache-bypass)

6. SSL
   - Enable Let's Encrypt via cPanel AutoSSL
   - Update Nginx for 443 + redirect 80 → 443
   - Set ALLOWED_ORIGIN and NEXT_PUBLIC_API_URL to https:// domain

7. DEPLOYMENT UPDATES (after initial setup)
   Frontend update: cd frontend && npm run build && pm2 restart maa-frontend
   Backend update:  (upload files) && pm2 restart maa-api
   View logs:       pm2 logs maa-frontend · pm2 logs maa-api

8. VERIFY CHECKLIST
   - yourdomain.com loads (Next.js serving)
   - yourdomain.com/api/team returns JSON (Express working)
   - yourdomain.com/uploads/images/[file] loads (static serving)
   - /admin login works (JWT cookie auth)
   - Contact form sends email
   - Language switcher changes UI language
   - All 10 pages render without 404
```

---

## Quick Reference — Vite → Next.js Replacements

| Vite / React Router | Next.js Equivalent |
|---|---|
| `import { useNavigate } from 'react-router-dom'` | `import { useRouter } from 'next/navigation'` |
| `import { NavLink } from 'react-router-dom'` | `import Link from 'next/link'` + `usePathname()` |
| `<img src={url} alt={alt} loading="lazy" />` | `<Image src={url} alt={alt} fill className="object-cover" />` |
| `import.meta.env.VITE_API_URL` | `process.env.NEXT_PUBLIC_API_URL` |
| `src/pages/About.jsx` | `src/app/about/page.js` |
| `vite.config.js` | `next.config.js` |
| `dist/` (static output) | `.next/` (requires Node.js to serve) |
| React Router `<Route>` | File-based routing via folder structure |
| `npm run preview` | `npm run start` |
