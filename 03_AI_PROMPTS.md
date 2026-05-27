# MAA Saraswati Veterinary Hospital — AI Prompt Guide

> Use these prompts sequentially with any AI coding assistant (Claude, Copilot, Cursor, etc.).
> Paste the **Project Context Block** first in every new session, then use the specific prompt for the task at hand.

---

## PROJECT CONTEXT BLOCK
> ⚠️ Paste this at the start of every new AI session before any other prompt.

```
I am building a website for MAA Saraswati Veterinary Hospital — a free veterinary hospital in Hyderabad, India.

TECH STACK:
- Frontend: Vite + React (JavaScript) + Tailwind CSS
- Backend: Node.js + Express + MySQL (via Sequelize)
- Auth: JWT (httpOnly cookie)
- File uploads: Multer (disk storage on VPS)
- i18n: react-i18next (English, Telugu, Hindi, Tamil)
- Routing: React Router DOM v6
- HTTP: Axios
- Forms: React Hook Form
- Notifications: React Hot Toast
- Animation: Framer Motion

DESIGN:
- Primary colour: Saffron #F4830F
- Secondary: Forest Green #2C5F2D
- Background: Cream #FFF8F0
- Text: Charcoal #2D2D2D
- Fonts: Inter (Latin), Mukta (Hindi), Noto Sans Telugu, Noto Sans Tamil
- Cards: rounded-2xl with subtle shadow
- Buttons: rounded-full

STRUCTURE:
- src/components/ — reusable UI components
- src/pages/ — one file per page/route
- src/services/api.js — all Axios API calls
- src/i18n/locales/ — en.json, te.json, hi.json, ta.json
- src/context/AuthContext.jsx — JWT auth state

CONVENTIONS:
- Functional components only, no class components
- Use Tailwind classes directly, no inline styles
- All user-facing strings must use the useTranslation() hook: const { t } = useTranslation()
- API base URL from import.meta.env.VITE_API_URL
- Always handle loading and error states
- Mobile-first responsive design
```

---

## PROMPT 1 — Project Scaffold

```
Using the project context above, scaffold the full Vite + React project.

Tasks:
1. Generate the exact folder structure from the architecture doc
2. Write package.json with all dependencies listed in the context
3. Write vite.config.js with path aliases (@/ → src/)
4. Write tailwind.config.js with the custom colour palette and font families
5. Write src/main.jsx with ReactDOM.createRoot, BrowserRouter, i18n initialisation, and AuthProvider wrapping App
6. Write src/App.jsx with React Router v6 routes for all 10 public pages + admin routes wrapped in a ProtectedRoute component
7. Write src/i18n/index.js initialising i18next with all 4 locales
8. Write a skeleton en.json with keys for every page (all values as English placeholder strings)
9. Write src/services/api.js — an Axios instance pointing to import.meta.env.VITE_API_URL with a request interceptor that attaches the JWT from cookies to every request
10. Write src/context/AuthContext.jsx managing isAuthenticated, login(), logout() using JWT stored in httpOnly cookie

Output each file with its full path as a comment on line 1.
```

---

## PROMPT 2 — Navbar & Footer Components

```
Using the project context above, build the Navbar and Footer components.

NAVBAR (src/components/common/Navbar.jsx):
- Sticky top, full width, white background with subtle shadow
- Left: hospital logo (src/assets/logo.svg) scaled to h-12
- Centre: horizontal nav links for desktop (Home, About Us, Infrastructure, Medical Facilities, Our Team, Photo Gallery, CSR Activities, Ways to Donate, Sponsor Our Needs, Contact Us) — each a React Router <NavLink> with saffron active colour
- Right: LanguageSwitcher component
- Mobile (< md): hamburger icon → slide-in drawer with all links and language switcher
- Use Framer Motion for drawer animation
- All link labels must use t() for translation

LANGUAGE SWITCHER (src/components/common/LanguageSwitcher.jsx):
- Dropdown with 4 options: English · తెలుగు · हिंदी · தமிழ்
- On change: call i18n.changeLanguage() and save to localStorage
- On mount: read from localStorage and apply saved language
- Display as a small rounded select or custom dropdown with flag emojis

FOOTER (src/components/common/Footer.jsx):
- Dark forest green background, white text
- Three columns: About (hospital description), Quick Links (all pages), Contact Info (address, phone, email)
- Bottom bar: copyright + "Designed with ❤️ for animals"
- All text translatable with t()

Output complete, working JSX code for all three files.
```

---

## PROMPT 3 — Home Page

