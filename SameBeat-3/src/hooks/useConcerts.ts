import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { Concert } from "../types";

type ConcertRow = {
  id: number;
  artist: string | null;
  tour: string | null;
  concert_date: string | null;
  location: string | null;
  venue: string | null;
  capacity: string | null;
  opening_time: string | null;
  image_url: string | null;
  genre: string | null;
  description: string | null;
  theme_color: string | null;
};

function mapConcert(row: ConcertRow): Concert {
  return {
    id: row.id,
    artist: row.artist ?? "Unknown artist",
    tour: row.tour ?? "",
    date: row.concert_date ?? "",
    location: row.location ?? "",
    venue: row.venue ?? "",
    capacity: row.capacity ?? "",
    openingTime: row.opening_time ?? "",
    image: row.image_url ?? "",
    genre: row.genre ?? "",
    description: row.description ?? "",
    themeColor: row.theme_color ?? "",
  };
}

export function useConcerts() {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadConcerts() {
      // Carga los conciertos desde Supabase en vez de concerts.json.
      const { data, error } = await supabase
        .from("concerts")
        .select(`
          id,
          artist,
          tour,
          concert_date,
          location,
          venue,
          capacity,
          opening_time,
          image_url,
          genre,
          description,
          theme_color
        `)
        .order("concert_date", { ascending: true });

      if (!isMounted) return;

      if (error) {
        console.error("Error loading concerts:", error.message);
        setConcerts([]);
      } else {
        setConcerts((data ?? []).map((concert) => mapConcert(concert as ConcertRow)));
      }

      setIsLoading(false);
    }

    void loadConcerts();

    return () => {
      isMounted = false;
    };
  }, []);

  return { concerts, isLoading };
}