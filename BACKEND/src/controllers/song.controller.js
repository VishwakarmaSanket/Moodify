const songModel = require("../models/song.model");
const storageService = require("../services/storage.service");
const id3 = require("node-id3");

async function uploadSong(req, res) {
  try {
    // ✅ 1. Check file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const songBuffer = req.file.buffer;
    const { mood } = req.body;

    // ✅ 2. Read ID3 safely
    const tags = id3.read(songBuffer);

    const title = tags.title || `song-${Date.now()}`;
    const imageBuffer = tags.image?.imageBuffer;

    // ✅ 3. Upload song first
    const songFile = await storageService.uploadFile({
      buffer: songBuffer,
      filename: `${title}.mp3`,
      folder: "Cohort2/Moodify/Songs",
    });

    // ✅ 4. Upload poster ONLY if exists
    let posterURL = null;

    if (imageBuffer) {
      const posterFile = await storageService.uploadFile({
        buffer: imageBuffer,
        filename: `${title}.jpeg`,
        folder: "Cohort2/Moodify/Posters",
      });

      posterURL = posterFile.url;
    }

    // ✅ 5. Save in DB
    const song = await songModel.create({
      URL: songFile.url,
      posterURL: posterURL,
      title: title,
      mood: mood,
    });

    res.status(201).json({
      success: true,
      message: "Song uploaded successfully",
      song,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

async function getSongs(req, res) {
  const mood = req.query.song;

  // Changed findOne → find so we return ALL songs matching the mood
  const songs = await songModel.find({ mood });

  res.status(200).json({
    success: true,
    message: "Songs fetched successfully",
    data: songs, // now an array
  });
}

module.exports = { uploadSong, getSongs };
