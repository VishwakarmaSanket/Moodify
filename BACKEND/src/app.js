const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "https://moodify-frontend-pearl.vercel.app",
    credentials: true,
  }),
);
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

const songRoutes = require("./routes/song.routes");
app.use("/api/songs", songRoutes);

const moodRoutes = require("./routes/mood.routes");
app.use("/api/mood", moodRoutes);

module.exports = app;
