# MAA Saraswati Veterinary Hospital — Frontend UI Prompt Guide (v0)

> These prompts are focused purely on **visual design and UI implementation**.
> Use them alongside the main AI Prompt Guide (doc 03) — paste the Project Context Block first, then the relevant UI prompt.
> These prompts produce **clean, production-grade, distinctively Indian** UI — not generic AI templates.

---

## UI CONTEXT BLOCK
> ⚠️ Paste this before every UI prompt in a new session.

```
I am building the frontend UI for MAA Saraswati Veterinary Hospital — a free veterinary hospital
in Hyderabad, India. This is a charity/NGO site that must feel warm, trustworthy, and professional.

DESIGN IDENTITY:
- Aesthetic: "Warm Indian Charity" — think editorial warmth of a National Geographic spread,
  the structural clarity of a modern NGO like Akshaya Patra, and the earthy richness of
  Indian handcraft branding. NOT corporate. NOT cold. NOT generic.
- Mood: Compassionate, grounded, hopeful, community-rooted.

COLOUR PALETTE (Tailwind custom tokens already configured):
  --saffron:       #F4830F   (primary — CTAs, accents, highlights)
  --saffron-light: #FDB96B   (hover states, badges)
  --saffron-dark:  #C4650A   (pressed states)
  --forest:        #2C5F2D   (secondary — headings, footer, icons)
  --forest-light:  #4A8A4C   (card borders, hover tints)
  --cream:         #FFF8F0   (page background)
  --charcoal:      #2D2D2D   (body text)
  --muted:         #6B7280   (subtext, captions)

TYPOGRAPHY:
  - Display headings: "DM Serif Display" (Google Fonts) — warm, editorial, trustworthy
  - Body / UI text: "Plus Jakarta Sans" (Google Fonts) — modern, clear, friendly
  - Indian scripts (when i18n active): Mukta (Hindi), Noto Sans Telugu, Noto Sans Tamil
  - Font scale: text-sm body, text-base default, text-2xl–5xl for headings

COMPONENT RULES:
  - Cards: bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.07)] p-6
  - Buttons primary: bg-saffron text-white rounded-full px-6 py-3 font-semibold
    hover:bg-saffron-dark transition-all duration-200 shadow-md hover:shadow-lg
  - Buttons secondary: border-2 border-forest text-forest rounded-full px-6 py-3
    hover:bg-forest hover:text-white transition-all duration-200
  - Section padding: py-16 md:py-24 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto
  - Dividers: thin saffron horizontal rule (border-t-2 border-saffron/30) or
    a decorative paw-print motif (SVG inline)

ANIMATION:
  - Use Framer Motion for page-level transitions and scroll-reveals
  - Stagger children: delay 0.1s per card/item on scroll entry
  - No autoplay video. No parallax (bad for mobile). No heavy particle effects.
  - Micro-interactions: button scale-[1.03] on hover, card lift on hover

ICONS: Lucide React — consistent stroke-width=1.5, sized 20–24px
IMAGES: Always object-cover, always with loading="lazy" and alt text
GRID: CSS Grid via Tailwind — never float layouts

NEXT.JS UI RULES:
  - Always next/image instead of <img> — use fill + relative container for responsive images
  - Always next/link instead of <a href> for internal links
  - Add 'use client' to any component using useState, animation, or event handlers
  - For hero background images: <div className="relative min-h-screen"><Image fill .../><overlay/><content/></div>

DO NOT:
  - Use purple or blue gradients
  - Use Inter or Roboto as display font
  - Use generic card designs with no personality
  - Use stock-photo hero banners without overlay
  - Make it look like a government portal or generic Bootstrap template
```

---

## UI PROMPT 1 — Global Layout Shell

