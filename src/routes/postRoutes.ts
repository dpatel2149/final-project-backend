import express from "express";
import { createPost, getPosts } from "../controllers/PostController";

const router = express.Router();

router.post("/", createPost);
router.get("/", getPosts);

export default router;
