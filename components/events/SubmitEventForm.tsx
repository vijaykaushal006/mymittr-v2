// SubmitEventForm Component
// Public form for community members to submit events

'use client';

import { useState } from 'react';
import type { EventCategory, EventSubmissionForm } from '@/types/events';
import { CATEGORY_CONFIG, INDIAN_CITIES } from '@/lib/events/config';

export default function SubmitEventForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState<Partial<EventSubmissionForm>>({
        is_online: false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch('/api/events/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Submission failed');
            }

            setSuccess(true);
            setFormData({ is_online: false });

            // Close form after 3 seconds
            setTimeout(() => {
                setIsOpen(false);
                setSuccess(false);
            }, 3000);

        } catch (err) {
            setError('Failed to submit event. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) {
        return (
            <div className="text-center py-8">
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-[#1e4d45] hover:bg-[#153a33] text-white text-xl font-bold py-4 px-8 rounded-xl transition-colors duration-200"
                >
                    ➕ Submit an Event
                </button>
                <p className="text-base text-gray-600 mt-3">
                    Know of an event for seniors? Share it with the community!
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Submit an Event</h2>
                <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700 text-3xl"
                >
                    ×
                </button>
            </div>

            {success ? (
                <div className="bg-green-100 border-2 border-green-500 rounded-xl p-6 text-center">
                    <p className="text-2xl font-bold text-green-700 mb-2">✓ Success!</p>
                    <p className="text-lg text-green-600">
                        Your event has been submitted for review. Thank you!
                    </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Event Title */}
                    <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-2">
                            Event Title *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.title || ''}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e4d45]"
                            placeholder="e.g., Yoga for Seniors"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-2">
                            Description *
                        </label>
                        <textarea
                            required
                            rows={4}
                            value={formData.description || ''}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e4d45]"
                            placeholder="Describe the event..."
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-2">
                            Category *
                        </label>
                        <select
                            required
                            value={formData.category || ''}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value as EventCategory })}
                            className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e4d45]"
                        >
                            <option value="">Select a category</option>
                            {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                                <option key={key} value={key}>
                                    {config.icon} {config.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Date & Time */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-2">
                                Start Date & Time *
                            </label>
                            <input
                                type="datetime-local"
                                required
                                value={formData.start_datetime || ''}
                                onChange={(e) => setFormData({ ...formData, start_datetime: e.target.value })}
                                className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e4d45]"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-2">
                                End Date & Time
                            </label>
                            <input
                                type="datetime-local"
                                value={formData.end_datetime || ''}
                                onChange={(e) => setFormData({ ...formData, end_datetime: e.target.value })}
                                className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e4d45]"
                            />
                        </div>
                    </div>

                    {/* Online/Offline */}
                    <div>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.is_online || false}
                                onChange={(e) => setFormData({ ...formData, is_online: e.target.checked })}
                                className="w-6 h-6 rounded border-2 border-gray-300"
                            />
                            <span className="text-lg font-semibold text-gray-700">
                                This is an online event
                            </span>
                        </label>
                    </div>

                    {/* Location (if not online) */}
                    {!formData.is_online && (
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-lg font-semibold text-gray-700 mb-2">
                                    City *
                                </label>
                                <select
                                    required={!formData.is_online}
                                    value={formData.city || ''}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e4d45]"
                                >
                                    <option value="">Select a city</option>
                                    {INDIAN_CITIES.slice(0, 30).map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-lg font-semibold text-gray-700 mb-2">
                                    Venue
                                </label>
                                <input
                                    type="text"
                                    value={formData.venue || ''}
                                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                                    className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e4d45]"
                                    placeholder="e.g., Community Center"
                                />
                            </div>
                        </div>
                    )}

                    {/* Organizer Info */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-2">
                                Organizer Name *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.organizer_name || ''}
                                onChange={(e) => setFormData({ ...formData, organizer_name: e.target.value })}
                                className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e4d45]"
                                placeholder="Organization or person"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-2">
                                Contact (Phone/Email)
                            </label>
                            <input
                                type="text"
                                value={formData.organizer_contact || ''}
                                onChange={(e) => setFormData({ ...formData, organizer_contact: e.target.value })}
                                className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e4d45]"
                                placeholder="Optional"
                            />
                        </div>
                    </div>

                    {/* Registration URL */}
                    <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-2">
                            Registration Link
                        </label>
                        <input
                            type="url"
                            value={formData.registration_url || ''}
                            onChange={(e) => setFormData({ ...formData, registration_url: e.target.value })}
                            className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e4d45]"
                            placeholder="https://..."
                        />
                    </div>

                    {/* Submitter Info */}
                    <div className="border-t-2 border-gray-200 pt-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Your Information</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-lg font-semibold text-gray-700 mb-2">
                                    Your Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.submitter_name || ''}
                                    onChange={(e) => setFormData({ ...formData, submitter_name: e.target.value })}
                                    className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e4d45]"
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-semibold text-gray-700 mb-2">
                                    Your Email *
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.submitter_email || ''}
                                    onChange={(e) => setFormData({ ...formData, submitter_email: e.target.value })}
                                    className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e4d45]"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-lg font-semibold text-gray-700 mb-2">
                                Organization (Optional)
                            </label>
                            <input
                                type="text"
                                value={formData.submitter_organization || ''}
                                onChange={(e) => setFormData({ ...formData, submitter_organization: e.target.value })}
                                className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e4d45]"
                                placeholder="NGO, RWA, Hospital, etc."
                            />
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-100 border-2 border-red-500 rounded-xl p-4">
                            <p className="text-lg text-red-700">{error}</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#1e4d45] hover:bg-[#153a33] disabled:bg-gray-400 text-white text-xl font-bold py-4 px-6 rounded-xl transition-colors duration-200"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Event for Review'}
                    </button>

                    {/* Reassurance Message */}
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-center">
                        <p className="text-base font-semibold text-gray-900 mb-2">
                            ✓ All events are reviewed before publishing
                        </p>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            Our team will review your submission within <strong>24-48 hours</strong> to ensure it's appropriate for senior citizens. You'll receive an email confirmation once your event is approved and published.
                        </p>
                        <p className="text-xs text-gray-600 mt-2">
                            Thank you for helping build a vibrant community for seniors!
                        </p>
                    </div>
                </form>
            )}
        </div>
    );
}
