const express = require("express");
const {
  registerHandler,
  loginHandler,
  getMeHandler,
  logoutHandler,
} = require("../controllers/auth.controller");
const { authUser } = require("../middlewares/auth.middleware");
const Router = express.Router();

Router.post("/register", registerHandler);

Router.post("/login", loginHandler);

Router.get("/get-me", authUser, getMeHandler);

Router.get("/logout", logoutHandler);

module.exports = Router;
