import React from "react";
import { useState, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import ErrorMessageContainer from "../components/ErrorMessageContainer";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedOptions, previousPage, searchBarQuery } = location.state;
  const [movieList, setMovieList] = useState([]);
  const [currentPage, setCurrentPage] = useState(previousPage || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const buildTMDBQuery = () => {
    if (searchBarQuery) {
      return `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
        searchBarQuery
      )}&page=${currentPage}`;
    }

    let genreIds = "";
    let minimumDate = selectedOptions.Eras[0].start;
    let maximumDate = selectedOptions.Eras[0].end;
    let languages = "";
    let runtime = "";

    selectedOptions.Genres.forEach((genre, index) => {
      genreIds += (index === 0 ? "" : "|") + genre;
    });

    selectedOptions.Eras.forEach((era, index) => {
      if (era.start < minimumDate) {
        minimumDate = era.start;
      }
      if (era.end > maximumDate) {
        maximumDate = era.end;
      }
    });

    selectedOptions.Languages.forEach((lang, index) => {
      languages += (index === 0 ? "" : "|") + lang;
    });

    runtime = Math.max(...selectedOptions.Runtime);

    const queryParams = new URLSearchParams({
      with_genres: genreIds,
      "primary_release_date.gte": minimumDate,
      "primary_release_date.lte": maximumDate,
      with_original_language: languages,
      include_adult: false,
      "with_runtime.lte": runtime,
      without_genres: 10749,
      sort_by: "popularity.desc",
      page: currentPage,
    });

    return `${API_BASE_URL}/discover/movie?${queryParams}`;
  };

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage("");

    const endpointURL = buildTMDBQuery();

    try {
      const response = await fetch(endpointURL, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies!");
      }

      const data = await response.json();

      if (data.Response === "False") {
        setErrorMessage("Error fetching movies. Please try again later.");
        setMovieList([]);
        return;
      }

      setTotalPages(data.total_pages);

      setMovieList(data.results || []);
    } catch (e) {
      console.log(e);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const loadMoviePage = (movie) => {
    navigate(`/movie/${movie.id}`, {
      state: { selectedOptions, previousPage: currentPage, searchBarQuery },
    });
  };

  const returnHome = () => {
    navigate("/");
  };

  useEffect(() => {
    fetchMovies();
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-950 to-slate-900 text-white px-6 py-12 shadow-lg space-y-6">
      <div className="flex">
        <button
          className="cursor-pointer pr-5 flex items-center"
          onClick={returnHome}
        >
          <img src="left-arrow.png" className="w-5 h-auto" />
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
