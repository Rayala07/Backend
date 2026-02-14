const userModel = require("../models/users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function registerUser(req, res) {
  const { username, email, password } = req.body;

  const isUserExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExists) {
    return res.status(409).json({
      message:
        isUserExists.username === username
          ? "username already exists"
          : "email already exists",
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
    },
    process.env.JWT_TOKEN,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

async function loginUser(req, res) {
  const { username, email, password } = req.body;

  const isUser = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!isUser) {
    return res.status(401).json({
      message: "User does not exist",
    });
  }

  const checkPassword = await bcrypt.compare(password, isUser.password);

  if (!checkPassword) {
    return res.status(409).json({
      message: "Incorrect Password",
    });
  }

  const token = jwt.sign(
    {
      id: isUser._id,
    },
    process.env.JWT_TOKEN,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "Login Success",
    user: {
      id: isUser._id,
      username: isUser.username,
    },
  });
}

async function logoutUser(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access",
    });
  }

  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_TOKEN);

    if (!decoded) {
      return res.status(401).json({
        message: "Unauthorized access",
      });
    }

    res.clearCookie("token");
    return res.status(200).json({
      message: "Logout Success",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