```
Using the UI context above, build the global layout shell for the MAA website.

Requirements:

SCROLLTOTOP (src/components/common/ScrollToTop.jsx):
- Floating circular button — saffron background, white arrow icon
- Appears only after scrolling 300px down (useEffect + window.onscroll)
- Framer Motion: fade+scale in/out
- Fixed bottom-right: fixed bottom-6 right-6 z-50

PAGE WRAPPER:
- All pages wrapped in a <div className="min-h-screen bg-cream flex flex-col">
- <Navbar /> at top, <Footer /> at bottom, <main className="flex-1"> for page content
- Add a thin saffron top-border stripe to the very top of the page (4px, full width)
  as a signature visual element across the entire site

SECTION UTILITY CLASSES (define in index.css as @layer components):
  .section-wrapper   → max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-16 md:py-24
  .section-heading   → font-["DM_Serif_Display"] text-3xl md:text-4xl text-forest leading-tight
  .section-subtext   → text-muted text-base md:text-lg max-w-2xl
  .card              → bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.07)] p-6
  .btn-primary       → bg-saffron text-white rounded-full px-6 py-3 font-semibold
                        hover:bg-saffron-dark transition-all duration-200 shadow-md
  .btn-outline       → border-2 border-forest text-forest rounded-full px-6 py-3
                        font-semibold hover:bg-forest hover:text-white transition-all duration-200

DECORATIVE ELEMENT — PawDivider (src/components/common/PawDivider.jsx):
- A section divider: thin saffron/30 horizontal line with a small paw SVG icon centred on it
- Used between major sections on homepage and about page
- Implementation: relative div, absolute-centred paw icon on a cream background circle

Output all files with paths.
```

---

## UI PROMPT 2 — Navbar UI

```
Using the UI context above, build a visually refined Navbar (src/components/common/Navbar.jsx).

Visual spec:
- Background: white with backdrop-blur-md and a very subtle bottom border (border-b border-gray-100)
- Logo: hospital logo SVG left-aligned, max height h-12
- Below the logo text: a tiny tagline "Free Veterinary Care" in saffron, text-[10px] uppercase tracking-widest
- Nav links: Plus Jakarta Sans, text-sm font-medium text-charcoal
  - Hover: text-saffron with a saffron underline slide-in (CSS transform scaleX transition)
  - Active: text-saffron font-semibold
- Language switcher: pill-shaped button — bg-forest/10 text-forest text-xs font-semibold
  rounded-full px-3 py-1.5. Dropdown shows flag emoji + language name.
- Donate button (separate from nav links): bg-saffron text-white text-sm font-semibold
  rounded-full px-4 py-2 hover:bg-saffron-dark — links to /donate

MOBILE (below md breakpoint):
- Hamburger: three-line icon → morphs to X on open (CSS transition)
- Drawer: slides from right, full height, forest green background (#2C5F2D)
  - Links: white text, text-lg, staggered Framer Motion fade-in
  - Language switcher: white pills
  - Donate button: saffron, full width at bottom of drawer

SCROLL BEHAVIOUR:
- On scroll > 10px: add subtle shadow shadow-md to navbar
- Transition: transition-shadow duration-300
```

---

## UI PROMPT 3 — Hero Section UI

