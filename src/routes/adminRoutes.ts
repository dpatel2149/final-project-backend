import express from "express";
import { deleteAnyPost, getSystemStats } from "../controllers/AdminController";
import { verifyAdmin, verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/stats", verifyToken, verifyAdmin, getSystemStats);
router.delete("/posts/:id", verifyToken, verifyAdmin, deleteAnyPost);

export default router;
