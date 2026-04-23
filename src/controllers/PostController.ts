import { Request, Response } from "express";
import { PostModel } from "../models/PostModel";

// CREATE POST
export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;

    const newPost = await PostModel.create({
      title,
      content,
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.log("Create post error:", error);
    res.status(500).json({ message: "Error creating post" });
  }
};

// GET POSTS
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find();
    res.json(posts);
  } catch (error) {
    console.log("Get posts error:", error);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

// UPDATE POST
export const updatePost = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id).trim();
    const { title, content } = req.body;

    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(updatedPost);
  } catch (error) {
    console.log("Update post error:", error);
    res.status(500).json({ message: "Error updating post" });
  }
};

// DELETE POST
export const deletePost = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id).trim();

    const deletedPost = await PostModel.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log("Delete post error:", error);
    res.status(500).json({ message: "Error deleting post" });
  }
};
// LIKE POST
export const likePost = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id).trim();

    const post = await PostModel.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.likes = (post.likes || 0) + 1;
    await post.save();

    res.json({
      message: "Post liked successfully",
      likes: post.likes
    });
  } catch (error) {
    console.log("Like post error:", error);
    res.status(500).json({ message: "Error liking post" });
  }
};
