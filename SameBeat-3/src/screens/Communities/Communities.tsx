import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/Header/Header';
import BackButton from '../../components/BackButton/BackButton';
import './Communities.css';

const Communities: React.FC = () => {
    const navigate = useNavigate();

    return (
        <motion.div 
            className="screen-container communities-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Header 
                title="Comunidades" 
                onBack={() => navigate(-1)} 
            />

            <div className="communities-content">
                <p className="text-white opacity-60 text-center mt-20">
                    Communities coming soon...
                </p>
            </div>
        </motion.div>
    );
};

export default Communities;
