const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
  test("It should respond with 200 sucess", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
describe("Test POST /launch", () => {
  const completeLaunchData = {
    mission: "uss enterprise",
    rocket: "NCC Rocket",
    target: "Kepler-186 f",
    launchDate: "January 4, 2033",
  };
  const launchDataWithoutDate = {
    mission: "uss enterprise",
    rocket: "NCC Rocket",
    target: "Kepler-186 f",
  };
  const launchDataWithInvalidDate = {
    mission: "uss enterprise",
    rocket: "NCC Rocket",
    target: "Kepler-186 f",
    launchDate: "zoot",
  };
  test("It should respond with 201 sucess", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(responseDate).toBe(requestDate);
    expect(response.body).toMatchObject(launchDataWithoutDate);
  });
  test("it should catch missing requied properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Missing required launch property",
    });
  });
  test("it should catch invalid dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body).toStrictEqual({
      error: "Invalid launch date",
    });
  });
});
