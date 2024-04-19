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
  var name = document.getElementById('name').value;
  if (name.trim() === '') {
    alert('Please enter a name.');
    return;
  }

  // Collect selected items and their quantities
  var selectedItems = [];
  var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  checkboxes.forEach(function (checkbox) {
    var itemName = checkbox.nextElementSibling.textContent;
    var quantityInput = checkbox.closest('.menu-item').querySelector('input[type="number"]');
    var quantity = parseInt(quantityInput.value);
    var price = parseFloat(checkbox.value);
    selectedItems.push({ name: itemName, quantity: quantity, price: price });
  });

  // No need to recalculate total, use the calculated total
  var total = parseFloat(document.getElementById('total').textContent.substring(1)); // remove the dollar sign
  var commission = (total * 0.15).toFixed(2); // 15% commission
  var totalWithDiscount = total; // If you have discounts apply them here

  alert('Order submitted!');

  // Replace with your actual Discord webhook URL
  var discordWebhookURL = 'https://discord.com/api/webhooks/1229932797750284400/z2X-9PHxqaJ7H-mHEP55Lf234eduw34XOq7jFbDsudYPyj5csxkCRAheCOWtAstJ7BRl';

  var xhr = new XMLHttpRequest();
  xhr.open('POST', discordWebhookURL, true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  var message = {
    content: 'New order!',
    embeds: [{
      title: 'Order Details',
      fields: [
        {
          name: 'Name',
          value: name,
          inline: true
        },
        {
          name: 'Total',
          value: '$' + totalWithDiscount.toFixed(2),
          inline: true
        },
        {
          name: 'Commission (15%)',
          value: '$' + commission,
          inline: true
        },
        {
          name: 'Ordered Items',
          value: selectedItems.map(item => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n'),
          inline: false
        }
      ]
    }]
  };

  xhr.send(JSON.stringify(message));
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

  document.getElementById('total').textContent = '$0.00'; // Reset the total display
}
