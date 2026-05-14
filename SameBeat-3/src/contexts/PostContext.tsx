import { createContext, useContext, useState } from "react";
import type { Post } from "../types";
import { posts as initialPosts } from "../data";

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

// =========================
// PROVIDER
// =========================

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [modalOpen, setModalOpen] = useState(false);

  console.log("PostProvider render, modalOpen:", modalOpen); 

  return (
    <PostContext.Provider value={{
      posts,
      addPost: (post) => {
        console.log("addPost llamado"); 
        setPosts(prev => [post, ...prev]);
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