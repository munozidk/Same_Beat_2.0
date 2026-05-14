import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/Header/Header';
import CommunitiesSection from '../../components/Communities/Communities';
import './Communities.css';

/**
 * Pantalla dedicada (móvil): al pulsar “view all communities” con ancho ≤768px.
 * Carga el listado vía el componente reutilizable, que importa el JSON y la lógica de avatares.
 */
const CommunitiesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="screen-container communities-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header title="Comunidades" onBack={() => navigate(-1)} />

      <div className="communities-content">
        <CommunitiesSection />
      </div>
    </motion.div>
  );
};

export default CommunitiesPage;
