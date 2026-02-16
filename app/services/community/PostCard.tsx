"use client";

import { useState } from "react";
import { reactToPost, commentOnPost, sharePost, savePost, deletePost } from "@/app/actions/social";
import Link from "next/link";
import Image from "next/image";

const REACTIONS = [
  { type: "like", emoji: "👍", label: "Like", color: "text-blue-600" },
  { type: "love", emoji: "❤️", label: "Love", color: "text-red-600" },
  { type: "haha", emoji: "😂", label: "Haha", color: "text-yellow-600" },
  { type: "wow", emoji: "😮", label: "Wow", color: "text-orange-600" },
  { type: "sad", emoji: "😢", label: "Sad", color: "text-blue-400" },
  { type: "angry", emoji: "😡", label: "Angry", color: "text-red-700" },
] as const;

type ReactionType = typeof REACTIONS[number]["type"];

interface PostCardProps {
  post: {
    id: string;
    content: string;
    created_at: string;
    image_url: string | null;
    media_urls: string[] | null;
    media_types: string[] | null;
    likes_count: number;
    comments_count: number;
    shares_count: number;
    reactions_count: number;
    feeling: string | null;
    activity: string | null;
    location: string | null;
    is_edited: boolean;
    edited_at: string | null;
    visibility: string;
    profiles: {
      full_name: string | null;
      avatar_url: string | null;
    } | null;
    user_id: string;
  };
  currentUserId?: string;
  userReaction?: ReactionType | null;
  comments?: Array<{
    id: string;
    content: string;
    created_at: string;
    profiles: {
      full_name: string | null;
      avatar_url: string | null;
    } | null;
  }>;
}

