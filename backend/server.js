const express = require("express");
const passport = require("./config/passport-auth");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDatabase = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoutes");
const listRoutes = require("./routes/listRoutes");
const { PORT, BASE_URL, CLIENT_URL } = require("./config/config");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use("/auth", authRoutes);
app.use("/movie", movieRoutes);
app.use("/user", userRoutes);
app.use("/list", listRoutes);

connectDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
