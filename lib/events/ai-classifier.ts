// AI-based Event Classifier using OpenAI
// Analyzes events and assigns category, relevance score, and tags

import OpenAI from 'openai';
import type { RawEvent, EventClassification, EventCategory } from '@/types/events';
import { API_CONFIG, AI_PROMPTS, CITY_ALIASES, INDIAN_CITIES } from './config';

const openai = API_CONFIG.openai.enabled
    ? new OpenAI({ apiKey: API_CONFIG.openai.apiKey })
    : null;

export async function classifyEvent(event: RawEvent): Promise<EventClassification> {
    if (!openai) {
        // Fallback to rule-based classification if OpenAI is not configured
        return fallbackClassification(event);
    }

    try {
        const eventSummary = `
Title: ${event.title}
Description: ${event.description?.substring(0, 500) || 'No description'}
Location: ${event.location?.city || 'Unknown'}, ${event.location?.venue || ''}
Online: ${event.is_online ? 'Yes' : 'No'}
Organizer: ${event.organizer_name || 'Unknown'}
    `.trim();

        const completion = await openai.chat.completions.create({
            model: API_CONFIG.openai.model,
            messages: [
                { role: 'system', content: AI_PROMPTS.classifyEvent },
                { role: 'user', content: eventSummary },
            ],
            temperature: 0.3, // Low temperature for consistent classification
            response_format: { type: 'json_object' },
        });

        const result = JSON.parse(completion.choices[0].message.content || '{}');

        return {
            category: result.category as EventCategory,
            senior_relevance_score: Math.max(0, Math.min(1, result.senior_relevance_score)),
            tags: result.tags || [],
            normalized_city: normalizeCity(result.normalized_city || event.location?.city || 'Unknown'),
            reasoning: result.reasoning,
        };
    } catch (error) {
        console.error('AI classification failed, using fallback:', error);
        return fallbackClassification(event);
    }
}

// Fallback rule-based classification when AI is unavailable
function fallbackClassification(event: RawEvent): EventClassification {
    const title = event.title.toLowerCase();
    const description = (event.description || '').toLowerCase();
    const text = `${title} ${description}`;

    // Determine category based on keywords
    let category: EventCategory = 'social_community'; // default
    let score = 0.5; // default relevance

    if (/yoga|fitness|exercise|gym|walk|aerobics/i.test(text)) {
        category = 'fitness';
        score = 0.85;
    } else if (/health|wellness|medical|doctor|nutrition|diet/i.test(text)) {
        category = 'health_wellness';
        score = 0.9;
    } else if (/spiritual|prayer|temple|meditation|bhajan|kirtan/i.test(text)) {
        category = 'spiritual';
        score = 0.88;
    } else if (/workshop|class|learning|education|seminar|training/i.test(text)) {
        category = 'learning';
        score = 0.75;
    } else if (/music|dance|art|theater|concert|classical/i.test(text)) {
        category = 'arts_culture';
        score = 0.8;
    } else if (/movie|film|entertainment/i.test(text)) {
        category = 'entertainment';
        score = 0.7;
    }

    if (event.is_online) {
        category = 'online_events';
        score = Math.min(score + 0.1, 1); // Slight boost for online events
    }

    // Extract tags
    const tags: string[] = [];
    const keywords = ['yoga', 'health', 'wellness', 'spiritual', 'music', 'dance', 'learning', 'fitness', 'senior'];
    keywords.forEach(keyword => {
        if (text.includes(keyword)) {
            tags.push(keyword);
        }
    });

    return {
        category,
        senior_relevance_score: score,
        tags: tags.slice(0, 5), // Limit to 5 tags
        normalized_city: normalizeCity(event.location?.city || 'Unknown'),
    };
}

// Normalize city names to standard format
export function normalizeCity(city: string): string {
    const cleaned = city.trim().toLowerCase();

    // Check aliases first
    if (CITY_ALIASES[cleaned]) {
        return CITY_ALIASES[cleaned];
    }

    // Find exact match in Indian cities (case-insensitive)
    const match = INDIAN_CITIES.find(c => c.toLowerCase() === cleaned);
    if (match) {
        return match;
    }

    // Capitalize first letter of each word
    return city
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

// Batch classify multiple events
export async function classifyEvents(events: RawEvent[]): Promise<Map<RawEvent, EventClassification>> {
    const results = new Map<RawEvent, EventClassification>();

    // Process in batches to avoid rate limits
    const batchSize = 10;
    for (let i = 0; i < events.length; i += batchSize) {
        const batch = events.slice(i, i + batchSize);
        const classifications = await Promise.all(
            batch.map(event => classifyEvent(event))
        );

        batch.forEach((event, index) => {
            results.set(event, classifications[index]);
        });

        // Small delay between batches
        if (i + batchSize < events.length) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    return results;
}
