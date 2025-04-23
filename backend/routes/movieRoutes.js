const express = require("express");
const { getUserId } = require("../middleware/verifyJwt");
const movieController = require("../controllers/movieController");
const router = express.Router();

router.post("/likeMovie/:id", getUserId, movieController.likeMovie);

router.delete("/unlikeMovie/:id", getUserId, movieController.unlikeMovie);

router.get("/isMovieLiked/:id", getUserId, movieController.isMovieLiked);

router.get("/getLikedMovies", getUserId, movieController.getLikedMovies);

router.get(
  "/getLikedMoviesFromId/:userId",
  movieController.getLikedMoviesFromId
);

router.post("/getMovies", movieController.getMovies);

router.get("/searchMovies", movieController.searchMovies);

module.exports = router;
