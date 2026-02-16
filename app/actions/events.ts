"use server";

import { createClient } from "@/lib/supabaseServer";
import { revalidatePath } from "next/cache";

/* =========================
   EVENT MANAGEMENT
========================= */

export async function createEvent(formData: FormData) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;
    const startTime = formData.get("start_time") as string;
    const endTime = formData.get("end_time") as string;
    const privacy = (formData.get("privacy") as string) || "public";
    const category = formData.get("category") as string;
    const isOnline = formData.get("is_online") === "true";
    const onlineLink = formData.get("online_link") as string;
    const coverPhotoUrl = formData.get("cover_photo_url") as string;

    const { data: event, error } = await supabase
        .from("events")
        .insert({
            name,
            description,
            location: location || null,
            start_time: startTime,
            end_time: endTime || null,
            privacy: privacy as 'public' | 'private',
            category: category || null,
            is_online: isOnline,
            online_link: onlineLink || null,
            cover_photo_url: coverPhotoUrl || null,
            created_by: user.id,
        })
        .select()
        .single();

    if (error) return { error: error.message };

    // Automatically RSVP creator as "going"
    await supabase.from("event_attendees").insert({
        event_id: event.id,
        user_id: user.id,
        status: "going",
    });

    revalidatePath("/services/events");
    return { success: true, event };
}

export async function rsvpEvent(eventId: string, status: 'going' | 'interested' | 'not_going') {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    // Check if already RSVP'd
    const { data: existing } = await supabase
        .from("event_attendees")
        .select("id")
        .eq("event_id", eventId)
        .eq("user_id", user.id)
        .single();

    if (existing) {
        // Update RSVP
        const { error } = await supabase
            .from("event_attendees")
            .update({ status })
            .eq("id", existing.id);

        if (error) return { error: error.message };
    } else {
        // Create new RSVP
        const { error } = await supabase.from("event_attendees").insert({
            event_id: eventId,
            user_id: user.id,
            status,
        });

        if (error) return { error: error.message };

        // Create notification for event creator
        const { data: event } = await supabase
            .from("events")
            .select("created_by")
            .eq("id", eventId)
            .single();

        if (event && event.created_by !== user.id && status === "going") {
            await supabase.from("notifications").insert({
                user_id: event.created_by,
                type: "event_rsvp" as any,
                content: `is going to your event`,
                related_id: eventId,
            });
        }
    }

    revalidatePath(`/services/events/${eventId}`);
    return { success: true };
}

export async function updateEvent(eventId: string, updates: {
    name?: string;
    description?: string;
    location?: string;
    start_time?: string;
    end_time?: string;
    privacy?: 'public' | 'private';
    category?: string;
    is_online?: boolean;
    online_link?: string;
    cover_photo_url?: string;
}) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    // Check if user is creator
    const { data: event } = await supabase
        .from("events")
        .select("created_by")
        .eq("id", eventId)
        .single();

    if (!event || event.created_by !== user.id) {
        return { error: "Not authorized" };
    }

    const { error } = await supabase
        .from("events")
        .update({
            ...updates,
            updated_at: new Date().toISOString(),
        })
        .eq("id", eventId);

    if (error) return { error: error.message };

    revalidatePath(`/services/events/${eventId}`);
    return { success: true };
}

export async function deleteEvent(eventId: string) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    // Check if user is creator
    const { data: event } = await supabase
        .from("events")
        .select("created_by")
        .eq("id", eventId)
        .single();

    if (!event || event.created_by !== user.id) {
        return { error: "Not authorized" };
    }

    const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", eventId);

    if (error) return { error: error.message };

    revalidatePath("/services/events");
    return { success: true };
}

export async function inviteToEvent(eventId: string, userIds: string[]) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    // Create notifications for invited users
    const notifications = userIds.map(userId => ({
        user_id: userId,
        type: "event_invite" as any,
        content: "invited you to an event",
        related_id: eventId,
    }));

    const { error } = await supabase.from("notifications").insert(notifications);

    if (error) return { error: error.message };

    return { success: true };
}
