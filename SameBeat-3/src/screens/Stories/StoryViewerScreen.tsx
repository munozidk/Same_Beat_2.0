import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade, Autoplay } from 'swiper/modules';
import StoryHeader from '../../components/Stories/StoryHeader';
import StoryFooter from '../../components/Stories/StoryFooter';
import StoryCarousel from '../../components/Stories/StoryCarousel';
import styles from './StoryViewerScreen.module.css';

interface StoryViewerScreenProps {
  story: any;
  onClose: () => void;
}

const StoryViewerScreen: React.FC<StoryViewerScreenProps> = ({ story, onClose }) => {
  return (
    <div className={styles.overlay}>
      <motion.div 
        className={styles.container}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <StoryHeader 
          thumbnail={story.thumbnail}
          title={story.title}
          subtitle={story.subtitle}
          onClose={onClose}
        />

        <StoryCarousel images={story.images} />

        <StoryFooter caption={story.caption} />
      </motion.div>
    </div>
  );
};

export default StoryViewerScreen;
