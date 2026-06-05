import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { data } from '../data';

interface FilterContextType {
  selectedGenres: string[];
  toggleGenre: (genre: string) => void;
  allGenres: string[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const allGenres = useMemo(() => {
    const genres = data.concerts.map(c => c.genre);
    return Array.from(new Set(genres)).sort();
  }, []);

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  return (
    <FilterContext.Provider value={{ selectedGenres, toggleGenre, allGenres, searchQuery, setSearchQuery }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
