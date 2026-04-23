jest.mock("../src/models/UserModel", () => ({
  UserModel: {
    findOne: jest.fn(),
    create: jest.fn()
  }
}));

jest.mock("bcryptjs", () => ({
  hash: jest.fn(),
  compare: jest.fn()
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn()
}));

import { Request } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { login, register } from "../src/controllers/AuthController";
import { UserModel } from "../src/models/UserModel";
import { createMockResponse } from "./helpers";

describe("AuthController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = "test-secret";
  });

  describe("register", () => {
    it("creates a new user", async () => {
      const req = {
        body: { name: "Jeet", email: "jeet@example.com", password: "123456" }
      } as Request;
      const res = createMockResponse();

      (UserModel.findOne as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashed-password");
      (UserModel.create as jest.Mock).mockResolvedValue({
        _id: "1",
        name: "Jeet",
        email: "jeet@example.com",
        role: "user"
      });

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "User registered successfully"
        })
      );
    });

    it("rejects duplicate users", async () => {
      const req = {
        body: { name: "Jeet", email: "jeet@example.com", password: "123456" }
      } as Request;
      const res = createMockResponse();

      (UserModel.findOne as jest.Mock).mockResolvedValue({ email: "jeet@example.com" });

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "User already exists" });
    });

    it("handles register errors", async () => {
      const req = {
        body: { name: "Jeet", email: "jeet@example.com", password: "123456" }
      } as Request;
      const res = createMockResponse();

      (UserModel.findOne as jest.Mock).mockRejectedValue(new Error("db error"));

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Error registering user" });
    });
  });

  describe("login", () => {
    it("rejects missing users", async () => {
      const req = {
        body: { email: "jeet@example.com", password: "123456" }
      } as Request;
      const res = createMockResponse();

      (UserModel.findOne as jest.Mock).mockResolvedValue(null);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid email or password" });
    });

    it("rejects wrong passwords", async () => {
      const req = {
        body: { email: "jeet@example.com", password: "wrong" }
      } as Request;
      const res = createMockResponse();

      (UserModel.findOne as jest.Mock).mockResolvedValue({
        _id: "1",
        email: "jeet@example.com",
        password: "hashed-password",
        role: "user"
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid email or password" });
    });

    it("rejects missing JWT secret", async () => {
      const req = {
        body: { email: "jeet@example.com", password: "123456" }
      } as Request;
      const res = createMockResponse();

      delete process.env.JWT_SECRET;

      (UserModel.findOne as jest.Mock).mockResolvedValue({
        _id: "1",
        name: "Jeet",
        email: "jeet@example.com",
        password: "hashed-password",
        role: "user"
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "JWT secret is not configured" });
    });

    it("logs in successfully", async () => {
      const req = {
        body: { email: "jeet@example.com", password: "123456" }
      } as Request;
      const res = createMockResponse();

      (UserModel.findOne as jest.Mock).mockResolvedValue({
        _id: "1",
        name: "Jeet",
        email: "jeet@example.com",
        password: "hashed-password",
        role: "user"
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue("fake-token");

      await login(req, res);

      expect(jwt.sign).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Login successful",
          token: "fake-token"
        })
      );
    });

    it("handles login errors", async () => {
      const req = {
        body: { email: "jeet@example.com", password: "123456" }
      } as Request;
      const res = createMockResponse();

      (UserModel.findOne as jest.Mock).mockRejectedValue(new Error("db error"));

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Error logging in" });
    });
  });
});
