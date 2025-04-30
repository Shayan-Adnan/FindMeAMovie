const express = require("express");
const { getUserId } = require("../middleware/verifyJwt");
const reviewController = require("../controllers/reviewController");
const router = express.Router();

router.post("/saveReview", getUserId, reviewController.saveReview);
router.get("/getReviews", getUserId, reviewController.getReviews);
router.post("/likeReview/:id", getUserId, reviewController.likeReview);

module.exports = router;
