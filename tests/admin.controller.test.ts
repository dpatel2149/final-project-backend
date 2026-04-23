jest.mock("../src/models/UserModel", () => ({
  UserModel: {
    countDocuments: jest.fn()
  }
}));

jest.mock("../src/models/PostModel", () => ({
  PostModel: {
    countDocuments: jest.fn(),
    findByIdAndDelete: jest.fn()
  }
}));

import { Request } from "express";
import { deleteAnyPost, getSystemStats } from "../src/controllers/AdminController";
import { PostModel } from "../src/models/PostModel";
import { UserModel } from "../src/models/UserModel";
import { createMockResponse } from "./helpers";

describe("AdminController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("gets system stats", async () => {
    const req = {} as Request;
    const res = createMockResponse();

    (UserModel.countDocuments as jest.Mock)
      .mockResolvedValueOnce(10)
      .mockResolvedValueOnce(2)
      .mockResolvedValueOnce(8);
    (PostModel.countDocuments as jest.Mock).mockResolvedValueOnce(5);

    await getSystemStats(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "System statistics fetched successfully",
        stats: {
          totalUsers: 10,
          totalPosts: 5,
          adminUsers: 2,
          normalUsers: 8
        }
      })
    );
  });

  it("handles stats errors", async () => {
    const req = {} as Request;
    const res = createMockResponse();

    (UserModel.countDocuments as jest.Mock).mockRejectedValue(new Error("db error"));

    await getSystemStats(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it("deletes any post as admin", async () => {
    const req = { params: { id: "123" } } as unknown as Request;
    const res = createMockResponse();

    (PostModel.findByIdAndDelete as jest.Mock).mockResolvedValue({ _id: "123" });

    await deleteAnyPost(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Post deleted successfully by admin"
      })
    );
  });

  it("returns 404 when admin deletes a missing post", async () => {
    const req = { params: { id: "123" } } as unknown as Request;
    const res = createMockResponse();

    (PostModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    await deleteAnyPost(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("handles admin delete errors", async () => {
    const req = { params: { id: "123" } } as unknown as Request;
    const res = createMockResponse();

    (PostModel.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error("db error"));

    await deleteAnyPost(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
