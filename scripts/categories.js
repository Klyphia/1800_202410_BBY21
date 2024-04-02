// Setting custom monthly goals for each category
// User manually inputs the category and monthly goal

// jQuery code to open modal when the image is clicked
$(document).ready(function() {
    $('#openModalBtn-Entertainment, #openModalBtn-FoodDining').click(function() {
      $('#editSpecificElementModal').modal('show');
    });
});

function openModal(categoryFieldId) {
    var categoryField = document.getElementById('specificElementCategory');
    var monthlyGoalField = document.getElementById('monthlyCategoryGoal');

    // fills fields in automatically by default depending on category
    switch (categoryFieldId) {

        // Entertainment
        case 'openModalBtn-Entertainment':
            categoryField.value = 'Entertainment';
            monthlyGoalField.value = window.entertainmentExpensesGoal;
            break;

        // Food & Dining
        case 'openModalBtn-FoodDining':
            categoryField.value = 'Food & Dining';
            monthlyGoalField.value = window.foodExpensesGoal;
            break;

        // Education
        case 'openModalBtn-Education':
            categoryField.value = 'Education';
            monthlyGoalField.value = window.educationExpensesGoal;
            break;

        // Education
        case 'openModalBtn-Healthcare':
            categoryField.value = 'Health & Skincare';
            monthlyGoalField.value = window.healthcareExpensesGoal;
            break;

        // Transportation & Housing
        case 'openModalBtn-Transhousing':
            categoryField.value = 'Transportation & Housing';
            monthlyGoalField.value = window.transhousingExpensesGoal;
            break;

        // Other
        case 'openModalBtn-Other':
            categoryField.value = 'Other';
            monthlyGoalField.value = window.otherExpensesGoal;
            break;

        default:
            break;
    }

    // Clear the Monthly Category Goal field
    $('#editSpecificElementModal').modal('show');
}


// Use onAuthStateChanged to detect authentication state changes
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in, you can access user.uid to get the user's unique ID
        var userId = user.uid;

        // Reference to Firestore collection 'users'
        var usersCollection = firebase.firestore().collection('users');

        // Saving category goals when user sets them
        $('#specificElementBtn-save').click(function() {
            var category = $('#specificElementCategory').val();
            var monthlyGoal = $('#monthlyCategoryGoal').val();

            // Check if category and goal are not empty
            if (category && monthlyGoal) {
                // Use a switch statement to determine which goal to update based on the category
                var goalToUpdate;
                switch (category.toLowerCase()) {
                    case 'entertainment':
                        goalToUpdate = 'entertainment_goal';
                        break;
                    case 'food & dining':
                        goalToUpdate = 'food_goal';
                        break;
                    case 'education':
                        goalToUpdate = 'education_goal';
                        break;
                    case 'health & skincare':
                        goalToUpdate = 'healthcare_goal';
                        break;
                    case 'transportation & housing':
                        goalToUpdate = 'transhousing_goal';
                        break;
                    case 'other':
                        goalToUpdate = 'other_goal';
                        break;
                    default:
                        console.error('Invalid category!');
                        return; // Exit the function if category is invalid
                }

                // Add or update the category goal in Firestore for the current user
                usersCollection.doc(userId).set({
                    [goalToUpdate]: parseFloat(monthlyGoal)
                }, { merge: true })
                .then(function() {

                    // updates the budget goals in real time
                    entertainmentExpensesProgressBar(window.entertainmentExpenses, window.entertainmentExpensesGoal);
                    foodExpensesProgressBar(window.foodExpenses, window.foodExpensesGoal);
                    educationExpensesProgressBar(window.educationExpenses, window.educationExpensesGoal);
                    healthcareExpensesProgressBar(window.healthcareExpenses, window.healthcareExpensesGoal);
                    transhousingExpensesProgressBar(window.transhousingExpenses, window.transhousingExpensesGoal);
                    otherExpensesProgressBar(window.otherExpenses, window.otherExpensesGoal);

                    $('#editSpecificElementModal').modal('toggle');
                    console.log('Category goal saved successfully!');
                })
                .catch(function(error) {
                    console.error('Error saving category goal: ', error);
                });
            } else {
                console.error('Category or goal is empty!');
            }
        });

        // Retrieve and update default category goals in real-time
        usersCollection.doc(userId).onSnapshot(function(doc) {
            if (doc.exists) {
                var userData = doc.data();
                // Update category goals with real-time data
                window.foodExpensesGoal = userData.food_goal || 1000.01;
                window.entertainmentExpensesGoal = userData.entertainment_goal || 1000.01;
                window.educationExpensesGoal = userData.education_goal || 1000.01;
                window.healthcareExpensesGoal = userData.healthcare_goal || 1000.01;
                window.transhousingExpensesGoal = userData.transhousing_goal || 1000.01;
                window.otherExpensesGoal = userData.other_goal || 1000.01;

                console.log('Category goals updated in real-time!');
            } else {
                console.error('No data found for the user in Firestore.');
            }
        });
    } else {
        // User is signed out
        console.log('No user signed in.');
    }
});

