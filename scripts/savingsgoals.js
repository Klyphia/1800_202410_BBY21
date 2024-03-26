// displays data from budget.js to savingsgoals.js

//         important window (global) js variables
//          call these when you want to use them

// window.totalExpenses = total transactions user has made (in red)
// window.totalExpensesPercentage = version in %

// window.RemainingBudget = remaining monthly budget left


// list of global variables that still need to be figured out:
// window.CustomTotalGoal
// window.monthlyIncome

// window.EntertainmentExpenses
// window.EntertainmentGoal

// window.FoodExpenses
// window.FoodGoal

// window.EducationExpenses
// window.EducationGoal

// window.HealthcareExpenses
// window.HealthcareGoal

// window.TranshousingExpenses
// window.TranshousingGoal

// window.OtherExpenses
// window.OtherGoal

  
// TOTAL EXPENSES FOR PROGRESS BAR
// TOTAL EXPENSES FOR PROGRESS BAR
function totalExpensesProgressBar(totalExpenses, customTotalGoal) {
    window.totalExpensesPercentage  = Math.round((totalExpenses / customTotalGoal) * 100); // Calculate progress percentage
    const progressBar = document.getElementById('total-expenses-progress');    // Update progress bar width percentage

    if (progressBar) {
      progressBar.style.setProperty('--width', `${window.totalExpensesPercentage }%`);

        // checks if 0%
        if (!isNaN(window.totalExpensesPercentage)) {

            // CHANGE TOTAL EXPENSES LABEL HERE
            progressBar.dataset.label = `${window.totalExpensesPercentage}% - $${totalExpenses} spent of $${customTotalGoal} monthly goal`;

        } else {
            progressBar.dataset.label = `0%`; // Display default text when totalExpenses is NaN
        }
    }
}


///////////// REMAINING BUDGET /////////////
///////////// REMAINING BUDGET /////////////
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

///////////// TOTAL EXPENSES OF EACH CATEGORY /////////////
///////////// TOTAL EXPENSES OF EACH CATEGORY /////////////

// undefined error, not sure how to fix
window.foodExpenses = 0;
window.entertainmentExpenses = 0;
window.educationExpenses = 0;
window.healthcareExpenses = 0;
window.transHousingExpenses = 0;
window.otherExpenses = 0;


// FOOD & DINING
function fetchFoodExpenses(userId) {
    fetchCategoryExpenses(userId, 'Food & Dining', function(categoryExpense) {
        // Update progress bar for Food & Dining category
        updateProgressBar('food_and_dining-progress-bar', categoryExpense);
    });
}

// ENTERTAINMENT
function fetchEntertainmentExpenses(userId) {
    fetchCategoryExpenses(userId, 'Entertainment', function(categoryExpense) {
        // Update progress bar for Entertainment category
        updateProgressBar('entertainment-progress-bar', categoryExpense);
    });
}

// EDUCATION
function fetchEducationExpenses(userId) {
    fetchCategoryExpenses(userId, 'Education', function(categoryExpense) {
        // Update progress bar for Education category
        updateProgressBar('education-progress-bar', categoryExpense);
    });
}

// HEALTH & SKINCARE
function fetchHealthcareExpenses(userId) {
    fetchCategoryExpenses(userId, 'Health & Skincare', function(categoryExpense) {
        // Update progress bar for Healthcare category
        updateProgressBar('healthcare-progress-bar', categoryExpense);
    });
}

// TRANSPORTATION & HOUSING
function fetchTransHousingExpenses(userId) {
    fetchCategoryExpenses(userId, 'Transportation & Housing', function(categoryExpense) {
        // Update progress bar for Transportation & Housing category
        updateProgressBar('transhousing-progress-bar', categoryExpense);
    });
}

// OTHER
function fetchOtherExpenses(userId) {
    fetchCategoryExpenses(userId, 'Other', function(categoryExpense) {
        // Update progress bar for Other category
        updateProgressBar('other-progress-bar', categoryExpense);
    });
}

