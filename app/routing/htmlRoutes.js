// Dependencies
// =============================================================

// var path = require("path");

// Routes
// =============================================================
function routes(app,path){
	// Basic route that sends the user first to the home Page
	app.get("/", function(req, res) {
	  res.sendFile(path.join(__dirname, "/app/public/home.html"));
	});

	// Displays the survey page
	app.get("/survey", function(req, res) {
	  res.sendFile(path.join(__dirname, "/app/public/survey.html"));
	});
};

module.exports = routes;


