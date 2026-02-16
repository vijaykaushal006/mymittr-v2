import { createClient } from "@/lib/supabaseServer";
import Link from "next/link";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";
import { redirect } from "next/navigation";

export default async function CommunityPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect to login if not authenticated
  if (!user) {
    redirect("/login?redirect=/services/community");
  }

  // Fetch current user's profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Fetch all posts with user info, reactions, and comments
  const { data: posts } = await supabase
    .from("community_posts")
    .select(`
      *,
      profiles:user_id (full_name, avatar_url)
    `)
    .order("created_at", { ascending: false });

  // Fetch user's reactions
  const { data: userReactions } = await supabase
    .from("post_reactions")
    .select("post_id, reaction_type")
    .eq("user_id", user.id);

  const userReactionMap = new Map(
    userReactions?.map((r) => [r.post_id, r.reaction_type]) || []
  );

  // Fetch comments for all posts
  const { data: allComments } = await supabase
    .from("post_comments")
    .select(`
      *,
      profiles:user_id (full_name, avatar_url)
    `)
    .order("created_at", { ascending: true });

  // Group comments by post_id
  const commentsByPost = allComments?.reduce((acc: any, comment) => {
    if (!acc[comment.post_id]) acc[comment.post_id] = [];
    acc[comment.post_id].push(comment);
    return acc;
  }, {}) || {};

  // Fetch friend suggestions (users not yet friends)
  const { data: existingFriends } = await supabase
    .from("friendships")
    .select("friend_id, user_id")
    .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`);

  const friendIds = new Set(
    existingFriends?.map((f) => (f.user_id === user.id ? f.friend_id : f.user_id)) || []
  );
  friendIds.add(user.id); // Exclude self

  const { data: suggestions } = await supabase
    .from("profiles")
    .select("id, full_name, avatar_url, role")
    .not("id", "in", `(${Array.from(friendIds).join(",")})`)
    .limit(5);

  // Fetch pending friend requests
  const { data: pendingRequests } = await supabase
    .from("friendships")
    .select(`
      *,
      profiles:user_id (full_name, avatar_url)
    `)
    .eq("friend_id", user.id)
    .eq("status", "pending");

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Sidebar - User Info & Navigation */}
          <div className="lg:col-span-3 space-y-4">
            {/* User Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <Link href="/profile" className="flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1e4d45] to-[#2a6b5e] flex items-center justify-center text-white text-xl font-bold">
                  {profile?.full_name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{profile?.full_name || "User"}</h3>
                  <p className="text-sm text-gray-500 capitalize">{profile?.role}</p>
                </div>
              </Link>

              <div className="space-y-2">
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  My Profile
                </Link>
                <Link
                  href="/friends"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Friends
                  {pendingRequests && pendingRequests.length > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      {pendingRequests.length}
                    </span>
                  )}
                </Link>
                <Link
                  href="/messages"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Messages
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </Link>
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-6 space-y-6">
            {/* Create Post */}
            <CreatePost />

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts && posts.length > 0 ? (
                posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    currentUserId={user.id}
                    userReaction={userReactionMap.get(post.id) as any}
                    comments={commentsByPost[post.id] || []}
                  />
                ))
              ) : (
                <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No posts yet</h3>
                  <p className="text-gray-600">Be the first to share something with the community!</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Friend Suggestions */}
          <div className="lg:col-span-3 space-y-4">
            {/* Friend Requests */}
            {pendingRequests && pendingRequests.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Friend Requests</h3>
                <div className="space-y-3">
                  {pendingRequests.map((request) => (
                    <div key={request.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1e4d45] to-[#2a6b5e] flex items-center justify-center text-white font-bold flex-shrink-0">
                        {request.profiles?.full_name?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-900 truncate">
                          {request.profiles?.full_name || "User"}
                        </p>
                        <Link
                          href="/friends"
                          className="text-xs text-[#1e4d45] hover:underline"
                        >
                          View request
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Friend Suggestions */}
            {suggestions && suggestions.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                <h3 className="font-bold text-gray-900 mb-4">People You May Know</h3>
                <div className="space-y-4">
                  {suggestions.map((suggestion) => (
                    <div key={suggestion.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1e4d45] to-[#2a6b5e] flex items-center justify-center text-white font-bold flex-shrink-0">
                        {suggestion.full_name?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-900 truncate">
                          {suggestion.full_name || "User"}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">{suggestion.role}</p>
                      </div>
                      <Link
                        href={`/profile/${suggestion.id}`}
                        className="px-3 py-1.5 bg-[#1e4d45] text-white text-xs font-bold rounded-lg hover:bg-[#153a33] transition-colors flex-shrink-0"
                      >
                        View
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}