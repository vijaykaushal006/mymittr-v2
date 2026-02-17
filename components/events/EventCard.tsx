// EventCard Component
// Senior-friendly event card with large text, high contrast, and clear CTAs

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import type { SeniorEvent } from '@/types/events';
import { CATEGORY_CONFIG } from '@/lib/events/config';

interface EventCardProps {
    event: SeniorEvent;
}

export default function EventCard({ event }: EventCardProps) {
    const categoryInfo = CATEGORY_CONFIG[event.category];
    const eventDate = new Date(event.start_datetime);
    const formattedDate = format(eventDate, 'dd MMM yyyy');
    const formattedTime = format(eventDate, 'h:mm a');

    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border-2 border-gray-100">
            {/* Event Image */}
            {event.image_url && (
                <div className="relative h-48 w-full bg-gray-200">
                    <Image
                        src={event.image_url}
                        alt={event.title}
                        fill
                        className="object-cover"
                    />
                </div>
            )}

            <div className="p-6">
                {/* Category Badge */}
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-3xl">{categoryInfo.icon}</span>
                    <span className="px-3 py-1 bg-[#1e4d45] text-white text-sm font-semibold rounded-full">
                        {categoryInfo.label}
                    </span>
                    {event.verified && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full flex items-center gap-1">
                            ✓ Verified
                        </span>
                    )}
                    {event.is_online && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                            💻 Online
                        </span>
                    )}
                </div>

                {/* Event Title - Large and Bold */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                    {event.title}
                </h3>

                {/* Date & Time - Very Prominent */}
                <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 mb-4">
                    <div className="flex items-center gap-3">
                        <span className="text-4xl">📅</span>
                        <div>
                            <p className="text-xl font-bold text-gray-900">{formattedDate}</p>
                            <p className="text-lg text-gray-700">{formattedTime}</p>
                        </div>
                    </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3 mb-4">
                    <span className="text-2xl mt-1">📍</span>
                    <div>
                        <p className="text-lg font-semibold text-gray-900">{event.city}</p>
                        {event.venue && (
                            <p className="text-base text-gray-600">{event.venue}</p>
                        )}
                    </div>
                </div>

                {/* Organizer */}
                {event.organizer_name && (
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl">👥</span>
                        <p className="text-base text-gray-700">
                            By <span className="font-semibold">{event.organizer_name}</span>
                        </p>
                    </div>
                )}

                {/* Description - Truncated */}
                {event.description && (
                    <p className="text-base text-gray-600 mb-4 line-clamp-3">
                        {event.description}
                    </p>
                )}

                {/* Source Badge */}
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm text-gray-500">Source:</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                        {event.source_platform.replace('_', ' ').toUpperCase()}
                    </span>
                </div>

                {/* Register Button - Large and Clear */}
                {event.registration_url ? (
                    <a
                        href={event.registration_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-[#1e4d45] hover:bg-[#153a33] text-white text-xl font-bold py-4 px-6 rounded-xl text-center transition-colors duration-200"
                    >
                        Register Now →
                    </a>
                ) : (
                    <div className="block w-full bg-gray-200 text-gray-500 text-xl font-bold py-4 px-6 rounded-xl text-center">
                        No Registration Link
                    </div>
                )}

                {/* External Link Disclaimer */}
                {event.registration_url && (
                    <p className="text-xs text-gray-500 text-center mt-2">
                        ⚠️ External link - opens in new tab
                    </p>
                )}
            </div>
        </div>
    );
}
