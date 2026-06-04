# MAA Saraswati Veterinary Hospital — AI Style Guide

> **How to use this document**
> Paste this entire document (or the relevant sections) into any AI coding session.
> It is the single source of truth for every visual decision on the MAA website.
> Any AI output that contradicts this guide is wrong — correct it by referencing this doc.

---

## 0. Design Identity (Read This First)

| Property | Value |
|---|---|
| **Aesthetic** | Warm Indian Editorial — compassionate, grounded, modern |
| **Mood** | Trustworthy, hopeful, community-rooted, professionally charitable |
| **Audience** | Donors, animal lovers, general public, local community (Hyderabad) |
| **NOT** | Corporate, cold, government-portal, Bootstrap-generic, purple-gradient SaaS |
| **Signature element** | 4px saffron top-border stripe on every page |
| **Memorable detail** | Paw-print dividers, DM Serif Display headings, saffron counter animations |

---

## 1. Colour System

### 1.1 Full Palette

```css
/* index.css — :root */
:root {
  /* Brand — Saffron (Primary) */
  --saffron:          #F4830F;
  --saffron-light:    #FDB96B;
  --saffron-dark:     #C4650A;
  --saffron-subtle:   #FEF3E7;   /* bg tints, hover fills */

  /* Brand — Forest Green (Secondary) */
  --forest:           #2C5F2D;
  --forest-light:     #4A8A4C;
  --forest-dark:      #1A3D1B;
  --forest-subtle:    #EBF4EB;   /* bg tints */

  /* Neutrals */
  --cream:            #FFF8F0;   /* page background */
  --white:            #FFFFFF;   /* card backgrounds */
  --charcoal:         #2D2D2D;   /* primary body text */
  --muted:            #6B7280;   /* secondary text, captions */
  --border:           #E5E7EB;   /* card/input borders */
  --bg-subtle:        #F9FAFB;   /* input backgrounds, table heads */

  /* Semantic */
  --error:            #DC2626;
  --success:          #16A34A;
  --warning:          #D97706;
  --info:             #2563EB;

  /* Emergency (Ambulance banner only) */
  --emergency:        #DC2626;
}
```

