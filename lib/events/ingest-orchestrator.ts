// Event Ingestion Orchestrator
// Coordinates all event sources, processes events, and stores them in database

import { createClient } from '@/lib/supabaseServer';
import type { RawEvent, SeniorEvent, EventIngestionLog } from '@/types/events';
import { fetchMeetupEvents } from './sources/meetup';
import { fetchEventbriteEvents } from './sources/eventbrite';
// Disabled: Playwright scrapers causing module errors
// import { scrapeBookMyShowEvents } from './sources/scrapers/bookmyshow';
// import { scrapePaytmInsiderEvents } from './sources/scrapers/paytm-insider';
import { classifyEvents } from './ai-classifier';
import { deduplicateBatch, deduplicateWithinBatch } from './deduplicator';
import { INGESTION_CONFIG } from './config';

export interface IngestionResult {
    success: boolean;
    stats: {
        total_fetched: number;
        total_processed: number;
        new_events: number;
        updated_events: number;
        rejected_events: number;
        errors: number;
    };
    logs: EventIngestionLog[];
    errors: string[];
}

export async function ingestAllEvents(): Promise<IngestionResult> {
    const startTime = Date.now();
    const result: IngestionResult = {
        success: true,
        stats: {
            total_fetched: 0,
            total_processed: 0,
            new_events: 0,
            updated_events: 0,
            rejected_events: 0,
            errors: 0,
        },
        logs: [],
        errors: [],
    };

    console.log('🚀 Starting event ingestion...');

    // Fetch from all sources
    // Note: Scrapers disabled due to Playwright dependencies
    const sources = [
        { name: 'meetup', fetch: fetchMeetupEvents },
        { name: 'eventbrite', fetch: fetchEventbriteEvents },
        // { name: 'bookmyshow', fetch: scrapeBookMyShowEvents },
        // { name: 'paytm_insider', fetch: scrapePaytmInsiderEvents },
    ];

    for (const source of sources) {
        try {
            console.log(`📥 Fetching from ${source.name}...`);
            const sourceStartTime = Date.now();

            const rawEvents = await source.fetch();
            const executionTime = Date.now() - sourceStartTime;

            if (rawEvents.length === 0) {
                console.log(`⚠️  No events fetched from ${source.name}`);
                result.logs.push(await createIngestionLog(source.name, 'success', 0, 0, 0, 0, 0, null, executionTime));
                continue;
            }

            console.log(`✅ Fetched ${rawEvents.length} events from ${source.name}`);
            result.stats.total_fetched += rawEvents.length;

            // Process events from this source
            const sourceResult = await processEvents(rawEvents);

            result.stats.total_processed += sourceResult.processed;
            result.stats.new_events += sourceResult.inserted;
            result.stats.updated_events += sourceResult.updated;
            result.stats.rejected_events += sourceResult.rejected;

            // Create log entry
            const logStatus = sourceResult.errors > 0 ? 'partial' : 'success';
            result.logs.push(
                await createIngestionLog(
                    source.name,
                    logStatus,
                    rawEvents.length,
                    sourceResult.processed,
                    sourceResult.inserted,
                    sourceResult.updated,
                    sourceResult.rejected,
                    sourceResult.errors > 0 ? `${sourceResult.errors} errors occurred` : null,
                    executionTime
                )
            );

        } catch (error) {
            console.error(`❌ Error fetching from ${source.name}:`, error);
            result.stats.errors++;
            result.errors.push(`${source.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);

            result.logs.push(
                await createIngestionLog(
                    source.name,
                    'failed',
                    0,
                    0,
                    0,
                    0,
                    0,
                    error instanceof Error ? error.message : 'Unknown error',
                    Date.now() - startTime
                )
            );
        }
    }

    // Cleanup expired events
    await cleanupExpiredEvents();

    const totalTime = Date.now() - startTime;
    console.log(`✨ Ingestion complete in ${totalTime}ms`);
    console.log(`📊 Stats:`, result.stats);

    result.success = result.stats.errors === 0;
    return result;
}

async function processEvents(rawEvents: RawEvent[]): Promise<{
    processed: number;
    inserted: number;
    updated: number;
    rejected: number;
    errors: number;
}> {
    const stats = {
        processed: 0,
        inserted: 0,
        updated: 0,
        rejected: 0,
        errors: 0,
    };

    try {
        // Step 1: Remove duplicates within the batch
        const uniqueEvents = deduplicateWithinBatch(rawEvents);
        console.log(`🔍 Deduplicated: ${rawEvents.length} → ${uniqueEvents.length} unique events`);

        // Step 2: Classify events with AI
        console.log('🤖 Classifying events with AI...');
        const classifications = await classifyEvents(uniqueEvents);

        // Step 3: Filter by relevance score
        const relevantEvents = uniqueEvents.filter(event => {
            const classification = classifications.get(event);
            return classification && classification.senior_relevance_score >= INGESTION_CONFIG.minRelevanceScore;
        });

        console.log(`✅ Filtered: ${uniqueEvents.length} → ${relevantEvents.length} relevant events`);
        stats.rejected = uniqueEvents.length - relevantEvents.length;

        // Step 4: Get existing events for deduplication
        const supabase = await createClient();
        const { data: existingEvents } = await supabase
            .from('senior_events')
            .select('*')
            .gte('start_datetime', new Date().toISOString())
            .returns<SeniorEvent[]>();

        // Step 5: Deduplicate against existing events
        const { newEvents, updates } = deduplicateBatch(relevantEvents, existingEvents || []);

        console.log(`📝 New: ${newEvents.length}, Updates: ${updates.length}`);

        // Step 6: Insert new events
        for (const rawEvent of newEvents) {
            try {
                const classification = classifications.get(rawEvent)!;

                const { error } = await supabase.from('senior_events').insert({
                    title: rawEvent.title,
                    description: rawEvent.description,
                    category: classification.category,
                    start_datetime: rawEvent.start_datetime,
                    end_datetime: rawEvent.end_datetime,
                    city: classification.normalized_city,
                    venue: rawEvent.location?.venue,
                    latitude: rawEvent.location?.latitude,
                    longitude: rawEvent.location?.longitude,
                    is_online: rawEvent.is_online,
                    registration_url: rawEvent.registration_url,
                    organizer_name: rawEvent.organizer_name,
                    organizer_contact: rawEvent.organizer_contact,
                    source_platform: rawEvent.source_platform,
                    senior_relevance_score: classification.senior_relevance_score,
                    external_id: rawEvent.external_id,
                    image_url: rawEvent.image_url,
                    tags: classification.tags,
                    verified: false,
                    approved: classification.senior_relevance_score >= INGESTION_CONFIG.autoApproveScore,
                });

                if (error) {
                    console.error('Insert error:', error);
                    stats.errors++;
                } else {
                    stats.inserted++;
                }
            } catch (error) {
                console.error('Error inserting event:', error);
                stats.errors++;
            }
        }

        // Step 7: Update changed events
        for (const { raw, existing } of updates) {
            try {
                const classification = classifications.get(raw)!;

                const { error } = await supabase
                    .from('senior_events')
                    .update({
                        title: raw.title,
                        description: raw.description,
                        category: classification.category,
                        start_datetime: raw.start_datetime,
                        end_datetime: raw.end_datetime,
                        senior_relevance_score: classification.senior_relevance_score,
                        tags: classification.tags,
                    })
                    .eq('id', existing.id);

                if (error) {
                    console.error('Update error:', error);
                    stats.errors++;
                } else {
                    stats.updated++;
                }
            } catch (error) {
                console.error('Error updating event:', error);
                stats.errors++;
            }
        }

        stats.processed = relevantEvents.length;
        return stats;

    } catch (error) {
        console.error('Error processing events:', error);
        stats.errors++;
        return stats;
    }
}

async function createIngestionLog(
    source_platform: string,
    status: 'success' | 'partial' | 'failed',
    fetched: number,
    processed: number,
    inserted: number,
    updated: number,
    rejected: number,
    error_message: string | null,
    execution_time_ms: number
): Promise<EventIngestionLog> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('event_ingestion_logs')
        .insert({
            source_platform,
            status,
            events_fetched: fetched,
            events_processed: processed,
            events_inserted: inserted,
            events_updated: updated,
            events_rejected: rejected,
            error_message,
            execution_time_ms,
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating ingestion log:', error);
    }

    return data as EventIngestionLog;
}

async function cleanupExpiredEvents(): Promise<number> {
    try {
        const supabase = await createClient();

        // Call the cleanup function from database
        const { data, error } = await supabase.rpc('cleanup_expired_events');

        if (error) {
            console.error('Error cleaning up expired events:', error);
            return 0;
        }

        console.log(`🗑️  Cleaned up ${data} expired events`);
        return data;
    } catch (error) {
        console.error('Cleanup error:', error);
        return 0;
    }
}
