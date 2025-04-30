const axios = require("axios");
const { TMDB_API_KEY } = require("../config/config");
const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
};

const fetchRandomMovie = async (latestMovieId, attempts = 0) => {
  try {
    if (attempts >= 75) {
      return null;
    }

    const randomNumber = Math.floor(Math.random() * latestMovieId) + 1;

    const response = await axios.get(
      `${TMDB_API_BASE_URL}/movie/${randomNumber}`,
      API_OPTIONS
    );

    if (response.data.status_code === 34) {
      fetchRandomMovie(latestMovieId, attempts + 1);
    }

    let isOfBannedGenre = false;
    for (let i = 0; i < response.data.genres.length; i++) {
      if (response.data.genres[i].id === 10749) {
        isOfBannedGenre = true;
        break;
      }
    }

    if (
      response.data.adult === true ||
      isOfBannedGenre ||
      response.data.origin_country.some((country) =>
        ["JP", "KR", "CN"].includes(country)
      ) ||
      response.data.original_language != "en" ||
      response.data.popularity < 1
    ) {
      return fetchRandomMovie(latestMovieId, attempts + 1);
    }

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log(`Movie not found. Attempt: `, attempts);
      return fetchRandomMovie(latestMovieId, attempts + 1);
    }
  }
};

module.exports = { fetchRandomMovie };
