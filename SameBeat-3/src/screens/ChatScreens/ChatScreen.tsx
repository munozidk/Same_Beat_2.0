import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";

import "./ChatScreen.css";
import DirectList from "../../components/DirectList/DirectList";
import TopBar from "../../components/TopBar/TopBar";
import Suggestions from "../../components/Suggestions/Suggestions";
import LiveMap from "../../components/LiveMap/LiveMap";
import ChatPreview from "../../components/ChatPreview/ChatPreview";
import SearchBar from "../../components/SearchBar/SearchBar";
import Communities from "../Communities/Communities"; 

interface Chat {
  id: number;
  userId: number;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

interface ChatScreenProps {
  onSelectChat?: (chat: Chat) => void;
  onToggleExpanded?: (expanded: boolean) => void;
}

const ChatScreen = ({ onSelectChat, onToggleExpanded }: ChatScreenProps) => {
  const location = useLocation();

  const [selectedChat, setSelectedChat] = useState<Chat | null>({
    id: 1,
    userId: 123,
    lastMessage: "Hola, ¿cómo estás?",
    timestamp: "2026-05-11T10:30:00Z",
    unreadCount: 2,
  });

  const [isExpanded, setIsExpanded] = useState(true);
  const [search, setSearch] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showChatPreview = location.pathname !== "/map" && !isMobile;

  return (
    <>
      <div className="chat-screen">
        <main className="chat-screen__main">
          <TopBar>
            <SearchBar
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              placeholder="Buscar chats..."
            />
          </TopBar>

          {/* Scroll general con Communities y DirectList */}
          <section className="chat-screen__content-scrollable">
            <Suggestions />
            <Communities />
            <DirectList
              onSelectChat={(chat) => {
                setSelectedChat(chat);
                setIsExpanded(true);
                if (onSelectChat) onSelectChat(chat);
                if (onToggleExpanded) onToggleExpanded(true);
              }}
            />
          </section>
        </main>

        <aside className="chat-screen__right-panel">
          <LiveMap />
        </aside>
      </div>

      {showChatPreview &&
        createPortal(
          <ChatPreview
            selectedChat={selectedChat}
            isExpanded={isExpanded}
            onToggle={() => setIsExpanded(!isExpanded)}
          />,
          document.body
        )}
    </>
  );
};

export default ChatScreen;
