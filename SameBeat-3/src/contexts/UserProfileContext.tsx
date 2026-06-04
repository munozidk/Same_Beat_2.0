import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { data } from '../data';
import type { UserProfile } from '../types';
import { supabase } from '../lib/supabaseClient';
import type { User } from '@supabase/supabase-js';

interface UserProfileContextValue {
  userProfile: UserProfile;
  updateUserProfile: (nextProfile: UserProfile) => void;
}

const UserProfileContext = createContext<UserProfileContextValue | null>(null);

interface UserProfileProviderProps {
  children: ReactNode;
}

type ProfileRow = {
  username: string | null;
  full_name: string | null;
  age: number | null;
};

function getAgeFromDate(dateOfBirth?: string) {
  if (!dateOfBirth) return data.userProfile.age;

  const birthDate = new Date(dateOfBirth);
  if (Number.isNaN(birthDate.getTime())) return data.userProfile.age;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const birthdayHasNotPassed =
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate());

  if (birthdayHasNotPassed) {
    age -= 1;
  }

  return age;
}

function buildProfileFromMetadata(metadata: Record<string, unknown>): UserProfile {
  const firstName = String(metadata.firstName ?? '').trim();
  const lastName = String(metadata.lastName ?? '').trim();
  const username = String(metadata.username ?? '').trim();
  const dateOfBirth = String(metadata.dateOfBirth ?? '').trim();

  return {
    ...data.userProfile,
    name: `${firstName} ${lastName}`.trim() || data.userProfile.name,
    username: username || data.userProfile.username,
    age: getAgeFromDate(dateOfBirth),
  };
}

function buildProfileFromRow(row: ProfileRow, metadata: Record<string, unknown>): UserProfile {
  const metadataProfile = buildProfileFromMetadata(metadata);

  return {
    ...metadataProfile,
    name: row.full_name || metadataProfile.name,
    username: row.username || metadataProfile.username,
    age: row.age ?? metadataProfile.age,
  };
}

async function getOrCreateProfile(authUser: User): Promise<UserProfile> {
  const metadata = authUser.user_metadata;

  const { data: existingProfile, error: selectError } =
    await supabase
      .from('profiles')
      .select('username, full_name, age')
      .eq('auth_user_id', authUser.id)
      .maybeSingle();

  if (selectError) {
    return buildProfileFromMetadata(metadata);
  }

  if (existingProfile) {
    return buildProfileFromRow(existingProfile, metadata);
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
      .select('username, full_name, age')
      .single();

  if (insertError || !createdProfile) {
    return fallbackProfile;
  }

  return buildProfileFromRow(createdProfile, metadata);
}

export function UserProfileProvider({ children }: UserProfileProviderProps) {
  const [userProfile, setUserProfile] = useState<UserProfile>(data.userProfile as UserProfile);

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

    loadAuthProfile();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;

      if (session?.user) {
        void applyAuthProfile(session.user);
      } else {
        setUserProfile(data.userProfile as UserProfile);
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
