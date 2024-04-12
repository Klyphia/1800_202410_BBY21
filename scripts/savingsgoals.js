// displays data from budget.js or customgoal.js > savingsgoals.js

//         important window (global) js variables
//          call these when you want to use them

window.totalExpenses // total transactions user has made (in red)
window.totalExpensesPercentage // same thing but in %

window.customTotalGoal
window.RemainingBudget // remaining monthly budget left

 // use food inside timeout of main function
    window.foodExpenses
    window.FoodExpensesPercentage
    window.foodExpensesGoal

 // use entertainment inside timeout of main function
    window.entertainmentExpenses
    window.EntertainmentExpensesPercentage
    window.entertainmentExpensesGoal

 // use education inside timeout of main function
    window.educationExpenses
    window.EducationExpensesPercentage
    window.educationExpensesGoal

 // use healthcare inside timeout of main function
    window.healthcareExpenses
    window.HealthcareExpensesPercentage
    window.healthcareExpensesGoal

// use transhousing inside timeout of main function
    window.transhousingExpenses
    window.TranshousingExpensesPercentage
    window.transhousingExpensesGoal

// use other inside timeout of main function
    window.otherExpenses
    window.OtherExpensesPercentage
    window.otherExpensesGoal

        // Global variables that still need to be figured out:
        // window.CustomTotalGoal ???
        // window.monthlyIncome ???


// DRIVER (MAIN) FUNCTION
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var uid = user.uid;

        // fetches data before loading
        fetchAndAssignExpenses(uid, 'Food & Dining', 'foodExpenses');
        fetchAndAssignExpenses(uid, 'Entertainment', 'entertainmentExpenses');
        fetchAndAssignExpenses(uid, 'Education', 'educationExpenses');
        fetchAndAssignExpenses(uid, 'Health & Skincare', 'healthcareExpenses');
        fetchAndAssignExpenses(uid, 'Transportation & Housing', 'transhousingExpenses');
        fetchAndAssignExpenses(uid, 'Other', 'otherExpenses');

        // 1 second delay to load everything and then access window.totalExpenses
        setTimeout(function() {

            // progress formula = TOTAL EXPENSES divided by CUSTOMGOAL
            totalExpensesProgressBar(
                window.totalExpenses,   // total expenses (budget.html)
                window.customTotalGoal         // custom goal (customgoal.html)
            );
        
            // remaining budget formula = MONTHLY INCOME minus TOTAL EXPENSES
            calculateRemainingBudget(
                window.customTotalGoal,     // monthly income (idk somewhere)
                window.totalExpenses           // total expenses (budget.html)
            );

            entertainmentExpensesProgressBar(window.entertainmentExpenses, window.entertainmentExpensesGoal);
            foodExpensesProgressBar(window.foodExpenses, window.foodExpensesGoal);
            educationExpensesProgressBar(window.educationExpenses, window.educationExpensesGoal);
            healthcareExpensesProgressBar(window.healthcareExpenses, window.healthcareExpensesGoal);
            transhousingExpensesProgressBar(window.transhousingExpenses, window.transhousingExpensesGoal);
            otherExpensesProgressBar(window.otherExpenses, window.otherExpensesGoal);

        }, 1111); // take 1.111 seconds to ensure data loads properly
    }
});

// TOTAL EXPENSES FOR PROGRESS BAR
function totalExpensesProgressBar(totalExpenses, customTotalGoal) {

    window.totalExpensesPercentage  = Math.round((totalExpenses / customTotalGoal) * 100); // Calculate progress percentage
    const progressBar = document.getElementById('total-expenses-progress');    // Update progress bar width percentage

    if (progressBar) {
      progressBar.style.setProperty('--width', `${window.totalExpensesPercentage}%`);

        // checks if 0%
        if (!isNaN(window.totalExpensesPercentage)) {

            progressBar.dataset.label =
            // CHANGE TOTAL EXPENSES LABEL HERE
            `  ${window.totalExpensesPercentage}% - $${totalExpenses} spent of $${customTotalGoal} monthly`;

        } else {
            progressBar.dataset.label = `0%`; // Display default text when totalExpenses is NaN
        }
    }
}

