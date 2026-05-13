import React from 'react';
import styles from './StoryFooter.module.css';

interface StoryFooterProps {
  caption: string;
}

const StoryFooter: React.FC<StoryFooterProps> = ({ caption }) => {
  return (
    <div className={styles.footer}>
      <div className={styles.captionContainer}>
        <span className={styles.captionText}>{caption}</span>
      </div>
    </div>
  );
};

export default StoryFooter;
