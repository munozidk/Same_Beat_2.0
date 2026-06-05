import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import ProfileUsername from '../../components/Profile/ProfileUsername';
import ProfileHeaderInfo from '../../components/Profile/ProfileHeaderInfo';
import ProfileBio from '../../components/Profile/ProfileBio';
import ProfileActions from '../../components/Profile/ProfileActions';
import BackButton from '../../components/BackButton/BackButton';
import StoriesSection from '../../components/Stories/StoriesSection';
import StoryViewerScreen from '../../screens/Stories/StoryViewerScreen';
import PostFeed from '../../components/PostFeed/PostFeed';
import { data } from '../../data';
import { useUserProfile } from '../../contexts/UserProfileContext';
import { mapSupabasePostToPost } from '../../contexts/PostContext';
import type { SupabasePostRow } from '../../contexts/PostContext';
import { supabase } from '../../lib/supabaseClient';
import type { Post, UserProfile } from '../../types';
import { imageMap, resolveAsset } from '../../utils/imageMap';
import styles from './ProfileScreen.module.css';

type ProfileRow = Record<string, unknown> & {
  id?: string | number;
  username?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
  age?: number | null;
  bio?: string | null;
  city?: string | null;
  country?: string | null;
  compatibility?: string | null;
};

type DisplayProfile = UserProfile & {
  profileId?: string | number;
  compatibility?: string;
};

function getString(value: unknown, fallback = '') {
  return typeof value === 'string' && value.trim() ? value : fallback;
}

