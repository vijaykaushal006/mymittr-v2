// EventFilters Component
// Simple, large filters for city, category, date, and online/offline

'use client';

import { useState } from 'react';
import type { EventCategory, EventFilters as Filters } from '@/types/events';
import { CATEGORY_CONFIG, INDIAN_CITIES } from '@/lib/events/config';

interface EventFiltersProps {
    onFilterChange: (filters: Filters) => void;
    initialFilters?: Filters;
}

export default function EventFilters({ onFilterChange, initialFilters = {} }: EventFiltersProps) {
    const [filters, setFilters] = useState<Filters>(initialFilters);

    const handleFilterChange = (key: keyof Filters, value: any) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const clearFilters = () => {
        setFilters({});
        onFilterChange({});
    };

    const hasActiveFilters = Object.keys(filters).length > 0;

    return (
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Filter Events</h2>
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="text-[#1e4d45] hover:text-[#153a33] font-semibold text-lg"
                    >
                        Clear All
                    </button>
                )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* City Filter */}
                <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                        📍 City
                    </label>
                    <select
                        value={filters.city || ''}
                        onChange={(e) => handleFilterChange('city', e.target.value || undefined)}
                        className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e4d45] focus:border-transparent"
                    >
                        <option value="">All Cities</option>
                        {INDIAN_CITIES.slice(0, 20).map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>

                {/* Category Filter */}
                <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                        🏷️ Category
                    </label>
                    <select
                        value={filters.category || ''}
                        onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
                        className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e4d45] focus:border-transparent"
                    >
                        <option value="">All Categories</option>
                        {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                            <option key={key} value={key}>
                                {config.icon} {config.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Online/Offline Filter */}
                <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                        💻 Event Type
                    </label>
                    <select
                        value={filters.is_online === undefined ? '' : filters.is_online ? 'online' : 'offline'}
                        onChange={(e) => {
                            const value = e.target.value;
                            handleFilterChange('is_online', value === '' ? undefined : value === 'online');
                        }}
                        className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e4d45] focus:border-transparent"
                    >
                        <option value="">All Events</option>
                        <option value="online">Online Only</option>
                        <option value="offline">In-Person Only</option>
                    </select>
                </div>

                {/* Verified Only Filter */}
                <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                        ✓ Verification
                    </label>
                    <select
                        value={filters.verified_only ? 'verified' : ''}
                        onChange={(e) => handleFilterChange('verified_only', e.target.value === 'verified')}
                        className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e4d45] focus:border-transparent"
                    >
                        <option value="">All Events</option>
                        <option value="verified">Verified Only</option>
                    </select>
                </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
                <div className="mt-6 pt-6 border-t-2 border-gray-200">
                    <p className="text-base text-gray-600 mb-3">Active Filters:</p>
                    <div className="flex flex-wrap gap-2">
                        {filters.city && (
                            <span className="px-4 py-2 bg-[#1e4d45] text-white rounded-full text-base font-semibold">
                                📍 {filters.city}
                            </span>
                        )}
                        {filters.category && (
                            <span className="px-4 py-2 bg-[#1e4d45] text-white rounded-full text-base font-semibold">
                                {CATEGORY_CONFIG[filters.category].icon} {CATEGORY_CONFIG[filters.category].label}
                            </span>
                        )}
                        {filters.is_online !== undefined && (
                            <span className="px-4 py-2 bg-[#1e4d45] text-white rounded-full text-base font-semibold">
                                {filters.is_online ? '💻 Online' : '🏢 In-Person'}
                            </span>
                        )}
                        {filters.verified_only && (
                            <span className="px-4 py-2 bg-[#1e4d45] text-white rounded-full text-base font-semibold">
                                ✓ Verified
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