### 1.2 Tailwind Config Extension

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        saffron: {
          DEFAULT: '#F4830F',
          light:   '#FDB96B',
          dark:    '#C4650A',
          subtle:  '#FEF3E7',
        },
        forest: {
          DEFAULT: '#2C5F2D',
          light:   '#4A8A4C',
          dark:    '#1A3D1B',
          subtle:  '#EBF4EB',
        },
        cream:    '#FFF8F0',
        charcoal: '#2D2D2D',
        muted:    '#6B7280',
      },
    },
  },
}
```

### 1.3 Colour Usage Rules

| Context | Colour | Tailwind class |
|---|---|---|
| Page background | Cream | `bg-cream` |
| Card / surface background | White | `bg-white` |
| Primary CTA button | Saffron | `bg-saffron` |
| CTA button hover | Saffron Dark | `hover:bg-saffron-dark` |
| Secondary button | Forest border + text | `border-forest text-forest` |
| Section headings | Forest | `text-forest` |
| Body text | Charcoal | `text-charcoal` |
| Captions, labels, metadata | Muted | `text-muted` |
| Footer background | Forest | `bg-forest` |
| Stats bar background | Saffron | `bg-saffron` |
| Admin sidebar | Forest | `bg-forest` |
| Icon background circles | Saffron/10 or Forest/10 | `bg-saffron/10` |
| Input focus ring | Saffron/40 | `focus:ring-saffron/40` |
| Divider lines | Saffron/30 | `border-saffron/30` |
| Card hover border accent | Full saffron | `border-saffron` |
| Emergency / ambulance | Red | `bg-red-600` |
| Success state | Green | `text-green-600` |
| Error state | Red | `text-red-500` |

### 1.4 Colour DON'Ts

```
❌ Never use blue as a primary or interactive colour
❌ Never use purple or purple gradients anywhere
❌ Never use pure white (#FFFFFF) as page background — always cream
❌ Never use grey as the only indicator of interactivity
❌ Never use red except for errors and the emergency ambulance banner
❌ Never use more than 2 brand colours in one component
```

---

## 2. Typography

### 2.1 Font Stack

```html
<!-- index.html — load from Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?
  family=DM+Serif+Display:ital@0;1
  &family=Plus+Jakarta+Sans:wght@400;500;600;700
  &family=Mukta:wght@400;600
  &family=Noto+Sans+Telugu:wght@400;600
  &family=Noto+Sans+Tamil:wght@400;600
  &display=swap" rel="stylesheet">
```

```js
// tailwind.config.js — fontFamily extend
fontFamily: {
  display: ['"DM Serif Display"', 'Georgia', 'serif'],
  body:    ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
  hindi:   ['Mukta', 'sans-serif'],
  telugu:  ['"Noto Sans Telugu"', 'sans-serif'],
  tamil:   ['"Noto Sans Tamil"', 'sans-serif'],
},
```

### 2.2 Type Scale

| Role | Element | Tailwind Classes |
|---|---|---|
| Hero heading | h1 | `font-display text-5xl md:text-7xl text-white leading-tight` |
| Page heading | h1 | `font-display text-4xl md:text-5xl text-forest leading-tight` |
| Section heading | h2 | `font-display text-3xl md:text-4xl text-forest leading-snug` |
| Card heading | h3 | `font-display text-xl md:text-2xl text-forest` |
| Sub-heading / label | h4 | `font-body text-sm font-semibold text-muted uppercase tracking-widest` |
| Body large | p | `font-body text-lg text-charcoal leading-relaxed` |
| Body default | p | `font-body text-base text-charcoal leading-relaxed` |
| Body small | p | `font-body text-sm text-charcoal` |
| Caption / metadata | span | `font-body text-xs text-muted` |
| Button label | span | `font-body text-sm font-semibold` |
| Pill / badge | span | `font-body text-xs font-semibold uppercase tracking-wide` |

### 2.3 Typography Rules

```
✅ DM Serif Display for all headings h1–h3
✅ Plus Jakarta Sans for all body text, labels, buttons, inputs
✅ font-normal (400) for DM Serif Display headings — the serif handles visual weight
✅ font-semibold (600) for action labels, nav items, card subheadings
✅ Line height: leading-tight for headings, leading-relaxed for body
✅ Max width on body paragraphs: max-w-prose or max-w-2xl for readability

❌ Never use Inter, Roboto, or Arial as a display font
❌ Never use font-bold on DM Serif Display — looks overbuilt
❌ Never use all-caps on headings — only on small labels/badges
❌ Never set body text smaller than text-sm (14px)
❌ Never use more than 3 font weights per page
```

### 2.4 Multilingual Typography

When the user switches to a non-Latin language, apply the correct font family to the `<html>` tag:

```js
// src/i18n/index.js — language change handler
i18n.on('languageChanged', (lng) => {
  const fontMap = {
    te: 'font-telugu',
    hi: 'font-hindi',
    ta: 'font-tamil',
    en: 'font-body',
  }
  document.documentElement.className = fontMap[lng] || 'font-body'
})
```

---

## 3. Spacing System

Use Tailwind's default spacing scale. The following values are standardised across the site:

| Context | Value | Tailwind |
|---|---|---|
| Page background padding (horiz.) | 16px / 24px / 64px | `px-4 sm:px-6 lg:px-16` |
| Max content width | 1280px | `max-w-7xl mx-auto` |
| Section vertical padding | 64px / 96px | `py-16 md:py-24` |
| Card inner padding | 24px | `p-6` |
| Card inner padding (large) | 32px / 48px | `p-8 md:p-12` |
| Component gap (grid) | 20px / 24px | `gap-5 md:gap-6` |
| Stack gap (flex column) | 16px | `gap-4` |
| Inline gap (flex row) | 12px | `gap-3` |
| Form field gap | 16px | `gap-4` |
| Icon ↔ label gap | 8px | `gap-2` |
| Section heading ↓ content | 48px | `mt-12` |
| Subheading ↓ heading | 12px | `mt-3` |

---

## 4. Component Library

Every component below is the **canonical implementation**. Do not deviate unless explicitly required.

---

### 4.1 Buttons

#### Primary Button
```jsx
// Use for: main CTAs (Donate Now, Submit, Upload)
<button className="
  inline-flex items-center gap-2
  bg-saffron text-white
  rounded-full px-6 py-3
  text-sm font-semibold font-body
  shadow-md hover:shadow-lg
  hover:bg-saffron-dark
  active:scale-[0.98]
  transition-all duration-200
  disabled:opacity-60 disabled:cursor-not-allowed
">
  <Icon size={18} strokeWidth={1.5} />
  Button Label
</button>
```

#### Secondary / Outline Button
```jsx
// Use for: secondary actions (Learn More, View All, Cancel)
<button className="
  inline-flex items-center gap-2
  border-2 border-forest text-forest
  rounded-full px-6 py-3
  text-sm font-semibold font-body
  hover:bg-forest hover:text-white
  active:scale-[0.98]
  transition-all duration-200
">
  Button Label
</button>
```

#### Ghost Button (Admin / subtle actions)
```jsx
<button className="
  inline-flex items-center gap-2
  text-saffron text-sm font-semibold
  hover:text-saffron-dark underline-offset-2
  hover:underline transition-all duration-150
">
  Action Label →
</button>
```

#### Danger Button (Delete)
```jsx
<button className="
  inline-flex items-center gap-2
  bg-red-50 text-red-500
  rounded-lg px-3 py-2
  text-sm font-medium
  hover:bg-red-100
  transition-all duration-150
">
  <Trash2 size={16} strokeWidth={1.5} />
  Delete
</button>
```

#### Loading State (applies to any button)
```jsx
// Replace icon with spinner, change label, disable
<button disabled className="... opacity-75 cursor-not-allowed">
  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
  </svg>
  Sending...
</button>
```

---

### 4.2 Cards

#### Standard Card
```jsx
<div className="
  bg-white rounded-2xl
  shadow-[0_4px_24px_rgba(0,0,0,0.07)]
  p-6
  hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)]
  transition-all duration-200
