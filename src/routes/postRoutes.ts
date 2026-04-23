import express from "express";
import { createPost, getPosts, updatePost, deletePost, likePost } from "../controllers/PostController";

const router = express.Router();

router.post("/", createPost);
router.get("/", getPosts);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.post("/:id/like", likePost);

export default router;
