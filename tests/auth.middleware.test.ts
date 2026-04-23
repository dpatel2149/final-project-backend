import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest, verifyAdmin, verifyToken } from "../src/middleware/authMiddleware";
import { createMockResponse } from "./helpers";

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn()
}));

describe("authMiddleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = "test-secret";
  });

  describe("verifyToken", () => {
    it("rejects missing auth header", () => {
      const req = { headers: {} } as AuthRequest;
      const res = createMockResponse() as Response;
      const next = jest.fn() as NextFunction;

      verifyToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(next).not.toHaveBeenCalled();
    });

    it("rejects missing JWT secret", () => {
      const req = { headers: { authorization: "Bearer token" } } as AuthRequest;
      const res = createMockResponse() as Response;
      const next = jest.fn() as NextFunction;
      delete process.env.JWT_SECRET;

      verifyToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
    });

    it("attaches decoded user and calls next", () => {
      const req = { headers: { authorization: "Bearer token" } } as AuthRequest;
      const res = createMockResponse() as Response;
      const next = jest.fn() as NextFunction;

      (jwt.verify as jest.Mock).mockReturnValue({ userId: "1", role: "admin" });

      verifyToken(req, res, next);

      expect(req.user).toEqual({ userId: "1", role: "admin" });
      expect(next).toHaveBeenCalled();
    });

    it("rejects invalid tokens", () => {
      const req = { headers: { authorization: "Bearer bad-token" } } as AuthRequest;
      const res = createMockResponse() as Response;
      const next = jest.fn() as NextFunction;

      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error("bad token");
      });

      verifyToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("verifyAdmin", () => {
    it("rejects non-admin users", () => {
      const req = { user: { userId: "1", role: "user" } } as AuthRequest;
      const res = createMockResponse() as Response;
      const next = jest.fn() as NextFunction;

      verifyAdmin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
    });

    it("allows admin users", () => {
      const req = { user: { userId: "1", role: "admin" } } as AuthRequest;
      const res = createMockResponse() as Response;
      const next = jest.fn() as NextFunction;

      verifyAdmin(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
