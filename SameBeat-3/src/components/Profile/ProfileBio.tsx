import React from 'react';
import { Play } from 'lucide-react';
import styles from './ProfileBio.module.css';

interface ProfileBioProps {
  bio: string;
  city: string;
  country: string;
  favoriteArtist: string;
  favoriteSong: string;
}

const ProfileBio: React.FC<ProfileBioProps> = ({ 
  bio, 
  city, 
  country, 
  favoriteArtist, 
  favoriteSong 
}) => {
  return (
    <div className={styles.container}>
      <p className={styles.location}>{city.toLowerCase()}/{country.toLowerCase().charAt(0)}</p>
      <p className={styles.bioText}>{bio}</p>
      
      <div className={styles.musicInfo}>
        <div className={styles.playIcon}>
          <Play size={16} fill="white" color="white" />
        </div>
        <span className={styles.songName}>{favoriteSong}</span>
        <span className={styles.artistName}>{favoriteArtist}</span>
      </div>
    </div>
  );
};

export default ProfileBio;