```
Using the UI context above, build a stunning Hero Section (src/components/home/HeroSection.jsx).

Visual spec:
- Full viewport height (min-h-screen) background image with a layered overlay:
  - Layer 1: linear-gradient(135deg, rgba(44,95,45,0.82) 0%, rgba(244,131,15,0.55) 100%)
  - This gives a forest-green-to-saffron diagonal wash over the image
- Content: vertically and horizontally centred

CONTENT LAYOUT (centred column, max-w-3xl mx-auto text-white text-center):
- Small label pill above heading:
  bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs
  font-semibold uppercase tracking-widest rounded-full px-4 py-1.5 inline-block mb-6
  Text: "🐾 Free Veterinary Care · Est. July 2024 · Hyderabad"

- Main Heading: DM Serif Display, text-5xl md:text-7xl, font-normal (serif handles weight),
  leading-tight, text-white
  Text: "Compassionate Care for Every Animal"

- Subheading: Plus Jakarta Sans, text-lg md:text-xl, text-white/85, max-w-xl mx-auto, mt-4

- CTA Buttons (row, gap-4, mt-10, flex-wrap justify-center):
  - "Donate Now" → btn-primary (saffron bg) + paw icon left
  - "Learn More" → border-2 border-white text-white hover:bg-white hover:text-forest
    rounded-full px-6 py-3 font-semibold transition-all

- Scroll indicator at bottom: animated bouncing chevron-down in white/60, absolute bottom-8

ANIMATIONS (Framer Motion):
- Pill label: fade+slide up, delay 0.2s
- Heading: fade+slide up, delay 0.4s
- Subheading: fade+slide up, delay 0.6s
- Buttons: fade+slide up, delay 0.8s
- Scroll indicator: infinite bounce
```

---

## UI PROMPT 4 — Stats Bar UI

```
Using the UI context above, build an animated Stats Bar (src/components/home/StatsBar.jsx).

Visual spec:
- Background: saffron #F4830F
- Layout: flex row, 4 equal columns (stack to 2x2 on mobile)
- Each stat item:
  - Large number: DM Serif Display text-5xl text-white font-normal
  - Label: Plus Jakarta Sans text-sm text-white/80 uppercase tracking-wider mt-1
  - Subtle vertical divider between items (border-r border-white/20, hidden on last)

STATS DATA:
  { value: 5000, suffix: '+', label: 'Animals Treated' }
  { value: 10,   suffix: '+', label: 'Doctors & Staff' }
  { value: 100,  suffix: 'km', label: 'Coverage Radius' }
  { value: 0,    prefix: '₹',  label: 'Cost to Pet Owners' }

ANIMATION:
- Use IntersectionObserver to detect when bar enters viewport
- On entry: numbers count up from 0 to final value over 2 seconds (easeOut curve)
- Use requestAnimationFrame for smooth counting
- Each number starts counting with a 150ms stagger between items

BACKGROUND TEXTURE:
- Add a subtle repeating paw-print SVG pattern at 8% opacity overlaid on the saffron background
- Pattern: tiny 24px paw SVG, repeat, opacity-[0.08], pointer-events-none absolute inset-0
```

---

## UI PROMPT 5 — Cards & Section UI (Home Page Sections)

```
Using the UI context above, build the remaining Home page sections.

SECTION A — Mission & Vision Cards (src/components/home/MissionCard.jsx):
- Two side-by-side cards (grid-cols-1 md:grid-cols-2 gap-6)
- Each card: white bg, rounded-2xl, p-8, shadow card class
  - Top: icon in a rounded-xl saffron/10 bg square (40px) with saffron icon
  - Saffron 3px left border accent: border-l-4 border-saffron ml-[-24px] pl-6 (or use before: pseudo)
  - Title: DM Serif Display text-2xl text-forest
  - Body: Plus Jakarta Sans text-base text-charcoal leading-relaxed
- Framer Motion: slide-in from left (Mission) and right (Vision) on scroll

SECTION B — Services Grid:
- Section heading: "What We Treat" + PawDivider below
- 6 cards in grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4
- Each service card: bg-white rounded-2xl p-5 text-center card shadow
  - Circle icon bg: 56px circle, bg-saffron/10, saffron icon inside (Lucide or emoji)
  - Title: text-sm font-semibold text-forest mt-3
  - Hover: -translate-y-1 shadow-lg border-t-2 border-saffron transition-all duration-200
- Services: Cattle 🐄 · Dogs 🐕 · Sheep/Goats 🐑 · Poultry 🐔 · Surgery 🔪 · Lab Tests 🔬

SECTION C — Donate Callout Banner:
- Background: forest green #2C5F2D
- Subtle diagonal stripe texture (repeating-linear-gradient at 45deg, white/5)
- Layout: flex row space-between (stack on mobile)
  - Left: Heading DM Serif Display text-3xl text-white + subtext text-white/75
  - Right: Saffron "Donate Now" button with right-arrow icon
- Framer Motion: fade in on scroll

SECTION D — CSR Activity Cards:
- Section heading: "Our Recent Impact"
- 3-col grid (stack to 1 on mobile)
- Card: rounded-2xl overflow-hidden shadow, no padding on image
  - Image: aspect-video w-full object-cover
  - Body: p-5
    - Date: text-xs text-muted font-medium uppercase tracking-wide
    - Title: text-base font-semibold text-forest mt-1
    - Short description: text-sm text-charcoal/80 line-clamp-2 mt-1
  - Bottom: "Read More →" in saffron, text-sm font-semibold
- Hover: scale-[1.02] shadow-lg transition-all duration-200
```

