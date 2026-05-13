import { useNavigate } from 'react-router-dom';
import ConcertCard from "../../components/ConcertCard/ConcertCard";
import { data } from '../../data';
import { useFilter } from '../../contexts/FilterContext';
import './Concerts.css';

const ConcertsScreen = () => {
  const navigate = useNavigate();
  const { selectedGenres } = useFilter();
  const { concerts } = data;

  const filteredConcerts = selectedGenres.length > 0
    ? concerts.filter(concert => selectedGenres.includes(concert.genre))
    : concerts;

  return (
    <div className="screen-container">
      <div className="concerts-list space-y-4">
        {filteredConcerts.length > 0 ? (
          filteredConcerts.map((concert) => (
            <ConcertCard 
              key={concert.id}
              artist={concert.artist}
              tour={concert.tour}
              date={concert.date}
              location={concert.location}
              venue={concert.venue}
              capacity={concert.capacity}
              openingTime={concert.openingTime}
              image={concert.image}
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
