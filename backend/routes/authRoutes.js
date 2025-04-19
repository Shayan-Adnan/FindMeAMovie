const express = require("express");
const passport = require("../config/passport-auth");
const jwt = require("jsonwebtoken");
const { CLIENT_URL, JWT_SECRET } = require("../config/config");
const User = require("../models/user");
const verifyJwt = require("../middleware/verifyJwt");

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
  async (req, res) => {
    const { id: userId, email, displayName: name, avatar } = req.user;

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
  }
);

module.exports = router;
