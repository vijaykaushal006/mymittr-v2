import { createClient } from "@/lib/supabaseServer";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function EventsPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login?redirect=/services/events");
    }

    // Fetch user's events
    const { data: myEvents } = await supabase
        .from("event_attendees")
        .select(`
      *,
      events (*)
    `)
        .eq("user_id", user.id)
        .eq("status", "going");

    // Fetch upcoming events
    const { data: upcomingEvents } = await supabase
        .from("events")
        .select("*")
        .eq("privacy", "public")
        .gte("start_time", new Date().toISOString())
        .order("start_time", { ascending: true })
        .limit(6);

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Events</h1>
                    <p className="text-gray-600">Discover and join events in your community</p>
                </div>

                {/* My Events */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Your Events</h2>
                        <Link
                            href="/services/events/create"
                            className="px-6 py-2 bg-[#1e4d45] text-white rounded-lg font-semibold hover:bg-[#153a33] transition-colors"
                        >
                            Create Event
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myEvents && myEvents.length > 0 ? (
                            myEvents.map((attendance: any) => (
                                <Link
                                    key={attendance.id}
                                    href={`/services/events/${attendance.events.id}`}
                                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                                >
                                    <div className="h-40 bg-gradient-to-br from-[#1e4d45] to-[#2a6b5e]" />
                                    <div className="p-4">
                                        <div className="text-sm text-gray-500 mb-1">
                                            {new Date(attendance.events.start_time).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </div>
                                        <h3 className="font-bold text-lg text-gray-900 mb-1">
                                            {attendance.events.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                            {attendance.events.description}
                                        </p>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            {attendance.events.location && (
                                                <span className="flex items-center gap-1">
                                                    📍 {attendance.events.location}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 bg-white rounded-xl">
                                <p className="text-gray-600 mb-4">You haven't joined any events yet</p>
                                <Link
                                    href="/services/events/create"
                                    className="text-[#1e4d45] font-semibold hover:underline"
                                >
                                    Create your first event
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Upcoming Events */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {upcomingEvents?.map((event: any) => (
                            <Link
                                key={event.id}
                                href={`/services/events/${event.id}`}
                                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                            >
                                <div className="h-40 bg-gradient-to-br from-purple-500 to-pink-600" />
                                <div className="p-4">
                                    <div className="text-sm text-gray-500 mb-1">
                                        {new Date(event.start_time).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-900 mb-1">{event.name}</h3>
                                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                        {event.description}
                                    </p>
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <span>{event.attendees_count} going</span>
                                        {event.location && <span>📍 {event.location}</span>}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
