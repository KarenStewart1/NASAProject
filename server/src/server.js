// import node built-in http server module
const http = require("http");
// import app from where we created it (app = express() )
const app = require("./app");
const { mongoConnect } = require("./services/mongo");
const { loadPlanetsData } = require("./models/planets.model");
//createServer() expects a callback which is whats called the request listener – tells it what to do when it gets a request.in this case app = express, so express is the listener for our http server; we will learn later why doing it this way (not just using express and not using the builtin node http server)  is better - allows us to respond to HTTP and other types of connections (like web sockets for real time communication) as opposed to sending a request and waiting for the response.
const server = http.createServer(app);

// here we set the port -(see note below about ports); instead of doing just "const PORT = 8000" we are making it configurable so that the system admin can say which port it should run on as an environmental variable. Which we can access by calling the built in process module --> environment (.env), specifically the port variable (process.env.PORT); || makes it check for that variable existing and if not, if its falsy, it defaults to port 8000
const PORT = process.env.PORT || 8000;

// telling the server to start listening to requests. localhost is a default name which means out IP address. We need to pass in a port number because we may have different applications running on our local machine and port number is used to direct traffic to the right application/right server on our machine.

async function startServer() {
  await mongoConnect();
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`);
  });
}
startServer();
