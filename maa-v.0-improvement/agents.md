# agents.md — MAA Saraswati Veterinary Hospital

> Specialised sub-agents for parallel development.
> All agents inherit CLAUDE.md context automatically.
> Spawn by naming the agent ID in your Claude Code task.

---

## Agent Roster

| Agent ID | Owns | Works In |
|---|---|---|
| `FRONTEND_UI` | All 10 public pages + page-specific client components | `frontend/src/app/` `frontend/src/components/` (non-admin) |
| `ADMIN_UI` | Admin panel pages + admin client components | `frontend/src/app/admin/` `frontend/src/components/admin/` |
| `BACKEND_API` | Express routes, controllers, models, middleware | `backend/` |
| `I18N` | All translation JSON files + i18next config | `frontend/src/i18n/` |
| `DESIGN_SYSTEM` | Tailwind config, globals.css, shared atoms, next.config.js | `frontend/tailwind.config.js` `frontend/src/app/globals.css` `frontend/src/components/common/` |
| `DEVOPS` | Nginx, PM2 ecosystem, deploy scripts, env config | Root config files, VPS scripts |

---

## AGENT: FRONTEND_UI

**Purpose**: Build all 10 public-facing pages and their client components.

**Owns**:
```
frontend/src/app/page.js
frontend/src/app/about/page.js
frontend/src/app/infrastructure/page.js
frontend/src/app/medical-facilities/page.js
frontend/src/app/our-team/page.js
frontend/src/app/gallery/page.js
frontend/src/app/csr-activities/page.js
frontend/src/app/donate/page.js
frontend/src/app/sponsor/page.js
frontend/src/app/contact/page.js
frontend/src/components/home/
frontend/src/components/about/
frontend/src/components/gallery/
frontend/src/components/team/
frontend/src/components/donate/
frontend/src/components/contact/
```

**Context block** (paste at start of session):
```
I am the FRONTEND_UI agent for MAA Saraswati Veterinary Hospital.
I build public-facing Next.js 14 pages and their client components.

FRAMEWORK: Next.js 14 App Router — JavaScript only, no TypeScript.

CRITICAL NEXT.JS RULES:
- page.js files are Server Components (no 'use client') — they only render metadata + import the Client Component
- All interactive logic lives in a paired Client Component (e.g. AboutClient.jsx) with 'use client' at top
- Use next/image for EVERY image — never <img> tags
- Use next/link for EVERY internal link — never <a href>
- NEXT_PUBLIC_API_URL from process.env.NEXT_PUBLIC_API_URL

EVERY page.js follows this exact pattern:
  export const metadata = { title: '...', description: '...' }
  export default function Page() { return <PageClient /> }

EVERY client component has 'use client' as first line.

DESIGN RULES:
- Tailwind CSS only — no inline styles
- Every visible string uses useTranslation() t() — never hardcode English
- All data fetching via useFetch hook or api.js — never raw fetch()
- Always handle loading skeleton + error + empty states
- DM Serif Display (font-display class) for all h1–h3
- Plus Jakarta Sans (font-body class) for all body text
- Saffron #F4830F for CTAs. Forest #2C5F2D for headings. Cream #FFF8F0 for page bg.
- Cards: rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.07)]
- Buttons: rounded-full
- Framer Motion for scroll-triggered animations (requires 'use client')

I DO NOT touch: admin pages, backend, tailwind.config.js, globals.css, i18n locale files.
I import from DESIGN_SYSTEM: Navbar, Footer, PageHero, PawDivider, ScrollToTop.
I call APIs from BACKEND_API via src/services/api.js.
I use i18n keys defined by I18N agent.

Reference: docs/02_PRD.md (specs) · docs/04_UI_PROMPTS.md (visuals) · docs/05_STYLE_GUIDE.md (design)
```

**Task examples**:
```
- Build src/app/page.js (Home) with metadata + HomeClient component (all 6 sections per PRD §4.1)
- Build Gallery page with photo masonry + video modal (PhotoGrid.jsx 'use client')
- Build Our Team page with skeleton loaders (TeamClient.jsx 'use client')
- Build Contact page with React Hook Form and Google Maps embed
- Build Donate page with UPI QR section + clipboard copy buttons
```

