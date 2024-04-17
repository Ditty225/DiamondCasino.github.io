<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Menu Calculator</title>
    <style>
        body {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            text-align: center;
            background-color: grey;
        }
        .total-box {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 20px;
        }
        .calculate-button, .submit-button, .reset-button {
            width: 150px;
            height: 50px;
            margin-top: 20px;
            cursor: pointer;
            background-color: #4CAF50; /* Green */
            border: none;
            color: white;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            border-radius: 8px;
            transition: background-color 0.3s ease;
        }
        .calculate-button:hover, .submit-button:hover, .reset-button:hover {
            background-color: #45a049;
        }
        .calculate-button:active, .submit-button:active, .reset-button:active {
            background-color: #3e8e41;
            box-shadow: 0 5px #666;
            transform: translateY(4px);
        }
        h1, h2, h3 {
            margin-bottom: 20px;
        }
        .menu-items {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            margin-bottom: 10px;
        }
        .menu-items div {
            display: flex;
            align-items: center;
            margin: 5px;
        }
        .menu-items div img {
            width: 50px;
            height: 50px;
            margin-left: 10px;
        }
    </style>
</head>
<body>
    <img src="RexDinerLogo.png" alt="Rex Diner Logo" style="max-width: 100%; height: auto;">
    <h1>Rex's Diner Calculator</h1>
    <h2>Menu Items</h2>

    <!-- Menu items -->
<div class="menu-items">
        <h3>Drinks</h3>
        <!-- Individual items -->
        <div>
        <input type="checkbox" id="uwueats" value="200$">
        <label for="Velmachoice">Motor Oil Coffee - 200$</label>
        <input type="number" value="1" min="1">
        <img src="motor-oil-coffee.png" alt="Motor Oil Coffee">
      </div>
        <div>
        <input type="checkbox" id="Davechoice" value="150$">
        <label for="Davechoice">Engine Coolant Ice Tea - 150$</label>
        <input type="number" value="1" min="1">
        <img src="engine-coolant-ice-tea.png" alt="Engine Coolant Ice Tea">
      </div>
        <div>
        <input type="checkbox" id="Davechoice" value="100$">
        <label for="Davechoice">eCola - 100$</label>
        <input type="number" value="1" min="1">
      </div>
         <div>
        <input type="checkbox" id="Davechoice" value="100$">
        <label for="Davechoice">Sprunk - 100$</label>
        <input type="number" value="1" min="1">
      </div>
        <div>
        <input type="checkbox" id="Davechoice" value="200$">
        <label for="Davechoice">Radiator Flush Lemonade - 200$</label>
        <input type="number" value="1" min="1">
      </div>
    <h3>Main Dish</h3>
         <div style="margin-bottom: 10px;"></div>
        <div>
        <input type="checkbox" id="uwueats" value="100$">
        <label for="Velmachoice">Garage Fries - 100$</label>
        <input type="number" value="1" min="1">
        <img src="garage-fries.png" alt="Garage Fries">
      </div>
        <div>
        <input type="checkbox" id="uwueats" value="100$">
        <label for="Velmachoice">Piston Poppers - 100$</label>
        <input type="number" value="1" min="1">
        <img src="piston-poppers.png" alt="Piston Poppers">
      </div>
        <div>
        <input type="checkbox" id="uwueats" value="100$">
        <label for="Velmachoice">Gasket Quesadillas - 100$</label>
        <input type="number" value="1" min="1">
        <img src="gasket-quesadillas.png" alt="Gasket Quesadillas">
      </div>
         <div>
        <input type="checkbox" id="uwueats" value="100$">
        <label for="Velmachoice">Spare Tire Tots - 100$</label>
        <input type="number" value="1" min="1">
        <img src="spare_tire_tots.png" alt="Spare Tire Tots">
        </div>
        <div>
        <input type="checkbox" id="uwueats" value="100$">
        <label for="Velmachoice">Dipstick Dippers - 100$</label>
        <input type="number" value="1" min="1">
        <img src="dipstick_dippers.png" alt="Dipstick Dippers">
      </div>
        <div>
        <input type="checkbox" id="uwueats" value="100$">
        <label for="Velmachoice">Oil Change Onion Ringa - 100$</label>
        <input type="number" value="1" min="1">
        <img src="oil_change_onion_rings.png" alt="Oil Change Onion Rings">
      </div>
        <div>
        <input type="checkbox" id="uwueats" value="225$">
        <label for="Velmachoice">Clutch Burger - 225$</label>
        <input type="number" value="1" min="1">
        <img src="clutch_burger.png" alt="Clutch Burger">
      </div>
        <div>
        <input type="checkbox" id="uwueats" value="225$">
        <label for="Velmachoice">Carburetor Grilled Chicken Sandwich - 225$</label>
        <input type="number" value="1" min="1">
        <img src="carburetor-grilled-chicken-sandwich.png" alt="Carburetor Grilled Chicken Sandwich">	
      </div>
        <div>
        <input type="checkbox" id="uwueats" value="225$">
        <label for="Velmachoice">Carburetor Fried Chicken Sandwich - 225$</label>
        <input type="number" value="1" min="1">
        <img src="carburetor-fried-chicken-sandwich.png" alt="Carburetor Fried Chicken Sandwich">	
      </div>
        <div>
        <input type="checkbox" id="uwueats" value="225$">
        <label for="Velmachoice">Fuel Line Frank - 225$</label>
        <input type="number" value="1" min="1">
        <img src="fuel-line-frank.png" alt="Fuel Line Frank">
      </div>
        <div>
        <input type="checkbox" id="uwueats" value="225$">
        <label for="Velmachoice">V8 Steak Charger - 225$</label>
        <input type="number" value="1" min="1">
        <img src="v8-steak-charger.png" alt="V8 Steak Charger">
      </div>
    <h3>Refuel</h3>
         <div>
         <input type="checkbox" id="uwueats" value="175$">
         <label for="Velmachoice">Chocolate Milkshake Manifold- 175$</label>
         <input type="number" value="1" min="1">
         <img src="chocolate-milkeshake.png" alt="Chocolate Milkshake">
       </div>
        <div>
         <input type="checkbox" id="uwueats" value="175$">
         <label for="Velmachoice">Chocolate Milkshake Manifold- 175$</label>
         <input type="number" value="1" min="1">
         <img src="strawberry-milkshake.png" alt="Strawberry Milkshake">
       </div>
        <div>
         <input type="checkbox" id="uwueats" value="175$">
         <label for="Velmachoice">Chocolate Milkshake Manifold- 175$</label>
         <input type="number" value="1" min="1">
         <img src="vanilla-milkshake.png" alt="Vanilla Milkshake">
       </div>
        <div>
         <input type="checkbox" id="uwueats" value="175$">
         <label for="Velmachoice">Wrench Waffles- 175$</label>
         <input type="number" value="1" min="1">
         <img src="wrench-waffles.png" alt="Wrench Waffles">
       </div>
        <div>
         <input type="checkbox" id="uwueats" value="175$">
         <label for="Velmachoice">Battery Boost Brownie Sundae- 175$</label>
         <input type="number" value="1" min="1">
         <img src="battery-boost-brownie-sundae.png" alt="Battery Boost Brownie Sundae">
       </div>
    <!-- Discounts -->
    <h3>Employee Discount</h3>
    <div>
        <input type="checkbox" id="25off" value="-25">
        <label for="25off">Employee Discount - 25% off</label>
    </div>
    <!-- Input for employee name -->
    <div>
        <label for="name">Rex's Employee Name:</label>
        <input type="text" id="name">
    </div>
    <!-- Display total -->
    <div class="total-box">
        <span>Total: $</span>
        <span id="total">0.00</span>
    </div>
    <!-- Buttons for actions -->
    <button class="calculate-button" onclick="calculateTotal()">Calculate Total</button>
    <button class="submit-button" onclick="submitAndReset()">Submit Order</button>
    <button class="reset-button" onclick="resetCalculator()">Reset</button>

