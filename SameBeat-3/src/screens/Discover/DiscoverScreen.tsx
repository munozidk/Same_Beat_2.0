import DiscoverCard from '../../components/DiscoverCard/DiscoverCard'
import Suggestions from '../../components/Suggestions/Suggestions'
import FilterBar from '../../components/FilterBar/FilterBar'
import { useFilter } from '../../contexts/FilterContext'
import { useSongs } from '../../hooks/useSongs';
import './DiscoverScreen.css'


export default function DiscoverScreen() {
  const { selectedGenres, toggleGenre, allGenres } = useFilter();
  const { songs, isLoading } = useSongs();

  // Adapta canciones de Supabase al formato que usa DiscoverCard.
  const discoverSongs = songs.map((song) => ({
    id: song.id,
    title: song.name,
    artists: [song.artist],
    coverImage: song.image,
    artistImage: song.image,
    audio: song.audio,
  }));

  return (
    <div className="discover-screen">
      <Suggestions />

      <h2 className="discover-screen__title">Discover</h2>

      <FilterBar
        genres={allGenres}
        selectedGenres={selectedGenres}
        onToggleGenre={toggleGenre}
      />

      <div className="discover-screen__grid">
        {isLoading ? (
          <p className="discover-screen__empty">Loading songs...</p>
        ) : discoverSongs.length > 0 ? (
          discoverSongs.map(song => (
            <DiscoverCard key={song.id} songs={[song]} />
          ))
        ) : (
          <p className="discover-screen__empty">
            No songs available yet.
          </p>
        )}
      </div>
    </div>
  );
}