**Guardrails**:
```
❌ Never use <img> — always next/image
❌ Never use <a href> for internal links — always next/link
❌ Never omit 'use client' on components with hooks or events
❌ Never hardcode English strings in JSX — always t()
❌ Never edit admin pages, backend, tailwind.config.js, or i18n locale files
```

---

## AGENT: ADMIN_UI

**Purpose**: Build the entire admin panel — login, dashboard, all CRUD screens.

**Owns**:
```
frontend/src/app/admin/page.js              ← login
frontend/src/app/admin/layout.js            ← admin layout
frontend/src/app/admin/dashboard/page.js
frontend/src/app/admin/gallery/page.js
frontend/src/app/admin/team/page.js
frontend/src/app/admin/csr/page.js
frontend/src/app/admin/content/page.js
frontend/src/components/admin/
frontend/src/context/AuthContext.jsx
frontend/src/hooks/useAuth.js
```

**Context block** (paste at start of session):
```
I am the ADMIN_UI agent for MAA Saraswati Veterinary Hospital.
I build the password-protected Admin Panel for managing website content.

FRAMEWORK: Next.js 14 App Router — JavaScript only, no TypeScript.

CRITICAL NEXT.JS RULES:
- ALL admin components are 'use client' (they use auth state, forms, file uploads)
- src/app/admin/layout.js wraps all /admin/* pages — it checks auth and renders sidebar
- Use next/image for all images, next/link for all navigation
- JWT stored in httpOnly cookie ONLY — never localStorage or sessionStorage

ADMIN DESIGN RULES (different from public site):
- Page background: bg-gray-50 (NOT cream — signals backend context)
- Sidebar: always bg-forest (#2C5F2D) with white text
- Headings: font-body font-semibold (NOT font-display/DM Serif)
- Admin table rows: hover:bg-saffron/5
- Stat cards: border border-gray-100, minimal shadow
- Delete always needs confirmation dialog before API call
- Upload forms: dashed dropzone border → saffron on hover/drag
- Progress bars: saffron fill, h-2, rounded-full, shows % during upload
- Axios onUploadProgress for tracking file upload progress

AUTH FLOW:
- POST /api/auth/login → JWT in httpOnly cookie → redirect to /admin/dashboard
- On every admin page mount: verify JWT (GET /api/admin/stats or auth check)
- Unauthenticated: redirect to /admin (login page)
- useAuth hook + AuthContext manage isAuthenticated state
- Logout: call /api/auth/logout → clear auth state → redirect to /admin

I DO NOT touch: public pages, backend code, tailwind.config.js, i18n locales.

Reference: docs/02_PRD.md §11 (admin spec) · docs/04_UI_PROMPTS.md §UI-10 · docs/05_STYLE_GUIDE.md §11
```

**Task examples**:
```
- Build AuthContext.jsx and useAuth.js (JWT cookie auth state)
- Build src/app/admin/layout.js (sidebar + auth guard, all 'use client')
- Build AdminLogin page with JWT flow
- Build ManageGallery: tabs, drag-drop upload, progress bar, delete confirm
- Build ManageTeam: add form, sortable table, edit modal
- Build ManageContent: accordion with 4-language text fields per block
```

**Guardrails**:
```
❌ Never use localStorage or sessionStorage for JWT
❌ Never allow delete without a confirmation step
❌ Never use DM Serif Display in admin UI — font-body only
❌ Never skip 'use client' on any admin component
❌ Never edit public pages, backend, or i18n locale files
```

---

## AGENT: BACKEND_API

**Purpose**: Build the entire Node.js + Express REST API.

**Owns**:
```
backend/
├── server.js
├── config/db.js
├── config/multer.js
├── models/
├── controllers/
├── routes/
├── middleware/
├── scripts/seed.js
└── uploads/        (directory only)
```

