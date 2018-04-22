// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// apiRoutes
// htmlRoutes

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3600;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Friends Data
// =============================================================
var friends = [
  {
    "name": "yoda",
    "photo": "https://vignette.wikia.nocookie.net/starwars/images/d/d6/Yoda_SWSB.png/revision/latest?cb=20150206140125",
    "scores": ["5","1","4","4","5","1","2","5","4","1"]
  },
  {
    "name": "Darth Vader",
    "photo": "https://lumiere-a.akamaihd.net/v1/images/Darth-Vader_6bda9114.jpeg?region=0%2C23%2C1400%2C785&width=768",
    "scores": ["2","3","2","4","3","4","1","3","2","4"]
  }
];


// Routes
// =============================================================

// Basic route that sends the user first to the home Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/home.html"));
});

// Displays the survey page
app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});

// Routes
// =============================================================

// Displays all people
app.get("/api/friends", function(req, res) {
  return res.json(friends);
});

// Add New Person
app.post("/api/friends", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newPerson = req.body;
  console.log(newPerson);
  friends.push(newPerson);

  // newcharacter.routeName = newcharacter.name.replace(/\s+/g,"").toLowerCase();

  // console.log(newcharacter);

  // We then add the json the user sent to the character array

  // We then display the JSON to the users
  res.json(newPerson);
});

// Displays a single character, or returns false
app.get("/api/friends/:friend", function(req, res) {
  var chosen = req.params.friend;

  console.log(chosen);

  // for (var i = 0; i < friends.length; i++) {
  //   if (chosen === friends[i].routeName) {
      return res.json(friends[chosen]);
  //   }
  // }

  return res.json(false);
});

// Start Listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
