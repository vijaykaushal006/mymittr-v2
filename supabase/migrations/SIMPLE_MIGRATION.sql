-- =============================================
-- COMPLETE MIGRATION - RUN THIS IN SUPABASE SQL EDITOR
-- Go to: https://supabase.com/dashboard/project/gcimtxgtzudsaopxdctu/sql
-- Copy this ENTIRE file and paste in SQL Editor, then click RUN
-- =============================================

-- This is a combined, simplified version of all migrations
-- It will skip anything that already exists

-- 1. POST REACTIONS
CREATE TABLE IF NOT EXISTS post_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('like', 'love', 'haha', 'wow', 'sad', 'angry')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_post_reactions_post ON post_reactions(post_id);
CREATE INDEX IF NOT EXISTS idx_post_reactions_user ON post_reactions(user_id);

ALTER TABLE post_reactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view reactions" ON post_reactions;
CREATE POLICY "Anyone can view reactions" ON post_reactions FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can add reactions" ON post_reactions;
CREATE POLICY "Users can add reactions" ON post_reactions FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their reactions" ON post_reactions;
CREATE POLICY "Users can update their reactions" ON post_reactions FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their reactions" ON post_reactions;
CREATE POLICY "Users can delete their reactions" ON post_reactions FOR DELETE USING (auth.uid() = user_id);

-- 2. Add new columns to community_posts
ALTER TABLE community_posts
  ADD COLUMN IF NOT EXISTS feeling TEXT,
  ADD COLUMN IF NOT EXISTS activity TEXT,
  ADD COLUMN IF NOT EXISTS location TEXT,
  ADD COLUMN IF NOT EXISTS media_urls TEXT[],
  ADD COLUMN IF NOT EXISTS media_types TEXT[],
  ADD COLUMN IF NOT EXISTS tagged_users UUID[],
  ADD COLUMN IF NOT EXISTS hashtags TEXT[],
  ADD COLUMN IF NOT EXISTS is_edited BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS edited_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS reactions_count INTEGER DEFAULT 0;

-- 3. STORIES
CREATE TABLE IF NOT EXISTS stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('photo', 'video')),
  text_overlay TEXT,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '24 hours'
);

CREATE INDEX IF NOT EXISTS idx_stories_user ON stories(user_id);
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view stories" ON stories;
CREATE POLICY "Users can view stories" ON stories FOR SELECT USING (expires_at > NOW());

DROP POLICY IF EXISTS "Users can create stories" ON stories;
CREATE POLICY "Users can create stories" ON stories FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete stories" ON stories;
CREATE POLICY "Users can delete stories" ON stories FOR DELETE USING (auth.uid() = user_id);

-- 4. GROUPS
CREATE TABLE IF NOT EXISTS groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  cover_photo_url TEXT,
  privacy TEXT NOT NULL CHECK (privacy IN ('public', 'private', 'secret')) DEFAULT 'public',
  category TEXT,
  created_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  members_count INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_groups_created_by ON groups(created_by);
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public groups visible" ON groups;
CREATE POLICY "Public groups visible" ON groups FOR SELECT USING (privacy = 'public');

DROP POLICY IF EXISTS "Users can create groups" ON groups;
CREATE POLICY "Users can create groups" ON groups FOR INSERT WITH CHECK (auth.uid() = created_by);

-- 5. GROUP MEMBERS
CREATE TABLE IF NOT EXISTS group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'moderator', 'member')) DEFAULT 'member',
  status TEXT NOT NULL CHECK (status IN ('pending', 'approved')) DEFAULT 'approved',
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(group_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_group_members_group ON group_members(group_id);
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Members can view" ON group_members;
CREATE POLICY "Members can view" ON group_members FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can join" ON group_members;
CREATE POLICY "Users can join" ON group_members FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 6. EVENTS
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  cover_photo_url TEXT,
  location TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  created_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  privacy TEXT NOT NULL CHECK (privacy IN ('public', 'private')) DEFAULT 'public',
  is_online BOOLEAN DEFAULT false,
  online_link TEXT,
  attendees_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_created_by ON events(created_by);
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public events visible" ON events;
CREATE POLICY "Public events visible" ON events FOR SELECT USING (privacy = 'public' OR created_by = auth.uid());

DROP POLICY IF EXISTS "Users can create events" ON events;
CREATE POLICY "Users can create events" ON events FOR INSERT WITH CHECK (auth.uid() = created_by);

-- 7. EVENT ATTENDEES
CREATE TABLE IF NOT EXISTS event_attendees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('going', 'interested', 'not_going')) DEFAULT 'interested',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_event_attendees_event ON event_attendees(event_id);
ALTER TABLE event_attendees ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view attendees" ON event_attendees;
CREATE POLICY "Anyone can view attendees" ON event_attendees FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can RSVP" ON event_attendees;
CREATE POLICY "Users can RSVP" ON event_attendees FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 8. PHOTO ALBUMS
CREATE TABLE IF NOT EXISTS photo_albums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  privacy TEXT NOT NULL CHECK (privacy IN ('public', 'friends', 'private')) DEFAULT 'public',
  photos_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_photo_albums_user ON photo_albums(user_id);
ALTER TABLE photo_albums ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view albums" ON photo_albums;
CREATE POLICY "Users can view albums" ON photo_albums FOR SELECT USING (user_id = auth.uid() OR privacy = 'public');

DROP POLICY IF EXISTS "Users can create albums" ON photo_albums;
CREATE POLICY "Users can create albums" ON photo_albums FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 9. SAVED POSTS
CREATE TABLE IF NOT EXISTS saved_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, post_id)
);

CREATE INDEX IF NOT EXISTS idx_saved_posts_user ON saved_posts(user_id);
ALTER TABLE saved_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view saved" ON saved_posts;
CREATE POLICY "Users can view saved" ON saved_posts FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can save" ON saved_posts;
CREATE POLICY "Users can save" ON saved_posts FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can unsave" ON saved_posts;
CREATE POLICY "Users can unsave" ON saved_posts FOR DELETE USING (auth.uid() = user_id);

-- 10. BLOCKED USERS
CREATE TABLE IF NOT EXISTS blocked_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  blocked_user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, blocked_user_id)
);

CREATE INDEX IF NOT EXISTS idx_blocked_users_user ON blocked_users(user_id);
ALTER TABLE blocked_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view blocked" ON blocked_users;
CREATE POLICY "Users can view blocked" ON blocked_users FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can block" ON blocked_users;
CREATE POLICY "Users can block" ON blocked_users FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ✅ DATABASE MIGRATION COMPLETE!
-- Next: Set up storage buckets manually (see STORAGE_SETUP_GUIDE.md)
