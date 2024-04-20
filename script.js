function submitOrder() {
    var nameInput = document.getElementById('name');
    var customerName = nameInput.value.trim();
    if (!customerName) {
        alert('Please enter a name.');
        return;
    }

    var selectedItems = [];
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    
    checkboxes.forEach(function(checkbox) {
        var itemName = checkbox.nextElementSibling.textContent;
        var quantityInput = checkbox.closest('.menu-item').querySelector('input[type="number"]');
        var quantity = parseInt(quantityInput.value, 10);
        if (quantity > 0) {
            var price = parseFloat(checkbox.value);
            selectedItems.push({
                name: itemName.trim(),
                quantity: quantity,
                price: price
            });
        }
    });

    if (selectedItems.length === 0) {
        alert("No items selected or quantities are set to zero.");
        return;
    }

    var total = selectedItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    document.getElementById('total').textContent = '$' + total.toFixed(2);

    // Send order to Google Sheet via Google Apps Script Web App
    fetch('YOUR_WEB_APP_URL', {  // Replace 'YOUR_WEB_APP_URL' with your actual endpoint URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ customerName: customerName, selectedItems: selectedItems })
    }).then(response => response.json())
      .then(data => {
        if (data.result === "success") {
            alert('Order submitted successfully!');
            resetCalculator();  // Optionally reset the form after submission
        } else {
            alert('Failed to submit order.');
        }
    }).catch(error => {
        console.error('Error:', error);
        alert('Failed to submit order.');
    });
}

function resetCalculator() {
    // Add logic to reset the form and any displayed totals or selections
    document.querySelectorAll('input[type="number"]').forEach(input => input.value = 1);
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
    document.getElementById('total').textContent = '$0.00';
    document.getElementById('name').value = '';
}

// Assume calculateTotal() exists or define it here

