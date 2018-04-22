// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Setup the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3600;

// Setup data parsing Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// HTML Routes Middleware
// =============================================================
var htmlRoutes = require("./app/routing/htmlRoutes");
app.use('/', htmlRoutes);

// API Routes Middleware
// =============================================================
var apiRoutes = require("./app/routing/apiRoutes");
app.use('/', apiRoutes);

// Start Listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});