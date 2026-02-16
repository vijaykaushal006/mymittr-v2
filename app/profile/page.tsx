import { createClient } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default async function ProfilePage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login?redirect=/profile");
    }

    // Fetch user profile
    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    // Fetch user's posts
    const { data: posts } = await supabase
        .from("community_posts")
        .select("*, profiles(full_name, avatar_url)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10);

    // Fetch friends count
    const { count: friendsCount } = await supabase
        .from("friendships")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("status", "accepted");

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Profile Header Card */}
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-8">
                    {/* Cover Image */}
                    <div className="h-48 bg-gradient-to-r from-[#1e4d45] to-[#2a6b5e]"></div>

                    {/* Profile Info */}
                    <div className="px-8 pb-8">
                        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16">
                            {/* Avatar */}
                            <div className="relative">
                                <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl bg-gradient-to-br from-[#1e4d45] to-[#2a6b5e] flex items-center justify-center text-white text-4xl font-bold overflow-hidden">
                                    {profile?.avatar_url ? (
                                        <Image
                                            src={profile.avatar_url}
                                            alt={profile.full_name || "User"}
                                            width={128}
                                            height={128}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        profile?.full_name?.charAt(0).toUpperCase() || "U"
                                    )}
                                </div>
                            </div>

                            {/* Name and Bio */}
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {profile?.full_name || "User"}
                                </h1>
                                <p className="text-gray-600 mb-4">
                                    {profile?.bio || "No bio yet"}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    {profile?.location && (
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {profile.location}
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        {friendsCount || 0} Friends
                                    </span>
                                    <span className="px-3 py-1 bg-[#1e4d45]/10 text-[#1e4d45] rounded-full font-semibold capitalize">
                                        {profile?.role}
                                    </span>
                                </div>
                            </div>

                            {/* Edit Profile Button */}
                            <Link
                                href="/settings"
                                className="px-6 py-3 bg-[#1e4d45] text-white rounded-xl font-bold hover:bg-[#153a33] transition-colors"
                            >
                                Edit Profile
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Activity Section */}
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>

                        {posts && posts.length > 0 ? (
                            posts.map((post) => (
                                <div
                                    key={post.id}
                                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <p className="text-gray-800 mb-4">{post.content}</p>
                                    <div className="flex items-center gap-6 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                            {post.likes_count || 0}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                            {post.comments_count || 0}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                            </svg>
                                            {post.shares_count || 0}
                                        </span>
                                        <span className="ml-auto text-xs">
                                            {new Date(post.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white rounded-2xl p-12 text-center">
                                <p className="text-gray-500 mb-4">No posts yet</p>
                                <Link
                                    href="/services/community"
                                    className="inline-block px-6 py-3 bg-[#1e4d45] text-white rounded-xl font-bold hover:bg-[#153a33] transition-colors"
                                >
                                    Create Your First Post
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Stats */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Stats</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Posts</span>
                                    <span className="font-bold text-[#1e4d45]">{posts?.length || 0}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Friends</span>
                                    <span className="font-bold text-[#1e4d45]">{friendsCount || 0}</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
                            <div className="space-y-2">
                                <Link
                                    href="/friends"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                    My Friends
                                </Link>
                                <Link
                                    href="/messages"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                    Messages
                                </Link>
                                <Link
                                    href="/settings"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                    Settings
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
