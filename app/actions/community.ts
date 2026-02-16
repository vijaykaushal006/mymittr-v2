"use server";

import { createClient } from "@/lib/supabaseServer";

/* =========================
   CREATE POST
========================= */
export async function createPost(formData: FormData) {
  const supabase = await createClient(); // ✅ MUST await

  const content = formData.get("content") as string;

  if (!content || content.trim() === "") return;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  await supabase.from("community_posts").insert({
    content,
    user_id: user.id,
  });
}

/* =========================
   LIKE POST
========================= */
export async function likePost(postId: string) {
  const supabase = await createClient(); // ✅ await

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  await supabase.from("community_likes").insert({
    post_id: postId,
    user_id: user.id,
  });
}

/* =========================
   COMMENT POST
========================= */
export async function commentPost(postId: string, content: string) {
  const supabase = await createClient(); // ✅ await

  if (!content || content.trim() === "") return;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  await supabase.from("community_comments").insert({
    post_id: postId,
    user_id: user.id,
    content,
  });
}
