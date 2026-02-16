# Database Setup Instructions

This guide will help you set up the enhanced social media database schema.

## Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project: https://gcimtxgtzudsaopxdctu.supabase.co

2. Navigate to **SQL Editor** in the left sidebar

3. Click **New Query**

4. Copy and paste the contents of `supabase/migrations/enhanced_social_schema.sql`

5. Click **Run** to execute the migration

6. Create a new query and copy/paste the contents of `supabase/migrations/storage_setup.sql`

7. Click **Run** to set up storage buckets

## Option 2: Using Supabase CLI

If you have Supabase CLI configured with your project:

```bash
# Link your project (if not already linked)
npx supabase link --project-ref gcimtxgtzudsaopxdctu

# Apply migrations
npx supabase db push
```

## Verify Setup

After running the migrations, verify in your Supabase dashboard:

### Database Tables
Go to **Table Editor** and check that these new tables exist:
- post_reactions
- stories
- story_views
- groups
- group_members
- group_posts
- events
- event_attendees
- photo_albums
- album_photos
- post_polls
- poll_options
- poll_votes
- saved_posts
- hashtags
- post_hashtags
- post_mentions
- marketplace_categories
- marketplace_listings
- pages
- page_followers
- live_streams
- stream_viewers
- blocked_users
- content_reports
- user_activities

### Storage Buckets
Go to **Storage** and check that these buckets exist:
- media
- avatars

## Regenerate TypeScript Types

After applying the migration, regenerate your TypeScript types:

```bash
npx supabase gen types typescript --project-id gcimtxgtzudsaopxdctu > types/supabase.ts
```

This will fix all TypeScript errors related to the new tables.

## Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to http://localhost:3000/services/community

3. Try creating a post with:
   - Photos/videos
   - Feelings and activities
   - Location
   - Different privacy settings

4. Test reactions on posts

5. Navigate to http://localhost:3000/services/groups and create a group

6. Navigate to http://localhost:3000/services/events and create an event

## Troubleshooting

### Migration Errors
- If you get "relation already exists" errors, the tables may already be created. You can safely ignore these.
- If you get permission errors, make sure you're using the service role key or running as the database owner.

### Storage Errors
- If storage policies fail, check if they already exist in **Storage > Policies**
- You may need to delete existing policies with the same name first

### TypeScript Errors
- Make sure to regenerate types after applying migrations
- Restart your TypeScript server in VS Code: Ctrl+Shift+P > "TypeScript: Restart TS Server"

## Next Steps

Once the database is set up:
1. ✅ Test all features in the UI
2. ✅ Implement remaining features (stories UI, messaging, notifications)
3. ✅ Deploy to production
4. ✅ Set up monitoring and analytics
