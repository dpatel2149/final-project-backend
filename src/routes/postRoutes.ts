import express from "express";
import { createPost, getPosts, updatePost, deletePost, likePost, addComment, getComments } from "../controllers/PostController";

const router = express.Router();

router.post("/", createPost);
router.get("/", getPosts);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.post("/:id/like", likePost);
router.post("/:id/comments", addComment);
router.get("/:id/comments", getComments);

export default router;
