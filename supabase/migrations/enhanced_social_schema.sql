-- =============================================
-- MyMittr Enhanced Social Media Platform Schema
-- Complete Facebook-like features
-- =============================================

-- =============================================
-- 1. POST REACTIONS (Replace simple likes)
-- =============================================
CREATE TABLE IF NOT EXISTS post_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('like', 'love', 'haha', 'wow', 'sad', 'angry')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

CREATE INDEX idx_post_reactions_post ON post_reactions(post_id);
CREATE INDEX idx_post_reactions_user ON post_reactions(user_id);
CREATE INDEX idx_post_reactions_type ON post_reactions(reaction_type);

ALTER TABLE post_reactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view reactions"
  ON post_reactions FOR SELECT USING (true);

CREATE POLICY "Users can add reactions"
  ON post_reactions FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their reactions"
  ON post_reactions FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their reactions"
  ON post_reactions FOR DELETE USING (auth.uid() = user_id);

-- =============================================
-- 2. STORIES
-- =============================================
CREATE TABLE IF NOT EXISTS stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('photo', 'video')),
  text_overlay TEXT,
  background_color TEXT,
  duration INTEGER DEFAULT 5,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '24 hours'
);

CREATE INDEX idx_stories_user ON stories(user_id);
CREATE INDEX idx_stories_expires ON stories(expires_at);

ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view non-expired stories from friends"
  ON stories FOR SELECT
  USING (
    expires_at > NOW() AND (
      user_id = auth.uid() OR
      EXISTS (
        SELECT 1 FROM friendships
        WHERE status = 'accepted'
        AND ((user_id = auth.uid() AND friend_id = stories.user_id)
          OR (friend_id = auth.uid() AND user_id = stories.user_id))
      )
    )
  );

CREATE POLICY "Users can create their own stories"
  ON stories FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own stories"
  ON stories FOR DELETE USING (auth.uid() = user_id);

-- Story views tracking
CREATE TABLE IF NOT EXISTS story_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  viewed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(story_id, user_id)
);

CREATE INDEX idx_story_views_story ON story_views(story_id);

ALTER TABLE story_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Story owners can view who viewed their stories"
  ON story_views FOR SELECT
  USING (EXISTS (SELECT 1 FROM stories WHERE id = story_id AND user_id = auth.uid()));

CREATE POLICY "Users can record story views"
  ON story_views FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =============================================
-- 3. GROUPS
-- =============================================
CREATE TABLE IF NOT EXISTS groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  cover_photo_url TEXT,
  privacy TEXT NOT NULL CHECK (privacy IN ('public', 'private', 'secret')) DEFAULT 'public',
  category TEXT,
  created_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  members_count INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_groups_created_by ON groups(created_by);
CREATE INDEX idx_groups_privacy ON groups(privacy);
CREATE INDEX idx_groups_category ON groups(category);

ALTER TABLE groups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public groups visible to all"
  ON groups FOR SELECT
  USING (privacy = 'public' OR EXISTS (
    SELECT 1 FROM group_members WHERE group_id = id AND user_id = auth.uid()
  ));

CREATE POLICY "Users can create groups"
  ON groups FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Admins can update groups"
  ON groups FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM group_members 
    WHERE group_id = id AND user_id = auth.uid() AND role IN ('admin', 'moderator')
  ));

-- Group members
CREATE TABLE IF NOT EXISTS group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'moderator', 'member')) DEFAULT 'member',
  status TEXT NOT NULL CHECK (status IN ('pending', 'approved')) DEFAULT 'approved',
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(group_id, user_id)
);

CREATE INDEX idx_group_members_group ON group_members(group_id);
CREATE INDEX idx_group_members_user ON group_members(user_id);

ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view group membership"
  ON group_members FOR SELECT
  USING (EXISTS (SELECT 1 FROM groups WHERE id = group_id AND privacy = 'public')
    OR user_id = auth.uid()
    OR EXISTS (SELECT 1 FROM group_members gm WHERE gm.group_id = group_id AND gm.user_id = auth.uid()));

