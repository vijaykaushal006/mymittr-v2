import { createClient } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";
import Link from "next/link";
import { acceptFriendRequest, rejectFriendRequest, sendFriendRequest } from "@/app/actions/social";

export default async function FriendsPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login?redirect=/friends");
    }

    // Fetch pending requests (received)
    const { data: pendingRequests } = await supabase
        .from("friendships")
        .select(`
      *,
      profiles:user_id (id, full_name, avatar_url, role)
    `)
        .eq("friend_id", user.id)
        .eq("status", "pending");

    // Fetch sent requests
    const { data: sentRequests } = await supabase
        .from("friendships")
        .select(`
      *,
      profiles:friend_id (id, full_name, avatar_url, role)
    `)
        .eq("user_id", user.id)
        .eq("status", "pending");

    // Fetch accepted friends
    const { data: friends } = await supabase
        .from("friendships")
        .select(`
      *,
      profiles:friend_id (id, full_name, avatar_url, role)
    `)
        .eq("user_id", user.id)
        .eq("status", "accepted");

    // Also fetch where current user is the friend_id
    const { data: friendsReverse } = await supabase
        .from("friendships")
        .select(`
      *,
      profiles:user_id (id, full_name, avatar_url, role)
    `)
        .eq("friend_id", user.id)
        .eq("status", "accepted");

    const allFriends = [
        ...(friends || []).map((f) => ({ ...f, friend: f.profiles })),
        ...(friendsReverse || []).map((f) => ({ ...f, friend: f.profiles })),
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Friends</h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Friend Requests */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Friend Requests
                                {pendingRequests && pendingRequests.length > 0 && (
                                    <span className="ml-2 text-sm bg-red-500 text-white px-3 py-1 rounded-full">
                                        {pendingRequests.length}
                                    </span>
                                )}
                            </h2>

                            {pendingRequests && pendingRequests.length > 0 ? (
                                <div className="space-y-4">
                                    {pendingRequests.map((request) => (
                                        <div key={request.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1e4d45] to-[#2a6b5e] flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                                                {request.profiles?.full_name?.charAt(0).toUpperCase() || "U"}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-gray-900">{request.profiles?.full_name || "User"}</h3>
                                                <p className="text-sm text-gray-500 capitalize">{request.profiles?.role}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <form action={acceptFriendRequest}>
                                                    <input type="hidden" name="requestId" value={request.id} />
                                                    <button className="px-4 py-2 bg-[#1e4d45] text-white rounded-lg font-semibold hover:bg-[#153a33] transition-colors">
                                                        Accept
                                                    </button>
                                                </form>
                                                <form action={rejectFriendRequest}>
                                                    <input type="hidden" name="requestId" value={request.id} />
                                                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                                                        Decline
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500 py-8">No pending requests</p>
                            )}
                        </div>

                        {/* Sent Requests */}
                        {sentRequests && sentRequests.length > 0 && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Sent Requests</h2>
                                <div className="space-y-3">
                                    {sentRequests.map((request) => (
                                        <div key={request.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1e4d45] to-[#2a6b5e] flex items-center justify-center text-white font-bold flex-shrink-0">
                                                {request.profiles?.full_name?.charAt(0).toUpperCase() || "U"}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900">{request.profiles?.full_name || "User"}</h3>
                                                <p className="text-xs text-gray-500">Pending...</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* My Friends */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            My Friends ({allFriends.length})
                        </h2>

                        {allFriends.length > 0 ? (
                            <div className="space-y-4">
                                {allFriends.map((friendship) => (
                                    <div key={friendship.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1e4d45] to-[#2a6b5e] flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                                            {friendship.friend?.full_name?.charAt(0).toUpperCase() || "U"}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900">{friendship.friend?.full_name || "User"}</h3>
                                            <p className="text-sm text-gray-500 capitalize">{friendship.friend?.role}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Link
                                                href={`/messages?user=${friendship.friend?.id}`}
                                                className="px-4 py-2 bg-[#1e4d45] text-white rounded-lg font-semibold hover:bg-[#153a33] transition-colors"
                                            >
                                                Message
                                            </Link>
                                            <Link
                                                href={`/profile/${friendship.friend?.id}`}
                                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                                            >
                                                View
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No friends yet</h3>
                                <p className="text-gray-600 mb-4">Start connecting with people in the community!</p>
                                <Link
                                    href="/services/community"
                                    className="inline-block px-6 py-3 bg-[#1e4d45] text-white rounded-xl font-bold hover:bg-[#153a33] transition-colors"
                                >
                                    Explore Community
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
