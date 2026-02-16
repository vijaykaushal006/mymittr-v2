"use server";

import { createClient } from "@/lib/supabaseServer";
import { revalidatePath } from "next/cache";

/* =========================
   PHOTO ALBUMS
========================= */

export async function createAlbum(name: string, description?: string, privacy?: 'public' | 'friends' | 'private') {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    const { data: album, error } = await supabase
        .from("photo_albums")
        .insert({
            user_id: user.id,
            name,
            description: description || null,
            privacy: privacy || 'public',
        })
        .select()
        .single();

    if (error) return { error: error.message };

    revalidatePath("/profile/photos");
    return { success: true, album };
}

// TODO: Uncomment when album_photos table is added to migration
// export async function addPhotoToAlbum(albumId: string, photoUrl: string, caption?: string, taggedUsers?: string[]) {
//     const supabase = await createClient();

//     const {
//         data: { user },
//     } = await supabase.auth.getUser();

//     if (!user) return { error: "Not authenticated" };

//     // Verify album ownership
//     const { data: album } = await supabase
//         .from("photo_albums")
//         .select("user_id")
//         .eq("id", albumId)
//         .single();

//     if (!album || album.user_id !== user.id) {
//         return { error: "Not authorized" };
//     }

//     const { data: photo, error } = await supabase
//         .from("album_photos")
//         .insert({
//             album_id: albumId,
//             photo_url: photoUrl,
//             caption: caption || null,
//             tagged_users: taggedUsers || null,
//         })
//         .select()
//         .single();

//     if (error) return { error: error.message };

//     // Create notifications for tagged users
//     if (taggedUsers && taggedUsers.length > 0) {
//         const notifications = taggedUsers.map(userId => ({
//             user_id: userId,
//             type: "photo_tag" as any,
//             content: "tagged you in a photo",
//             related_id: photo.id,
//         }));

//         await supabase.from("notifications").insert(notifications);
//     }

//     revalidatePath("/profile/photos");
//     return { success: true, photo };
// }

// export async function deletePhoto(photoId: string) {
//     const supabase = await createClient();

//     const {
//         data: { user },
//     } = await supabase.auth.getUser();

//     if (!user) return { error: "Not authenticated" };

//     // Verify ownership through album
//     const { data: photo } = await supabase
//         .from("album_photos")
//         .select("album_id, photo_albums(user_id)")
//         .eq("id", photoId)
//         .single();

//     if (!photo || (photo.photo_albums as any)?.user_id !== user.id) {
//         return { error: "Not authorized" };
//     }

//     const { error } = await supabase
//         .from("album_photos")
//         .delete()
//         .eq("id", photoId);

//     if (error) return { error: error.message };

//     revalidatePath("/profile/photos");
//     return { success: true };
// }


/* =========================
   MEDIA UPLOAD TO SUPABASE STORAGE
========================= */

export async function uploadMedia(file: File, bucket: string = 'media') {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
        });

    if (error) return { error: error.message };

    const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

    return { success: true, url: publicUrl };
}

export async function deleteMedia(filePath: string, bucket: string = 'media') {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    const { error } = await supabase.storage
        .from(bucket)
        .remove([filePath]);

    if (error) return { error: error.message };

    return { success: true };
}

/* =========================
   PROFILE PHOTO UPDATES
========================= */

export async function updateProfilePhoto(photoUrl: string) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    const { error } = await supabase
        .from("profiles")
        .update({ avatar_url: photoUrl })
        .eq("id", user.id);

    if (error) return { error: error.message };

    revalidatePath("/profile");
    return { success: true };
}

// TODO: Add cover_photo_url column to profiles table first
// export async function updateCoverPhoto(photoUrl: string) {
//     const supabase = await createClient();

//     const {
//         data: { user },
//     } = await supabase.auth.getUser();

//     if (!user) return { error: "Not authenticated" };

//     const { error } = await supabase
//         .from("profiles")
//         .update({ cover_photo_url: photoUrl })
//         .eq("id", user.id);

//     if (error) return { error: error.message };

//     revalidatePath("/profile");
//     return { success: true };
// }