">
  {/* content */}
</div>
```

#### Card with Top Accent (Mission/Vision)
```jsx
<div className="
  bg-white rounded-2xl
  shadow-[0_4px_24px_rgba(0,0,0,0.07)]
  p-6 border-t-4 border-saffron
">
```

#### Card with Left Accent (Infrastructure, Bank details)
```jsx
<div className="
  bg-white rounded-2xl
  shadow-[0_4px_24px_rgba(0,0,0,0.07)]
  p-6 border-l-4 border-forest
">
```

#### Image Card (CSR, Gallery thumbnails)
```jsx
<div className="
  bg-white rounded-2xl overflow-hidden
  shadow-[0_4px_24px_rgba(0,0,0,0.07)]
  hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]
  transition-all duration-200 cursor-pointer
">
  <img src={url} alt={alt}
    className="w-full aspect-video object-cover"
    loading="lazy"
  />
  <div className="p-5">
    {/* card body */}
  </div>
</div>
```

#### Stat Card (Dashboard)
```jsx
<div className="
  bg-white rounded-2xl p-5
  border border-gray-100
  shadow-sm
">
  <div className="w-10 h-10 rounded-xl bg-saffron/10 flex items-center justify-center mb-3">
    <Icon size={20} strokeWidth={1.5} className="text-saffron" />
  </div>
  <p className="font-display text-3xl text-charcoal">{count}</p>
  <p className="text-xs text-muted uppercase tracking-wide mt-1">{label}</p>
