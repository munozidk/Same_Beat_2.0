export interface UserProfile {
  id: number;
  name: string;
  username: string;
  age: number;
  followers: number;
  following: number;
  concerts: number;
  city: string;
  country: string;
  bio: string;
  favoriteArtist: string;
  favoriteSong: string;
}

export interface Concert {
  id: number;
  artist: string;
  tour: string;
  date: string;
  location: string;
  venue: string;
  capacity: string;
  openingTime: string;
  image: string;
  genre: string;
  description: string;
  themeColor: string;
}
