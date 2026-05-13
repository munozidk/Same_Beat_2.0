import React from 'react';
import styles from './StoryThumbnail.module.css';

export interface StoryThumbnailProps {
  id: number;
  thumbnail: string;
  title: string;
  onClick: (id: number) => void;
}

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
