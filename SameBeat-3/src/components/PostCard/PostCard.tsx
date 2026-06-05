import { useEffect, useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Post, Comment } from "../../types";
import LikeButton from "../Like/LikeButton";
import ShareButton from "../Share/ShareButton";
import { resolveAsset } from "../../utils/imageMap";
import { supabase } from "../../lib/supabaseClient";
import { mapSupabaseCommentToComment } from "../../contexts/PostContext";
import type { SupabaseCommentRow } from "../../contexts/PostContext";
import './SPostCard.css';

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  const navigate = useNavigate();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>(post.comments || []);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadComments() {
      const { data, error } = await supabase
        .from("comments")
        .select(`
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
        `)
        .eq("post_id", post.id)
        .order("created_at", { ascending: true });

      if (!isMounted) return;

      if (error) {
        console.error("Error loading comments:", error.message);
        setComments(post.comments || []);
        return;
      }

      setComments((data ?? []).map(comment =>
        mapSupabaseCommentToComment(comment as SupabaseCommentRow)
      ));
    }

    void loadComments();

    return () => {
      isMounted = false;
    };
  }, [post.id, post.comments]);

  function openAuthorProfile() {
    if (!post.authorProfileId) return;

    navigate(`/profile/${encodeURIComponent(String(post.authorProfileId))}`);
  }

  async function handleAddComment() {
    const text = inputText.trim();
    if (!text) return;

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
      console.error("Error getting comment author profile:", profileError?.message);
      return;
    }

    const { data: insertedComment, error: insertError } = await supabase
      .from("comments")
      .insert({
        post_id: post.id,
        author_profile_id: profile.id,
        text,
      })
      .select(`
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
      `)
      .single();

    if (insertError || !insertedComment) {
      console.error("Error creating comment:", insertError?.message);
      return;
    }

    setComments([
      ...comments,
      mapSupabaseCommentToComment(insertedComment as SupabaseCommentRow),
    ]);
    setInputText('');
  }

  return (
    <article className="post-card">
      <div className="post-header">
        <div className="post-actions">
          <LikeButton initialLikes={post.likes} />

          <button onClick={() => setShowComments(!showComments)} className="icon-btn">
                <span className="icon-text">
                    <MessageCircle size={22} color="white" />
                        <span className="count">{comments.length}</span>
                </span>
            </button>

          <ShareButton initialReposts={post.reposts} />
        </div>

        <div className="author-info">
          <button
            type="button"
            className="author-name author-profile-link"
            onClick={openAuthorProfile}
            disabled={!post.authorProfileId}
          >
            {post.user}
          </button>
          <img
            src={resolveAsset(post.image)}
            alt={post.user}
            className="avatar"
            onClick={openAuthorProfile}
          />
        </div>
      </div>

      <div className="post-content">
        <p className="post-text">{post.text}</p>
      </div>

      {showComments && (
        <div className="comments-section">
          {comments.map(c => (
            <div key={c.id} className="comment-item">
              <img
                src={resolveAsset(c.image)}
                alt={c.user}
                className="comment-avatar"
              />
              <div className="comment-bubble">
                <span className="comment-user">{c.user}</span>
                <p className="comment-text">{c.text}</p>
              </div>
            </div>
          ))}

          <div className="input-row">
            <img src={resolveAsset("assets/avatar 1.jpg")} alt="You" className="comment-avatar" />

            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Write a comment..."
              className="input"
              maxLength={200}
            />

            <button onClick={handleAddComment} className="send-btn">
              <Send size={16} color="black" />
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
