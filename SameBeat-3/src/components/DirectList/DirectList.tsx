import "./DirectList.css"

// Importamos los chats desde el archivo JSON
import chatsData from "../../data/chats/chats.json"

/* 
  Interface Chat
  
  Define la estructura
  que debe tener cada chat
*/
interface Chat {

  // ID único del chat
  id: number

  // ID del usuario
  userId: number

  // Último mensaje enviado
  lastMessage: string

  // Fecha/hora del mensaje
  timestamp: string

  // Cantidad de mensajes sin leer
  unreadCount: number
}

/* 
  Props del componente
  
  onSelectChat:
  
  Función que se ejecuta
  cuando el usuario hace click
  en un chat
*/
interface DirectListProps {

  onSelectChat: (chat: Chat) => void
}

/* 
  Componente DirectList
  
  Muestra:
  
  - lista de chats directos
  - avatar usuario
  - nombre
  - último mensaje
*/
const DirectList = ({

  onSelectChat

}: DirectListProps) => {

  return (

    /* Contenedor principal */
    <div className="section-container">

      {/* Título sección */}
      <h2 className="section-title">

        Directs

      </h2>

      {/* 
        Lista de chats
        
        Aquí se renderizan
        todos los chats
      */}
      <div className="directs-list">

        {/* 
          map()
          
          Recorre todos los chats
          del archivo JSON
        */}
        {chatsData.map((chat) => (

          /* 
            Cada chat se muestra
            como una pill/tarjeta
          */
          <div
            key={chat.id}
            className="direct-pill"

            /* 
              Cuando el usuario hace click
              se ejecuta onSelectChat()
              
              y enviamos el chat seleccionado
            */
            onClick={() => onSelectChat(chat)}
          >

            {/* Avatar usuario */}
            <img

              /* 
                Imagen dinámica
                
                Si userId es par:
                avatar mujer
                
                Si es impar:
                avatar hombre
              */
              src={
                chat.userId % 2 === 0

                  ? `https://randomuser.me/api/portraits/women/${chat.userId}.jpg`

                  : `https://randomuser.me/api/portraits/men/${chat.userId}.jpg`
              }

              alt="user"

              className="direct-pill__avatar"
            />

            {/* 
              Información del chat
              
              Contiene:
              - nombre
              - último mensaje
            */}
            <div className="direct-pill__info">

              {/* Nombre usuario */}
              <span className="direct-pill__name">

                {chat.name}

              </span>

              {/* Último mensaje */}
              <p className="direct-pill__last">

                {chat.lastMessage}

              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}

// Exportamos el componente
export default DirectList