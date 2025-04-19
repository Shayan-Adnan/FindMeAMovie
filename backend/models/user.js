const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  userId: String,
  email: String,
  name: String,
  avatar: String,
  likedMovies: [String],
  lists: [
    {
      title: String,
      description: String,
      movies: [String],
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