<script>
    function calculateTotal() {
        var total = 0;
        var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        checkboxes.forEach(function(checkbox) {
            var quantityInput = checkbox.parentNode.querySelector('input[type="number"]');
            var quantity = parseInt(quantityInput.value);
            var price = parseFloat(checkbox.value);
            if (price < 0) {
                total -= total * (Math.abs(price) / 100);
            } else {
                total += price * quantity;
            }
        });
        document.getElementById('total').textContent = 'Total: $' + total.toFixed(2);
    }

    function submitAndReset() {
        var name = document.getElementById('name').value;
        if (name.trim() === '') {
            alert('Please enter your name.');
            return;
        }

        var total = parseFloat(document.getElementById('total').textContent.replace('Total: $', ''));

        // Assuming a 25% discount for employee discount
        var totalWithDiscount = total * 0.75;
        var discountTotal = total - totalWithDiscount;
        var commission = total * 0.15;

        var selectedItems = [];
        var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        checkboxes.forEach(function(checkbox) {
            var quantityInput = checkbox.parentNode.querySelector('input[type="number"]');
            var quantity = parseInt(quantityInput.value);
            var price = parseFloat(checkbox.value);
            selectedItems.push({
                name: checkbox.nextElementSibling.textContent,
                quantity: quantity,
                price: price
            });
        });

        // Discord webhook integration
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
                        name: 'Discount Total',
                        value: '$' + discountTotal.toFixed(2),
                        inline: true
                    },
                    {
                        name: 'Commission (15%)',
                        value: '$' + commission.toFixed(2),
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

        // You can submit the order and reset the form here
        alert('Order submitted!\nTotal: ' + total);
        resetCalculator();
    }

    function resetCalculator() {
        // Reset form elements here
    }
</script>
