import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import { IoIosReturnLeft } from "react-icons/io";

import ErrorMessageContainer from "../components/ErrorMessageContainer";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedOptions, previousPage, searchBarQuery } = location.state;

  const [movieList, setMovieList] = useState([]);
  const [currentPage, setCurrentPage] = useState(previousPage || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [usersLikedMovies, setUsersLikedMovies] = useState([]);

  const getUsersLikedMovies = async () => {
    try {
      const response = await axios.get("/movie/getLikedMovies", {
        withCredentials: true,
      });

      const { success, likedMovies } = response.data;
      if (success) {
        setUsersLikedMovies(likedMovies);
      }
    } catch (error) {
      console.error(
        "Error getting users liked movies in Results page: ",
        error
      );
    }
  };

  const fetchMovies = async (
    selectedOptionsParam,
    currentPageParam,
    searchBarQueryParam
  ) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post("/movie/discoverMovies", {
        selectedOptions: selectedOptionsParam,
        currentPage: currentPageParam,
        searchBarQuery: searchBarQueryParam,
      });

      const { results, total_pages } = response.data;

      setMovieList(results || []);
      setTotalPages(total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setErrorMessage("Error fetching movies. Please try again later.");
      setMovieList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      const nextPageNumber = currentPage + 1;
      setCurrentPage(nextPageNumber);
      fetchMovies(selectedOptions, nextPageNumber, searchBarQuery);
      window.scrollTo(0, 0);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      const prevPageNumber = currentPage - 1;
      setCurrentPage(prevPageNumber);
      fetchMovies(selectedOptions, prevPageNumber, searchBarQuery);
      window.scrollTo(0, 0);
    }
  };

  const loadMoviePage = (movie) => {
    navigate(`/movie/${movie.id}`, {
      state: {
        from: "results",
        selectedOptions,
        previousPage: currentPage,
        searchBarQuery,
      },
    });
  };

  const returnHome = () => {
    navigate("/");
  };

  useEffect(() => {
    if (!location.state) return;

    const { selectedOptions, previousPage, searchBarQuery } = location.state;

    setCurrentPage(previousPage || 1);
    fetchMovies(selectedOptions, previousPage || 1, searchBarQuery);
    getUsersLikedMovies();
    window.scrollTo(0, 0);
  }, [location.state]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-950 to-slate-900 text-white px-6 py-12 shadow-lg space-y-6">
      <div className="flex">
        <button
          className="cursor-pointer pr-5 flex items-center"
          onClick={returnHome}
        >
          {/* <img src="left-arrow.png" className="w-5 h-auto" /> */}
          <IoIosReturnLeft className="w-5 h-auto text-blue-300" />
        </button>
        <h1 className="font-dm-sans font-bold uppercase text-3xl md:text-4xl tracking-wide bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          Results
        </h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {isLoading ? (
          <span className="flex justify-center">
            <Spinner />
          </span>
        ) : errorMessage ? (
          <ErrorMessageContainer errorMessage={errorMessage} />
        ) : (
          movieList.map((movie) => (
            <Card
              key={movie.id}
              movie={movie}
              usersLikedMovies={usersLikedMovies}
              onClick={() => {
                loadMoviePage(movie);
              }}
            />
          ))
        )}
      </div>
      <div className="pagination flex items-center  justify-center space-x-4 mt-8">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`font-bebas-neue w-25 h-12 text-2xl px-4 py-2 rounded-lg transition ${
            currentPage === 1
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-900 to-cyan-600 text-white hover:from-indigo-800 hover:to-cyan-500"
          }`}
        >
          Previous
        </button>
        <span className="p-5 font-bebas-neue text-xl text-gray-300 mt-2">
          Page{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
            {currentPage}
          </span>{" "}
          of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="font-bebas-neue w-25 h-12 text-2xl px-4 py-2 bg-gradient-to-r from-indigo-900 to-cyan-600 text-white rounded-lg hover:from-indigo-800 hover:to-cyan-500  disabled:bg-gray-600 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Results;
