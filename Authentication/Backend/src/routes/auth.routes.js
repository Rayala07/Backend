const express = require("express");
const userModel = require("../../src/models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// When you want to create api in any other file other than app.js then you have to use this express.Router(); function to build routes in individual files
const authRouter = express.Router();

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

module.exports = authRouter;
