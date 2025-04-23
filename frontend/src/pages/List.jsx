import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

const MOVIES_PER_PAGE = 25;

const List = ({ likedMovies = false }) => {
  const [user, setUser] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState(null);
  const { userId, listId } = useParams();
  const navigate = useNavigate();

  const loadMoviePage = (id) => {
    navigate(`/movie/${id}`, { state: { from: "profile", userId } });
  };

  const getList = async () => {
    try {
      if (likedMovies) {
        //if on the likedmovies page, load the liked movies
        const res = await axios.get(`/movie/getLikedMoviesFromId/${userId}`);
        const { likedMovies } = res.data;
        const response = await axios.post(`/movie/getMovies`, { likedMovies });
        const list = {
          movies: response.data.likedMoviesData.map((movie) => ({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
          })),
        };

        setList(list);
      } else {
        const response = await axios.get(`/list/getList/${userId}/${listId}`);
        setList(response.data.list);
      }
    } catch (error) {
      console.error("Error fetching list:", error);
    }
  };

  const getUserData = async () => {
    try {
      const response = await axios.get(`/user/getUserProfile/${userId}`);
      const data = response.data;

      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    getUserData();
    getList();
  }, [userId, listId]);

  if (!list || !user) {
    return (
      <div className="h-screen bg-gradient-to-r from-slate-950 to-slate-900 text-center text-2xl">
        <Spinner />
      </div>
    );
  }

  const totalPages = Math.ceil(list.movies.length / MOVIES_PER_PAGE);
  const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;
  const endIndex = startIndex + MOVIES_PER_PAGE;
  const pagesToShow = 5;
  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));

  const pageNumbers = Array.from(
    { length: Math.min(pagesToShow, totalPages - startPage + 1) },
    (_, i) => startPage + i
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-slate-950 to-slate-900 text-white font-bebas-neue">
      <div className="max-w-6xl mx-auto pt-8 px-4 w-full flex-grow">
        <ProfileHeader user={user} />
        <div className="mt-6 font-bebas-neue w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl mb-6 text-start">
            {!likedMovies ? list.title || "List" : "Liked Movies"}
          </h2>

          <p className="text-gray-400 break-words whitespace-pre-wrap w-full">
            {list.description}
          </p>

          {/*  movies images styling start */}
          <div className="mt-5 grid grid-cols-3 md:grid-cols-5 gap-4">
            {list.movies.slice(startIndex, endIndex).map((movie, index) => (
              <div
                key={movie.id}
                className="text-center"
                onClick={() => loadMoviePage(movie.id)}
              >
                <div className="relative group">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={`${movie.title}`}
                    className="w-full h-[300px] object-cover rounded border border-zinc-800 hover:border-2 hover:border-blue-500 transition-all duration-200 cursor-pointer"
                  />
                </div>
                <div className="mt-1 text-sm text-zinc-300 font-medium">
                  {startIndex + index + 1} - {movie.title}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Buttons Start */}
          <div className="mt-10 mb-10 flex justify-center items-center gap-2 flex-wrap">
            <button
              onClick={() => goToPage(currentPage - 1)}
              className="w-25 h-12 text-2xl px-4 py-2 rounded-lg transition bg-gradient-to-r from-indigo-900 to-cyan-600 text-white hover:from-indigo-800 hover:to-cyan-500"
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {pageNumbers.map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-2.5 py-1 rounded text-lg ${
                  currentPage === page
                    ? "bg-white-500 text-white"
                    : "bg-zinc-700 hover:bg-zinc-600 text-white"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              className="w-25 h-12 text-2xl px-4 py-2 bg-gradient-to-r from-indigo-900 to-cyan-600 text-white rounded-lg hover:from-indigo-800 hover:to-cyan-500 disabled:bg-gray-600 transition"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
