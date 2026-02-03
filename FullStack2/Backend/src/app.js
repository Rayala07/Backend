const express = require("express");
const notesModel = require("./models/note.model");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;

  const createNote = await notesModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "Post Success",
    createNote,
  });
});

app.get("/api/notes", async (req, res) => {
  const getNotes = await notesModel.find();

  res.status(200).json({
    message: "GET Success",
    getNotes,
  });
});

module.exports = app;
