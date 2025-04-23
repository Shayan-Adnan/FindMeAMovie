const User = require("../models/user");

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({ userId });

    if (user) {
      res.status(200).json({ success: true, user });
    }
  } catch (error) {
    res.status(500).json({ success: false });
    console.error("Error getting user profile: ", error);
  }
};

const createList = async (req, res) => {
  try {
    const { title, description, selectedMovies } = req.body;
    const userId = req.userId;
    const cleanedMovies = selectedMovies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
    }));

    const newList = {
      title,
      description,
      movies: cleanedMovies,
    };

    const updatedUser = await User.findOneAndUpdate(
      { userId },
      {
        $push: { lists: { $each: [newList], $position: 0 } },
        $inc: { numberOfLists: 1 },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json();
  } catch (err) {
    console.error("Error creating list:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUserProfile, createList };
