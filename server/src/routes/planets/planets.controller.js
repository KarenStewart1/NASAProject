// controllers and routers are 1:1 - each controller has a router, vice versa
// import the data from model folder
const { getAllPlanets } = require("../../models/planets.model");

async function httpGetAllPlanets(req, res) {
  // returns response with http status 200 and the planets array as json
  // using return makes sure the function stops executing, and it makes the code more readable; but lot of code wont include it.
  return res.status(200).json(await getAllPlanets());
}

// exports getAllPlanets function so it can be used by the planetsrouter
// we're exporting the function like this because theyre are likely to be more functions to export. how things are exported effects how they need to be imported
module.exports = {
  httpGetAllPlanets,
};
