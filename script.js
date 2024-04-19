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
  document.querySelectorAll('input[type="checkbox"]:checked').forEach(function (checkbox) {
    var itemName = checkbox.nextElementSibling.textContent;
    var quantityInput = checkbox.closest('.menu-item').querySelector('input[type="number"]');
    var quantity = parseInt(quantityInput.value);
    var price = parseFloat(checkbox.value);
    selectedItems.push({
      name: itemName.trim(), // Ensure we trim any excess whitespace
      quantity: quantity,
      price: price
    });
  });

  var total = parseFloat(document.getElementById('total').textContent.substring(1));
  var commission = (total * 0.15).toFixed(2);

  var discordWebhookURL = 'https://discord.com/api/webhooks/1230691479316332586/v0F0gtfhrZcG0p_kY5DtwdKHsA6q8mRWrN_eP6SpxqNanRPRtFXVlutQvbT5zdm8RX96'; // Replace with your actual webhook URL

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE) {
      if (this.status >= 200 && this.status < 300) {
        console.log('Webhook sent successfully.');
      } else {
        console.error('Webhook error:', this.responseText);
      }
    }
  };

  xhr.open('POST', discordWebhookURL);
  xhr.setRequestHeader('Content-Type', 'application/json');

  var embedDescription = selectedItems.map(item => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n');
  
  var message = JSON.stringify({
    content: 'New order!', // If you don't want additional content, set this to null
    embeds: [{
      title: 'Order Details',
      fields: [
        { name: 'Name', value: name, inline: true },
        { name: 'Total', value: `$${total.toFixed(2)}`, inline: true },
        { name: 'Commission (15%)', value: `$${commission}`, inline: true },
        { name: 'Ordered Items', value: embedDescription, inline: false }
      ]
    }]
  });

  xhr.send(message);
}
