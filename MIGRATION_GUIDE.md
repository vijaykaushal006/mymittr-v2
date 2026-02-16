# ⚡ Quick Migration Guide

## Step 1: Apply Main Schema

1. Open Supabase Dashboard: https://gcimtxgtzudsaopxdctu.supabase.co
2. Go to **SQL Editor** → **New Query**
3. Copy **ALL** content from: `supabase/migrations/enhanced_social_schema.sql`
4. Paste and click **RUN**
5. Wait for completion (may take 30-60 seconds)

## Step 2: Apply Storage Setup

1. In SQL Editor, create **New Query**
2. Copy **ALL** content from: `supabase/migrations/storage_setup.sql`
3. Paste and click **RUN**

## Step 3: Verify Tables

Go to **Table Editor** and confirm you see these new tables:
- post_reactions
- stories
- groups
- events
- photo_albums
- (and 20+ more)

## Step 4: Regenerate Types

```bash
npx supabase gen types typescript --project-id gcimtxgtzudsaopxdctu > types/supabase.ts
```

## Step 5: Start Dev Server

```bash
npm run dev
```

## ✅ Done!

Visit http://localhost:3000/services/community and test your new features!

---

**Note:** If you get "relation already exists" errors, that's OK - it means some tables were already created. The migration will skip those and continue.
