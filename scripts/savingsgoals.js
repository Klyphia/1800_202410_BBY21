//
// displays data from budget.js to savingsgoals.js


//         important window (global) js variables
//          call these when you want to use them

// window.totalExpenses = total transactions user has made
// window.RemainingBudget = remaining monthly budget left

// window.CustomGoal still needs to be made
// window.monthlyIncome still needs to be made


// TOTAL EXPENSES PROGRESS
function totalExpensesProgressBar(totalExpenses, customGoal) {
    const progressPercentage = Math.round((totalExpenses / customGoal) * 100); // Calculate progress percentage
    const progressBar = document.getElementById('total-expenses-progress');    // Update progress bar width percentage

    if (progressBar) {
      progressBar.style.setProperty('--width', `${progressPercentage}%`);

        // checks if 0%
        if (!isNaN(progressPercentage)) {

            // CHANGE TOTAL EXPENSES LABEL HERE
            progressBar.dataset.label = `${progressPercentage}% - $${totalExpenses} spent of $${customGoal}`;
        
        } else {
            progressBar.dataset.label = `0%`; // Display default text when totalExpenses is NaN
        }
    }
}

// REMAINING BUDGET

function calculateRemainingBudget(monthlyIncome, totalExpenses) {
    // Calculate remaining budget
    var remainingBudget = monthlyIncome - totalExpenses;

    // Display remaining budget on the page
    var remainingBudgetElement = document.getElementById('remaining-budget');
    if (remainingBudgetElement) {
        remainingBudgetElement.textContent = '$' + remainingBudget.toFixed(2);
        window.remainingBudget = remainingBudget.toFixed(2);
    }
    
    // Update remaining budget & total expenses
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var uid = user.uid;
            var userRef = db.collection('users').doc(uid);

            userRef.update({
                remaining_budget: remainingBudget,
                total_expenses: totalExpenses
            })
        }
    });
}

// assigns vars to user that's logged in
// some functions don't require user authentication, but it's just good practice
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

        // PLACEHOLDER GLOBAL VALUES (can be whatever for now)
        let customGoal = 3530;
        let monthlyIncomeInput = 3530;


        // Wait for asynchronous code to complete and then access window.totalExpenses
        // Check if window.totalExpenses is defined
        setTimeout(function() {

            // progress formula = TOTAL EXPENSES divided by CUSTOMGOAL
            totalExpensesProgressBar(
                window.totalExpenses,   // total expenses (budget.html)
                customGoal              // custom goal (customgoal.html)
            );
        
            // remaining budget formula = MONTHLY INCOME minus TOTAL EXPENSES
            calculateRemainingBudget(
                monthlyIncomeInput,     // monthly income (idk somewhere)
                totalExpenses           // total expenses (budget.html)
            );

        }, 1111); // take 1.111 seconds to ensure data loads properly
    }
});