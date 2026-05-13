import React from 'react';
import './VerticalConcertCard.css';

interface VerticalTicketProps {
  image: string;
  tour: string;
  date: string;
  time: string;
  place: string;
  description: string;
  onViewMore: () => void;
}

const VerticalConcertCard: React.FC<VerticalTicketProps> = ({
  image,
  tour,
  date,
  time,
  place,
  description,
  onViewMore
}) => {
  return (
    <div className="vertical-ticket">
      <div className="vt-liquid" />
      
      {/* Imagen Superior */}
      <div className="vt-image-container">
        <div className="vt-image-overlay" />
        <img src={image} alt={tour} className="vt-image" />
      </div>

      {/* Título en caja de cristal */}
      <div className="vt-title-box">
        <h2>{tour}</h2>
      </div>

      {/* Detalles del Evento */}
      <div className="vt-details-section">
        <div className="vt-row">
          <div className="vt-group">
            <label>Date</label>
            <span>{date}</span>
          </div>
          <div className="vt-group text-right">
            <label>Time</label>
            <span>{time}</span>
          </div>
        </div>

        <div className="vt-group">
          <label>Place</label>
          <span>{place}</span>
        </div>
      </div>

      {/* Divisor punteado (alineado con los recortes) */}
      <div className="vt-divider" />

      {/* Descripción Inferior */}
      <div className="vt-description-section">
        <h3>Description</h3>
        <p>
          {description}
          {onViewMore && (
            <span className="vt-view-more" onClick={onViewMore}>
              {" "}View More
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default VerticalConcertCard;
