import React from 'react';
import styles from './StoryThumbnail.module.css';

/* 
  Interface StoryThumbnailProps
  
  Define la estructura de las props
  que recibe cada miniatura de historia.
*/
export interface StoryThumbnailProps {
  // ID único de la historia
  id: number;

  // Imagen de portada/miniatura
  thumbnail: string;

  // Título de la historia
  title: string;

  // Función que se ejecuta al hacer click
  onClick: (id: number) => void;
}

/* 
  Componente StoryThumbnail
  
  Muestra:
  - imagen de la historia
  - título superpuesto
  - ejecuta onClick al seleccionar
*/
const StoryThumbnail: React.FC<StoryThumbnailProps> = ({ id, thumbnail, title, onClick }) => {
  return (
    <div className={styles.wrapper} onClick={() => onClick(id)}>
      <div className={styles.container}>
        <img src={thumbnail} alt={title} className={styles.image} />
        <div className={styles.overlay}>
          <span className={styles.title}>{title}</span>
        </div>
      </div>
    </div>
  );
};

export default StoryThumbnail;
