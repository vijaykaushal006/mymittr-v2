# 🌐 Setup Custom Domain (mymittr.com)

Congratulations on your live deployment! Here is how to connect your **Hostinger** domain (`mymittr.com`) to your **Vercel** app.

## Step 1: Add Domain in Vercel

1. Go to your **Vercel Dashboard** > Select Project (**mymittr-v2**).
2. Click **Settings** > **Domains**.
3. Enter `mymittr.com` in the input field.
4. Click **Add**.
5. Select the recommended option (usually "Add mymittr.com" and "www.mymittr.com").
6. Vercel will show you some **DNS Records** (A Record and CNAME) that contain "Invalid Configuration" for now. **Keep this page open.**

## Step 2: Configure Hostinger DNS

1. Log in to your **Hostinger Account**.
2. Go to **Domains** > Manage `mymittr.com`.
3. Click on **DNS / Name Servers** (primary sidebar).
4. You need to **Delete** any existing "A" records that point to "Parked" or Hostinger's default IP if they exist for `@` or `www`.
5. **Add these new records** (copy values from Vercel to be sure, but they are usually standard):

### Record 1 (The Root Domain)
- **Type:** `A`
- **Name:** `@`
- **Points to:** `76.76.21.21`
- **TTL:** `3600` (or default)

### Record 2 (The 'www' Subdomain)
- **Type:** `CNAME`
- **Name:** `www`
- **Points to:** `cname.vercel-dns.com`
- **TTL:** `3600` (or default)

*(Note: If Vercel gives you different values, use the ones from Vercel!)*

## Step 3: Verify

1. Go back to Vercel **Domains** settings.
2. It might take a few minutes (up to 24 hours, but usually fast) for the "Invalid Configuration" to turn into a ✅ **Valid Configuration**.
3. Once valid, visiting `mymittr.com` will show your app!

## Troubleshooting
- If Hostinger doesn't let you add the records, verify you don't have conflicting records (like another A record for `@`). Delete the old ones first.
- DNS propagation can take time. If it doesn't work instantly, wait 15-30 minutes.
