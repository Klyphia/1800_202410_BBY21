$('#btn-add').click(function() {
    populateUserInfo();
});

var currentUser;               //points to the document of the user who is logged in
function populateUserInfo() {
            firebase.auth().onAuthStateChanged(user => {
                // Check if user is signed in:
                if (user) {

                    //go to the correct user document by referencing to the user uid
                    currentUser = db.collection("budget").doc(user.uid).collection("budget").doc(user.item);

                    //get the document for current user.
                    currentUser.get()
                        .then(userDoc => {
                            //get the data fields of the user
                            let userCost = userDoc.data().item;

                            //if the data fields are not empty, then write them in to the form.
                            if (userItem != null) {
                                document.getElementById("cityInput").value = userItem;
                            }

                        })
                    } else {

                    // No user is signed in.
                    console.log ("No user is signed in");
                }
            });
        }

//call the function to run it 
populateUserInfo();