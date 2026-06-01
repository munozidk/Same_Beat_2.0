import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { data } from '../data';
import type { UserProfile } from '../types';
import { supabase } from '../lib/supabaseClient';

interface UserProfileContextValue {
  userProfile: UserProfile;
  updateUserProfile: (nextProfile: UserProfile) => void;
}

const UserProfileContext = createContext<UserProfileContextValue | null>(null);

interface UserProfileProviderProps {
  children: ReactNode;
}

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

export function UserProfileProvider({ children }: UserProfileProviderProps) {
  const [userProfile, setUserProfile] = useState<UserProfile>(data.userProfile as UserProfile);

  useEffect(() => {
    let isMounted = true;

    async function loadAuthProfile() {
      const { data: authData } = await supabase.auth.getUser();
      const authUser = authData.user;

      if (!isMounted || !authUser) return;

      setUserProfile(buildProfileFromMetadata(authUser.user_metadata));
    }

    loadAuthProfile();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;

      if (session?.user) {
        setUserProfile(buildProfileFromMetadata(session.user.user_metadata));
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
