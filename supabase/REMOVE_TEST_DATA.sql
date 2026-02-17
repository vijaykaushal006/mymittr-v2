-- Remove all test/dummy events and keep only real events from APIs
-- Run this in Supabase Dashboard → SQL Editor

-- Delete all manually inserted test events
DELETE FROM senior_events 
WHERE source_platform = 'manual';

-- Verify deletion
SELECT 'All test events removed. Ready for real event ingestion!' as message;
