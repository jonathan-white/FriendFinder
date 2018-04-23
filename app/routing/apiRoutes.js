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

// Add new friend to list of available Friends & check for compatibility
router.post("/api/friends", function(req, res) {

  var newPerson = req.body;
  
  var highestDiff = 40;
  var matches = [];

  // Loop through friendsList to determine total difference between scores
  for (var i = 0; i < friendsList.length; i++) {
    var totalDiff = 0;
    for (var s = 0; s < 10; s++) {
      if(newPerson.scores[s] !== friendsList[i].scores[s]){
        totalDiff += Math.abs(parseInt(newPerson.scores[s]) - parseInt(friendsList[i].scores[s])); 
      }
    }
    matches.push({person: i, difference: totalDiff});
  }

  // Review the list of matches to determine match with the lowest difference (best match)
  var bestMatch = {person: null, difference: highestDiff};
  for (var i = 0; i < matches.length; i++) {
    if(matches[i].difference < bestMatch.difference) {
      bestMatch = {
        person: matches[i].person, 
        difference: matches[i].difference
      }
    }
  }

  // Add the new person to the friends array
  friendsList.push(newPerson);

  // Add Match Percentage to the Best Match
  var matchPercentage = Math.round((highestDiff - bestMatch.difference) / highestDiff * 100);
  // friendsList[bestMatch.person].matchPerc = matchPercentage;

  // // Update the user's list of matched friends 
  // friendsList[friendsList.length - 1].match = {
  //   friend: bestMatch.person, 
  //   percent: matchPercentage
  // };
  
  // Update the best match's list of matched friends
  friendsList[bestMatch.person].match = {
    friend: (friendsList.length - 1), 
    percent: matchPercentage
  };
  
  // Return the best matched friend as a JSON object
  res.json(friendsList[bestMatch.person]);
});

module.exports = router;