import { supabase } from './supabaseClient';
import type { User, UserProfile } from '../types';

export const DEFAULT_AVATAR = 'assets/profile.jpg';

export const EMPTY_USER_PROFILE: UserProfile = {
  id: 0,
  name: '',
  username: '',
  image: DEFAULT_AVATAR,
  age: 0,
  bio: '',
  city: '',
  country: '',
  followers: 0,
  following: 0,
  concerts: 0,
  favoriteArtist: '',
  favoriteSong: '',
};

export type ProfileRow = {
  id?: string | number;
  username?: string | null;
  full_name?: string | null;
  age?: number | null;
  avatar_url?: string | null;
  bio?: string | null;
  city?: string | null;
  country?: string | null;
  followers?: number | null;
  following?: number | null;
  concerts?: number | null;
  favorite_artist?: string | null;
  favorite_song?: string | null;
  favoriteArtist?: string | null;
  favoriteSong?: string | null;
  compatibility?: string | null;
  is_seed_user?: boolean | null;
};

export type SeedProfileRow = {
  id: string | number;
  username: string | null;
  full_name: string | null;
  age: number | null;
  avatar_url: string | null;
  compatibility: string | null;
};

const PROFILE_SELECT_FIELDS =
  'id, username, full_name, age, avatar_url, bio, city, country, followers, following, concerts, favorite_artist, favorite_song';

export function getAgeFromDate(dateOfBirth?: string, fallback = 0) {
  if (!dateOfBirth) return fallback;

  const birthDate = new Date(dateOfBirth);
  if (Number.isNaN(birthDate.getTime())) return fallback;

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

export function buildProfileFromMetadata(metadata: Record<string, unknown>): UserProfile {
  const firstName = String(metadata.firstName ?? '').trim();
  const lastName = String(metadata.lastName ?? '').trim();
  const username = String(metadata.username ?? '').trim();
  const dateOfBirth = String(metadata.dateOfBirth ?? '').trim();

  return {
    ...EMPTY_USER_PROFILE,
    name: `${firstName} ${lastName}`.trim() || 'User',
    username,
    age: getAgeFromDate(dateOfBirth),
  };
}

export function buildProfileFromRow(
  row: ProfileRow,
  metadata?: Record<string, unknown>
): UserProfile {
  const metadataProfile = metadata
    ? buildProfileFromMetadata(metadata)
    : EMPTY_USER_PROFILE;

  const numericId =
    typeof row.id === 'number'
      ? row.id
      : Number.parseInt(String(row.id ?? ''), 10) || 0;

  return {
    id: numericId,
    name: row.full_name || metadataProfile.name,
    username: row.username || metadataProfile.username,
    image: row.avatar_url || DEFAULT_AVATAR,
    age: row.age ?? metadataProfile.age,
    bio: row.bio ?? '',
    city: row.city ?? '',
    country: row.country ?? '',
    followers: row.followers ?? 0,
    following: row.following ?? 0,
    concerts: row.concerts ?? 0,
    favoriteArtist: row.favorite_artist ?? row.favoriteArtist ?? '',
    favoriteSong: row.favorite_song ?? row.favoriteSong ?? '',
  };
}

export function mapSeedProfileToUser(
  profile: SeedProfileRow,
  index: number
): User {
  const numericId =
    typeof profile.id === 'number'
      ? profile.id
      : Number.parseInt(String(profile.id), 10) || index + 1;

  return {
    id: numericId,
    username: profile.username || profile.full_name || 'User',
    age: profile.age ?? 0,
    image: profile.avatar_url || DEFAULT_AVATAR,
    compatibility: profile.compatibility || '',
  };
}

export type ProfileUpdatePayload = {
  full_name: string;
  username: string;
  age: number;
  bio: string;
  city: string;
  country: string;
  favorite_artist: string;
  favorite_song: string;
  avatar_url: string | null;
};

export function mapUserProfileToUpdatePayload(profile: UserProfile): ProfileUpdatePayload {
  return {
    full_name: profile.name.trim(),
    username: profile.username.trim(),
    age: Number.isFinite(profile.age) ? profile.age : 0,
    bio: profile.bio.trim(),
    city: profile.city.trim(),
    country: profile.country.trim(),
    favorite_artist: profile.favoriteArtist.trim(),
    favorite_song: profile.favoriteSong.trim(),
    avatar_url:
      profile.image && profile.image !== DEFAULT_AVATAR ? profile.image : null,
  };
}

export async function updateProfileInSupabase(
  authUserId: string,
  profile: UserProfile
): Promise<{ data: ProfileRow | null; error: string | null }> {
  const payload = mapUserProfileToUpdatePayload(profile);

  const { data, error } = await supabase
    .from('profiles')
    .update(payload)
    .eq('auth_user_id', authUserId)
    .select(PROFILE_SELECT_FIELDS)
    .maybeSingle();

  if (error) {
    return { data: null, error: error.message };
  }

  if (!data) {
    return { data: null, error: 'Profile row not found for authenticated user' };
  }

  return { data: data as ProfileRow, error: null };
}

export async function fetchSeedProfiles(limit?: number): Promise<SeedProfileRow[]> {
  let query = supabase
    .from('profiles')
    .select('id, username, full_name, age, avatar_url, compatibility')
    .eq('is_seed_user', true)
    .order('created_at', { ascending: true });

  if (limit !== undefined) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error loading seed profiles:', error.message);
    return [];
  }

  return (data ?? []) as SeedProfileRow[];
}

export { PROFILE_SELECT_FIELDS };
