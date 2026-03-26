const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "User ID is required"],
  },
  mood: {
    type: String,
    enum: {
      values: ["sad", "happy", "surprised", "neutral", "calm", "energetic", "angry"],
      message: "{VALUE} is not a valid mood",
    },
    required: [true, "Mood is required"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const moodModel = mongoose.model("mood", moodSchema);

module.exports = moodModel;
