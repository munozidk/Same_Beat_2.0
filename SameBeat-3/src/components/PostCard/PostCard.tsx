import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import type { Post, Comment } from "../../types";
import LikeButton from "../Like/LikeButton";
import ShareButton from "../Share/ShareButton";
import { imageMap } from "../../utils/imageMap";
import './SPostCard.css';

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>(post.comments || []);
  const [inputText, setInputText] = useState('');

  function handleAddComment() {
    const text = inputText.trim();
    if (!text) return;

    const newComment: Comment = {
      id: comments.length + 1,
      user: 'You',
      image: 'https://i.pravatar.cc/150?img=1',
      text
    };

    setComments([...comments, newComment]);
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
          <span className="author-name">{post.user}</span>
          <img
            src={imageMap[post.image] ?? post.image}
            alt={post.user}
            className="avatar"
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
                src={imageMap[c.image] ?? c.image}
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
            <img src="assets/avatar 1.jpg" alt="You" className="comment-avatar" />

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
