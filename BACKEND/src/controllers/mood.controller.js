const moodModel = require("../models/mood.model");
const userModel = require("../models/user.model");

async function saveMood(req, res) {
  try {
    const { mood } = req.body;
    const userID = req.user.id;

    const newMood = await moodModel.create({
      userID,
      mood,
    });

    res.status(201).json({
      success: true,
      message: "Mood saved successfully",
      newMood,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

async function getMoodHistory(req, res) {
  try {
    // Here we obtain userID form request
    // And then we search for the moods of the user with userID
    // Then we sort them in descending order of their dates
    // And then we limit them to 10
    const userID = req.user.id;
    const mood = await moodModel.find({ userID }).sort({ date: -1 }).limit(6);

    res.status(200).json({
      success: true,
      message: "Mood history fetched successfully",
      mood,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

async function getMoodStats(req, res) {
  try {
    const userID = req.user.id;

    const moods = await moodModel.find({ userID });
    const length = moods.length;
    if (length === 0) {
      return res.status(200).json({
        success: true,
        message: "No mood data",
        moodCounts: {},
      });
    }

    const moodCounts = {};

    // Here we store how many time each type of mood has appeared in moodCounts
    moods.forEach((entry) => {
      const mood = entry.mood;
      moodCounts[mood] = (moodCounts[mood] || 0) + 1;
    });

    // Here we replace each mood types value from count to percentage
    for (let mood in moodCounts) {
      moodCounts[mood] = Number(((moodCounts[mood] / length) * 100).toFixed(2));
    }

    res.status(200).json({
      success: true,
      message: "Mood stats fetched successfully",
      moodCounts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

module.exports = { saveMood, getMoodHistory, getMoodStats };
