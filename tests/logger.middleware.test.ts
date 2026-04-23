import { Request, Response } from "express";
import { logger } from "../src/middleware/logger";

describe("logger middleware", () => {
  it("logs response details on finish", () => {
    const handlers: Record<string, () => void> = {};
    const req = {
      method: "GET",
      originalUrl: "/api/posts"
    } as Request;
    const res = {
      statusCode: 200,
      on: jest.fn((event: string, handler: () => void) => {
        handlers[event] = handler;
        return res;
      })
    } as unknown as Response;
    const next = jest.fn();
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => undefined);

    logger(req, res, next);
    handlers.finish();

    expect(next).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("GET /api/posts 200"));

    consoleSpy.mockRestore();
  });
});