---

## UI PROMPT 6 — Gallery Page UI

```
Using the UI context above, build a visually rich Gallery page (src/pages/PhotoGallery.jsx).

FILTER TABS:
- Horizontally scrollable on mobile (overflow-x-auto, scrollbar-hide)
- Each tab: pill shape, text-sm font-semibold
  - Inactive: bg-white border border-gray-200 text-charcoal
  - Active: bg-forest text-white border-transparent
  - Hover inactive: border-forest text-forest
  - Transition: all 200ms
- Row of tabs: flex gap-2 py-4 (no wrap on desktop)

PHOTO MASONRY GRID:
- CSS columns — not JS masonry library:
  columns-1 sm:columns-2 lg:columns-3 gap-4
- Each photo wrapper: break-inside-avoid mb-4 relative group rounded-2xl overflow-hidden
- Image: w-full object-cover block
- Hover overlay: absolute inset-0 bg-forest/60 opacity-0 group-hover:opacity-100
  transition-opacity duration-300 flex items-end p-4
  - Caption text in white text-sm + expand icon top-right
- Framer Motion: staggered fade-in on load (0.05s per photo)

VIDEO GRID:
- Section heading: "Video Gallery" with saffron underline (w-12 h-1 bg-saffron rounded mt-2)
- grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6
- Each video card: rounded-2xl overflow-hidden shadow card relative group cursor-pointer
  - Thumbnail: aspect-video object-cover w-full
  - Play button overlay: absolute inset-0 flex items-center justify-center
    bg-black/30 group-hover:bg-black/50 transition-all
    Play icon: 56px circle bg-saffron/90 text-white flex items-center justify-center
    group-hover:scale-110 transition-transform
  - Title: p-4 text-sm font-semibold text-forest

VIDEO MODAL (inline, not a library):
- Fixed overlay: inset-0 bg-black/90 z-50 flex items-center justify-center
- Framer Motion: scale-in from 0.9 → 1
- Close button: top-right X icon in white, hover:text-saffron
- ReactPlayer inside: w-full max-w-4xl aspect-video
```

---

## UI PROMPT 7 — Team Page UI

```
Using the UI context above, build the Our Team page (src/pages/OurTeam.jsx).

PAGE HERO:
- Forest green background, py-20
- DM Serif Display text-4xl md:text-5xl text-white centred
- Subheading text-white/75 text-lg mt-3
- Decorative: two small saffron paw prints SVG flanking the heading

TEAM GRID:
- grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8
- Each TeamCard (src/components/team/TeamCard.jsx):
  - Card: bg-white rounded-2xl p-6 text-centre shadow card
  - Photo: 96px × 96px circle, object-cover mx-auto
    border-4 border-saffron/30 group-hover:border-saffron transition-all
  - No photo fallback: circle with bg-saffron/10 text-saffron font-bold text-2xl
    showing initials (first letter of first + last name)
  - Name: DM Serif Display text-lg text-charcoal mt-4
  - Designation: text-sm font-semibold text-saffron mt-0.5
  - Qualification: text-xs text-muted mt-1
  - Hover: card lifts (-translate-y-1 shadow-lg), photo border becomes full saffron
  - Framer Motion: stagger fade-in-up on scroll, 0.08s per card

LOADING SKELETON (while fetching):
- Same grid layout
- Each skeleton card: animate-pulse
  - Circle: 96px bg-gray-200 rounded-full mx-auto
  - Three lines: h-4 bg-gray-200 rounded mt-4, h-3 mt-2, h-3 w-2/3 mx-auto mt-1
```

