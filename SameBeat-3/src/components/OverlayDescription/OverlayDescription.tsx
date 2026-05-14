import React from 'react';
import { motion } from 'framer-motion';
import ActionButton from '../ActionButton/ActionButton';
import BackButton from '../BackButton/BackButton';
import '../ArtistInfo/ArtistInfo.css';
import './OverlayDescription.css';

interface OverlayDescriptionProps {
  image: string;
  artist: string;
  tour: string;
  description: string;
  assistants: string;
  onClose: () => void;
  onViewCommunities: () => void;
}

const OverlayDescription: React.FC<OverlayDescriptionProps> = ({
  image,
  artist,
  tour,
  description,
  assistants,
  onClose,
  onViewCommunities
}) => {
  return (
    <motion.div 
      className="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="backdrop" onClick={onClose} />
      
      <motion.div 
        className="modalContent"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <BackButton className="overlay-back-button" onClick={onClose} />

        <div className="horizontalContainer">
          <div className="imageSection">
            <img src={image} alt={artist} className="mainImage" />
            <div className="imageOverlay" />
          </div>

          <div className="infoSection">
            <div className="scrollArea">
              <div className="textContainer">
                <h1 className="tourTitle">{tour}</h1>
                <h2 className="artistName">{artist}</h2>
                <div className="stats-container overlay-description-stats">
                  <div className="stat-box">
                    <span className="stat-label">Assistants</span>
                    <span className="stat-value">{assistants}</span>
                  </div>
                  <div className="vertical-divider" />
                  <div className="stat-box">
                    <span className="stat-label">Communities</span>
                  </div>
                </div>
                <div className="descriptionText">
                  {description}
                </div>
              </div>
            </div>
            
            <div className="actionSection">
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
};

export default OverlayDescription;