// ENTERTAINMENT PROGRESS BAR
function entertainmentExpensesProgressBar(Expenses, Goal) {
    window.EntertainmentExpensesPercentage = Math.round((Expenses / Goal) * 100); // Calculate progress percentage
    const progressBar = document.getElementById('entertainment-progress-bar');    // Update progress bar width percentage

    if (progressBar) {
      progressBar.style.setProperty('--width', `${window.EntertainmentExpensesPercentage}%`);

        // checks if 0%
        if (!isNaN(window.EntertainmentExpensesPercentage)) {

            progressBar.dataset.label =
            // CHANGE TOTAL EXPENSES LABEL HERE
            `  ${window.EntertainmentExpensesPercentage}% - $${Expenses} spent of $${Goal}`;

        } else {
            progressBar.dataset.label = `0%`; // Display default text when totalExpenses is NaN
        }
    }
}

// FOOD PROGRESS BAR
function foodExpensesProgressBar(Expenses, Goal) {
    window.FoodExpensesPercentage = Math.round((Expenses / Goal) * 100); // Calculate progress percentage
    const progressBar = document.getElementById('food_and_dining-progress-bar');    // Update progress bar width percentage

    if (progressBar) {
      progressBar.style.setProperty('--width', `${window.FoodExpensesPercentage}%`);

        // checks if 0%
        if (!isNaN(window.FoodExpensesPercentage)) {

            progressBar.dataset.label =
            // CHANGE TOTAL EXPENSES LABEL HERE
            `  ${window.FoodExpensesPercentage}% - $${Expenses} spent of $${Goal}`;

        } else {
            progressBar.dataset.label = `0%`; // Display default text when totalExpenses is NaN
        }
    }
}

// EDUCATION PROGRESS BAR
function educationExpensesProgressBar(Expenses, Goal) {
    window.EducationExpensesPercentage = Math.round((Expenses / Goal) * 100); // Calculate progress percentage
    const progressBar = document.getElementById('education-progress-bar');    // Update progress bar width percentage

    if (progressBar) {
      progressBar.style.setProperty('--width', `${window.EducationExpensesPercentage}%`);

        // checks if 0%
        if (!isNaN(window.EducationExpensesPercentage)) {

            progressBar.dataset.label =
            // CHANGE TOTAL EXPENSES LABEL HERE
            `  ${window.EducationExpensesPercentage}% - $${Expenses} spent of $${Goal}`;

        } else {
            progressBar.dataset.label = `0%`; // Display default text when totalExpenses is NaN
        }
    }
}

// HEALTH & SKINCARE PROGRESS BAR
function healthcareExpensesProgressBar(Expenses, Goal) {
    window.HealthcareExpensesPercentage = Math.round((Expenses / Goal) * 100); // Calculate progress percentage
    const progressBar = document.getElementById('healthcare-progress-bar');    // Update progress bar width percentage

    if (progressBar) {
      progressBar.style.setProperty('--width', `${window.HealthcareExpensesPercentage}%`);

        // checks if 0%
        if (!isNaN(window.HealthcareExpensesPercentage)) {

            progressBar.dataset.label =
            // CHANGE TOTAL EXPENSES LABEL HERE
            `  ${window.HealthcareExpensesPercentage}% - $${Expenses} spent of $${Goal}`;

        } else {
            progressBar.dataset.label = `0%`; // Display default text when totalExpenses is NaN
        }
    }
}

// TRANSPORTATION & HOUSING PROGRESS BAR
function transhousingExpensesProgressBar(Expenses, Goal) {
    window.TranshousingExpensesPercentage = Math.round((Expenses / Goal) * 100); // Calculate progress percentage
    const progressBar = document.getElementById('transhousing-progress-bar');    // Update progress bar width percentage

    if (progressBar) {
      progressBar.style.setProperty('--width', `${window.TranshousingExpensesPercentage}%`);

        // checks if 0%
        if (!isNaN(window.TranshousingExpensesPercentage)) {

            progressBar.dataset.label =
            // CHANGE TOTAL EXPENSES LABEL HERE
            `  ${window.TranshousingExpensesPercentage}% - $${Expenses} spent of $${Goal}`;

        } else {
            progressBar.dataset.label = `0%`; // Display default text when totalExpenses is NaN
        }
    }
}

