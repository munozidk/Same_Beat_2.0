import { useNavigate } from 'react-router-dom';
import { resolveAsset } from '../../utils/imageMap';
import './SChatList.css'

interface Chat {
    id: number;
    name: string;
    image: string;
}

interface Props {
    chats: Chat[];
}

export default function ChatList({ chats }: Props) {
    const navigate = useNavigate();

    return (
        <div className='chat-list__glass-frame'>
            <div className='chat-list'>
                {chats.map(chat => (
                    <div
                        key={chat.id}
                        className='chat-item'
                        onClick={() => navigate('/chat')}
                        style={{ cursor: 'pointer' }}
                    >
                        <img
                            src={resolveAsset(chat.image)}
                            alt={chat.name}
                            className='chat-item__avatar'
                        />
                        <span className='chat-item__name'>{chat.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}