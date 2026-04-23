import express, { Request, Response } from "express";
import postRoutes from "./routes/postRoutes";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";

export const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server running");
});

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
