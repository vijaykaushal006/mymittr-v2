-- INSTANT SETUP: Run this in Supabase Dashboard → SQL Editor
-- This creates tables + adds test events so you see results immediately

-- 1. Create senior_events table
CREATE TABLE IF NOT EXISTS senior_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
    source_platform TEXT NOT NULL,
    external_id TEXT,
    senior_relevance_score DECIMAL(3, 2),
    tags TEXT[],
    verified BOOLEAN DEFAULT false,
    approved BOOLEAN DEFAULT false,
    rejected BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create event_submissions table
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

-- 3. Create ingestion logs table
CREATE TABLE IF NOT EXISTS event_ingestion_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_platform TEXT NOT NULL,
    status TEXT NOT NULL,
    events_fetched INTEGER DEFAULT 0,
    events_inserted INTEGER DEFAULT 0,
    events_updated INTEGER DEFAULT 0,
    events_rejected INTEGER DEFAULT 0,
    error_message TEXT,
    execution_time_ms INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Add indexes
CREATE INDEX IF NOT EXISTS idx_senior_events_city ON senior_events(city);
CREATE INDEX IF NOT EXISTS idx_senior_events_category ON senior_events(category);
CREATE INDEX IF NOT EXISTS idx_senior_events_start_datetime ON senior_events(start_datetime);
CREATE INDEX IF NOT EXISTS idx_senior_events_approved ON senior_events(approved);

-- 5. Enable RLS
ALTER TABLE senior_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_ingestion_logs ENABLE ROW LEVEL SECURITY;

-- 6. Create RLS policy for public viewing
DROP POLICY IF EXISTS "Anyone can view approved events" ON senior_events;
CREATE POLICY "Anyone can view approved events"
ON senior_events FOR SELECT
USING (approved = true AND rejected = false);

DROP POLICY IF EXISTS "Anyone can submit events" ON event_submissions;
CREATE POLICY "Anyone can submit events"
ON event_submissions FOR INSERT
WITH CHECK (true);

-- 7. INSERT TEST EVENTS (so you see results immediately!)
INSERT INTO senior_events (
    title, description, category, start_datetime, end_datetime,
    city, venue, is_online, registration_url, organizer_name,
    source_platform, senior_relevance_score, verified, approved, tags
) VALUES
-- Health & Wellness Events
('Morning Yoga for Seniors', 'Gentle yoga session designed for 60+ age group. Includes breathing exercises and meditation.', 
 'health_wellness', NOW() + INTERVAL '2 days', NOW() + INTERVAL '2 days' + INTERVAL '1 hour',
 'Mumbai', 'Wellness Center, Bandra', false, 'https://example.com/yoga', 'Mumbai Wellness Foundation',
 'manual', 0.95, true, true, ARRAY['yoga', 'wellness', 'seniors', 'exercise']),

('Free Health Checkup Camp', 'Comprehensive health screening for senior citizens. Blood pressure, sugar, eye checkup included.',
 'health_wellness', NOW() + INTERVAL '5 days', NOW() + INTERVAL '5 days' + INTERVAL '3 hours',
 'Delhi', 'Community Health Center, Dwarka', false, 'https://example.com/health', 'Delhi Health Services',
 'manual', 0.92, true, true, ARRAY['health', 'checkup', 'seniors', 'free']),

('Online Meditation & Mindfulness', 'Daily guided meditation sessions via Zoom. Perfect for beginners.',
 'spiritual', NOW() + INTERVAL '1 day', NOW() + INTERVAL '1 day' + INTERVAL '45 minutes',
 'Online', null, true, 'https://zoom.us/meditation', 'Inner Peace Foundation',
 'manual', 0.88, true, true, ARRAY['meditation', 'online', 'spiritual', 'mindfulness']),

-- Social & Community Events  
('Senior Citizens Monthly Meet', 'Community gathering with lunch, games, and cultural programs.',
 'social_community', NOW() + INTERVAL '7 days', NOW() + INTERVAL '7 days' + INTERVAL '4 hours',
 'Bengaluru', 'Senior Citizens Association Hall', false, 'https://example.com/meet', 'Bangalore Senior Citizens Assoc',
 'manual', 0.90, true, true, ARRAY['community', 'social', 'seniors', 'meetup']),

