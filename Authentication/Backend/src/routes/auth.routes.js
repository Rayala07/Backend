const express = require("express");
const userModel = require("../../src/models/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();

// When you want to create api in any other file other than app.js then you have to use this express.Router(); function to build routes in individual files
const authRouter = express.Router();

// Register User and Generate a Token.
authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    return res.status(409).json({
      message: "email already exists",
    });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex");

  const user = await userModel.create({ name, email, password: hash });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "User create success",
    user,
    token,
  });
});

// Login API when user gets timeout / wants to access profile in another device
// So he needs to login using his credentials and get a token for that.
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email",
    });
  }

  const isValidPassword =
    user.password === crypto.createHash("md5").update(password).digest("hex");

  if (!isValidPassword) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "Login Success",
    user,
    token,
  });
});

authRouter.post("/logout", (req, res) => {
  res.clearCookie("jwt_token");

  res.status(200).json({
    message: "Logout Success",
  });
});

module.exports = authRouter;