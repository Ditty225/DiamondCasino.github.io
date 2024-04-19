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

function calculateTotal() {
    var total = 0;
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    checkboxes.forEach(function(checkbox) {
        var quantityInput = checkbox.closest('.menu-item').querySelector('input[type="number"]');
        var quantity = parseInt(quantityInput.value);
        var price = parseFloat(checkbox.value);
        if (quantity > 0) {
            total += price * quantity;
        }
    });

    var totalElement = document.getElementById('total');
    totalElement.textContent = '$' + total.toFixed(2); // Update the total on the page
}

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

    var total = parseFloat(document.getElementById('total').textContent.substring(1));
    var commission = (total * 0.15).toFixed(2);

    var discordWebhookURL = 'https://discord.com/api/webhooks/1230691479316332586/v0F0gtfhrZcG0p_kY5DtwdKHsA6q8mRWrN_eP6SpxqNanRPRtFXVlutQvbT5zdm8RX96';
    var googleScriptWebhookURL = 'https://script.google.com/macros/s/AKfycbw2IEiEdav8UbjkMchOl1y6c-C88CMPFhsu8SgVoLArjb2xbCdAUb8M_2_J-CSTTXUjkQ/exec';

    // Sending to Discord
    var discordMessage = {
        content: 'New order!',
        embeds: [{
            title: 'Order Details',
            description: selectedItems.map(item => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n'),
            color: 5814783,
            fields: [
                { name: 'Name', value: customerName, inline: true },
                { name: 'Total', value: `$${total.toFixed(2)}`, inline: true },
                { name: 'Commission (15%)', value: `$${commission}`, inline: true }
            ]
        }]
    };

    sendWebhookRequest(discordWebhookURL, discordMessage, function(success) {
        if (success) {
            alert('Order submitted to Discord successfully!');
        } else {
            alert('Failed to submit order to Discord.');
        }
    });

    // Sending to Google Apps Script
    var googleScriptMessage = {
        timestamp: new Date().toISOString(),
        name: customerName,
        total: total.toFixed(2),
        commission: commission,
        items: selectedItems,
    };

    sendWebhookRequest(googleScriptWebhookURL, googleScriptMessage, function(success) {
        if (success) {
            alert('Order logged to spreadsheet successfully!');
            setTimeout(resetCalculator, 2000); // Reset form after a successful submission
        } else {
            alert('Failed to log order to spreadsheet.');
        }
    });
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
    // Delay resetting the form a bit to give some time for the order to be processed
    setTimeout(resetCalculator, 3000);
}
