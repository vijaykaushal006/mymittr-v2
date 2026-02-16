# 🚀 Deploy MyMittr via GitHub to Vercel

## Why GitHub Deployment?

Deploying via GitHub gives you:
- ✅ Automatic deployments on every push
- ✅ Preview deployments for pull requests
- ✅ Easy rollbacks
- ✅ Version control integration

## Step 1: Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit: MyMittr social platform"
```

## Step 2: Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `mymittr`
3. Description: "Full-featured social media platform for seniors"
4. **Keep it Private** (recommended for now)
5. **Don't** initialize with README (we already have files)
6. Click **Create repository**

## Step 3: Push to GitHub

Copy the commands from GitHub (they'll look like this):

```bash
git remote add origin https://github.com/YOUR_USERNAME/mymittr.git
git branch -M main
git push -u origin main
```

## Step 4: Connect to Vercel

1. Go to: https://vercel.com/new
2. Click **Import Git Repository**
3. Select your GitHub account
4. Find and select `mymittr` repository
5. Click **Import**

## Step 5: Configure Project

On the import screen:

### Framework Preset
- Should auto-detect: **Next.js**

### Root Directory
- Leave as: `./`

### Build Settings
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### Environment Variables
Add these:

```
NEXT_PUBLIC_SUPABASE_URL = https://gcimtxgtzudsaopxdctu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = [paste from .env.local]
```

To get your anon key:
```bash
cat .env.local
```

## Step 6: Deploy

Click **Deploy** button!

Vercel will:
- Install dependencies
- Build your app
- Deploy to production
- Give you a live URL

## Step 7: Configure Supabase

1. Go to: https://supabase.com/dashboard/project/gcimtxgtzudsaopxdctu/auth/url-configuration
2. Add your Vercel URL to:
   - **Site URL**: `https://your-project.vercel.app`
   - **Redirect URLs**: `https://your-project.vercel.app/**`

## Step 8: Test Your Live Site

Visit your Vercel URL and test:
- ✅ Login/Signup
- ✅ Create posts
- ✅ Reactions
- ✅ Groups & Events

## Future Deployments

Every time you push to GitHub:
```bash
git add .
git commit -m "Your changes"
git push
```

Vercel will automatically deploy! 🎉

## Custom Domain (Optional)

1. In Vercel Dashboard → Settings → Domains
2. Add your domain (e.g., `mymittr.com`)
3. Follow DNS configuration
4. Update Supabase redirect URLs

## Troubleshooting

### Build Fails
Check Vercel deployment logs for errors.

### Environment Variables
Make sure they're added in Vercel dashboard.

### Authentication Issues
Verify Supabase redirect URLs include your Vercel domain.

---

**Your app will be live at**: `https://your-project.vercel.app`

Every push to `main` branch = automatic deployment! 🚀
