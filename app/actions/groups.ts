"use server";

import { createClient } from "@/lib/supabaseServer";
import { revalidatePath } from "next/cache";

/* =========================
   GROUP MANAGEMENT
========================= */

export async function createGroup(formData: FormData) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const privacy = (formData.get("privacy") as string) || "public";
    const category = formData.get("category") as string;
    const coverPhotoUrl = formData.get("cover_photo_url") as string;

    const { data: group, error } = await supabase
        .from("groups")
        .insert({
            name,
            description,
            privacy: privacy as 'public' | 'private' | 'secret',
            category,
            cover_photo_url: coverPhotoUrl || null,
            created_by: user.id,
        })
        .select()
        .single();

    if (error) return { error: error.message };

    // Add creator as admin member
    await supabase.from("group_members").insert({
        group_id: group.id,
        user_id: user.id,
        role: "admin",
        status: "approved",
    });

    revalidatePath("/services/groups");
    return { success: true, group };
}

export async function joinGroup(groupId: string) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    // Check group privacy
    const { data: group } = await supabase
        .from("groups")
        .select("privacy")
        .eq("id", groupId)
        .single();

    if (!group) return { error: "Group not found" };

    const status = group.privacy === "private" ? "pending" : "approved";

    const { error } = await supabase.from("group_members").insert({
        group_id: groupId,
        user_id: user.id,
        role: "member",
        status,
    });

    if (error) return { error: error.message };

    revalidatePath("/services/groups");
    return { success: true, status };
}

export async function leaveGroup(groupId: string) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    const { error } = await supabase
        .from("group_members")
        .delete()
        .eq("group_id", groupId)
        .eq("user_id", user.id);

    if (error) return { error: error.message };

    revalidatePath("/services/groups");
    return { success: true };
}

export async function updateGroupMemberRole(groupId: string, userId: string, role: 'admin' | 'moderator' | 'member') {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    // Check if current user is admin
    const { data: currentMember } = await supabase
        .from("group_members")
        .select("role")
        .eq("group_id", groupId)
        .eq("user_id", user.id)
        .single();

    if (!currentMember || currentMember.role !== "admin") {
        return { error: "Not authorized" };
    }

    const { error } = await supabase
        .from("group_members")
        .update({ role })
        .eq("group_id", groupId)
        .eq("user_id", userId);

    if (error) return { error: error.message };

    revalidatePath(`/services/groups/${groupId}`);
    return { success: true };
}

export async function approveMemberRequest(groupId: string, userId: string) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    // Check if current user is admin or moderator
    const { data: currentMember } = await supabase
        .from("group_members")
        .select("role")
        .eq("group_id", groupId)
        .eq("user_id", user.id)
        .single();

    if (!currentMember || !["admin", "moderator"].includes(currentMember.role)) {
        return { error: "Not authorized" };
    }

    const { error } = await supabase
        .from("group_members")
        .update({ status: "approved" })
        .eq("group_id", groupId)
        .eq("user_id", userId);

    if (error) return { error: error.message };

    // Create notification
    await supabase.from("notifications").insert({
        user_id: userId,
        type: "group_approved" as any,
        content: "approved your request to join a group",
        related_id: groupId,
    });

    revalidatePath(`/services/groups/${groupId}`);
    return { success: true };
}

export async function removeMember(groupId: string, userId: string) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    // Check if current user is admin or moderator
    const { data: currentMember } = await supabase
        .from("group_members")
        .select("role")
        .eq("group_id", groupId)
        .eq("user_id", user.id)
        .single();

    if (!currentMember || !["admin", "moderator"].includes(currentMember.role)) {
        return { error: "Not authorized" };
    }

    const { error } = await supabase
        .from("group_members")
        .delete()
        .eq("group_id", groupId)
        .eq("user_id", userId);

    if (error) return { error: error.message };

    revalidatePath(`/services/groups/${groupId}`);
    return { success: true };
}

// TODO: Uncomment when group_posts table is added to migration
// export async function createGroupPost(groupId: string, content: string, mediaUrls?: string[]) {
//     const supabase = await createClient();

//     const {
//         data: { user },
//     } = await supabase.auth.getUser();

//     if (!user) return { error: "Not authenticated" };

//     // Check if user is a member
//     const { data: member } = await supabase
//         .from("group_members")
//         .select("status")
//         .eq("group_id", groupId)
//         .eq("user_id", user.id)
//         .single();

//     if (!member || member.status !== "approved") {
//         return { error: "Not a member of this group" };
//     }

//     const { data: post, error } = await supabase
//         .from("group_posts")
//         .insert({
//             group_id: groupId,
//             user_id: user.id,
//             content,
//             media_urls: mediaUrls || null,
//         })
//         .select()
//         .single();

//     if (error) return { error: error.message };

//     revalidatePath(`/services/groups/${groupId}`);
//     return { success: true, post };
// }


export async function updateGroup(groupId: string, updates: {
    name?: string;
    description?: string;
    privacy?: 'public' | 'private' | 'secret';
    category?: string;
    cover_photo_url?: string;
}) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    // Check if user is admin
    const { data: member } = await supabase
        .from("group_members")
        .select("role")
        .eq("group_id", groupId)
        .eq("user_id", user.id)
        .single();

    if (!member || member.role !== "admin") {
        return { error: "Not authorized" };
    }

    const { error } = await supabase
        .from("groups")
        .update({
            ...updates,
            updated_at: new Date().toISOString(),
        })
        .eq("id", groupId);

    if (error) return { error: error.message };

    revalidatePath(`/services/groups/${groupId}`);
    return { success: true };
}

export async function deleteGroup(groupId: string) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    // Check if user is creator
    const { data: group } = await supabase
        .from("groups")
        .select("created_by")
        .eq("id", groupId)
        .single();

    if (!group || group.created_by !== user.id) {
        return { error: "Not authorized" };
    }

    const { error } = await supabase
        .from("groups")
        .delete()
        .eq("id", groupId);

    if (error) return { error: error.message };

    revalidatePath("/services/groups");
    return { success: true };
}
