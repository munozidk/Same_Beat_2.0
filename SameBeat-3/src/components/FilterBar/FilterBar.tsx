import { useState, useRef } from 'react';
import { Settings2, Circle } from 'lucide-react';
import './FilterBar.css';

interface FilterBarProps {
  genres: string[];
  selectedGenres: string[];
  onToggleGenre: (genre: string) => void;
}

export default function FilterBar({ genres, selectedGenres, onToggleGenre }: FilterBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="filter-bar-container">
      <div className="filter-scroll" ref={scrollRef}>
        <button className="filter-icon-btn" id="filter-settings">
          <Settings2 size={20} color="#EBDFD3" />
        </button>
        
        {genres.map((genre) => (
          <button
            key={genre}
            className={`filter-item ${selectedGenres.includes(genre) ? 'active' : ''}`}
            onClick={() => onToggleGenre(genre)}
          >
            <Circle size={8} fill="currentColor" strokeWidth={0} />
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
}