---

## UI PROMPT 8 — Donate Page UI

```
Using the UI context above, build the Ways to Donate page (src/pages/WaysToDonate.jsx).

PAGE HERO:
- Gradient: from-forest to-forest-light
- DM Serif Display text-4xl md:text-5xl text-white
- Small heart icon (❤️) before heading

IMPACT CARDS (grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12):
- Each card: bg-white rounded-2xl p-6 shadow card text-centre
  - Amount: DM Serif Display text-3xl text-saffron
  - Description: text-sm text-charcoal mt-2 leading-relaxed
  - Icon: Lucide icon in saffron circle above amount
- Hover: -translate-y-1 border-b-4 border-saffron transition-all

UPI SECTION (centred card, max-w-md mx-auto):
- Card: bg-white rounded-3xl shadow-xl p-8 border-2 border-saffron/20 text-centre
- Heading: "Scan & Pay via UPI" DM Serif Display text-2xl text-forest
- QR code: 200×200 img, rounded-xl, border-4 border-saffron/20 mx-auto mt-4
  Add subtle pulsing saffron glow: animate-pulse ring-4 ring-saffron/20
- UPI ID row: monospace text-sm bg-gray-50 rounded-full px-4 py-2 inline-flex items-centre gap-2
  Copy button: saffron clipboard icon → shows green check for 2s after copy
- UPI App logos row: 4 logos (GPay, PhonePe, Paytm, BHIM) in a flex row gap-3, h-8 each, mt-6
- Numbered steps below: 1-2-3-4 with saffron circle numbers and text

BANK TRANSFER CARD (mt-8 max-w-lg mx-auto):
- Card with forest left border (border-l-4 border-forest)
- Title: "Bank Transfer Details" text-lg font-semibold text-forest
- Table rows: label (text-muted text-sm) + value (text-charcoal font-medium) + copy icon
- Each row: flex justify-between items-centre py-3 border-b border-gray-100 last:border-0

NOTE BOX:
- bg-saffron/10 border border-saffron/30 rounded-xl p-4 mt-6 text-sm text-charcoal italic max-w-lg mx-auto
```

---

## UI PROMPT 9 — Contact Page UI

```
Using the UI context above, build the Contact page (src/pages/ContactUs.jsx).

CONTACT INFO CARDS (grid-cols-1 md:grid-cols-3 gap-5 mt-12):
- Each card: bg-white rounded-2xl p-6 shadow text-centre
  - Lucide icon in 48px saffron/10 circle (saffron icon)
  - Title: text-sm font-semibold text-muted uppercase tracking-wider mt-4
  - Value: text-base font-medium text-charcoal mt-1

GOOGLE MAPS EMBED:
- rounded-2xl overflow-hidden shadow-lg w-full h-80 mt-10

CONTACT FORM CARD (bg-white rounded-3xl shadow-xl p-8 md:p-12 max-w-2xl mx-auto mt-10):
- Form heading: DM Serif Display text-2xl text-forest
- Input style (apply consistently): 
  w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-charcoal
  focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron
  bg-gray-50 hover:bg-white transition-all placeholder:text-gray-400
- Error state: border-red-400 focus:ring-red-200 + small error text-red-500 text-xs mt-1
- Select (Subject dropdown): same style as input, appearance-none, custom chevron icon
- Textarea: same style, resize-none, rows=5
- Label style: text-sm font-semibold text-charcoal mb-1.5 block
- Grid: grid-cols-1 md:grid-cols-2 gap-4 (Name + Email side by side, Phone full width, etc.)
- Submit button: full width btn-primary + send icon
  Loading state: spinner icon replacing send icon, text "Sending..." opacity-75

AMBULANCE EMERGENCY BANNER (mt-16):
- bg-red-600 rounded-2xl p-6 md:p-8 flex items-centre gap-4 (stack on mobile)
- Left: red siren icon in white circle (animated: slow pulse)
- Text: "Animal Emergency?" DM Serif Display text-2xl text-white
  + "Call our ambulance 24/7" text-white/80
- Right: large phone number in white font-bold text-3xl as a tel: link
  + "Tap to Call" text-white/70 text-sm below
```

