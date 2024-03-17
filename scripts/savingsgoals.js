//
// displays data from "user" collection on firestore onto html pages
//


// MONTHLY INCOME
function readMonthlyIncome(uid) { db.collection("users").doc(uid).onSnapshot(uidDoc => {                                                               
    document.getElementById("monthly_income").innerHTML = uidDoc.get('monthly_income');
})}

// TOTAL SAVINGS GOAL
function readSavingsGoal(uid) { db.collection("users").doc(uid).onSnapshot(uidDoc => {                                                               
    document.getElementById("savings_goal").innerHTML = uidDoc.get('savings_goal');
})}

// REMAINING BUDGET
function readRemainingBudget(uid) { db.collection("users").doc(uid).onSnapshot(uidDoc => {                                                               
    document.getElementById("remaining_budget").innerHTML = uidDoc.get('remaining_budget');
})}

// assigns vars to user that's logged in
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        readMonthlyIncome(user.uid);
        readSavingsGoal(user.uid);
        readRemainingBudget(user.uid);
    }
});