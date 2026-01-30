const express = require("express");
const noteModel = require("../src/models/notes.model");

const app = express();

app.use(express.json());

app.post("/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "Note created",
    note,
  });
});

app.get("/getnotes", async (req, res) => {
  const getNotes = await noteModel.find();
  res.send(getNotes);
});

module.exports = app;
