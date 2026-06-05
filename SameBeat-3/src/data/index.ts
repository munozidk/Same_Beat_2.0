import chats from './chats/chats.json';
import communities from './chats/communities.json';
import concertsJson from './concerts/concerts.json';

import type { Concert } from '../types';

import concertImgAlvaro from '../assets/alvaro_diaz.jpeg';
import concertImgOneDirection from '../assets/one_direction.jpeg';
import concertImgMichaelJackson from '../assets/michael_jackson.jpeg';
import concertImgFuerzaRegida from '../assets/fuerza_regida.jpeg';
import concertImgGrupoGuayacan from '../assets/grupo_guayacan.jpeg';
import concertImgThreeDaysGrace from '../assets/three_days_grace.jpeg';
import concertImg5sos from '../assets/5sos.jpeg';




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

export const data = {
    chats,
    communities,
    concerts,

};

export { chats, communities, concerts };
