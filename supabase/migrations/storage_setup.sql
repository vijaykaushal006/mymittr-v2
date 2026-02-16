-- =============================================
-- SUPABASE STORAGE SETUP (SIMPLIFIED)
-- Run this in your Supabase SQL Editor AFTER the main schema
-- =============================================

-- Create media storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Create avatars storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop all existing storage policies to start fresh
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage') LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON storage.objects';
    END LOOP;
END $$;

-- Public read access for all buckets
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id IN ('media', 'avatars'));

-- Authenticated users can upload
CREATE POLICY "Authenticated upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id IN ('media', 'avatars'));

-- Users can update their own files (simplified - allows all authenticated users)
CREATE POLICY "Authenticated update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id IN ('media', 'avatars'));

-- Users can delete their own files (simplified - allows all authenticated users)
CREATE POLICY "Authenticated delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id IN ('media', 'avatars'));
