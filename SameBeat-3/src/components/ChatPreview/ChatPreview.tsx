import "./ChatPreview.css"

// Importamos iconos desde lucide-react
// Smile = emojis
// Send = enviar mensaje
// ImageIcon = subir imágenes
import {
  Smile,
  Send,
  Image as ImageIcon,
} from "lucide-react"

// Hooks de React
import {
  useState,
  useRef,
  useEffect,
} from "react"

// Librería selector de emojis
import EmojiPicker from "emoji-picker-react"
import type { EmojiClickData } from "emoji-picker-react"

// Imagen de la persona del chat
import avatar1 from "../../assets/avatar 1.jpg"

/* 
  Interface Chat
  
  Define la estructura de un chat.
  
  Sirve para que TypeScript sepa
  qué datos debe tener cada chat.
*/
interface Chat {

  // ID del chat
  id: number

  // ID del usuario
  userId: number

  // Último mensaje enviado
  lastMessage: string

  // Fecha / hora del mensaje
  timestamp: string

  // Cantidad de mensajes sin leer
  unreadCount: number
}

/* 
  Interface Message
  
  Representa cada mensaje
  dentro de la conversación
*/
interface Message {

  // ID único del mensaje
  id: number

  // Usuario que envía
  user: string

  // Texto del mensaje
  text?: string

  // Imagen enviada
  image?: string
}

/* 
  Props del componente ChatPreview
  
  selectedChat:
  chat seleccionado actualmente
  
  isExpanded:
  define si el chat está abierto o minimizado
  
  onToggle:
  función para abrir/cerrar el chat
*/
interface ChatPreviewProps {

  selectedChat: Chat | null

  isExpanded: boolean

  onToggle: () => void
}

