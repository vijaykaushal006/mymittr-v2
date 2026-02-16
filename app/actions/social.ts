"use server";

import { createClient } from "@/lib/supabaseServer";
import { revalidatePath } from "next/cache";

/* =========================
   POST REACTIONS
========================= */

export async function reactToPost(postId: string, reactionType: 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry') {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    // Check if already reacted
    const { data: existing } = await supabase
        .from("post_reactions")
        .select("id, reaction_type")
        .eq("post_id", postId)
        .eq("user_id", user.id)
        .single();

    if (existing) {
        if (existing.reaction_type === reactionType) {
            // Remove reaction
            await supabase.from("post_reactions").delete().eq("id", existing.id);
        } else {
            // Update reaction type
            await supabase
                .from("post_reactions")
                .update({ reaction_type: reactionType })
                .eq("id", existing.id);
        }
    } else {
        // Add new reaction
        await supabase.from("post_reactions").insert({
            post_id: postId,
            user_id: user.id,
            reaction_type: reactionType,
        });

        // Create notification
        const { data: post } = await supabase
            .from("community_posts")
            .select("user_id")
            .eq("id", postId)
            .single();

        if (post && post.user_id !== user.id) {
            await supabase.from("notifications").insert({
                user_id: post.user_id,
                type: "reaction",
                content: `reacted ${reactionType} to your post`,
                related_id: postId,
            });
        }
    }

    revalidatePath("/services/community");
    return { success: true };
}

export async function getPostReactions(postId: string) {
    const supabase = await createClient();

    const { data: reactions } = await supabase
        .from("post_reactions")
        .select("reaction_type, user_id, profiles:user_id(full_name, avatar_url)")
        .eq("post_id", postId);

    // Group by reaction type
    const grouped = reactions?.reduce((acc: any, reaction) => {
        if (!acc[reaction.reaction_type]) {
            acc[reaction.reaction_type] = [];
        }
        acc[reaction.reaction_type].push(reaction);
        return acc;
    }, {});

    return { reactions: grouped || {} };
}

/* =========================
   ENHANCED POST CREATION
========================= */

export async function createEnhancedPost(formData: FormData) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    const content = formData.get("content") as string;
    const visibility = (formData.get("visibility") as string) || "public";
    const feeling = formData.get("feeling") as string | null;
    const activity = formData.get("activity") as string | null;
    const location = formData.get("location") as string | null;
    const mediaUrls = formData.getAll("media_urls") as string[];
    const mediaTypes = formData.getAll("media_types") as string[];
    const taggedUsers = formData.getAll("tagged_users") as string[];

    // Extract hashtags from content
    const hashtags = content.match(/#[\w]+/g)?.map(tag => tag.toLowerCase()) || [];

    const { data: post, error } = await supabase
        .from("community_posts")
        .insert({
            user_id: user.id,
            content,
            visibility: visibility as 'public' | 'friends' | 'private',
            feeling,
            activity,
            location,
            media_urls: mediaUrls.length > 0 ? mediaUrls : null,
            media_types: mediaTypes.length > 0 ? mediaTypes : null,
            tagged_users: taggedUsers.length > 0 ? taggedUsers : null,
            hashtags: hashtags.length > 0 ? hashtags : null,
        })
        .select()
        .single();

    if (error) return { error: error.message };

    // Create notifications for tagged users
    if (taggedUsers.length > 0) {
        const notifications = taggedUsers.map(userId => ({
            user_id: userId,
            type: "mention" as const,
            content: "mentioned you in a post",
            related_id: post.id,
        }));

        await supabase.from("notifications").insert(notifications);
    }

    // Update hashtags table
    if (hashtags.length > 0) {
        for (const tag of hashtags) {
            const { data: existingTag } = await supabase
                .from("hashtags")
                .select("id, usage_count")
                .eq("tag", tag)
                .single();

            if (existingTag) {
                await supabase
                    .from("hashtags")
                    .update({ usage_count: existingTag.usage_count + 1 })
                    .eq("id", existingTag.id);
            } else {
                await supabase.from("hashtags").insert({ tag });
            }
        }
    }

    revalidatePath("/services/community");
    return { success: true, post };
}

