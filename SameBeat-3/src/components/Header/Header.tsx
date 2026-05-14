import React from 'react';
import './Header.css';
import BackButton from '../BackButton/BackButton';

interface HeaderProps {
    title: string;
    onBack?: () => void;
    profilePic?: string;
    hideProfileOnDesktop?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, onBack, profilePic, hideProfileOnDesktop }) => {
    return (
        <header className={`generic-header ${hideProfileOnDesktop ? 'hide-profile-desktop' : ''}`}>
            {onBack && (
                <BackButton className="header-back-btn" onClick={onBack} />
            )}
            <h1 className="header-title">{title}</h1>
            {profilePic && (
                <div className="profile-pic-container">
                    <img src={profilePic} alt="Profile" />
                </div>
            )}
            {!profilePic && <div className="header-placeholder" />}
        </header>
    );
};

export default Header;