---

## UI PROMPT 10 — Admin Panel UI

```
Using the UI context above, build the Admin Panel UI.

ADMIN LOGIN PAGE (src/pages/admin/AdminLogin.jsx):
- Full screen: min-h-screen bg-forest flex items-centre justify-centre
- Subtle diagonal stripe background texture (repeating-linear-gradient, white/5)
- Card: bg-white rounded-3xl shadow-2xl p-10 w-full max-w-sm
  - Logo: centred, h-16
  - Heading: DM Serif Display text-2xl text-forest text-centre mt-4
  - Tagline: "Admin Access Only" text-xs text-muted uppercase tracking-widest text-centre mt-1
  - Divider: thin saffron line mt-6 mb-6
  - Inputs: same style as contact form
  - Submit: full width btn-primary
  - No sign-up link, no forgot password

ADMIN LAYOUT (src/components/admin/AdminLayout.jsx):
- Overall: flex h-screen bg-gray-50 overflow-hidden

SIDEBAR (w-64 bg-forest flex-col hidden md:flex):
  - Top: logo + "Admin Panel" text-white/80 text-xs uppercase tracking-widest
  - Nav items: flex items-centre gap-3 px-4 py-3 rounded-xl mx-2 text-white/70
    text-sm font-medium cursor-pointer
    Active: bg-white/15 text-white
    Hover: bg-white/10 text-white
    Each: Lucide icon (stroke-1.5, size 18) + label
  - Bottom: Logout button — saffron text, hover:text-saffron-light, flex items-centre gap-2

MAIN CONTENT AREA (flex-1 overflow-y-auto):
  - Top bar: bg-white border-b border-gray-100 h-14 flex items-centre px-6
    Left: current page title (text-base font-semibold text-charcoal)
    Right: admin email badge (bg-forest/10 text-forest text-xs rounded-full px-3 py-1)
  - Content: p-6

DASHBOARD STAT CARDS (grid-cols-2 md:grid-cols-4 gap-4):
  Each: bg-white rounded-2xl p-5 shadow-sm border border-gray-100
    - Icon in saffron/10 circle
    - Count: DM Serif Display text-3xl text-charcoal
    - Label: text-xs text-muted uppercase tracking-wide mt-1

UPLOAD FORM STYLE:
  - File drop zone: border-2 border-dashed border-gray-300 hover:border-saffron
    rounded-2xl p-8 text-centre cursor-pointer transition-all
    Active drag: border-saffron bg-saffron/5
    Icon: upload cloud icon (saffron, 36px)
    Text: "Drop files here or click to browse" text-sm text-muted
  - Selected files: list below with filename + size + remove X button
  - Upload progress bar: h-2 bg-gray-100 rounded-full
    Inner: h-full bg-saffron rounded-full transition-all duration-300

ADMIN DATA TABLE:
  - bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden
  - thead: bg-gray-50 text-xs text-muted uppercase tracking-wide
  - tbody rows: hover:bg-saffron/5 transition-colors border-b border-gray-50
  - Action buttons: small rounded-lg — edit: forest/10 text-forest, delete: red-50 text-red-500
```

---

## UI PROMPT 11 — Page Heroes & Shared Sections

