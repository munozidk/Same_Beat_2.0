import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { data } from '../../data';

// Components
import Header from '../../components/Header/Header';
import VerticalConcertCard from '../../components/VerticalConcertCard/VerticalConcertCard';
import { useUserProfile } from '../../contexts/UserProfileContext';
import { imageMap } from '../../utils/imageMap';

import './ConcertDetails.css';

const ConcertDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { concerts } = data;
    const { userProfile } = useUserProfile();
    const profileImage = userProfile.image ? imageMap[userProfile.image] ?? userProfile.image : undefined;
    const concert = concerts.find(c => c.id === Number(id));

    if (!concert) {
        return (
            <div className="screen-container flex items-center justify-center">
                <p className="text-white">Concert not found</p>
                <button 
                    onClick={() => navigate('/concerts')}
                    className="ml-4 underline text-white"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <motion.div 
            className="screen-container concert-details-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Header 
                title="Details of Concerts" 
                onBack={() => navigate(-1)}
                profilePic={profileImage}
                hideProfileOnDesktop={true}
            />

            <div className="details-scroll-content">
                <div className="ticket-wrapper">
                    <VerticalConcertCard 
                        image={concert.image}
                        tour={concert.tour}
                        date={concert.date}
                        time={concert.openingTime}
                        place={`${concert.venue} - ${concert.location}`}
                        description={concert.description}
                        onViewMore={() => navigate(`/concert/${concert.id}/description`)}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default ConcertDetails;
