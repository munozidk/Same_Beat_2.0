import { useRef, useState } from "react";
import { SkipBack, SkipForward, Play, Pause } from "lucide-react";
import type { Song } from "../../types";
import { resolveAsset } from "../../utils/imageMap";
import './SNowPlaying.css';

interface Props {
  songs: Song[];
}

export default function NowPlaying({ songs }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const song = songs[currentIndex];

  // Si la tabla songs esta vacia, el reproductor no se muestra.
  if (!song) {
    return null;
  }

  function togglePlay() {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      void audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  }

  function handleNext() {
    const next = (currentIndex + 1) % songs.length;
    setCurrentIndex(next);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 50);
  }

  function handlePrev() {
    const prev = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentIndex(prev);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 50);
  }

  return (
    <section className="now-playing">
      <h3 className="now-playing-title">Now Playing</h3>

      <div className="cover-container">
        <img
          src={resolveAsset(song.image)}
          alt={song.name}
          className="cover-image"
        />
      </div>

      <p className="song-name">{song.name}</p>
      <p className="artist-name">{song.artist}</p>

      <div className="bars-container">
        {[0, 0.1, 0.2, 0.3, 0.4].map((delay, i) => (
          <span
            key={i}
            className="bar"
            style={{
              animationDelay: `${delay}s`,
              animationPlayState: isPlaying ? 'running' : 'paused'
            }}
          />
        ))}
      </div>

      {/* El audio sale de song.audio, que viene de songs.audio_url en Supabase. */}
      <audio
        ref={audioRef}
        src={resolveAsset(song.audio)}
        onEnded={handleNext}
      />

      <div className="controls">
        <button onClick={handlePrev} className="ctrl-btn">
          <SkipBack size={18} color="#C6FF34" />
        </button>

        <button onClick={togglePlay} className="play-btn">
          {isPlaying ? (
            <Pause size={24} color="#000" />
          ) : (
            <Play size={24} color="#000" />
          )}
        </button>

        <button onClick={handleNext} className="ctrl-btn">
          <SkipForward size={18} color="#C6FF34" />
        </button>
      </div>
    </section>
  );
}