# Alternative Deployment Options

Since Railway isn't working, here are better alternatives:

## Option 1: Render (Easiest - Recommended)

### Backend Setup:
1. Go to [render.com](https://render.com) → Sign up with GitHub
2. Click "New +" → "Web Service"
3. Connect your `pc-builder` repo
4. Configure:
   - **Name**: `pc-builder-backend`
   - **Environment**: `Node`
   - **Root Directory**: `backend2`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   - `OPENAI_API_KEY` = your key
   - `NODE_ENV` = `production`
   - `ALLOWED_ORIGINS` = your frontend URL (optional)
6. Click "Create Web Service"
7. Copy the URL (e.g., `https://pc-builder-backend.onrender.com`)

### Frontend Setup (Vercel):
1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Import `pc-builder` repo
3. Configure:
   - **Root Directory**: `frontend`
   - **Framework**: Vite (auto-detected)
4. Add Environment Variable:
   - `VITE_API_URL` = your Render backend URL
5. Deploy!

---

## Option 2: Fly.io

### Backend Setup:
1. Install Fly CLI:
   ```powershell
   iwr https://fly.io/install.ps1 -useb | iex
   ```
2. Sign up: `fly auth signup`
3. In `backend2/` directory:
   ```powershell
   cd backend2
   fly launch
   ```
4. Follow prompts:
   - App name: `pc-builder-backend` (or any name)
   - Region: choose closest
   - PostgreSQL: No
   - Redis: No
5. Set secrets:
   ```powershell
   fly secrets set OPENAI_API_KEY=your_key_here
   fly secrets set NODE_ENV=production
   ```
6. Deploy: `fly deploy`

---

## Option 3: DigitalOcean App Platform

1. Go to [digitalocean.com](https://digitalocean.com)
2. Create App → Connect GitHub
3. Select `pc-builder` repo
4. Configure backend service:
   - Source: `backend2/`
   - Build: `npm install && npm run build`
   - Run: `npm start`
   - Environment Variables: Add `OPENAI_API_KEY`

---

## Quick Comparison

| Platform | Free Tier | Ease | Speed |
|----------|-----------|------|-------|
| **Render** | ✅ Yes | ⭐⭐⭐⭐⭐ | Fast |
| **Fly.io** | ✅ Yes | ⭐⭐⭐⭐ | Very Fast |
| **Vercel** | ✅ Yes (frontend only) | ⭐⭐⭐⭐⭐ | Fastest |
| **DigitalOcean** | ❌ No | ⭐⭐⭐ | Medium |

**Recommendation**: Use **Render for backend** + **Vercel for frontend** (easiest combo)

---

## After Deployment

1. Update frontend `VITE_API_URL` to point to your backend URL
2. Update backend `ALLOWED_ORIGINS` to include your frontend URL (for CORS)
3. Test the connection!


