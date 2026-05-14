import React from 'react';
import styles from './ProfileActions.module.css';

interface ProfileActionsProps {
  onEdit?: () => void;
  onMessages?: () => void;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({ onEdit, onMessages }) => {
  return (
    <div className={styles.container}>
      <button className={styles.buttonWrapper} onClick={onEdit}>
        <span className={styles.buttonText}>editar perfil</span>
      </button>
      <button className={styles.buttonWrapper} onClick={onMessages}>
        <span className={styles.buttonText}>Mensajes</span>
      </button>
    </div>
  );
};

export default ProfileActions;
