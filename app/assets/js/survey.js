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
		// Setup new person object
		var newPerson = {
			"name": $("#name").val().trim(),
			"photo": $("#photo").val().trim(),
			"scores": []
		}
		for (var i = 0; i < 10; i++) {
			newPerson.scores.push($("#question" + (i+1)).val());
		}

		// Post the new person's information then determine & display the best match
		$.post("/api/friends", newPerson).then(function(data){
		  	console.log(data);
		  	if(data){
				$("#match-perc").text(data.match.percent);

				$("#match-name").text(data.name);
				$("#match-photo").attr({
					"src": data.photo,
					"alt": data.name
				});

			} else {
				$("#match-name").text("Sorry, there is no match");
			}
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