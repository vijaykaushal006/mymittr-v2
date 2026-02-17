// Eventbrite API Integration
// Fetches events from Eventbrite relevant to senior citizens in India

import type { RawEvent } from '@/types/events';
import { API_CONFIG, INDIAN_CITIES, INGESTION_CONFIG } from '../config';

interface EventbriteEvent {
    id: string;
    name: {
        text: string;
    };
    description: {
        text?: string;
    };
    start: {
        utc: string;
        timezone: string;
    };
    end: {
        utc: string;
        timezone: string;
    };
    venue?: {
        name?: string;
        address?: {
            city?: string;
            latitude?: string;
            longitude?: string;
        };
    };
    online_event: boolean;
    url: string;
    organizer?: {
        name?: string;
    };
    logo?: {
        url?: string;
    };
}

export async function fetchEventbriteEvents(): Promise<RawEvent[]> {
    if (!API_CONFIG.eventbrite.enabled) {
        console.log('Eventbrite API not configured, skipping');
        return [];
    }

    const events: RawEvent[] = [];

    try {
        // Fetch events for major Indian cities
        const cities = INDIAN_CITIES.slice(0, 10); // Top 10 cities

        for (const city of cities) {
            const cityEvents = await fetchEventbriteEventsByCity(city);
            events.push(...cityEvents);

            // Rate limiting
            await new Promise(resolve => setTimeout(resolve, INGESTION_CONFIG.rateLimitMs));
        }

        // Fetch online events
        const onlineEvents = await fetchEventbriteOnlineEvents();
        events.push(...onlineEvents);

        console.log(`Fetched ${events.length} events from Eventbrite`);
        return events;
    } catch (error) {
        console.error('Error fetching Eventbrite events:', error);
        return events; // Return partial results
    }
}

async function fetchEventbriteEventsByCity(city: string): Promise<RawEvent[]> {
    try {
        const url = new URL(`${API_CONFIG.eventbrite.baseUrl}/events/search/`);
        url.searchParams.append('q', 'senior OR elderly OR retirement OR wellness');
        url.searchParams.append('location.address', `${city}, India`);
        url.searchParams.append('location.within', '25km');
        url.searchParams.append('expand', 'venue,organizer');
        url.searchParams.append('page_size', '50');

        const response = await fetch(url.toString(), {
            headers: {
                'Authorization': `Bearer ${API_CONFIG.eventbrite.apiKey}`,
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Eventbrite API error: ${response.status}`);
        }

        const data = await response.json();
        const eventbriteEvents: EventbriteEvent[] = data.events || [];

        return eventbriteEvents.map(event => convertEventbriteEvent(event, city));
    } catch (error) {
        console.error(`Error fetching Eventbrite events for ${city}:`, error);
        return [];
    }
}

async function fetchEventbriteOnlineEvents(): Promise<RawEvent[]> {
    try {
        const url = new URL(`${API_CONFIG.eventbrite.baseUrl}/events/search/`);
        url.searchParams.append('q', 'senior OR elderly OR retirement OR wellness');
        url.searchParams.append('online_events_only', 'true');
        url.searchParams.append('expand', 'organizer');
        url.searchParams.append('page_size', '50');

        const response = await fetch(url.toString(), {
            headers: {
                'Authorization': `Bearer ${API_CONFIG.eventbrite.apiKey}`,
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Eventbrite API error: ${response.status}`);
        }

        const data = await response.json();
        const eventbriteEvents: EventbriteEvent[] = data.events || [];

        return eventbriteEvents.map(event => convertEventbriteEvent(event, 'Online'));
    } catch (error) {
        console.error('Error fetching online Eventbrite events:', error);
        return [];
    }
}

function convertEventbriteEvent(event: EventbriteEvent, defaultCity: string): RawEvent {
    return {
        title: event.name.text,
        description: event.description.text || '',
        start_datetime: event.start.utc,
        end_datetime: event.end.utc,
        location: {
            city: event.venue?.address?.city || defaultCity,
            venue: event.venue?.name,
            latitude: event.venue?.address?.latitude
                ? parseFloat(event.venue.address.latitude)
                : undefined,
            longitude: event.venue?.address?.longitude
                ? parseFloat(event.venue.address.longitude)
                : undefined,
        },
        is_online: event.online_event,
        registration_url: event.url,
        organizer_name: event.organizer?.name,
        external_id: event.id,
        image_url: event.logo?.url,
        source_platform: 'eventbrite',
    };
}
