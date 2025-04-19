const express = require("express");
const passport = require("./config/passport-auth");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDatabase = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const { PORT, BASE_URL, CLIENT_URL } = require("./config/config");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: BASE_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use("/auth", authRoutes);

connectDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