```
Using the project context above, build the Home page (src/pages/Home.jsx).

The page must include these sections in order:

1. HERO SECTION (src/components/home/HeroSection.jsx)
   - Full-width background image (prop: imageUrl from API or a local placeholder)
   - Heading: t('home.hero.heading') — "Compassionate Care for Every Animal"
   - Subheading: t('home.hero.subheading')
   - Two buttons: "Donate Now" (saffron, links to /donate) and "Learn More" (outline, links to /about)
   - Framer Motion fade-in-up on mount

2. STATS BAR (src/components/home/StatsBar.jsx)
   - Saffron background strip
   - 4 animated counters using IntersectionObserver: 5000+ Animals Treated, 10+ Doctors, 100 km Coverage, ₹0 Cost
   - Numbers count up when the strip scrolls into view

3. MISSION & VISION CARDS (src/components/home/MissionCard.jsx)
   - Two side-by-side cards (stack on mobile)
   - Fetch text from GET /api/content/home — use useFetch hook
   - Saffron accent top border, green icon

4. SERVICES GRID
   - 6 icon cards: Cattle, Dogs, Poultry, Surgery, Ambulance, Lab Tests
   - Lucide React icons or emoji fallbacks
   - Responsive: 2 cols mobile, 3 cols tablet, 6 cols desktop

5. DONATE CALLOUT BANNER
   - Full-width saffron section
   - Heading + "Donate Now" button linking to /donate

6. LATEST CSR ACTIVITIES
   - Fetch 3 most recent from GET /api/csr?limit=3
   - Card: image, title, date
   - "View All" link to /csr-activities
   - Show skeleton loaders while fetching

Include proper loading states, error states, and mobile responsiveness throughout.
```

---

## PROMPT 4 — Photo & Video Gallery Page

```
Using the project context above, build the Gallery page (src/pages/PhotoGallery.jsx).

Requirements:

1. FILTER TABS
   - Categories: All, General, Surgeries, Ambulance, Wards, CSR
   - Active tab: saffron underline. Click filters the grid without page reload.
   - State: useState for activeCategory

2. PHOTO GRID
   - Fetch from GET /api/gallery/photos?category={activeCategory}
   - Use CSS columns (masonry layout via Tailwind) — 1 col mobile, 2 tablet, 3 desktop
   - Each photo: img with object-cover, rounded-2xl, caption on hover overlay
   - Click → open yet-another-react-lightbox
   - Lazy load images using loading="lazy" attribute

3. VIDEO SECTION (below photos)
   - Heading: "Video Gallery"
   - Fetch from GET /api/gallery/videos
   - Grid: 1 col mobile, 2 tablet, 3 desktop
   - Each card: video thumbnail image + play icon overlay + title
   - Click → modal with <ReactPlayer url={video.filepath} controls playing />

Show skeleton loaders for both grids while fetching. Handle empty state gracefully ("No photos in this category yet").
```

---

## PROMPT 5 — Our Team Page

```
Using the project context above, build the Our Team page (src/pages/OurTeam.jsx).

Requirements:
- Fetch team members from GET /api/team (sorted by display_order)
- Page Hero: banner + "Meet Our Dedicated Team" heading
- Team grid: 2 cols mobile, 3 cols tablet, 4 cols desktop
- Each card (src/components/team/TeamCard.jsx):
  - Circular headshot photo (object-cover, border-4 border-saffron)
  - Name (bold, charcoal)
  - Designation (saffron)
  - Qualification (grey, smaller)
  - Hover: scale-105 with green shadow
  - If no photo: show initials in a saffron circle avatar
- Show LoadingSpinner while fetching
- All labels translatable with t()
```

---

## PROMPT 6 — Contact Page

```
Using the project context above, build the Contact page (src/pages/ContactUs.jsx).

Requirements:

1. Page Hero section

2. Contact Info Cards (3 cards side-by-side, stack on mobile):
   - Address card (map pin icon)
   - Phone card (phone icon) — clickable tel: link
   - Email card (mail icon) — clickable mailto: link

3. Google Maps embed:
   - iframe embed of hospital location (Hyderabad — use placeholder coords 17.385, 78.486)
   - Full width, height 400px, rounded-2xl

4. Contact Form (React Hook Form):
   Fields: Name (required), Email (required, email validation), Phone (required), Subject (dropdown: General Enquiry / Donation / Sponsorship / Emergency / Volunteer), Message (textarea, required, min 20 chars)
   - On submit: POST /api/contact with form data
   - Success: React Hot Toast "Message sent! We'll get back to you soon."
   - Error: Toast "Something went wrong. Please try again."
   - Disable submit button while loading, show spinner

5. Emergency Ambulance Banner:
   - Red/saffron background
   - "Animal Emergency? Call our ambulance 24/7" + phone number in large font

All form labels and placeholders must use t().
```

---

## PROMPT 7 — Donate Page

