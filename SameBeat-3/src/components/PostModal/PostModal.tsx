import { useEffect, useRef, useState } from "react";
import { ImagePlus, Music, X } from "lucide-react";
import type { CreatePostPayload } from "../../contexts/PostContext";
import { usePostContext } from "../../contexts/PostContext";
import { isAllowedPostAudio, isAllowedPostImage } from "../../lib/postMediaStorage";
import './SPostModal.css';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (payload: CreatePostPayload) => Promise<void>;
}

export default function PostModal({ isOpen, onClose, onSubmit }: Props) {
    const { pendingPostMedia, setPendingPostMedia } = usePostContext();
    const [text, setText] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [audioPreviewName, setAudioPreviewName] = useState<string | null>(null);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const imageInputRef = useRef<HTMLInputElement | null>(null);
    const audioInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!isOpen || !pendingPostMedia) return;

        if (pendingPostMedia.type === 'image') {
            setImageFile(pendingPostMedia.file);
            setImagePreview(URL.createObjectURL(pendingPostMedia.file));
        }

        if (pendingPostMedia.type === 'audio') {
            setAudioFile(pendingPostMedia.file);
            setAudioPreviewName(pendingPostMedia.file.name);
        }

        setPendingPostMedia(null);
    }, [isOpen, pendingPostMedia, setPendingPostMedia]);

    useEffect(() => {
        return () => {
            if (imagePreview?.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    function resetForm() {
        setText('');
        setImageFile(null);
        setAudioFile(null);
        setImagePreview(null);
        setAudioPreviewName(null);
        setError('');
    }

    function handleClose() {
        resetForm();
        onClose();
    }

    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!isAllowedPostImage(file)) {
            setError('Formato de imagen no soportado. Usa JPG, PNG, WEBP o GIF.');
            return;
        }

        setError('');
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    }

    function handleAudioChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!isAllowedPostAudio(file)) {
            setError('Formato de audio no soportado. Usa MP3, WAV, OGG o similar.');
            return;
        }

        setError('');
        setAudioFile(file);
        setAudioPreviewName(file.name);
    }

    async function handleSubmit() {
        const trimmed = text.trim();

        if (!trimmed && !imageFile && !audioFile) {
            setError('Escribe algo o adjunta una imagen o un audio.');
            return;
        }

        setError('');
        setIsSubmitting(true);

        try {
            await onSubmit({
                text: trimmed,
                imageFile,
                audioFile,
            });
            resetForm();
            onClose();
        } catch (submitError) {
            const message = submitError instanceof Error
                ? submitError.message
                : 'No se pudo publicar el post.';
            setError(message);
        } finally {
            setIsSubmitting(false);
        }
    }

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-box">

                <div className="modal-header">
                    <h2 className="modal-title">Add Post</h2>
                    <button onClick={handleClose} className="close-btn" type="button">
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

                <div className="modal-media-actions">
                    <button
                        type="button"
                        className="modal-media-btn"
                        onClick={() => imageInputRef.current?.click()}
                    >
                        <ImagePlus size={18} />
                        Imagen
                    </button>

                    <button
                        type="button"
                        className="modal-media-btn"
                        onClick={() => audioInputRef.current?.click()}
                    >
                        <Music size={18} />
                        Audio
                    </button>
                </div>

                <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    hidden
                    onChange={handleImageChange}
                />

                <input
                    ref={audioInputRef}
                    type="file"
                    accept="audio/mpeg,audio/mp3,audio/wav,audio/ogg,audio/webm,audio/aac,audio/mp4,.mp3,.wav,.ogg,.m4a"
                    hidden
                    onChange={handleAudioChange}
                />

                {imagePreview && (
                    <div className="modal-media-preview">
                        <img src={imagePreview} alt="Preview" className="modal-media-image" />
                        <button
                            type="button"
                            className="modal-media-remove"
                            onClick={() => {
                                setImageFile(null);
                                setImagePreview(null);
                            }}
                        >
                            Quitar imagen
                        </button>
                    </div>
                )}

                {audioPreviewName && (
                    <div className="modal-media-preview modal-media-preview--audio">
                        <span className="modal-audio-name">{audioPreviewName}</span>
                        <button
                            type="button"
                            className="modal-media-remove"
                            onClick={() => {
                                setAudioFile(null);
                                setAudioPreviewName(null);
                            }}
                        >
                            Quitar audio
                        </button>
                    </div>
                )}

                {error && <p className="modal-error">{error}</p>}

                <button
                    onClick={() => void handleSubmit()}
                    className="submit-btn"
                    disabled={isSubmitting}
                    type="button"
                >
                    {isSubmitting ? 'Publicando...' : 'Post'}
                </button>
            </div>
        </div>
    )
}