</div>
```

---

### 4.3 Form Inputs

#### Text Input (standard)
```jsx
<div className="flex flex-col gap-1.5">
  <label className="text-sm font-semibold text-charcoal font-body">
    {label} {required && <span className="text-red-500">*</span>}
  </label>
  <input
    type="text"
    placeholder={placeholder}
    className="
      w-full border border-border rounded-xl
      px-4 py-3 text-sm text-charcoal font-body
      bg-bg-subtle hover:bg-white
      focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron
      placeholder:text-muted
      transition-all duration-150
    "
  />
  {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
</div>
```

#### Select / Dropdown
```jsx
<select className="
  w-full border border-border rounded-xl
  px-4 py-3 text-sm text-charcoal font-body
  bg-bg-subtle hover:bg-white
  focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron
  appearance-none cursor-pointer
  transition-all duration-150
">
```
Wrap in `relative` div and add a custom `<ChevronDown>` icon `absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted`.

#### Textarea
```jsx
<textarea
  rows={5}
  className="
    w-full border border-border rounded-xl
    px-4 py-3 text-sm text-charcoal font-body
    bg-bg-subtle hover:bg-white resize-none
    focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron
    placeholder:text-muted transition-all duration-150
  "
/>
```

#### Error Input State
```
Add to className: border-red-400 focus:ring-red-200 focus:border-red-400 bg-red-50/30
```

#### File Drop Zone
```jsx
<div className="
  border-2 border-dashed border-border rounded-2xl
  p-8 text-center cursor-pointer
  hover:border-saffron hover:bg-saffron-subtle
  transition-all duration-200
  [&.drag-active]:border-saffron [&.drag-active]:bg-saffron-subtle
">
  <UploadCloud size={36} strokeWidth={1.5} className="text-saffron mx-auto mb-3" />
  <p className="text-sm font-semibold text-charcoal">Drop files here</p>
  <p className="text-xs text-muted mt-1">or click to browse</p>
</div>
```

---

### 4.4 Badges & Pills

#### Category Badge
```jsx
<span className="
  inline-flex items-center
  bg-saffron-subtle text-saffron
  text-xs font-semibold uppercase tracking-wide
  rounded-full px-3 py-1
">
  {label}
</span>
```

#### Status Badge — Funded
```jsx
<span className="bg-green-50 text-green-600 text-xs font-semibold rounded-full px-3 py-1">
  ✓ Funded
</span>
```

#### Status Badge — Needed
```jsx
<span className="bg-saffron-subtle text-saffron text-xs font-semibold rounded-full px-3 py-1">
  ⚡ Needed
</span>
```

#### Language Switcher Pill
```jsx
<button className="
  bg-forest/10 text-forest
  text-xs font-semibold rounded-full
  px-3 py-1.5
  hover:bg-forest hover:text-white
  transition-all duration-150
">
  🇮🇳 EN
</button>
```

---

### 4.5 Icon System

**Library**: `lucide-react`  
**Default props**: `size={20}` `strokeWidth={1.5}`  
**Never** use filled icons — always outline (lucide default is outline).

#### Icon in Circle (standard usage)
```jsx
// Saffron circle — use for features/services
<div className="w-10 h-10 rounded-xl bg-saffron/10 flex items-center justify-center">
  <PawPrint size={20} strokeWidth={1.5} className="text-saffron" />
</div>

// Forest circle — use for contact/info
<div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center">
  <MapPin size={20} strokeWidth={1.5} className="text-forest" />
</div>

// White circle — use on coloured backgrounds
<div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
  <Phone size={20} strokeWidth={1.5} className="text-white" />
</div>
```

#### Icon Size Reference
| Context | Size |
|---|---|
| Inline with text | 16px |
| Button icon | 18px |
| Card icon | 20px |
| Feature section icon | 24px |
| Hero / large decorative | 32–48px |
| Upload zone | 36px |

---

### 4.6 Section Headings (canonical pattern)

```jsx
// Standard section header — use before every major section
<div className="text-center mb-12">

  {/* Optional eyebrow label */}
  <span className="text-xs font-semibold text-saffron uppercase tracking-widest font-body">
    Our Impact
  </span>

  {/* Main heading */}
  <h2 className="font-display text-3xl md:text-4xl text-forest mt-2 leading-snug">
    {t('section.heading')}
  </h2>

  {/* Optional subtext */}
  <p className="text-base text-muted max-w-2xl mx-auto mt-3 font-body leading-relaxed">
    {t('section.subtext')}
  </p>

  {/* Saffron accent underline */}
  <div className="w-12 h-1 bg-saffron rounded-full mx-auto mt-4" />

</div>
```

---

### 4.7 Page Hero (reusable)

```jsx
// Two variants: forest (default) and saffron
// Props: title, subtitle, variant = 'forest' | 'saffron'
<section className={`
  ${variant === 'saffron' ? 'bg-saffron' : 'bg-forest'}
  py-20 md:py-28 relative overflow-hidden
`}>

  {/* Diagonal stripe texture overlay */}
  <div className="absolute inset-0 opacity-[0.04]"
    style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '12px 12px' }}
  />

  <div className="section-wrapper relative text-center">
    <h1 className="font-display text-4xl md:text-5xl text-white leading-tight">
      {title}
    </h1>
    {subtitle && (
      <p className="text-white/75 text-lg mt-4 max-w-2xl mx-auto font-body">
        {subtitle}
      </p>
    )}
  </div>

  {/* Bottom wave transition to cream */}
  <div className="absolute bottom-0 left-0 right-0">
    <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 48h1440V24C1200 0 960 48 720 24S240 0 0 24v24z" fill="#FFF8F0"/>
    </svg>
  </div>
