# v0-veterinary-hospital-website (Frontend)

This is the frontend application for the MAA Saraswati Veterinary Hospital website. Originally bootstrapped with v0, this project has been fully upgraded into a robust **React + Vite** Single Page Application (SPA).

## 🛠 Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router DOM (HashRouter)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Internationalization:** i18next (English, Telugu, Hindi, Tamil)

## 📁 Folder Structure

```
src/
├── components/
│   ├── admin/      # Admin dashboard CMS components
│   ├── common/     # Reusable UI elements (Buttons, Cards, Modals)
│   └── home/       # Landing page specific sections
├── context/        # React Context providers (AuthContext, LanguageContext)
├── i18n/           # Translation JSON files
├── pages/          # Full page components (Home, Gallery, Sponsor, etc.)
├── services/       # API integration logic (Axios config)
└── utils/          # Helper functions and animation variants
```

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v16+) installed.

### Installation
1. Navigate to this directory (`maa-v.0-improvement`).
2. Install the dependencies:
   ```bash
   npm install
   ```

### Running Development Server
Start the Vite development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5175`.

*Note: For dynamic data (Gallery, CSR, Team, Sponsors) and admin login to work, you must also have the `maa-backend` server running concurrently on port 5000.*

### Building for Production
To build the application for production (which outputs static files to the `/dist` directory):
```bash
npm run build
```
You can then preview the build locally using:
```bash
npm run preview
```

## 🔐 Admin Dashboard
The frontend includes a fully integrated CMS dashboard located at `/#/admin/login`. 
- Content is fetched dynamically via the Axios API instance in `src/services/api.js`.
- If the backend is unavailable, public pages will gracefully fall back to displaying static data arrays.
