// Dependencies
// =============================================================
var express = require("express");
var router = express.Router();
var path = require("path");

// HTML Route Handling
// =============================================================

// Displays the home page
router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});

// Displays the survey page
router.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/survey.html"));
});

// Displays the survey page
router.get("/friends", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/friends.html"));
});

// Loads custom CSS
router.get("/assets/style.css", function(req, res) {
  res.sendFile(path.join(__dirname, "../assets/css/style.css"));
});

// Loads custom JavaScript
router.get("/assets/survey.js", function(req, res) {
  res.sendFile(path.join(__dirname, "../assets/js/survey.js"));
});

// Loads custom JavaScript
router.get("/assets/friendsList.js", function(req, res) {
  res.sendFile(path.join(__dirname, "../assets/js/friendsList.js"));
});

module.exports = router;