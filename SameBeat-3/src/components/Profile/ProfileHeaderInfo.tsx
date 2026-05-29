import React from 'react';
import styles from './ProfileHeaderInfo.module.css';
interface ProfileHeaderInfoProps {
  name: string;
  image?: string;
  age: number;
  followers: number;
  following: number;
  concerts: number;
}

const ProfileHeaderInfo: React.FC<ProfileHeaderInfoProps> = ({ 
  name, 
  image,
  age, 
  followers, 
  following, 
  concerts 
}) => {
  return (
  <div className={styles.container}>

    <div className={styles.avatarSection}>

      <div className={styles.avatarWrapper}>

        <img
          src={image}
          alt="profile"
          className={styles.avatar}
        />

      </div>

    </div>
    
          
      <div className={styles.infoSection}>
        <div className={styles.nameAge}>
          <span className={styles.name}>{name}</span>
          <span className={styles.age}>{age} years old</span>
        </div>
        
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{followers}</span>
            <span className={styles.statLabel}>seguidores</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{following}</span>
            <span className={styles.statLabel}>seguidos</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{concerts}</span>
            <span className={styles.statLabel}>conciertos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeaderInfo;
