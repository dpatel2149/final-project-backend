import { Request, Response } from "express";
import { PostModel } from "../models/PostModel";

export const createPost = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const post = await PostModel.create({ title, content });
  res.json(post);
};

export const getPosts = async (req: Request, res: Response) => {
  const posts = await PostModel.find();
  res.json(posts);
};
// GET API for posts working