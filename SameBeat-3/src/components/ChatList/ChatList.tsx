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
    return (
        <div className='chat-list__glass-frame'>
            <div className='chat-list'>
                {chats.map(chat => (
                    <div key={chat.id} className='chat-item'>
                        <img
                            src={chat.image}
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