**Context block** (paste at start of session):
```
I am the BACKEND_API agent for MAA Saraswati Veterinary Hospital.
I build the Node.js + Express REST API consumed by the Next.js frontend and admin panel.

TECH:
- Node.js 20 LTS + Express 4
- Sequelize 6 ORM + MySQL dialect
- JWT in httpOnly cookies (jsonwebtoken + bcryptjs)
- Multer for disk-storage uploads (uuid-named files)
- Nodemailer for contact form emails
- Helmet + CORS + express-rate-limit

CORS: Allow ONLY process.env.ALLOWED_ORIGIN (the Next.js domain)
  In development: http://localhost:3000
  In production: https://yourdomain.com

CORS config must include credentials: true for httpOnly cookie support:
  cors({ origin: process.env.ALLOWED_ORIGIN, credentials: true })

JWT: httpOnly cookie, sameSite: 'strict', secure: true in production
  Set via res.cookie('jwt', token, { httpOnly: true, secure: isProd, sameSite: 'strict' })

UPLOAD RULES:
- Images: jpg/jpeg/png/webp only, max 5MB, stored in uploads/images/
- Videos: mp4/mov/webm only, max 200MB, stored in uploads/videos/
- Filename: always uuid() + original extension — never trust original filename

DATABASE tables: admins, gallery_photos, gallery_videos, team_members, csr_activities, page_content
Full schema: docs/01_ARCHITECTURE.md §5

SECURITY:
- bcryptjs saltRounds=12 for all passwords
- express-rate-limit: 100 req / 15 min per IP
- Sequelize parameterised queries only — no raw SQL ever
- Env secrets from process.env only — never hardcoded
- In production, never return stack traces in error responses

Reference: docs/01_ARCHITECTURE.md (backend spec) · docs/03_AI_PROMPTS.md §Prompt-9
```

**Task examples**:
```
- Write all 6 Sequelize models with correct field types and validations
- Write multer.js config with uuid renaming, type filter, size limits
- Write authMiddleware.js reading JWT from httpOnly cookie
- Write galleryController.js with photo/video CRUD + Multer
- Write contactController.js with Nodemailer SMTP
- Write seed.js to create admin user and seed page_content rows
```

**Guardrails**:
```
❌ No raw SQL — Sequelize only
❌ No plaintext passwords — bcrypt only
❌ No hardcoded secrets — process.env only
❌ No original filenames for uploads — uuid rename always
❌ No stack traces to client in production
❌ Never edit any frontend/ files
```

---

## AGENT: I18N

**Purpose**: Own all translation files and the i18n configuration.

**Owns**:
```
frontend/src/i18n/index.js
frontend/src/i18n/locales/en.json
frontend/src/i18n/locales/te.json
frontend/src/i18n/locales/hi.json
frontend/src/i18n/locales/ta.json
```

**Context block** (paste at start of session):
```
I am the I18N agent for MAA Saraswati Veterinary Hospital.
I manage all translation files and the react-i18next setup for Next.js 14.

LANGUAGES: en (English) · te (Telugu/తెలుగు) · hi (Hindi/हिंदी) · ta (Tamil/தமிழ்)
LIBRARY: react-i18next

NEXT.JS SPECIFIC:
- i18n only works in 'use client' components in Next.js App Router
- src/i18n/index.js must be imported in a client-side Provider wrapper
- The I18nProvider wraps the app in src/app/layout.js via a client component
- Do NOT attempt SSR translation — all t() calls are client-side only

INIT PATTERN (src/i18n/index.js):
  import i18n from 'i18next'
  import { initReactI18next } from 'react-i18next'
  import LanguageDetector from 'i18next-browser-languagedetector'
  // import all 4 locale JSON files
  // init with detection: localStorage → navigator → fallback 'en'
  // Must guard with: if (!i18n.isInitialized) { i18n.use(...).init(...) }

KEY RULES:
- en.json is the master — all keys exist in English first
- All 4 locale files have identical key structure
- Key format: dot notation camelCase — home.hero.heading
- Namespaces: nav · home · about · infrastructure · medical · team · gallery · csr · donate · sponsor · contact · admin · common
- Interpolation: {{variableName}} double-curly syntax
- Tone: warm, respectful, charitable — not clinical

Reference: docs/02_PRD.md (page content) · docs/03_AI_PROMPTS.md §Prompt-10
```

**Task examples**:
```
- Write src/i18n/index.js with Next.js-safe initialisation guard
- Write a client I18nProvider component to wrap app layout
- Generate complete en.json for all pages and namespaces
- Translate to te.json (Telugu), hi.json (Hindi), ta.json (Tamil)
- Add new keys for Sponsor page to all 4 locale files
```

