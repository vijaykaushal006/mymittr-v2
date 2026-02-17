// Configuration for Senior Events Aggregation System

import type { EventCategory } from '@/types/events';

// ============================================================================
// API CONFIGURATION
// ============================================================================

export const API_CONFIG = {
    meetup: {
        baseUrl: 'https://api.meetup.com',
        apiKey: process.env.MEETUP_API_KEY || '',
        enabled: !!process.env.MEETUP_API_KEY,
    },
    eventbrite: {
        baseUrl: 'https://www.eventbriteapi.com/v3',
        apiKey: process.env.EVENTBRITE_API_KEY || '',
        enabled: !!process.env.EVENTBRITE_API_KEY,
    },
    openai: {
        apiKey: process.env.OPENAI_API_KEY || '',
        model: 'gpt-4o-mini', // Cost-effective for classification
        enabled: !!process.env.OPENAI_API_KEY,
    },
};

// ============================================================================
// SCRAPING CONFIGURATION
// ============================================================================

export const SCRAPING_CONFIG = {
    bookmyshow: {
        baseUrl: 'https://in.bookmyshow.com',
        cities: ['mumbai', 'delhi', 'bangalore', 'chennai', 'kolkata', 'pune', 'hyderabad'],
        enabled: true,
        rateLimit: 2000, // ms between requests
    },
    paytmInsider: {
        baseUrl: 'https://insider.in',
        cities: ['mumbai', 'delhi', 'bangalore', 'chennai', 'kolkata', 'pune', 'hyderabad'],
        enabled: true,
        rateLimit: 2000,
    },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    timeout: 30000, // 30 seconds
};

// ============================================================================
// EVENT CATEGORIES
// ============================================================================

export const CATEGORY_CONFIG: Record<EventCategory, {
    label: string;
    description: string;
    keywords: string[];
    icon: string;
}> = {
    health_wellness: {
        label: 'Health & Wellness',
        description: 'Health checkups, wellness programs, nutrition workshops',
        keywords: ['health', 'wellness', 'nutrition', 'diet', 'checkup', 'medical', 'doctor', 'therapy'],
        icon: '🏥',
    },
    spiritual: {
        label: 'Spiritual & Religious',
        description: 'Prayer meetings, spiritual talks, temple visits',
        keywords: ['spiritual', 'prayer', 'temple', 'church', 'mosque', 'meditation', 'bhajan', 'kirtan'],
        icon: '🕉️',
    },
    social_community: {
        label: 'Social & Community',
        description: 'Community gatherings, social meetups, celebrations',
        keywords: ['community', 'social', 'meetup', 'gathering', 'celebration', 'festival', 'party'],
        icon: '👥',
    },
    learning: {
        label: 'Learning & Education',
        description: 'Workshops, classes, skill development programs',
        keywords: ['workshop', 'class', 'learning', 'education', 'skill', 'training', 'course', 'seminar'],
        icon: '📚',
    },
    fitness: {
        label: 'Fitness & Exercise',
        description: 'Yoga, walking groups, fitness classes',
        keywords: ['yoga', 'exercise', 'fitness', 'walking', 'gym', 'aerobics', 'zumba', 'dance'],
        icon: '🧘',
    },
    online_events: {
        label: 'Online Events',
        description: 'Virtual events, webinars, online classes',
        keywords: ['online', 'virtual', 'webinar', 'zoom', 'digital', 'remote'],
        icon: '💻',
    },
    arts_culture: {
        label: 'Arts & Culture',
        description: 'Music, dance, theater, art exhibitions',
        keywords: ['music', 'dance', 'theater', 'art', 'exhibition', 'concert', 'performance', 'classical'],
        icon: '🎭',
    },
    entertainment: {
        label: 'Entertainment',
        description: 'Movies, shows, recreational activities',
        keywords: ['movie', 'film', 'show', 'entertainment', 'recreation', 'fun', 'leisure'],
        icon: '🎬',
    },
};

