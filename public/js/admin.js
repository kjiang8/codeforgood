function addEventVolCat(){

	var eventType = $("#eventType").val();
	var volCategory = $('#volCategory').val();

	if (eventType== ""){
		eventType = "00000";
	}

	var catList = volCategory.split(', ');

	var postData = {
		Categories: catList
	};

	var updates = {};
    updates['/volCategories/'+ eventType] = postData;

    $('#eventType').val('');
    $("#volCategory").val('');

    return firebase.database().ref().update(updates);


}
