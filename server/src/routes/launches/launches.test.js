const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
  test("Inpt should respond with 200 sucess", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
describe("Test POST /launch", () => {
  test("It should respond with 201 sucess", async () => {
    const response = await request(app)
      .post("/launches")
      .send({
        mission: "uss enterprise",
        rocket: "NCC Rocket",
        target: "Kepler-186 f",
        launchDate: "January 4, 2033",
      })
      .expect("Content-Type", /json/)
      .expect(201);
  });
  test("it should catch missing requied properties", () => {});
  test("it should catch invalid dates", () => {});
});
