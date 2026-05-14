import "./Suggestions.css"
import usersData from "../../data/users/users.json"
import { Plus } from "lucide-react"
import yoongi from "../../assets/yoongi.jpg"
import hyujin from "../../assets/hyujin.jpg"
import loliBahia from '../../assets/loliBahia.jpg'
import harry from '../../assets/harry.jpg'
import avatar3 from '../../assets/avatar 2.jpg'

// Este componente muestra sugerencias de usuarios
const Suggestions = () => {

// imageMap: conecta las rutas de las imágenes con las imágenes importadas
// Sin eso, las imágenes no se cargaran correctamente
const imageMap: Record<string, string> = {
  "/assets/yoongi.jpg": yoongi,
  "/assets/hyujin.jpg": hyujin,
  "/assets/loliBahia.jpg": loliBahia,
  "/assets/harry.jpg": harry,
  "/assets/avatar3.jpg": avatar3
}

  // Toma solo los primeros 4 usuarios del JSON
  const suggestions = usersData.slice(0, 4)

  return (
    <section className="suggestions">

      {/* Título de la sección */}
      <h2 className="suggestions__title">
        Suggestions
      </h2>

      {/* Contenedor con scroll horizontal */}
      <div className="suggestions__scroll">

        {/* Tarjeta de "hacer un match" - solo en móvil */}
        <div className="suggestion-card suggestion-card--add mobile-only">

          <h3>Make a match</h3>

          <div className="suggestion-card__add-btn">
            <Plus size={30} />
          </div>

        </div>

        {/* Recorre cada usuario y crea una tarjeta */}
        {suggestions.map((user) => (

          <article
            key={user.id}
            className="suggestion-card"
          >

            {/* Imagen del usuario */}
            <img
              src={imageMap[user.image as keyof typeof imageMap]}
              alt={user.username}
              className="suggestion-card__image"
            />

            {/* Información del usuario sobre la imagen */}
            <div className="suggestion-card__overlay">

              {/* Nombre del usuario */}
              <h3>
                {user.username}
              </h3>

              {/* Porcentaje de compatibilidad */}
              <p>
                {user.compatibility}
              </p>

            </div>

          </article>

        ))}

      </div>

    </section>
  )
}

export default Suggestions