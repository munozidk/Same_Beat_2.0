import { useNavigate } from 'react-router-dom';
import ConcertCard from "../../components/ConcertCard/ConcertCard";
import { useConcerts } from '../../hooks/useConcerts';
import { useFilter } from '../../contexts/FilterContext';
import './Concerts.css';

const ConcertsScreen = () => {
  const navigate = useNavigate();
  const { selectedGenres } = useFilter();

  // Pasamos selectedGenres para filtrar en el hook
  const { concerts, isLoading } = useConcerts();

  if (isLoading) {
    return (
      <div className="concerts-page">
        <div className="concerts-list space-y-4">
          <div className="text-center py-10 text-white/50">
            Loading concerts...
          </div>
        </div>
      </div>
    );
  }
  
  const filteredConcerts = selectedGenres.length > 0
    ? concerts.filter(concert => selectedGenres.includes(concert.genre))
    : concerts;

  return (
    <div className="concerts-page">
      <div className="concerts-list space-y-4">
        {filteredConcerts.length > 0 ? (
          filteredConcerts.map((concert) => (
            <ConcertCard 
              key={concert.id}
              artist={concert.artist}
              tour={concert.tour ?? undefined}
              date={concert.date}
              location={concert.location}
              venue={concert.venue}
              capacity={concert.capacity ?? undefined}
              openingTime={concert.openingTime}
              image={concert.image ?? undefined}
              onClick={() => navigate(`/concert/${concert.id}`)}
            />
          ))
        ) : (
          <div className="text-center py-10 text-white/50">
            No concerts found for the selected genres.
          </div>
        )}
      </div>
    </div>
  );
};

export default ConcertsScreen;