```
Using the project context above, build the Ways to Donate page (src/pages/WaysToDonate.jsx).

Requirements:

1. Page Hero: "Support Free Veterinary Care for Every Animal"

2. Impact Stats (4 cards with saffron icons):
   - "₹500 covers one animal's surgery"
   - "₹1,000 funds ambulance fuel for a rescue"
   - "₹5,000 stocks medicines for a month"
   - "₹10,000 sponsors a doctor's monthly salary"

3. UPI Donation Section:
   - Centred card with forest green border
   - Heading: "Scan & Pay via UPI"
   - Large QR code image (fetch from GET /api/content/donate for the QR image URL, or show a placeholder)
   - UPI ID text below QR (with a copy-to-clipboard button using navigator.clipboard)
   - Row of supported UPI app logos: GPay, PhonePe, Paytm, BHIM (use public SVG logos)
   - Instructions numbered list: 1. Open any UPI app  2. Tap Scan QR  3. Enter amount  4. Pay

4. Bank Transfer Details:
   - Table/card with: Account Name, Bank Name, Branch, Account Number (with copy button), IFSC Code (with copy button)
   - Use placeholder values clearly marked as [UPDATE WITH REAL DETAILS]

5. Donation Note:
   - Italicised note: "All donations are voluntary. Please screenshot your payment and WhatsApp to [number] for acknowledgement and receipt."

All text translatable. Copy buttons show a checkmark confirmation for 2 seconds after copying.
```

---

## PROMPT 8 — Admin Panel

```
Using the project context above, build the complete Admin Panel.

PART A — Admin Login (src/pages/admin/AdminLogin.jsx):
- Centred card on a forest green background
- Hospital logo at top
- Email + Password fields (React Hook Form)
- Submit → POST /api/auth/login
- On success: save token, update AuthContext.isAuthenticated, redirect to /admin/dashboard
- On error: show "Invalid credentials" toast
- No "Forgot Password" needed in v1

PART B — Protected Route (src/components/admin/ProtectedRoute.jsx):
- Read isAuthenticated from AuthContext
- If false: redirect to /admin
- If true: render <Outlet />

PART C — Admin Layout (src/components/admin/AdminLayout.jsx):
- Left sidebar (collapsible on mobile):
  - Logo
  - Nav items with Lucide icons: Dashboard, Gallery, Team, CSR Activities, Page Content
  - Logout button at bottom (calls /api/auth/logout, clears auth, redirects to /admin)
- Right: <Outlet /> content area

PART D — Dashboard (src/pages/admin/AdminDashboard.jsx):
- 4 stat cards: Total Photos, Total Videos, Team Members, CSR Activities (fetch counts from a GET /api/admin/stats endpoint)
- Quick action buttons to each section

PART E — Manage Gallery (src/pages/admin/ManageGallery.jsx):
- Two tabs: Photos | Videos
- Photos tab:
  - Upload form: file input (multi-select), category dropdown, caption input, Upload button
  - On submit: POST /api/gallery/photos (multipart/form-data)
  - Below form: grid of existing photos with a red delete button (DELETE /api/gallery/photos/:id with confirm dialog)
- Videos tab:
  - Upload form: file input, title input, Upload button
  - Below: list of videos with title, delete button
  - Show upload progress bar using axios onUploadProgress

PART F — Manage Team (src/pages/admin/ManageTeam.jsx):
- Add Member form: name, designation, qualification, display order, photo upload
- Table of existing members: name, designation, photo thumbnail, edit button, delete button
- Edit: opens a pre-filled form in a modal

PART G — Manage CSR (src/pages/admin/ManageCSR.jsx):
- Add Activity form: title, date picker, description textarea, multi-image upload
- List of activities: title, date, delete button

PART H — Manage Content (src/pages/admin/ManageContent.jsx):
- Accordion sections for: Home, About, Infrastructure, Medical Facilities, Donate
- Each section: text fields for EN, Telugu, Hindi, Tamil for each content block
- Save button per section → PUT /api/content/:page
```

---

## PROMPT 9 — Backend: Express API Setup