export async function updatePost(postId: string, content: string) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    const { error } = await supabase
        .from("community_posts")
        .update({
            content,
            is_edited: true,
            edited_at: new Date().toISOString(),
        })
        .eq("id", postId)
        .eq("user_id", user.id);

    if (error) return { error: error.message };

    revalidatePath("/services/community");
    return { success: true };
}

export async function deletePost(postId: string) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    const { error } = await supabase
        .from("community_posts")
        .delete()
        .eq("id", postId)
        .eq("user_id", user.id);

    if (error) return { error: error.message };

    revalidatePath("/services/community");
    return { success: true };
}

/* =========================
   SAVED POSTS
========================= */

export async function savePost(postId: string, collectionName?: string) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    // Check if already saved
    const { data: existing } = await supabase
        .from("saved_posts")
        .select("id")
        .eq("post_id", postId)
        .eq("user_id", user.id)
        .single();

    if (existing) {
        // Unsave
        await supabase.from("saved_posts").delete().eq("id", existing.id);
        return { success: true, saved: false };
    } else {
        // Save
        await supabase.from("saved_posts").insert({
            post_id: postId,
            user_id: user.id,
            collection_name: collectionName || "Saved",
        });
        return { success: true, saved: true };
    }
}

/* =========================
   POLLS
========================= */

export async function createPoll(postId: string, question: string, options: string[], endsAt?: string) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    // Create poll
    const { data: poll, error: pollError } = await supabase
        .from("post_polls")
        .insert({
            post_id: postId,
            question,
            ends_at: endsAt || null,
        })
        .select()
        .single();

    if (pollError) return { error: pollError.message };

    // Create poll options
    const pollOptions = options.map((option, index) => ({
        poll_id: poll.id,
        option_text: option,
        position: index,
    }));

    const { error: optionsError } = await supabase
        .from("poll_options")
        .insert(pollOptions);

    if (optionsError) return { error: optionsError.message };

    return { success: true, poll };
}

export async function voteOnPoll(pollId: string, optionId: string) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    // Check if already voted
    const { data: existing } = await supabase
        .from("poll_votes")
        .select("id")
        .eq("poll_id", pollId)
        .eq("user_id", user.id)
        .single();

    if (existing) {
        return { error: "Already voted on this poll" };
    }

    // Add vote
    const { error } = await supabase.from("poll_votes").insert({
        poll_id: pollId,
        option_id: optionId,
        user_id: user.id,
    });

    if (error) return { error: error.message };

    // Update counts
    await supabase.rpc("increment", {
        table_name: "poll_options",
        row_id: optionId,
        column_name: "votes_count",
    });

    await supabase.rpc("increment", {
        table_name: "post_polls",
        row_id: pollId,
        column_name: "total_votes",
    });

    revalidatePath("/services/community");
    return { success: true };
}

/* =========================
   STORIES
========================= */

export async function createStory(mediaUrl: string, mediaType: 'photo' | 'video', textOverlay?: string) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    const { data: story, error } = await supabase
        .from("stories")
        .insert({
            user_id: user.id,
            media_url: mediaUrl,
            media_type: mediaType,
            text_overlay: textOverlay || null,
        })
        .select()
        .single();

    if (error) return { error: error.message };

    revalidatePath("/services/community");
    return { success: true, story };
}

export async function viewStory(storyId: string) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    // Check if already viewed
    const { data: existing } = await supabase
        .from("story_views")
        .select("id")
        .eq("story_id", storyId)
        .eq("user_id", user.id)
        .single();

    if (!existing) {
        await supabase.from("story_views").insert({
            story_id: storyId,
            user_id: user.id,
        });
    }

    return { success: true };
}

export async function deleteStory(storyId: string) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    const { error } = await supabase
        .from("stories")
        .delete()
        .eq("id", storyId)
        .eq("user_id", user.id);

    if (error) return { error: error.message };

    revalidatePath("/services/community");
    return { success: true };
}

/* =========================
   CONTENT REPORTING
========================= */

export async function reportContent(
    contentType: 'post' | 'comment' | 'user' | 'group' | 'event',
    contentId: string,
    reason: string,
    description?: string
) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    const { error } = await supabase.from("content_reports").insert({
        reporter_id: user.id,
        content_type: contentType,
        content_id: contentId,
        reason,
        description: description || null,
    });

    if (error) return { error: error.message };

    return { success: true };
}

