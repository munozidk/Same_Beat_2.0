import "./MatchCard.css"

// Importamos el tipo User
// desde la carpeta types
import type { User } from "../../types"

// Hook para manejar estados
import { useState } from "react"

// Iconos
// Heart = like
// X = nope
import { Heart, X } from "lucide-react"

// Imágenes reales
import kat from "../../assets/kat.png"
import manon from "../../assets/manon.png"
import joseph from "../../assets/joseph.png"
import patrick from "../../assets/patrick.png"

/* 
  Props del componente
  
  user:
  información del usuario
  
  onSwipe:
  función que detecta
  la dirección del swipe
  
  isTopCard:
  indica si esta carta
  es la principal del stack
*/
interface Props {

  user: User

  onSwipe: (
    direction: "left" | "right"
  ) => void

  isTopCard: boolean
}

/* 
  Componente MatchCard
  
  Simula una tarjeta estilo Tinder
  con swipe hacia:
  
  - izquierda
  - derecha
*/
function MatchCard({

  user,
  onSwipe,
  isTopCard

}: Props) {

  /* 
    IMÁGENES REALES
    
    Asociamos cada ID
    con una imagen local
  */
  const userImages: Record<number, string> = {

    1: kat,
    2: manon,
    3: joseph,
    4: patrick
  }

  /* 
    FINAL IMAGE
    
    Busca la imagen
    correspondiente al ID
  */
  const finalImage =

    userImages[user.id] || user.image

  /* 
    startX
    
    Guarda la posición inicial
    donde comenzó el drag
  */
  const [startX, setStartX] = useState(0)

  /* 
    currentX
    
    Guarda cuánto se movió
    la tarjeta horizontalmente
  */
  const [currentX, setCurrentX] = useState(0)

  /* 
    isDragging
    
    Detecta si el usuario
    está arrastrando la card
  */
  const [isDragging, setIsDragging] = useState(false)

  /* 
    THEMES
    
    Cambia el color de la card
    dependiendo del ID
    
    Par = purple
    Impar = green
  */
  const randomTheme =

    user.id % 2 === 0

      ? "purple"

      : "green"

  /* 
    SWIPE DIRECTION
    
    Detecta hacia dónde
    se está moviendo la tarjeta
    
    derecha -> right
    izquierda -> left
  */
  const swipeDirection =

    currentX > 40

      ? "right"

      : currentX < -40

      ? "left"

      : null

  /* 
    HANDLE START
    
    Se ejecuta cuando:
    
    - empieza click
    - empieza touch
    
    Guarda posición inicial
  */
  const handleStart = (

    e: React.MouseEvent | React.TouchEvent

  ) => {

    /* 
      Solo la card superior
      puede moverse
    */
    if (!isTopCard) return

    setIsDragging(true)

    /* 
      Detectamos si es:
      
      - touch
      - mouse
      
      y obtenemos la posición X
    */
    const x =

      "touches" in e

        ? e.touches[0].clientX

        : e.clientX

    setStartX(x)
  }

  /* 
    HANDLE MOVE
    
    Se ejecuta mientras
    el usuario arrastra
    la tarjeta
  */
  const handleMove = (

    e: React.MouseEvent | React.TouchEvent

  ) => {

    /* 
      Si no estamos arrastrando
      no hacemos nada
    */
    if (!isDragging) return

    /* Posición actual */
    const x =

      "touches" in e

        ? e.touches[0].clientX

        : e.clientX

    /* 
      Calculamos cuánto
      se movió la tarjeta
    */
    setCurrentX(x - startX)
  }

  /* 
    HANDLE END
    
    Se ejecuta cuando:
    
    - termina el click
    - termina el touch
  */
  const handleEnd = () => {

    setIsDragging(false)

    /* 
      Si la card se mueve
      mucho hacia derecha
    */
    if (currentX > 120) {

      onSwipe("right")
    }

    /* 
      Si la card se mueve
      mucho hacia izquierda
    */
    else if (currentX < -120) {

      onSwipe("left")
    }

    /* 
      Reiniciamos posición
    */
    setCurrentX(0)
  }

  return (

    /* 
      Stack de tarjetas
      
      randomTheme agrega:
      
      - purple
      - green
    */
    <div
      className={`match-card-stack ${randomTheme}`}
    >

      {/* 
        BACK CARDS
        
        Tarjetas falsas detrás
        para efecto visual
        
        Solo aparecen
        en la card principal
      */}
      {isTopCard && (

        <>

          <div className="match-card-stack__back match-card-stack__back--1" />

          <div className="match-card-stack__back match-card-stack__back--2" />

        </>
      )}

      {/* 
        TARJETA PRINCIPAL
      */}
      <div

        className={`match-card ${randomTheme}`}

        /* 
          transform:
          
          mueve la tarjeta
          horizontalmente
          
          rotate:
          rota ligeramente
          la card
        */
        style={{
          transform:
            `translateX(${currentX}px) rotate(${currentX * 0.05}deg)`
        }}

        /* EVENTOS MOUSE */
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}

        /* EVENTOS TOUCH */
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >

        {/* 
          REACCIÓN LIKE
          
          Aparece al mover
          hacia derecha
        */}
        {swipeDirection === "right" && (

          <div className="match-card__reaction like">

            <Heart
              size={34}
              fill="currentColor"
            />

            <span>

              MATCH

            </span>

          </div>

        )}

        {/* 
          REACCIÓN NOPE
          
          Aparece al mover
          hacia izquierda
        */}
        {swipeDirection === "left" && (

          <div className="match-card__reaction nope">

            <X
              size={34}
              strokeWidth={3}
            />

            <span>

              NOPE

            </span>

          </div>

        )}

        {/* Imagen usuario */}
        <img
          src={finalImage}
          alt={user.username}
        />

        {/* Overlay información */}
        <div className="overlay">

          {/* Nombre + edad */}
          <h2>

            {user.username}, {user.age}

          </h2>

          {/* Compatibilidad */}
          <p>

            {user.compatibility}

          </p>

        </div>

      </div>

    </div>
  )
}

// Exportamos el componente
export default MatchCard