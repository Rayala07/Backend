const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  post: String,
  caption: String,
});

const postsModel = mongoose.model("posts", postSchema);

module.exports = postsModel;