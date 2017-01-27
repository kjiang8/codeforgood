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

    var list = "";
  $.each(data.Events, function(key, value){
    list += "<option>" + key + "</option>";

  });

  //console.log(list);

  $('#eventList').append(list);

});