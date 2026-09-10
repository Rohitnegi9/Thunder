const request = require("supertest");
const app = require("../src/app");

describe("Application API", () => {

    test("health endpoint returns UP", async () => {
        const response = await request(app)
            .get("/health");

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("UP");
    });

    test("add endpoint calculates correctly", async () => {
        const response = await request(app)
            .get("/api/add?a=20&b=22");

        expect(response.statusCode).toBe(200);
        expect(response.body.result).toBe(42);
    });

    test("add endpoint rejects invalid input", async () => {
        const response = await request(app)
            .get("/api/add?a=hello&b=10");

        expect(response.statusCode).toBe(400);
    });

});