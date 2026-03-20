# Deploy to Render - Complete Guide

This guide will help you deploy your e-commerce website (frontend + backend) to Render.

## Prerequisites

1. **GitHub Account** - Your code must be pushed to a GitHub repository
2. **Render Account** - Sign up at https://render.com
3. **MongoDB Database** - You'll need a MongoDB connection string
4. **Paystack Account** - For payment processing (https://paystack.com)

---

## Step 1: Prepare Your Code

### 1.1 Update Environment Variables

Create a `.env` file in the `backend` folder (copy from `.env` if exists):

```env
# Backend Environment Variables
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
CLIENT_URL=https://your-frontend.onrender.com
PAYSTACK_SECRET_KEY=your_paystack_secret_key
PAYSTACK_PUBLIC_KEY=your_paystack_public_key
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
```

### 1.2 Update Frontend API Configuration

The frontend has been updated to use `REACT_APP_API_URL` environment variable. Make sure your `frontend/src/App.js` has this configuration (already done).

### 1.3 Push to GitHub

```bash
git add .
git commit -m "Prepare for production deployment"
git push origin main
```

---

## Step 2: Deploy Backend (Web Service)

### 2.1 Create a New Web Service

1. Log in to Render (https://dashboard.render.com)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure the service:

| Setting | Value |
|---------|-------|
| Name | `ecommerce-backend` |
| Region | `Oregon` (or closest to you) |
| Branch | `main` |
| Build Command | `cd backend && npm install` |
| Start Command | `cd backend && npm start` |

### 2.2 Add Environment Variables

Scroll to the **Environment Variables** section and add:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=generate_a_secure_string
CLIENT_URL=https://your-frontend.onrender.com
PAYSTACK_SECRET_KEY=your_paystack_secret_key
PAYSTACK_PUBLIC_KEY=your_paystack_public_key
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
```

> **Note:** For MongoDB, you can create a free MongoDB database on Render:
> - Go to **New +** → **MongoDB**
> - Select **Free** tier
> - Copy the connection string and use it for `MONGODB_URI`

### 2.3 Deploy

Click **Create Web Service**. Wait for the build to complete.

---

## Step 3: Deploy Frontend (Static Site)

### 3.1 Create a New Static Site

1. In Render dashboard, click **New +** → **Static Site**
2. Connect the same GitHub repository
3. Configure the service:

| Setting | Value |
|---------|-------|
| Name | `ecommerce-frontend` |
| Region | `Oregon` |
| Branch | `main` |
| Build Command | `cd frontend && npm install && npm run build` |
| Publish Directory | `frontend/build` |

### 3.2 Add Environment Variables

Add these environment variables:

```
REACT_APP_API_URL=https://ecommerce-backend.onrender.com
REACT_APP_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
```

> **Important:** Replace `ecommerce-backend.onrender.com` with your actual backend URL (you'll get this after backend deployment).

### 3.3 Deploy

Click **Create Static Site**. Wait for the build to complete.

---

## Step 4: Connect Frontend to Backend

### 4.1 Get Backend URL

After backend deployment completes, you'll see a URL like:
`https://ecommerce-backend.onrender.com`

### 4.2 Update Frontend Environment Variable

1. Go to your **Frontend Static Site** in Render dashboard
2. Click **Environment**
3. Update `REACT_APP_API_URL` with your backend URL:
   ```
   REACT_APP_API_URL=https://ecommerce-backend.onrender.com
   ```
4. Click **Deploy** to rebuild with the new environment variable

---

## Step 5: Configure Paystack

### 5.1 Get API Keys

1. Go to https://dashboard.paystack.com/#/settings/developer
2. Copy your **Public Key** and **Secret Key**

### 5.2 Update Environment Variables

Add these keys to both services:

**Backend:**
- `PAYSTACK_SECRET_KEY` = your_secret_key
- `PAYSTACK_PUBLIC_KEY` = your_public_key

**Frontend:**
- `REACT_APP_PAYSTACK_PUBLIC_KEY` = your_public_key

---

## Step 6: Test Your Deployment

### 6.1 Test Backend API

Visit: `https://your-backend.onrender.com/api/health`

You should see:
```json
{"status":"OK","timestamp":"...","uptime":...}
```

### 6.2 Test Frontend

Visit: `https://your-frontend.onrender.com`

---

## Troubleshooting

### CORS Issues

If you see CORS errors:
1. Go to your backend service on Render
2. Check the `CLIENT_URL` environment variable
3. Make sure it exactly matches your frontend URL (including https://)

### MongoDB Connection Issues

If the backend can't connect to MongoDB:
1. Verify your `MONGODB_URI` is correct
2. Check that your MongoDB instance allows connections from Render's IPs
3. For Render MongoDB, use the internal connection string

### API Not Working

If API calls fail:
1. Verify `REACT_APP_API_URL` is set correctly in frontend
2. Make sure backend is running and healthy
3. Check browser console for errors

---

## Cost Estimation

| Service | Type | Free Tier |
|---------|------|------------|
| Backend | Web Service | 750 hours/month |
| Frontend | Static Site | 100GB bandwidth/month |
| Database | MongoDB | 512MB storage |

For a small to medium e-commerce site, this should be free!

---

## Useful Links

- Render Dashboard: https://dashboard.render.com
- Render Documentation: https://render.com/docs
- MongoDB on Render: https://render.com/docs/mongodb
- Paystack Dashboard: https://dashboard.paystack.com
