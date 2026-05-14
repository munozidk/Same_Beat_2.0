import { ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

import LiveMap from "../../components/LiveMap/LiveMap";

import "./MapScreen.css"

// Componente que muestra el mapa en pantalla completa
const MapScreen = () => {

  // Hook que permite navegar entre rutas
  const navigate = useNavigate()

  return (

    <div className="map-screen">

      {/* BOTÓN ATRÁS */}
      {/* Al clickear regresa a /chats */}
      <button
        className="map-screen__back-btn"
        onClick={() => navigate("/chats")}
      >

        <ChevronLeft size={28} />

      </button>

      {/* CONTENEDOR DEL MAPA */}
      <div className="map-screen__map">

        {/* Componente del mapa en fullscreen */}
        <LiveMap fullscreen />

      </div>

    </div>
  )
}

export default MapScreen