import express, { Request, Response } from "express";
import postRoutes from "./routes/postRoutes";

export const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server running");
});

app.use("/api/posts", postRoutes);