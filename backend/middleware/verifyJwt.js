const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

const verifyJwt = (req, res, next) => {
  const token = req.cookies.findMeAMovieToken;

  if (!token) {
    req.user = null;
    next();
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log("An error occurred during JWT verification: ", error);
    return res.status(403).json({ message: "Forbidden" });
  }
};

const getUserId = (req, res, next) => {
  try {
    const token = req.cookies.findMeAMovieToken;

    if (!token) {
      req.userId = null;
      next();
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("An error occurred during JWT verification: ", error);
    //return res.status(403).json({ message: "Forbidden" });
  }
};

module.exports = { verifyJwt, getUserId };
