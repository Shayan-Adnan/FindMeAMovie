const express = require("express");
const passport = require("../config/passport-auth");
const { CLIENT_URL } = require("../config/config");
const authController = require("../controllers/authController");
const { verifyJwt } = require("../middleware/verifyJwt");

const router = express.Router();

router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    session: false,
    failureRedirect: CLIENT_URL,
  }),
  authController.login
);

router.get("/getUser", verifyJwt, authController.getUser);

router.get("/logout", authController.logout);

module.exports = router;
