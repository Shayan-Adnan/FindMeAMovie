const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

const verifyJwt = (req, res, next) => {
  const token = req.cookies.findMeAMovieToken;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized! No token present in cookies." });
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

module.exports = verifyJwt;
