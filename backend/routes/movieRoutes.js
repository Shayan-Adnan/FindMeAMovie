const express = require("express");
const { getUserId } = require("../middleware/verifyJwt");
const User = require("../models/user");
const movieController = require("../controllers/movieController");
const router = express.Router();

router.post("/likeMovie/:id", getUserId, movieController.likeMovie);

router.delete("/unlikeMovie/:id", getUserId, movieController.unlikeMovie);

router.get("/isMovieLiked/:id", getUserId, movieController.isMovieLiked);

router.get("/getLikedMovies", getUserId, movieController.getLikedMovies);

module.exports = router;
