import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Post } from "../types";
import { supabase } from "../lib/supabaseClient";

// =========================
// TIPOS
// =========================

interface PostContextType {
  posts: Post[];
  addPost: (post: Post) => void;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
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

type SupabasePostRow = {
  id: number;
  text: string | null;
  likes: number | null;
  reposts: number | null;
  profiles: SupabasePostAuthor | SupabasePostAuthor[] | null;
};

function getAuthorProfile(profiles: SupabasePostRow["profiles"]) {
  if (Array.isArray(profiles)) {
    return profiles[0] ?? null;
  }

  return profiles;
}

function mapSupabasePostToPost(post: SupabasePostRow): Post {
  const author = getAuthorProfile(post.profiles);

  return {
    id: post.id,
    user: author?.full_name || author?.username || "Unknown",
    image: author?.avatar_url || "assets/avatar 1.jpg",
    text: post.text ?? "",
    likes: post.likes ?? 0,
    reposts: post.reposts ?? 0,
    comments: [],
  };
}

// =========================
// PROVIDER
// =========================

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const loadPosts = useCallback(async () => {
    const { data, error } = await supabase
      .from("posts")
      .select(`
        id,
        text,
        likes,
        reposts,
        profiles (
          username,
          full_name,
          avatar_url
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

  async function createPostInSupabase(post: Post) {
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

    const { error: insertError } = await supabase
      .from("posts")
      .insert({
        author_profile_id: profile.id,
        text: post.text,
        likes: 0,
        reposts: 0,
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

  console.log("PostProvider render, modalOpen:", modalOpen); 

  return (
    <PostContext.Provider value={{
      posts,
      addPost: (post) => {
        console.log("addPost llamado"); 
        void createPostInSupabase(post);
      },
      modalOpen,
      setModalOpen: (val) => {
        console.log("setModalOpen llamado con:", val); 
        setModalOpen(val);
      },
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
