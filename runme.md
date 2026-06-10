# MAA Saraswati Veterinary Hospital - Project Setup

This guide will help you get the MAA Website up and running locally, either for development or via Docker for production/testing.

## Prerequisites
- **Node.js** (v18.x or higher)
- **npm** (Node Package Manager)
- **Docker & Docker Compose** (Optional, if running via Docker)

---

## 🚀 Option 1: Run via Docker (Recommended for Testing/Production)
The project already includes a complete Docker setup with `Dockerfile`s for both frontend and backend, and a `docker-compose.yml` at the root.

1. **Open your terminal** in the root of the project (`MAA website`).
2. **Build and start the containers** in detached mode:
   ```bash
   docker-compose up -d --build
   ```
3. **Access the application**:
   - **Frontend**: http://localhost (or http://localhost:80)
   - **Backend API**: http://localhost:5000
4. **To stop the containers**, run:
   ```bash
   docker-compose down
   ```

---

## 💻 Option 2: Local Development (Without Docker)
If you want to run the application locally for active development with hot-reloading:

### 1. Start the Backend
Open a terminal window and run:
```bash
cd maa-backend
npm install
npm run dev
```
*The backend will run on `http://localhost:5000`.*

### 2. Start the Frontend
Open a second terminal window and run:
```bash
cd maa-frontend
npm install
npm run dev
```
*The frontend will run on `http://localhost:5173`.*

---

## 🔐 Default Admin Login
When the backend starts for the first time, it automatically creates a default admin account.

- **Login URL**: `http://localhost:5173/admin/login` (or `/admin/login` on Docker)
- **Email**: `admin@maa.com`
- **Password**: `admin123`

---

## 📂 Project Structure
- `/maa-frontend`: Frontend React (Vite) application
- `/maa-backend`: Node.js/Express backend server
- `docker-compose.yml`: Docker configuration to run both services together
- `requirements.txt`: List of all Node dependencies used in the project
