import React from 'react';
import './ConcertDescription.css';

interface ConcertDescriptionProps {
    text: string;
}

const ConcertDescription: React.FC<ConcertDescriptionProps> = ({ text }) => {
    return (
        <div className="description-container">
            <h3 className="section-title">Description</h3>
            <p className="description-text">{text}</p>
        </div>
    );
};

export default ConcertDescription;