</section>
```

---

### 4.8 Loading States

#### Skeleton Card (team / gallery / CSR)
```jsx
<div className="animate-pulse">
  <div className="bg-gray-200 rounded-2xl aspect-video w-full" />
  <div className="mt-4 space-y-2">
    <div className="h-4 bg-gray-200 rounded w-3/4" />
    <div className="h-3 bg-gray-200 rounded w-1/2" />
  </div>
</div>
```

#### Spinner (inline / button)
```jsx
<svg className="animate-spin h-5 w-5 text-current" viewBox="0 0 24 24" fill="none">
  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
  <path className="opacity-75" fill="currentColor"
    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
</svg>
```

#### Empty State
```jsx
<div className="text-center py-20">
  <div className="w-16 h-16 rounded-2xl bg-saffron/10 flex items-center justify-center mx-auto">
    <ImageOff size={28} strokeWidth={1.5} className="text-saffron" />
  </div>
  <p className="text-base font-semibold text-charcoal mt-4">{t('common.empty.title')}</p>
  <p className="text-sm text-muted mt-1">{t('common.empty.subtitle')}</p>
</div>
```

---

### 4.9 Toast Notifications

Uses `react-hot-toast`. Configure once in `App.jsx`:

```jsx
<Toaster
  position="top-right"
  toastOptions={{
    duration: 4000,
    style: {
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      fontSize: '14px',
      borderRadius: '12px',
      padding: '12px 16px',
    },
    success: {
      iconTheme: { primary: '#2C5F2D', secondary: '#fff' },
      style: { border: '1px solid #EBF4EB' },
    },
    error: {
      iconTheme: { primary: '#DC2626', secondary: '#fff' },
      style: { border: '1px solid #FEE2E2' },
    },
  }}
/>
```

Usage:
```js
toast.success(t('contact.form.success'))
toast.error(t('contact.form.error'))
```

---

## 5. Motion & Animation

### 5.1 Philosophy
- **One big entrance** > many scattered micro-animations
- Scroll-triggered stagger on card grids
- Page-level fade on route transition
- No autoplay video, no parallax, no heavy particle effects

### 5.2 Standard Framer Motion Variants

```js
// src/utils/motionVariants.js

// Fade + slide up (most common — cards, headings)
export const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// Stagger container — wraps grid children
export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
}

// Fade in (no movement — overlays, modals)
export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
}

// Scale in (modals, lightbox)
export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: 'easeOut' } },
}

// Slide in from right (mobile nav drawer)
export const slideInRight = {
  hidden:  { x: '100%' },
  visible: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  exit:    { x: '100%', transition: { duration: 0.2 } },
}
```

### 5.3 Standard Usage Patterns

```jsx
// Scroll-triggered stagger grid
import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '../utils/motionVariants'

<motion.div
  className="grid grid-cols-1 md:grid-cols-3 gap-6"
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-80px' }}
>
  {items.map(item => (
    <motion.div key={item.id} variants={fadeUp}>
      <Card data={item} />
    </motion.div>
  ))}
</motion.div>

// Page-level route transition (wrap page content)
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: 'easeOut' }}
>
  {/* page content */}
</motion.div>
```

### 5.4 CSS-only Transitions (Tailwind)

```
Hover lift card:       hover:-translate-y-1 hover:shadow-lg transition-all duration-200
Hover scale card:      hover:scale-[1.02] transition-transform duration-200
Button press:          active:scale-[0.97] transition-transform duration-100
Nav link underline:    after:scale-x-0 hover:after:scale-x-100 after:transition-transform
Fade overlay:          opacity-0 group-hover:opacity-100 transition-opacity duration-300
Input focus ring:      focus:ring-2 focus:ring-saffron/40 transition-shadow duration-150
```

---

## 6. Layout Patterns

### 6.1 Standard Section Wrapper
```jsx
<section className="py-16 md:py-24">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
    {/* content */}
  </div>
