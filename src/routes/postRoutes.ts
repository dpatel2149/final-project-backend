import express from "express";
import { createPost, getPosts, updatePost } from "../controllers/PostController";

const router = express.Router();

router.post("/", createPost);
router.get("/", getPosts);
router.put("/:id", updatePost);

export default router;
