import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import { PostModel } from "../models/PostModel";

export const getSystemStats = async (req: Request, res: Response) => {
  try {
    const totalUsers = await UserModel.countDocuments();
    const totalPosts = await PostModel.countDocuments();
    const adminUsers = await UserModel.countDocuments({ role: "admin" });
    const normalUsers = await UserModel.countDocuments({ role: "user" });

    res.status(200).json({
      message: "System statistics fetched successfully",
      stats: {
        totalUsers,
        totalPosts,
        adminUsers,
        normalUsers
      }
    });
  } catch (error) {
    console.log("Stats error:", error);
    res.status(500).json({ message: "Error fetching system statistics" });
  }
};

export const deleteAnyPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedPost = await PostModel.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({
      message: "Post deleted successfully by admin",
      post: deletedPost
    });
  } catch (error) {
    console.log("Admin delete post error:", error);
    res.status(500).json({ message: "Error deleting post" });
  }
};
