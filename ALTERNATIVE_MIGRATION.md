# 🚀 Alternative Migration Methods

## Issue: Supabase Dashboard Not Opening

If `https://gcimtxgtzudsaopxdctu.supabase.co` is not opening, try these alternatives:

## Method 1: Use Supabase.com Dashboard

1. Go to: **https://supabase.com/dashboard**
2. Sign in with your account
3. Find your project "gcimtxgtzudsaopxdctu" in the project list
4. Click on it to open the dashboard
5. Then go to **SQL Editor** in the left sidebar

## Method 2: Direct SQL Editor Link

Try this direct link to the SQL Editor:
**https://supabase.com/dashboard/project/gcimtxgtzudsaopxdctu/sql**

## Method 3: Use Supabase CLI (Requires Login)

```bash
# Login to Supabase
npx supabase login

# Link your project
npx supabase link --project-ref gcimtxgtzudsaopxdctu

# Push migrations
npx supabase db push
```

## Method 4: Manual SQL Execution via psql

If you have the database connection string:

```bash
psql "postgresql://postgres:[YOUR-PASSWORD]@db.gcimtxgtzudsaopxdctu.supabase.co:5432/postgres"
```

Then copy/paste the SQL from the migration files.

## Method 5: Use Supabase Studio (Local)

```bash
# Start local Supabase
npx supabase start

# This will give you a local Studio URL
# Then you can test migrations locally first
```

## ✅ Recommended: Try Method 1 or 2

The easiest approach is to:
1. Go to https://supabase.com/dashboard
2. Sign in
3. Select your project
4. Use SQL Editor

---

## Once You're in SQL Editor:

### Step 1: Run Main Schema
Copy all content from: `supabase/migrations/enhanced_social_schema.sql`

### Step 2: Run Storage Setup  
Copy all content from: `supabase/migrations/storage_setup.sql`

### Step 3: Verify
Check **Table Editor** - you should see 25+ new tables

### Step 4: Regenerate Types
```bash
npx supabase gen types typescript --project-id gcimtxgtzudsaopxdctu > types/supabase.ts
```

### Step 5: Restart Dev Server
```bash
npm run dev
```
