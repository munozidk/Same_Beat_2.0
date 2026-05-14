import "./Communities.css"

// Importamos el archivo JSON
// donde están guardadas las comunidades
import communities from "../../data/communities.json"

/* 
  Componente Communities
  
  Muestra una lista de comunidades con:
  - nombres
  - miembros
  - avatares
*/
const Communities = () => {

  return (

    /* 
      Section principal
      
      Agrupa todo el contenido
      de comunidades
    */
    <section className="section-container">

      {/* Título */}
      <h2 className="section-title">

        Communities

      </h2>

      {/* 
        Lista de comunidades
        
        Aquí se renderizan
        todas las comunidades del JSON
      */}
      <div className="communities-list">

        {/* 
          map()
          
          Recorre cada comunidad
          del array communities
        */}
        {communities.map((community) => (

          /* 
            Cada comunidad se muestra
            como una cápsula/pill
          */
          <div
            key={community.id}
            className="community-pill"
          >

            {/* Nombre comunidad */}
            <span>

              {community.name}

            </span>

            {/* 
              Grupo de avatares
              
              Aquí se muestran
              los miembros
            */}
            <div className="avatar-group">

              {/* 
                Recorremos los miembros
                
                member representa el número
                del usuario/avatar
              */}
              {community.members.map((member) => (

                <img

                  // key ayuda a React
                  // a identificar elementos únicos
                  key={member}

                  /* 
                    Imagen dinámica
                    
                    Si el número es par:
                    usa avatar mujer
                    
                    Si el número es impar:
                    usa avatar hombre
                    
                    % = módulo
                    
                    Sirve para saber
                    si un número es divisible entre 2
                  */
                  src={
                    member % 2 === 0

                      ? `https://randomuser.me/api/portraits/women/${member}.jpg`

                      : `https://randomuser.me/api/portraits/men/${member}.jpg`
                  }

                  alt="member"
                />

              ))}

            </div>

          </div>

        ))}

      </div>

    </section>
  )
}

// Exportamos el componente
export default Communities