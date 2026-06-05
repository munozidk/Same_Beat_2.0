import { useState } from "react";
import { X } from "lucide-react";
import type { Post } from "../../types";
import { DEFAULT_AVATAR } from "../../lib/profileUtils";
import './SPostModal.css';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (post: Post) => void;
    currentPosts: Post[];
}

export default function PostModal({ isOpen, onClose, onSubmit, currentPosts}: Props) {
    console.log("PostModal isOpen:", isOpen);
    const [text,setText] = useState('');

    function handleSubmit() {
        const trimmed = text.trim();
        if (!trimmed) return;

        const newPost: Post = {
            id: currentPosts.length + 1,
            user: 'You',
            text: trimmed,
            image: DEFAULT_AVATAR,
            likes: 0,
            reposts: 0,
            comments: []
        }

        onSubmit(newPost);
        setText('')
        onClose()
    }
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-box">

                <div className="modal-header">
                    <h2 className="modal-title">Add Post</h2>
                    <button onClick={onClose} className="close-btn">
                        <X size={20} stroke="#C6FF34" />
                    </button>
                </div>

                <textarea
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="What are you listening today?"
                    maxLength={280}
                    className="modal-textarea"
                />

                <button onClick={handleSubmit} className="submit-btn">
                    Post
                </button>
            </div>
        </div>
    )
}
