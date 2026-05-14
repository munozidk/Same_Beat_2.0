import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { useLocation } from "react-router-dom"

import "./ChatScreen.css"

// COMPONENTES
import CommunitiesSection from "../../components/Communities/Communities"
import DirectList from "../../components/DirectList/DirectList"
import TopBar from "../../components/TopBar/TopBar"
import Suggestions from "../../components/Suggestions/Suggestions"
import LiveMap from "../../components/LiveMap/LiveMap"
import ChatPreview from "../../components/ChatPreview/ChatPreview"

// =========================
// INTERFACES
// =========================

/* 
  Interface que define
  la estructura de un chat
*/
interface Chat {

  id: number

  userId: number

  lastMessage: string

  timestamp: string

  unreadCount: number
}

/* 
  Props que recibe
  ChatScreen
*/
interface ChatScreenProps {

  onSelectChat?: (
    chat: Chat
  ) => void

  onToggleExpanded?: (
    expanded: boolean
  ) => void
}

// =========================
// COMPONENTE PRINCIPAL
// =========================

const ChatScreen = ({

  onSelectChat,
  onToggleExpanded

}: ChatScreenProps) => {

  // =========================
  // ROUTER
  // =========================

  /* 
    Detecta la ruta actual
    
    Ejemplo:
    /home
    /map
    /chat
  */
  const location = useLocation()

  // =========================
  // STATES
  // =========================

  /* 
    Chat actualmente seleccionado
  */
  const [
    selectedChat,
    setSelectedChat
  ] = useState<Chat | null>({

    id: 1,

    userId: 123,

    lastMessage:
      "Hola, ¿cómo estás?",

    timestamp:
      "2026-05-11T10:30:00Z",

    unreadCount: 2
  })

  /* 
    Estado del ChatPreview
    
    true:
    expandido
    
    false:
    minimizado
  */
  const [
    isExpanded,
    setIsExpanded
  ] = useState(true)

  /* 
    Detecta si es mobile
  */
  const [
    isMobile,
    setIsMobile
  ] = useState(

    window.innerWidth <= 768
  )

  // =========================
  // EFFECT RESPONSIVE
  // =========================

  useEffect(() => {

    /* 
      Detecta cambios
      en el tamaño
      de la pantalla
    */
    const handleResize = () => {

      setIsMobile(

        window.innerWidth <= 768
      )
    }

    // Escuchar resize
    window.addEventListener(
      "resize",
      handleResize
    )

    // Cleanup
    return () => {

      window.removeEventListener(
        "resize",
        handleResize
      )
    }

  }, [])

  // =========================
  // CHAT PREVIEW
  // =========================

  /* 
    El preview NO aparece:
    
    - en mobile
    - en /map
  */
  const showChatPreview =

    location.pathname.toLowerCase()
      !== "/map" && !isMobile

  // =========================
  // RENDER
  // =========================

  return (

    <>

      {/* =========================
           CHAT SCREEN
      ========================= */}

      <div className="chat-screen">

        {/* =========================
             MAIN CONTENT
        ========================= */}

        <main className="chat-screen__main">

          {/* =========================
               PARTE FIJA
               
               ESTA PARTE
               NO HACE SCROLL
          ========================= */}

          <div className="chat-screen__fixed-top">

            {/* TOPBAR */}

            <TopBar title="Chats" />

            {/* SUGGESTIONS */}

            <Suggestions />

          </div>

          {/* =========================
               SCROLL AREA
               
               SOLO ESTA PARTE
               HACE SCROLL
          ========================= */}

          <section
            className="chat-screen__content-scrollable"
          >

            {/* COMMUNITIES */}

            <CommunitiesSection />

            {/* DIRECT CHATS */}

            <DirectList
              onSelectChat={(chat) => {

                // Guardamos chat seleccionado
                setSelectedChat(chat)

                // Abrimos preview
                setIsExpanded(true)

                // Callback opcional
                if (onSelectChat) {

                  onSelectChat(chat)
                }

                // Callback opcional
                if (onToggleExpanded) {

                  onToggleExpanded(true)
                }
              }}
            />

          </section>

        </main>

        {/* =========================
             RIGHT PANEL
             
             MAPA LATERAL
        ========================= */}

        <aside className="chat-screen__right-panel">

          <LiveMap />

        </aside>

      </div>

      {/* =========================
           CHAT PREVIEW FLOATING
      ========================= */}

      {showChatPreview && createPortal(

        <ChatPreview

          selectedChat={selectedChat}

          isExpanded={isExpanded}

          onToggle={() =>

            setIsExpanded(
              !isExpanded
            )
          }
        />,

        document.body
      )}

    </>
  )
}

// =========================
// EXPORT
// =========================

export default ChatScreen