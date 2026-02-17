// TypeScript interfaces for Senior Events System

export type EventCategory =
    | 'health_wellness'
    | 'spiritual'
    | 'social_community'
    | 'learning'
    | 'fitness'
    | 'online_events'
    | 'arts_culture'
    | 'entertainment';

export type EventSource =
    | 'meetup'
    | 'eventbrite'
    | 'bookmyshow'
    | 'paytm_insider'
    | 'manual';

export type SubmissionStatus = 'pending' | 'approved' | 'rejected';

export interface SeniorEvent {
    id: string;

    // Event Details
    title: string;
    description: string | null;
    category: EventCategory;

    // Date & Time
    start_datetime: string; // ISO 8601
    end_datetime: string | null;

    // Location
    city: string;
    venue: string | null;
    latitude: number | null;
    longitude: number | null;
    is_online: boolean;

    // Registration
    registration_url: string | null;
    organizer_name: string | null;
    organizer_contact: string | null;

    // Source & Quality
    source_platform: EventSource;
    senior_relevance_score: number | null; // 0-1

    // Moderation
    verified: boolean;
    approved: boolean;
    rejected: boolean;
    rejection_reason: string | null;

    // Metadata
    external_id: string | null;
    image_url: string | null;
    tags: string[] | null;

    created_at: string;
    updated_at: string;
}

export interface EventSubmission {
    id: string;

    // Submitter Info
    submitted_by: string | null;
    submitter_email: string | null;
    submitter_name: string | null;
    submitter_organization: string | null;

    // Event Details
    title: string;
    description: string | null;
    category: EventCategory;
    start_datetime: string;
    end_datetime: string | null;
    city: string;
    venue: string | null;
    is_online: boolean;
    registration_url: string | null;
    organizer_name: string | null;
    organizer_contact: string | null;

    // Moderation
    status: SubmissionStatus;
    reviewed_by: string | null;
    reviewed_at: string | null;
    rejection_reason: string | null;

    created_at: string;
}

export interface EventIngestionLog {
    id: string;
    source_platform: EventSource;
    status: 'success' | 'partial' | 'failed';

    events_fetched: number;
    events_processed: number;
    events_inserted: number;
    events_updated: number;
    events_rejected: number;

    error_message: string | null;
    execution_time_ms: number | null;
    created_at: string;
}

// Raw event data from external sources (before processing)
export interface RawEvent {
    title: string;
    description: string;
    start_datetime: string;
    end_datetime?: string;
    location?: {
        city?: string;
        venue?: string;
        latitude?: number;
        longitude?: number;
    };
    is_online: boolean;
    registration_url?: string;
    organizer_name?: string;
    organizer_contact?: string;
    external_id?: string;
    image_url?: string;
    source_platform: EventSource;
}

// AI Classification result
export interface EventClassification {
    category: EventCategory;
    senior_relevance_score: number; // 0-1
    tags: string[];
    normalized_city: string;
    reasoning?: string; // For debugging
}

// Event filter options for frontend
export interface EventFilters {
    city?: string;
    category?: EventCategory;
    is_online?: boolean;
    start_date?: string;
    end_date?: string;
    verified_only?: boolean;
}

// Pagination
export interface PaginatedEvents {
    events: SeniorEvent[];
    total: number;
    page: number;
    per_page: number;
    has_more: boolean;
}

// Event submission form data
export interface EventSubmissionForm {
    title: string;
    description: string;
    category: EventCategory;
    start_datetime: string;
    end_datetime?: string;
    city: string;
    venue?: string;
    is_online: boolean;
    registration_url?: string;
    organizer_name: string;
    organizer_contact?: string;
    submitter_name: string;
    submitter_email: string;
    submitter_organization?: string;
}
