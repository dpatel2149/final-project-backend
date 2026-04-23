import request from "supertest";
import { app } from "../src/app";

describe("app", () => {
  it("returns a healthy root response", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.text).toBe("Server running");
  });
});
