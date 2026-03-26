const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  URL: {
    type: String,
    required: [true, "URL is required"],
  },
  posterURL: {
    type: String,
    required: [true, "Poster URL is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  mood: {
    type: String,
    enum: {
      values: ["sad", "happy", "surprised"],
      message: "Enum this is not valid",
    },
  },
});

const songModel = mongoose.mongoose.model("songs", songSchema);

module.exports = songModel;
