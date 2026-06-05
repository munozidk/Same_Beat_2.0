import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { UserProfile } from '../types';
import { supabase } from '../lib/supabaseClient';
import type { User } from '@supabase/supabase-js';
import {
  buildProfileFromMetadata,
  buildProfileFromRow,
  EMPTY_USER_PROFILE,
  PROFILE_SELECT_FIELDS,
  type ProfileRow,
} from '../lib/profileUtils';

interface UserProfileContextValue {
  userProfile: UserProfile;
  updateUserProfile: (nextProfile: UserProfile) => void;
}

const UserProfileContext = createContext<UserProfileContextValue | null>(null);

interface UserProfileProviderProps {
  children: ReactNode;
}

async function getOrCreateProfile(authUser: User): Promise<UserProfile> {
  const metadata = authUser.user_metadata;

  const { data: existingProfile, error: selectError } =
    await supabase
      .from('profiles')
      .select(PROFILE_SELECT_FIELDS)
      .eq('auth_user_id', authUser.id)
      .maybeSingle();

  if (selectError) {
    return buildProfileFromMetadata(metadata);
  }

  if (existingProfile) {
    return buildProfileFromRow(existingProfile as ProfileRow, metadata);
  }

  const fallbackProfile = buildProfileFromMetadata(metadata);

  const { data: createdProfile, error: insertError } =
    await supabase
      .from('profiles')
      .insert({
        auth_user_id: authUser.id,
        username: fallbackProfile.username,
        full_name: fallbackProfile.name,
        age: fallbackProfile.age,
        is_seed_user: false,
      })
      .select(PROFILE_SELECT_FIELDS)
      .single();

  if (insertError || !createdProfile) {
    return fallbackProfile;
  }

  return buildProfileFromRow(createdProfile as ProfileRow, metadata);
}

export function UserProfileProvider({ children }: UserProfileProviderProps) {
  const [userProfile, setUserProfile] = useState<UserProfile>(EMPTY_USER_PROFILE);

  useEffect(() => {
    let isMounted = true;

    async function applyAuthProfile(authUser: User) {
      const nextProfile = await getOrCreateProfile(authUser);

      if (!isMounted) return;

      setUserProfile(nextProfile);
    }

    async function loadAuthProfile() {
      const { data: authData } = await supabase.auth.getUser();

      if (!isMounted || !authData.user) return;

      await applyAuthProfile(authData.user);
    }

    void loadAuthProfile();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;

      if (session?.user) {
        void applyAuthProfile(session.user);
      } else {
        setUserProfile(EMPTY_USER_PROFILE);
      }
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      userProfile,
      updateUserProfile: setUserProfile,
    }),
    [userProfile]
  );

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);

  if (!context) {
    throw new Error('useUserProfile must be used inside UserProfileProvider');
  }

  return context;
}
