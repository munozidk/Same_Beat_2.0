import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { data } from '../../data';

// Components
import Header from '../../components/Header/Header';
import HeroImage from '../../components/HeroImage/HeroImage';
import ArtistInfo from '../../components/ArtistInfo/ArtistInfo';
import ConcertDescription from '../../components/ConcertDescription/ConcertDescription';
import ActionButton from '../../components/ActionButton/ActionButton';
import OverlayDescription from '../../components/OverlayDescription/OverlayDescription';
import BackButton from '../../components/BackButton/BackButton';

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
            <HeroImage src={concert.image} alt={concert.artist} />
            
            <div className="screen-content-wrapper">
                <Header 
                    title="Details of Concerts" 
                    onBack={() => navigate(-1)}
                    profilePic="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
                    hideProfileOnDesktop={true}
                />

                <div className="scrollable-body">
                    <div className="content-padding">
                        <ArtistInfo 
                            name={concert.tour}
                            assistants={concert.capacity}
                        />

                        <ConcertDescription text={concert.description || ""} />

                        <div className="action-button-container">
                            <ActionButton 
                                label="view all communities"
                                onClick={() => navigate(`/concert/${concert.id}/communities`)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <OverlayDescription 
                image={concert.image}
                artist={concert.artist}
                tour={concert.tour}
                description={concert.description || ""}
                onClose={() => navigate(-1)}
                onViewCommunities={() => navigate(`/concert/${concert.id}/communities`)}
            />
        </motion.div>
    );
};

export default ConcertDescriptionScreen;
