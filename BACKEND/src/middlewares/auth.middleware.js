const userModel = require("../models/user.model");
const blacklistModel = require("../models/blacklist.model");
const jwt = require("jsonwebtoken");
const redis = require("../config/cache");

async function authUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token not found",
    });
  }

  const isTokenBlacklisted = await redis.get(token);
  if (isTokenBlacklisted) {
    return res.status(401).json({
      success: false,
      message: "Invalid token , token is already blacklisted",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
}

module.exports = { authUser };
