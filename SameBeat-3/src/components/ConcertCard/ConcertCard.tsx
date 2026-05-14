import React from 'react';
import "./ConcertCard.css";

interface ConcertCardProps {
  image?: string;
  artist: string;
  tour?: string;
  date: string;
  location: string;
  venue: string;
  capacity?: string;
  openingTime: string;
  onClick?: () => void;
}

const ConcertCard: React.FC<ConcertCardProps> = ({ 
  image = 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop', 
  artist, 
  tour = '', 
  date, 
  location, 
  venue, 
  capacity, 
  openingTime,
  onClick
}) => {
  return (
    <div className="ticket-card" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      {/* Imagen con fade */}
      <div
        className="ticket-bg"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Contenido */}
      <div className="ticket-content">
        <h3>{artist.toUpperCase()} {tour ? `| ${tour.toUpperCase()}` : ''}</h3>

        <div className="ticket-date-badge">
          {date} - {location}
        </div>

        <p className="ticket-venue-name">{venue}</p>
        
        <div className="ticket-stats-group">
          {capacity && <p>Aforo: {capacity}</p>}
          <p>Apertura: {openingTime}</p>
        </div>
      </div>
    </div>
  );
};

export default ConcertCard;
