import { useState, useEffect } from "react";
import axios from "axios";

const ListMovieSearch = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!debouncedQuery) {
        setResults([]);
        return;
      }

      try {
        const response = await axios.get(
          `/movie/searchMovies?debouncedQuery=${debouncedQuery}`
        );

        const results = response.data.movies.results;

        const filteredResults = results.filter((movie) => {
          const isNotAdult = !movie.adult;
          const isNotRomance = !movie.genre_ids?.includes(10749);
          const isInDesiredRegion = movie.original_language === "en";

          console.log(isNotAdult, isNotRomance, isInDesiredRegion);
          return isNotAdult && isNotRomance && isInDesiredRegion;
        });

        setResults(filteredResults || []);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchMovies();
  }, [debouncedQuery]);

  return (
    <div className="mb-8">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 rounded-lg bg-zinc-800 border-2 border-blue-500 text-white placeholder-zinc-400 "
      />

      {/* Search Results */}
      {results.length > 0 && (
        <div
          className="mt-4 max-h-[800px] overflow-y-auto pr-2  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {results.map((movie) => (
              <div
                key={movie.id}
                className="cursor-pointer group"
                onClick={() => onSelect(movie)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-40 object-cover rounded-md group-hover:opacity-80 transition"
                />
                <p className="text-center text-sm mt-2">{movie.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListMovieSearch;