</section>
```

### 6.2 Responsive Grid System
```
1 col (mobile first, always start here)         grid-cols-1
2 col (tablet)                                  sm:grid-cols-2
3 col (desktop)                                 lg:grid-cols-3
4 col (wide desktop)                            xl:grid-cols-4
6 col (services bar — collapses to 2+3)         grid-cols-2 sm:grid-cols-3 lg:grid-cols-6
```

### 6.3 Two-Column Content Layout (text + visual)
```jsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
  <div>{/* text content */}</div>
  <div>{/* image / visual */}</div>
</div>
// On mobile: always stack, text first
```

### 6.4 Photo Masonry (CSS columns — no JS library)
```jsx
<div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
  {photos.map(photo => (
    <div key={photo.id} className="break-inside-avoid mb-4">
      <img src={photo.url} alt={photo.caption}
        className="w-full rounded-2xl object-cover"
        loading="lazy"
      />
    </div>
  ))}
</div>
```

---

## 7. Decorative Elements

### 7.1 Saffron Top-Border Stripe (global)
```jsx
// In root layout — appears at very top of every page
<div className="h-1 w-full bg-saffron fixed top-0 left-0 z-50" />
```

### 7.2 Paw Divider SVG
```jsx
// src/components/common/PawDivider.jsx
export default function PawDivider() {
  return (
    <div className="relative flex items-center my-12">
      <div className="flex-1 border-t-2 border-saffron/20" />
      <div className="mx-4 w-8 h-8 rounded-full bg-cream flex items-center justify-center">
        <svg viewBox="0 0 24 24" fill="#F4830F" className="w-5 h-5">
          {/* paw print path */}
          <path d="M12 13.5C10.34 13.5 9 15.07 9 17c0 1.93 1.34 3.5 3 3.5s3-1.57 3-3.5c0-1.93-1.34-3.5-3-3.5z"/>
          <circle cx="7.5" cy="10.5" r="1.5"/><circle cx="16.5" cy="10.5" r="1.5"/>
          <circle cx="10" cy="7.5" r="1.5"/><circle cx="14" cy="7.5" r="1.5"/>
        </svg>
      </div>
      <div className="flex-1 border-t-2 border-saffron/20" />
    </div>
  )
}
```

### 7.3 Section Bottom Wave (page hero → content)
```jsx
// Inline SVG at bottom of Hero sections
<svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 48" preserveAspectRatio="none">
  <path d="M0,48 L1440,48 L1440,24 C1200,0 960,48 720,24 C480,0 240,48 0,24 Z" fill="#FFF8F0"/>
</svg>
```

### 7.4 Paw-Print Background Texture (Stats bar)
```jsx
// Overlay on saffron bg — use sparingly
<div
  className="absolute inset-0 pointer-events-none opacity-[0.06]"
  style={{
    backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><text y='28' font-size='24'>🐾</text></svg>")`,
    backgroundRepeat: 'repeat',
  }}
/>
```

### 7.5 Diagonal Stripe Texture (Admin sidebar, Heroes)
```jsx
<div
  className="absolute inset-0 pointer-events-none opacity-[0.04]"
  style={{
    backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',
    backgroundSize: '12px 12px',
  }}
