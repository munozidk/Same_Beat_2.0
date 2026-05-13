import React from 'react';
import StoryThumbnail from './StoryThumbnail';
import styles from './StoriesSection.module.css';

interface StoriesSectionProps {
  stories: Omit<StoryThumbnailProps, 'onClick'>[];
  onStoryClick: (id: number) => void;
}

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
