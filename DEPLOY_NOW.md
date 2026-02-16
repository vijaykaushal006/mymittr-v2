# Quick Deployment Steps

## 🚀 Deploy in 3 Simple Steps

### Step 1: Login to Vercel
```bash
vercel login
```
This will open your browser. Sign in with GitHub, GitLab, or Email.

### Step 2: Deploy
```bash
vercel
```
Answer the prompts:
- Set up and deploy? **Y**
- Which scope? **Select your account**
- Link to existing project? **N**
- Project name? **mymittr** (or your choice)
- Directory? **Press Enter**
- Override settings? **N**

### Step 3: Add Environment Variables

After first deployment, add your Supabase credentials:

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL production
```
Paste: `https://gcimtxgtzudsaopxdctu.supabase.co`

```bash
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
```
Paste your anon key from `.env.local` file

### Step 4: Deploy to Production
```bash
vercel --prod
```

## ✅ Post-Deployment

1. **Update Supabase**:
   - Go to: https://supabase.com/dashboard/project/gcimtxgtzudsaopxdctu/auth/url-configuration
   - Add your Vercel URL to **Site URL** and **Redirect URLs**

2. **Test Your Site**:
   - Visit your Vercel URL
   - Test login, signup, and all features

## 🎉 Done!

Your app is now live at: `https://your-project.vercel.app`

---

**Need the full guide?** See [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md)
