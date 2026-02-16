# 🚀 Deploy MyMittr to Vercel

## Prerequisites Checklist

Before deploying, ensure you've completed:

- ✅ Database migration applied in Supabase
- ✅ Storage buckets created (`media` and `avatars`)
- ✅ TypeScript types regenerated
- ✅ App running locally without errors

## Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

## Step 2: Login to Vercel

```bash
vercel login
```

This will open your browser to authenticate.

## Step 3: Deploy to Vercel

From your project directory:

```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → No
- **Project name?** → mymittr (or your preferred name)
- **Directory?** → Press Enter (current directory)
- **Override settings?** → No

## Step 4: Set Environment Variables

After deployment, add your Supabase credentials:

### Option A: Via Vercel Dashboard
1. Go to: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://gcimtxgtzudsaopxdctu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Option B: Via CLI

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Paste: https://gcimtxgtzudsaopxdctu.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Paste your anon key from .env.local
```

## Step 5: Redeploy with Environment Variables

```bash
vercel --prod
```

## Step 6: Configure Supabase for Production

1. Go to Supabase Dashboard: https://supabase.com/dashboard/project/gcimtxgtzudsaopxdctu
2. Go to **Authentication** → **URL Configuration**
3. Add your Vercel URL to **Site URL**:
   - Example: `https://mymittr.vercel.app`
4. Add to **Redirect URLs**:
   - `https://mymittr.vercel.app/**`
   - `https://mymittr.vercel.app/auth/callback`

## Step 7: Test Your Deployment

Visit your Vercel URL and test:
- ✅ Login/Signup works
- ✅ Community feed loads
- ✅ Can create posts
- ✅ Reactions work
- ✅ Groups and Events accessible

## Custom Domain (Optional)

### Add Custom Domain:
1. Go to Vercel Dashboard → Your Project
2. Click **Settings** → **Domains**
3. Add your domain (e.g., `mymittr.com`)
4. Follow DNS configuration instructions

### Update Supabase:
Add your custom domain to Supabase redirect URLs.

## Troubleshooting

### Build Fails
- Check for TypeScript errors: `npm run build` locally
- Ensure all dependencies are in `package.json`

### Environment Variables Not Working
- Make sure variables start with `NEXT_PUBLIC_`
- Redeploy after adding variables

### Authentication Issues
- Verify Supabase redirect URLs include your Vercel domain
- Check that environment variables are set correctly

### 404 Errors
- Ensure all routes are properly configured
- Check `next.config.js` for any custom routing

## Useful Commands

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View deployment logs
vercel logs

# List deployments
vercel ls

# Remove deployment
vercel rm [deployment-url]
```

## Monitoring & Analytics

1. **Vercel Analytics**: Enable in project settings
2. **Supabase Logs**: Monitor database queries
3. **Error Tracking**: Consider adding Sentry

## Performance Optimization

- ✅ Images optimized with Next.js Image component
- ✅ Static pages cached by Vercel CDN
- ✅ API routes serverless functions
- ✅ Database queries optimized with indexes

## Security Checklist

- ✅ Environment variables secured
- ✅ Supabase RLS policies enabled
- ✅ HTTPS enforced by Vercel
- ✅ CORS configured in Supabase

---

**Your app will be live at**: `https://your-project.vercel.app`

Need help? Check [Vercel Docs](https://vercel.com/docs) or [Supabase Docs](https://supabase.com/docs)