```
Using the UI context above, build a reusable PageHero component and all secondary page heroes.

PageHero (src/components/common/PageHero.jsx):
Props: title, subtitle, bgImage (optional), variant ('forest' | 'saffron' | 'image')

VARIANT — 'forest' (default for most pages):
- bg-forest py-20 md:py-28
- DM Serif Display text-4xl md:text-5xl text-white text-centre
- subtitle: text-white/75 text-lg text-centre max-w-2xl mx-auto mt-4
- Decorative: two small paw SVG icons flanking the title on desktop
- Bottom wave: SVG wave path in cream (#FFF8F0) — creates smooth transition into page content

VARIANT — 'saffron' (Donate, Sponsor pages):
- bg-saffron py-20
- text-white heading + text-white/80 subtitle
- Same wave in cream below

VARIANT — 'image' (Home hero — handled separately in HeroSection)
- Not applicable here

BREADCRUMB (below hero, on page body):
- text-sm text-muted flex items-centre gap-1.5 mb-8
- Home → Current Page (react-router Link for Home)
- Separator: chevron-right icon size-4

ABOUT US PAGE additional section — "Our Story" block:
- Two-column layout on desktop: text left (flex-1), decorative right (w-80)
- Left: flowing prose paragraphs, DM Serif Display subheadings text-xl text-forest
- Right: a vertical timeline-style info card with milestone year (July 2024 — Founded),
  5000+ animals treated, etc.
  Timeline line: w-0.5 bg-saffron/30 absolute left-4 top-0 bottom-0
  Timeline dot: 10px circle bg-saffron border-2 border-white absolute left-2.5

INFRASTRUCTURE PAGE — facility cards:
- grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Each card: rounded-2xl overflow-hidden shadow card
  - Image top: aspect-video object-cover
  - Body p-5: icon circle + title DM Serif Display text-xl text-forest + description text-sm text-charcoal/80
  - Green left-border accent inside body: border-l-4 border-forest pl-3

MEDICAL FACILITIES PAGE — treatment tabs:
- Tab bar: horizontally scrollable, pill tabs (same style as gallery)
- Tab content: smooth fade transition (Framer Motion AnimatePresence)
- Treatment tags: flex-wrap gap-2
  Each tag: bg-forest/8 text-forest text-xs font-semibold rounded-full px-3 py-1.5
  Hover: bg-forest text-white transition-all
```

---

## Design QA Checklist
> Run through this before calling any section "done".

```
TYPOGRAPHY
  ☐ DM Serif Display used for all headings (h1–h3)
  ☐ Plus Jakarta Sans for body, labels, buttons
  ☐ No Inter, Roboto, or system-ui as primary fonts

COLOUR
  ☐ No purple gradients
  ☐ All interactive elements use saffron or forest — not blue
  ☐ Body background is cream #FFF8F0, not pure white
  ☐ Sufficient contrast (4.5:1 min for body text)

SPACING
  ☐ Consistent section padding (py-16 md:py-24)
  ☐ Cards use p-6, no cramped content
  ☐ Max content width capped at max-w-7xl

MOTION
  ☐ Framer Motion used for scroll-reveals and page transitions
  ☐ No janky CSS-only transitions on position (use transform only)
  ☐ No autoplay video, no aggressive parallax

MOBILE
  ☐ Tested at 375px — no horizontal scroll
  ☐ Touch targets ≥ 44px
  ☐ Hamburger nav drawer works correctly
  ☐ Masonry gallery stacks to 1 column on mobile

IMAGES
  ☐ All img tags have alt text
  ☐ All images have loading="lazy"
  ☐ No images stretch outside their container

ACCESSIBILITY
  ☐ Focus rings visible (focus:ring-2 focus:ring-saffron/40)
  ☐ Buttons have descriptive labels or aria-label
  ☐ Form inputs have associated <label> tags
  ☐ Colour is not the only indicator of state
```
