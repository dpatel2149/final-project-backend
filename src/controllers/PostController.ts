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
    const { id } = req.params;
    const { title, content } = req.body;

    console.log("Updating post with id:", id);
    console.log("Request body:", req.body);

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
