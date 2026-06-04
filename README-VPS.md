# 🚀 Comprehensive VPS Deployment Guide: MAA Website

This document provides **step-by-step, copy-paste instructions** for deploying the MAA Website (React Frontend + Node.js/SQLite Backend) onto a brand new Virtual Private Server (VPS).

This guide assumes you are using **Ubuntu 22.04 LTS** (the industry standard for web servers) on a provider like DigitalOcean, AWS EC2, Linode, or Hetzner.

---

## 📋 Phase 1: VPS Acquisition & Initial Setup

Once you have purchased your VPS, you will receive an IP address and a root password (or SSH key).

1. **Connect to your server via SSH:**
   Open your terminal (Mac/Linux) or Command Prompt/PowerShell (Windows) and type:
   ```bash
   ssh root@YOUR_SERVER_IP
   ```

2. **Update the system packages:**
   It is critical to start with a fully updated system. Run:
   ```bash
   apt update && apt upgrade -y
   ```

3. **Configure the Firewall (UFW):**
   We need to allow SSH (so you don't get locked out), HTTP (for website traffic), and HTTPS (for secure traffic).
   ```bash
   ufw allow OpenSSH
   ufw allow 'Nginx Full'
   ufw allow 80/tcp
   ufw allow 443/tcp
   ufw --force enable
   ```

---

## 🌐 Phase 2: Domain Name Configuration

Before proceeding to SSL certificates, you must point your domain name to your new VPS.

1. Go to your domain registrar (GoDaddy, Namecheap, Route53, etc.).
2. Navigate to **DNS Management**.
3. Create an **A Record**:
   - **Name/Host:** `@` (or your subdomain like `www`)
   - **Value/Target:** `YOUR_SERVER_IP`
   - **TTL:** Default or 3600

> [!NOTE] 
> DNS propagation can take anywhere from 5 minutes to 24 hours. You can proceed with the next steps immediately, but wait for propagation before doing Phase 6.

---

## 🐳 Phase 3: Installing Docker & Docker Compose

We use Docker to containerize the application, ensuring it runs exactly the same on the VPS as it does on your local machine.

1. **Install Docker via the official script:**
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh
   ```

2. **Verify the installation:**
   ```bash
   docker --version
   docker compose version
   ```
   *(You should see version numbers printed out for both).*

---

## 📦 Phase 4: Cloning the Code & Configuration

1. **Clone the GitHub Repository:**
   ```bash
   git clone https://github.com/ChargingTrex/MAA-website.git
   cd MAA-website
   ```

2. **Configure the Environment Variables:**
   We need to set up the `.env` file for the backend.
   ```bash
   cp maa-backend/.env.example maa-backend/.env
   ```
   Now, open the file to edit it:
   ```bash
   nano maa-backend/.env
   ```
   Update the variables to match your production setup:
   ```env
   PORT=5000
   JWT_SECRET=replace_this_with_a_long_random_string_like_your_password
   NODE_ENV=production
   FRONTEND_URL=https://your-domain.com
   ```
   *(Press `Ctrl+O`, `Enter` to save, and `Ctrl+X` to exit nano).*

---

## 🚀 Phase 5: Building & Running the Application

Because we have a `docker-compose.yml` file, starting the entire stack (both frontend and backend) is a single command.

1. **Start the containers in detached mode (`-d`):**
   ```bash
   docker compose up -d --build
   ```
   *Docker will now download the necessary Node.js and Nginx images, install all your NPM dependencies, build the React frontend, and start both servers.*

2. **Verify they are running:**
   ```bash
   docker ps
   ```
   You should see two containers: `maa-frontend` (running on port 80) and `maa-backend` (running on port 5000).

---

## 🔒 Phase 6: Setting up Nginx Reverse Proxy & SSL (HTTPS)

Currently, the Docker frontend is occupying port 80. However, to easily handle HTTPS, we will put an actual Nginx installation directly on the Ubuntu server to proxy traffic to our Docker containers.

1. **Stop the current frontend port binding (temporarily):**
   Open `docker-compose.yml`:
   ```bash
   nano docker-compose.yml
   ```
   Change the frontend ports from `"80:80"` to `"8080:80"`. Save and exit. Then apply the changes:
   ```bash
   docker compose up -d
   ```

2. **Install Nginx and Certbot on Ubuntu:**
   ```bash
   apt install nginx certbot python3-certbot-nginx -y
   ```

3. **Create the Nginx Configuration File:**
   ```bash
   nano /etc/nginx/sites-available/maa-website
   ```
   Paste the following configuration (replace `your-domain.com` with your actual domain):
   ```nginx
   server {
       listen 80;
       server_name your-domain.com www.your-domain.com;

       # Route to the Frontend React App (Docker port 8080)
       location / {
           proxy_pass http://localhost:8080;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }

       # Route to the Node.js Backend API (Docker port 5000)
       location /api/ {
           proxy_pass http://localhost:5000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
       
       # Route for backend uploaded images
       location /uploads/ {
           proxy_pass http://localhost:5000;
       }
   }
   ```
   *(Save and exit).*

4. **Enable the site and restart Nginx:**
   ```bash
   ln -s /etc/nginx/sites-available/maa-website /etc/nginx/sites-enabled/
   rm /etc/nginx/sites-enabled/default
   nginx -t
   systemctl restart nginx
   ```

5. **Generate the SSL Certificate (HTTPS):**
   ```bash
   certbot --nginx -d your-domain.com -d www.your-domain.com
   ```
   *Follow the prompts. Choose "Redirect" when asked if you want to redirect HTTP traffic to HTTPS.*

---

## 💾 Phase 7: Database Management & Backups

Your application uses SQLite. The database is stored inside a Docker volume mounted to your host filesystem.

### Where is my data?
All your persistent data lives right here in your repository folder on the VPS:
- **Database:** `/root/MAA-website/maa-backend/database.sqlite`
- **Uploaded Images:** `/root/MAA-website/maa-backend/uploads/`

### How do I back it up?
Because it's just a file, backing it up is incredibly easy. You can set up a simple cron job to copy it, or download it via SCP/SFTP to your local computer:
```bash
# Example backup command
cp /root/MAA-website/maa-backend/database.sqlite /root/backups/db_backup_$(date +%F).sqlite
```

### Viewing the SQL Schema
If you ever need to migrate to MySQL or PostgreSQL in the future, we have generated SQL dumps of your schema. You can find them in:
- `maa-backend/database_schema.sql` *(Just the table structures)*
- `maa-backend/database_dump.sql` *(Tables + all your current data)*

---

## 🛠 Troubleshooting & Cheatsheet

**How do I view the live logs?**
If something goes wrong, you can view the backend logs like this:
```bash
docker logs maa-backend -f
```

**I made changes to the code, how do I apply them?**
If you `git pull` new changes from GitHub, you must rebuild the containers:
```bash
cd /root/MAA-website
git pull origin main
docker compose up -d --build
```

**How do I stop the website?**
```bash
docker compose down
```
