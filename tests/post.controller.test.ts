jest.mock("../src/models/PostModel", () => ({
  PostModel: {
    create: jest.fn(),
    find: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    findById: jest.fn()
  }
}));

import { Request } from "express";
import {
  createPost,
  deletePost,
  getPosts,
  likePost,
  updatePost
} from "../src/controllers/PostController";
import { PostModel } from "../src/models/PostModel";
import { createMockResponse } from "./helpers";

describe("PostController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("creates a post", async () => {
    const req = { body: { title: "Test", content: "Body" } } as Request;
    const res = createMockResponse();

    (PostModel.create as jest.Mock).mockResolvedValue({ _id: "1", title: "Test", content: "Body" });

    await createPost(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ title: "Test" }));
  });

  it("handles create post errors", async () => {
    const req = { body: { title: "Test", content: "Body" } } as Request;
    const res = createMockResponse();

    (PostModel.create as jest.Mock).mockRejectedValue(new Error("db error"));

    await createPost(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it("gets posts", async () => {
    const req = {} as Request;
    const res = createMockResponse();

    (PostModel.find as jest.Mock).mockResolvedValue([{ _id: "1" }]);

    await getPosts(req, res);

    expect(res.json).toHaveBeenCalledWith([{ _id: "1" }]);
  });

  it("handles get posts errors", async () => {
    const req = {} as Request;
    const res = createMockResponse();

    (PostModel.find as jest.Mock).mockRejectedValue(new Error("db error"));

    await getPosts(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it("updates a post", async () => {
    const req = {
      params: { id: " 123 " },
      body: { title: "Updated", content: "Body" }
    } as unknown as Request;
    const res = createMockResponse();

    (PostModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({ _id: "123", title: "Updated" });

    await updatePost(req, res);

    expect(PostModel.findByIdAndUpdate).toHaveBeenCalledWith(
      "123",
      { title: "Updated", content: "Body" },
      { new: true, runValidators: true }
    );
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ _id: "123" }));
  });

  it("returns 404 when updating a missing post", async () => {
    const req = {
      params: { id: "123" },
      body: { title: "Updated", content: "Body" }
    } as unknown as Request;
    const res = createMockResponse();

    (PostModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    await updatePost(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("handles update errors", async () => {
    const req = {
      params: { id: "123" },
      body: { title: "Updated", content: "Body" }
    } as unknown as Request;
    const res = createMockResponse();

    (PostModel.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error("db error"));

    await updatePost(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it("deletes a post", async () => {
    const req = { params: { id: " 123 " } } as unknown as Request;
    const res = createMockResponse();

    (PostModel.findByIdAndDelete as jest.Mock).mockResolvedValue({ _id: "123" });

    await deletePost(req, res);

    expect(PostModel.findByIdAndDelete).toHaveBeenCalledWith("123");
    expect(res.json).toHaveBeenCalledWith({ message: "Post deleted successfully" });
  });

  it("returns 404 when deleting a missing post", async () => {
    const req = { params: { id: "123" } } as unknown as Request;
    const res = createMockResponse();

    (PostModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    await deletePost(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("handles delete errors", async () => {
    const req = { params: { id: "123" } } as unknown as Request;
    const res = createMockResponse();

    (PostModel.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error("db error"));

    await deletePost(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it("likes a post", async () => {
    const req = { params: { id: " 123 " } } as unknown as Request;
    const res = createMockResponse();
    const save = jest.fn().mockResolvedValue(undefined);

    (PostModel.findById as jest.Mock).mockResolvedValue({ _id: "123", likes: 1, save });

    await likePost(req, res);

    expect(save).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      message: "Post liked successfully",
      likes: 2
    });
  });

  it("returns 404 when liking a missing post", async () => {
    const req = { params: { id: "123" } } as unknown as Request;
    const res = createMockResponse();

    (PostModel.findById as jest.Mock).mockResolvedValue(null);

    await likePost(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("handles like errors", async () => {
    const req = { params: { id: "123" } } as unknown as Request;
    const res = createMockResponse();

    (PostModel.findById as jest.Mock).mockRejectedValue(new Error("db error"));

    await likePost(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
