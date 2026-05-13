import React from 'react';
import styles from './ProfileFriendsList.module.css';

interface ProfileFriendsListProps {
  friends: string[];
}

const ProfileFriendsList: React.FC<ProfileFriendsListProps> = ({ friends }) => {
  return (
    <div className={styles.container}>
      <div className={styles.scrollWrapper}>
        {friends.map((avatar, index) => (
          <div key={index} className={styles.friendAvatar}>
            <img src={avatar} alt={`Friend ${index + 1}`} className={styles.avatarImg} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileFriendsList;
