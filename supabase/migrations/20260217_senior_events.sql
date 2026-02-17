-- Senior Events Aggregation System - Database Schema
-- This migration creates all tables needed for the event discovery platform

-- ============================================================================
-- 1. SENIOR EVENTS TABLE (Main events storage)
-- ============================================================================
CREATE TABLE IF NOT EXISTS senior_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Event Details
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL CHECK (category IN (
        'health_wellness',
        'spiritual',
        'social_community',
        'learning',
        'fitness',
        'online_events',
        'arts_culture',
        'entertainment'
    )),
    
    -- Date & Time
    start_datetime TIMESTAMPTZ NOT NULL,
    end_datetime TIMESTAMPTZ,
    
    -- Location
    city TEXT NOT NULL,
    venue TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_online BOOLEAN DEFAULT false,
    
    -- Registration
    registration_url TEXT,
    organizer_name TEXT,
    organizer_contact TEXT,
    
    -- Source & Quality
    source_platform TEXT NOT NULL, -- 'meetup', 'eventbrite', 'bookmyshow', 'paytm_insider', 'manual'
    senior_relevance_score DECIMAL(3, 2) CHECK (senior_relevance_score >= 0 AND senior_relevance_score <= 1),
    
    -- Moderation
    verified BOOLEAN DEFAULT false,
    approved BOOLEAN DEFAULT false,
    rejected BOOLEAN DEFAULT false,
    rejection_reason TEXT,
    
    -- Metadata
    external_id TEXT, -- ID from source platform
    image_url TEXT,
    tags TEXT[], -- Array of hashtags/keywords
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 2. EVENT SUBMISSIONS TABLE (Manual submissions from community)
-- ============================================================================
CREATE TABLE IF NOT EXISTS event_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Submitter Info
    submitted_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    submitter_email TEXT,
    submitter_name TEXT,
    submitter_organization TEXT,
    
    -- Event Details (same structure as senior_events)
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    start_datetime TIMESTAMPTZ NOT NULL,
    end_datetime TIMESTAMPTZ,
    city TEXT NOT NULL,
    venue TEXT,
    is_online BOOLEAN DEFAULT false,
    registration_url TEXT,
    organizer_name TEXT,
    organizer_contact TEXT,
    
    -- Moderation Status
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMPTZ,
    rejection_reason TEXT,
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 3. EVENT INGESTION LOGS (Monitoring & debugging)
-- ============================================================================
CREATE TABLE IF NOT EXISTS event_ingestion_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    source_platform TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('success', 'partial', 'failed')),
    
    events_fetched INTEGER DEFAULT 0,
    events_processed INTEGER DEFAULT 0,
    events_inserted INTEGER DEFAULT 0,
    events_updated INTEGER DEFAULT 0,
    events_rejected INTEGER DEFAULT 0,
    
    error_message TEXT,
    execution_time_ms INTEGER,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 4. INDEXES (Performance optimization)
-- ============================================================================

-- Query by city and date (most common filter)
CREATE INDEX IF NOT EXISTS idx_senior_events_city_date 
ON senior_events(city, start_datetime DESC) 
WHERE approved = true AND start_datetime > NOW();

-- Query by category
CREATE INDEX IF NOT EXISTS idx_senior_events_category 
ON senior_events(category, start_datetime DESC) 
WHERE approved = true;

-- Query online events
CREATE INDEX IF NOT EXISTS idx_senior_events_online 
ON senior_events(is_online, start_datetime DESC) 
WHERE approved = true AND is_online = true;

-- Query by relevance score
CREATE INDEX IF NOT EXISTS idx_senior_events_relevance 
ON senior_events(senior_relevance_score DESC, start_datetime DESC) 
WHERE approved = true;

-- Prevent duplicate external events
CREATE UNIQUE INDEX IF NOT EXISTS idx_senior_events_external_id 
ON senior_events(source_platform, external_id) 
WHERE external_id IS NOT NULL;

-- Admin moderation queries
CREATE INDEX IF NOT EXISTS idx_senior_events_pending 
ON senior_events(created_at DESC) 
WHERE approved = false AND rejected = false;

-- Submission status queries
CREATE INDEX IF NOT EXISTS idx_event_submissions_status 
ON event_submissions(status, created_at DESC);

-- ============================================================================
-- 5. ROW LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE senior_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_ingestion_logs ENABLE ROW LEVEL SECURITY;

-- Public can view approved events
CREATE POLICY "Anyone can view approved events"
ON senior_events FOR SELECT
USING (approved = true AND rejected = false AND start_datetime > NOW() - INTERVAL '1 day');

-- Only admins can insert/update/delete events
CREATE POLICY "Only admins can manage events"
ON senior_events FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
);

