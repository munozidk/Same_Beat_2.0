import React from 'react';
import { X, ChevronLeft } from 'lucide-react';
import styles from './StoryHeader.module.css';

interface StoryHeaderProps {
  thumbnail: string;
  title: string;
  subtitle: string;
  onClose: () => void;
}

const StoryHeader: React.FC<StoryHeaderProps> = ({ thumbnail, title, subtitle, onClose }) => {
  return (
    <div className={styles.header}>
      <div className={styles.leftContent}>
        <button className={styles.backButton} onClick={onClose}>
          <ChevronLeft size={24} color="#fff" />
        </button>
        
        <div className={styles.info}>
          <div className={styles.thumbnailWrapper}>
            <img src={thumbnail} alt={title} className={styles.thumbnail} />
          </div>
          <div className={styles.text}>
            <h3 className={styles.title}>
              {title} <span className={styles.separator}>-</span> <span className={styles.subtitle}>{subtitle.toLowerCase()}</span>
            </h3>
          </div>
        </div>
      </div>

      <button className={styles.closeButton} onClick={onClose}>
        <X size={24} color="#fff" />
      </button>
    </div>
  );
};

export default StoryHeader;
