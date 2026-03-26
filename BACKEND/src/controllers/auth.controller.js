const mongoose = require("mongoose");
const userModel = require("../models/user.model");
const blacklistModel = require("../models/blacklist.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const redis = require("../config/cache");

// Register handler can accept either username or email for registration
async function registerHandler(req, res) {
  const { username, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      success: false,
      message:
        "User with the same username or email already exists , try with different username or email or login instead.",
    });
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "3d",
    },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    token: token,
    user,
  });
}

// Login handler can accept either username or email for login
async function loginHandler(req, res) {
  const { username, email, password } = req.body;

  // Check if user exists with the given email or username
  // and also select the password field which is not selected by default in the user model
  const user = await userModel
    .findOne({
      $or: [{ email }, { username }],
    })
    .select("+password");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "3d",
    },
  );

  res.cookie("token", token);

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user,
  });
}

// this handler clears the token cookie to log out the user
// but anyone can make misuse of it if he/she gets the token of the user and can log out the user without his/her consent,
// so we can also add a blacklist of tokens to prevent this kind of misuse
async function logoutHandler(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Token not found",
    });
  }
  // Add the token to the blacklist
  await blacklistModel.create({ token });
  res.clearCookie("token");

  await redis.set(token, Date.now().toString(), "EX", 3 * 24 * 60 * 60); // Set expiration time to 3 days (in seconds)
  // Set the token in Redis with an expiration time of 3 days
  // stores data in the form of key-value pairs and allows you to set an expiration time for each key, after which the key will be automatically deleted from the cache.
  // In this case, the token is stored as a key with the current timestamp as its value, and it will expire after 3 days (in seconds). This way, we can efficiently manage the blacklist of tokens and ensure that they are automatically removed after their expiration time.

  res.status(201).json({
    success: true,
    message: "User logged out successfully ✅",
  });
}

// Get me handler to get the details of the logged in user
async function getMeHandler(req, res) {
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    success: true,
    message: "User fetched successfully",
    user,
  });
}

module.exports = {
  registerHandler,
  loginHandler,
  getMeHandler,
  logoutHandler,
};
