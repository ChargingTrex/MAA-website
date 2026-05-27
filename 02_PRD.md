# MAA Saraswati Veterinary Hospital — Product Requirements Document (PRD)

**Version**: 1.0  
**Date**: May 2026  
**Stack**: Vite + React + JS + Tailwind | Node.js + Express + MySQL | VPS cPanel  
**Languages**: English · Telugu · Hindi · Tamil  

---

## 1. Product Vision

A professional, multilingual public website for MAA Saraswati Veterinary Hospital that:
- Builds trust with donors and the public
- Showcases services, team, infrastructure, and impact
- Allows hospital staff to manage all content (photos, videos, team, CSR) via a built-in Admin Panel — no technical knowledge required
- Drives donations through a simple UPI QR code flow

---

## 2. Stakeholders

| Role | Responsibility |
|---|---|
| Hospital Admin | Logs in, updates content, uploads media |
| Public Visitors | Reads content, views gallery, contacts hospital |
| Donors | Views donation options, scans UPI QR |

---

## 3. Global Requirements

### 3.1 Navigation (Navbar)
- **Sticky** top navbar on all pages
- Logo (left) + menu links (right) + Language Switcher (far right)
- Mobile: Hamburger menu (slide-in drawer)
- Active link highlighting
- Smooth scroll behaviour on same-page anchors

**Menu Items:**
Home · About Us · Infrastructure · Medical Facilities · Our Team · Photo Gallery · CSR Activities · Ways to Donate · Sponsor Our Needs · Contact Us

### 3.2 Footer
- Hospital name, address, phone, email
- Quick links (all pages)
- Social media icons (if applicable)
- Copyright line
- "Designed with ❤️ for animals" tagline

### 3.3 Language Switcher
- Dropdown: EN · తె · हि · த
- Persists selection in `localStorage`
- Switching re-renders all visible text instantly (no page reload)

### 3.4 Design System
- **Primary**: Saffron `#F4830F`
- **Secondary**: Forest Green `#2C5F2D`
- **Background**: Cream White `#FFF8F0`
- **Text**: Charcoal `#2D2D2D`
- **Fonts**: Inter (Latin), Mukta (Hindi), Noto Sans Telugu, Noto Sans Tamil
- **Border Radius**: Cards `rounded-2xl`, Buttons `rounded-full`
- Subtle shadow on cards; smooth hover transitions (`transition-all duration-300`)

---

## 4. Page Requirements

---

### PAGE 1 — Home (`/`)

**Purpose**: First impression. Communicate mission, credibility, and call to action.

#### Sections

**4.1.1 Hero Section**
- Full-width banner image (uploaded via admin)
- Heading: "Compassionate Care for Every Animal" (translatable)
- Subheading: Hospital tagline (translatable)
- Two CTA buttons: `[ Donate Now ]` → `/donate` · `[ Learn More ]` → `/about`
- Smooth entrance animation (Framer Motion fade-in)

**4.1.2 Stats Bar**
- 4 animated counters on scroll:
  - 5,000+ Animals Treated
  - 10+ Doctors & Staff
  - 100 km Coverage Radius
  - 0 ₹ Cost to Animal Owners
- Saffron background strip

**4.1.3 Mission & Vision Cards**
- Two cards side-by-side:
  - **Mission**: "Compassionate & Professional" — text from DB
  - **Vision**: "Modern & Advanced Care" — text from DB
- Green icon + saffron accent line

**4.1.4 Services Overview**
- 6 icon cards: Cattle · Dogs · Poultry · Surgery · Ambulance · Lab Tests
- Each card: icon + title + short description (translatable)

**4.1.5 Donate Callout Banner**
- Full-width saffron section
- "Help us provide free care — every rupee counts"
- `[ Donate Now ]` button → `/donate`

**4.1.6 Latest CSR Activities** *(dynamic — from DB)*
- 3 most recent CSR activity cards with photo + title + date
- `[ View All ]` → `/csr-activities`

---

### PAGE 2 — About Us (`/about`)

**Purpose**: Build trust. Tell the hospital's story.

