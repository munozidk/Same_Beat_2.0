import chats from './chats/chats.json';
import communities from './chats/communities.json';
import concertsJson from './concerts/concerts.json';
import songsFromJson from './music/songs.json';
import posts from './posts/posts.json';
import userProfileList from './profile/userProfile.json';
import users from './users/users.json';
import type { Concert } from '../types';
import coverDardo from "../assets/cover.jpg";
import dardosSong from '../assets/dardos.mp3';
import concertImgAlvaro from '../assets/alvaro_diaz.jpeg';
import concertImgOneDirection from '../assets/one_direction.jpeg';
import concertImgMichaelJackson from '../assets/michael_jackson.jpeg';
import concertImgFuerzaRegida from '../assets/fuerza_regida.jpeg';
import concertImgGrupoGuayacan from '../assets/grupo_guayacan.jpeg';
import concertImgThreeDaysGrace from '../assets/three_days_grace.jpeg';
import concertImg5sos from '../assets/5sos.jpeg';

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

/**
 * Las URLs en concerts.json (p. ej. "./src/assets/...") no sirven en el navegador:
 * Vite solo empaqueta imágenes importadas en código. Aquí enlazamos cada id a su asset real.
 */
const concertImageById: Record<number, string> = {
    1: concertImgAlvaro,
    2: concertImgOneDirection,
    3: concertImgMichaelJackson,
    4: concertImgFuerzaRegida,
    5: concertImgGrupoGuayacan,
    6: concertImgThreeDaysGrace,
    7: concertImg5sos,
};

const concerts: Concert[] = (concertsJson as Concert[]).map((c) => ({
    ...c,
    image: concertImageById[c.id] ?? c.image,
}));

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