**Guardrails**:
```
❌ Never edit .jsx/.js files outside i18n/
❌ Never remove existing keys — only add or update
❌ Never use different key names across locale files
❌ Never attempt SSR/server-side translation in Next.js App Router
```

---

## AGENT: DESIGN_SYSTEM

**Purpose**: Own the design foundation — Tailwind config, global CSS, next.config.js, and all shared atomic components.

**Owns**:
```
frontend/next.config.js
frontend/tailwind.config.js
frontend/src/app/globals.css
frontend/src/app/layout.js              ← root layout (fonts, providers, Navbar, Footer)
frontend/src/components/common/
    Navbar.jsx          'use client'
    Footer.jsx          server component
    PageHero.jsx        server component
    PawDivider.jsx      server component
    ScrollToTop.jsx     'use client'
    LanguageSwitcher.jsx 'use client'
frontend/src/utils/motionVariants.js
```

**Context block** (paste at start of session):
```
I am the DESIGN_SYSTEM agent for MAA Saraswati Veterinary Hospital.
I own the design foundation all other agents build on top of.

FRAMEWORK: Next.js 14 App Router — JavaScript only.

MY RESPONSIBILITIES:
1. next.config.js — images domains, security headers, path aliases (@/ → src/)
2. tailwind.config.js — custom colour tokens, font variables, content paths
3. globals.css — CSS custom properties, @layer components utilities, font-face (if any)
4. src/app/layout.js — root layout: next/font loading, html+body wrapper, Navbar, Footer,
   Providers (AuthContext, I18nProvider, Toaster)
5. All shared components in components/common/

NEXT/FONT SETUP (in layout.js):
  import { DM_Serif_Display, Plus_Jakarta_Sans } from 'next/font/google'
  const dmSerif = DM_Serif_Display({ weight: ['400'], subsets: ['latin'], variable: '--font-display' })
  const jakarta = Plus_Jakarta_Sans({ weight: ['400','500','600','700'], subsets: ['latin'], variable: '--font-body' })
  // Apply both variables to <html>

TAILWIND TOKENS (must be consistent — all agents depend on these):
  saffron: { DEFAULT: '#F4830F', light: '#FDB96B', dark: '#C4650A', subtle: '#FEF3E7' }
  forest:  { DEFAULT: '#2C5F2D', light: '#4A8A4C', dark: '#1A3D1B', subtle: '#EBF4EB' }
  cream:   '#FFF8F0'
  charcoal:'#2D2D2D'
  muted:   '#6B7280'
  fontFamily: { display: ['var(--font-display)', 'serif'], body: ['var(--font-body)', 'sans-serif'] }

GLOBAL CSS UTILITIES (@layer components):
  .section-wrapper, .section-heading, .section-subtext
  .card, .btn-primary, .btn-outline

SIGNATURE ELEMENTS (every page must have):
  - 4px saffron top stripe in root layout (fixed, z-50)
  - PawDivider SVG between sections
  - Wave SVG at bottom of PageHero
  - Saffron top-border ring on the <body> equivalent

COMPONENT RULES:
- Footer and PageHero: Server Components (no 'use client')
- Navbar, LanguageSwitcher, ScrollToTop: 'use client' (interactive state)
- next/image used in all image-containing common components
- next/link used for all internal links in Navbar and Footer

Reference: docs/05_STYLE_GUIDE.md (full design system) · docs/04_UI_PROMPTS.md §UI-1 and §UI-2
```

**Task examples**:
```
- Write next.config.js with image domains, security headers, @/ alias
- Write tailwind.config.js with all custom tokens and font variables
- Write globals.css with CSS vars, @layer component utilities
- Write src/app/layout.js with next/font, providers, Navbar, Footer, saffron top stripe
- Build Navbar with mobile drawer, language switcher, Donate button
- Build PageHero with forest/saffron variants and wave SVG
- Write motionVariants.js with all standard Framer Motion variants
```

**Guardrails**:
```
❌ Never remove or rename Tailwind colour tokens (breaks all agents)
❌ Never change font-display or font-body assignments
❌ Never edit page files or admin files
❌ Never use <img> — next/image always
❌ Never use <a href> — next/link always
❌ Never change component prop interfaces without documenting
```

---

## AGENT: DEVOPS

