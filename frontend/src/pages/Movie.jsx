import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import leftArrow from "../assets/left-arrow.png";
import IconContainer from "../components/IconContainer";
import ErrorMessageContainer from "../components/ErrorMessageContainer";
import { regionMap } from "../data/questions";

const Movie = () => {
  const API_BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedOptions, previousPage, searchBarQuery } = location.state;
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");
  const [credits, setCredits] = useState(null);
  const [region, setRegion] = useState("US");
  const [providers, setProviders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMovieDetails = async () => {
    try {
      const endpoint = `${API_BASE_URL}/movie/${id}`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Error fetching movie details!");
      }
      const data = await response.json();

      if (data) setMovie(data);
    } catch (e) {
      console.log("Error fetching movie details: ", e);
    }
  };

  const getTrailer = async () => {
    try {
      const trailerEndpoint = `${API_BASE_URL}/movie/${id}/videos?language=en-US`;

      const response = await fetch(trailerEndpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Error getting trailer");
      }

      const data = await response.json();

      const trailer = data.results.find((video) => video.type === "Trailer");

      if (trailer) {
        setTrailerKey(trailer.key);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getCredits = async () => {
    const endpoint = `${API_BASE_URL}/movie/${id}/credits?language=en-US`;
    try {
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        console.log("Error fetching movie credits");
      }

      const data = await response.json();

      if (data) setCredits(data);
    } catch (e) {
      console.log(e);
    }
  };

  const changeRegion = (e) => {
    setRegion(e);
  };

  const getMovieProviders = async () => {
    try {
      const endpoint = `${API_BASE_URL}/movie/${id}/watch/providers`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        setProviders([]);
      }

      const data = await response.json();

      const buyProviders = data.results[region].buy;
      const rentProviders = data.results[region].rent;

      //using a set allows for prevention of duplicates
      const uniqueProviders = new Set([
        ...buyProviders.map((provider) =>
          provider.provider_name.replace(/\s/g, "-")
        ),
        ...rentProviders.map((provider) =>
          provider.provider_name.replace(/\s/g, "-")
        ),
      ]);

      setProviders(Array.from(uniqueProviders));
    } catch (e) {
      setProviders([]);
      console.error("Error getting movie providers", e);
    }
  };

  const returnToResults = () => {
    navigate("/results", {
      state: { selectedOptions, previousPage, searchBarQuery },
    });
  };

  useEffect(() => {
    getMovieDetails();
  }, [id]);

  useEffect(() => {
    if (!movie) return;
    getTrailer();
    getCredits();
  }, [movie]);

  useEffect(() => {
    setProviders([]);
    getMovieProviders();
  }, [region]);

  useEffect(() => {}, [providers]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-slate-950 to-slate-900 text-white px-6 py-12 shadow-lg space-y-8">
      {/* Back Button */}
      <div className="relative w-full max-w-5xl">
        <button
          onClick={returnToResults}
          className="cursor-pointer absolute top-0 left-0 flex items-center gap-2"
        >
          <img src={leftArrow} className="w-6 h-auto" alt="Back" />
        </button>
      </div>

      {/* Trailer Section */}
      <div className="w-full max-w-5xl">
        {!isLoading ? (
          trailerKey ? (
            <iframe
              className="w-full aspect-video rounded-lg shadow-lg"
              src={`https://www.youtube.com/embed/${trailerKey}?si=EzobZWCAZ01CUU3Z`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ) : (
            <img
              className="w-full rounded-lg shadow-lg"
              src="/trailer-not-found.PNG"
              alt="Trailer not found"
            />
          )
        ) : (
          <Spinner />
        )}
      </div>

      {/* Movie Details */}
      {movie && (
        <div className="font-bebas-neue w-full max-w-5xl bg-slate-950 p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl mb-6 ">{movie.title}</h1>

          {/* Poster & Overview */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-32 h-auto object-cover rounded-xs"
            />
            <p className="text-slate-300 text-xl leading-relaxed">
              {movie.overview}
            </p>
          </div>

          {/* Movie Info */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-6 mt-6 text-lg text-gray-300">
            <p>
              <span className="text-slate-400">Rating:</span>{" "}
              {movie.vote_average ? (movie.vote_average / 2).toFixed(1) : "N/A"}
            </p>
            <p>
              <span className="text-slate-400">Language:</span>{" "}
              {movie.original_language.toUpperCase()}
            </p>
            <p>
              <span className="text-slate-400">Release:</span>{" "}
              {movie.release_date}
            </p>
            <p>
              <span className="text-slate-400">Runtime:</span>{" "}
              {Math.floor(movie.runtime / 60)} hr {movie.runtime % 60} min
            </p>
            <p>
              <span className="text-slate-400">Budget:</span>
              {movie.budget !== 0
                ? ` $${movie.budget.toLocaleString()}`
                : " N/A"}
            </p>
            <p>
              <span className="text-slate-400">Box Office:</span>
              {movie.revenue !== 0
                ? ` $${movie.revenue.toLocaleString()}`
                : " N/A"}
            </p>
          </div>

          {/* Credits Section */}
          {credits && (
            <div className="space-y-6 mt-8">
              <h2 className="text-2xl">Cast & Crew</h2>
              <div className="flex flex-col gap-3 text-lg text-gray-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Director:</span>
                  <span>
                    {credits.crew?.find((member) => member.job === "Director")
                      ?.name || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Lead Actors:</span>
                  <span>
                    {credits.cast?.length
                      ? credits.cast
                          .slice(0, 5)
                          .map((actor) => actor.name)
                          .join(", ")
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Watch Providers Section */}
          <div className="space-y-6 mt-8">
            <h2 className="text-2xl">Available On</h2>
            <div>
              <select
                className="bg-slate-950 text-white border border-gray-700 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 custom-scrollbar"
                name="region"
                id="region"
                onChange={(e) => {
                  changeRegion(e.target.value);
                }}
                value={region}
              >
                {Object.entries(regionMap)
                  .sort()
                  .map(([regionName, regionData], index) => (
                    <option key={index} value={regionData.code}>
                      {regionName}
                    </option>
                  ))}
              </select>
            </div>

            {/* Provider Icons */}
            <div className="flex flex-wrap justify-center gap-6 mt-6 text-slate-950">
              {providers.length > 0 ? (
                providers.map((provider, index) => (
                  <IconContainer index={index} provider={provider} />
                ))
              ) : (
                <ErrorMessageContainer
                  errorMessage={"No Data available for this region"}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;
