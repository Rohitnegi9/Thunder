import { test } from "node:test";
import assert from "node:assert/strict";
import jwt from "jsonwebtoken";
import request from "supertest";
import app from "./app.js";

const JWT_SECRET = "Rohit@456";
const validToken = jwt.sign({ email: "test@example.com", name: "Test User" }, JWT_SECRET, { expiresIn: "1h" });
const expiredToken = jwt.sign({ email: "test@example.com", name: "Test User" }, JWT_SECRET, { expiresIn: "-1s" });
const invalidToken = jwt.sign({ email: "test@example.com", name: "Test User" }, "wrong-secret", { expiresIn: "1h" });

test("GET /user without token returns 401", async () => {
    const res = await request(app).get("/user");
    assert.equal(res.status, 401);
});

test("POST /user without token returns 401", async () => {
    const res = await request(app).post("/user").send({});
    assert.equal(res.status, 401);
});

test("DELETE /user without token returns 401", async () => {
    const res = await request(app).delete("/user");
    assert.equal(res.status, 401);
});

test("GET /user with an arbitrary Authorization header but no cookie still returns 401", async () => {
    const res = await request(app).get("/user").set("Authorization", "Bearer foo");
    assert.equal(res.status, 401);
});

test("GET /user with an invalid token cookie returns 401", async () => {
    const res = await request(app).get("/user").set("Cookie", `token=${invalidToken}`);
    assert.equal(res.status, 401);
});

test("GET /user with an expired token cookie returns 401", async () => {
    const res = await request(app).get("/user").set("Cookie", `token=${expiredToken}`);
    assert.equal(res.status, 401);
});

test("GET /user with a valid token cookie returns the existing behavior", async () => {
    const res = await request(app).get("/user").set("Cookie", `token=${validToken}`);
    assert.equal(res.status, 200);
    assert.equal(res.text, "Mere toh maje hai");
});

test("POST /user with a valid token cookie returns the existing behavior", async () => {
    const res = await request(app).post("/user").set("Cookie", `token=${validToken}`).send({ name: "new user" });
    assert.equal(res.status, 200);
    assert.equal(res.text, "Post create kar di hai");
});

test("DELETE /user with a valid token cookie returns the existing behavior", async () => {
    const res = await request(app).delete("/user").set("Cookie", `token=${validToken}`);
    assert.equal(res.status, 200);
    assert.equal(res.text, "I have deleted");
});
