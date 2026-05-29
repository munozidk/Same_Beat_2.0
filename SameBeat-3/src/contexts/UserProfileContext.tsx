import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { data } from '../data';
import type { UserProfile } from '../types';

interface UserProfileContextValue {
  userProfile: UserProfile;
  updateUserProfile: (nextProfile: UserProfile) => void;
}

const UserProfileContext = createContext<UserProfileContextValue | null>(null);

interface UserProfileProviderProps {
  children: ReactNode;
}

export function UserProfileProvider({ children }: UserProfileProviderProps) {
  const [userProfile, setUserProfile] = useState<UserProfile>(data.userProfile as UserProfile);

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
