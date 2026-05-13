import React from 'react';
import './ArtistInfo.css';

interface ArtistInfoProps {
    name: string;
    assistants: string;
}

const ArtistInfo: React.FC<ArtistInfoProps> = ({ name, assistants }) => {
    return (
        <div className="artist-info">
            <h2 className="artist-title">{name}</h2>
            <div className="stats-container">
                <div className="stat-box">
                    <span className="stat-label">Assistants</span>
                    <span className="stat-value">{assistants}</span>
                </div>
                <div className="vertical-divider"></div>
                <div className="stat-box">
                    <span className="stat-label">Communities</span>
                </div>
            </div>
        </div>
    );
};

export default ArtistInfo;
