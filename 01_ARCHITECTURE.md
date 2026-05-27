# MAA Saraswati Veterinary Hospital — System Architecture

---

## 1. Overview

A multilingual (EN / TE / HI / TA), media-rich public website backed by a **custom built-in Admin Panel** for content management. No third-party CMS. All media stored on the VPS. Deployed on cPanel VPS with Node.js + Nginx.

---

## 2. High-Level Architecture Diagram

```
┌──────────────────────────────────────────────────────────┐
│                     BROWSER / CLIENT                     │
│                                                          │
│   ┌─────────────────────┐   ┌──────────────────────┐    │
│   │  Public Website     │   │  Admin Panel          │    │
│   │  Vite + React + JS  │   │  (Protected Route)    │    │
│   │  Tailwind CSS       │   │  JWT Auth             │    │
│   │  react-i18next      │   │  CRUD + File Upload   │    │
│   └────────┬────────────┘   └──────────┬───────────┘    │
└────────────┼──────────────────────────┼────────────────-┘
             │  HTTPS (Axios)           │  HTTPS (Axios)
             ▼                          ▼
┌──────────────────────────────────────────────────────────┐
│              VPS — Nginx Reverse Proxy (Port 80/443)      │
│                                                          │
│   ┌──────────────────────────────────────────────────┐   │
│   │         Node.js + Express API  (Port 5000)       │   │
│   │                                                  │   │
│   │  Routes:  /api/team  /api/gallery  /api/csract   │   │
│   │           /api/infra  /api/medical  /api/contact  │   │
│   │           /api/admin  /api/upload                │   │
│   │                                                  │   │
│   │  Middleware: JWT Auth · Multer (uploads) ·       │   │
│   │             Nodemailer · CORS · Helmet           │   │
│   └──────────────┬───────────────────────────────────┘   │
│                  │                                        │
│     ┌────────────┴──────────┐  ┌────────────────────┐    │
│     │   MySQL Database      │  │  /uploads  folder  │    │
│     │   (cPanel MySQL)      │  │  /images           │    │
│     │                       │  │  /videos           │    │
│     │   Tables: see §5      │  │  /documents        │    │
│     └───────────────────────┘  └────────────────────┘    │
└──────────────────────────────────────────────────────────┘
```

---

## 3. Frontend Architecture

### 3.1 Tech Stack

| Layer | Choice | Version |
|---|---|---|
| Build Tool | Vite | 5.x |
| Framework | React | 18.x |
| Language | JavaScript (ES2022+) | — |
| Styling | Tailwind CSS | 3.x |
| Routing | React Router DOM | 6.x |
| i18n | react-i18next + i18next | 23.x |
| HTTP Client | Axios | 1.x |
| Icons | Lucide React | latest |
| Image Lightbox | yet-another-react-lightbox | latest |
| Video Player | React Player | latest |
| Forms | React Hook Form | 7.x |
| Notifications | React Hot Toast | latest |
| Animation | Framer Motion | 11.x |

### 3.2 Project Folder Structure

```
maa-website/
├── public/
│   ├── favicon.ico
│   └── og-image.jpg
├── src/
│   ├── assets/
│   │   └── logo.svg
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── LanguageSwitcher.jsx
│   │   │   ├── ScrollToTop.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── home/
│   │   │   ├── HeroSection.jsx
│   │   │   ├── StatsBar.jsx
│   │   │   ├── MissionCard.jsx
│   │   │   └── DonateCallout.jsx
│   │   ├── gallery/
│   │   │   ├── PhotoGrid.jsx
│   │   │   └── VideoGrid.jsx
│   │   └── admin/
│   │       ├── AdminSidebar.jsx
│   │       ├── UploadForm.jsx
│   │       └── DataTable.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── AboutUs.jsx
│   │   ├── Infrastructure.jsx
│   │   ├── MedicalFacilities.jsx
│   │   ├── OurTeam.jsx
│   │   ├── PhotoGallery.jsx
│   │   ├── CSRActivities.jsx
│   │   ├── WaysToDonate.jsx
│   │   ├── SponsorNeeds.jsx
│   │   ├── ContactUs.jsx
│   │   └── admin/
│   │       ├── AdminLogin.jsx
│   │       ├── AdminDashboard.jsx
│   │       ├── ManageGallery.jsx
│   │       ├── ManageTeam.jsx
│   │       ├── ManageCSR.jsx
│   │       └── ManageContent.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useFetch.js
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── services/
│   │   └── api.js          ← Axios instance + all API calls
│   ├── i18n/
│   │   ├── index.js
│   │   └── locales/
│   │       ├── en.json
│   │       ├── te.json
│   │       ├── hi.json
│   │       └── ta.json
│   ├── utils/
│   │   └── helpers.js
│   ├── App.jsx
│   └── main.jsx
├── .env
├── tailwind.config.js
├── vite.config.js
└── package.json
```

