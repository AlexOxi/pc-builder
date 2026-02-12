# Deployment Guide

This guide will help you deploy your PC Builder app to production.

## Prerequisites

- GitHub account (✅ you have this)
- OpenAI API key
- Accounts for deployment platforms (we'll create these)

---

## Step 1: Deploy Backend (Railway)

### 1.1 Sign up for Railway
1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Sign up with GitHub (recommended)

### 1.2 Deploy from GitHub
1. Click "New Project" → "Deploy from GitHub repo"
2. Select your `pc-builder` repository
3. Railway will detect it's a Node.js project

### 1.3 Configure the Service
1. Click on the new service
2. Go to **Settings** tab
3. Set **Root Directory** to: `backend2`
4. Go to **Variables** tab and add:
   - `OPENAI_API_KEY` = your OpenAI API key
   - `NODE_ENV` = `production`
   - (Optional) `ALLOWED_ORIGINS` = your frontend URL (e.g., `https://your-app.vercel.app`)

### 1.4 Railway Auto-Detection
Railway should auto-detect:
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

If not, set them manually in Settings → Deploy.

### 1.5 Get Your Backend URL
1. Once deployed, Railway will give you a URL like: `https://your-app.railway.app`
2. **Copy this URL** - you'll need it for the frontend!

---

## Step 2: Deploy Frontend (Vercel - Recommended)

### 2.1 Sign up for Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub

### 2.2 Import Your Repository
1. Click "Add New..." → "Project"
2. Import your `pc-builder` repository
3. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 2.3 Add Environment Variables
1. In project settings, go to **Environment Variables**
2. Add:
   - `VITE_API_URL` = your Railway backend URL (e.g., `https://your-app.railway.app`)

### 2.4 Deploy
1. Click "Deploy"
2. Vercel will build and deploy your app
3. You'll get a URL like: `https://pc-builder-xyz.vercel.app`

---

## Step 3: Update Backend CORS (if needed)

If your frontend is on a specific domain, update Railway environment variable:
- `ALLOWED_ORIGINS` = `https://your-frontend.vercel.app`

Or keep it as `*` for development (less secure but works everywhere).

---

## Step 4: Test Your Deployment

1. Visit your frontend URL
2. Try building a PC
3. Check browser console for any errors
4. Verify API calls are working

---

## Alternative: Firebase Hosting (Frontend)

If you prefer Firebase:

### Setup
```bash
cd frontend
npm install -g firebase-tools
firebase login
firebase init hosting
# Select existing project or create new
# Public directory: dist
# Single-page app: Yes
```

### Build and Deploy
```bash
npm run build
firebase deploy --only hosting
```

Don't forget to set `VITE_API_URL` in Firebase Hosting environment variables!

---

## Troubleshooting

### Backend Issues
- **Port errors**: Railway sets `PORT` automatically, your code handles this ✅
- **Build fails**: Check that `npm run build` works locally
- **API not responding**: Check Railway logs, verify `OPENAI_API_KEY` is set

### Frontend Issues
- **API calls fail**: 
  - Check `VITE_API_URL` is set correctly
  - Verify backend CORS allows your frontend domain
  - Check browser console for CORS errors
- **Build fails**: Run `npm run build` locally to see errors

### CORS Errors
If you see CORS errors:
1. Update `ALLOWED_ORIGINS` in Railway to include your frontend URL
2. Or temporarily set it to `*` for testing

---

## Environment Variables Summary

### Backend (Railway)
- `OPENAI_API_KEY` - Required
- `NODE_ENV` - Set to `production`
- `ALLOWED_ORIGINS` - Optional, comma-separated frontend URLs

### Frontend (Vercel/Firebase)
- `VITE_API_URL` - Your Railway backend URL

---

## Quick Commands

### Local Testing
```bash
# Backend
cd backend2
npm install
npm run build
npm start

# Frontend
cd frontend
npm install
npm run dev
```

### Deploy Updates
Just push to GitHub! Railway and Vercel will auto-deploy on push to `main` branch.

---

## Cost Estimates

- **Railway**: Free tier available (500 hours/month), then ~$5/month
- **Vercel**: Free tier (unlimited for personal projects)
- **Firebase**: Free tier available
- **OpenAI API**: Pay per use (check pricing)

---

Need help? Check the logs in Railway/Vercel dashboards for detailed error messages!


