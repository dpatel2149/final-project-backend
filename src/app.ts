import express, { Request, Response } from "express";
import postRoutes from "./routes/postRoutes";
import authRoutes from "./routes/authRoutes";

export const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server running");
});

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