### 3.3 Routing Map

| Path | Component | Protected |
|---|---|---|
| `/` | Home | No |
| `/about` | AboutUs | No |
| `/infrastructure` | Infrastructure | No |
| `/medical-facilities` | MedicalFacilities | No |
| `/our-team` | OurTeam | No |
| `/gallery` | PhotoGallery | No |
| `/csr-activities` | CSRActivities | No |
| `/donate` | WaysToDonate | No |
| `/sponsor` | SponsorNeeds | No |
| `/contact` | ContactUs | No |
| `/admin` | AdminLogin | No |
| `/admin/dashboard` | AdminDashboard | **Yes (JWT)** |
| `/admin/gallery` | ManageGallery | **Yes (JWT)** |
| `/admin/team` | ManageTeam | **Yes (JWT)** |
| `/admin/csr` | ManageCSR | **Yes (JWT)** |
| `/admin/content` | ManageContent | **Yes (JWT)** |

### 3.4 Design System (Tailwind Theme)

```js
// tailwind.config.js — extend colours
colors: {
  saffron:  { DEFAULT: '#F4830F', light: '#FDB96B', dark: '#C4650A' },
  forest:   { DEFAULT: '#2C5F2D', light: '#4A8A4C', dark: '#1A3D1B' },
  cream:    { DEFAULT: '#FFF8F0' },
  charcoal: { DEFAULT: '#2D2D2D' },
}
// Font: Inter (body) + Mukta (Indian-script support for TE/HI/TA)
```

---

## 4. Backend Architecture

### 4.1 Tech Stack

| Layer | Choice |
|---|---|
| Runtime | Node.js 20 LTS |
| Framework | Express 4.x |
| ORM | Sequelize 6.x (MySQL dialect) |
| Auth | jsonwebtoken + bcryptjs |
| File Upload | Multer (disk storage) |
| Email | Nodemailer (SMTP) |
| Validation | express-validator |
| Security | Helmet, CORS, express-rate-limit |
| Process Manager | PM2 |

### 4.2 Backend Folder Structure

```
maa-backend/
├── config/
│   ├── db.js          ← Sequelize connection
│   └── multer.js      ← Multer disk storage config
├── controllers/
│   ├── authController.js
│   ├── galleryController.js
│   ├── teamController.js
│   ├── csrController.js
│   ├── contentController.js
│   └── contactController.js
├── middleware/
│   ├── authMiddleware.js   ← JWT verification
│   └── errorHandler.js
├── models/
│   ├── Admin.js
│   ├── GalleryPhoto.js
│   ├── GalleryVideo.js
│   ├── TeamMember.js
│   ├── CSRActivity.js
│   └── PageContent.js
├── routes/
│   ├── auth.js
│   ├── gallery.js
│   ├── team.js
│   ├── csr.js
│   ├── content.js
│   └── contact.js
├── uploads/             ← Served as static files via Express
│   ├── images/
│   ├── videos/
│   └── thumbnails/
├── .env
├── server.js
└── package.json
```

### 4.3 REST API Endpoints

#### Auth
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/login` | Admin login → returns JWT | No |
| POST | `/api/auth/logout` | Invalidate token | Yes |

#### Gallery
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/gallery/photos` | List all photos | No |
| GET | `/api/gallery/videos` | List all videos | No |
| POST | `/api/gallery/photos` | Upload photo | Yes |
| POST | `/api/gallery/videos` | Upload video | Yes |
| DELETE | `/api/gallery/photos/:id` | Delete photo | Yes |
| DELETE | `/api/gallery/videos/:id` | Delete video | Yes |

#### Team
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/team` | List all team members | No |
| POST | `/api/team` | Add team member + photo | Yes |
| PUT | `/api/team/:id` | Update member | Yes |
| DELETE | `/api/team/:id` | Remove member | Yes |

#### CSR Activities
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/csr` | List all CSR activities | No |
| POST | `/api/csr` | Add CSR activity + images | Yes |
| PUT | `/api/csr/:id` | Update activity | Yes |
| DELETE | `/api/csr/:id` | Delete activity | Yes |

