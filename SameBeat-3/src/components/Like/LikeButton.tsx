import { Heart } from 'lucide-react';
import { useState } from 'react';
import './SlikeButton.css'

interface Props {
    initialLikes: number;
}

export default function LikeButton({ initialLikes }: Props) {
    const [likes, setLikes] = useState(initialLikes)
    const [active, setActive] = useState(false)

    function handleClick() {
        if (active) {
            setLikes(likes -1)
            setActive(false)
        } else {
            setLikes(likes + 1)
            setActive(true)
        }
    }

    return (
        <button onClick={handleClick} className="like-button">
            <Heart 
                size={22}
                className={active ? 'heart-active' : 'heart-inactive'}
                
                />
                <span className="like-count">{likes}</span>
        </button>
    )
}
