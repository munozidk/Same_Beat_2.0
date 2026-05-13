import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import './BackButton.css';

interface BackButtonProps {
  className?: string;
  onClick?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ className, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <button 
      className={`back-button ${className || ''}`} 
      onClick={handleClick}
      aria-label="Go back"
    >
      <ChevronLeft size={20} color="white" strokeWidth={2.5} />
    </button>
  );
};

export default BackButton;
