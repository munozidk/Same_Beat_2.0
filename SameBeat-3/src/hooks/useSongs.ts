import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { Song } from "../types";

type SongRow = {
  id: number;
  name: string | null;
  artist: string | null;
  cover_url: string | null;
  audio_url: string | null;
};

function mapSong(row: SongRow): Song {
  return {
    id: row.id,
    name: row.name ?? "Unknown song",
    artist: row.artist ?? "Unknown artist",
    image: row.cover_url ?? "",
    audio: row.audio_url ?? "",
  };
}

export function useSongs() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadSongs() {
      // La app lee la tabla songs
      // Los campos cover_url y audio_url deben ser URLs publicas del bucket
      const { data, error } = await supabase
        .from("songs")
        .select("id, name, artist, cover_url, audio_url")
        .order("id", { ascending: true });

      if (!isMounted) return;

      if (error) {
        console.error("Error loading songs:", error.message);
        setSongs([]);
      } else {
        setSongs((data ?? []).map((song) => mapSong(song as SongRow)));
      }

      setIsLoading(false);
    }

    void loadSongs();

    return () => {
      isMounted = false;
    };
  }, []);

  return { songs, isLoading };
}