import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Comment, Post } from "../types";
import { supabase } from "../lib/supabaseClient";
import { DEFAULT_AVATAR } from "../lib/profileUtils";
import { uploadPostMediaFile } from "../lib/postMediaStorage";

export type CreatePostPayload = {
  text: string;
  imageFile?: File | null;
  audioFile?: File | null;
};

export type PendingPostMedia = {
  type: "image" | "audio";
  file: File;
};

// =========================
// TIPOS
// =========================

interface PostContextType {
  posts: Post[];
  addPost: (payload: CreatePostPayload) => Promise<void>;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  pendingPostMedia: PendingPostMedia | null;
  setPendingPostMedia: (media: PendingPostMedia | null) => void;
}

// =========================
// CONTEXT
// =========================

const PostContext = createContext<PostContextType | null>(null);

type SupabasePostAuthor = {
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
};

export type SupabaseCommentRow = {
  id: number;
  post_id: number | null;
  author_profile_id: string | number | null;
  text: string | null;
  profiles: SupabasePostAuthor | SupabasePostAuthor[] | null;
};

export type SupabasePostRow = {
  id: number;
  author_profile_id: string | number | null;
  text: string | null;
  likes: number | null;
  reposts: number | null;
  media_image?: string | null;
  media_song?: string | null;
  profiles: SupabasePostAuthor | SupabasePostAuthor[] | null;
  comments?: SupabaseCommentRow[] | null;
};

function getAuthorProfile(profiles: SupabasePostRow["profiles"]) {
  if (Array.isArray(profiles)) {
    return profiles[0] ?? null;
  }

  return profiles;
}

export function mapSupabaseCommentToComment(comment: SupabaseCommentRow): Comment {
  const author = getAuthorProfile(comment.profiles);

  return {
    id: comment.id,
    postId: comment.post_id ?? undefined,
    authorProfileId: comment.author_profile_id ?? undefined,
    user: author?.full_name || author?.username || "Unknown",
    image: author?.avatar_url || DEFAULT_AVATAR,
    text: comment.text ?? "",
  };
}

export function mapSupabasePostToPost(post: SupabasePostRow): Post {
  const author = getAuthorProfile(post.profiles);

  return {
    id: post.id,
    authorProfileId: post.author_profile_id ?? undefined,
    user: author?.full_name || author?.username || "Unknown",
    image: author?.avatar_url || DEFAULT_AVATAR,
    text: post.text ?? "",
    likes: post.likes ?? 0,
    reposts: post.reposts ?? 0,
    comments: (post.comments ?? []).map(mapSupabaseCommentToComment),
    mediaImage: post.media_image ?? null,
    mediaSong: post.media_song ?? null,
  };
}

// =========================
// PROVIDER
// =========================

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingPostMedia, setPendingPostMedia] = useState<PendingPostMedia | null>(null);

  const loadPosts = useCallback(async () => {
    const { data, error } = await supabase
      .from("posts")
      .select(`
        id,
        author_profile_id,
        text,
        likes,
        reposts,
        media_image,
        media_song,
        profiles (
          username,
          full_name,
          avatar_url
        ),
        comments (
          id,
          post_id,
          author_profile_id,
          text,
          created_at,
          profiles (
            username,
            full_name,
            avatar_url
          )
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading posts:", error.message);
      setPosts([]);
      return;
    }

    setPosts((data ?? []).map((post) =>
      mapSupabasePostToPost(post as SupabasePostRow)
    ));
  }, []);

  async function createPostInSupabase(payload: CreatePostPayload) {
    const trimmedText = payload.text.trim();
    const hasImage = Boolean(payload.imageFile);
    const hasAudio = Boolean(payload.audioFile);

    if (!trimmedText && !hasImage && !hasAudio) {
      return;
    }

    const { data: authData, error: authError } = await supabase.auth.getUser();
    const authUser = authData.user;

    if (authError || !authUser) {
      console.error("Error getting authenticated user:", authError?.message);
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("auth_user_id", authUser.id)
      .maybeSingle();

    if (profileError || !profile) {
      console.error("Error getting author profile:", profileError?.message);
      return;
    }

    let mediaImage: string | null = null;
    let mediaSong: string | null = null;

    if (payload.imageFile) {
      const { publicUrl, error: uploadError } = await uploadPostMediaFile(
        authUser.id,
        payload.imageFile,
        "images"
      );

      if (uploadError || !publicUrl) {
        console.error("Error uploading post image:", uploadError);
        return;
      }

      mediaImage = publicUrl;
    }

    if (payload.audioFile) {
      const { publicUrl, error: uploadError } = await uploadPostMediaFile(
        authUser.id,
        payload.audioFile,
        "audio"
      );

      if (uploadError || !publicUrl) {
        console.error("Error uploading post audio:", uploadError);
        return;
      }

      mediaSong = publicUrl;
    }

    const { error: insertError } = await supabase
      .from("posts")
      .insert({
        author_profile_id: profile.id,
        text: trimmedText,
        likes: 0,
        reposts: 0,
        media_image: mediaImage,
        media_song: mediaSong,
      });

    if (insertError) {
      console.error("Error creating post:", insertError.message);
      return;
    }

    await loadPosts();
  }

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return (
    <PostContext.Provider value={{
      posts,
      addPost: createPostInSupabase,
      modalOpen,
      setModalOpen: (val) => {
        if (!val) {
          setPendingPostMedia(null);
        }
        setModalOpen(val);
      },
      pendingPostMedia,
      setPendingPostMedia,
    }}>
      {children}
    </PostContext.Provider>
  );
}

// =========================
// HOOK
// =========================

export function usePostContext() {
  const ctx = useContext(PostContext);
  if (!ctx) throw new Error("usePostContext must be inside PostProvider");
  return ctx;
}
