import { Bell, Settings } from "lucide-react"
import "./TopBar.css"
import profile from "../../assets/profile.jpg"
// Interface que define qué props puede recibir el componente
interface TopBarProps {
  children?: React.ReactNode  // children es opcional (?)
}

// Componente TopBar (barra superior de la app)
const TopBar = ({ children }: TopBarProps) => {

  
  return (
    <header className="topbar">

      {/* SECCIÓN IZQUIERDA - Título */}
      <div className="topbar__left">
        <h1>Chats</h1>
      </div>

      {/* SECCIÓN CENTRAL - Contenido que viene desde otro componente */}
      {children}

      {/* SECCIÓN DERECHA - Avatar, notificaciones y configuración */}
      <div className="topbar__actions">

       
        {/* Avatar */}
            <div className="profile__avatar">

              <img
                src={profile}
                alt="profile"
              />

            </div>

        {/* Botón de notificaciones */}
        <button className="topbar__icon-btn">
          <Bell size={22} />
        </button>

        {/* Botón de configuración */}
        <button className="topbar__icon-btn">
          <Settings size={22} />
        </button>

      </div>

    </header>
  )
}

export default TopBar