-- Authenticated users can submit events
CREATE POLICY "Authenticated users can submit events"
ON event_submissions FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- Users can view their own submissions
CREATE POLICY "Users can view own submissions"
ON event_submissions FOR SELECT
USING (submitted_by = auth.uid());

-- Admins can view all submissions
CREATE POLICY "Admins can view all submissions"
ON event_submissions FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
);

-- Admins can update submissions (approve/reject)
CREATE POLICY "Admins can update submissions"
ON event_submissions FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
);

-- Only admins can view ingestion logs
CREATE POLICY "Only admins can view ingestion logs"
ON event_ingestion_logs FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
);

-- Only system can insert ingestion logs
CREATE POLICY "System can insert ingestion logs"
ON event_ingestion_logs FOR INSERT
WITH CHECK (true);

-- ============================================================================
-- 6. TRIGGERS (Auto-cleanup & maintenance)
-- ============================================================================

-- Update updated_at timestamp automatically
CREATE OR REPLACE FUNCTION update_senior_events_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER senior_events_updated_at
BEFORE UPDATE ON senior_events
FOR EACH ROW
EXECUTE FUNCTION update_senior_events_updated_at();

-- Auto-approve events from verified sources with high relevance
CREATE OR REPLACE FUNCTION auto_approve_high_quality_events()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.senior_relevance_score >= 0.8 AND NEW.source_platform IN ('meetup', 'eventbrite') THEN
        NEW.approved = true;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_approve_events
BEFORE INSERT ON senior_events
FOR EACH ROW
EXECUTE FUNCTION auto_approve_high_quality_events();

-- ============================================================================
-- 7. FUNCTIONS (Helper utilities)
-- ============================================================================

-- Function to clean up expired events (called by cron)
CREATE OR REPLACE FUNCTION cleanup_expired_events()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM senior_events
    WHERE end_datetime < NOW() - INTERVAL '7 days'
    OR (end_datetime IS NULL AND start_datetime < NOW() - INTERVAL '7 days');
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Function to get upcoming events by city
CREATE OR REPLACE FUNCTION get_upcoming_events_by_city(
    p_city TEXT,
    p_limit INTEGER DEFAULT 20,
    p_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
    id UUID,
    title TEXT,
    description TEXT,
    category TEXT,
    start_datetime TIMESTAMPTZ,
    end_datetime TIMESTAMPTZ,
    city TEXT,
    venue TEXT,
    is_online BOOLEAN,
    registration_url TEXT,
    organizer_name TEXT,
    source_platform TEXT,
    senior_relevance_score DECIMAL,
    verified BOOLEAN,
    image_url TEXT,
    tags TEXT[]
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        e.id, e.title, e.description, e.category,
        e.start_datetime, e.end_datetime, e.city, e.venue,
        e.is_online, e.registration_url, e.organizer_name,
        e.source_platform, e.senior_relevance_score, e.verified,
        e.image_url, e.tags
    FROM senior_events e
    WHERE e.approved = true
    AND e.rejected = false
    AND e.start_datetime > NOW()
    AND (p_city IS NULL OR LOWER(e.city) = LOWER(p_city))
    ORDER BY e.start_datetime ASC
    LIMIT p_limit
    OFFSET p_offset;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 8. SEED DATA (Sample events for testing)
-- ============================================================================

-- Insert sample events (will be replaced by real data from ingestion)
INSERT INTO senior_events (
    title, description, category, start_datetime, city, venue,
    is_online, registration_url, organizer_name, source_platform,
    senior_relevance_score, approved, verified
) VALUES
(
    'Yoga for Seniors - Morning Session',
    'Gentle yoga session designed specifically for senior citizens. Focus on flexibility, balance, and relaxation.',
    'fitness',
    NOW() + INTERVAL '3 days',
    'Mumbai',
    'Shivaji Park Community Center',
    false,
    'https://example.com/register/yoga',
    'Mumbai Senior Citizens Association',
    'manual',
    0.95,
    true,
    true
),
(
    'Online Meditation & Mindfulness Workshop',
    'Learn meditation techniques to reduce stress and improve mental well-being. Conducted by certified instructor.',
    'health_wellness',
    NOW() + INTERVAL '5 days',
    'Online',
    NULL,
    true,
    'https://example.com/register/meditation',
    'Wellness India Foundation',
    'manual',
    0.92,
    true,
    true
),
(
    'Classical Music Concert - Ravi Shankar Tribute',
    'Evening of classical Indian music celebrating the legacy of Pt. Ravi Shankar.',
    'arts_culture',
    NOW() + INTERVAL '7 days',
    'Delhi',
    'India Habitat Centre',
    false,
    'https://example.com/register/concert',
    'Sangeet Natak Akademi',
    'manual',
    0.88,
    true,
    false
);

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