function fetchCategoryExpenses(userId, category, callback) {
    var totalExpenses = window.totalExpenses; // Assuming totalExpenses is defined elsewhere

    // Query Firestore for budget data of the specified category and user ID
    db.collection('budget')
        .where('uid', '==', userId)
        .where('category', '==', category)
        .get()
        .then(function(querySnapshot) {
            var categoryExpense = 0; // Variable to store expenses for the category

            querySnapshot.forEach(function(doc) {
                var data = doc.data();
                categoryExpense += data.cost; // Accumulate expenses for each document
            });

            // Call the callback function with the categoryExpense value
            callback(categoryExpense);
        })
        .catch(function(error) {
            console.error('Error getting documents: ', error);
        });
}

// Update progress bars based on the category expenses
function updateProgressBar(progressBarId, categoryExpense) {
    var totalExpenses = window.totalExpenses; // Assuming totalExpenses is defined elsewhere

    var progressPercentage = Math.round((categoryExpense / totalExpenses) * 100);
    var progressBar = $('#' + progressBarId);

    if (progressBar.length > 0) {
        progressBar.css('width', progressPercentage + '%');
        progressBar.text('$' + categoryExpense.toFixed(2));
    } else {
        console.error('Progress bar not found for ID:', progressBarId);
    }
}

// overall function, anything on page reload related when authenticated
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var userId = user.uid;

        // Call the respective fetch functions for each category
        fetchFoodExpenses(userId);
        fetchEntertainmentExpenses(userId);
        fetchEducationExpenses(userId);
        fetchHealthcareExpenses(userId);
        fetchTransHousingExpenses(userId);
        fetchOtherExpenses(userId);

        // PLACEHOLDER GLOBAL VALUES (can be whatever for now)
        let customTotalGoal = 3530;
        let monthlyIncomeInput = 3530;


        // Wait for asynchronous code to complete and then access window.totalExpenses
        // Check if window.totalExpenses is defined
        setTimeout(function() {

            // progress formula = TOTAL EXPENSES divided by CUSTOMGOAL
            totalExpensesProgressBar(
                window.totalExpenses,   // total expenses (budget.html)
                customTotalGoal         // custom goal (customgoal.html)
            );
        
            // remaining budget formula = MONTHLY INCOME minus TOTAL EXPENSES
            calculateRemainingBudget(
                monthlyIncomeInput,     // monthly income (idk somewhere)
                totalExpenses           // total expenses (budget.html)
            );

        }, 1111); // take 1.111 seconds to ensure data loads properly
    }
});

///////////////// RECENT TRANSACTIONS /////////////////
///////////////// RECENT TRANSACTIONS /////////////////
function fetchAndDisplayRecentTransactions() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var uid = user.uid;

            db.collection('transactions')
            .where('uid', '==', uid) // Filter documents based on uid
            .orderBy('timestamp', 'desc') // Order transactions by timestamp in ascending order (earliest first)
            .onSnapshot(function(querySnapshot) {
                const recentTransactionsContainer = document.getElementById('recent-transactions-list');
                recentTransactionsContainer.innerHTML = ''; // Clear previous transactions

                querySnapshot.forEach(function(doc) {
                    const transactionData = doc.data();

                    // Create card element for each transaction
                    const card = document.createElement('div');
                    card.classList.add('card');

                    // Create card body
                    const cardBody = document.createElement('div');
                    cardBody.classList.add('card-body');

                    // Parse timestamp into a Date object
                    const timestamp = transactionData.timestamp.toDate();

                    // Format date and time in a user-friendly format
                    const formattedDateTime = `${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;

                    // Populate card body with transaction details including formatted date and time
                    cardBody.innerHTML = `
                        <h5 class="card-title">${transactionData.category}</h5>
                        <p class="card-text">${transactionData.item} - $${transactionData.cost}</p>
                        <b>${formattedDateTime}</b>
                    `;

                    // Append card body to card
                    card.appendChild(cardBody);

                    // Append card to container
                    recentTransactionsContainer.appendChild(card);
                });
            });

        } else {
            console.log('User is not logged in.');
            // Handle case where user is not logged in, such as redirecting to login page
        }
    });
}

// Call fetchAndDisplayRecentTransactions to fetch and display recent transactions
fetchAndDisplayRecentTransactions();
