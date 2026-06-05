import React from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import ActionButton from '../ActionButton/ActionButton';
import BackButton from '../BackButton/BackButton';
import './OverlayDescription.css';

interface OverlayDescriptionProps {
  image: string;
  artist: string;
  tour: string;
  description: string;
  assistants?: string;
  onClose: () => void;
  onViewCommunities: () => void;
}

const OverlayDescription: React.FC<OverlayDescriptionProps> = ({
  image,
  artist,
  tour,
  description,
  onClose,
  onViewCommunities
}) => {
  const overlayContent = (
    <motion.div 
      className="concert-description-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="concert-description-backdrop" onClick={onClose} />
      
      <motion.div 
        className="concert-description-modal"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <BackButton className="overlay-back-button" onClick={onClose} />

        <div className="concert-description-layout">
          <div className="concert-description-image-section">
            <img src={image} alt={artist} className="concert-description-image" />
            <div className="concert-description-image-overlay" />
          </div>

          <div className="concert-description-info-section">
            <div className="concert-description-scroll">
              <div className="concert-description-text-container">
                <h1 className="concert-description-title">{tour}</h1>
                <h2 className="concert-description-artist">{artist}</h2>
                <div className="concert-description-text">
                  {description}
                </div>
              </div>
            </div>
            
            <div className="concert-description-action">
              <ActionButton 
                label="View all communities" 
                onClick={onViewCommunities} 
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  if (typeof document === 'undefined') {
    return overlayContent;
  }

  return createPortal(overlayContent, document.body);
};

export default OverlayDescription;
