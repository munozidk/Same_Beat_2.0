import React from 'react';
import StoryThumbnail from './StoryThumbnail';
import type { StoryThumbnailProps } from './StoryThumbnail';
import styles from './StoriesSection.module.css';

/* 
  Interface StoriesSectionProps
  
  stories:
  - lista de historias sin la prop onClick
  onStoryClick:
  - función que recibe el id de la historia seleccionada
*/
interface StoriesSectionProps {
  stories: Omit<StoryThumbnailProps, 'onClick'>[];
  onStoryClick: (id: number) => void;
}

/* 
  Componente StoriesSection
  
  Muestra:
  - contenedor scrollable
  - lista de miniaturas de historias
*/
const StoriesSection: React.FC<StoriesSectionProps> = ({ stories, onStoryClick }) => {
  return (
    <div className={styles.container}>
      <div className={styles.scrollWrapper}>
        {stories.map((story) => (
          <StoryThumbnail 
            key={story.id} 
            {...story} 
            onClick={onStoryClick} 
          />
        ))}
      </div>
    </div>
  );
};

export default StoriesSection;
