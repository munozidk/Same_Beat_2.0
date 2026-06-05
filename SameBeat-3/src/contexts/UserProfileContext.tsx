import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { UserProfile } from '../types';
import { supabase } from '../lib/supabaseClient';
import type { User } from '@supabase/supabase-js';
import {
  buildProfileFromMetadata,
  buildProfileFromRow,
  EMPTY_USER_PROFILE,
  PROFILE_SELECT_FIELDS,
  updateProfileInSupabase,
  type ProfileRow,
} from '../lib/profileUtils';

type SaveUserProfileResult = {
  ok: boolean;
  error?: string;
};

interface UserProfileContextValue {
  userProfile: UserProfile;
  profileRevision: number;
  saveUserProfile: (nextProfile: UserProfile) => Promise<SaveUserProfileResult>;
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
  const [profileRevision, setProfileRevision] = useState(0);

  const saveUserProfile = useCallback(async (nextProfile: UserProfile): Promise<SaveUserProfileResult> => {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    const authUser = authData.user;

    if (authError || !authUser) {
      return { ok: false, error: 'No authenticated user' };
    }

    await getOrCreateProfile(authUser);

    const { data, error } = await updateProfileInSupabase(authUser.id, nextProfile);

    if (error || !data) {
      return { ok: false, error: error ?? 'Could not update profile' };
    }

    const savedProfile = buildProfileFromRow(data, authUser.user_metadata);
    setUserProfile(savedProfile);
    setProfileRevision((revision) => revision + 1);

    return { ok: true };
  }, []);

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
      profileRevision,
      saveUserProfile,
    }),
    [userProfile, profileRevision, saveUserProfile]
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