```
Build the Node.js + Express backend for MAA Saraswati Veterinary Hospital website.

PART A — Project setup:
- package.json with dependencies: express, sequelize, mysql2, jsonwebtoken, bcryptjs, multer, nodemailer, cors, helmet, express-rate-limit, express-validator, dotenv
- server.js: initialise Express, apply middleware (cors with whitelist, helmet, rate-limit, json body parser), mount all routers, serve /uploads as static, global error handler, listen on process.env.PORT || 5000

PART B — config/db.js:
- Sequelize instance connected to MySQL using env vars (DB_HOST, DB_USER, DB_PASS, DB_NAME)
- Export sequelize instance

PART C — All Sequelize models (as described in the architecture doc):
- models/Admin.js
- models/GalleryPhoto.js
- models/GalleryVideo.js
- models/TeamMember.js
- models/CSRActivity.js
- models/PageContent.js

PART D — config/multer.js:
- diskStorage: destination based on fieldname (images go to uploads/images/, videos to uploads/videos/)
- Filename: uuid() + original extension
- fileFilter: accept only jpg/png/webp for images, mp4/mov/webm for videos
- Limits: 5MB images, 200MB videos

PART E — JWT middleware (middleware/authMiddleware.js):
- Extract Bearer token from Authorization header OR from httpOnly cookie named 'jwt'
- Verify with process.env.JWT_SECRET
- Attach decoded payload to req.admin
- Return 401 if missing or invalid

PART F — All route files and controllers for:
- auth (login, logout)
- gallery (CRUD photos and videos with multer)
- team (CRUD with photo upload)
- csr (CRUD with multi-image upload)
- content (get by page, update by page)
- contact (send email via Nodemailer SMTP from env vars)
- admin stats (GET /api/admin/stats — return counts from all tables)

PART G — A seed script (scripts/seed.js) that:
- Creates the admin user (email + bcrypt-hashed password from env)
- Inserts initial page_content rows for all editable text blocks
- Run via: node scripts/seed.js
```

---

## PROMPT 10 — i18n Translation Files

```
Using the project context above, generate complete translation JSON files for the MAA Saraswati Veterinary Hospital website.

Generate 4 files:
- src/i18n/locales/en.json — English (all keys, full English text)
- src/i18n/locales/te.json — Telugu translation (same keys)
- src/i18n/locales/hi.json — Hindi translation (same keys)
- src/i18n/locales/ta.json — Tamil translation (same keys)

The JSON must include keys for every user-facing string in:
- Navbar (all menu items, language switcher label)
- Footer (tagline, quick links heading, contact heading, copyright)
- Home page (hero heading, hero subheading, stats labels, mission/vision titles, services names, donate callout, CSR section heading)
- About Us page (section headings, body paragraphs describing the hospital)
- Infrastructure page (section headings, facility names)
- Medical Facilities page (section headings, animal categories, treatment types)
- Our Team page (section heading, card labels)
- Gallery page (tab labels, empty state messages)
- CSR Activities page (section headings)
- Donate page (all headings, instructions, UPI steps, bank transfer labels, donation note)
- Sponsor page (headings, how-to steps, CTA button)
- Contact page (form labels, placeholders, subject options, success/error messages, ambulance CTA)
- Admin panel (login labels, sidebar menu items, form labels, button labels)
- Common (loading, error, view all, submit, cancel, delete, save, edit, upload)

Use natural, respectful, and warm language appropriate for a charitable veterinary hospital.
```

---

## PROMPT 11 — Deployment Guide

```
Write a step-by-step deployment guide for the MAA Saraswati Veterinary Hospital website on a cPanel VPS.

Cover:
1. VPS prerequisites (Node.js 20, PM2, Nginx, MySQL already installed or how to install)
2. MySQL: create database and user via cPanel, run Sequelize migrations and seed script
3. Backend: upload maa-backend/ via FTP or git, install dependencies, create .env with all required variables (list every variable), start with PM2 (pm2 start server.js --name maa-api), set PM2 to autostart on reboot
4. Frontend: run npm run build locally, upload dist/ to public_html/ on cPanel
5. Nginx: configure reverse proxy for /api → Node.js :5000, serve React SPA with try_files fallback, serve /uploads static folder (provide exact nginx.conf snippet)
6. SSL: enable Let's Encrypt via cPanel AutoSSL
7. Verify: checklist of URLs to test after deployment
8. Maintenance: how to update content (admin panel), how to deploy frontend updates (rebuild + re-upload dist/), how to restart backend (pm2 restart maa-api)
```

---

## QUICK REFERENCE — Common Patterns

### useFetch custom hook
```js
// src/hooks/useFetch.js
import { useState, useEffect } from 'react'
import api from '../services/api'

export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.get(url)
      .then(res => setData(res.data))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [url])

  return { data, loading, error }
}
```

### Standard page skeleton
```jsx
// Paste this pattern for every new page
import { useTranslation } from 'react-i18next'

export default function PageName() {
  const { t } = useTranslation()
  return (
    <main>
      {/* Page Hero */}
      <section className="bg-forest py-20 text-white text-center">
        <h1 className="text-4xl font-bold">{t('pageName.hero.heading')}</h1>
      </section>
      {/* Content sections */}
    </main>
  )
}
```

### Protected Admin Route
```jsx
// src/components/admin/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin" replace />
}
```

### File upload with progress
```jsx
const [progress, setProgress] = useState(0)
await api.post('/gallery/photos', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
  onUploadProgress: e => setProgress(Math.round((e.loaded * 100) / e.total))
})
```
