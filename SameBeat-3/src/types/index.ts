export interface Comment {
  id: number
  user: string
  image: string
  text: string
}

export interface Post {
  id: number
  user: string
  image: string
  text: string
  likes: number
  reposts: number
  comments: Comment[]
  mediaImage?: string | null   
  mediaVideo?: string | null   
  mediaSong?: string | null    
}

export interface Song {
  id: number
  name: string
  artist: string
  image: string
  audio: string
}

export interface Chat {
  id: number
  userId: number
  lastMessage: string
  timestamp: string
  unreadCount: number
}

export interface User {
  id: number
  username: string
  age: number
  image: string
  compatibility: string
}

export interface UserProfile {
  id: number
  name: string
  username: string
  image?: string
  age: number
  bio: string
  city: string
  country: string

  followers: number
  following: number
  concerts: number

  favoriteArtist: string
  favoriteSong: string
}

export interface Concert {
  id: number
  artist: string
  tour: string
  date: string
  location: string
  venue: string
  capacity: string
  openingTime: string
  image: string
  genre: string
  description: string
  themeColor: string
}

export interface Community {
  id: number
  name: string
  members: number[]
}

export interface DiscoverSong {
  id: number
  title: string
  artists: string[]
  coverImage: string
  artistImage: string
  audio: string
}