// OTHER PROGRESS BAR
function otherExpensesProgressBar(Expenses, Goal) {
    window.OtherExpensesPercentage = Math.round((Expenses / Goal) * 100); // Calculate progress percentage
    const progressBar = document.getElementById('other-progress-bar');    // Update progress bar width percentage

    if (progressBar) {
      progressBar.style.setProperty('--width', `${window.OtherExpensesPercentage}%`);

        // checks if 0%
        if (!isNaN(window.OtherExpensesPercentage)) {

            progressBar.dataset.label =
            // CHANGE TOTAL EXPENSES LABEL HERE
            `  ${window.OtherExpensesPercentage}% - $${Expenses} spent of $${Goal}`;

        } else {
            progressBar.dataset.label = `0%`; // Display default text when totalExpenses is NaN
        }
    }
}

// Function to fetch expenses for a specific category and assign them to the corresponding global variable
function fetchAndAssignExpenses(userId, category, globalVariable) {
    fetchCategoryExpenses(userId, category, function(categoryExpense) {
        // Assign the fetched category expense to the corresponding global variable
        window[globalVariable] = categoryExpense;
    });
}

///////////// REMAINING BUDGET /////////////
function calculateRemainingBudget(monthlyIncome, totalExpenses) {
    // Calculate remaining budget
    var remainingBudget = monthlyIncome - totalExpenses;

    // Check if remainingBudget is NaN
    if (isNaN(remainingBudget)) {
        remainingBudget = 0.00; // Set to 0.00 if NaN
    }

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


function fetchCategoryExpenses(userId, category, callback) {

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

///////////////// RECENT TRANSACTIONS /////////////////
function fetchAndDisplayRecentTransactions() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var uid = user.uid;

            db.collection('transactions')
            .where('uid', '==', uid) // Filter documents based on uid
            .orderBy('timestamp', 'desc') // Order transactions by timestamp in descending order
            .onSnapshot(function(querySnapshot) {
                const recentTransactionsContainer = document.getElementById('recent-transactions-list');
                recentTransactionsContainer.innerHTML = ''; // Clear previous transactions

                querySnapshot.forEach(function(doc) {
                    const transactionData = doc.data();

                    // Create card element for each transaction
                    const card = document.createElement('div');
                    card.classList.add('card');

                    // Parse timestamp into a Date object
                    const timestamp = transactionData.timestamp.toDate();

                    // Format date and time in a user-friendly format
                    const formattedDateTime = `${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;

                    // Check if the transaction belongs to both "transactions" and "budget" collections
                    checkTransactionAndBudget(transactionData, user, card, formattedDateTime);
                });
            });

        } else {
            console.log('User is not logged in.');
            // Handle case where user is not logged in, such as redirecting to login page
        }
    });
}

// Function to check if a transaction belongs to both "transactions" and "budget" collections
function checkTransactionAndBudget(transactionData, user, card, formattedDateTime) {
    const { category, item, cost } = transactionData;
    const uid = user.uid;

    db.collection('budget')
        .where('uid', '==', uid) // Filter documents based on uid
        .where('category', '==', category) // Check if the category matches
        .where('item', '==', item) // Check if the item matches
        .where('cost', '==', cost) // Check if the cost matches
        .get()
        .then(function(querySnapshot) {

            // Populate card body with transaction details including formatted date and time

            if (!querySnapshot.empty) {
                // Transaction belongs to both "transactions" and "budget" collections
                card.style.backgroundColor = 'white'; // White background

                card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${category}</h5>
                    <p class="card-text">"${item}" - $${cost}</p>
                    <p style="margin-top: -15px; font-weight: 400 !important; font-size: 12px">(item's cost, as of creation)</p>
                    <b>${formattedDateTime}</b>
                </div>
                `;
                
            } else {
                // Transaction does not belong to both collections, card should be pink
                card.style.backgroundColor = 'pink'; // Pink background
            
                card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${category} <span style="margin-left: 25px; font-weight: 400 !important; font-size: 12px">(deleted)</span></h5>
                    <p class="card-text">"${item}" - $${cost}</p>
                    <b>${formattedDateTime}</b>
                </div>
                 `;

            }

            // Append card to container
            document.getElementById('recent-transactions-list').appendChild(card);
        })
        .catch(function(error) {
            console.error('Error checking transaction and budget:', error);
        });
}

// Call fetchAndDisplayRecentTransactions to fetch and display recent transactions
fetchAndDisplayRecentTransactions();