// ============================================================================
// INDIAN CITIES
// ============================================================================

export const INDIAN_CITIES = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Bengaluru',
    'Chennai',
    'Kolkata',
    'Pune',
    'Hyderabad',
    'Ahmedabad',
    'Jaipur',
    'Surat',
    'Lucknow',
    'Kanpur',
    'Nagpur',
    'Indore',
    'Thane',
    'Bhopal',
    'Visakhapatnam',
    'Pimpri-Chinchwad',
    'Patna',
    'Vadodara',
    'Ghaziabad',
    'Ludhiana',
    'Agra',
    'Nashik',
    'Faridabad',
    'Meerut',
    'Rajkot',
    'Varanasi',
    'Srinagar',
    'Aurangabad',
    'Dhanbad',
    'Amritsar',
    'Navi Mumbai',
    'Allahabad',
    'Ranchi',
    'Howrah',
    'Coimbatore',
    'Jabalpur',
    'Gwalior',
    'Vijayawada',
    'Jodhpur',
    'Madurai',
    'Raipur',
    'Kota',
];

// City aliases for normalization
export const CITY_ALIASES: Record<string, string> = {
    'bengaluru': 'Bangalore',
    'bombay': 'Mumbai',
    'calcutta': 'Kolkata',
    'new delhi': 'Delhi',
    'ncr': 'Delhi',
    'gurugram': 'Gurgaon',
    'noida': 'Delhi',
};

// ============================================================================
// AI PROMPTS
// ============================================================================

export const AI_PROMPTS = {
    classifyEvent: `You are an AI assistant helping classify events for a senior citizen platform in India.

Given an event, analyze it and provide:
1. Category (one of: health_wellness, spiritual, social_community, learning, fitness, online_events, arts_culture, entertainment)
2. Senior relevance score (0-1, where 1 is highly relevant to seniors aged 60+)
3. Tags (relevant keywords)
4. Normalized city name (standardized Indian city name)

Consider these factors for senior relevance:
- Physical accessibility (gentle activities preferred)
- Timing (morning/afternoon preferred over late night)
- Safety and trust (verified organizers)
- Social engagement opportunities
- Health benefits
- Cultural relevance to Indian seniors

Respond ONLY with valid JSON in this format:
{
  "category": "health_wellness",
  "senior_relevance_score": 0.85,
  "tags": ["yoga", "wellness", "morning"],
  "normalized_city": "Mumbai",
  "reasoning": "Brief explanation"
}`,
};

// ============================================================================
// INGESTION SETTINGS
// ============================================================================

export const INGESTION_CONFIG = {
    // Minimum relevance score to accept events
    minRelevanceScore: 0.6,

    // Auto-approve threshold
    autoApproveScore: 0.8,

    // Batch size for processing
    batchSize: 50,

    // How far in the future to fetch events (days)
    futureEventWindow: 90,

    // How long to keep past events (days)
    pastEventRetention: 7,

    // Duplicate detection threshold (0-1, Levenshtein similarity)
    duplicateThreshold: 0.85,

    // Rate limiting
    rateLimitMs: 1000,

    // Retry settings
    maxRetries: 3,
    retryDelayMs: 2000,
};

// ============================================================================
// CRON SETTINGS
// ============================================================================

export const CRON_CONFIG = {
    // Cron secret for authentication
    secret: process.env.CRON_SECRET || 'change-me-in-production',

    // Schedule (every 6 hours)
    schedule: '0 */6 * * *',

    // Timezone
    timezone: 'Asia/Kolkata',
};

// ============================================================================
// UI SETTINGS
// ============================================================================

export const UI_CONFIG = {
    // Events per page
    eventsPerPage: 20,

    // Featured events count
    featuredCount: 6,

    // Date format for display
    dateFormat: 'dd MMM yyyy, h:mm a',

    // Default city (if geolocation fails)
    defaultCity: 'Mumbai',
};
