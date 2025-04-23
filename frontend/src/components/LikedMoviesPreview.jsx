import React from "react";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

const LikedMoviesPreview = ({ likedMovies = [], userId }) => {
  const navigate = useNavigate();

  const loadMoviePage = (id) => {
    navigate(`/movie/${id}`, { state: { from: "profile", userId } });
  };

  return (
    <>
      {likedMovies.length > 0 ? (
        <div className="mb-6">
          <div className="flex justify-between">
            <h2 className="text-xl mb-1">Liked Movies</h2>
            <a href="#" className="text-sm hover:text-blue-500">
              All
            </a>
          </div>
          <div className="border-b border-zinc-500 mb-4"></div>

          <div className=" gap-2 flex-wrap grid grid-cols-3 sm:grid-cols-6 md:grid-cols-6">
            {likedMovies.map((movie, i) => (
              <div key={i}>
                <button onClick={() => loadMoviePage(movie.id)}>
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        : `./no-movie.png`
                    }
                    alt={movie.title}
                    className="w-36 h-56 object-cover rounded border-2 border-transparent hover:border-blue-500 cursor-pointer"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <div className="flex justify-between">
            <h2 className="text-xl mb-1">Liked Movies</h2>
          </div>
          <div className="border-b border-zinc-500 mb-4"></div>

          <div className="flex justify-center text-2xl">
            <div>No Liked Movies</div>
          </div>
        </div>
      )}
    </>
  );
};

export default LikedMoviesPreview;
