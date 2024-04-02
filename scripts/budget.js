// handles saving the budget entries
// uses the ID of the user to differentiate which budget entry belongs to who

// fetchAndDisplayData() uses onSnapshot to be automatic

$(document).ready(function() {
    console.log('authentication - budget.js');

    // Add button click event
    $('#btn-add').click(function() {
        $('#editModal').data('row', null).modal('show');
    });

    // Save button click event in modal
    $('#btn-save').click(function() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var $modal = $('#editModal');
                var $row = $modal.data('row');
                var $inputs = $modal.find('.form-control');
                
                // Create or update row data in Firestore
                var uid = user.uid;
                var category = $inputs.eq(0).val();
                var item = $inputs.eq(1).val();
                var cost = parseFloat($inputs.eq(2).val());
    
                var dataToUpdate = {
                    uid: uid,
                    category: category,
                    item: item,
                    cost: cost
                };
    
                if ($row) {
                    var docId = $row.data('doc-id'); // Get the document ID from the row data attribute
                    
                    if (docId) { // Check if the document ID exists
                        db.collection('budget').doc(docId).update(dataToUpdate)
                            .then(function() {
                                console.log('Document successfully updated!');
                                // Close modal and reset form
                                $modal.modal('hide');
                                $inputs.val('');
                                fetchAndDisplayData(); // Fetch and display updated data
                                addRecentTransaction(user, category, item, cost); // Add recent transaction
                                calculateAndDisplayCategorySpending(); // Update pie chart
                            })
                            .catch(function(error) {
                                console.error('Error updating document:', error);
                            });
                    } else {
                        console.error('Invalid document ID for updating.');
                    }
                } else {
                    // If creating a new row, add a new document to Firestore
                    db.collection('budget').add(dataToUpdate)
                        .then(function(docRef) {
                            console.log('Document written with ID:', docRef.id);
                            // Close modal and reset form
                            $modal.modal('hide');
                            $inputs.val('');
                            fetchAndDisplayData(); // Fetch and display updated data
                            addRecentTransaction(user, category, item, cost); // Add recent transaction
                        })
                        .catch(function(error) {
                            console.error('Error adding document:', error);
                        });
                }
            }
        });
    });

    // Function to add recent transaction
    function addRecentTransaction(user, category, item, cost) {
        db.collection('transactions').add({
            uid: user.uid,
            category: category,
            item: item,
            cost: cost,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(function(docRef) {
            console.log('Recent transaction added with ID:', docRef.id);
        })
        .catch(function(error) {
            console.error('Error adding recent transaction:', error);
        });
    }

    // Edit button click event (for dynamically added rows)
    $(document).on('click', '.btn-edit', function() {
        var $row = $(this).closest('tr');
        var $modal = $('#editModal');
        var $inputs = $modal.find('.form-control');
        
        // Populate modal inputs with row values
        $inputs.each(function(index) {
            $(this).val($row.find('td:eq(' + index + ')').text());
        });
        
        // Store row reference in modal
        $modal.data('row', $row).modal('show');
    });

// Delete button click event (for dynamically added rows)
$(document).on('click', '.btn-delete', function() {
    var docId = $(this).closest('tr').attr('data-doc-id');
    
    $(this).closest('tr').remove();
    
    // Delete the specific document from Firestore
    db.collection('budget').doc(docId).delete()
        .then(function() {
            console.log('Document successfully deleted!');
            // Update pie chart after deleting the document
            calculateAndDisplayCategorySpending();
        })
        .catch(function(error) {
            console.error('Error deleting document:', error);
        });
});

    // Handle modal close event
    $('#editModal').on('hidden.bs.modal', function () {
        console.log("Modal closed!");
        var $inputs = $(this).find('.form-control');
        // Reset form on modal close
        $inputs.val('');
    });

    // Call fetchAndDisplayData to fetch data and set window.totalExpenses
    fetchAndDisplayData();

    // Declare categoryExpenses outside of fetchAndDisplayData function
    var categoryExpenses = {};

// Function to fetch and display budget entries
function fetchAndDisplayData() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var uid = user.uid;
            var totalExpenses = 0; // Variable to store total expenses for all categories

            // Query Firestore for user-specific budget data
            db.collection('budget').where('uid', '==', uid)
                .onSnapshot(function(querySnapshot) {
                    $('tbody').empty(); // Clear existing rows
                    totalExpenses = 0; // Reset total expenses

                    querySnapshot.forEach(function(doc) {
                        var data = doc.data();
                        var row = $('<tr>').appendTo('tbody');
                        $('<td>').text(data.category).appendTo(row);
                        $('<td>').text(data.item).appendTo(row);
                        $('<td>').text(data.cost).appendTo(row);
                        $('<td>').html('<button class="btn-edit">Edit</button>').appendTo(row);
                        $('<td>').html('<button class="btn-delete" data-doc-id="' + doc.id + '">Delete</button>').appendTo(row);
                        // Set the data-doc-id attribute with the Firestore document ID
                        row.attr('data-doc-id', doc.id);

                        // Calculate total expenses for all categories
                        totalExpenses += data.cost;
                        window.totalExpenses = totalExpenses;

                        // Calculate expenses for each category
                        if (categoryExpenses[data.category]) {
                            categoryExpenses[data.category] += data.cost;
                        } else {
                            categoryExpenses[data.category] = data.cost;
                        }
                    });

                    // Display total expenses for all categories
                    $('#expenses').text('$' + totalExpenses.toFixed(2) + ' spent');
                    
                    // Calculate and display pie chart for category spending
                    calculateAndDisplayCategorySpending(querySnapshot.docs);
                });
        }
    });
}
    
    // Handle delete button click event using event delegation on tbody element
    $('tbody').on('click', '.btn-delete', function() {
        var docId = $(this).data('doc-id');
        
        // Delete the specific document from Firestore
        db.collection('budget').doc(docId).delete()
            .then(function() {
                console.log('Document successfully deleted!');
                // Optionally, remove the row from the UI as well
                $(this).closest('tr').remove();
            })
            .catch(function(error) {
                console.error('Error deleting document:', error);
            });
    });

    // Function to calculate total spending for each category and display a pie chart
function calculateAndDisplayCategorySpending(data) {
    var categoryTotal = {}; // Object to store total spending for each category

    // Calculate total spending for each category
    data.forEach(function(doc) {
        var category = doc.data().category;
        var cost = doc.data().cost;
        if (categoryTotal[category]) {
            categoryTotal[category] += cost;
        } else {
            categoryTotal[category] = cost;
        }
    });

    // Prepare data for pie chart
    var categories = Object.keys(categoryTotal);
    var spendingData = categories.map(function(category) {
        return {
            label: category,
            data: categoryTotal[category],
            backgroundColor: getRandomColor(),
        };
    });

    // Display pie chart using Chart.js
    var ctx = document.getElementById('pieChart').getContext('2d');
    var pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                data: spendingData.map(data => data.data),
                backgroundColor: spendingData.map(data => data.backgroundColor),
            }],
        },
        options: {
            title: {
                display: true,
                text: 'Spending by Category',
            },
            
        responsive: true, // Ensure the chart is responsive
        maintainAspectRatio: true, // Allow aspect ratio to change
        aspectRatio: 2, // Set aspect ratio to control the size (adjust as needed)
        },
    });
}

// Function to generate random colors for pie chart
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
});

