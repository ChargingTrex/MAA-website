# MAA Saraswati Veterinary Hospital Website

Welcome to the official web application for the MAA Saraswati Veterinary Hospital. This repository contains both the public-facing React frontend and the Node.js/SQLite backend that powers the dynamic CMS (Content Management System) for managing hospital data.

## 🛠 Tech Stack

### Frontend (`maa-frontend/`)
- **React 18** (UI Library)
- **Vite** (Build Tool)
- **Tailwind CSS** (Styling)
- **Framer Motion** (Animations)
- **React Router DOM** (Routing)
- **i18next** (Multi-language Support - English, Telugu, Hindi, Tamil)

### Backend (`maa-backend/`)
- **Node.js + Express** (Server)
- **SQLite** (Database)
- **Sequelize** (ORM)
- **JSON Web Tokens (JWT)** (Admin Authentication)
- **Multer** (Handling Image Uploads)

---

## 📁 Repository Structure

```
MAA-website/
│
├── maa-frontend/           # The Frontend React Application
│   ├── src/
│   │   ├── components/     # Reusable UI components (Public & Admin)
│   │   ├── pages/          # Page components (Home, Gallery, Admin CMS, etc)
│   │   ├── services/       # API integration logic
│   │   └── i18n/           # Language translation files
│   └── package.json
│
├── maa-backend/            # The Backend Express Application
│   ├── models/             # Sequelize database models (Gallery, Team, Sponsors, CSR)
│   ├── routes/             # Express API endpoints
│   ├── uploads/            # Persistent storage for admin-uploaded images
│   └── server.js           # Main server entrypoint
│
├── docker-compose.yml      # Orchestration for VPS deployment
└── README-VPS.md           # Instructions for VPS / Production Deployment
```

---

## 🚀 Running Locally for Development

To run this project on your local machine, you will need to start both the frontend and backend servers. 

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v16 or higher) installed on your machine.

### 1. Start the Backend Server
Open a terminal and navigate to the backend folder:
```bash
cd maa-backend
```
Install dependencies:
```bash
npm install
```
Start the server (runs on `http://localhost:5000`):
```bash
npm run dev
```
*Note: The database (`database.sqlite`) will be automatically created on the first run.*

### 2. Start the Frontend Development Server
Open a second terminal window and navigate to the frontend folder:
```bash
cd maa-frontend
```
Install dependencies:
```bash
npm install
```
Start the Vite development server (runs on `http://localhost:5175` by default):
```bash
npm run dev
```

---

## 🔐 Admin Portal Access

The application features a fully custom Content Management System for hospital staff to manage content dynamically (Gallery photos, Team members, CSR activities, and Hospital Needs/Sponsors).

To access the admin portal:
1. Ensure both your frontend and backend are running.
2. Navigate to: `http://localhost:5175/#/admin/login`
3. Log in with the configured admin credentials. *(If running for the first time, check the backend seeding script or configure an admin user manually via the DB).*

---

## 🌍 Production Deployment

If you are looking to host this application on a live server (VPS), we have prepared comprehensive deployment templates and Docker files. 

Please refer to the detailed **[VPS Deployment Guide](README-VPS.md)**.
