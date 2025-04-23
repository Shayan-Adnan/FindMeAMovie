const express = require("express");
const userController = require("../controllers/userController");
const { getUserId } = require("../middleware/verifyJwt");
const router = express.Router();

router.get("/getUserProfile/:userId", userController.getUserProfile);

router.post("/createList", getUserId, userController.createList);

module.exports = router;
