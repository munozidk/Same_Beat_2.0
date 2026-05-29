import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ProfileUsername from '../../components/Profile/ProfileUsername';
import ProfileHeaderInfo from '../../components/Profile/ProfileHeaderInfo';
import ProfileBio from '../../components/Profile/ProfileBio';
import ProfileActions from '../../components/Profile/ProfileActions';
import BackButton from '../../components/BackButton/BackButton';
import StoriesSection from '../../components/Stories/StoriesSection';
import StoryViewerScreen from '../../screens/Stories/StoryViewerScreen';
import { data } from '../../data';
import { useUserProfile } from '../../contexts/UserProfileContext';
import { imageMap } from '../../utils/imageMap';
import styles from './ProfileScreen.module.css';

const ProfileScreen: React.FC = () => {
  const { userProfile } = useUserProfile();
  const profileImage = userProfile.image ? imageMap[userProfile.image] ?? userProfile.image : undefined;
  const navigate = useNavigate();

  const storiesData = data.concerts.map(c => ({
    id: c.id,
    title: c.artist,
    thumbnail: c.image,
    images: [c.image],
    subtitle: c.tour,
    caption: c.tour
  }));

  const [selectedStory, setSelectedStory] = useState<any>(null);

  const handleStoryClick = (id: number) => {
    const story = storiesData.find(s => s.id === id);
    if (story) {
      setSelectedStory(story);
    }
  };

  const closeViewer = () => {
    setSelectedStory(null);
  };

  return (
    <motion.div 
      className={styles.screenContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <BackButton className={styles.backButton} />
      <div className={styles.profileCard}>
        <ProfileUsername username={userProfile.username} />
        
        <div className={styles.contentScroll}>
          <ProfileHeaderInfo 
            name={userProfile.name}
            image={profileImage}
            age={userProfile.age}
            followers={userProfile.followers}
            following={userProfile.following}
            concerts={userProfile.concerts}
          />
          
          <ProfileBio 
            bio={userProfile.bio}
            city={userProfile.city}
            country={userProfile.country}
            favoriteArtist={userProfile.favoriteArtist}
            favoriteSong={userProfile.favoriteSong}
          />
          
          <ProfileActions 
            onEdit={() => navigate('/profile/edit')}   
            onMessages={() => console.log('Messages')}
          />

          <StoriesSection 
            stories={storiesData} 
            onStoryClick={handleStoryClick} 
          />
        </div>
      </div>

      <AnimatePresence>
        {selectedStory !== null && (
          <StoryViewerScreen 
            story={selectedStory}
            onClose={closeViewer} 
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProfileScreen;
