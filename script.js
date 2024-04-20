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
            setTimeout(resetCalculator, 2000); // Reset form after a successful submission
        } else {
            alert('Failed to submit order to Discord.');
        }
    });
}
