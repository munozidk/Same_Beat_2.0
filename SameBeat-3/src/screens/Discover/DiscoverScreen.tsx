import DiscoverCard from '../../components/DiscoverCard/DiscoverCard'
import Suggestions from '../../components/Suggestions/Suggestions'
import FilterBar from '../../components/FilterBar/FilterBar'
import { useFilter } from '../../contexts/FilterContext'
import './SDiscoverScreen.css'

const discoverSongs = [
  {
    id: 1,
    title: 'De mi enamórate',
    artists: ['Mentiras: La Serie', 'Diana Bovio'],
    coverImage: 'assets/cover.jpg',
    artistImage: 'assets/avatar 1.jpg',
    audio: 'assets/dardos.mp3'
  }
]

export default function DiscoverScreen() {
  // Se Usa el contexto global en vez de useState local
  const { selectedGenres, toggleGenre, allGenres } = useFilter();

  return (
    <div className="discover-screen">
      <Suggestions />

      <h2 className="discover-screen__title">Discover</h2>

      {/* Filtros ahora vienen del contexto */}
      <FilterBar
        genres={allGenres}
        selectedGenres={selectedGenres}
        onToggleGenre={toggleGenre}
      />

      <div className="discover-screen__grid">
        {discoverSongs.map(song => (
          <DiscoverCard key={song.id} songs={[song]} />
        ))}
      </div>
    </div>
  )
}
