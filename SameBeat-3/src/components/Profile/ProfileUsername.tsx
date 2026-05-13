import React from 'react';
import styles from './ProfileUsername.module.css';

interface ProfileUsernameProps {
  username: string;
}

const ProfileUsername: React.FC<ProfileUsernameProps> = ({ username }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.username}>{username}</h1>
    </div>
  );
};

export default ProfileUsername;
