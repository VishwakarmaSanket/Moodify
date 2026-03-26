const express = require("express");
const Router = express.Router();
const upload = require("../middlewares/upload.middleware");
const { uploadSong, getSongs } = require("../controllers/song.controller");

Router.post("/", upload.single("song"), uploadSong);

Router.get("/", getSongs);

module.exports = Router;
