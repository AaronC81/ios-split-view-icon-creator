import { useEffect, useMemo, useState } from "react";
import z from "zod";

const resultSchema = z.object({
  trackId: z.number(),
  trackName: z.string(),
  artistName: z.string(),
  artworkUrl60: z.string(),
  artworkUrl512: z.string(),
});

const responseSchema = z.object({
  results: z.array(resultSchema),
});

export type AppStoreResult = {
  id: number;
  name: string;
  author: string;
  iconUrl60: string;
  iconUrl512: string;
};

export default function useAppStoreSearch(searchTerm: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [results, setResults] = useState<AppStoreResult[] | undefined>();

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      if (searchTerm.trim() === "") {
        setLoading(false);
        setError(false);
        setResults([]);
      }

      setLoading(true);

      try {
        const request = await fetch(
          `https://itunes.apple.com/search?media=software&term=${encodeURIComponent(searchTerm)}`,
          { signal: abortController.signal },
        );
        const response = await request.json();
        console.log({ response });
        const rawResults = responseSchema.parse(response).results;

        const results = rawResults.map(({ trackId, trackName, artistName, artworkUrl60, artworkUrl512 }) => ({
          id: trackId,
          name: trackName,
          author: artistName,
          iconUrl60: artworkUrl60,
          iconUrl512: artworkUrl512,
        }));

        setResults(results);
        setLoading(false);
        setError(false);
      } catch (e) {
        if (e instanceof Error && e.name !== "AbortError") {
          console.error(e);
          setError(true);
        }
      }
    })();

    return () => abortController.abort();
  }, [searchTerm]);

  return useMemo(() => ({ loading, error, results }), [loading, error, results]);
}