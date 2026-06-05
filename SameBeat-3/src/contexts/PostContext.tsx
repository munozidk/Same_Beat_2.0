import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Comment, Post } from "../types";
import { supabase } from "../lib/supabaseClient";
import { DEFAULT_AVATAR } from "../lib/profileUtils";

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
  };
}

// =========================
// PROVIDER
// =========================

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const loadPosts = useCallback(async () => {
    // Esta consulta trae los posts desde la base de datos, incluyendo la información de su autor y los comentarios correspondientes.
    const { data, error } = await supabase
      .from("posts")
      .select(`
        id,
        author_profile_id,
        text,
        likes,
        reposts,
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

  async function createPostInSupabase(post: Post) {
    // Obtenemos los datos del usuario autenticado actualmente.
    const { data: authData, error: authError } = await supabase.auth.getUser();
    const authUser = authData.user;

    if (authError || !authUser) {
      console.error("Error getting authenticated user:", authError?.message);
      return;
    }

    // Aquí buscamos el ID del perfil que corresponde al usuario autenticado.
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("auth_user_id", authUser.id)
      .maybeSingle();

    if (profileError || !profile) {
      console.error("Error getting author profile:", profileError?.message);
      return;
    }

    // Este insert guarda un nuevo post en la tabla posts.
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

    // Después de guardar en Supabase recargamos los datos para mostrar los cambios en pantalla.
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