/>
```

---

## 8. Accessibility Rules

```
☐ All interactive elements reachable by keyboard (Tab order, no tabIndex traps)
☐ Focus ring always visible: focus:ring-2 focus:ring-saffron/40 focus:outline-none
☐ All <img> tags have descriptive alt="" — never empty alt on meaningful images
☐ Touch targets minimum 44×44px (use min-h-[44px] min-w-[44px] where needed)
☐ Colour contrast: body text ≥ 4.5:1, large text ≥ 3:1 against background
☐ Saffron (#F4830F) on white fails contrast — never use as body text colour
☐ All form inputs have associated <label> (htmlFor matching input id)
☐ Error messages are text (not only red colour)
☐ Icons decorative: aria-hidden="true" · Icons meaningful: aria-label="..."
☐ Modal/drawer: trap focus inside, close on Escape, restore focus on close
☐ Language attribute: <html lang="en"> (update dynamically on language switch)
```

---

## 9. Image Handling Rules

```jsx
// Next.js — always use next/image, never <img>
import Image from 'next/image'

// ✅ Fixed dimensions
<Image
  src={imageUrl}
  alt="Descriptive text about what the image shows"
  width={800}
  height={600}
  className="rounded-2xl object-cover"
/>

// ✅ Responsive fill (inside relative container)
<div className="relative aspect-video w-full rounded-2xl overflow-hidden">
  <Image src={url} alt={alt} fill className="object-cover" />
</div>

// ✅ Hero full-viewport background
<div className="relative min-h-screen">
  <Image src={heroImg} alt="Hero" fill className="object-cover" priority />
  <div className="absolute inset-0 bg-gradient-to-br from-forest/82 to-saffron/55" />
  {/* content goes here */}
</div>

// ❌ Never
<img src={url} />                    // use next/image always
<img src={url} alt="" loading="lazy" // still wrong — must be next/image
```

**Aspect ratios to use consistently:**
| Context | Aspect ratio | Tailwind |
|---|---|---|
| Hero background | 16:9 or full viewport | `min-h-screen` |
| CSR / blog cards | 16:9 | `aspect-video` |
| Team headshots | 1:1 | `aspect-square` |
| Gallery masonry | natural (no forcing) | none |
| Infrastructure facility | 4:3 | `aspect-[4/3]` |
| Video thumbnails | 16:9 | `aspect-video` |

---

## 10. Do / Don't Cheat Sheet

| ✅ DO | ❌ DON'T |
|---|---|
| Use `font-display` (DM Serif) for all headings | Use Inter/Roboto/system-ui for headings |
| Use cream `#FFF8F0` as page background | Use pure white `#FFFFFF` as page bg |
| Use saffron for CTAs and highlights only | Use saffron for body text (fails contrast) |
| Use forest green for headings and footers | Use forest green for CTAs |
| Use `rounded-2xl` on cards, `rounded-full` on buttons | Mix border-radius styles inconsistently |
| Add `transition-all duration-200` to interactive elements | Animate without transitions |
| Use `max-w-7xl mx-auto` to constrain content width | Let content stretch full viewport width |
| Use `loading="lazy"` on all below-fold images | Load all images eagerly |
| Write all user-facing strings with `t()` hook | Hardcode text in English |
| Use Lucide icons at `strokeWidth={1.5}` | Use filled icons or mixed icon libraries |
| Show loading skeletons while fetching | Show blank space or spinners alone |
| Use `object-cover` for all images in containers | Use `object-fill` (distorts images) |
| Use `next/image` for every image | Use `<img>` tags |
| Use `next/link` for internal navigation | Use `<a href>` for internal links |
| Add `'use client'` to animated/interactive components | Use Framer Motion in Server Components |
| Use `line-clamp-2` for card descriptions | Let text overflow cards |
| Keep saffron stripe at very top of every page | Remove the stripe on any page |
| Use PawDivider between major sections | Use generic `<hr>` |
| Stagger cards with Framer Motion on scroll | Animate every single element independently |

---

## 11. Admin Panel Specific Rules

```
- Admin pages use bg-gray-50 as background (not cream — this signals "backend")
- Admin sidebar always bg-forest — never saffron, never white
- Admin heading font: Plus Jakarta Sans font-semibold (not DM Serif Display)
- Admin table rows: hover:bg-saffron/5 — subtle saffron tint on row hover
- File upload dropzone: always dashed border, transitions to saffron on hover/drag
- Progress bars: saffron fill on gray-100 track, rounded-full, h-2
- Admin cards (stat cards): border border-gray-100, no strong shadow
- Delete actions: always require a confirmation step (window.confirm or modal)
- Never show the admin nav on public-facing pages
```

---

## 12. i18n Rules

```jsx
// ✅ Every visible string must go through t()
const { t } = useTranslation()
<h1>{t('home.hero.heading')}</h1>
<button>{t('common.btn.donateNow')}</button>

// ✅ Pluralisation — use i18next plural forms
t('gallery.photoCount', { count: photos.length })
// en.json: "photoCount": "{{count}} photo" / "photoCount_other": "{{count}} photos"

// ✅ Date formatting — use locale-aware formatting
new Date(date).toLocaleDateString(i18n.language, { year: 'numeric', month: 'long', day: 'numeric' })

// ❌ Never hardcode English text in JSX
<h1>Compassionate Care</h1>   // wrong
<p>Contact Us</p>             // wrong

// ❌ Never concatenate translated strings
t('hello') + ' ' + name    // breaks in RTL/morphological languages
// use: t('hello', { name })  with "hello": "Hello, {{name}}"
```
