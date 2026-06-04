# MAA Veterinary Hospital — Design System

This document serves as the central source of truth for the **Warm Indian Editorial** aesthetic applied across the MAA Veterinary Hospital frontend. It incorporates principles from modern web guidance, frontend UI engineering, and professional UX standards.

---

## 1. Design Vision & Philosophy

**Aesthetic Direction:** *Warm Indian Editorial*

The MAA website is designed to evoke trust, compassion, and professional authority. It moves away from generic corporate aesthetics by avoiding sterile whites and cool blues, opting instead for a warm, earthy palette rooted in Indian culture. The interface balances **editorial typography** (large, high-contrast serif headings) with **clean, modern utility** (highly legible sans-serif data and UI elements).

**Core Principles:**
- **Compassion through Warmth:** Pure white is never used as a page background. We use a soft `Cream` to reduce eye strain and feel more organic.
- **Intentional Contrast:** Deep `Forest` green provides grounding authority, while vibrant `Saffron` draws the eye to critical actions.
- **Memorable Textures:** Diagonal geometric stripes and subtle wave motifs replace generic placeholder patterns.
- **Maximal Polish, Minimal Clutter:** Generous negative space balances information-dense sections like medical services or donor grids.

---

## 2. Color System

We explicitly avoid generic AI defaults (e.g., purple/blue gradients). All colors are semantically mapped.

### Primary Palette
- **Forest Green (`#1C4532`)**: Used for primary typography, navbar, footer, admin sidebar, and structural authority. Represents healing and nature.
  - Variants: `forest-dark` (`#112A1F`), `forest-subtle` (`#E8F0EC`)
- **Saffron (`#F97316`)**: The brand's primary accent. Used for primary buttons, heading underlines, progress bars, and critical UI highlights.
  - Variants: `saffron-dark` (`#EA580C`), `saffron-light` (`#FDBA74`), `saffron-subtle` (`#FFF7ED`)
- **Cream (`#FFF8F0`)**: The default page background. Replaces stark `#FFFFFF` for a softer, organic feel.
- **Charcoal (`#2D3748`)**: Used for high-density body text and UI labels where Forest might be too heavy.

### Functional Colors
- **Emergency Red (`#DC2626`)**: Reserved *strictly* for the 24/7 Ambulance banner and critical form errors.
- **Surface White (`#FFFFFF`)**: Used strictly for elevated cards and input fields resting *on top of* the Cream background.

---

## 3. Typography

The typography system pairs a distinctive display font with a highly readable interface font.

- **Display Font:** `DM Serif Display`
  - *Usage:* All page heroes, section headings (`<h2>`), and large statistical numbers.
  - *Treatment:* Always set in `text-forest` (or white on dark backgrounds).
- **Body Font:** `Plus Jakarta Sans`
  - *Usage:* All body copy, buttons, form labels, navigation, and small UI text.
  - *Treatment:* Used with adequate line-height (`leading-relaxed`) and letter-spacing for legibility.

**Scale System:**
- `text-xs` (12px): Utility labels, priority badges.
- `text-sm` (14px): Buttons, form labels, secondary card text.
- `text-base` (16px): Standard body paragraphs.
- `text-xl` to `text-2xl` (20-24px): Card titles, subheadings.
- `text-4xl` to `text-6xl` (36-60px): Page heroes and section headers.

---

## 4. Component Aesthetics

### Cards & Surfaces
- **Radii:** `rounded-2xl` for large cards (Sponsors, Services, Gallery items). `rounded-xl` for smaller utility components (form inputs, badges).
- **Shadows:** We use a custom, highly diffused shadow `shadow-[0_4px_24px_rgba(0,0,0,0.07)]` to create soft elevation.
- **Hover States:** Interactive cards elevate on hover (`-translate-y-1`) and increase shadow density (`shadow-[0_8px_32px_rgba(0,0,0,0.10)]`).

### Buttons
- **Primary:** `rounded-full bg-saffron text-white shadow-md`.
- **Interactions:** Use `hover:bg-saffron-dark hover:shadow-lg active:scale-[0.98] transition-all duration-200`. Buttons feel tactile and responsive.
- **Icons:** Buttons should include a 16px or 18px Lucide icon (e.g., `ArrowRight`, `Heart`, `Phone`) to reinforce the action.

### Forms
- **Inputs:** Housed in `bg-gray-50` with a subtle border.
- **Focus State:** On focus, inputs shift to `bg-white`, border turns Saffron, and a soft focus ring appears (`focus:ring-4 focus:ring-saffron/20`).

### Dividers & Textures
- **PawDivider:** A custom SVG element used between major page sections, featuring a Saffron line intersecting a circle with a paw print.
- **Stripes:** Admin headers and page heroes utilize a CSS `repeating-linear-gradient` (45deg, 12px spacing, 4% opacity) to add depth without relying on heavy images.

---

## 5. Interaction & Motion

Following `ui-ux-pro-max` guidelines for premium feel:
- **Scroll Reveals:** Sections fade and translate up into view (`fadeUp` and `staggerContainer` via Framer Motion) as the user scrolls. Margin offsets (`margin: '-40px'`) ensure animations trigger at the right viewport depth.
- **Micro-interactions:** 
  - All state changes (hover, focus, active) use a `transition-all duration-200` for 200ms smooth transitions.
  - No instant state changes (0ms).
- **Spatial Continuity:** Navigation highlights slide, and tabs use solid background color transitions.

---

## 6. Layout & Responsiveness

- **Container:** The primary content wrapper is constrained to `max-w-7xl` (1280px) and centered.
- **Padding:** Mobile uses `px-4`, tablets `sm:px-6`, desktop `lg:px-16` for generous edge breathing room.
- **Mobile First:** Stacks use `flex-col` default, switching to `md:flex-row` or `grid-cols-[n]` at larger breakpoints.
- **Touch Targets:** All interactive elements (buttons, links, tab pills, form inputs) maintain a minimum height of `44px` to meet accessibility standards on mobile devices.

---

## 7. Accessibility (A11y) & UX

- **Contrast:** `text-forest` and `text-charcoal` on `bg-cream` or `bg-white` strictly pass the 4.5:1 WCAG AA contrast ratio.
- **Form Feedback:** Forms provide inline validation (e.g., red borders and text for errors) and clear success toasts via `react-hot-toast`.
- **Keyboard Navigation:** Focus rings are preserved and enhanced via Tailwind's `focus:` utilities.
- **Icons:** We exclusively use vector SVG icons (`lucide-react`) rather than emojis, ensuring scalable, color-themeable, and screen-reader safe graphics. Icons always accompany text labels (no icon-only primary actions without `aria-label`).
- **Loading States:** Forms use disabled states and update button text to "Sending..." during async operations to prevent double-submissions.
