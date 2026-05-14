import { Repeat2 } from "lucide-react";
import { useState} from 'react';
import './SShareButton.css';

interface Props {
    initialReposts: number;
}

export default function ShareButton({ initialReposts}: Props) {
    const [reposts, setReposts] = useState(initialReposts);
    const [active, setActive] = useState(false);

    function handleClick(){
        if (active) {
            setReposts(reposts - 1);
            setActive(false);
        } else {
            setReposts(reposts + 1);
            setActive(true);
        }
    }

    return (
        <button onClick={handleClick} className="share-button">
            <Repeat2
                size={22}
                className={active ? 'repeat-active' : 'repeat-inactive'}
                />
                <span className="share-count">{reposts}</span>
        </button>
    )
}