function getNumber(value: unknown, fallback: number) {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function getFallbackSeedProfile(row?: ProfileRow | null) {
  const name = getString(row?.full_name) || getString(row?.username);

  return data.users.find(user =>
    user.username === name ||
    user.username === row?.full_name ||
    user.username === row?.username
  );
}

function buildDisplayProfile(row: ProfileRow | null, fallbackProfile: UserProfile): DisplayProfile {
  const seedProfile = getFallbackSeedProfile(row);
  const avatarUrl = getString(row?.avatar_url, seedProfile?.image ?? fallbackProfile.image);
  const favoriteArtist = getString(
    row?.favorite_artist ?? row?.favoriteArtist,
    fallbackProfile.favoriteArtist
  );
  const favoriteSong = getString(
    row?.favorite_song ?? row?.favoriteSong,
    fallbackProfile.favoriteSong
  );

  return {
    ...fallbackProfile,
    profileId: row?.id,
    name: getString(row?.full_name, seedProfile?.username ?? fallbackProfile.name),
    username: getString(row?.username, fallbackProfile.username),
    image: avatarUrl,
    age: getNumber(row?.age, seedProfile?.age ?? fallbackProfile.age),
    bio: getString(row?.bio, seedProfile?.bio ?? fallbackProfile.bio),
    city: getString(row?.city, fallbackProfile.city),
    country: getString(row?.country, fallbackProfile.country),
    followers: getNumber(row?.followers ?? row?.followers_count, fallbackProfile.followers),
    following: getNumber(row?.following ?? row?.following_count, fallbackProfile.following),
    concerts: getNumber(row?.concerts ?? row?.concerts_count, fallbackProfile.concerts),
    favoriteArtist,
    favoriteSong,
    compatibility: getString(row?.compatibility, seedProfile?.compatibility ?? ''),
  };
}

const ProfileScreen: React.FC = () => {
  const { userProfile } = useUserProfile();
  const { profileId } = useParams<{ profileId?: string }>();
  const navigate = useNavigate();
  const [displayProfile, setDisplayProfile] = useState<DisplayProfile>(userProfile);
  const [currentProfileId, setCurrentProfileId] = useState<string | number | null>(null);
  const [profilePosts, setProfilePosts] = useState<Post[]>([]);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [selectedStory, setSelectedStory] = useState<any>(null);

  const profileImage = displayProfile.image
    ? resolveAsset(imageMap[displayProfile.image] ?? displayProfile.image)
    : undefined;

  const targetProfileId = displayProfile.profileId;
  const isOwnProfile = targetProfileId !== undefined && String(targetProfileId) === String(currentProfileId);

  const storiesData = useMemo(() => data.concerts.map(c => ({
    id: c.id,
    title: c.artist,
    thumbnail: c.image,
    images: [c.image],
    subtitle: c.tour,
    caption: c.tour
  })), []);

  useEffect(() => {
    let isMounted = true;

    async function loadCurrentProfileId() {
      const { data: authData } = await supabase.auth.getUser();

      if (!authData.user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('auth_user_id', authData.user.id)
        .maybeSingle();

      if (!isMounted || !profile) return;

      setCurrentProfileId((profile as ProfileRow).id ?? null);
    }

    void loadCurrentProfileId();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      setIsLoadingProfile(true);

      const query = supabase
        .from('profiles')
        .select('*');

      const { data: authData } = await supabase.auth.getUser();
      const { data: profile, error } = profileId
        ? await query.eq('id', profileId).maybeSingle()
        : authData.user
          ? await query.eq('auth_user_id', authData.user.id).maybeSingle()
          : { data: null, error: null };

      if (!isMounted) return;

      if (error) {
        console.error('Error loading profile:', error.message);
      }

      setDisplayProfile(buildDisplayProfile(profile as ProfileRow | null, userProfile));
      setIsLoadingProfile(false);
    }

    void loadProfile();

    return () => {
      isMounted = false;
    };
  }, [profileId, userProfile]);

  useEffect(() => {
    let isMounted = true;

    async function loadProfilePosts() {
      if (!targetProfileId) {
        setProfilePosts([]);
        setIsLoadingPosts(false);
        return;
      }

      setIsLoadingPosts(true);

      const { data: posts, error } = await supabase
        .from('posts')
        .select(`
          id,
          author_profile_id,
          text,
          likes,
          reposts,
          created_at,
          profiles (
            username,
            full_name,
            avatar_url
          )
        `)
        .eq('author_profile_id', targetProfileId)
        .order('created_at', { ascending: false });

      if (!isMounted) return;

      if (error) {
        console.error('Error loading profile posts:', error.message);
        setProfilePosts([]);
        setIsLoadingPosts(false);
        return;
      }

      setProfilePosts((posts ?? []).map(post => mapSupabasePostToPost(post as SupabasePostRow)));
      setIsLoadingPosts(false);
    }

    void loadProfilePosts();

    return () => {
      isMounted = false;
    };
  }, [targetProfileId]);

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
        <ProfileUsername username={displayProfile.username} />
        
        <div className={styles.contentScroll}>
          <ProfileHeaderInfo 
            name={displayProfile.name}
            image={profileImage}
            age={displayProfile.age}
            followers={displayProfile.followers}
            following={displayProfile.following}
            concerts={displayProfile.concerts}
          />
          
          <ProfileBio 
            bio={displayProfile.bio}
            city={displayProfile.city}
            country={displayProfile.country}
            favoriteArtist={displayProfile.favoriteArtist}
            favoriteSong={displayProfile.favoriteSong}
          />

          {displayProfile.compatibility && (
            <p className={styles.compatibility}>{displayProfile.compatibility}</p>
          )}
          
          {isOwnProfile && (
            <ProfileActions
              onEdit={() => navigate('/profile/edit')}
              onMessages={() => console.log('Messages')}
            />
          )}

          <StoriesSection 
            stories={storiesData} 
            onStoryClick={handleStoryClick} 
          />

          <section className={styles.postsSection}>
            <h2 className={styles.postsTitle}>My Posts</h2>
            {profilePosts.length > 0 ? (
              <PostFeed posts={profilePosts} />
            ) : (
              <p className={styles.emptyPosts}>
                {isLoadingProfile || isLoadingPosts ? 'Loading posts...' : "You haven't posted anything yet."}
              </p>
            )}
          </section>
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