**Purpose**: Own deployment, infrastructure, environment, and configuration.

**Owns**:
```
ecosystem.config.js       ← PM2 config (both Next.js + Express)
nginx.conf                ← Nginx reverse proxy config
frontend/.env.example
backend/.env.example
.gitignore (root)
scripts/deploy.sh
```

**Context block** (paste at start of session):
```
I am the DEVOPS agent for MAA Saraswati Veterinary Hospital.
I own all deployment and infrastructure configuration on the VPS.

HOSTING: VPS with cPanel
TWO APPS run simultaneously via PM2:
  maa-frontend: Next.js — `next start` on port 3000
  maa-api:      Express  — `node server.js` on port 5000

NGINX PROXY:
  yourdomain.com       → localhost:3000  (Next.js)
  yourdomain.com/api   → localhost:5000  (Express)
  yourdomain.com/uploads → static file dir (Express uploads folder)

NEXT.JS DEPLOYMENT:
  cd frontend && npm run build   # creates .next/
  pm2 restart maa-frontend       # next start serves .next/

CRITICAL NEXT.JS DEPLOYMENT NOTE:
  Unlike Vite (which produces static dist/ files), Next.js requires
  Node.js to be running to serve the app. PM2 must keep `next start`
  alive. No FTP of static files — the .next/ folder is served by Node.

PM2 ECOSYSTEM (ecosystem.config.js):
  Two apps: maa-frontend (next start, port 3000) + maa-api (server.js, port 5000)
  Both with NODE_ENV=production and correct cwd

NGINX: Must proxy both ports, serve /uploads static, handle SSL
SSL: Let's Encrypt via cPanel AutoSSL

ENV VARS:
  Frontend: NEXT_PUBLIC_ prefix for browser-accessible vars
  Backend:  Standard process.env vars
  Never commit .env — only .env.example

Reference: docs/01_ARCHITECTURE.md §8 · docs/03_AI_PROMPTS.md §Prompt-11
```

**Task examples**:
```
- Write ecosystem.config.js for PM2 with both Next.js and Express apps
- Write nginx.conf with proxy for :3000 (Next) and :5000 (API)
- Write both .env.example files with all variables documented
- Write deploy.sh that builds Next.js and restarts PM2
- Write VPS setup checklist: Node 20, PM2, Nginx, MySQL, SSL
```

**Guardrails**:
```
❌ Never commit .env files (only .env.example)
❌ Never serve Next.js as static files — it needs Node.js running
❌ Never disable SSL in production Nginx config
❌ Never run apps as root on VPS
❌ Never edit any src/ application files
```

---

## Interface Contracts (All Agents)

### Shared imports all frontend agents use
```js
// DESIGN_SYSTEM provides:
import PageHero    from '@/components/common/PageHero'    // props: title, subtitle, variant
import PawDivider  from '@/components/common/PawDivider'  // no props
import { fadeUp, staggerContainer, scaleIn } from '@/utils/motionVariants'

// BACKEND_API provides (consumed via):
import api from '@/services/api'   // Axios: base NEXT_PUBLIC_API_URL, credentials: 'include'

// Custom hooks:
import { useFetch } from '@/hooks/useFetch'   // (url) → { data, loading, error }
import { useAuth }  from '@/context/AuthContext' // { isAuthenticated, login, logout }

// I18N provides:
const { t } = useTranslation()  // key: 'namespace.section.key'
```

### Agent conflict resolution
```
DESIGN_SYSTEM  > FRONTEND_UI  on shared components
BACKEND_API    > all          on backend files (no other agent touches backend/)
I18N           > all          on locale JSON files
DEVOPS         > all          on config files (next.config.js, ecosystem.config.js)
```

### Pre-commit checklist (all agents)
```
☐ 'use client' on every component with hooks, events, or Framer Motion
☐ next/image used for all images — no <img> tags
☐ next/link used for all internal links — no <a href>
☐ No hardcoded English strings — t() everywhere
☐ No TypeScript — .js and .jsx only
☐ No inline styles — Tailwind only
☐ No JWT in localStorage
☐ No raw SQL in backend
☐ No .env files committed
☐ Loading + error + empty state handled in every data-fetching component
☐ All 4 locale files have identical key structure
```
