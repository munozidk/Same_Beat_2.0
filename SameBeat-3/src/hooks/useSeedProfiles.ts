import { useEffect, useState } from 'react';
import { fetchSeedProfiles, type SeedProfileRow } from '../lib/profileUtils';

export function useSeedProfiles(limit?: number) {
  const [profiles, setProfiles] = useState<SeedProfileRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setIsLoading(true);
      const data = await fetchSeedProfiles(limit);

      if (!isMounted) return;

      setProfiles(data);
      setIsLoading(false);
    }

    void load();

    return () => {
      isMounted = false;
    };
  }, [limit]);

  return { profiles, isLoading };
}
