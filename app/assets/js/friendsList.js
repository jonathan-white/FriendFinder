$.get("/api/friends", function(data){
	for (var i = 0; i < data.length; i++) {
		var card = $("<div class='card m-3'>");
		var card_img = $("<img class='card-img-top'>");
		card_img.attr({
			src: data[i].photo,
			alt: data[i].name
		});
		var card_body = $("<div class='card-body'>");
		var card_title = $("<h5 class='card-title text-center'>");
		card_title.text(data[i].name);
		card_body.append(card_title);
		card.append(card_img, card_body);
		$(".friend-list").append(card);
	}
});