CREATE POLICY "Users can join groups"
  ON group_members FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage members"
  ON group_members FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM group_members 
    WHERE group_id = group_members.group_id AND user_id = auth.uid() AND role = 'admin'
  ));

-- Group posts
CREATE TABLE IF NOT EXISTS group_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  media_urls TEXT[],
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_group_posts_group ON group_posts(group_id);
CREATE INDEX idx_group_posts_user ON group_posts(user_id);

ALTER TABLE group_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Group members can view posts"
  ON group_posts FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM group_members 
    WHERE group_id = group_posts.group_id AND user_id = auth.uid() AND status = 'approved'
  ));

CREATE POLICY "Group members can create posts"
  ON group_posts FOR INSERT
  WITH CHECK (auth.uid() = user_id AND EXISTS (
    SELECT 1 FROM group_members 
    WHERE group_id = group_posts.group_id AND user_id = auth.uid() AND status = 'approved'
  ));

-- =============================================
-- 4. EVENTS
-- =============================================
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  cover_photo_url TEXT,
  location TEXT,
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  created_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  privacy TEXT NOT NULL CHECK (privacy IN ('public', 'private')) DEFAULT 'public',
  category TEXT,
  is_online BOOLEAN DEFAULT false,
  online_link TEXT,
  attendees_count INTEGER DEFAULT 0,
  interested_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_events_created_by ON events(created_by);
CREATE INDEX idx_events_start_time ON events(start_time);
CREATE INDEX idx_events_privacy ON events(privacy);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public events visible to all"
  ON events FOR SELECT
  USING (privacy = 'public' OR created_by = auth.uid() OR EXISTS (
    SELECT 1 FROM event_attendees WHERE event_id = id AND user_id = auth.uid()
  ));

CREATE POLICY "Users can create events"
  ON events FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Creators can update events"
  ON events FOR UPDATE USING (auth.uid() = created_by);

-- Event attendees
CREATE TABLE IF NOT EXISTS event_attendees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('going', 'interested', 'not_going')) DEFAULT 'interested',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

CREATE INDEX idx_event_attendees_event ON event_attendees(event_id);
CREATE INDEX idx_event_attendees_user ON event_attendees(user_id);

ALTER TABLE event_attendees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view attendees of public events"
  ON event_attendees FOR SELECT
  USING (EXISTS (SELECT 1 FROM events WHERE id = event_id AND privacy = 'public')
    OR user_id = auth.uid());

CREATE POLICY "Users can RSVP to events"
  ON event_attendees FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their RSVP"
  ON event_attendees FOR UPDATE USING (auth.uid() = user_id);

-- =============================================
-- 5. PHOTO ALBUMS
-- =============================================
CREATE TABLE IF NOT EXISTS photo_albums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  cover_photo_url TEXT,
  privacy TEXT NOT NULL CHECK (privacy IN ('public', 'friends', 'private')) DEFAULT 'public',
  photos_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_photo_albums_user ON photo_albums(user_id);

ALTER TABLE photo_albums ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view albums based on privacy"
  ON photo_albums FOR SELECT
  USING (
    user_id = auth.uid() OR
    privacy = 'public' OR
    (privacy = 'friends' AND EXISTS (
      SELECT 1 FROM friendships
      WHERE status = 'accepted'
      AND ((user_id = auth.uid() AND friend_id = photo_albums.user_id)
        OR (friend_id = auth.uid() AND user_id = photo_albums.user_id))
    ))
  );

CREATE POLICY "Users can create their own albums"
  ON photo_albums FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own albums"
  ON photo_albums FOR UPDATE USING (auth.uid() = user_id);

