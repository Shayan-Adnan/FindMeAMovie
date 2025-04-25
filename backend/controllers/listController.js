const User = require("../models/user");

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

const getList = async (req, res) => {
  try {
    const { listId, userId } = req.params;
    const user = await User.findOne({ userId });

    const list = user.lists.find((list) => list._id == listId);

    if (!list) {
      return res
        .status(404)
        .json({ success: false, message: "List not found" });
    }

    res.status(200).json({ success: true, list });
  } catch (error) {
    console.log("Error getting list: ", error);
    res.status(500).json({ success: false });
  }
};

const getListNames = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findOne({ userId });

    const { lists } = user;

    if (!lists) {
      return res.status(404).json([]);
    }

    return res.status(200).json({ lists });
  } catch (error) {
    console.log(error);
    return res.status(500).json({});
  }
};

module.exports = { createList, getList, getListNames };
