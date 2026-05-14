import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { useLocation } from "react-router-dom"

import "./ChatScreen.css"

import Communities from '../Communities/Communities'
import DirectList from '../../components/DirectList/DirectList'
import TopBar from '../../components/TopBar/TopBar'
import Suggestions from "../../components/Suggestions/Suggestions"
import LiveMap from "../../components/LiveMap/LiveMap"
import ChatPreview from "../../components/ChatPreview/ChatPreview"
import SearchBar from "../../components/SearchBar/SearchBar"

// Interface que define un chat
interface Chat {
  id: number
  userId: number
  lastMessage: string
  timestamp: string
  unreadCount: number
}

// Interface que define qué props recibe este componente
interface ChatScreenProps {
  onSelectChat?: (chat: Chat) => void
  onToggleExpanded?: (expanded: boolean) => void
}

// Componente principal de chats
const ChatScreen = ({
  onSelectChat,
  onToggleExpanded
}: ChatScreenProps) => {

  // Hook que detecta en qué ruta estás
  const location = useLocation()

  // Estado: chat seleccionado actualmente
  const [selectedChat, setSelectedChat] = useState<Chat | null>({
    id: 1,
    userId: 123,
    lastMessage: "Hola, ¿cómo estás?",
    timestamp: "2026-05-11T10:30:00Z",
    unreadCount: 2
  })

  // Estado: si el chat preview está expandido o minimizado
  const [isExpanded, setIsExpanded] = useState(true)

  // Estado: texto del buscador
  const [search, setSearch] = useState("")

  // Estado: detecta si es mobile (ancho <= 768px)
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 768
  )

  // Hook que ejecuta código cuando el componente se monta y se desmonta
  useEffect(() => {

    // Función que se ejecuta cada vez que la ventana cambia de tamaño
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // Escucha el evento de redimensionar
    window.addEventListener("resize", handleResize)

    // Limpia el evento cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", handleResize)
    }

  }, [])

  // Lógica: mostrar ChatPreview solo si:
  // - NO estamos en /map
  // - NO es mobile
  const showChatPreview =
    location.pathname !== "/map" && !isMobile

  return (
    <>
      <div className="chat-screen">

        {/* SECCIÓN PRINCIPAL */}
        <main className="chat-screen__main">
          
          {/* BARRA SUPERIOR */}
          <TopBar>

            {/* Buscador en el TopBar */}
            <SearchBar
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              placeholder="Buscar chats..."
            />

          </TopBar>

          {/* SUGERENCIAS DE USUARIOS */}
          <Suggestions />

          {/* CONTENEDOR CON SCROLL */}
          <section className="chat-screen__content-scrollable">

            {/* COMUNIDADES */}
            <Communities />

            {/* LISTA DE CHATS DIRECTOS */}
            <DirectList
              onSelectChat={(chat) => {

                setSelectedChat(chat)

                setIsExpanded(true)

                if (onSelectChat) {
                  onSelectChat(chat)
                }

                if (onToggleExpanded) {
                  onToggleExpanded(true)
                }
              }}
            />

          </section>

        </main>

        {/* PANEL DERECHO - MAPA */}
        <aside className="chat-screen__right-panel">

          <LiveMap />

        </aside>

      </div>

      {/* PREVIEW DEL CHAT - Flotante en la esquina */}
      {/* Solo se muestra si cumple las condiciones (showChatPreview) */}
      {showChatPreview && createPortal(

        <ChatPreview
          selectedChat={selectedChat}
          isExpanded={isExpanded}
          onToggle={() =>
            setIsExpanded(!isExpanded)
          }
        />,

        document.body
      )}
    </>
  )
}

export default ChatScreen