import React from 'react';
import './HeroImage.css';

interface HeroImageProps {
    src: string;
    alt: string;
}

const HeroImage: React.FC<HeroImageProps> = ({ src, alt }) => {
    return (
        <div className="hero-container">
            <img src={src} alt={alt} className="hero-img" />
            <div className="hero-overlay"></div>
        </div>
    );
};

export default HeroImage;