export default function PostCardEnhanced({ post, currentUserId, userReaction, comments }: PostCardProps) {
  const [currentReaction, setCurrentReaction] = useState<ReactionType | null>(userReaction || null);
  const [reactionsCount, setReactionsCount] = useState(post.reactions_count);
  const [sharesCount, setSharesCount] = useState(post.shares_count);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const isOwner = currentUserId === post.user_id;
  const mediaUrls = post.media_urls || (post.image_url ? [post.image_url] : []);

  async function handleReaction(reactionType: ReactionType) {
    const previousReaction = currentReaction;
    const previousCount = reactionsCount;

    // Optimistic update
    if (currentReaction === reactionType) {
      setCurrentReaction(null);
      setReactionsCount(reactionsCount - 1);
    } else {
      setCurrentReaction(reactionType);
      if (!previousReaction) {
        setReactionsCount(reactionsCount + 1);
      }
    }

    setShowReactionPicker(false);

    const result = await reactToPost(post.id, reactionType);
    if (!result.success) {
      // Revert on error
      setCurrentReaction(previousReaction);
      setReactionsCount(previousCount);
    }
  }

  async function handleComment(e: React.FormEvent) {
    e.preventDefault();
    if (!commentText.trim()) return;

    setIsCommenting(true);
    const result = await commentOnPost(post.id, commentText);
    if (result.success) {
      setCommentText("");
      window.location.reload();
    }
    setIsCommenting(false);
  }

  async function handleShare() {
    const result = await sharePost(post.id);
    if (result.success) {
      setSharesCount(sharesCount + 1);
      alert("Post shared successfully!");
    } else {
      alert(result.error || "Failed to share post");
    }
  }

  async function handleSave() {
    const result = await savePost(post.id);
    if (result.success) {
      setIsSaved(!isSaved);
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this post?")) return;

    const result = await deletePost(post.id);
    if (result.success) {
      window.location.reload();
    }
  }

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % mediaUrls.length);
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + mediaUrls.length) % mediaUrls.length);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Post Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <Link href={`/profile/${post.user_id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1e4d45] to-[#2a6b5e] flex items-center justify-center text-white font-bold overflow-hidden">
              {post.profiles?.avatar_url ? (
                <Image
                  src={post.profiles.avatar_url}
                  alt={post.profiles.full_name || "User"}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              ) : (
                post.profiles?.full_name?.charAt(0).toUpperCase() || "U"
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-900">{post.profiles?.full_name || "Anonymous"}</h3>
                {(post.feeling || post.activity) && (
                  <span className="text-sm text-gray-600">
                    {post.feeling && `is feeling ${post.feeling}`}
                    {post.activity && ` ${post.activity}`}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                {post.is_edited && <span>· Edited</span>}
                {post.location && (
                  <>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      📍 {post.location}
                    </span>
                  </>
                )}
                <span>·</span>
                <span className="capitalize">{post.visibility}</span>
              </div>
            </div>
          </Link>

          {/* Options Menu */}
          <div className="relative">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>

            {showOptions && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
                <button
                  onClick={handleSave}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                >
                  <span>{isSaved ? "Unsave" : "Save"} post</span>
                </button>
                {isOwner && (
                  <>
                    <button
                      onClick={handleDelete}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-600"
                    >
                      <span>Delete post</span>
                    </button>
                  </>
                )}
                {!isOwner && (
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                    <span>Report post</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Post Content */}
        <p className="text-gray-800 text-lg leading-relaxed mb-4 whitespace-pre-wrap">{post.content}</p>

        {/* Post Media Carousel */}
        {mediaUrls.length > 0 && (
          <div className="relative rounded-xl overflow-hidden mb-4 bg-black">
            {mediaUrls.length > 1 && (
              <>
                <button
                  onClick={prevMedia}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 z-10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextMedia}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 z-10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {mediaUrls.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${index === currentMediaIndex ? "bg-white" : "bg-white bg-opacity-50"
                        }`}
                    />
                  ))}
                </div>
              </>
            )}
            <Image
              src={mediaUrls[currentMediaIndex]}
              alt="Post media"
              width={600}
              height={400}
              className="w-full max-h-96 object-contain"
            />
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1">
            {reactionsCount > 0 && (
              <div className="flex items-center gap-1">
                <div className="flex -space-x-1">
                  {REACTIONS.slice(0, 3).map((reaction) => (
                    <span key={reaction.type} className="text-lg">
                      {reaction.emoji}
                    </span>
                  ))}
                </div>
                <span>{reactionsCount}</span>
              </div>
            )}
          </div>
          <div className="flex gap-4">
            <span>{post.comments_count} {post.comments_count === 1 ? "comment" : "comments"}</span>
            <span>{sharesCount} {sharesCount === 1 ? "share" : "shares"}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-4 flex items-center gap-2 border-t border-gray-100 pt-2">
        {/* Reaction Button with Picker */}
        <div className="relative flex-1">
          <button
            onClick={() => handleReaction("like")}
            onMouseEnter={() => setShowReactionPicker(true)}
            onMouseLeave={() => setShowReactionPicker(false)}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all ${currentReaction
                ? REACTIONS.find((r) => r.type === currentReaction)?.color || "text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
              }`}
          >
            <span className="text-xl">
              {currentReaction
                ? REACTIONS.find((r) => r.type === currentReaction)?.emoji
                : "👍"}
            </span>
            <span>
              {currentReaction
                ? REACTIONS.find((r) => r.type === currentReaction)?.label
                : "Like"}
            </span>
          </button>

          {/* Reaction Picker */}
          {showReactionPicker && (
            <div
              onMouseEnter={() => setShowReactionPicker(true)}
              onMouseLeave={() => setShowReactionPicker(false)}
              className="absolute bottom-full left-0 mb-2 bg-white rounded-full shadow-lg border px-2 py-2 flex gap-1 z-10"
            >
              {REACTIONS.map((reaction) => (
                <button
                  key={reaction.type}
                  onClick={() => handleReaction(reaction.type)}
                  className="hover:scale-125 transition-transform p-1"
                  title={reaction.label}
                >
                  <span className="text-2xl">{reaction.emoji}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Comment
        </button>

        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="px-6 pb-6 border-t border-gray-100 pt-4">
          {/* Comment Form */}
          {currentUserId && (
            <form onSubmit={handleComment} className="mb-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1e4d45] focus:bg-white transition-all"
                />
                <button
                  type="submit"
                  disabled={!commentText.trim() || isCommenting}
                  className="px-6 py-2 bg-[#1e4d45] text-white rounded-full font-semibold hover:bg-[#153a33] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCommenting ? "..." : "Post"}
                </button>
              </div>
            </form>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {comments && comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1e4d45] to-[#2a6b5e] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {comment.profiles?.full_name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-2xl px-4 py-2">
                      <h4 className="font-semibold text-sm text-gray-900">
                        {comment.profiles?.full_name || "Anonymous"}
                      </h4>
                      <p className="text-gray-800">{comment.content}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 ml-4">
                      {new Date(comment.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">No comments yet. Be the first to comment!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}