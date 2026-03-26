const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cookieParser());
app.use(express.json());

// Enable CORS for local development
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

// 🔹 API Routes
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

const songRoutes = require("./routes/song.routes");
app.use("/api/songs", songRoutes);

const moodRoutes = require("./routes/mood.routes");
app.use("/api/mood", moodRoutes);

// 🔹 Serve Static Frontend Files from BACKEND/public
// This assumes you copied the CONTENTS of the 'dist' folder into 'BACKEND/public'
const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

// 🔹 Catch-all route for SPA support
app.use((req, res) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(publicPath, "index.html"));
  }
});

module.exports = app;
