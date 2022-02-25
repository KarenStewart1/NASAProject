const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");
// we can create a test fixture with different test cases by using decribe() and passing in a descriptions for our group of tests
// our tests are defined in the callback that we pass into the describe() function
// call this test function which defines each of our test cases
// then we pass in a callback function with our actual test code

describe("Launches API", () => {
  // set up step - beforeAll takes a callback that needs to run before all the tests in this block are run. whatever in the callback will be run once.
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => await mongoDisconnect());

  describe("Test GET /launches", () => {
    test("It should respond with 200 sucess", async () => {
      //  set to supertest request() - which expects an app obejct (which just so happens to be the express app object )
      const response = await request(app)
        .get("/launches")
        .expect("Content-Type", /json/)
        .expect(200);
      // then we use these assertions that say we expcet the response to be 200
    });
  });
  describe("Test POST /launch", () => {
    const completeLaunchData = {
      mission: "uss enterprise",
      rocket: "NCC Rocket",
      target: "Kepler-62 f",
      launchDate: "January 4, 2033",
    };
    const launchDataWithoutDate = {
      mission: "uss enterprise",
      rocket: "NCC Rocket",
      target: "Kepler-62 f",
    };
    const launchDataWithInvalidDate = {
      mission: "uss enterprise",
      rocket: "NCC Rocket",
      target: "Kepler-62 f",
      launchDate: "zoot",
    };
    test("It should respond with 201 success", async () => {
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
});
