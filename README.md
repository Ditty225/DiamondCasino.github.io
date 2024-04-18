<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Menu Calculator</title>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Roboto', sans-serif;
      background-color: #f4f4f9;
      color: #333;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 20px;
    }
    .menu-item {
      background-color: #fff;
      border: 1px solid #ccc;
      padding: 10px;
      margin: 10px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .menu-item img {
      width: 50px;
      height: auto;
      margin-left: 10px;
    }
    button {
      background-color: #4CAF50;
      color: white;
      border: none;
      padding: 10px 20px;
      margin: 10px;
      border-radius: 5px;
      cursor: pointer;
    }
    button:hover {
      background-color: #45a049;
    }
    .button-container {
      display: flex;
      justify-content: center;
      gap: 10px;
    }
    .total-box {
      margin-top: 20px;
    }
  </style>
  <script>
    function calculateTotal() {
    var total = 0;
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    checkboxes.forEach(function(checkbox) {
      var quantityInput = checkbox.parentNode.querySelector('input[type="number"]');
      var quantity = parseInt(quantityInput.value);
      var price = parseFloat(checkbox.value);

      if (checkbox.value === '-25%') {
        var itemPrice = total * 0.25;
        total -= itemPrice;
      } else if (checkbox.value === '-30%') {
        var itemPrice = total * 0.3;
        total -= itemPrice;
      } else if (checkbox.value === '-50%') {
        var itemPrice = total * 0.5;
        total -= itemPrice;
      } else {
        total += price * quantity;
      }
    });

    var totalElement = document.getElementById('total');
    totalElement.textContent = total.toFixed(2);

    var discountTotalElement = document.getElementById('discount-total');
    var discount = total * 0.15;
    discountTotalElement.textContent = discount.toFixed(2);
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
      var quantityInput = checkbox.parentNode.querySelector('input[type="number"]');
      var quantity = parseInt(quantityInput.value);
      var price = parseFloat(checkbox.value);
      selectedItems.push({ name: itemName, quantity: quantity, price: price });
    });

    var total = 0;
    var discountTotal = 0;

    selectedItems.forEach(function (item) {
      if (item.price < 0) {
        var discountPercentage = Math.abs(item.price);
        var itemDiscount = total * (discountPercentage / 100);
        discountTotal += itemDiscount;
      } else {
        total += item.price * item.quantity;
      }
    });

    var commission = (total * 0.15).toFixed(2);
    var totalWithDiscount = total - discountTotal;

    alert('Order submitted!');

    var discordWebhookURL = 'https://discordapp.com/api/webhooks/1173524631177670717/7OulHbdgxQLuS2Qd-SClogA5LwpOmZ_fY9XJ9lxZlNYi4DOZacY5IucqtsMXUCrtoRTm';


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
  
  document.getElementById('total').textContent = '0.00';
}
	function submitAndReset() {
	submitOrder();
	resetCalculator();
}
  </script>
</head>
<body>
  <h1>Rex's Diner Calculator</h1>
  
  <section class="menu-items">
    <h2>Drinks</h2>
    <div class="menu-item">
      <input type="checkbox" id="motorOilCoffee" value="200">
      <label for="motorOilCoffee">Motor Oil Coffee - $200</label>
      <input type="number" value="1" min="1">
      <img src="motor-oil-coffee.png" alt="Motor Oil Coffee">
    </div>
    <div class="menu-item">
      <input type="checkbox" id="engineCoolantIcedTea" value="150">
      <label for="engineCoolantIcedTea">Engine Coolant Ice Tea - $150</label>
      <input type="number" value="1" min="1">
      <img src="engine-coolant-ice-tea.png" alt="Engine Coolant Ice Tea">
    </div>
    <div class="menu-item">
      <input type="checkbox" id="eCola" value="100">
      <label for="eCola">eCola - $100</label>
      <input type="number" value="1" min="1">
    </div>
    <div class="menu-item">
      <input type="checkbox" id="sprunk" value="100">
      <label for="sprunk">Sprunk - $100</label>
      <input type="number" value="1" min="1">
    </div>
    <div class="menu-item">
      <input type="checkbox" id="radiatorFlushLemonade" value="200">
      <label for="radiatorFlushLemonade">Radiator Flush Lemonade - $200</label>
      <input type="number" value="1" min="1">
    </div>
  </section>

  <section class="menu-items">
    <h2>Main Dish</h2>
    <div class="menu-item">
      <input type="checkbox" id="garageFries" value="100">
      <label for="garageFries">Garage Fries - $100</label>
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
        </section>

  <section class="menu-items">
    <h2>Refuel</h2>
    <div class="menu-item">
      <input type="checkbox" id="chocolateMilkshake" value="175">
      <label for="chocolateMilkshake">Chocolate Milkshake Manifold - $175</label>
      <input type="number" value="1" min="1">
      <img src="chocolate-milkshake.png" alt="Chocolate Milkshake">
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
    </section>

  <div class="total-box">
    <span>Total: $</span>
    <span id="total">0.00</span>
  </div>

  <div class="button-container">
    <button onclick="calculateTotal()">Calculate Total</button>
    <button onclick="submitAndReset()">Submit Order</button>
    <button onclick="resetCalculator()">Reset</button>
  </div>

</body>
</html>
