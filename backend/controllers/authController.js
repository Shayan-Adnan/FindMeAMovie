const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, CLIENT_URL } = require("../config/config");

const login = async (req, res) => {
  try {
    //the passport.js redirect function is giving us these values
    const { id: userId, email, name, avatar } = req.user;

    const existingUser = await User.findOne({
      userId,
    });

    if (!existingUser) {
      await User.create({ userId, email, name, avatar });
    }

    const token = jwt.sign({ userId }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("findMeAMovieToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.redirect(CLIENT_URL);
  } catch (error) {
    res.status(500).json({ message: "Unable to login user" });
    console.log("Unable to login user: ", error);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("findMeAMovieToken");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to clear token from cookies" }, error);
    console.log(error);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.user.userId });
    const { userId, name, avatar, numberOfLikedMovies, likedMovies, lists } =
      user;

    res.json({ userId, name, avatar, numberOfLikedMovies, likedMovies, lists });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { getUser, logout, login };
