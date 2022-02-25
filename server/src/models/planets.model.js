const fs = require("fs");
const path = require("path");
// import csv-parse npm package to parse the csv file
const { parse } = require("csv-parse");
const planets = require("./planets.mongo");

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}
// To implement this kind of logic on our planets data, we are going to want to call this code as a function before handling any requests. We’ll return a promise which resolves once our habitable planets have been found. We will wait for that promise to resolve before listening to requests in our server (so before the server.listen function call).
function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          savePlanet(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        // we will use the reject function to reject when we get an error on our stream.
        reject(err);
      })
      .on("end", async () => {
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log(`${countPlanetsFound} habitable planets found!`);
        resolve();
        // we're not passing anything in to our resolve() function to be returned when our promise resovles because instead we're setting this habitable planets array. We're just using the promise so that we know when the planets data has been succesffully loaded.
      });
  });
}

async function getAllPlanets() {
  // second argument allows us to select which fields we want included in the response.If we want to exclude the id and version tag:
  return await planets.find({}, { _id: 0, __v: 0 });
}

async function savePlanet(planet) {
  try {
    await planets.updateOne(
      { keplerName: planet.kepler_name },
      { keplerName: planet.kepler_name },
      { upsert: true }
    );
  } catch (err) {
    console.error(`Could not save planet ${err}`);
  }
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
