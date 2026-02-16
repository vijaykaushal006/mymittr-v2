# Storage Setup Guide

## Step 1: Create Storage Buckets

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/gcimtxgtzudsaopxdctu
2. Click **Storage** in the left sidebar
3. Click **New bucket**

### Create "media" Bucket
- **Name**: `media`
- **Public bucket**: ✅ Checked
- Click **Create bucket**

### Create "avatars" Bucket
- **Name**: `avatars`
- **Public bucket**: ✅ Checked
- Click **Create bucket**

## Step 2: Set Up Policies (Optional)

The buckets are now public, which means:
- ✅ Anyone can read/view files
- ✅ Authenticated users can upload files

If you want more control, you can add policies in **Storage > Policies**, but the default settings should work fine for now.

## ✅ Done!

Your storage is now ready for media uploads. The app will automatically upload files to these buckets.

## Next Steps

1. **Regenerate Types**:
   ```bash
   npx supabase gen types typescript --project-id gcimtxgtzudsaopxdctu > types/supabase.ts
   ```

2. **Test the App**:
   - Go to http://localhost:3000/services/community
   - Try creating a post with photos
   - Test reactions, comments, groups, and events

3. **Verify Tables**:
   - Go to **Table Editor** in Supabase
   - You should see: `post_reactions`, `stories`, `groups`, `events`, etc.
