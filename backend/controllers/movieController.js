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

module.exports = {
  likeMovie,
  unlikeMovie,
  isMovieLiked,
  getLikedMovies,
  getMovies,
  searchMovies,
  getLikedMoviesFromId,
};
