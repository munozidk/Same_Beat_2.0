import chats from './chats/chats.json';
import communities from './chats/communities.json';
import concerts from './concerts/concerts.json';
import songsFromJson from './music/songs.json';
import posts from './posts/posts.json';
import userProfileList from './profile/userProfile.json';
import users from './users/users.json';
import coverDardo from "../assets/cover.jpg";
import dardosSong from '../assets/dardos.mp3';

type SongJson = {
    id: number;
    name: string;
    artist: string;
    image: string;
    audio: string;
};

const songs = (songsFromJson as SongJson[]).map((s) => {
    if (s.id === 1) {
        return {
            ...s,
            image: coverDardo,
            audio: dardosSong,
        };
    }
    return s;
});

const userProfile = userProfileList[0];
if (!userProfile) {
    throw new Error('userProfile.json must contain at least one profile');
}

export const data = {
    chats,
    communities,
    concerts,
    songs,
    posts,
    userProfile,
    users,
};

export { chats, communities, concerts, posts, users, songs };
