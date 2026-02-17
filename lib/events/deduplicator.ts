// Duplicate Event Detection
// Uses title similarity, date matching, and location to detect duplicate events

import type { SeniorEvent, RawEvent } from '@/types/events';
import { INGESTION_CONFIG } from './config';

// Calculate Levenshtein distance between two strings
function levenshteinDistance(str1: string, str2: string): number {
    const len1 = str1.length;
    const len2 = str2.length;
    const matrix: number[][] = [];

    for (let i = 0; i <= len1; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= len2; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1, // deletion
                matrix[i][j - 1] + 1, // insertion
                matrix[i - 1][j - 1] + cost // substitution
            );
        }
    }

    return matrix[len1][len2];
}

// Calculate similarity score (0-1) between two strings
function stringSimilarity(str1: string, str2: string): number {
    const s1 = str1.toLowerCase().trim();
    const s2 = str2.toLowerCase().trim();

    if (s1 === s2) return 1;

    const maxLen = Math.max(s1.length, s2.length);
    if (maxLen === 0) return 1;

    const distance = levenshteinDistance(s1, s2);
    return 1 - distance / maxLen;
}

// Check if two dates are within a threshold (same day)
function datesMatch(date1: string | Date, date2: string | Date): boolean {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    );
}

// Check if two locations match
function locationsMatch(
    loc1: { city?: string; venue?: string } | undefined,
    loc2: { city?: string; venue?: string } | undefined
): boolean {
    if (!loc1 || !loc2) return false;

    const city1 = (loc1.city || '').toLowerCase().trim();
    const city2 = (loc2.city || '').toLowerCase().trim();

    if (city1 && city2 && city1 !== city2) {
        return false; // Different cities = not duplicate
    }

    // If venues are provided, check similarity
    if (loc1.venue && loc2.venue) {
        const venueSimilarity = stringSimilarity(loc1.venue, loc2.venue);
        return venueSimilarity > 0.7;
    }

    return true; // Same city, no venue info = might be duplicate
}

// Check if a raw event is a duplicate of an existing event
export function isDuplicate(
    rawEvent: RawEvent,
    existingEvent: SeniorEvent
): boolean {
    // Check title similarity
    const titleSimilarity = stringSimilarity(rawEvent.title, existingEvent.title);

    if (titleSimilarity < INGESTION_CONFIG.duplicateThreshold) {
        return false; // Titles too different
    }

    // Check if dates match
    if (!datesMatch(rawEvent.start_datetime, existingEvent.start_datetime)) {
        return false; // Different dates
    }

    // Check location
    const rawLocation = {
        city: rawEvent.location?.city,
        venue: rawEvent.location?.venue,
    };
    const existingLocation = {
        city: existingEvent.city,
        venue: existingEvent.venue || undefined,
    };

    if (!locationsMatch(rawLocation, existingLocation)) {
        return false; // Different locations
    }

    // If we get here, it's likely a duplicate
    return true;
}

// Find duplicates in a list of existing events
export function findDuplicates(
    rawEvent: RawEvent,
    existingEvents: SeniorEvent[]
): SeniorEvent[] {
    return existingEvents.filter(existing => isDuplicate(rawEvent, existing));
}

// Check if raw event matches by external ID
export function matchesByExternalId(
    rawEvent: RawEvent,
    existingEvents: SeniorEvent[]
): SeniorEvent | null {
    if (!rawEvent.external_id) return null;

    const match = existingEvents.find(
        e =>
            e.external_id === rawEvent.external_id &&
            e.source_platform === rawEvent.source_platform
    );

    return match || null;
}

// Deduplicate a batch of raw events against existing events
export function deduplicateBatch(
    rawEvents: RawEvent[],
    existingEvents: SeniorEvent[]
): {
    newEvents: RawEvent[];
    duplicates: Array<{ raw: RawEvent; existing: SeniorEvent }>;
    updates: Array<{ raw: RawEvent; existing: SeniorEvent }>;
} {
    const newEvents: RawEvent[] = [];
    const duplicates: Array<{ raw: RawEvent; existing: SeniorEvent }> = [];
    const updates: Array<{ raw: RawEvent; existing: SeniorEvent }> = [];

    for (const rawEvent of rawEvents) {
        // First check by external ID (exact match)
        const externalMatch = matchesByExternalId(rawEvent, existingEvents);

        if (externalMatch) {
            // Check if event details have changed (update needed)
            const titleChanged = rawEvent.title !== externalMatch.title;
            const descChanged = rawEvent.description !== externalMatch.description;
            const dateChanged = !datesMatch(rawEvent.start_datetime, externalMatch.start_datetime);

            if (titleChanged || descChanged || dateChanged) {
                updates.push({ raw: rawEvent, existing: externalMatch });
            } else {
                duplicates.push({ raw: rawEvent, existing: externalMatch });
            }
            continue;
        }

        // Check for fuzzy duplicates
        const fuzzyDuplicates = findDuplicates(rawEvent, existingEvents);

        if (fuzzyDuplicates.length > 0) {
            duplicates.push({ raw: rawEvent, existing: fuzzyDuplicates[0] });
        } else {
            newEvents.push(rawEvent);
        }
    }

    return { newEvents, duplicates, updates };
}

// Remove duplicates within a batch of raw events
export function deduplicateWithinBatch(rawEvents: RawEvent[]): RawEvent[] {
    const unique: RawEvent[] = [];
    const seen = new Set<string>();

    for (const event of rawEvents) {
        // Create a fingerprint for the event
        const fingerprint = `${event.title.toLowerCase()}_${new Date(event.start_datetime).toISOString().split('T')[0]}_${event.location?.city?.toLowerCase() || 'online'}`;

        if (!seen.has(fingerprint)) {
            seen.add(fingerprint);
            unique.push(event);
        }
    }

    return unique;
}
