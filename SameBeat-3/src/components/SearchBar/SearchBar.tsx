import { Search } from "lucide-react"

// Estilos del componente
import "./SearchBar.css"

/* 
  Props del componente SearchBar
  
  onChange:
  función que se ejecuta
  cuando el usuario escribe
  
  placeholder:
  texto opcional dentro del input
*/
interface SearchBarProps {

  // Texto actual del input
  value: string

  /* 
    Evento onChange
    
    Detecta cambios
    mientras el usuario escribe
  */
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void

  // Placeholder opcional
  placeholder?: string
}

/* 
  Componente SearchBar
  
  Barra de búsqueda reutilizable
*/
const SearchBar = ({

  value,
  onChange,
  placeholder

}: SearchBarProps) => {

  return (

    /* Contenedor principal */
    <div className="searchbar">

      {/* 
        Icono de búsqueda
        
        Importado desde lucide-react
      */}
      <Search
        size={20}
        className="searchbar__icon"
      />

      {/* 
        Input de búsqueda
      */}
      <input

        /* Tipo texto */
        type="text"

        /* 
          value:
          
          controla el valor actual
          del input
        */
        value={value}

        /* 
          onChange:
          
          se ejecuta cada vez
          que el usuario escribe
        */
        onChange={onChange}

        /* 
          placeholder:
          
          Si existe placeholder
          usa ese texto
          
          Si NO existe:
          usa "Buscar..."
          
          || = OR lógico para si placeholder existe lo usa si no, usa el texto por defecto
        */
        placeholder={
          placeholder || "Buscar..."
        }

        className="searchbar__input"
      />

    </div>
  )
}

// Exportamos el componente
export default SearchBar