import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
});

export const PostModel = mongoose.model("Post", PostSchema);
// Project structure organized