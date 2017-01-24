var data = {}

var config = {
    apiKey: "AIzaSyB9MrLpsxRzKq1VzCbA1T-6Yi6raHIxiM0",
    authDomain: "code-for-good-35ef5.firebaseapp.com",
    databaseURL: "https://code-for-good-35ef5.firebaseio.com",
    //storageBucket: "<BUCKET>.appspot.com",
    //messagingSenderId: "<SENDER_ID>",
  };

firebase.initializeApp(config);

var rootRef = firebase.database().ref();
rootRef.on("value", function(snapshot){

  data = snapshot.val(); //data is updated every time the db changes
	var table = "";

    
    //LOADING IN dataTables JS AFTER the table has been populated
    $.getScript("js/dataTables.min.js");
    $.getScript("js/datatable.js");
    console.log('done loading firebase and datatable');
    
    
	$.each(data.volunteers, function(key, value){
	    // var t = $('#example').DataTable();
	    // t.row.add( [
	    // 	1,2,3,4,5,6
            // ] ).draw( false );
	    table += '<tr>';
		table += '<td>' + key + '</td>';
		table += '<td>' + value.firstName + '</td>';
		table += '<td>' + value.lastName + '</td>';
		table += '<td>' + value.homeCity + '</td>';
		table += '<td>' + value.homeState + '</td>';
		table += '<td>' + value.homeZip + '</td>';
		table += '</tr>';
	});

	$('table').append(table);


    
});


// //creating the table :D

// (function(){
//     'use strict';
// 	var $ = jQuery;
// 	$.fn.extend({
// 		filterTable: function(){
// 			return this.each(function(){
// 				$(this).on('keyup', function(e){
// 					$('.filterTable_no_results').remove();
// 					var $this = $(this), 
//                         search = $this.val().toLowerCase(), 
//                         target = $this.attr('data-filters'), 
//                         $target = $(target), 
//                         $rows = $target.find('tbody tr');
                        
// 					if(search == '') {
// 						$rows.show(); 
// 					} else {
// 						$rows.each(function(){
// 							var $this = $(this);
// 							$this.text().toLowerCase().indexOf(search) === -1 ? $this.hide() : $this.show();
// 						})
// 						if($target.find('tbody tr:visible').size() === 0) {
// 							var col_count = $target.find('tr').first().find('td').size();
// 							var no_results = $('<tr class="filterTable_no_results"><td colspan="'+col_count+'">No results found</td></tr>')
// 							$target.find('tbody').append(no_results);
// 						}
// 					}
// 				});
// 			});
// 		}
// 	});
// 	$('[data-action="filter"]').filterTable();
// })(jQuery);

// $(function(){
//     // attach table filter plugin to inputs
// 	$('[data-action="filter"]').filterTable();
	
// 	$('.container').on('click', '.panel-heading span.filter', function(e){
// 		var $this = $(this), 
// 			$panel = $this.parents('.panel');
		
// 		$panel.find('.panel-body').slideToggle();
// 		if($this.css('display') != 'none') {
// 			$panel.find('.panel-body input').focus();
// 		}
// 	});
// 	//$('[data-toggle="tooltip"]').tooltip();
// })



// //uploading file part

// var fileContents ="";

// window.onload = function() {
// 		var fileInput = document.getElementById('fileInput');
// 		var fileDisplayArea = document.getElementById('fileContents');

// 		fileInput.addEventListener('change', function(e) {
// 			var file = fileInput.files[0];
// 			var textType = /text.*/;

// 			if (file.type.match(textType)) {
// 				var reader = new FileReader();

// 				reader.onload = function(e) {
// 					fileContents = reader.result
// 					fileDisplayArea.innerText = fileContents;
// 				}

// 				reader.readAsText(file);	
// 			} else {
// 				fileDisplayArea.innerText = "File not supported!"
// 			}
// 		});
// }

// function upload(){
// 	fileArray = fileContents.split('\n');

// 	var updates = {}

// 	for (i=1; i < fileArray.length ;i++){ //ignores first row
// 		var row = fileArray[i].split(',');

// 		var date = row[0];
// 		var lastName = row[1];
// 		var firstName = row[2];
// 		var address1 = row[3];
// 		var address2 = row[4];
// 		var city = row[5];
// 		var state = row[6];
// 		var zip = row[7];
// 		var country = row[8];
// 		var email = row[9];
// 		var phone = row[10];

// 		if (row[10]==="\r"){ //replaces carriage returns
// 			phone = ""
// 		}


// 	  	var addressInfo = {
// 	  		address1: address1,
// 		    address2: address2,
// 		    homeCity: city,
// 		    homeState: state,
// 		    homeCountry: country,
// 		    homeZip: zip,
// 	  	}

// 	  	var contactInfo = {
// 			primaryEmail: email,
// 		    homePhone: phone,
// 	  	}

// 	  	var events = {
// 	  		alzheimersWalk: {
// 	  			position: 'volunteer',
// 	  			hours: 8
// 	  		}
// 	  	}
// 	  	//console.log(postData);

// 	  	var uid =  Math.floor(Math.random()*1000000).toString();
	  	
// 	  	var postData = {
// 	  		firstName: firstName,
// 	  		lastName: lastName,
// 	  		signedRelease: 'True',
// 	  		dateSubmitted: date,
// 	  		addressInfo: addressInfo,
// 	  		contact: contactInfo,
// 	  		events: events

// 	  	}

// 	  	updates['/volunteers/' + uid] = postData;
	  	
// 	}

// 	return firebase.database().ref().update(updates);
// 	$('#status').text('Success!');
// 	location.reload();

// }