-- Album photos
CREATE TABLE IF NOT EXISTS album_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id UUID NOT NULL REFERENCES photo_albums(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  caption TEXT,
  tagged_users UUID[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_album_photos_album ON album_photos(album_id);

ALTER TABLE album_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view photos from accessible albums"
  ON album_photos FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM photo_albums WHERE id = album_id
    AND (user_id = auth.uid() OR privacy = 'public' OR (
      privacy = 'friends' AND EXISTS (
        SELECT 1 FROM friendships
        WHERE status = 'accepted'
        AND ((user_id = auth.uid() AND friend_id = photo_albums.user_id)
          OR (friend_id = auth.uid() AND user_id = photo_albums.user_id))
      )
    ))
  ));

CREATE POLICY "Album owners can add photos"
  ON album_photos FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM photo_albums WHERE id = album_id AND user_id = auth.uid()
  ));

-- =============================================
-- 6. ENHANCED COMMUNITY POSTS
-- =============================================
ALTER TABLE community_posts
  ADD COLUMN IF NOT EXISTS feeling TEXT,
  ADD COLUMN IF NOT EXISTS activity TEXT,
  ADD COLUMN IF NOT EXISTS location TEXT,
  ADD COLUMN IF NOT EXISTS location_lat DECIMAL(10, 8),
  ADD COLUMN IF NOT EXISTS location_lng DECIMAL(11, 8),
  ADD COLUMN IF NOT EXISTS media_urls TEXT[],
  ADD COLUMN IF NOT EXISTS media_types TEXT[],
  ADD COLUMN IF NOT EXISTS tagged_users UUID[],
  ADD COLUMN IF NOT EXISTS hashtags TEXT[],
  ADD COLUMN IF NOT EXISTS is_edited BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS edited_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS reactions_count INTEGER DEFAULT 0;

-- Post media table for better organization
CREATE TABLE IF NOT EXISTS post_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('photo', 'video', 'gif')),
  thumbnail_url TEXT,
  width INTEGER,
  height INTEGER,
  duration INTEGER,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_post_media_post ON post_media(post_id);

ALTER TABLE post_media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view post media"
  ON post_media FOR SELECT USING (true);

CREATE POLICY "Post owners can add media"
  ON post_media FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM community_posts WHERE id = post_id AND user_id = auth.uid()
  ));

-- =============================================
-- 7. POLLS
-- =============================================
CREATE TABLE IF NOT EXISTS post_polls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  ends_at TIMESTAMPTZ,
  total_votes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS poll_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id UUID NOT NULL REFERENCES post_polls(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  votes_count INTEGER DEFAULT 0,
  position INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS poll_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id UUID NOT NULL REFERENCES post_polls(id) ON DELETE CASCADE,
  option_id UUID NOT NULL REFERENCES poll_options(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(poll_id, user_id)
);

ALTER TABLE post_polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE poll_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE poll_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view polls" ON post_polls FOR SELECT USING (true);
CREATE POLICY "Anyone can view poll options" ON poll_options FOR SELECT USING (true);
CREATE POLICY "Anyone can view poll votes" ON poll_votes FOR SELECT USING (true);
CREATE POLICY "Users can vote on polls" ON poll_votes FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =============================================
-- 8. SAVED/BOOKMARKED CONTENT
-- =============================================
CREATE TABLE IF NOT EXISTS saved_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  collection_name TEXT DEFAULT 'Saved',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, post_id)
);

CREATE INDEX idx_saved_posts_user ON saved_posts(user_id);

ALTER TABLE saved_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their saved posts"
  ON saved_posts FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can save posts"
  ON saved_posts FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unsave posts"
  ON saved_posts FOR DELETE USING (auth.uid() = user_id);

-- =============================================
-- 9. HASHTAGS & MENTIONS
-- =============================================
CREATE TABLE IF NOT EXISTS hashtags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tag TEXT UNIQUE NOT NULL,
  usage_count INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_hashtags_tag ON hashtags(tag);
CREATE INDEX idx_hashtags_usage ON hashtags(usage_count DESC);

