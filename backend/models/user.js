const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  userId: String,
  email: String,
  name: String,
  avatar: String,
  numberOfLikedMovies: { type: Number, default: 0 },
  likedMovies: [String],
  numberOfLists: { type: Number, default: 0 },
  lists: [
    {
      title: String,
      description: String,
      movies: [{ id: String, title: String, poster_path: String }],
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
