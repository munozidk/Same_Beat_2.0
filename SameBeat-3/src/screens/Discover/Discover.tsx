import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket } from 'lucide-react';
import { useFilter } from '../../contexts/FilterContext';
import './Discover.css';

const Discover: React.FC = () => {
    const navigate = useNavigate();
    const { allGenres, selectedGenres, toggleGenre } = useFilter();

};

export default Discover;