('Laughter Club Session', 'Join us for laughter yoga and fun activities. All ages welcome, seniors encouraged!',
 'social_community', NOW() + INTERVAL '3 days', NOW() + INTERVAL '3 days' + INTERVAL '1 hour',
 'Pune', 'Koregaon Park', false, 'https://example.com/laughter', 'Pune Laughter Club',
 'manual', 0.87, true, true, ARRAY['laughter', 'social', 'wellness', 'fun']),

-- Learning Events
('Smartphone Basics for Seniors', 'Learn to use WhatsApp, video calls, and online banking safely.',
 'learning', NOW() + INTERVAL '4 days', NOW() + INTERVAL '4 days' + INTERVAL '2 hours',
 'Chennai', 'Public Library, T Nagar', false, 'https://example.com/smartphone', 'Digital Literacy Foundation',
 'manual', 0.93, true, true, ARRAY['technology', 'learning', 'smartphone', 'seniors']),

('Online Cooking Class - Traditional Recipes', 'Learn healthy traditional recipes. Interactive session with Q&A.',
 'learning', NOW() + INTERVAL '6 days', NOW() + INTERVAL '6 days' + INTERVAL '1.5 hours',
 'Online', null, true, 'https://example.com/cooking', 'Culinary Heritage India',
 'manual', 0.85, true, true, ARRAY['cooking', 'online', 'traditional', 'healthy']),

-- Arts & Culture
('Classical Music Concert', 'Evening of Hindustani classical music. Special seating for senior citizens.',
 'arts_culture', NOW() + INTERVAL '10 days', NOW() + INTERVAL '10 days' + INTERVAL '2 hours',
 'Mumbai', 'Nehru Centre Auditorium', false, 'https://example.com/concert', 'Mumbai Music Circle',
 'manual', 0.82, true, true, ARRAY['music', 'classical', 'culture', 'concert']),

('Painting Workshop for Beginners', 'Watercolor painting basics. All materials provided. No experience needed.',
 'arts_culture', NOW() + INTERVAL '8 days', NOW() + INTERVAL '8 days' + INTERVAL '3 hours',
 'Kolkata', 'Art Gallery, Park Street', false, 'https://example.com/painting', 'Kolkata Art Society',
 'manual', 0.80, true, true, ARRAY['art', 'painting', 'workshop', 'creative']),

-- Spiritual Events
('Bhajan Sandhya', 'Evening devotional singing session. Tea and snacks provided.',
 'spiritual', NOW() + INTERVAL '2 days', NOW() + INTERVAL '2 days' + INTERVAL '2 hours',
 'Ahmedabad', 'Community Temple', false, 'https://example.com/bhajan', 'Spiritual Society',
 'manual', 0.89, true, true, ARRAY['bhajan', 'spiritual', 'devotional', 'community']),

-- Fitness Events
('Morning Walk Group', 'Daily morning walks in the park. Make new friends while staying fit!',
 'fitness', NOW() + INTERVAL '1 day', NOW() + INTERVAL '1 day' + INTERVAL '1 hour',
 'Hyderabad', 'Lumbini Park', false, 'https://example.com/walk', 'Hyderabad Fitness Club',
 'manual', 0.86, true, true, ARRAY['walking', 'fitness', 'outdoor', 'social']),

-- Online Events
('Virtual Book Club Discussion', 'Monthly book discussion via Google Meet. This month: Indian classics.',
 'online_events', NOW() + INTERVAL '9 days', NOW() + INTERVAL '9 days' + INTERVAL '1.5 hours',
 'Online', null, true, 'https://meet.google.com/book', 'Online Reading Circle',
 'manual', 0.84, true, true, ARRAY['books', 'online', 'discussion', 'literature']);

-- Success message
SELECT 'SUCCESS! Tables created and 12 test events added. Refresh /services/companionship to see them!' as message;
