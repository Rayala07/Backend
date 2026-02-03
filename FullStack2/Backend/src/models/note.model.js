const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  title: String,
  description: String,
});

const notesModel = mongoose.model("Notes", noteSchema);

module.exports = notesModel;
