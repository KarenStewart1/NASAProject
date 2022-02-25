// importing node built in module for relative paths
const path = require("path");
// import express moodule and cors modules (both npm packages)
const express = require("express");
const cors = require("cors");
// import morgan module for logging
const morgan = require("morgan");
// import planetsRouter from where we created it
const planetsRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");
const { httpAddNewLaunch } = require("./routes/launches/launches.controller");
//  express function that’s exported from the express package. we've passed this to
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
//including morgan; takes a string that tells morgan which of the pre-defined formats we should use for our logs. It defaults to "combined" but we'll be explicit just to be clear
app.use(morgan("combined"));
//  call the use() function on the app object which will register our middleware with Express so it knows to run it. And our middleware is this function that we pass in to handle the req and res.

//app.use let us use the middleware, express.json parses json from the body of any incoming requests
app.use(express.json());
// serve the client code optimized for production
app.use(express.static(path.join(__dirname, "..", "public")));

// since it's middleware, we need to app.use() it.
app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);

//server index.html from "/" route
// * uses expresses matching capabilities so if there is nothing here that gives the route, then itw ill hand it off to react for the routing
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
// exports app so other components/modules? can use it; we passed it to the server.js module(const server = http.createServer(app);) so any routeHandlers or middleware we attached to that app will respond to requests coming in to our server
module.exports = app;

// the request comes in from express  --> const app = express();
// gets checked for the json - content type --> app.use(express.json());
// and then goes through our express router -->app.use(planetsRouter);
