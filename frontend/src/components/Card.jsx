import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { useUser } from "../context/UserContext";

const Card = ({
  usersLikedMovies,
  onClick,
  movie: {
    title,
    vote_average,
    poster_path,
    release_date,
    original_language,
    overview,
    id,
    runtime,
  },
}) => {
  const [liked, setLiked] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const { user } = useUser();

  const handleLike = async (e) => {
    e.stopPropagation();
    if (!user) return;
    setLiked((prev) => !prev);
    setHasClicked(true);
  };

  useEffect(() => {
    const likeOrUnlikeMovie = async () => {
      try {
        //only run this code if the user has actually clicked. without this, the api would be called each time the component mounts
        if (!hasClicked) return;
        if (liked) {
          await axios.post(
            `/movie/likeMovie/${id}`,
            {},
            { withCredentials: true }
          );
        } else {
          await axios.delete(`/movie/unlikeMovie/${id}`, {
            withCredentials: true,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    likeOrUnlikeMovie();
  }, [liked]);

  useEffect(() => {
    if (usersLikedMovies.includes(id.toString())) {
      setLiked(true);
    }
  }, [usersLikedMovies]);

  return (
    <div
      className="font-bebas-neue group relative bg-slate-950 rounded-xl cursor-pointer transform transition all duration-300 hover:scale-105 hover:shadow-2x1 max-w-3xs p-4"
      onClick={onClick}
    >
      <div className="relative">
        <div className="flex justify-center">
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                : `./no-movie.png`
            }
            alt="Movie Poster"
            className="w-full h-66 object-cover rounded-xs"
          ></img>
        </div>

        <button
          className="absolute bottom-1 right-1 z-20 text-white hover:text-red-400 transition-colors duration-300"
          onClick={handleLike}
        >
          <FaHeart className={liked ? "text-red-700" : "text-slate-300"} />
        </button>

        <div className="mt-4 text-center">
          <h2 className="text-lg  text-white">{title}</h2>

          <div className="flex items-center justify-center mt-2 space-x-2">
            <img
              src="star.svg"
              alt="Star Icon"
              className="w-3 h-auto mr-2"
            ></img>
            <p className="text-white mr-2">
              {vote_average ? (vote_average / 2).toFixed(1) : "N/A"}
            </p>
            <p className="text-gray-400">{original_language}</p>
            <p className="text-gray-400">{release_date}</p>

            {/* currently this API doesnt return a runtime for the movies, keeping this here anyway for if its added in the future  */}
            {/* <p className="text-gray-400">{runtime}</p> */}
          </div>

          <p className="text-gray-300 text-sm mt-3 absolute bottom-0 left-0 w-full bg-black bg-opacity-80 p-4 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            {overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
