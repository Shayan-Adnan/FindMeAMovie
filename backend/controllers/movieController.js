const User = require("../models/user");
const { TMDB_API_KEY } = require("../config/config");
const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
};
const axios = require("axios");
const { fetchRandomMovie } = require("../services/movieService");

const likeMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    await User.findOneAndUpdate(
      { userId: req.userId },
      { $addToSet: { likedMovies: movieId }, $inc: { numberOfLikedMovies: 1 } },
      { new: true }
    );
    res.status(200).json({ message: "Added movie to user's Liked Movies" });
  } catch (error) {
    console.log("Error occurred: ", error);
    res.status(400).json({ message: "Unable to add movie to Liked Movies" });
  }
};

const unlikeMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    await User.findOneAndUpdate(
      { userId: req.userId },
      { $pull: { likedMovies: movieId }, $inc: { numberOfLikedMovies: -1 } }
    );
    res.status(200).json({ message: "Removed movie from user's Liked Movies" });
  } catch (error) {
    console.log("Error occurred: ", error);
    res
      .status(400)
      .json({ message: "Unable to remove movie from Liked Movies" });
  }
};

const isMovieLiked = async (req, res) => {
  try {
    const movieId = req.params.id;
    const user = await User.findOne({ userId: req.userId });

    if (user.likedMovies.includes(movieId)) {
      res.status(200).json({ success: true, liked: true });
    } else {
      res.status(200).json({ success: false, liked: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to check liked status of movie." });
  }
};

const getLikedMovies = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.userId });
    const { likedMovies } = user;

    res.status(200).json({ success: true, likedMovies });
  } catch (error) {
    console.error("Error getting liked movies", error);
    res
      .status(500)
      .json({ success: false, message: "Error getting liked movies" });
  }
};

const getLikedMoviesFromId = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ userId });
    const { likedMovies } = user;

    res.status(200).json({ success: true, likedMovies });
  } catch (error) {
    console.error("Error getting liked movies", error);
    res
      .status(500)
      .json({ success: false, message: "Error getting liked movies" });
  }
};

const getMovies = async (req, res) => {
  try {
    const { likedMovies } = req.body;

    const likedMoviesData = await Promise.all(
      likedMovies.map(async (id) => {
        const endpoint = `${TMDB_API_BASE_URL}/movie/${id}`;
        const response = await fetch(endpoint, API_OPTIONS);

        if (!response.ok) {
          console.log("Error getting movies: ", error);
          throw new Error("Error getting movie.");
        }

        const data = await response.json();
        return data;
      })
    );

    res.status(200).json({ success: true, likedMoviesData });
  } catch (error) {
    console.log("Error getting movies: ", error);
    res.status(500).json({ success: false, message: "Error getting movies." });
  }
};

const searchMovies = async (req, res) => {
  try {
    const { debouncedQuery } = req.query;
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${debouncedQuery}`,
      API_OPTIONS
    );

    if (!response.ok) {
      console.log("Error searching for movies: ", error);
      throw new Error("Error searching for movie.");
    }

    const movies = await response.json();
    res.status(200).json({ success: true, movies });
  } catch (error) {
    res.status(500).json({ success: false });
    console.log("Error searching for movies ", error);
  }
};

const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `${TMDB_API_BASE_URL}/movie/${id}`,
      API_OPTIONS
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Failed to fetch movie details" });
  }
};

const getTrailer = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `${TMDB_API_BASE_URL}/movie/${id}/videos?language=en-US`,
      API_OPTIONS
    );
    const trailer = response.data.results.find(
      (video) => video.type === "Trailer"
    );
    res.json({ trailerKey: trailer ? trailer.key : null });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Failed to fetch trailer" });
  }
};

const getCredits = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `${TMDB_API_BASE_URL}/movie/${id}/credits?language=en-US`,
      API_OPTIONS
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch credits" });
  }
};

const getProviders = async (req, res) => {
  try {
    const { id } = req.params;
    const region = req.query.region || "US";
    const response = await axios.get(
      `${TMDB_API_BASE_URL}/movie/${id}/watch/providers`,
      API_OPTIONS
    );
    const results = response.data.results[region] || {};
    const buy = results.buy || [];
    const rent = results.rent || [];

    //using a set allows for prevention of duplicates
    const uniqueProviders = [
      ...new Set([
        ...buy.map((p) => p.provider_name.replace(/\s/g, "-")),
        ...rent.map((p) => p.provider_name.replace(/\s/g, "-")),
      ]),
    ];

    res.json(response.data);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Failed to fetch providers" });
  }
};

const discoverMovies = async (req, res) => {
  try {
    const { selectedOptions, currentPage, searchBarQuery } = req.body;

    let endpoint = "";

    if (searchBarQuery) {
      endpoint = `${TMDB_API_BASE_URL}/search/movie?query=${encodeURIComponent(
        searchBarQuery
      )}&page=${currentPage}`;
    } else {
      let genreIds = selectedOptions.Genres.join("|");
      let minimumDate = selectedOptions.Eras[0].start;
      let maximumDate = selectedOptions.Eras[0].end;

      selectedOptions.Eras.forEach((era) => {
        if (era.start < minimumDate) minimumDate = era.start;
        if (era.end > maximumDate) maximumDate = era.end;
      });

      let languages = selectedOptions.Languages.join("|");
      let runtime = Math.max(...selectedOptions.Runtime);

      const queryParams = new URLSearchParams({
        with_genres: genreIds,
        "primary_release_date.gte": minimumDate,
        "primary_release_date.lte": maximumDate,
        with_original_language: languages,
        include_adult: false,
        "with_runtime.lte": runtime,
        without_genres: 10749, // no romance
        sort_by: "popularity.desc",
        page: currentPage,
      });

      endpoint = `${TMDB_API_BASE_URL}/discover/movie?${queryParams}`;
    }

    const tmdbResponse = await fetch(endpoint, API_OPTIONS);
    const data = await tmdbResponse.json();

    res.json({
      results: data.results,
      total_pages: data.total_pages,
    });
  } catch (error) {
    console.error("Error in discoverMovies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getRandomMovie = async (req, res) => {
  try {
    const response = await axios.get(
      `${TMDB_API_BASE_URL}/movie/latest`,
      API_OPTIONS
    );
    const latestMovieId = response.data.id;

    const movie = await fetchRandomMovie(latestMovieId);
    if (!movie) {
      return res.status(404).json({ message: "No valid movie found." });
    }
    res.status(200).json({ movie });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting random movie!" });
  }
};

module.exports = {
  likeMovie,
  unlikeMovie,
  isMovieLiked,
  getLikedMovies,
  getMovies,
  searchMovies,
  getLikedMoviesFromId,
  getMovieDetails,
  getProviders,
  getTrailer,
  getCredits,
  discoverMovies,
  getRandomMovie,
};
