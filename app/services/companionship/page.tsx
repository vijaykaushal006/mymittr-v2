// Companionship Page - Event Discovery for Seniors
// Redesigned with senior-friendly UI and event aggregation system

'use client';

import { useState, useEffect } from 'react';
import EventCard from '@/components/events/EventCard';
import EventFilters from '@/components/events/EventFilters';
import SubmitEventForm from '@/components/events/SubmitEventForm';
import type { SeniorEvent, EventFilters as Filters } from '@/types/events';
import { fetchEvents, getFeaturedEvents } from '@/app/actions/events';

export default function CompanionshipPage() {
  const [featuredEvents, setFeaturedEvents] = useState<SeniorEvent[]>([]);
  const [events, setEvents] = useState<SeniorEvent[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  // Load featured events on mount
  useEffect(() => {
    loadFeaturedEvents();
  }, []);

  // Load events when filters change
  useEffect(() => {
    loadEvents();
  }, [filters, page]);

  const loadFeaturedEvents = async () => {
    try {
      const featured = await getFeaturedEvents(6);
      setFeaturedEvents(featured);
    } catch (error) {
      console.error('Error loading featured events:', error);
      // Gracefully handle - database tables may not exist yet
      setFeaturedEvents([]);
    }
  };

  const loadEvents = async () => {
    setLoading(true);
    try {
      const result = await fetchEvents(filters, page, 20);
      setEvents(result.events);
      setHasMore(result.has_more);
    } catch (error) {
      console.error('Error loading events:', error);
      // Gracefully handle - database tables may not exist yet
      setEvents([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f4f9f7] to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 text-center bg-[#1e4d45] text-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Discover Events Near You
          </h1>
          <p className="text-2xl md:text-3xl mb-8 text-gray-100">
            Find activities, workshops, and gatherings designed for seniors across India
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-lg">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              🧘 Yoga & Wellness
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              🎭 Arts & Culture
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              📚 Learning
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              👥 Social Meetups
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      {featuredEvents.length > 0 && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-bold text-gray-900">
                ⭐ Featured Events
              </h2>
              <span className="text-lg text-gray-600">
                Verified & Highly Recommended
              </span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <EventFilters
            onFilterChange={handleFilterChange}
            initialFilters={filters}
          />

          {/* Events Grid */}
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[#1e4d45] border-t-transparent"></div>
              <p className="text-2xl text-gray-600 mt-6">Loading events...</p>
            </div>
          ) : events.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {events.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="text-center">
                  <button
                    onClick={handleLoadMore}
                    className="bg-[#1e4d45] hover:bg-[#153a33] text-white text-xl font-bold py-4 px-8 rounded-xl transition-colors duration-200"
                  >
                    Load More Events
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-gradient-to-br from-[#f4f9f7] to-white rounded-3xl border-2 border-gray-200">
              <div className="max-w-2xl mx-auto px-6">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  No events match your search
                </h3>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  We couldn't find any events with your current filters. Don't worry—new events are added regularly!
                </p>

                <div className="bg-white rounded-2xl p-6 mb-6 border-2 border-[#e6f0ed]">
                  <p className="text-lg text-gray-700 mb-4 font-semibold">Try these options:</p>
                  <ul className="text-left space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-[#1e4d45] font-bold mt-1">•</span>
                      <span>Clear your filters and browse all events</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1e4d45] font-bold mt-1">•</span>
                      <span>Try a different city or category</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1e4d45] font-bold mt-1">•</span>
                      <span>Check back tomorrow—we add new events daily</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1e4d45] font-bold mt-1">•</span>
                      <span>Know of an event? Submit it below to help the community!</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => window.location.reload()}
                  className="bg-[#1e4d45] text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-[#153a33] transition-colors"
                >
                  Clear Filters & Show All Events
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Submit Event Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-orange-50 to-yellow-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Know of an Event?
            </h2>
            <p className="text-xl text-gray-700">
              Help the community by sharing events for seniors
            </p>
          </div>
          <SubmitEventForm />
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Discover
              </h3>
              <p className="text-lg text-gray-600">
                Browse events from trusted sources across India, curated specifically for seniors
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-6xl mb-4">✓</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Verify
              </h3>
              <p className="text-lg text-gray-600">
                All events are reviewed and verified by our team for safety and relevance
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Participate
              </h3>
              <p className="text-lg text-gray-600">
                Register directly through event links and enjoy meaningful activities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-16 px-6 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            🛡️ Your Safety Matters
          </h2>
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <ul className="text-left text-lg text-gray-700 space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <span>All events are reviewed by our team before being published</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <span>We clearly label external links and third-party events</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <span>Verified events come from trusted organizations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <span>We never share your personal information with event organizers</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
