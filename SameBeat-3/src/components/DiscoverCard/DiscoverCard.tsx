import { useState, useRef } from "react";
import { SkipBack, SkipForward, Play, Pause } from "lucide-react";
import './SDiscoverCard.css';

interface DiscoverSong {
    id: number;
    title: string;
    artists: string[];
    coverImage: string;
    artistImage: string;
    audio: string;
}

interface Props {
    songs: DiscoverSong[]
}

export default function DiscoverCard({songs}: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const song = songs[currentIndex];

    function togglePlay() {
        if (!audioRef.current) return;
        if (isPlaying) { audioRef.current.pause() }
        else { audioRef.current.play() }
        setIsPlaying(!isPlaying)
    }

    function handleNext() {
        const next = (currentIndex + 1) % songs.length
        setCurrentIndex(next)
        setIsPlaying(true)
        setTimeout(() => audioRef.current?.play(), 50)
    }

    function handlePrev() {
        const prev = (currentIndex -1 + songs.length) % songs.length
        setCurrentIndex(prev)
        setIsPlaying(true)
        setTimeout(() => audioRef.current?.play(), 50)
    }

    return (
        <div className="discover-card">

            {/* Imagen principal con gradiente e info encima */}
      <div className="discover-card__cover-wrapper">
        <img
          src={song.coverImage}
          alt={song.title}
          className="discover-card__cover"
        />
        <div className="discover-card__cover-gradient" />

        <div className="discover-card__info">
          <img
            src={song.artistImage}
            alt={song.artists[0]}
            className="discover-card__artist-avatar"
          />
          <p className="discover-card__song-name">{song.title}</p>
          <p className="discover-card__artists">
            {song.artists.map((artist, i) => (
              <span key={artist}>
                <a>{artist}</a>
                {i < song.artists.length - 1 && ' & '}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Audio */}
      <audio ref={audioRef} src={song.audio} onEnded={handleNext} />

      {/* Controles */}
      <div className="discover-card__controls">
        <button onClick={handlePrev} className="discover-card__ctrl-btn">
          <SkipBack size={28} />
        </button>
        <button onClick={togglePlay} className="discover-card__play-btn">
          {isPlaying
            ? <Pause size={22} stroke="#000" />
            : <Play size={22} stroke="#000" />
          }
        </button>
        <button onClick={handleNext} className="discover-card__ctrl-btn">
          <SkipForward size={28} />
        </button>
      </div>
        </div>
    )
}