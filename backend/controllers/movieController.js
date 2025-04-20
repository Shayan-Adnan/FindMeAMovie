const User = require("../models/user");

const likeMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    await User.findOneAndUpdate(
      { userId: req.userId },
      { $addToSet: { likedMovies: movieId } },
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
      { $pull: { likedMovies: movieId } }
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

module.exports = { likeMovie, unlikeMovie, isMovieLiked, getLikedMovies };
