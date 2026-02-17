// API Route: Submit Event
// Handles community event submissions

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabaseServer';
import type { EventSubmissionForm } from '@/types/events';

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();

        // Get current user (optional - can be anonymous)
        const { data: { user } } = await supabase.auth.getUser();

        const formData: EventSubmissionForm = await request.json();

        // Validate required fields
        if (!formData.title || !formData.description || !formData.category ||
            !formData.start_datetime || !formData.organizer_name ||
            !formData.submitter_name || !formData.submitter_email) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Validate city if not online
        if (!formData.is_online && !formData.city) {
            return NextResponse.json(
                { error: 'City is required for in-person events' },
                { status: 400 }
            );
        }

        // Insert submission
        const { data, error } = await supabase
            .from('event_submissions')
            .insert({
                submitted_by: user?.id || null,
                submitter_email: formData.submitter_email,
                submitter_name: formData.submitter_name,
                submitter_organization: formData.submitter_organization,
                title: formData.title,
                description: formData.description,
                category: formData.category,
                start_datetime: formData.start_datetime,
                end_datetime: formData.end_datetime,
                city: formData.city || 'Online',
                venue: formData.venue,
                is_online: formData.is_online,
                registration_url: formData.registration_url,
                organizer_name: formData.organizer_name,
                organizer_contact: formData.organizer_contact,
                status: 'pending',
            })
            .select()
            .single();

        if (error) {
            console.error('Submission error:', error);
            return NextResponse.json(
                { error: 'Failed to submit event' },
                { status: 500 }
            );
        }

        // TODO: Send email notification to admins

        return NextResponse.json({
            success: true,
            submission: data,
        });

    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
