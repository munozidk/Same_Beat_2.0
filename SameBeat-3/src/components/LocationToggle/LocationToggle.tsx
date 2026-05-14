import { useState } from 'react';
import { motion } from 'framer-motion';
import './LocationToggle.css';

interface LocationToggleProps {
  initialOption?: 'everywhere' | 'near-you';
  onChange?: (option: 'everywhere' | 'near-you') => void;
}

export default function LocationToggle({ 
  initialOption = 'everywhere',
  onChange 
}: LocationToggleProps) {
  const [selected, setSelected] = useState<'everywhere' | 'near-you'>(initialOption);

  const handleToggle = (option: 'everywhere' | 'near-you') => {
    setSelected(option);
    onChange?.(option);
  };

  return (
    <div className="location-toggle-container" id="toggle-container">
      {/* Background Labels - Text is only here now */}
      <button
        onClick={() => handleToggle('everywhere')}
        className={`location-toggle-label ${selected === 'everywhere' ? 'active' : 'inactive'}`}
        id="btn-everywhere"
      >
        Everywere
      </button>
      
      <button
        onClick={() => handleToggle('near-you')}
        className={`location-toggle-label ${selected === 'near-you' ? 'active' : 'inactive'}`}
        id="btn-near-you"
      >
        Near you
      </button>

      {/* Animated Sliding Pill (Behind labels) */}
      <motion.div
        className="location-toggle-pill"
        id="sliding-pill"
        initial={false}
        animate={{
          x: selected === 'everywhere' ? 0 : 174, // Offset adjusted for padding
        }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 25
        }}
      />
    </div>
  );
}
