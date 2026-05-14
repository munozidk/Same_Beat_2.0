import "./LiveMap.css"
import { useEffect } from "react"
import { useMap } from "react-leaflet"

// Hook de react-router-dom
// useNavigate sirve para navegar
// entre rutas/páginas
import { useNavigate } from "react-router-dom"

/* 
  Componentes principales de react-leaflet
  
  MapContainer:
  contenedor principal del mapa
  
  TileLayer:
  capa visual del mapa
  
  Marker:
  marcador de ubicación
  
  Popup:
  card flotante al hacer click
*/
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet"

/* 
  Importamos Leaflet
  
  Leaflet es la librería base
  que usa react-leaflet
*/
import L from "leaflet"

/* 
  Imágenes locales
  para los usuarios cercanos
*/
import yoongi from "../../assets/yoongi.jpg"
import hyujin from "../../assets/hyujin.jpg"
import harry from "../../assets/harry.jpg"
import loliBahia from "../../assets/loliBahia.jpg"
import AronPiper from "../../assets/AronPiper.jpg"

/* 
  ARRAY usersNearby
  
  Simula usuarios cercanos
  dentro del mapa
  
  Cada usuario tiene:
  
  - id
  - nombre
  - edad
  - compatibilidad
  - imagen
  - posición
*/
const usersNearby = [

  {
    id: 1,

    username: "Yoongi",

    age: 27,

    compatibility: "85%",

    image: yoongi,

    /* 
      Coordenadas del usuario
      
      [latitud, longitud]
    */
    position: [3.4516, -76.5320] as [number, number]
  },

  {
    id: 2,

    username: "Hyunjin",

    age: 24,

    compatibility: "76%",

    image: hyujin,

    position: [3.4530, -76.5280] as [number, number]
  },

  {
    id: 3,

    username: "Harry",

    age: 25,

    compatibility: "68%",

    image: harry,

    position: [3.4485, -76.5305] as [number, number]
  },

  {
    id: 4,

    username: "Loli Bahia",

    age: 22,

    compatibility: "92%",

    image: loliBahia,

    position: [3.4550, -76.5265] as [number, number]
  },

  {
    id: 5,

    username: "Aron Piper",

    age: 29,

    compatibility: "98%",

    image: AronPiper,

    position: [3.4495, -76.5350] as [number, number]
  }
]


/* 
  ICONO PERSONALIZADO
  
  Creamos un marker custom
  usando Leaflet
  
  iconUrl:
  imagen del marcador
  
  iconSize:
  tamaño del marcador
*/
const customIcon = new L.Icon({

  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/684/684908.png",

  iconSize: [52, 52]
})

function FixMapSize() {

  const map = useMap()

  useEffect(() => {

    setTimeout(() => {
      map.invalidateSize()
    }, 100)

  }, [map])

  return null
}

/* 
  Props del componente
  
  fullscreen:
  
  define si el mapa se muestra:
  
  - pequeño
  - pantalla completa
*/
type LiveMapProps = {

  fullscreen?: boolean
}

/* 
  Componente LiveMap
  
  fullscreen = false
  
  Significa que por defecto
  el mapa NO es fullscreen
*/
const LiveMap = ({
  fullscreen = false
}: LiveMapProps) => {

  /* 
    Hook navegación
    
    Permite cambiar de página
  */
  const navigate = useNavigate()

  /* 
    Posición principal del usuario
    
    El mapa inicia centrado aquí
  */
  const userPosition: [number, number] = [

    3.4516,
    -76.5320
  ]

  return (

    /* Contenedor principal */
    <div className="live-map-container">

      {/* 
        HEADER
        
        Solo aparece
        cuando NO está fullscreen
      */}
      {!fullscreen && (

        <div className="live-map-header">

          <span>

            Live Map

          </span>

        </div>
      )}

      {/* BODY DEL MAPA */}
      <div className="live-map-body">

        {/* 
          Botón abrir mapa
          
          Solo aparece
          cuando NO está fullscreen
        */}
        {!fullscreen && (

          <button
            className="live-map-expand-btn"

            /* 
              Navega hacia /map
              
              Esto abre
              el mapa fullscreen
            */
            onClick={() => navigate("/map")}
          >

            Open Map

          </button>
        )}

        {/* 
          MAPCONTAINER
          
          Contenedor principal
          del mapa centrado
        */}
        <MapContainer
        center={userPosition}
        zoom={14}
        scrollWheelZoom={true}
        className="live-map"
      >

        <FixMapSize />

        <TileLayer
          attribution="&copy; CARTO"
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

          {/* 
            TILELAYER
            
            Define el diseño visual
            del mapa
            
            En este caso:
            mapa oscuro
          */}
          <TileLayer

            attribution="&copy; CARTO"

            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {/* 
            Recorremos todos los usuarios
            cercanos
          */}
          {usersNearby.map((user) => (

            /* 
              Marker
            
              Crea un marcador
              en el mapa
            */
            <Marker

              key={user.id}

              position={user.position}

              icon={customIcon}
            >

              {/* 
                Popup custom
                
                Card flotante aesthetic
                estilo dating app
              */}
              <Popup
                closeButton={false}
                className="custom-popup"
                offset={[0, -20]}
              >

                {/* 
                  CARD USER
                  
                  Alterna entre:
                  
                  - purple
                  - green
                */}
                <div
                  className={`map-user-card ${
                    user.id % 2 === 0
                      ? "green"
                      : "purple"
                  }`}
                >

                  {/* 
                    Imagen usuario
                  */}
                  <div className="map-user-card__image">

                    <img
                      src={user.image}
                      alt={user.username}
                    />

                  </div>

                  {/* 
                    Info usuario
                  */}
                  <div className="map-user-card__content">

                    {/* Nombre + edad */}
                    <h3>

                      {user.username}, {user.age}

                    </h3>

                    {/* Gustos musicales */}
                    <p>

                      Metro boomin, Drake,
                      Kendrick Lamar, Kid Cudi

                    </p>

                    {/* Botón match */}
                    <button>

                      Make a match

                    </button>

                  </div>

                </div>

              </Popup>

            </Marker>

          ))}

        </MapContainer>

      </div>

    </div>
  )
}

// Exportamos el componente
export default LiveMap