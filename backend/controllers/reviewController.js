const Review = require("../models/review");
const saveReview = async (req, res) => {
  try {
    const { userId, userName, userAvatar, movieId, reviewText } = req.body;

    const existingReview = await Review.findOne({ movieId, userId });
    if (existingReview) {
      return res.status(400).json({ success: false, alreadyReviewed: true });
    }

    const newReview = await Review.create({
      userId,
      userName,
      userAvatar,
      movieId,
      reviewText,
    });

    if (newReview) {
      res.status(200).json({ success: true, review: newReview });
    }
  } catch (error) {
    console.log("Error saving review", error);
    res.status(500).json({ success: false });
  }
};

const getReviews = async (req, res) => {
  try {
    const { movieId } = req.query;
    const { userId } = req;

    if (!movieId) {
      return res
        .status(400)
        .json({ success: false, message: "movieId is required" });
    }

    const reviews = await Review.find({ movieId }).sort({ createdAt: -1 });

    const reviewsWithFlags = reviews.map((review) => ({
      ...review.toObject(),
      likedByCurrentUser: userId ? review.likedBy.includes(userId) : false,
    }));

    res.status(200).json({ success: true, reviews: reviewsWithFlags });
  } catch (error) {
    console.log("Error fetching reviews", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const likeReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;

    if (!userId) {
      return res
        .status(200)
        .json({ success: false, message: "User not logged in." });
    }

    const review = await Review.findById(id);
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }

    const hasAlreadyLiked = review.likedBy.includes(userId);

    if (hasAlreadyLiked) {
      // UNLIKE
      updatedReview = await Review.findByIdAndUpdate(
        id,
        {
          $inc: { likeCount: -1 },
          $pull: { likedBy: userId },
        },
        { new: true }
      );
    } else {
      // LIKE
      updatedReview = await Review.findByIdAndUpdate(
        id,
        {
          $inc: { likeCount: 1 },
          $addToSet: { likedBy: userId },
        },
        { new: true }
      );
    }

    return res.status(200).json({
      success: true,
      liked: !hasAlreadyLiked,
      likeCount: updatedReview.likeCount,
    });
  } catch (error) {
    console.log("Error liking review: ", error);
    res.status(500).json({ success: false });
  }
};

module.exports = { saveReview, getReviews, likeReview };