#### Page Content (editable text blocks)
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/content/:page` | Get content for a page | No |
| PUT | `/api/content/:page` | Update content block | Yes |

#### Contact
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/contact` | Submit enquiry → send email | No |

---

## 5. Database Schema (MySQL)

### `admins`
```sql
id          INT PK AUTO_INCREMENT
email       VARCHAR(255) UNIQUE NOT NULL
password    VARCHAR(255) NOT NULL  -- bcrypt hash
created_at  TIMESTAMP DEFAULT NOW()
```

### `gallery_photos`
```sql
id          INT PK AUTO_INCREMENT
filename    VARCHAR(255) NOT NULL
filepath    VARCHAR(512) NOT NULL
caption     VARCHAR(500)
category    ENUM('general','surgery','ambulance','wards','csr')
created_at  TIMESTAMP DEFAULT NOW()
```

### `gallery_videos`
```sql
id          INT PK AUTO_INCREMENT
filename    VARCHAR(255) NOT NULL
filepath    VARCHAR(512) NOT NULL
thumbnail   VARCHAR(512)
title       VARCHAR(255)
created_at  TIMESTAMP DEFAULT NOW()
```

### `team_members`
```sql
id            INT PK AUTO_INCREMENT
name          VARCHAR(255) NOT NULL
designation   VARCHAR(255) NOT NULL
qualification VARCHAR(255)
photo_path    VARCHAR(512)
display_order INT DEFAULT 0
created_at    TIMESTAMP DEFAULT NOW()
```

### `csr_activities`
```sql
id          INT PK AUTO_INCREMENT
title       VARCHAR(255) NOT NULL
description TEXT
date        DATE
images      JSON           -- array of file paths
created_at  TIMESTAMP DEFAULT NOW()
```

### `page_content`
```sql
id          INT PK AUTO_INCREMENT
page_key    VARCHAR(100) NOT NULL  -- e.g. 'home', 'about'
block_key   VARCHAR(100) NOT NULL  -- e.g. 'hero_title', 'mission'
content_en  TEXT
content_te  TEXT
content_hi  TEXT
content_ta  TEXT
updated_at  TIMESTAMP DEFAULT NOW()
UNIQUE KEY (page_key, block_key)
```

---

## 6. i18n Architecture

- **Library**: `react-i18next`
- **Languages**: English (`en`), Telugu (`te`), Hindi (`hi`), Tamil (`ta`)
- **Strategy**: JSON locale files per language (`src/i18n/locales/*.json`)
- **Detection**: Browser language → fallback to `en`
- **Font**: Load `Mukta` (Google Fonts) which supports Devanagari + Gujarati + Latin; `Noto Sans Tamil` for Tamil; `Noto Sans Telugu` for Telugu
- **Switcher**: Sticky flag/language dropdown in Navbar

---

## 7. File Storage

```
/var/www/maa-backend/uploads/
├── images/
│   ├── gallery/       ← photo gallery uploads
│   ├── team/          ← team member headshots
│   └── csr/           ← CSR activity images
└── videos/
    └── gallery/       ← video gallery uploads
```

- Files served as static assets via Express: `app.use('/uploads', express.static('uploads'))`
- Max file sizes: Images → 5 MB, Videos → 200 MB
- Accepted formats: Images → jpg/png/webp, Videos → mp4/mov/webm
- Filenames sanitised and renamed to `uuid + extension` on upload

---

## 8. Deployment Architecture

```
VPS (cPanel)
├── Nginx
│   ├── yourdomain.com → serve Vite build (dist/)
│   └── yourdomain.com/api → proxy to Node.js :5000
├── Node.js API (PM2 managed, auto-restart)
├── MySQL (cPanel MySQL manager)
└── SSL (Let's Encrypt via cPanel AutoSSL)
```

### Nginx config snippet
```nginx
server {
  server_name yourdomain.com;

  root /home/username/public_html/dist;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;   # React SPA fallback
  }

  location /api {
    proxy_pass http://localhost:5000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
  }

  location /uploads {
    alias /var/www/maa-backend/uploads;
  }
}
```

---

## 9. Security Checklist

| Concern | Solution |
|---|---|
| Admin auth | JWT (15-min access token + refresh token in httpOnly cookie) |
| Passwords | bcryptjs, salt rounds = 12 |
| File uploads | Mimetype + extension whitelist, uuid rename, size limits |
| API abuse | express-rate-limit (100 req/15 min per IP) |
| XSS / Headers | Helmet.js |
| CORS | Whitelist only production domain |
| SQL injection | Sequelize parameterised queries (no raw SQL) |
| Env secrets | `.env` file, never committed to Git |
