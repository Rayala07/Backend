// Create and Config server

const express = require("express");
const postsModel = require("./models/posts.model");

const app = express();

app.use(express.json());

// API to create posts
app.post("/api/posts", async (req, res) => {
  const { post, caption } = req.body;

  const createPost = await postsModel.create({
    post,
    caption,
  });

  res.status(201).json({
    message: "Post created",
    createPost,
  });
});

// API to get posts
app.get("/api/posts", async (req, res) => {
  const getPosts = await postsModel.find();

  res.status(200).json({
    message: "Posts Fetch Success",
    getPosts,
  });
});


app.patch("/api/posts/:id", async (req, res) => {
    const id = req.params.id;
    const {caption} = req.body;

    await postsModel.findByIdAndUpdate(id, {caption});

    res.send(200).json({
        message:"Patch Success",
    })
})

module.exports = app;
