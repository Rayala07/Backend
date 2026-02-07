const express = require("express");
const userModel = require("../../src/models/user.model");
const jwt = require("jsonwebtoken");
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

  const user = await userModel.create({ name, email, password });

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

  const isValidPassword = user.password === password;

  if (!isValidPassword) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }

  res.status(201).json({
    message: "Login Success",
    user,
  });
});

module.exports = authRouter;
