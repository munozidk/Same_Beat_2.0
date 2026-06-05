import { useEffect, useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Post, Comment } from "../../types";
import LikeButton from "../Like/LikeButton";
import ShareButton from "../Share/ShareButton";
import { resolveAsset } from "../../utils/imageMap";
import { DEFAULT_AVATAR } from "../../lib/profileUtils";
import { supabase } from "../../lib/supabaseClient";
import { mapSupabaseCommentToComment } from "../../contexts/PostContext";
import type { SupabaseCommentRow } from "../../contexts/PostContext";
import { useUserProfile } from "../../contexts/UserProfileContext";
import './SPostCard.css';

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  const navigate = useNavigate();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>(post.comments || []);
  const [inputText, setInputText] = useState('');

  // Obtenemos la información del perfil del usuario autenticado actual.
  const { userProfile } = useUserProfile();

  const ownAvatar = resolveAsset(userProfile.image || DEFAULT_AVATAR);

  const isOwnPost = userProfile && (
    (userProfile.name && post.user === userProfile.name) ||
    (userProfile.username && post.user === userProfile.username)
  );

  useEffect(() => {
    let isMounted = true;

    async function loadComments() {
      // Esta consulta obtiene los comentarios asociados al post actual desde la base de datos de Supabase, incluyendo la información de su respectivo autor.
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
      console.error("Error getting comment author profile:", profileError?.message);
      return;
    }

    // Este comentario se guarda asociado al post donde fue creado.
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
            src={isOwnPost ? ownAvatar : resolveAsset(post.image)}
            alt={post.user}
            className="avatar"
            onClick={openAuthorProfile}
          />
        </div>
      </div>

      <div className="post-content">
        {post.text && <p className="post-text">{post.text}</p>}

        {post.mediaImage && (
          <img
            src={post.mediaImage}
            alt="Post media"
            className="post-media-image"
          />
        )}

        {post.mediaSong && (
          <audio controls preload="metadata" className="post-media-audio">
            <source src={post.mediaSong} />
          </audio>
        )}
      </div>

      {showComments && (
        <div className="comments-section">
          {comments.map(c => {
            // Comparamos el autor del comentario con los datos de nuestro perfil autenticado.
            const isOwnComment = userProfile && (
              (userProfile.name && c.user === userProfile.name) ||
              (userProfile.username && c.user === userProfile.username)
            );
            return (
              <div key={c.id} className="comment-item">
                <img
                  src={isOwnComment ? ownAvatar : resolveAsset(c.image)}
                  alt={c.user}
                  className="comment-avatar"
                />
                <div className="comment-bubble">
                  <span className="comment-user">{c.user}</span>
                  <p className="comment-text">{c.text}</p>
                </div>
              </div>
            );
          })}

          <div className="input-row">
            {/* Mostramos la foto de perfil única del usuario actual al lado de la caja de comentarios */}
            <img src={ownAvatar} alt="You" className="comment-avatar" />

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
