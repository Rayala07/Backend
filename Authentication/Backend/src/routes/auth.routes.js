const express = require("express");
const userModel = require("../../src/models/user.model");

// When you want to create api in any other file other than app.js then you have to use this express.Router(); function to build routes in individual files
const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const user = await userModel.create({ name, email, password });

  res.status(201).json({
    message: "User create success",
    user,
  });
});

module.exports = authRouter;
