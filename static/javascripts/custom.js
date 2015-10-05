$( document ).ready(function() {
	var destination;

	//When you change the selection...
	$( "select" ).change(function() {
		// make the destination equal the value...
		destination = $( "select option:selected" ).val();
		// then take us to the URL with that destination.
		window.location.href = "/department/"+destination;
	});

	var extension;

	$('#reverseButton').click(function() {
		extension = $('#reverseField').val();

		window.location.href = "/reverse-results/" + extension;
	})

});