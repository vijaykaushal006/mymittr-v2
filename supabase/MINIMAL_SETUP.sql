-- MINIMAL SETUP - Run this NOW in Supabase Dashboard
-- Creates only the essential table to get events working immediately

-- 1. Create senior_events table (simplified version)
CREATE TABLE IF NOT EXISTS senior_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    start_datetime TIMESTAMPTZ NOT NULL,
    end_datetime TIMESTAMPTZ,
    city TEXT NOT NULL,
    venue TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_online BOOLEAN DEFAULT false,
    registration_url TEXT,
    organizer_name TEXT,
    organizer_contact TEXT,
    source_platform TEXT NOT NULL,
    external_id TEXT,
    image_url TEXT,
    senior_relevance_score DECIMAL(3, 2),
    tags TEXT[],
    verified BOOLEAN DEFAULT false,
    approved BOOLEAN DEFAULT false,
    rejected BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create event_ingestion_logs table
CREATE TABLE IF NOT EXISTS event_ingestion_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_platform TEXT NOT NULL,
    status TEXT NOT NULL,
    events_fetched INTEGER DEFAULT 0,
    events_processed INTEGER DEFAULT 0,
    events_inserted INTEGER DEFAULT 0,
    events_updated INTEGER DEFAULT 0,
    events_rejected INTEGER DEFAULT 0,
    error_message TEXT,
    execution_time_ms INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create event_submissions table
CREATE TABLE IF NOT EXISTS event_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submitted_by UUID,
    submitter_email TEXT NOT NULL,
    submitter_name TEXT NOT NULL,
    submitter_organization TEXT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    start_datetime TIMESTAMPTZ NOT NULL,
    end_datetime TIMESTAMPTZ,
    city TEXT NOT NULL,
    venue TEXT,
    is_online BOOLEAN DEFAULT false,
    registration_url TEXT,
    organizer_name TEXT NOT NULL,
    organizer_contact TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Add essential indexes
CREATE INDEX IF NOT EXISTS idx_senior_events_approved ON senior_events(approved) WHERE approved = true;
CREATE INDEX IF NOT EXISTS idx_senior_events_start_datetime ON senior_events(start_datetime);
CREATE INDEX IF NOT EXISTS idx_senior_events_city ON senior_events(city);

-- 5. Enable RLS
ALTER TABLE senior_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_ingestion_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_submissions ENABLE ROW LEVEL SECURITY;

-- 6. Create RLS policy for public viewing
DROP POLICY IF EXISTS "Anyone can view approved events" ON senior_events;
CREATE POLICY "Anyone can view approved events"
ON senior_events FOR SELECT
USING (approved = true AND rejected = false);

DROP POLICY IF EXISTS "Anyone can submit events" ON event_submissions;
CREATE POLICY "Anyone can submit events"
ON event_submissions FOR INSERT
WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can view logs" ON event_ingestion_logs;
CREATE POLICY "Anyone can view logs"
ON event_ingestion_logs FOR SELECT
USING (true);

-- Success message
SELECT 'SUCCESS! Tables created. Ready for event ingestion!' as message,
       'Run ingestion command now' as next_step;