CREATE TABLE IF NOT EXISTS post_hashtags (
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  hashtag_id UUID NOT NULL REFERENCES hashtags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, hashtag_id)
);

CREATE TABLE IF NOT EXISTS post_mentions (
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, user_id)
);

-- =============================================
-- 10. USER ACTIVITY LOG
-- =============================================
CREATE TABLE IF NOT EXISTS user_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL,
  activity_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_user_activities_user ON user_activities(user_id);
CREATE INDEX idx_user_activities_created ON user_activities(created_at DESC);

ALTER TABLE user_activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own activity"
  ON user_activities FOR SELECT USING (auth.uid() = user_id);

-- =============================================
-- 11. PAGES (Business Profiles)
-- =============================================
CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  username TEXT UNIQUE,
  description TEXT,
  category TEXT NOT NULL,
  profile_photo_url TEXT,
  cover_photo_url TEXT,
  website TEXT,
  email TEXT,
  phone TEXT,
  location TEXT,
  created_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  followers_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_pages_created_by ON pages(created_by);
CREATE INDEX idx_pages_username ON pages(username);

CREATE TABLE IF NOT EXISTS page_followers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(page_id, user_id)
);

-- =============================================
-- 12. MARKETPLACE
-- =============================================
CREATE TABLE IF NOT EXISTS marketplace_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  icon TEXT,
  parent_id UUID REFERENCES marketplace_categories(id)
);

CREATE TABLE IF NOT EXISTS marketplace_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  category_id UUID REFERENCES marketplace_categories(id),
  condition TEXT CHECK (condition IN ('new', 'like_new', 'good', 'fair', 'poor')),
  location TEXT,
  photos TEXT[],
  status TEXT CHECK (status IN ('available', 'pending', 'sold')) DEFAULT 'available',
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_marketplace_user ON marketplace_listings(user_id);
CREATE INDEX idx_marketplace_category ON marketplace_listings(category_id);
CREATE INDEX idx_marketplace_status ON marketplace_listings(status);

ALTER TABLE marketplace_listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available listings"
  ON marketplace_listings FOR SELECT USING (status = 'available' OR user_id = auth.uid());

CREATE POLICY "Users can create listings"
  ON marketplace_listings FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their listings"
  ON marketplace_listings FOR UPDATE USING (auth.uid() = user_id);

-- =============================================
-- 13. LIVE STREAMING
-- =============================================
CREATE TABLE IF NOT EXISTS live_streams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  stream_key TEXT UNIQUE NOT NULL,
  status TEXT CHECK (status IN ('live', 'ended')) DEFAULT 'live',
  viewers_count INTEGER DEFAULT 0,
  peak_viewers INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS stream_viewers (
  stream_id UUID NOT NULL REFERENCES live_streams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (stream_id, user_id)
);

-- =============================================
-- 14. COMMENT REACTIONS & NESTED COMMENTS
-- =============================================
CREATE TABLE IF NOT EXISTS comment_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id UUID NOT NULL REFERENCES post_comments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('like', 'love', 'haha', 'wow', 'sad', 'angry')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(comment_id, user_id)
);

ALTER TABLE post_comments
  ADD COLUMN IF NOT EXISTS parent_comment_id UUID REFERENCES post_comments(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS reactions_count INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS replies_count INTEGER DEFAULT 0;

-- =============================================
-- 15. USER BLOCKING & REPORTING
-- =============================================
CREATE TABLE IF NOT EXISTS blocked_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  blocked_user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, blocked_user_id)
);

CREATE INDEX idx_blocked_users_user ON blocked_users(user_id);

ALTER TABLE blocked_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their blocked list"
  ON blocked_users FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can block others"
  ON blocked_users FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unblock"
  ON blocked_users FOR DELETE USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS content_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL CHECK (content_type IN ('post', 'comment', 'user', 'group', 'event')),
  content_id UUID NOT NULL,
  reason TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('pending', 'reviewed', 'resolved')) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TRIGGERS & FUNCTIONS
