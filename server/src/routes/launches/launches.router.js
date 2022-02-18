const express = require("express");
const {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
} = require("./launches.controller");

const launchesRouter = express.Router();
launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpAddNewLaunch);
// using express's parameter syntax --> :
launchesRouter.delete("/:id", httpAbortLaunch);
module.exports = launchesRouter;
