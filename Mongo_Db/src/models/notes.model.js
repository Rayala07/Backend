// Call mongoose
const mongoose = require("mongoose");

// Create db schema
const noteSchema = new mongoose.Schema({
  title: String,
  description: String,
});

// Create model of notes-schema which is a collection to store notes data
const noteModel = mongoose.model("notes", noteSchema);

module.exports = noteModel;
