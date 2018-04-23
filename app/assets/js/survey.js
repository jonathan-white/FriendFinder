// Setup Chosen (question drop downs)
var chosenOptions = {
	disable_search_threshold: 3,
	placeholder_text_single: "Select an Option",
	width: "157px"
}
$(".question").chosen(chosenOptions);

// User submits a survey
$("#sendSurvey").on('click', function(event) {
	event.preventDefault();

	if(formIsComplete()){

		var highestDiff = 40;

		// Setup new person object
		var newPerson = {
			"name": $("#name").val().trim(),
			"photo": $("#photo").val().trim(),
			"scores": []
		}
		for (var i = 0; i < 10; i++) {
			newPerson.scores.push($("#question" + (i+1)).val());
		}

		// Get the list of friends prior to adding the new friend
		$.get("/api/friends", function(data){
			// Setup array to hold each person in the friendslist and their difference from the new friend
			var matches = [];

			// Loop through friendsList to determine total difference between scores
			for (var i = 0; i < data.length; i++) {
				var totalDiff = 0;
				for (var s = 0; s < 10; s++) {
					if(newPerson.scores[s] !== data[i].scores[s]){
						totalDiff += Math.abs(parseInt(newPerson.scores[s]) - parseInt(data[i].scores[s])); 
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

			// Use API to get the best match's name & photo; update the DOM
			$.get("/api/friends/" + bestMatch.person, function(data){
				if(data){
					var matchPercentage = Math.round((highestDiff - bestMatch.difference) / highestDiff * 100);
					$("#match-perc").text(matchPercentage);
					$("#match-name").text(data.name);

					$("#match-photo").attr({
						"src": data.photo,
						"alt": data.name
					});
				} else {
					$("#match-name").text("Sorry, there is no match");
				}
			});

			// Post the new person's information & write their data to the console
			$.post("/api/friends", newPerson).then(function(data){
			  	console.log('survey.html', data);
			});
		});
	} else {
		alert("You must respond to all fields before submitting.");
	}
});

// Prevent Modal form from being shown if some fields have been missed.
$('#bestMatchModal').on('show.bs.modal', function (e) {
	if(formIsComplete()){
		console.log('All fields have been completed, show modal.');
	} else {
		console.log('You must respond to all fields before submitting.');
		e.preventDefault();
	}
});

// Returns true if all fields have been completed; otherwise returns false
function formIsComplete(){
	var name = $("#name").val().trim();
	var photo = $("#photo").val().trim();
	if(name !== "" && photo !== ""){
		for (var i = 0; i < 10; i++) {
			if($("#question" + (i+1)).val() == "") {
				return false;
			}
		}
		return true;
	}
	return false;
};