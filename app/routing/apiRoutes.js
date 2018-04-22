// Dependencies
// =============================================================
var express = require("express");
var router = express.Router();
var path = require("path");

// Import Friends Data
// =============================================================
var friendsList = require("../data/friends");

// API Route Handling
// =============================================================

// Displays all friends
router.get("/api/friends", function(req, res) {
  return res.json(friendsList);
});

// Returns data from a single friend, or returns false
router.get("/api/friends/:friend", function(req, res) {
  var chosen = req.params.friend;

  if(friendsList[chosen] !== undefined){
      return res.json(friendsList[chosen]);
  } else {
      return res.json(false);
  }
});

// Add new friend to list of available Friends
router.post("/api/friends", function(req, res) {

  var newPerson = req.body;

  // Add the new person to the friends array
  friendsList.push(newPerson);

  // We then display the JSON to the user
  res.json(newPerson);
});

module.exports = router;