/* =========================
   USER BLOCKING
========================= */

export async function blockUser(blockedUserId: string) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    // Check if already blocked
    const { data: existing } = await supabase
        .from("blocked_users")
        .select("id")
        .eq("user_id", user.id)
        .eq("blocked_user_id", blockedUserId)
        .single();

    if (existing) {
        // Unblock
        await supabase.from("blocked_users").delete().eq("id", existing.id);
        return { success: true, blocked: false };
    } else {
        // Block
        await supabase.from("blocked_users").insert({
            user_id: user.id,
            blocked_user_id: blockedUserId,
        });

        // Remove friendship if exists
        await supabase
            .from("friendships")
            .delete()
            .or(`and(user_id.eq.${user.id},friend_id.eq.${blockedUserId}),and(user_id.eq.${blockedUserId},friend_id.eq.${user.id})`);

        return { success: true, blocked: true };
    }
}

// Keep existing social.ts functions
export async function likePost(postId: string) {
    return reactToPost(postId, 'like');
}

export async function commentOnPost(postId: string, content: string) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    if (!content || content.trim() === "") {
        return { error: "Comment cannot be empty" };
    }

    const { error } = await supabase.from("post_comments").insert({
        post_id: postId,
        user_id: user.id,
        content: content.trim(),
    });

    if (error) return { error: error.message };

    revalidatePath("/services/community");
    return { success: true };
}

export async function sharePost(postId: string) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    // Check if already shared
    const { data: existing } = await supabase
        .from("post_shares")
        .select("id")
        .eq("post_id", postId)
        .eq("user_id", user.id)
        .single();

    if (existing) {
        return { error: "Already shared this post" };
    }

    const { error } = await supabase.from("post_shares").insert({
        post_id: postId,
        user_id: user.id,
    });

    if (error) return { error: error.message };

    revalidatePath("/services/community");
    return { success: true };
}

export async function sendFriendRequest(friendId: string) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    if (user.id === friendId) {
        return { error: "Cannot send friend request to yourself" };
    }

    const { data: existing } = await supabase
        .from("friendships")
        .select("*")
        .or(`and(user_id.eq.${user.id},friend_id.eq.${friendId}),and(user_id.eq.${friendId},friend_id.eq.${user.id})`)
        .single();

    if (existing) {
        return { error: "Friend request already exists" };
    }

    const { error } = await supabase.from("friendships").insert({
        user_id: user.id,
        friend_id: friendId,
        status: "pending",
    });

    if (error) return { error: error.message };

    await supabase.from("notifications").insert({
        user_id: friendId,
        type: "friend_request",
        content: "sent you a friend request",
        related_id: user.id,
    });

    revalidatePath("/friends");
    return { success: true };
}

export async function acceptFriendRequest(requestId: string) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    const { error } = await supabase
        .from("friendships")
        .update({ status: "accepted" })
        .eq("id", requestId)
        .eq("friend_id", user.id);

    if (error) return { error: error.message };

    revalidatePath("/friends");
    return { success: true };
}

export async function rejectFriendRequest(requestId: string) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    const { error } = await supabase
        .from("friendships")
        .delete()
        .eq("id", requestId)
        .eq("friend_id", user.id);

    if (error) return { error: error.message };

    revalidatePath("/friends");
    return { success: true };
}

export async function removeFriend(friendshipId: string) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    const { error } = await supabase
        .from("friendships")
        .delete()
        .eq("id", friendshipId);

    if (error) return { error: error.message };

    revalidatePath("/friends");
    return { success: true };
}

export async function sendMessage(receiverId: string, content: string) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    if (!content || content.trim() === "") {
        return { error: "Message cannot be empty" };
    }

    const { error } = await supabase.from("messages").insert({
        sender_id: user.id,
        receiver_id: receiverId,
        content: content.trim(),
    });

    if (error) return { error: error.message };

    await supabase.from("notifications").insert({
        user_id: receiverId,
        type: "message",
        content: "sent you a message",
        related_id: user.id,
    });

    revalidatePath("/messages");
    return { success: true };
}

export async function markMessageAsRead(messageId: string) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    const { error } = await supabase
        .from("messages")
        .update({ read: true })
        .eq("id", messageId)
        .eq("receiver_id", user.id);

    if (error) return { error: error.message };

    return { success: true };
}
