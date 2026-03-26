require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/database");
const path = require("path");
const express = require("express");

// Serve fonts
app.use("/type-font", express.static(path.join(process.cwd(), "type-font")));

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ✅`);
});
