function submitPrivateInfo() {
    // Get the current user
    var user = firebase.auth().currentUser;
  
    // Get the form data
    var name = document.getElementById('inputFirstName').value + ' ' + document.getElementById('inputLastName').value;
    var email = document.getElementById('inputEmail4').value;
  
    // Log the name and email variables
    console.log('Name:', name);
    console.log('Email:', email);
  
    // Update the user's profile information
    user.updateProfile({
      displayName: name,
      email: email
    }).then(function() {
      // Update the user's data in Firestore
      var userRef = firebase.firestore().collection('users').doc(user.uid);
      userRef.update({
        name: name,
        email: email
      }).then(function() {
        console.log('User data updated successfully!');
      }).catch(function(error) {
        console.error('Error updating user data: ', error);
      });
    }).catch(function(error) {
      console.error('Error updating profile: ', error);
    });
  }