/* 
  Componente ChatPreview
  
  Este componente muestra:
  
  - preview del chat
  - estado minimizado
  - mensajes
  - información del usuario
  - envío de imágenes
  - emojis
*/
const ChatPreview = ({

  selectedChat,
  isExpanded,
  onToggle

}: ChatPreviewProps) => {

  /* 
    STATES
    
    Aquí guardamos:
    
    - mensajes
    - input actual
    - estado emojis
  */

  // Lista de mensajes del chat
  const [messages, setMessages] =
    useState<Message[]>([

      {
        id: 1,

        user: "Alex Drift",

        text:
          "Yo this concert is gonna be insane 🔥",
      },

      {
        id: 2,

        user: "You",

        text:
          "I literally can’t wait 😭",
      },

    ])

  // Texto escrito en el input
  const [input, setInput] =
    useState("")

  // Estado del picker de emojis
  const [
    showEmojiPicker,
    setShowEmojiPicker,
  ] = useState(false)

  // Referencia final mensajes
  const messagesEndRef =
    useRef<HTMLDivElement | null>(null)

  // Referencia input file oculto
  const fileInputRef =
    useRef<HTMLInputElement | null>(null)

  /* 
    AUTO SCROLL
    
    Cuando llegan mensajes nuevos
    hacemos scroll automático
    hacia abajo
  */
  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    })

  }, [messages])

  /* 
    SEND MESSAGE
    
    Envía un mensaje escrito
    por el usuario
  */
  const sendMessage = () => {

    // Evita mensajes vacíos
    if (!input.trim()) return

    // Nuevo mensaje
    const newMessage: Message = {

      id: Date.now(),

      user: "You",

      text: input,
    }

    // Agregamos mensaje
    setMessages((prev) => [

      ...prev,
      newMessage,

    ])

    // Limpiamos input
    setInput("")

    // Generamos respuesta fake
    autoResponse()
  }

  /* 
    AUTO RESPONSE
    
    Simula respuestas automáticas
    del otro usuario
  */
  const autoResponse = () => {

    setTimeout(() => {

      // Respuestas posibles
      const responses = [

        "NO WAYYY 😭",

        "That fit is gonna eat 🔥",

        "I’m so excited for tonight",

        "See you thereee",

        "Yesss let’s go 💜",
      ]

      // Escoge una random
      const random =
        responses[
          Math.floor(
            Math.random() *
            responses.length
          )
        ]

      // Agregamos respuesta
      setMessages((prev) => [

        ...prev,

        {
          id: Date.now() + 1,

          user: "Alex Drift",

          text: random,
        },
      ])

    }, 1200)
  }

  /* 
    EMOJIS
    
    Agrega emojis al input
  */
  const handleEmojiClick = (
    emojiData: EmojiClickData
  ) => {

    setInput((prev) =>
      prev + emojiData.emoji
    )
  }

  /* 
    IMAGE UPLOAD
    
    Permite subir imágenes
    al chat
  */
  const handleImageUpload = (
    event:
    React.ChangeEvent<HTMLInputElement>
  ) => {

    // Imagen seleccionada
    const file =
      event.target.files?.[0]

    // Si no existe imagen
    if (!file) return

    // Creamos URL temporal
    const imageUrl =
      URL.createObjectURL(file)

    // Nuevo mensaje imagen
    const newMessage: Message = {

      id: Date.now(),

      user: "You",

      image: imageUrl,
    }

    // Agregamos imagen
    setMessages((prev) => [

      ...prev,
      newMessage,

    ])

    // Respuesta automática
    autoResponse()
  }

  /* 
    Si NO existe un chat seleccionado
    
    mostramos un botón simple
    para abrir un chat
  */
  if (!selectedChat) return (

    <div className="chat-preview-wrapper">

      <button
        className="chat-preview-minimized"
        onClick={onToggle}
      >

        Abre un chat

      </button>

    </div>
  )

  return (

    // Contenedor principal del preview
    <div className="chat-preview-wrapper">

      {/* 
        Si isExpanded es true
        
        mostramos el chat completo
        
        si es false
        
        mostramos el estado minimizado
      */}
      {isExpanded ? (

        /* CHAT ABIERTO */
        <div className="chat-preview">

          {/* 
            HEADER
            
            Al hacer click:
            minimiza el chat
          */}
          <div
            className="chat-preview__header"
            onClick={onToggle}
          >

            <h2>Direct</h2>

          </div>

          {/* 
            PERFIL DEL USUARIO
            
            Información resumida
            del usuario del chat
          */}
          <div className="chat-preview__profile">

            {/* Avatar */}
            <div className="profile__avatar">

              <img
                src={avatar1}
                alt="profile"
              />

            </div>

            {/* Información */}
            <div className="profile__info">

              {/* Nombre */}
              <h3 className="profile__name">

                Alex Drift

              </h3>

              {/* Usuario */}
              <p className="profile__url">

                @alexdriftmusic

              </p>

              {/* Estadísticas */}
              <div className="profile__stats">

                <span>
                  🎧 12 shared concerts
                </span>

                <span>
                  🔥 Top listener this week
                </span>

              </div>

              {/* Botones */}
              <div className="profile__actions">

                <button>
                  FOLLOW
                </button>

                <button>
                  PROFILE
                </button>

              </div>

            </div>

          </div>

          {/* 
            MENSAJES
            
            Aquí se muestran
            todos los mensajes
            del chat
          */}
          <div className="chat-preview__messages">

            {/* Recorremos mensajes */}
            {messages.map((msg) => (

              <div
                key={msg.id}
                className={`message ${
                  msg.user === "You"
                    ? "message-you"
                    : ""
                }`}
              >

                {/* 
                  Si existe texto
                  mostramos mensaje
                */}
                {msg.text && (

                  <p>{msg.text}</p>

                )}

                {/* 
                  Si existe imagen
                  mostramos preview
                */}
                {msg.image && (

                  <img
                    src={msg.image}
                    alt="uploaded"
                    className="chat-preview-image"
                  />

                )}

              </div>

            ))}

            {/* Referencia final */}
            <div ref={messagesEndRef}></div>

          </div>

          {/* 
            INPUT
            
            Zona para escribir
            mensajes
          */}
          <div className="chat-preview__input">

            {/* 
              BOTÓN IMAGEN
              
              Abre selector
              de archivos
            */}
            <button
              className="input-action"
              onClick={() =>
                fileInputRef.current?.click()
              }
            >

              <ImageIcon size={16} />

            </button>

            {/* 
              INPUT FILE OCULTO
            */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />

            {/* Campo texto */}
            <input
              type="text"
              placeholder="mensaje..."
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              onKeyDown={(e) => {

                // Enter envía mensaje
                if (e.key === "Enter") {

                  sendMessage()

                }

              }}
            />

            {/* 
              BOTÓN EMOJIS
            */}
            <button
              className="input-action"
              onClick={() =>
                setShowEmojiPicker(
                  !showEmojiPicker
                )
              }
            >

              <Smile size={16} />

            </button>

            {/* 
              BOTÓN ENVIAR
            */}
            <button
              className="input-action"
              onClick={sendMessage}
            >

              <Send size={16} />

            </button>

          </div>

          {/* 
            EMOJI PICKER
            
            Solo aparece
            cuando showEmojiPicker
            es true
          */}
          {showEmojiPicker && (

            <div className="desktop-emoji-picker">

              <EmojiPicker
                onEmojiClick={
                  handleEmojiClick
                }
              />

            </div>

          )}

        </div>

      ) : (

        /* 
          CHAT MINIMIZADO
          
          Solo mostramos:
          
          - nombre
          - avatar
        */
        <button
          className="chat-preview-minimized"
          onClick={onToggle}
        >

          {/* Nombre usuario */}
          <span>

            Alex Drift

          </span>

          {/* Avatar minimizado */}
          <div className="minimized__avatar">

            <div className="profile__avatar">

              <img
                src={avatar1}
                alt="profile"
              />

            </div>

          </div>

        </button>

      )}

    </div>
  )
}

// Exportamos el componente
export default ChatPreview