// API Route: Event Ingestion Endpoint
// Triggers the event ingestion process (called by cron or manually)

import { NextRequest, NextResponse } from 'next/server';
import { ingestAllEvents } from '@/lib/events/ingest-orchestrator';
import { CRON_CONFIG } from '@/lib/events/config';

export async function POST(request: NextRequest) {
    try {
        // Verify cron secret for security
        const authHeader = request.headers.get('authorization');
        const secret = authHeader?.replace('Bearer ', '');

        if (secret !== CRON_CONFIG.secret) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        console.log('🎯 Event ingestion triggered');

        // Run ingestion
        const result = await ingestAllEvents();

        return NextResponse.json({
            success: result.success,
            stats: result.stats,
            logs: result.logs,
            errors: result.errors,
            timestamp: new Date().toISOString(),
        });

    } catch (error) {
        console.error('Ingestion API error:', error);

        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
                timestamp: new Date().toISOString(),
            },
            { status: 500 }
        );
    }
}

// Allow GET for manual testing (remove in production)
export async function GET(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get('secret');

    if (secret !== CRON_CONFIG.secret) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        );
    }

    return POST(request);
}
