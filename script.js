function calculateTotal() {
  var total = 0;
  var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

  checkboxes.forEach(function(checkbox) {
    var quantityInput = checkbox.closest('.menu-item').querySelector('input[type="number"]');
    var quantity = parseInt(quantityInput.value);
    var price = parseFloat(checkbox.value);
    total += price * quantity;
  });

  var totalElement = document.getElementById('total');
  totalElement.textContent = '$' + total.toFixed(2); // Update the total on the page
}

function submitOrder() {
  var nameInput = document.getElementById('name');
  if (!nameInput || nameInput.value.trim() === '') {
    alert('Please enter a name.');
    return;
  }
  var name = nameInput.value.trim();

  var selectedItems = [];
  var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  checkboxes.forEach(function(checkbox) {
    var itemName = checkbox.nextElementSibling.textContent;
    var quantityInput = checkbox.closest('.menu-item').querySelector('input[type="number"]');
    var quantity = parseInt(quantityInput.value, 10);
    var price = parseFloat(checkbox.value);
    selectedItems.push({
      name: itemName.trim(),
      quantity: quantity,
      price: price
    });
  });

  var total = parseFloat(document.getElementById('total').textContent.substring(1));
  var commission = (total * 0.15).toFixed(2);

  var discordWebhookURL = 'https://discord.com/api/webhooks/1230691479316332586/v0F0gtfhrZcG0p_kY5DtwdKHsA6q8mRWrN_eP6SpxqNanRPRtFXVlutQvbT5zdm8RX96';
  var googleScriptWebhookURL = 'https://script.google.com/macros/s/AKfycbyaLIdrEAQ5x1xWj7PcEN1R7Xb_8RBHHXeAp85vQxtciv0sZd4AWUOk-BSov1WtvEpluA/exec';
  
  var xhr = new XMLHttpRequest();
  xhr.open('POST', discordWebhookURL, true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 204 || (xhr.status >= 200 && xhr.status < 300)) {
        alert('Order submitted successfully!');
      } else {
        alert('Failed to submit the order. Please try again.');
      }
    }
  };
 // Prepare the data payload for Google Apps Script
  var googleScriptMessage = {
    timestamp: new Date().toISOString(),
    name: name,
    total: total.toFixed(2),
    commission: commission,
    items: selectedItems,
  };

  // Send to Google Apps Script
  sendWebhookRequest(googleScriptWebhookURL, googleScriptMessage, function(success) {
    if (success) {
      alert('Order logged to spreadsheet successfully!');
    } else {
      alert('Failed to log order to spreadsheet.');
    }
  });

  // Maybe delay resetting the form a bit to let user see the alerts
  setTimeout(resetCalculator, 3000);
}

// Helper function to send webhook requests
function sendWebhookRequest(webhookUrl, message, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', webhookUrl, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      callback(xhr.status === 204 || (xhr.status >= 200 && xhr.status < 300));
    }
  };
  xhr.send(JSON.stringify(message));
}  

  var embedDescription = selectedItems.map(item => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n');
  var message = JSON.stringify({
    content: 'New order!',
    embeds: [{
      title: 'Order Details',
      description: embedDescription,
      color: 5814783,
      fields: [
        { name: 'Name', value: name, inline: true },
        { name: 'Total', value: `$${total.toFixed(2)}`, inline: true },
        { name: 'Commission (15%)', value: `$${commission}`, inline: true }
      ]
    }]
  });

  xhr.send(message);
}

function resetCalculator() {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  var quantityInputs = document.querySelectorAll('input[type="number"]');
  
  checkboxes.forEach(function(checkbox) {
    checkbox.checked = false;
  });
  
  quantityInputs.forEach(function(quantityInput) {
    quantityInput.value = 1;
  });
  
  document.getElementById('total').textContent = '$0.00';
}

function submitAndReset() {
  submitOrder();
  // Adding a delay before reset to give some time for the order to be processed
  setTimeout(resetCalculator, 2000);
}
