import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { data } from '../../data';

import OverlayDescription from '../../components/OverlayDescription/OverlayDescription';

import './ConcertDescription.css';

const ConcertDescriptionScreen: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { concerts } = data;
    const concert = concerts.find(c => c.id === Number(id));

    if (!concert) {
        return (
            <div className="screen-container flex items-center justify-center">
                <p className="text-white">Concert not found</p>
                <button onClick={() => navigate('/concerts')} className="ml-4 underline text-white">Go Back</button>
            </div>
        );
    }

    return (
        <motion.div 
            className="screen-container concert-description-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <OverlayDescription 
                image={concert.image}
                artist={concert.artist}
                tour={concert.tour}
                description={concert.description || ""}
                assistants={concert.capacity}
                onClose={() => navigate(-1)}
                onViewCommunities={() => {
                    /* Navegación según ancho: móvil → pantalla dedicada; escritorio → feed de chats */
                    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
                        navigate(`/concert/${concert.id}/communities`);
                    } else {
                        navigate('/chats');
                    }
                }}
            />
        </motion.div>
    );
};

export default ConcertDescriptionScreen;
