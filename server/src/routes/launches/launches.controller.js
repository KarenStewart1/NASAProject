const {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchByID,
} = require("../../models/launches.model");
const launchesRouter = require("./launches.router");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}
// because we have express.json() to parse the json coming in, it will now populate the req.body parameter with that parsed object
function httpAddNewLaunch(req, res) {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }
  addNewLaunch(launch);
  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  if (!existsLaunchWithId(launchId)) {
    return res.status(404).json({
      error: "Launch does not exist",
    });
  }
  const aborted = abortLaunchByID(launchId);
  return res.status(200).json(aborted);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};