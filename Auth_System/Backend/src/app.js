const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("../src/routes/auth.routes");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static("public"));

app.use("/api/auth", authRouter);

module.exports = app;
