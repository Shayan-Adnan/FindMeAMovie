const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: "User",
  },
  userName: {
    type: String,
    required: true,
  },
  userAvatar: {
    type: String,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
    index: true,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  likedBy: {
    type: [String],
    default: [],
  },
  reviewText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Review", ReviewSchema);