#### Sections

**4.2.1 Page Hero**
- Banner image + "About MAA Saraswati Veterinary Hospital" heading

**4.2.2 Our Story**
- Multi-paragraph text (editable from admin via `page_content` table)
- Inauguration date: July 2024
- Treatments list (digestive, respiratory, skin, urinary, reproductive, poisoning, fever, mineral/vitamin deficiency, orthopaedic)

**4.2.3 Mission & Vision (detailed)**
- Two full-width cards with icon, title, full description text

**4.2.4 Key Highlights**
- Icon + stat grid (same data as home stats bar, with more context)

**4.2.5 Ambulance Service**
- Dedicated section: service area map or illustration
- "Covers twin cities and up to 100 km from Hyderabad"

---

### PAGE 3 — Infrastructure (`/infrastructure`)

**Purpose**: Demonstrate modern facilities.

#### Sections

**4.3.1 Page Hero**
- Banner + "State-of-the-Art Infrastructure"

**4.3.2 Facilities Grid**
- Cards for: Laboratory · Operation Theatre · Wards · Ambulance · ICU / Observation
- Each card: photo (from admin upload) + title + description

**4.3.3 Equipment Gallery**
- Masonry/grid photo gallery of equipment and facility images
- Click-to-enlarge lightbox

---

### PAGE 4 — Medical Facilities (`/medical-facilities`)

**Purpose**: Show range of treatments offered.

#### Sections

**4.4.1 Page Hero**

**4.4.2 Animal Categories Served**
- Horizontal tabs or accordion: Cattle · Dogs · Sheep/Goats · Poultry · Birds · Pigs
- Each tab: treatments offered + conditions handled

**4.4.3 Treatment Categories**
- Icon grid: Digestive · Respiratory · Skin · Urinary · Reproductive · Poisoning · Fever · Mineral/Vitamin Deficiency · Orthopaedic

**4.4.4 Surgery Capabilities**
- Text section + supporting photo

**4.4.5 Laboratory Services**
- Text section + photo

---

### PAGE 5 — Our Team (`/our-team`)

**Purpose**: Humanise the hospital with real faces.

#### Sections

**5.1 Page Hero**

**5.2 Team Grid** *(dynamic — from DB)*
- Photo card per member: headshot + name + designation + qualification
- Cards arranged by `display_order`
- Hover effect: slight scale up, green border

**Admin Manages**: name, designation, qualification, photo, order

---

### PAGE 6 — Photo Gallery (`/gallery`)

**Purpose**: Visual proof of work and care.

#### Sections

**6.1 Filter Tabs**
- All · General · Surgeries · Ambulance · Wards · CSR

**6.2 Photo Masonry Grid** *(dynamic — from DB)*
- Responsive masonry layout
- Click → full-screen lightbox (yet-another-react-lightbox)
- Lazy loading for performance

**6.3 Video Gallery Section**
- Grid of video thumbnails (mp4 stored on VPS)
- Click → modal video player (React Player)

**Admin Manages**: upload photos with category + caption, upload videos with title + thumbnail

---

### PAGE 7 — CSR Activities (`/csr-activities`)

**Purpose**: Show community impact and build donor confidence.

#### Sections

**7.1 Page Hero**

**7.2 Activity Feed** *(dynamic — from DB)*
- Timeline-style cards (most recent first)
- Each card: title + date + description + photo(s)
- Multi-image support per activity (carousel inside card)

**Admin Manages**: title, description, date, multiple images per activity

---

### PAGE 8 — Ways to Donate (`/donate`)

**Purpose**: Convert goodwill into donations. Keep it simple.

#### Sections

**8.1 Page Hero**
- "Support Free Veterinary Care"

**8.2 Why Donate**
- 3–4 impact statements with icons (e.g. "₹500 covers one surgery")

**8.3 UPI Donation Section**
- Large, clear UPI QR code image (uploaded via admin)
- UPI ID displayed below (`maa@upi` — update with real ID)
- Instructions: "Open any UPI app → Scan QR → Enter amount → Pay"
- Supported apps: GPay · PhonePe · Paytm · BHIM (logo row)