-- =============================================

-- Update reaction counts
CREATE OR REPLACE FUNCTION update_post_reactions_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE community_posts SET reactions_count = reactions_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE community_posts SET reactions_count = reactions_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_reactions_count
AFTER INSERT OR DELETE ON post_reactions
FOR EACH ROW EXECUTE FUNCTION update_post_reactions_count();

-- Update story views count
CREATE OR REPLACE FUNCTION update_story_views_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE stories SET views_count = views_count + 1 WHERE id = NEW.story_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_story_views
AFTER INSERT ON story_views
FOR EACH ROW EXECUTE FUNCTION update_story_views_count();

-- Update group members count
CREATE OR REPLACE FUNCTION update_group_members_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.status = 'approved' THEN
    UPDATE groups SET members_count = members_count + 1 WHERE id = NEW.group_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE groups SET members_count = members_count - 1 WHERE id = OLD.group_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_group_members
AFTER INSERT OR DELETE ON group_members
FOR EACH ROW EXECUTE FUNCTION update_group_members_count();

-- Update event attendees count
CREATE OR REPLACE FUNCTION update_event_attendees_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.status = 'going' THEN
      UPDATE events SET attendees_count = attendees_count + 1 WHERE id = NEW.event_id;
    ELSIF NEW.status = 'interested' THEN
      UPDATE events SET interested_count = interested_count + 1 WHERE id = NEW.event_id;
    END IF;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.status = 'going' AND NEW.status != 'going' THEN
      UPDATE events SET attendees_count = attendees_count - 1 WHERE id = NEW.event_id;
    ELSIF OLD.status != 'going' AND NEW.status = 'going' THEN
      UPDATE events SET attendees_count = attendees_count + 1 WHERE id = NEW.event_id;
    END IF;
    IF OLD.status = 'interested' AND NEW.status != 'interested' THEN
      UPDATE events SET interested_count = interested_count - 1 WHERE id = NEW.event_id;
    ELSIF OLD.status != 'interested' AND NEW.status = 'interested' THEN
      UPDATE events SET interested_count = interested_count + 1 WHERE id = NEW.event_id;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.status = 'going' THEN
      UPDATE events SET attendees_count = attendees_count - 1 WHERE id = OLD.event_id;
    ELSIF OLD.status = 'interested' THEN
      UPDATE events SET interested_count = interested_count - 1 WHERE id = OLD.event_id;
    END IF;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_event_attendees
AFTER INSERT OR UPDATE OR DELETE ON event_attendees
FOR EACH ROW EXECUTE FUNCTION update_event_attendees_count();

-- Update album photos count
CREATE OR REPLACE FUNCTION update_album_photos_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE photo_albums SET photos_count = photos_count + 1 WHERE id = NEW.album_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE photo_albums SET photos_count = photos_count - 1 WHERE id = OLD.album_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_album_photos
AFTER INSERT OR DELETE ON album_photos
FOR EACH ROW EXECUTE FUNCTION update_album_photos_count();

-- Auto-delete expired stories
CREATE OR REPLACE FUNCTION delete_expired_stories()
RETURNS void AS $$
BEGIN
  DELETE FROM stories WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Create notification on mention
CREATE OR REPLACE FUNCTION create_mention_notification()
RETURNS TRIGGER AS $$
DECLARE
  mentioned_user UUID;
BEGIN
  FOREACH mentioned_user IN ARRAY NEW.tagged_users
  LOOP
    INSERT INTO notifications (user_id, type, content, related_id)
    VALUES (mentioned_user, 'mention', 'mentioned you in a post', NEW.id);
  END LOOP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_mention_notification
AFTER INSERT ON community_posts
FOR EACH ROW
WHEN (NEW.tagged_users IS NOT NULL)
EXECUTE FUNCTION create_mention_notification();
