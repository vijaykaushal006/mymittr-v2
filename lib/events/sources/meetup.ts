// Meetup API Integration
// Fetches events from Meetup.com relevant to senior citizens

import type { RawEvent } from '@/types/events';
import { API_CONFIG, INDIAN_CITIES, INGESTION_CONFIG } from '../config';

interface MeetupEvent {
    id: string;
    name: string;
    description?: string;
    time: number; // Unix timestamp in milliseconds
    duration?: number;
    venue?: {
        name?: string;
        city?: string;
        lat?: number;
        lon?: number;
    };
    link: string;
    group?: {
        name?: string;
    };
    is_online_event?: boolean;
    featured_photo?: {
        photo_link?: string;
    };
}

export async function fetchMeetupEvents(): Promise<RawEvent[]> {
    if (!API_CONFIG.meetup.enabled) {
        console.log('Meetup API not configured, skipping');
        return [];
    }

    const events: RawEvent[] = [];

    try {
        // Fetch events for major Indian cities
        const cities = INDIAN_CITIES.slice(0, 10); // Top 10 cities

        for (const city of cities) {
            const cityEvents = await fetchMeetupEventsByCity(city);
            events.push(...cityEvents);

            // Rate limiting
            await new Promise(resolve => setTimeout(resolve, INGESTION_CONFIG.rateLimitMs));
        }

        // Also fetch online events
        const onlineEvents = await fetchMeetupOnlineEvents();
        events.push(...onlineEvents);

        console.log(`Fetched ${events.length} events from Meetup`);
        return events;
    } catch (error) {
        console.error('Error fetching Meetup events:', error);
        return events; // Return partial results
    }
}

async function fetchMeetupEventsByCity(city: string): Promise<RawEvent[]> {
    try {
        // Meetup API v3 endpoint
        const url = new URL(`${API_CONFIG.meetup.baseUrl}/find/upcoming_events`);
        url.searchParams.append('key', API_CONFIG.meetup.apiKey);
        url.searchParams.append('text', 'senior OR elderly OR retirement OR 60+');
        url.searchParams.append('lat', getCityCoordinates(city).lat.toString());
        url.searchParams.append('lon', getCityCoordinates(city).lon.toString());
        url.searchParams.append('radius', '25'); // 25 miles
        url.searchParams.append('page', '50');

        const response = await fetch(url.toString(), {
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Meetup API error: ${response.status}`);
        }

        const data = await response.json();
        const meetupEvents: MeetupEvent[] = data.events || [];

        return meetupEvents.map(event => convertMeetupEvent(event, city));
    } catch (error) {
        console.error(`Error fetching Meetup events for ${city}:`, error);
        return [];
    }
}

async function fetchMeetupOnlineEvents(): Promise<RawEvent[]> {
    try {
        const url = new URL(`${API_CONFIG.meetup.baseUrl}/find/upcoming_events`);
        url.searchParams.append('key', API_CONFIG.meetup.apiKey);
        url.searchParams.append('text', 'senior OR elderly OR retirement OR 60+');
        url.searchParams.append('is_online_event', 'true');
        url.searchParams.append('page', '50');

        const response = await fetch(url.toString(), {
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Meetup API error: ${response.status}`);
        }

        const data = await response.json();
        const meetupEvents: MeetupEvent[] = data.events || [];

        return meetupEvents.map(event => convertMeetupEvent(event, 'Online'));
    } catch (error) {
        console.error('Error fetching online Meetup events:', error);
        return [];
    }
}

function convertMeetupEvent(event: MeetupEvent, defaultCity: string): RawEvent {
    return {
        title: event.name,
        description: event.description || '',
        start_datetime: new Date(event.time).toISOString(),
        end_datetime: event.duration
            ? new Date(event.time + event.duration).toISOString()
            : undefined,
        location: {
            city: event.venue?.city || defaultCity,
            venue: event.venue?.name,
            latitude: event.venue?.lat,
            longitude: event.venue?.lon,
        },
        is_online: event.is_online_event || false,
        registration_url: event.link,
        organizer_name: event.group?.name,
        external_id: event.id,
        image_url: event.featured_photo?.photo_link,
        source_platform: 'meetup',
    };
}

// Approximate coordinates for major Indian cities
function getCityCoordinates(city: string): { lat: number; lon: number } {
    const coordinates: Record<string, { lat: number; lon: number }> = {
        'Mumbai': { lat: 19.0760, lon: 72.8777 },
        'Delhi': { lat: 28.7041, lon: 77.1025 },
        'Bangalore': { lat: 12.9716, lon: 77.5946 },
        'Chennai': { lat: 13.0827, lon: 80.2707 },
        'Kolkata': { lat: 22.5726, lon: 88.3639 },
        'Pune': { lat: 18.5204, lon: 73.8567 },
        'Hyderabad': { lat: 17.3850, lon: 78.4867 },
        'Ahmedabad': { lat: 23.0225, lon: 72.5714 },
        'Jaipur': { lat: 26.9124, lon: 75.7873 },
        'Surat': { lat: 21.1702, lon: 72.8311 },
    };

    return coordinates[city] || { lat: 28.7041, lon: 77.1025 }; // Default to Delhi
}
