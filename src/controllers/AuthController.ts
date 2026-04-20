import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import bcrypt from "bcryptjs";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role: "user"
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });
  } catch (error) {
    console.log("Register error:", error);
    res.status(500).json({ message: "Error registering user" });
  }
};
