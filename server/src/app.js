const express = require("express");

const app = express();
// parses json from the body of any incoming requests
app.use(express.json());

module.exports = app;
