// Dependencies
// =============================================================

var path = require("path");

// Routes
// =============================================================

// Displays all characters
app.get("/api/friends", function(req, res) {
  return res.json(friends);
});

// Create New Characters - takes in JSON input
app.post("/api/friends", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newPerson = req.body;

  console.log(newPerson);

  // newcharacter.routeName = newcharacter.name.replace(/\s+/g,"").toLowerCase();

  // console.log(newcharacter);

  // We then add the json the user sent to the character array
  friends.push(newPerson);

  // We then display the JSON to the users
  res.json(newPerson);
});
