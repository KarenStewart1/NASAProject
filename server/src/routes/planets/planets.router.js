// we're going to take advantage of our built in express router - so we need express (import it )
const express = require("express");
// import getAllPlanets function from the controller file to use as callback function for /
const { httpGetAllPlanets } = require("./planets.controller");

//this uses express that you imported above
const planetsRouter = express.Router();

//getting all the planets:  get request on the planets collection, collection will be under /planets path. We'll handle these requests with function called getAllPlanets
planetsRouter.get("/", httpGetAllPlanets);
// this getAllPlanets function comes in from our controller; remember: controller takes in actions and requests from the user and works with them to update the models

//to use a router we need to export it from this module so that we can make use of it in our app.js which has all of our express middleware. Remember: router is just another type of middleware that groups together related routes. so we're grouping all our planets related routes in this file.
module.exports = planetsRouter;
