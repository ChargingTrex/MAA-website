# MAA Website - VPS Deployment Guide

This repository includes everything you need to easily deploy the MAA Website to a Virtual Private Server (VPS) like DigitalOcean, AWS, Linode, or Hetzner.

## Prerequisites
1. A Linux VPS (Ubuntu 20.04 or 22.04 recommended)
2. Domain name pointed to your VPS's IP address
3. [Docker and Docker Compose](https://docs.docker.com/engine/install/ubuntu/) installed on your VPS.

## Step 1: Clone the Repository
SSH into your VPS and clone your repository:
```bash
git clone https://github.com/ChargingTrex/MAA-website.git
cd MAA-website
```

## Step 2: Configure Environment Variables
Copy the example environment file in the backend directory and update it:
```bash
cp maa-backend/.env.example maa-backend/.env
```
Edit the `.env` file and set your production values:
- `JWT_SECRET`: Set this to a long random string.
- `FRONTEND_URL`: Set this to your actual domain name (e.g., `https://maa-hospital.com`).

## Step 3: Run with Docker Compose
We have provided Dockerfiles for both the backend (Node.js) and frontend (React/Nginx), along with a `docker-compose.yml` file to run them together.

Start the application in the background:
```bash
docker compose up -d --build
```

That's it! 
- The frontend will be served on port `80`.
- The backend will be running on port `5000`.

## Step 4: Setup SSL / HTTPS (Optional but Recommended)
To secure your website with HTTPS, you can use Nginx as a reverse proxy with Certbot (Let's Encrypt).

1. Install Nginx and Certbot:
```bash
sudo apt update
sudo apt install nginx python3-certbot-nginx
```

2. Point Nginx to your Docker containers by editing `/etc/nginx/sites-available/default`:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:80; # Points to Docker frontend
    }

    location /api {
        proxy_pass http://localhost:5000; # Points to Docker backend
    }
}
```

3. Obtain an SSL certificate:
```bash
sudo certbot --nginx -d your-domain.com
```

## Database Backups
The SQLite database and uploaded images are persisted on your VPS via Docker volumes. You can find them in:
- `maa-backend/database.sqlite`
- `maa-backend/uploads/`

You can safely back up these files at any time. If you ever want to see the SQL schema, check `maa-backend/database_schema.sql`.
