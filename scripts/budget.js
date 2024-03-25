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
                        })
                        .catch(function(error) {
                            console.error('Error adding document:', error);
                        });
                }
            }
        });
    });
    

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
                // Optionally, remove the row from the UI as well
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
                        });

                        // Display total expenses for all categories
                        $('#expenses').text('$' + totalExpenses.toFixed(2) + ' spent');

                        // Update recent transactions when budget entries change
                        updateRecentTransactions();
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
});

