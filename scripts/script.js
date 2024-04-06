//------------------------------------------------
// Call this function to log user out
//-------------------------------------------------
function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logging out user");
      }).catch((error) => {
        // An error happened.
      });
}

// if(document.getElementById('button').clicked == true)
// {
//    alert("button was clicked");
// }