import { useState } from "react"
import { Bell, Settings } from "lucide-react"
import "./TopBar.css"
import profile from "../../assets/profile.jpg"
import SearchBar from "../SearchBar/SearchBar"

// Interface que define qué props puede recibir el componente
interface TopBarProps {
  children?: React.ReactNode
  title?: string
}

// Componente TopBar (barra superior de la app)
const TopBar = ({ children, title = "Chats" }: TopBarProps) => {

  // Estado local para la búsqueda
  const [search, setSearch] = useState("")

  return (
    <header className="topbar">

      {/* SECCIÓN IZQUIERDA - Título */}
      <div className="topbar__left">
        <h1>{title}</h1>
      </div>

      {/* SECCIÓN CENTRAL - SearchBar siempre visible */}
      <div className="topbar__center">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar..."
        />
        {/* Children adicionales si se pasan */}
        {children}
      </div>

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