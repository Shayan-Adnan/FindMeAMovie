const express = require("express");
const listController = require("../controllers/listController");
const { getUserId } = require("../middleware/verifyJwt");

const router = express.Router();

router.get("/getList/:userId/:listId", listController.getList);

router.post("/createList", getUserId, listController.createList);

module.exports = router;
