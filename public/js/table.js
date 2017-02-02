var data = {}

var config = {
  apiKey: "AIzaSyB9MrLpsxRzKq1VzCbA1T-6Yi6raHIxiM0",
  authDomain: "code-for-good-35ef5.firebaseapp.com",
  databaseURL: "https://code-for-good-35ef5.firebaseio.com",
  //storageBucket: "<BUCKET>.appspot.com",
  //messagingSenderId: "<SENDER_ID>",
};

firebase.initializeApp(config);


// Making the Volunteers Table
var rootRef = firebase.database().ref();
rootRef.once("value").then( function(snapshot){

  data = snapshot.val(); //data is updated every time the db changes
  var table = "";


  //LOADING IN dataTables.JS AFTER the table has been populated
  $.getScript("js/dataTables.min.js");
  $.getScript("js/datatable.js");
  console.log('done loading firebase and datatable');


  $.each(data.Volunteers, function(key, value){
    // var t = $('#example').DataTable();
    // t.row.add( [
    // 	1,2,3,4,5,6
    // ] ).draw( false );
    table += '<tr>';
    table += '<td>' + key + '</td>';
    table += '<td>' + value.firstName + '</td>';
    table += '<td>' + value.lastName + '</td>';
    table += '<td>' + value.addressInfo.homeCity + '</td>';
    table += '<td>' + value.addressInfo.homeState + '</td>';
    table += '<td>' + value.addressInfo.homeZip + '</td>';
    var allEvents = "";
    var allHours = 0;
    var allPositions = "";
    for (var eventName in value.events) {
      allEvents += eventName + ", ";
      allHours += value.events[eventName]["hours"];
      allPositions += value.events[eventName]["position"] + ", ";
    }
    table += '<td>' + allEvents + '</td>';
    table += '<td>' + allHours + '</td>';
    table += '<td>' + allPositions + '</td>';
    table += '</tr>';
  });

  $('#example').append(table);



  // Generating Additional Tables for each event
  // $.each(data.Events, function(key, value){
  //   var moreTables = " \
  //   <div class='container'> \
  //   <div class='panel panel-primary'> \
  //   <div class='panel-heading'> \
  //   <h3 class='panel-title'>" + key + "</h3> \
  //   </div> \
  //   <table id='event_table' class='display' cellspacing='0' width='100%'> \
  //   <thead> \
  //   <tr> \
  //   <th>First Name</th> \
  //   <th>Last Name</th> \
  //   <th>Position</th> \
  //   </tr> \
  //   </thead> \
  //   </table> \
  //   </div> \
  //   </div>"
  //   $('#more-tables').append( moreTables );
  // });

});




//uploading file part
var fileContents ="";

window.onload = function() {
  var fileInput = document.getElementById('fileInput');
  var fileDisplayArea = document.getElementById('fileContents');

  fileInput.addEventListener('change', function(e) {
    var file = fileInput.files[0];
    var textType = /text.*/;

    if (file.type.match(textType)) {
      var reader = new FileReader();

      reader.onload = function(e) {
        fileContents = reader.result
        fileDisplayArea.innerText = fileContents;
      }

      reader.readAsText(file);
    } else {
      fileDisplayArea.innerText = "File not supported!"
    }
  });
}

function cancel(){
  $('#fileInput').replaceWith($('#fileInput').val('').clone(true));
  $('#fileContents').replaceWith($('#fileContents').val('File contents will load here').clone(true));

}

function upload(){
  fileArray = fileContents.split('\n');

  var updates = {}

  for (i=1; i < fileArray.length ;i++){ //ignores first row
    var row = fileArray[i].split(',');

    var date = row[0];
    var lastName = row[1];
    var firstName = row[2];
    var address1 = row[3];
    var address2 = row[4];
    var city = row[5];
    var state = row[6];
    var zip = row[7];
    var country = row[8];
    var email = row[9];
    var phone = row[10];

    if (row[10]==="\r"){ //replaces carriage returns
      phone = ""
    }


    var addressInfo = {
      address1: address1,
      address2: address2,
      homeCity: city,
      homeState: state,
      homeCountry: country,
      homeZip: zip,
    }

    var contactInfo = {
      primaryEmail: email,
      homePhone: phone,
    }

    var events = {
      alzheimersWalk: {
        position: 'volunteer',
        hours: 8
      }
    }
    //console.log(postData);

    var uid =  Math.floor(Math.random()*1000000).toString();

    var postData = {
      firstName: firstName,
      lastName: lastName,
      signedRelease: 'True',
      dateSubmitted: date,
      addressInfo: addressInfo,
      contact: contactInfo,
      events: events

    }

    updates['/volunteers/' + uid] = postData;

  }

  return firebase.database().ref().update(updates);
  $('#status').text('Success!');
  location.reload();

}