**8.4 Bank Transfer Details**
- Account Name, Bank, Branch, Account No., IFSC
- "Copy" button for each field

**8.5 Donation Note**
- "All donations are voluntary. Please screenshot your payment and WhatsApp to [number] for acknowledgement."

---

### PAGE 9 — Sponsor Our Needs (`/sponsor`)

**Purpose**: Allow targeted, in-kind or equipment sponsorship.

#### Sections

**9.1 Page Hero**
- "Sponsor a Need, Save Many Lives"

**9.2 Current Needs Grid** *(can be static initially, admin-editable later)*
- Cards: Equipment name · Estimated cost · Status (Funded / Needed)
- Example items: Ultrasound machine, Surgical kit, Ambulance fuel fund, Medicine stock

**9.3 How to Sponsor**
- Step-by-step: Choose item → Contact us → Transfer funds / Donate in kind

**9.4 Sponsor CTA**
- `[ Contact Us to Sponsor ]` → `/contact`

---

### PAGE 10 — Contact Us (`/contact`)

**Purpose**: Enable enquiries, donations, and volunteer connections.

#### Sections

**10.1 Page Hero**

**10.2 Contact Info Cards**
- Address (full), Phone, Email, WhatsApp link
- Google Maps embed (iframe with hospital location)

**10.3 Contact Form**
- Fields: Name · Email · Phone · Subject (dropdown) · Message
- Subjects: General Enquiry · Donation · Sponsorship · Emergency · Volunteer
- Submit → POST `/api/contact` → Nodemailer sends to hospital email
- Client-side validation (React Hook Form)
- Success/error toast (React Hot Toast)

**10.4 Ambulance Emergency CTA**
- Red banner: "Animal Emergency? Call our ambulance 24/7" + phone number

---

### PAGE 11 — Admin Panel (`/admin/*`)

**Purpose**: Let hospital staff update all website content without any coding.

#### 11.1 Admin Login (`/admin`)
- Email + Password form
- POST `/api/auth/login` → store JWT in `httpOnly` cookie + `AuthContext`
- Redirect to `/admin/dashboard` on success
- Show error toast on failure

#### 11.2 Dashboard (`/admin/dashboard`)
- Summary cards: Total Photos · Videos · Team Members · CSR Activities
- Quick action buttons → each management section
- Logout button

#### 11.3 Manage Gallery (`/admin/gallery`)
- **Photos tab**:
  - Upload form: select file(s), choose category, add caption → POST `/api/gallery/photos`
  - Photo grid with delete button per photo
- **Videos tab**:
  - Upload form: select video file, add title → POST `/api/gallery/videos`
  - Video list with delete button

#### 11.4 Manage Team (`/admin/team`)
- Add Member: name, designation, qualification, photo upload, display order
- Existing members table: edit inline, delete, drag to reorder

#### 11.5 Manage CSR (`/admin/csr`)
- Add Activity: title, date, description, upload multiple images
- Activity list: edit, delete

#### 11.6 Manage Content (`/admin/content`)
- Accordion per page (Home, About, Infrastructure…)
- Each section shows editable text fields for EN · TE · HI · TA
- Save → PUT `/api/content/:page`

---

## 5. Non-Functional Requirements

| Area | Requirement |
|---|---|
| Performance | Lighthouse score ≥ 85. Images lazy-loaded. Videos not autoplayed. |
| SEO | Meta title + description per page. OG tags for social sharing. |
| Accessibility | WCAG AA contrast. Alt text on all images. Keyboard navigable. |
| Responsiveness | Mobile-first. Tested at 375px, 768px, 1280px, 1440px. |
| Security | See Architecture §9 |
| Uptime | PM2 auto-restart. No single point of failure in Node process. |
| Browser Support | Chrome, Firefox, Safari, Edge — last 2 versions. |

---

## 6. Out of Scope (v1)

- Online appointment booking
- Live chat widget
- Multi-admin roles (one admin login is sufficient for v1)
- SMS notifications
- Payment gateway (UPI QR is sufficient for v1)
