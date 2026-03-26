const express = require("express");
const router = express.Router();
const { authUser } = require("../middlewares/auth.middleware");
const {
  getMoodStats,
  getMoodHistory,
  saveMood,
} = require("../controllers/mood.controller");

router.get("/stats", authUser, getMoodStats);
router.get("/history", authUser, getMoodHistory);
router.post("/save", authUser, saveMood);

module.exports = router;
