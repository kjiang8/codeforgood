  // Initialize Firebase
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
    
    //console.log(snapshot.val());

  });


      // FirebaseUI config.
      var uiConfig = {
        signInSuccessUrl: 'user-home.html',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          //firebase.auth.TwitterAuthProvider.PROVIDER_ID, //not yet implemented in firebase console
          //firebase.auth.GithubAuthProvider.PROVIDER_ID, //not yet implemented in firebase console
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        //tosUrl: 'www.google.com'
      };

      var uiConfigCustom = {
        signInSuccessUrl: 'user-home.html',
        signInOptions: [
          {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            scopes: [
              'https://www.googleapis.com/auth/plus.login'
            ]
          },
          {
            provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            scopes: [
              'public_profile',
              'email',
              'user_likes',
              'user_friends'
            ]
          },
          firebase.auth.TwitterAuthProvider.PROVIDER_ID, // Twitter does not support scopes.
          firebase.auth.EmailAuthProvider.PROVIDER_ID // Other providers don't need to be given as object.
        ]
      }

      // Initialize the FirebaseUI Widget using Firebase.
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.

      ui.start('#firebaseui-auth-container', uiConfig);



initApp = function() {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var providerData = user.providerData;
            user.getToken().then(function(accessToken) {
              document.getElementById('sign-in-status').textContent = 'Signed in';
              document.getElementById('sign-in').textContent = 'Sign out';
              document.getElementById('account-details').textContent = JSON.stringify({
                displayName: displayName,
                email: email,
                emailVerified: emailVerified,
                photoURL: photoURL,
                uid: uid,
                accessToken: accessToken,
                providerData: providerData
              }, null, '  ');
            });
          } else {
            // User is signed out.
            document.getElementById('sign-in-status').textContent = 'Signed out';
            document.getElementById('sign-in').textContent = 'Sign in';
            document.getElementById('account-details').textContent = 'null';
          }
        }, function(error) {
          console.log(error);
        });
      };

      window.addEventListener('load', function() {
        initApp()
      });
