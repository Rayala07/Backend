const express = require("express");
const notesModel = require("./models/note.model");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("./public"))

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

app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  await notesModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Delete Success",
  });
});

app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const note = await notesModel.findById(id);

  if (req.body.title) note.title = req.body.title;
  if (req.body.description) note.description = req.body.description;

  await note.save();

  res.status(200).json({
    message: "Patch success",
    note,
  });
});

module.exports = app;
